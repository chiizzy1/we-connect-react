import React from 'react'
import { Link } from "react-router-dom";

const root = () => {
  return (
    <>
        <h1>Welcome to root page!</h1>
        <Link to={`/logIn`}>Login</Link>
        <Link to={`/signUp`}>Sign Up</Link>
    </>
  )
}

export default root