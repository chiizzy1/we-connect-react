import Axios  from 'axios';
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { FeedCard } from '../components';
import styles from '../style';
import { Link } from 'react-router-dom';

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
    <div className={`${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} flex-col`}>
      { user && <h1 className='text-white'> Welcome to your feeds page {user.userName} </h1>}
      <div className="grid grid-cols-4 gap-8">
        {data && data.map((post, index) => (
          <Link to={`/post/${post._id}`} className="cardContainer cursor-pointer">
            <FeedCard
              text={post.text}
              likes={post.likes}
              image={post.image}
              id={post._id}
            />
          </Link>
          
       ))}
      </div>
      
                      
    </div>
  )
}

export default feed