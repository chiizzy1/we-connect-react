// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const createPost = () => {
//     const schema = yup.object().shape({
//         email: yup.string().email().required("Enter a valid email"),
//         password: yup.string().min(4).max(20).required("Password must be greater than 4 and less than 20"),
//       });
    
//     const {register,handleSubmit,formState: { errors }} = useForm({
//         resolver: yupResolver(schema),
//     });




//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//           <input type="text" placeholder="Email..." {...register("email")} />
//           <p>{errors.email?.message}</p>
//           <input
//             type="password"
//             placeholder="Password..."
//             {...register("password")}
//           />
//           <p>{errors.password?.message}</p>

//           <label htmlFor="Image">Image: </label>
//           <input type="file" {...register('file')} />
//           {errors.file && <p>Please select an image</p>}



//           <input type="submit" />
//     </form>
//   )
// }

// export default createPost

