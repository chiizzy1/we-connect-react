import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai"

const Post = ({data, id}) => {
  return (
    <div className="flex flex-col p-4 bg-cyan-900 rounded-2xl gap-4">
        <img src={data.image} alt="post-img" className="w-full object-cover max-h-80 rounded-lg"/>

        <div className="flex gap-4 items-start">
            {data.liked ? <AiFillHeart className="text-2xl cursor-pointer text-red-500" /> : <AiOutlineHeart className="text-2xl cursor-pointer text-red-500" /> }
            <AiOutlineShareAlt className="text-2xl cursor-pointer text-green-500" />
            <AiOutlineMessage className="text-2xl cursor-pointer text-indigo-500"/>
        </div>

        <span>{data.likes}</span>

        <div className="flex">
            <span className="font-medium">{data.name}</span>
            <span>{data.content}</span>
        </div>
    </div>
  )
}

export default Post