import Axios from "axios"
import { useParams } from "react-router-dom"


// const postRouteApi = Axios.create({
//     baseURL: "http://localhost:2121/post"
// }) 


// const { id } = useParams;

// export const getPost = async () => {
//     const response = await postRouteApi.get(`/${id}`)
//     return response.data
// }

// export const createPost = async (post) => {
//     return await postRouteApi.post(`/createPost`, post)
// }

// export const likePost = async (id) => {
//     const { data } = await Axios.put(`/api/post/${id}`,  { withCredentials: true })
//       // console.log(data);
//     return data
// }

export const deletePost = async (id) => {
    try {
        const { data } = await Axios.delete(`/api/post/deletePost/${id}`,  { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
    }
}



// export default postRouteApi