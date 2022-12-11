import Axios from "axios";



export const Login = (userData) => Axios.post('/api/login', userData, { withCredentials: true });
export const SignUp = (userData) => Axios.post('/api/signup', userData, { withCredentials: true });

// export const Login = async (userData) => {
//     try {
//       let { data } = await Axios.post('/api/login', userData, { withCredentials: true })

//         return data
        
//     } catch (error) {
//       console.log(error);
//     }
//   } 

//  export const SignUp = async (userData) => {
//     try {
//       let { data } = await Axios.post('/api/signup', userData, { withCredentials: true })

//         return data
        
//     } catch (error) {
//       console.log(error);
//     }
//   } 