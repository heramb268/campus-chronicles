import Header from "./components/header";
import {Routes,Route} from 'react-router-dom';
import Blogs from './pages/blogs';
import Login from './pages/login';
import Register from './pages/register';
import UserBlog from "./pages/user-blog";
import CreateBlog from "./pages/create-blog";
import BlogContents from "./pages/blog-contents";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs-posted" element={<UserBlog />} />
        <Route path="/user-profile/:id" element={<ProfilePage />} />
        <Route path="/blog-contents/:id" element={<BlogContents />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
