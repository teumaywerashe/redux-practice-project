import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./slices/postSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "./slices/userSlice";

function AddPost() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const users = useSelector(selectAllUsers);
  const [userId, setUserId] = React.useState("");
  const onauthorsChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (title.length > 0 && content.length > 0) {
        dispatch(postAdded(title, content, userId));
        setTitle("");
        setContent("");
        navigate("/");
      } else {
        alert("Title and content cannot be empty.");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add post. Please try again.");
    }
  };
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
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
        <label htmlFor="author">Author:</label>
        <select id="author" value={userId} onChange={onauthorsChange}>
          <option value="">Authors</option>
          {userOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          value={content}
          id="content"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button disabled={!canSave} type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
