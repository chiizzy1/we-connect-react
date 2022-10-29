import { userPosts } from "../features/posts/postsSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loggedUser } from "../features/user/userSlice";
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";


const post = () => {
  const [desc, setDesc] = useState("");


  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigate = useNavigate()

  // Get user details from redux store
  const { user } = useSelector(loggedUser)
  const  posts  = useSelector(userPosts)

  // Get Post and Comments attached to it
  async function fetchPostAndComments() {
      const { data } = await Axios.get(`/api/post/${id}`,  { withCredentials: true })
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["post"], fetchPostAndComments)


  
  // Like Post

  const likePost = async () => {
      try {
        const { data } = await Axios.put(`/api/post/likePost/${id}`,  { withCredentials: true })
        return data
      } catch (error) {
        console.log(error);
      }
  }

  const { mutate: mutateLikes, isLoading: addingLike } = useMutation(likePost, {
    onSuccess: (successData) => { 
      console.log("add like", id);
      queryClient.invalidateQueries("post")
     },
    onError:(err) => {console.log(err)} 
  })

  const addLike = () => {
      mutateLikes(id)
  }



  // Delete Post
  const deletePostReq = async () => {
      try {
          const { data } = await Axios.delete(`/api/post/deletePost/${id}`,  { withCredentials: true })
          return data
      } catch (error) {
          console.log(error);
      }
  }


  const { mutate: mutateDelete, isLoading: deletingPost } = useMutation(deletePostReq, {
    onSuccess: (successData) => { 
      // console.log("deleted", id);
      navigate("/profile")
     },
    onError:(err) => {console.log(err)} 
  })



  const deletePost = () => {
    // console.log("deleted", id);
    mutateDelete(id)
  }
  
  


  

  // Get post from store
  // const getPost = posts.filter(item => item._id === id )
  // console.log("all posts", posts);
  // console.log("wanted post", getPost);
  // console.log(user);

// Add Comments
// const commentSchema = yup.object().shape({
//   comment: yup.string().required("Please enter a comment!"),
// });
// const { register: commmentRegister, handleSubmit: submitComment, formState: { errors: commentErr } } = useForm({
//   resolver: yupResolver(commentSchema),
// });

// const onSubmitComment = ({comment}) => console.log(comment);
//   console.log(commentErr);

const postData = async (newPost) => {
  try {
    let { data } = await Axios.post(`/api/comment/createComment/${id}`, { comment: desc }, { withCredentials: true })

      return data
      // console.log(user);
  } catch (error) {
    console.log(error);
  }
} 

const { mutate: addComment, error: postError, isLoading: creatingComment, isError: postingError } = useMutation(postData, {
  onSuccess: (successData) => { 
    console.log(successData)
    alert("post created successfully!")
   }
})



const handleCommSubmit = async (e) => {
  e.preventDefault();
  console.log(id, desc);
  addComment({ comment: desc })
}


const comment = (
  <div>
  <StyledForm onSubmit={handleCommSubmit}>
    <h3>add comment</h3>
      <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />

    <button>Create Comment</button>
  </StyledForm>
</div>
)



   let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
      const { post, comments } = data
      // console.log(post);
        content = <div key={post._id}>
                      <p>{post.text}</p>
                      <img src={post.image} alt='img'/>
                      <h1>your post has: {post.likes} like</h1>
                </div>
    }

    console.log(data);

  return (
    <>
      {user && <h1>{user.userName} Posts page</h1>}
      { content }

      <h1>Add comment</h1>
      { comment }
      <Button onClick={addLike}>Like</Button>
      <Button primary onClick={deletePost}>delete</Button>

    </>
    
  )
}

export default post


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid red;
  color: skyblue;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  cursor: ponter;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;



const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;