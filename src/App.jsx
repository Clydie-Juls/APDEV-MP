import { Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Search from "./pages/search";
import SignUp from "./pages/signUp";
import User from "./pages/user";
import PostEditor from "./pages/postEditor";
import Comment from "./pages/comment";
import EditLoginInfo from './pages/editLoginInfo';
import Post from "./pages/post";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editlogininfo" element={<EditLoginInfo />} />
        <Route path="/user" element={<User />} />
        <Route path="/writepost" element={<PostEditor isWritePost={true} />} />
        <Route path="/editpost" element={<PostEditor isWritePost={false} />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/writecomment" element={<Comment isWriteComment={true} />} />
        <Route path="/editcomment" element={<Comment isWriteComment={false} />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
