import Axios from "axios"
import { useParams } from "react-router-dom"




const { id } = useParams;

export const getPost = async () => {
    const response = await Axios.get(`/api/${id}`)
    return response.data
}

export const createPost = async (post) => {
    return await Axios.post(`/api/createPost`, post)
}

export const likePost = async (id) => {
    const { data } = await Axios.put(`/api/post/${id}`,  { withCredentials: true })
      // console.log(data);
    return data
}

export const deletePost = async (id) => {
    try {
        const { data } = await Axios.delete(`/api/post/deletePost/${id}`,  { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
    }
}



// export default Axios