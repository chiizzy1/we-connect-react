import Axios from "axios"

const mainRouteApi = Axios.create({
    baseURL: "http://localhost:2121",
    headers: {
        "Content-type": "application/json"
    }
})



// export const logUserIn = async (user) => {
//     return await mainRouteApi.post("/login", {
//         email: email,
//         password: password
//     })
// }

export const getUserProfile = async () => {
    const response = await mainRouteApi.get("/profile")
    return response.data
}

export const getFeed = async () => {
    const response = await mainRouteApi.get("/feed")
    return response.data
}

export const logUserOut = async () => {
    const response = await mainRouteApi.get("/logout")
    return response.data
}



export default mainRouteApi 