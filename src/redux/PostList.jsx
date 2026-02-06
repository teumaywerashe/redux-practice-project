import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPost } from './slices/post'
import { useNavigate } from 'react-router-dom'

function PostList() {
  const post=useSelector(selectAllPost)

  const navigate=useNavigate()

  const renderedPost=post.map((post)=>{
    return(
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0,100)}</p>
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
