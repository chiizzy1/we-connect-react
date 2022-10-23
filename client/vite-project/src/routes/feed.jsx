import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";


const feed = () => {

  async function fetchPosts() {
      const data = await Axios.get('http://localhost:2121/feed')
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

  console.log(data.data);

  return (
    <div>welcome to your feeds page feed</div>
  )
}

export default feed