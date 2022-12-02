import { feedback } from "../constants"
import Followers from "./Followers"

const FollowersCard = () => {
  return (
    <div className="w-full rounded-lg flex flex-col max-h-40 gap-4">
        <h3>People you may know</h3>
        
        {feedback.map((data, index) => (
            <Followers data={data} id={index}/>
        ))}
    </div>
  )
}

export default FollowersCard