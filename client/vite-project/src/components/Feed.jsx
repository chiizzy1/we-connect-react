import { useQuery } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { setPosts } from '../features/posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import Post from "./Post";
import Axios from "axios";


const Feed = () => {

  const { user } = useSelector(loggedUser)
  const dispatch = useDispatch()
  const { id } = useParams()

  async function fetchPosts() {
      let { data } = await Axios.get('/api/feed')
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["feed"], fetchPosts, {
    onSuccess: (successData) => { 
        // console.log(successData);
        dispatch(setPosts(successData))
     }
  })

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  let userData = data;
  
  if(id){
    userData = userData.filter((post)=> post.user === id)
  }

  if(!userData ) return 'No Posts';


  return (
    <div className="flex relative flex-col gap-4">
        {userData.map((post) => (
           <Post post={post} description="home" />
        ))}
    </div>
  )
}

export default Feed