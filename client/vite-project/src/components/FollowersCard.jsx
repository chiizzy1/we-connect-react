import { feedback } from "../constants"
import Followers from "./Followers";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { useState } from "react";




const FollowersCard = () => {
  const [people, setPeople] = useState([]);

  const { user } = useSelector(loggedUser)

  // Fetch all Users
  async function fetchUsers() {
      const { data } = await Axios.get('/api/user')
      // console.log(data);
      return data
  }

  const { data, error, isError, isLoading } = useQuery(["users"], fetchUsers, {
    onSuccess: (successData) => { 
        // console.log(successData);
        setPeople(successData)
     }
  })

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }


  return (
    <div className="w-full rounded-lg flex flex-col max-h-40 gap-4">
        <h3>People you may know</h3>
        
        {people.map((person) => (
            person._id !== user._id && <Followers person={person} />
        ))}
    </div>
  )
}

export default FollowersCard