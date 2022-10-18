import React from 'react';
import Axios from "axios"

const Welcome = () => {

  const [formData, setFormData] = React.useState({
      email: "",
      password: ""
  })

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
          console.log(res);
      }).catch(err => {
          // Handle error
          console.log(err);
      });
  }


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

export default Welcome