import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { fetchPosts } from './services/api';
import { useLocalStorage } from './hooks/useLocalStorage';
import PostGrid from './components/PostGrid';
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useLocalStorage('blogPosts', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const apiPosts = await fetchPosts();
        setPosts(apiPosts);
        setError(null);
      } catch (err) {
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
          setError('Usando datos locales. La API no está disponible.');
        } else {
          setError('No se pudieron cargar los datos.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleAddPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
      userId: 1,
    };
    setPosts([postWithId, ...posts]);
    setShowForm(false);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
    setEditingPost(null);
    setShowForm(false);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta publicación?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="app-container">
      <header className="bg-primary text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1>📝 Gestor de Publicaciones</h1>
            <button 
              className="btn btn-light"
              onClick={() => {
                setEditingPost(null);
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cerrar' : 'Nueva Publicación'}
            </button>
          </div>
        </div>
      </header>

      <main className="container py-4">
        {showForm && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8">
              <PostForm
                initialPost={editingPost}
                onSubmit={editingPost ? handleUpdatePost : handleAddPost}
                onCancel={handleCancelForm}
              />
            </div>
          </div>
        )}

        <PostGrid
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDeletePost}
          loading={loading}
          error={error}
        />
      </main>

      <footer className="bg-dark text-white-50 py-3 mt-5">
        <div className="container text-center">
          <small>Datos guardados en tu navegador con Local Storage</small>
        </div>
      </footer>
    </div>
  );
}

export default App;