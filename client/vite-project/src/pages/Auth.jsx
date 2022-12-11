import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import styles from "../style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "../components";
import { Login, SignUp } from "../api/AuthRequest";
import { setUserLogin } from "../features/user/userSlice";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    
    const navigate = useNavigate()
    const dispatch = useDispatch();


     // Handle Form with Yup
     const signUpSchema = yup.object().shape({
         firstName: yup.string().required("User Name cannot be empty!"),
         lastName: yup.string().required("User Name cannot be empty!"),
         userName: yup.string().required("User Name cannot be empty!"),
         email: yup.string().email().required("Please enter a valid email address"),
         password: yup.string().min(4).max(20).required(),
         confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords Don't Match")
            .required(),
    });


    const loginSchema = yup.object().shape({
        email: yup.string().email().required("Enter a valid email"),
        password: yup.string().min(4).max(20).required("Password must be greater than 4 and less than 20"),
      });


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(isSignUp ? signUpSchema : loginSchema),
      });

    


    const postData = async (userData) => {
        try {
            if (isSignUp){
                let { data } = await SignUp(userData);
                return data;
            }else{
                let { data } = await Login(userData)
                return data;
            }

        } catch (error) {
            console.log(error);
        }
    }

    const { mutate, error, isLoading, isError } = useMutation(postData, {
        onSuccess: (successData) => { 
            console.log("request success", successData)
            dispatch(setUserLogin(successData))
            navigate("/profile")
         },
         onError:(err) => {console.log(err)}
      })
    

      if (isLoading){
        return <p>Loading...</p>
      }

      if (isError){
        return <div>Error! {error.message}</div>
      }


    const onSubmit = (data) => {
            console.log(data);
            mutate(data);
    };

  return (
    <div className="text-white flex justify-center items-center gap-16 relative h-screen">
        <div className="flex gap-8">
            <div className="font-poppins text-gradient cursor-pointer text-[18px]">9jaConnect</div>
            <div className="flex flex-col">
                <h1>Watawi</h1>
                <h5>Bruhhh</h5>
            </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <h3>{isSignUp? "Register" : "Login"}</h3>
            {isSignUp && 
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">                
                        <input className={`${styles.formInputStyles}`} type="text" placeholder="First Name..." {...register("firstName")} />
                        <p className={`${styles.formErrorStyles}`}>{errors.firstName?.message}</p>
                    </div>
                    <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
                        <input className={`${styles.formInputStyles}`} type="text" placeholder="Last name..." {...register("lastName")} />
                        <p className={`${styles.formErrorStyles}`}>{errors.lastName?.message}</p>
                    </div>
                </div>
            }

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full ${isSignUp && "sm:w-1/2"}  px-3 mb-6 sm:mb-0`}>                
                    <input className={`${styles.formInputStyles}`} type="email" placeholder="Email..." {...register("email")} />
                    <p className={`${styles.formErrorStyles}`}>{errors.email?.message}</p>
                </div>
                {isSignUp &&
                    <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
                        <input className={`${styles.formInputStyles}`} type="text" placeholder="User name..." {...register("userName")} />
                        <p className={`${styles.formErrorStyles}`}>{errors.userName?.message}</p>
                    </div>
                }
            </div>

            {/* <div className="w-full px-3">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <input className={`${styles.formInputStyles} w-full`} type="email" placeholder="Email..." {...register("email")} />
                    <p className={`${styles.formErrorStyles}`}>{errors.email?.message}</p>
                </div>
            </div> */}

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full ${isSignUp && "sm:w-1/2"}  px-3 mb-6 sm:mb-0`}>
                    <input
                        className={`${styles.formInputStyles}`}
                        type="password"
                        placeholder="Password..."
                        {...register("password")}
                    />
                    <p className={`${styles.formErrorStyles}`}>{errors.password?.message}</p>
                </div>
                {isSignUp && 
                    <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
                        <input
                            className={`${styles.formInputStyles}`}
                            type="password"
                            placeholder="Confirm Password..."
                            {...register("confirmPassword")}
                        />
                        <p className={`${styles.formErrorStyles}`}>{errors.confirmPassword?.message}</p>
                    </div>
                }
            </div>
            <span onClick={() => setIsSignUp( prev => !prev )}>{isSignUp ? "Already have an account Login" : "Don't have an account Sign up"}</span>

            <button type="submit" className={`${styles.formAuthButton} px-6 py-2`}>{isSignUp ? "SignUp" : "Login"}</button>
        </form>

    </div>
  )
}



export default Auth