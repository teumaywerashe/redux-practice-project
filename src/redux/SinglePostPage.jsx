import React from "react";
import { useSelector } from "react-redux";
import {  selectSinglePost } from "./slices/postSlice";
import { useParams } from "react-router-dom";
import PostAuther from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function SinglePostPage() {
  const {postId} = useParams();
 
  const post = useSelector((state) => selectSinglePost(state, Number(postId)));


 
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuther userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post}/>
    </article>
  );
}

export default SinglePostPage;
