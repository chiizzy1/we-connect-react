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

// Create Post


const schema = yup.object().shape({
  text: yup.string().required("Your Full Name is Required!"),
  file: yup.mixed().test("file", "You need to provide a file", (value) => {
    if (value.length > 0) {  
      return true;
    }
    return false;
    }),
});

const {register,handleSubmit,formState: { errors }} = useForm({
  resolver: yupResolver(schema),
});

// const postData = async (newPost) => {
//   try {
//     let { data } = await Axios.post('/api/post/createPost', { text: desc, image: }, { withCredentials: true })

//       return data
//       // console.log(user);
//   } catch (error) {
//     console.log(error);
//   }
// } 

// const { mutate: createPost, error: postError, isLoading: creatingPost, isError: postingError } = useMutation(postData, {
//   onSuccess: (successData) => { 
//     console.log(successData)
//     alert("post created successfully!")
//    }
// })

// const onSubmit = data => console.log(data);
//   console.log(errors);
const onSubmit = (newPost) => {
  console.log(newPost);
  // createPost(newPost)
};

const newPost= (
  <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="What's on your mind..." {...register("text")} />
          <p>{errors.text?.message}</p>

          <label htmlFor="Image">Image: </label>
          <input type="file" {...register('file')} />
          {errors.file && <p>Please select an image</p>}



          <input type="submit" />
    </form>
)
