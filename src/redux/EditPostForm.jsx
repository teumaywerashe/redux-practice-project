import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectSinglePost } from "./slices/postSlice";
import { selectAllUsers } from "./slices/userSlice";

function EditPostForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectSinglePost(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispacth = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post Not found</h2>
      </section>
    );
  }

  const onTitileChnage = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispacth({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`post/${postId}`);
      } catch (error) {
        console.log("Failed to update post", error.response.message);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitileChnage}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select onChange={onAuthorChange} defaultValue={userId} id="postAutor">
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}></textarea>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
      </form>
    </section>
  );
}

export default EditPostForm;
