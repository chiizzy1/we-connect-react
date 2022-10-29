import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react';
import Axios  from 'axios';
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const editProfile = () => {
 
  const [profilePic, setProfilePic] = useState("")
  const [userName, setUserName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [campus, setCampus] = useState("")
  const [sex, setSex] = useState("")
  const [twitter, setTwitter] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [mobile, setMobile] = useState(0)
  const [description, setDescription] = useState("")

  const { id } = useParams()
  const { user } = useSelector(loggedUser)

  // console.log(user);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
    } else {
      setProfilePic("");
    }
  };


  // Post Details
  const postData = async () => {
    try {
      let { data } = await Axios.put(`/api/edit/editProfile/${id}`, {
         profilePic, userName, country, city, campus, sex, twitter, linkedIn, mobile, description 
      }, { withCredentials: true })

        return data
        // console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 

  const { mutate, error, isLoading, isError } = useMutation(postData, {
    onSuccess: (successData) => { 
      console.log(successData)
      // navigate("/profile")
      alert("success")
     }
  })





  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({
      description, userName, country, city, sex, campus, twitter, linkedIn, mobile, profilePic
    });
  }


  if (isLoading){
    return <p>Loading...</p>
  }

  if (isError){
    return <div>Error! {error.message}</div>
  }


  
  return (
    <StyledCreateProduct>
          <StyledForm onSubmit={handleSubmit}>
          <h3>Create a Product</h3>
            { user && 
              <>
                  <input
              id="imgUpload"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              required
            />

            <input
              type="text"
              placeholder="userName"
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="campus"
              onChange={(e) => setCampus(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="mobile"
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="linkedIn"
              value={user.linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="sex"
              onChange={(e) => setSex(e.target.value)}
              required
            />


            <input
              type="text"
              placeholder="twitter"
              onChange={(e) => setTwitter(e.target.value)}
              required
            />
              </>
            }

            <button>Update Profile</button>
          </StyledForm>
       </StyledCreateProduct>
  )
}

export default editProfile


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;