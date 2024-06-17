import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, cover, createdAt, author, category, onDelete}) {

  async function deletePost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      console.log(result.message);  // Output the response message

      // Call parent component's onDelete method to update state after deletion
      onDelete(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt={title} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
          <span className="category">{category}</span>
        </p>
        <p className="summary">{summary}</p>
        <button onClick={() => deletePost(_id)}>Delete</button>
      </div>
    </div>
  );
}
