import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage,AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai"
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from '../style';

const Post = ({post, description}) => {
  const { user } = useSelector(loggedUser);
  


  const [comment, setComment] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length)


   // Add Comments Schema
  const commentSchema = yup.object().shape({
    comment: yup.string().required("Please enter a comment!"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(commentSchema),
  });


  // Like Post
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


  // Add Comment Api 
  const postComment = async (newComment) => {
    try {
      let { data } = await Axios.post(`/api/comment/createComment/${post._id}`, newComment, { withCredentials: true })
  
        return data
        // console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 
  
  const { mutate: addComment, error: postError, isLoading: creatingComment, isError: postingError } = useMutation(postComment, {
    onSuccess: (successData) => { 
      console.log(successData)
      setComment(false)
     }
  })


  // Delete Post
  const deletePostReq = async () => {
    try {
        const { data } = await Axios.delete(`/api/post/deletePost/${post._id}`, { userId: user._id }, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
    }
}
console.log(user._id);

const { mutate: mutateDelete, isLoading: deletingPost } = useMutation(deletePostReq, {
  onSuccess: (successData) => { 
    console.log("post deleted");
   },
  onError:(err) => {console.log(err)} 
})



  const deletePost = () => {
    // console.log("deleted", id);
    mutateDelete(post._id)
  }

  const handleLike = () => {
    mutate(post._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  const handleComment = (comm) =>{
    // console.log(comm);
    addComment(comm);
  };


  return (
    <div className={`flex flex-col rounded-md gap-4 ${styles.glassM}`} key={post._id}>
        {description === "PostAndComments" ? <img src={post.image} alt="post-img" className="w-full object-cover max-h-80 rounded-lg"/> :
          <Link to={`/post/${post._id}`}>
            <img src={post.image} alt="post-img" className="w-full cursor-pointer object-cover max-h-80 rounded-lg"/>
          </Link>
        }

        <div className="flex gap-4 items-start">
            {liked ? <AiFillHeart onClick={handleLike} className="text-2xl cursor-pointer text-red-500" /> : <AiOutlineHeart onClick={handleLike} className="text-2xl cursor-pointer text-red-500" /> }
            <AiOutlineMessage className="text-2xl cursor-pointer text-indigo-500" onClick={() => setComment(prev => !prev)}/>
            {post.user === user._id && <AiOutlineDelete className="text-2xl cursor-pointer hover:text-red-500" onClick={deletePost} />}
        </div>

        <span>{likes} {likes > 1 ? "likes" : "like"}</span>

        <div className="flex">
            <span className="font-medium mr-4">{post.createdBy}</span>
            <span>{post.text}</span>
        </div>

        {/* Add Comments Form */}
        {comment &&
          <form onSubmit={handleSubmit(handleComment)} className={`mt-4 flex flex-col`}>
              <label className={`${styles.formLabelStyles}`}>Comment</label>
              <p>{errors.comment?.message}</p>
              <div className="flex gap-8">
                <input type="text" placeholder="Make a comment..." {...register("comment")} className={`basis-3/5 ${styles.formInputStyles}`}/>
                <button className={`grow marker:${styles.buttonStyles}`}>add comment</button>
              </div>
          </form>
        }

    </div>
  )
}

export default Post