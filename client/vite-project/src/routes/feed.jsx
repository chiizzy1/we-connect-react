import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';


const feed = () => {

  const { user } = useSelector(loggedUser)

  // console.log("this user", user.user.userName);

  async function fetchPosts() {
      const { data } = await Axios.get('/api/feed')
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["feed"], fetchPosts)

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  // console.log(data);

  return (
    <div>welcome to your feeds: <h1>{user.userName}</h1>  </div>
  )
}

export default feed