import { useRef, useState } from "react";
import { userIcon } from '../assets';
import { TfiGallery } from "react-icons/tfi";
import { AiOutlinePlayCircle, AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiTireIronCross } from "react-icons/gi";
import Button from "./Button";
import Axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { setPosts } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import styles from "../style";

 

const NewPost = () => {

    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();


    const { user } = useSelector(loggedUser)
    const dispatch = useDispatch()
    
    // Create New Post

    const newPost = async () => {
        try {
        let { data } = await Axios.post('/api/post/createPost', { text: desc.current.value, image: image, userId: user._id }, { withCredentials: true })
    
            return data
            // console.log(user);
        } catch (error) {
        console.log(error);
        }
    } 
    
    const { mutate, error, isLoading, isError } = useMutation(newPost, {
        onSuccess: (successData) => { 
        // console.log(successData)
            alert("post created successfully!")
        }
    })


    const onImageChange = (e) => {
        const file = e.target.files[0];
      
        console.log(file);
        TransformFileData(file);
      };
      
      
      const TransformFileData = (file) => {
        const reader = new FileReader();
      
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImage(reader.result);
          };
        } else {
          setImage("");
        }
      };
      
    //   if (isError) {
    //     return <div>Error! {error.message}</div>;
    //   }
    
    //   if (isLoading) {
    //     return <h1> Loading...</h1>;
    //   }



      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log( desc.current.value, image, user._id);
        mutate({ text: desc.current.value, image: image, userId: user._id, userName: user.userName })
      }



  return (
    <div className={`flex gap-4 p-4 rounded-md ${styles.glassM}`}>
        <img src={user.profilePic ? user.profilePic : userIcon} alt="profile-img" className="w-12 h-12 rounded-full"/>
        <div className="flex flex-col gap-4 w-full">
            <input 
                type="text" 
                name="" id="" 
                placeholder="Make a Post"
                className="rounded p-2 border bg-transparent text-lg outline-0 text-white"
                ref={desc}
                required
            />
            
            <div className="flex justify-between items-center">
                <div onClick={() => imageRef.current.click()} className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <TfiGallery className="text-2xl text-green-500" />
                    <p>Photo</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <AiOutlinePlayCircle className="text-2xl text-indigo-500" />
                    <p>Video</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <HiOutlineLocationMarker className="text-2xl text-red-500" />
                    <p>Location</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <AiOutlineSchedule className="text-2xl text-yellow-500" />
                    <p>Schedule</p>
                </div>
                
                <button className={`${styles.buttonStyles} mt-0`} onClick={handleSubmit}>share</button>
                {/* File Input */}
                <div className="hidden">
                    <input type="file" name="postImage" ref={imageRef} onChange={onImageChange} />
                </div>
            </div>
            {image && (
                <div className="flex  gap-4 w-72 h-72 relative">
                    <GiTireIronCross className="text-red-600 absolute right-4 top-2 cursor-pointer" onClick={() => setImage(null)} />
                    <img src={image} alt="img-preview" className="w-full max-h-72 object-cover rounded-lg"/>
                </div>
            )}
        </div> 
    </div>
  )
}

export default NewPost