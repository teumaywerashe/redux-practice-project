import "./App.css";
import AddPost from "./redux/AddPost";
import PostList from "./redux/PostList";
import { Route, Routes } from "react-router-dom";
import SinglePostPage from "./redux/SinglePostPage";
import Layout from "./components/Layout";
import { UpdatePost } from "./redux/slices/postSlice";
function App() {
  return (
    <div className="secion">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPost />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<UpdatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// 22:56
