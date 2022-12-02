import RightSideBarData from "./RightSideBarData";
import { Link } from "react-router-dom";


  
const RightSideBar = () => {


  return (
    <div className={`w-72 h-screen fixed bg-darkPurple `}>
        <div className={`flex gap-x-4 items-center`}>
            <Link className={`font-poppins text-gradient font-bold cursor-pointer text-[30px]`} to="/">9jaConnect</Link>
        </div>

        <ul className="pt-6">
            {
                RightSideBarData.map((item, index) => (
                    <li key={index} className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 `}>
                        <Link className="flex" to={item.path}>
                            {item.icon}
                            <span className="ml-4">{item.title}</span>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default RightSideBar