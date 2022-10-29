import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const editUserDetails = () => {
//     const { user } = useSelector(loggedUser)

//     const schema = yup.object().shape({
//       userName: yup.string().required("Your Full Name is Required!"),
//       mobile: yup.number().positive().integer().required(),
//       country: yup.string().required("Your Full Name is Required!"),
//       city: yup.string().required("Your Full Name is Required!"),
//       campus: yup.string().required("Your Full Name is Required!"),
//       sex: yup.string().required("Your Full Name is Required!"),
//       twitter: yup.string().required("Your Full Name is Required!"),
//       linkedin: yup.string().required("Your Full Name is Required!"),
//       description: yup.string().required("Your Full Name is Required!"),
//     });
  
  
//     const { register, handleSubmit, formState: { errors } } = useForm({
//       resolver: yupResolver(schema),
//     });
  
//     const onSubmit = data => console.log(data);
//     console.log(errors);
  
//     return (
//       <>
//         <div>editProfile: {user.userName}</div>
  
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input type="text" placeholder="User Name" {...register("userName")} />
//           <p>{errors.userName?.message}</p>
//           <input type="text" placeholder="Country" {...register("country")} />
//           <p>{errors.country?.message}</p>
//           <input type="text" placeholder="City" {...register("city")} />
//           <p>{errors.city?.message}</p>
//           <input type="text" placeholder="Campus" {...register("campus")} />
//           <p>{errors.campus?.message}</p>
//           <input type="text" placeholder="Sex" {...register("sex")} />
//           <p>{errors.sex?.message}</p>
//           <input type="text" placeholder="Twitter" {...register("twitter")} />
//           <p>{errors.twitter?.message}</p>
//           <input type="text" placeholder="LinkedIn" {...register("linkedin")} />
//           <p>{errors.linkedin?.message}</p>
//           <input type="text" placeholder="Mobile" {...register("mobile")} />
//           <p>{errors.mobile?.message}</p>
//           <input type="text" placeholder="Description" {...register("description")} />
//           <p>{errors.description?.message}</p>
  
//           <label htmlFor="Image">Image: </label>
//           <input type="file" id='Image' {...register('file')} />
//           {errors.file && <p>Please select an image</p>}
  
//           <input type="submit" />
//         </form>
//       </>
      
//     )
// }

// export default editUserDetails




{/* <StyledCreateProduct>
          <StyledForm onSubmit={handleSubmit}>
          <h3>Create a Product</h3>
            { user && 
              <>
                  <input
              id="imgUpload"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              required
            />

            <input
              type="text"
              placeholder="userName"
              value={user.userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="country"
              value={user.country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="city"
              value={user.city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="campus"
              value={user.campus}
              onChange={(e) => setCampus(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="mobile"
              value={user.mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="linkedIn"
              value={user.linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="description"
              value={user.description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="sex"
              value={user.sex}
              onChange={(e) => setSex(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="twitter"
              value={user.twitter}
              onChange={(e) => setTwitter(e.target.value)}
              required
            />
              </>
            }

            <button>Update Profile</button>
          </StyledForm>
       </StyledCreateProduct> */}