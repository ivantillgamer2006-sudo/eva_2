import React from 'react';
import PostCard from './PostCard';

const PostGrid = ({ posts, onEdit, onDelete, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando publicaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>No hay publicaciones</h3>
        <p className="text-muted">Crea tu primera publicación.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostGrid;