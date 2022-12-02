import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar, Footer, RightSideBar } from "./components";
import { Home } from "./pages";
import styles from "./style";
// import { Home, Feed, Login, SignUp, Root, EditProfile, Post, Profile, } from './routes';


const client = new QueryClient();


const App = () => (
  <div className="bg-primary w-full overflow-hidden">

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Home />
      </div>
    </div>


    
  </div>
)

export default App