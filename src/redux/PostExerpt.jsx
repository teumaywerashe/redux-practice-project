import React from "react";
import PostAuther from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

function PostExerpt({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p className="excerpt">{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuther userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostExerpt;
