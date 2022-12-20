import Axios  from 'axios'
import { useQuery } from "@tanstack/react-query";
import Post from './Post';
import AllComments from './AllComments';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PostAndComments = () => {
    const [allcomments, setAllComments] = useState([])
    const { id } = useParams();
    let postData;

// Get Post and Comments attached to it
  async function fetchPostAndComments() {
    const { data } = await Axios.get(`/api/post/${id}`,  { withCredentials: true })
    // console.log(data);
    return data
}

    const { data, error, isError, isLoading } = useQuery(["postComm"], fetchPostAndComments, {
        onSuccess: (successData) => { 
            console.log("fetch successful"); 
         },
         onError:(err) => {console.log(err)} 
      });
      

      if (isError) {
        return <div>Error! {error.message}</div>;
      }
    
      if (isLoading) {
        return <h1> Loading...</h1>;
      }

  return (
    <div className='text-white'>
        {data && <Post post={data.post} description="PostAndComments" />}
        <ul>
            {data && data.comments.map(comm => (
                <li key={comm._id}>{comm.comment}</li>
            ))}
        </ul>
        {/* <h1>Watawi</h1> */}
    </div>
  )
}

export default PostAndComments