import Axios  from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"




// const loader = async () => {
//   const user = await getUser();
//   if (!user) {
//     return redirect("/login");
//   }
// };



const login = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState ({
        email: "",
        password: ""
    })

    const [userData, setUserData] = useState(null)
  
    function handleChange(event) {
      const {name, value, type, checked} = event.target
      setFormData(prevFormData => ({
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value
      }))
    }
  
    function handleSubmit(event) {
        event.preventDefault()
  
        Axios.post('http://localhost:2121/login', {
                  email: formData.email,
                  password: formData.password
              })
              .then(res => {
                  // Work with the response...
                //   console.log(res.data);
                  setUserData(() => res.data)
                  navigate("/feed")
                
              }).catch(err => {
                  // Handle error
                  console.log(err);
              });

        
    }
  console.log(userData);
  
    return (
      <>
        <h1>Welcome to Landing Page</h1>
  
        <form className="form" onSubmit={handleSubmit}>
                  <input 
                      type="email" 
                      placeholder="Email address"
                      className="form--input"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                  />
                  <input 
                      type="password" 
                      placeholder="Password"
                      className="form--input"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                  />
                  {/* <input 
                      type="password" 
                      placeholder="Confirm password"
                      className="form--input"
                      name="passwordConfirm"
                      onChange={handleChange}
                      value={formData.passwordConfirm}
                  /> */}
                  
                  {/* <div className="form--marketing">
                      <input
                          id="okayToEmail"
                          type="checkbox"
                          name="joinedNewsletter"
                          onChange={handleChange}
                          checked={formData.joinedNewsletter}
                      />
                      <label htmlFor="okayToEmail">I want to join the newsletter</label>
                  </div> */}
                  <button 
                      className="form--submit"
                  >
                      Sign up
                  </button>
              </form>
      </>
    )

}

export default login