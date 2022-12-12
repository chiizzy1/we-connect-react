import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai"
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from 'axios';


const Post = ({post}) => {
  const { user } = useSelector(loggedUser);
  



  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length)


  const likePost = async () => {
    try {
      const { data } = await Axios.put(`/api/post/likePost/${post._id}`, { userId: user._id },  { withCredentials: true })
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate, isLoading } = useMutation(likePost, {
    onSuccess: (successData) => { 
      console.log(successData);
      // queryClient.invalidateQueries("post")
     },
    onError:(err) => {console.log(err)} 
  })



  const handleLike = () => {
    console.log(post._id, user._id);
    mutate(post._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };


  return (
    <div className="flex flex-col p-4 bg-cyan-900 rounded-2xl gap-4">
        <img src={post.image} alt="post-img" className="w-full object-cover max-h-80 rounded-lg"/>

        <div className="flex gap-4 items-start">
            {liked ? <AiFillHeart onClick={handleLike} className="text-2xl cursor-pointer text-red-500" /> : <AiOutlineHeart onClick={handleLike} className="text-2xl cursor-pointer text-red-500" /> }
            <AiOutlineShareAlt className="text-2xl cursor-pointer text-green-500" />
            <AiOutlineMessage className="text-2xl cursor-pointer text-indigo-500"/>
        </div>

        <span>{likes}</span>

        <div className="flex">
            <span className="font-medium">Jay</span>
            <span>{post.text}</span>
        </div>
    </div>
  )
}

export default Post