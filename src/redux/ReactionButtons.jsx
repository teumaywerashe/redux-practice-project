import React from 'react'
import { useDispatch } from 'react-redux';
import { reactionAdded } from './slices/postSlice';

function ReactionButtons({post}) {
const dispatch=useDispatch()
  const reactionEmoji={
    thumbsUp:"👍",
    wow:"😮",
    heart:"❤️",
    rocket:"🚀",
    coffee:"☕"

  };
  return (
    <div>
      {Object.entries(reactionEmoji).map(([reaction, emoji]) => (
        <button className='reactionButton' type='button' onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))} key={reaction}>{emoji}{post?.reactions[reaction]}</button>
      ))}
    </div>
  )
}

export default ReactionButtons
