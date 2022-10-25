import { userPosts } from "../features/posts/postsSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loggedUser } from "../features/user/userSlice";
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";

const post = () => {
  const { id } = useParams()
  const { user } = useSelector(loggedUser)
  const  posts  = useSelector(userPosts)


  async function fetchPostAndComments() {
      const { data } = await Axios.get(`/api/post/${id}`,  { withCredentials: true })
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["post"], fetchPostAndComments)


  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  console.log(data);

  // Get post from store
  const getPost = posts.filter(item => item._id === id )
  // console.log("all posts", posts);
  // console.log("wanted post", getPost);
  // console.log(user);


  return (
    <>
      <h1>{user.userName} Posts page</h1>
      <div key={getPost[0]._id}>
            <p>{getPost[0].text}</p>
            <img src={getPost[0].image} alt='img'/>
          </div>
    </>
    
  )
}

export default post