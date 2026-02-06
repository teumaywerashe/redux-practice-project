import "./App.css";
import AddPost from "./redux/AddPost";
import PostList from "./redux/PostList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="secion">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new-post" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;

// 22:56
