import { userPosts } from "../features/posts/postsSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loggedUser } from "../features/user/userSlice";
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";



const post = () => {
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
      console.log("deleted", id);
      navigate("/profile")
     },
    onError:(err) => {console.log(err)} 
  })



  const deletePost = () => {
    console.log("deleted", id);
    mutateDelete(id)
  }
  // if (isError) {
  //   return <div>Error! {error.message}</div>;
  // }

  // if (isLoading) {
  //   return <h1> Loading...</h1>;
  // }

  

  // Get post from store
  // const getPost = posts.filter(item => item._id === id )
  // console.log("all posts", posts);
  // console.log("wanted post", getPost);
  // console.log(user);


   let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
      const { post, comments } = data
      console.log(post);
        content = <div key={post._id}>
                      <p>{post.text}</p>
                      <img src={post.image} alt='img'/>
                      <h1>your post has: {post.likes} like</h1>
                </div>
    }


  return (
    <>
      {user && <h1>{user.userName} Posts page</h1>}
      { content }

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