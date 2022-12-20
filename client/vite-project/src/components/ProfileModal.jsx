import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { loggedUser } from "../features/user/userSlice";
import {  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import Axios from "axios";
import styles from "../style";
import { useMutation } from "@tanstack/react-query";
import { setUserLogin } from '../features/user/userSlice';




const ProfileModal = ({modalState, setModalState, data}) => {
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profilePic, setProfilePic] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch()
    const { user } = useSelector(loggedUser);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
  const EditData = async () => {
    try {
      let { data } = await Axios.put(`/api/edit/editProfile/${id}`, {
         formData ,profilePic
      }, { withCredentials: true })

        return data
        // console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 

  const { mutate, error, isLoading, isError } = useMutation(EditData, {
    onSuccess: (successData) => { 
      console.log(successData);
      dispatch(setUserLogin(successData))
      setModalState(false);
     }
  })



    const handleSubmit = (e) => {
      e.preventDefault();
      mutate({ profilePic, formData })
      // console.log("profilePic:", profilePic ,formData);
    }
  
    return (
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened = {modalState}
        onClose={() => setModalState(false)}
      >
        {/* Modal content */} 

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3>Edit your info</h3>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}>
                  <input
                    name="profilePic"
                    type="file"
                    onChange={handleImageUpload}
                    // className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    value={formData.userName}
                    name="userName"
                    placeholder="User Name"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="firstName"
                    value={formData.firstName}
                    name="First Name"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="lastName"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="country"
                    value={formData.country}
                    name="country"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="city"
                    value={formData.city}
                    name="city"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="gender"
                    value={formData.sex}
                    name="sex"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="description"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="linkedIn"
                    value={formData.linkedIn}
                    name="linkedIn"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="twitter"
                    value={formData.twitter}
                    name="twitter"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="number"
                    placeholder="mobile"
                    value={formData.mobile}
                    name="mobile"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>

                <div className={`w-full sm:w-1/2  px-3 mb-6 sm:mb-0`}> 
                  <input
                    type="text"
                    placeholder="campus"
                    value={formData.campus}
                    name="campus"
                    onChange={handleChange}
                    className={`${styles.formInputStyles}`}
                  />
                </div>
            </div>
            

            
            <button type="submit" className={`${styles.formAuthButton} px-6 py-2`}>Edit</button>
        </form>
        
      </Modal>
    );
}



export default ProfileModal