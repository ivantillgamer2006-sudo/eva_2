import React from 'react';
import { sanitizeHTML } from '../utils/validators';

const PostCard = ({ post, onEdit, onDelete }) => {
  const safeTitle = sanitizeHTML(post.title);
  const safeBody = sanitizeHTML(post.body);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{safeTitle}</h5>
          <p className="card-text flex-grow-1">{safeBody}</p>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button 
              className="btn btn-outline-warning btn-sm"
              onClick={() => onEdit(post)}
            >
              Editar
            </button>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(post.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;