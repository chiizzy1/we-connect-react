import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setPosts } from '../features/posts/postsSlice';


const profile = () => {
  const { user } = useSelector(loggedUser)
  const dispatch = useDispatch()
  

  async function fetchPosts() {
      const { data } = await Axios.get('/api/profile',  { withCredentials: true })
      // console.log(data);
      return data.posts
  }

  const { data, error, isError, isLoading } = useQuery(["profile"], fetchPosts)

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  // console.log(data.posts[0]._id);
  console.log(data[0]._id);
  dispatch(setPosts(data))

  return (
    <>
      <div>Welcome to Profile page: <h1>{user.userName}</h1> </div>
      {
        data && data.map((post) => {
          <div key={post._id}>
            <p>{post.text}</p>
            <img src={post.image} alt='img'/>
          </div>
        })
      }

    </>
  )
}

export default profile