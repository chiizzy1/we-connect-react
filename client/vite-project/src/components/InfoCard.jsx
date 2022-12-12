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

const InfoCard = () => {

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
    <div className="flex flex-col gap-3 bg-gray-600 p-4 rounded-2xl w-4/5 ">
        <div className="flex items-center justify-between">
            <h4>Profile Info</h4>
            {profileUserId === user._id &&
            <>
                <BsPencil className="cursor-pointer" onClick={() => setModalState(true)}/> 
                <ProfileModal modalState={modalState} setModalState={setModalState} data={user} />
            </>
            }
        </div>
        
        <div className="flex">
            <span>City: </span>
            <span>{profileUser.city}</span>
        </div>
        <div className="flex">
            <span>Campus: </span>
            <span>{profileUser.campus}</span>
        </div>
        <div className="flex">
            <span>Country: </span>
            <span>{profileUser.country}</span>
        </div>
        <div className="flex">
            <span>Email: </span>
            <span>{profileUser.email}</span>
        </div>

        <button  className={`${styles.buttonStyles}`} onClick={()=> dispatch(setUserLogout())}>Log Out</button> 
    </div>
  )
}

export default InfoCard