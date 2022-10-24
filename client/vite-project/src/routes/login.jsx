import Axios  from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



const login = () => {
    const navigate = useNavigate()

    
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
          let user = await Axios.post('http://localhost:2121/login', {
                email: email,
                password: password
            })

            return user.data
            // console.log(user);
        } catch (error) {
          console.log(error);
        }
      } 

      const { mutate, error, isLoading, isError } = useMutation(postData, {
        onSuccess: (successData) => { 
          console.log(successData)
          navigate("/feed")
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Email..." {...register("email")} />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="Password..."
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          <input type="submit" />
        </form>
      );

}

export default login