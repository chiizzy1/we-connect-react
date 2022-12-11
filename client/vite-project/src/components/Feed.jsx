import { useQuery } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { setPosts } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import Post from "./Post";
import Axios from "axios";


const Feed = () => {

  const { user } = useSelector(loggedUser)
  const dispatch = useDispatch()
  // console.log("this user", user.user.userName);

  async function fetchPosts() {
      const { data } = await Axios.get('/api/feed')
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["feed"], fetchPosts, {
    onSuccess: (successData) => { 
        console.log(successData);
        dispatch(setPosts(successData))
     }
  })

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }


  return (
    <div className="flex flex-col gap-4">
        {data.map((post) => (
           <Post post={post}  />
        ))}
    </div>
  )
}

export default Feed