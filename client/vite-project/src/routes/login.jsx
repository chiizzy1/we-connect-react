import Axios  from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



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
    
      const onSubmit = ({email, password}) => {
        console.log(email, password);

        Axios.post('http://localhost:2121/login', {
                  email: email,
                  password: password
              })
              .then(res => {
                  // Work with the response...
                  console.log(res.data);
                  navigate("/feed")
                
              }).catch(err => {
                  // Handle error
                  console.log(err);
              });
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