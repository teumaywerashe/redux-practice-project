import React from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./slices/post";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (title.length > 0 && content.length > 0) {
        dispatch(postAdded(title, content));
        setTitle("");
        setContent("");
        navigate("/");
      }else{
        alert("Title and content cannot be empty.");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add post. Please try again.");
    }
  };
  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>{" "}
        <input
          value={title}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          value={content}
          id="content"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;
