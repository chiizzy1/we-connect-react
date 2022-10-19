import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const useFetch = (url) => {

    const [result, setResult] = useState({
        data: null,
        isPending: true,
        error: false
    })

    useEffect(()=>{
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
    }, [])
    
  return (
    <div>useFetch</div>
  )
}

export default useFetch