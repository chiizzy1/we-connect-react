import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./routes/root";
// import ErrorPage from "./error-page";
import Navbar from "./Navbar"
import Login from './routes/login';
import SignUp from './routes/signUp';
import EditProfile from './routes/editProfile';
import Post from './routes/post';
import Profile from './routes/profile';
import Feed from './routes/feed';

function App() {
  
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/post" element={<Post />} />
            <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
