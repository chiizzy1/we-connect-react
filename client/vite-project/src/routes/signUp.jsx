import Axios  from 'axios'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUserLogin } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom";





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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="User Name..." {...register("userName")} />
      <p>{errors.userName?.message}</p>
      <input type="text" placeholder="Email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("password")}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password..."
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  )
}

export default signUp