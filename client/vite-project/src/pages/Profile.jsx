import { Middle, ProfileCard, ProfileLeft, RightSide } from "../components";
import "./Layout.css";


const Profile = () => {
  return (
    <div className='text-white relative layout-grid '>
        <ProfileLeft />
        <div className="flex flex-col">
            <ProfileCard location="profilePage" />
            <Middle />
        </div>
        <RightSide />
    </div>
  )
}

export default Profile