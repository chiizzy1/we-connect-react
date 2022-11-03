import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar, Footer } from "./components";
import { Home, Feed, Login, SignUp, Root, EditProfile, Post, Profile, } from './routes';


const client = new QueryClient();


const App = () => (
  <div className="bg-primary w-full overflow-hidden">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/editProfile/:id" element={<EditProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<h1>Invalid URL...</h1>} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </div>
)

export default App