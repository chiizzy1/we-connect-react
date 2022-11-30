import Axios  from 'axios'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUserLogin } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import { students } from '../assets';





const signUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Handle Form with Yup
  const schema = yup.object().shape({
    userName: yup.string().required("User Name cannot be empty!"),
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });



  // Make Post Rrequest to our backend

  const postData = async ({ userName, email, password, confirmPassword }) => {
    try {
      let { data } = await Axios.post('/api/signup', { userName, email, password, confirmPassword }, { withCredentials: true })

        return data
        // console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 

  const { mutate, error, isLoading, isError } = useMutation(postData, {
    onSuccess: (successData) => { 
      console.log(successData.message)
      dispatch(setUserLogin(successData.user))
      navigate("/profile")
     }
  })


  if (isLoading){
    return <p>Loading...</p>
  }

  if (isError){
    return <div>Error! {error.message}</div>
  }


  const onSubmit = ({ userName, email, password, confirmPassword }) => {
    console.log(email, password);
    mutate({ userName, email, password, confirmPassword })
  };


  return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={students} alt="" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>

                      <div className='flex flex-col text-gray-400 py-2'>
                        <label>User Name</label>
                        <input type="text" placeholder="User Name..." {...register("userName")} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'/>
                        <p>{errors.userName?.message}</p>
                      </div>
                      

                      <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input type="text" placeholder="Email..." {...register("email")} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'/>
                        <p>{errors.email?.message}</p>
                      </div>
                      

                      <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input
                          type="password"
                          placeholder="Password..."
                          {...register("password")}
                          className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        />
                        <p>{errors.password?.message}</p>
                      </div>
                      

                      <div className='flex flex-col text-gray-400 py-2'>
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            placeholder="Confirm Password..."
                            {...register("confirmPassword")}
                            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                          />
                          <p>{errors.confirmPassword?.message}</p>
                      </div>
                      
                      <input type="submit" className='w-full my-5 py-2 cursor-pointer bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'/>
                    </form>
            </div>
        </div>
  )
}

export default signUp
