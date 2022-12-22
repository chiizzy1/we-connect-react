import styles from '../style'
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from 'axios';
import { userIcon } from '../assets';


const Followers = ({person}) => {
  const { user } = useSelector(loggedUser);
  const [follow, setFollow] = useState(person.followers.includes(user._id));


  const followUser = async () => {
    try {
      const { data } = await Axios.put(`/api/user/follow/${person._id}`, { userId: user._id },  { withCredentials: true })
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate, isLoading } = useMutation(followUser, {
    onSuccess: (successData) => { 
      console.log(successData);
      // queryClient.invalidateQueries("post")
     },
    onError:(err) => {console.log(err)} 
  })


  const handleFollow = () => {
    console.log(person._id, user._id)
    mutate(person._id)
  }

  return (
    <div className='flex justify-between items-center ' key={person._id}>
        
        <div className="flex gap-1">
            <img src={person.profilePic? person.profilePic : userIcon} alt="user-img" className='h-12 w-12 rounded-full'/>
            <div className="flex flex-col items-start justify-center">
                <span className="">{person.userName}</span>
            </div>
        </div>

        <button className={`${styles.buttonStyles}`} onClick={handleFollow} >{follow? "UnFollow" : "Follow"}</button>
    </div>
  )
}

export default Followers