import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar, Footer, RightSideBar } from "./components";
import { Home, Profile } from "./pages";
import styles from "./style";
import "./App.css"
// import { Home, Feed, Login, SignUp, Root, EditProfile, Post, Profile, } from './routes';


const client = new QueryClient();


const App = () => (
  <div className="bg-primary w-full h-screen">

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* <Home /> */}
        <Profile />
      </div>
    </div>


    
  </div>
)

export default App