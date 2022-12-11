import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import Button from "./Button";
import ProfileModal from "./ProfileModal";

const InfoCard = () => {

    const [modalState, setModalState] = useState(false);


    
  return (
    <div className="flex flex-col gap-3 bg-gray-600 p-4 rounded-2xl w-4/5 ">
        <div className="flex items-center justify-between">
            <h4>Your Info</h4>
           <BsPencil onClick={() => setModalState(true)}/> 
           <ProfileModal modalState={modalState} setModalState={setModalState}/>
        </div>
        
        <div className="flex">
            <span>Occupation </span>
            <span>Student</span>
        </div>
        <div className="flex">
            <span>campus </span>
            <span>MIT</span>
        </div>
        <div className="flex">
            <span>Country </span>
            <span>USA</span>
        </div>
        <div className="flex">
            <span>Course </span>
            <span>Engineering</span>
        </div>

        <Button text="Log Out" style="py-2 px-4 mt-9" />
    </div>
  )
}

export default InfoCard