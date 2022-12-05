import { Middle, ProfileCard, ProfileLeft } from "../components";
import "./Layout.css";


const Profile = () => {
  return (
    <div className='text-white relative layout-grid '>
        <ProfileLeft />
        <div className="flex flex-col">
            <ProfileCard />
            <Middle />
        </div>
    </div>
  )
}

export default Profile