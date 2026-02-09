import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./slices/postSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "./slices/userSlice";

function AddPost() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const users = useSelector(selectAllUsers);
  const [userId, setUserId] = React.useState("");
  const onauthorsChange = (e) => {
    setUserId(e.target.value);
  };

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const canSave =[title, body, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(canSave){
        setAddRequestStatus('pending')
        dispatch(addNewPost({title,body,userId}))
        setTitle("");
        setBody("");
        setUserId('')
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add post. Please try again.");
    }finally{
      setAddRequestStatus('idle')
    }
  };

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
        <label htmlFor="body">body:</label>
        <textarea
          name="body"
          value={body}
          id="body"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button disabled={!canSave} type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
