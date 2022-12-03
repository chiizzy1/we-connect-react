import { useRef, useState } from "react";
import { students } from "../assets";
import { TfiGallery } from "react-icons/tfi";
import { AiOutlinePlayCircle, AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiTireIronCross } from "react-icons/gi";
import Button from "./Button";


const NewPost = () => {

    const [image, setImage] = useState(null);
    const imageRef = useRef();

    const onImageChange = (e) =>{
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    }

  return (
    <div className="flex gap-4 p-4 rounded-md bg-cyan-900">
        <img src={students} alt="profile-img" className="w-12 h-12 rounded-full"/>
        <div className="flex flex-col gap-4 w-full">
            <input 
                type="text" 
                name="" id="" 
                placeholder="Make a Post"
                className="rounded p-2 border-0 text-lg outline-0"
            />
            
            <div className="flex justify-around ">
                <div onClick={() => imageRef.current.click()} className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <TfiGallery className="text-2xl text-green-500" />
                    <p>Photo</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <AiOutlinePlayCircle className="text-2xl text-indigo-500" />
                    <p>Video</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <HiOutlineLocationMarker className="text-2xl text-red-500" />
                    <p>Location</p>
                </div>
                <div className="flex rounded-md gap-2 flex-col justify-center cursor-pointer items-center font-medium">
                    <AiOutlineSchedule className="text-2xl text-yellow-500" />
                    <p>Schedule</p>
                </div>
                <Button style="py-2 px-4" text="Share" />
                {/* File Input */}
                <div className="hidden">
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                </div>
            </div>
            {image && (
                <div className="flex  gap-4 w-72 h-72">
                    <GiTireIronCross className="text-red-200"/>
                    <img src={image.image} alt="img-preview" className="w-full"/>
                </div>
            )}
        </div>
    </div>
  )
}

export default NewPost