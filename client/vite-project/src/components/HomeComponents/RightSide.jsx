import { AiOutlineHome, AiOutlineSetting, AiOutlineMail } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import TrendCard from "../TrendCard";
import Button from "../Button"

const RightSide = () => {
  return (
    <div className="flex flex-col gap-4 text-white">
        <div className="flex justify-between mt-4">
            <AiOutlineHome  className="text-2xl cursor-pointer"/>
            <AiOutlineSetting  className="text-2xl cursor-pointer"/>
            <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
            <AiOutlineMail  className="text-2xl cursor-pointer"/>
        </div>
        <TrendCard />
        <Button style="py-2 px-4 w-4/5 self-center" text="Share" />
    </div>
  )
}

export default RightSide