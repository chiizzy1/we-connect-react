import Axios  from 'axios';
import { loggedUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setPosts } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const profile = () => {
  const [desc, setDesc] = useState("");
  const [productImg, setProductImg] = useState("")


  const { user } = useSelector(loggedUser)
  const dispatch = useDispatch()
  

  async function fetchPosts() {
      const { data } = await Axios.get('/api/profile',  { withCredentials: true })
      // console.log(data);
      return data.posts
  }

  const { data, error, isError, isLoading } = useQuery(["profile"], fetchPosts)

  






  // Create New Post

  const postData = async () => {
    try {
      let { data } = await Axios.post('/api/post/createPost', { text: desc, image: productImg }, { withCredentials: true })
  
        return data
        // console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 
  
  const { mutate: createPost, error: postError, isLoading: creatingPost, isError: postingError } = useMutation(postData, {
    onSuccess: (successData) => { 
      console.log(successData)
      alert("post created successfully!")
     }
  })



  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
  
    console.log(file);
    TransformFileData(file);
  };
  
  
  const TransformFileData = (file) => {
    const reader = new FileReader();
  
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };
  
  
  const handleCommSubmit = async (e) => {
    e.preventDefault();
    // console.log( desc, productImg);
    createPost({ text: desc, image: productImg })
  }
  
  
  const newPost = (
    <div>
    <StyledForm onSubmit={handleCommSubmit}>
      <h3>upload Pic</h3>
      <input
        id="imgUpload"
        accept="image/*"
        type="file"
        onChange={handleProductImageUpload}
        required
      />
  
        <input
            type="text"
            placeholder="Short Description"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
  
      <button>Create Comment</button>
    </StyledForm>
  
    <ImagePreview>
      {productImg ? (
        <>
          <img src={productImg} alt="error!" />
        </>
      ) : (
        <p>Product image upload preview will appear here!</p>
      )}
    </ImagePreview>
  </div>
  )


  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  // console.log(data.posts[0]._id);
  console.log(data);
  dispatch(setPosts(data))

  console.log(user);


  return (
    <>
      {user && <div>Welcome to Profile page: <h1>{user.userName}</h1> </div>}
      { <Link to={`/editProfile/${user._id}`}> <button>Edit Profile</button> </Link> }
      {data.length  && <div key={data[0]._id}>
            <p>{data[0].text}</p>
            <Link to={`/post/${data[0]._id}`}>
              <img src={data[0].image} alt='img'/>
            </Link>
          </div>}
      { newPost }
    </>
  )
}

export default profile


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