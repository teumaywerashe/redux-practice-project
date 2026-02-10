import React from "react";
import {  useSelector } from "react-redux";
import {

  getError,
  getPostStatus,
  selectAllPost,
} from "./slices/postSlice";
import { useNavigate } from "react-router-dom";
import PostExerpt from "./PostExerpt";

function PostList() {
  const posts = useSelector(selectAllPost);
  const status = useSelector(getPostStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();

  

  let content;

  if (status === "loading") {
    content = <h1>Loading......</h1>;
  } else if (status === "succeeded") {
    const orderedPost = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPost.map((post) => (
      <PostExerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <div className="head">
        <h2>Posts</h2>
        <button onClick={() => navigate("/post")}>
          + add new post
        </button>
      </div>
      {content}
    </section>
  );
}

export default PostList;
