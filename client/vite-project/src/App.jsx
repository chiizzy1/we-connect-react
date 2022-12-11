import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useSelector, useDispatch  } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Navbar, Footer, RightSideBar } from "./components";
import { Auth, Home, Profile } from "./pages";
import styles from "./style";
import "./App.css"
// import { Home, Feed, Login, SignUp, Root, EditProfile, Post, Profile, } from './routes';
import { Login } from "./routes"
import { loggedUser } from "./features/user/userSlice";


const client = new QueryClient({
                    defaultOptions: {
                      queries: {
                        refetchOnWindowFocus: true,
                      },
                    },
                  });


const App = () =>{
  const { user } = useSelector(loggedUser);


  return (
  
  <div className="bg-primary w-full h-screen">
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>


          
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
              {/* <Home /> */}
              <Route path="/" element={ <Auth /> } />
              {/* <Profile /> */}
              {/* <Auth /> */}


        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </div>

)}

export default App