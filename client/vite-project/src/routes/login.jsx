import Axios  from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUserLogin } from '../features/user/userSlice';
import { students } from '../assets';


const login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const schema = yup.object().shape({
        email: yup.string().email().required("Enter a valid email"),
        password: yup.string().min(4).max(20).required("Password must be greater than 4 and less than 20"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

      
      const postData = async ({email, password}) => {
        try {
          let { data } = await Axios.post('/api/login', {
                email: email,
                password: password
            }, { withCredentials: true })

            return data
            // console.log(user);
        } catch (error) {
          console.log(error);
        }
      } 

      const { mutate, error, isLoading, isError } = useMutation(postData, {
        onSuccess: (successData) => { 
          console.log("welcome", successData.user.userName)
          dispatch(setUserLogin(successData))
          navigate("/profile")
         }
      })
    

      if (isLoading){
        return <p>Loading...</p>
      }

      if (isError){
        return <div>Error! {error.message}</div>
      }


      const onSubmit = ({email, password}) => {
        console.log(email, password);
        mutate({ email: email,  password: password })
      };
    
      return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={students} alt="" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input type="text" placeholder="Email..." {...register("email")} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'/>
                        <p>{errors.email?.message}</p>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>PassWord</label>
                        <input
                          type="password"
                          placeholder="Password..."
                          {...register("password")}
                          className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        />
                        <p>{errors.password?.message}</p>
                    </div>
                    
                    
                    <input type="submit" className='w-full my-5 py-2 cursor-pointer bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' />
                </form>
            </div>
            
        </div>
        
      );

}

export default login