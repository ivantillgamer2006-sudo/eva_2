import React, { useState, useEffect } from 'react';
import { validatePost } from '../utils/validators';

const PostForm = ({ initialPost, onSubmit, onCancel }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
    }
  }, [initialPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
    
    const validation = validatePost({ ...post, [name]: value });
    setErrors(validation.errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validatePost(post);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    onSubmit(post);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5>{initialPost ? 'Editar' : 'Crear'} Publicación</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título *</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Escribe el título"
              maxLength="100"
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contenido *</label>
            <textarea
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
              name="body"
              rows="4"
              value={post.body}
              onChange={handleChange}
              placeholder="Escribe el contenido"
              maxLength="500"
            />
            {errors.body && (
              <div className="invalid-feedback">{errors.body}</div>
            )}
          </div>
          
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {initialPost ? 'Actualizar' : 'Crear'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;