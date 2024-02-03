import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Search from "./pages/search";
import SignUp from "./pages/signUp";
import User from "./pages/user";
import WritePost from "./pages/writePost";
import Test from "./pages/test";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/writepost" element={<WritePost />} />
      </Routes>
    </div>
  );
}

export default App;
