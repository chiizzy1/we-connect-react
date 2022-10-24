import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
// import mainRouteApi from '../api/mainRouteApi';

const profile = () => {
  const user = useSelector(loggedUser)

  

  async function fetchPosts() {
      const  data  = await Axios.get('http://localhost:2121/profile',  { withCredentials: true })
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["profile"], fetchPosts)

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  console.log(data);

  return (
    <>
      <div>Welcome to Profile page: <h1>{user.user.userName}</h1> </div>

    </>
  )
}

export default profile