import { AiOutlineHome, AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import TrendCard from "../TrendCard";
import Button from "../Button";
import styles from "../../style";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className={`flex flex-col gap-4 text-white`}>
        <div className={`flex justify-between rounded p-4 ${styles.glassM}`}>
            <Link to={`/home`}>
              <AiOutlineHome  className="text-2xl cursor-pointer"/>
            </Link>
            <AiOutlineSetting  className="text-2xl cursor-pointer"/>
            <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
            <AiOutlineMail  className="text-2xl cursor-pointer"/>
        </div>
        <TrendCard /> 
        <button className={`${styles.buttonStyles}`}>Share</button>
    </div>
  )
}

export default RightSide