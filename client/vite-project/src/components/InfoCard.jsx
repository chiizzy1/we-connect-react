import { useState, useEffect} from "react";
import { BsPencil } from "react-icons/bs";
import Button from "./Button";
import ProfileModal from "./ProfileModal";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loggedUser } from "../features/user/userSlice";
import {  useParams } from 'react-router-dom'; 
import { setUserLogout } from "../features/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import styles from "../style";

const  InfoCard = () => {

    const [modalState, setModalState] = useState(false);
    const { id } = useParams()
    const profileUserId = id;
    const [profileUser, setProfileUser] = useState({});
    // setUserLo 
    const dispatch = useDispatch()

    // Get user details from redux store
    const { user } = useSelector(loggedUser)



    // fetch Profile owner info
   

    
    
    useEffect(() => {
        const fetchProfileUser = async () => {
                if (profileUserId === user._id){
                    setProfileUser(user)
                }else{
                    try {
                        console.log("fetching");
                        const { data } = await Axios.get(`/api/user/${id}`);
                        console.log(data);
                        setProfileUser(data);
                    } catch (error) {
                        console.log(error);
                    }
                }
            };
            
        fetchProfileUser();
    }, [user])



   

    // console.log(profileUser);
        
  return (
    <div className={`flex flex-col gap-3 ${styles.glassM} p-4 rounded`}>
        <div className="flex items-center justify-between">
            <h3 className={`${styles.h3Style}`}>Profile Info</h3>
            {profileUserId === user._id &&
            <>
                <BsPencil className="cursor-pointer font-medium text-2xl text-green-300" onClick={() => setModalState(true)}/> 
                <ProfileModal modalState={modalState} setModalState={setModalState} data={user} />
            </>
            }
        </div>
        
        <div className="flex">
            <span className="w-2/5">City: </span>
            <span>{profileUser.city}</span>
        </div>
        <div className="flex">
            <span className="w-2/5">Campus: </span>
            <span>{profileUser.campus}</span>
        </div>
        <div className="flex">
            <span className="w-2/5">Country: </span>
            <span>{profileUser.country}</span>
        </div>
        <div className="flex">
            <span className="w-2/5">Email: </span>
            <span>{profileUser.email}</span>
        </div>

        <button  className={`${styles.buttonStyles} mt-9`} onClick={()=> dispatch(setUserLogout())}>Log Out</button> 
    </div>
  )
}

export default InfoCard