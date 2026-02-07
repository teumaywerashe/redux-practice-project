import React from 'react'
import PostAuther from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

function PostExerpt({post}) {
  return (
    <article >
        <h3>{post.title}</h3>
        <p>{post.body.substring(0,100)}</p>
        <p className='postCredit'>
          by <PostAuther userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
     <ReactionButtons post={post}/>
      </article>
  )
}

export default PostExerpt
