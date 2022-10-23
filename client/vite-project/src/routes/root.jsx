import React from 'react'
import { Link } from "react-router-dom";

const root = () => {
  return (
    <>
        <h1>Welcome to root page!</h1>
        <Link to={`/login`}>Login</Link>
        <Link to={`/signup`}>Sign Up</Link>
    </>
  )
}

export default root