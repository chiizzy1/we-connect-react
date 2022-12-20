import { useState } from "react";
import { loggedUser } from '../features/user/userSlice';
import { useSelector, useDispatch  } from 'react-redux';
import { students, userIcon } from "../assets"
import { Link } from "react-router-dom";
import { userPosts } from "../features/posts/postsSlice";
import styles from "../style";

const ProfileCard = ({location}) => {
    const { user } = useSelector(loggedUser);
    const posts  = useSelector(userPosts);
    // console.log(posts);
    
  return (
        <div className={`flex flex-col font-poppins ${styles.glassM} rounded ${ location === "profilePage" && "mb-4"}`}>
            <div className="flex relative items-center justify-center flex-col">
                <img src={user.profilePic ? user.profilePic : students } alt='cover-img' className="w-full max-h-48" />
                <img src={ user.profilePic ? user.profilePic : userIcon}  alt="user-img" className="absolute w-24 rounded-full -bottom-12 "/>
            </div>

            <div className="flex flex-col items-center justify-center mt-12 ">
                <span className="">{user.firstName } {user.lastName}</span>
                <span className="text">{user.description}</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 my-4">
                 <hr className="w-4/5 border-cyan-500" />
                    <div className="flex gap-4 w-4/5 justify-center items-center">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <span className="text">{user.followers.length}</span>
                                <span className="text">{user.followers.length > 1 ? "followers" : "follower"}</span>
                            </div>
                            <div className="w-0.5 h-12 bg-cyan-500 "/>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <span className="text">{user.following.length}</span>
                                <span className="text">following</span>
                            </div>

                            { location === "profilePage" && (
                                <>
                                    <div className="w-0.5 h-12 bg-cyan-500 "/>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <span className="text"> {posts && posts.filter(post => post.user === user._id).length} </span>
                                        <span className="text">Posts</span>
                                    </div>
                                </>
                            )}
                    </div>
                 <hr className="w-4/5 border-cyan-500" />
            </div>
            
            {location === "profilePage" ? "" :  <Link to={`/profile/${user._id}`} className={`${styles.buttonStyles} text-center`}>My Profile</Link> }
        </div>
  )
}

export default ProfileCard