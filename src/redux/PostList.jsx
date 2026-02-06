import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPost } from './slices/postSlice'
import { useNavigate } from 'react-router-dom'
import PostAuther from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

function PostList() {
  const post=useSelector(selectAllPost)
const orderedPost=[...post].sort((a,b)=>b.date.localeCompare(a.date))
  const navigate=useNavigate()

  const renderedPost=orderedPost.map((post)=>{
    return(
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0,100)}</p>
        <p className='postCredit'>
          by <PostAuther userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
     <ReactionButtons post={post}/>
      </article>
    )
  })
  return (
   
     <section>
      <div className="head">
         <h2>Posts</h2><button onClick={()=>navigate('/new-post')}>+ add new post</button>
      </div>
     
      {renderedPost}
    </section>
  )
}

export default PostList
