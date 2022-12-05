import { students } from "../assets"

const ProfileCard = () => {
  return (
        <div className="flex flex-col overflow-hidden bg-slate-600 rounded-lg w-full">
            <div className="flex relative items-center justify-center flex-col">
                <img src={students} alt="user-img" className="w-full max-h-48" />
                <img src={students} alt='cover-img' className="absolute w-24 rounded-full -bottom-12 "/>
            </div>

            <div className="flex flex-col items-center justify-center mt-12 ">
                <span className="">Izziano C</span>
                <span className="text">Software Engineer</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                 <hr className="w-4/5 border-orange-500" />
                    <div className="flex gap-4 w-4/5 justify-center items-center">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <span className="text">100</span>
                                <span className="text">followers</span>
                            </div>
                            <div className="w-0.5 h-11 bg-orange-500 "/>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <span className="text">2350</span>
                                <span className="text">following</span>
                            </div>
                    </div>
                 <hr className="w-4/5 border-orange-500" />
            </div>
        </div>
  )
}

export default ProfileCard