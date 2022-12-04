import { feedback } from "../constants"
import Post from "./Post"
const Feed = () => {
  return (
    <div className="flex flex-col gap-4">
        {feedback.map((data, index) => (
           <Post data={data} id={index} />
        ))}
    </div>
  )
}

export default Feed