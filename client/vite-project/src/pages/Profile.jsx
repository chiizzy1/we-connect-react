import { Middle, ProfileCard, ProfileLeft, RightSide } from "../components";
import "./Layout.css";
import styles from "../style";


const Profile = () => {
  return (
    <div className={`font-poppins text-white relative ${styles.paddingX} sm:pt-2 pt-1 ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} layout-grid`}>
        <ProfileLeft />
        <div className="gap-4 h-screen overflow-auto pb-8">
              <ProfileCard location="profilePage" />
              <Middle />
        </div>
        <RightSide />
      </div>

        
    </div>
    
  )
}

export default Profile