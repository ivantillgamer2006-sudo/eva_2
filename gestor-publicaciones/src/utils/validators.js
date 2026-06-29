export const sanitizeHTML = (str) => {
  if (!str) return '';
  
  let decoded = str
    .replace(/&#x27;/g, "'")   // Comilla simple
    .replace(/&quot;/g, '"')   // Comilla doble
    .replace(/&amp;/g, '&')    // Ampersand
    .replace(/&lt;/g, '<')     // Menor que
    .replace(/&gt;/g, '>')     // Mayor que
    .replace(/&#x2F;/g, '/');  // Barra
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return decoded;
};

export const decodeHTML = (str) => {
  if (!str) return '';
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/');
};

export const isValidTitle = (title) => {
  if (!title) return false;
  const sanitized = title.trim();
  return sanitized.length >= 3 && sanitized.length <= 100;
};

export const isValidBody = (body) => {
  if (!body) return false;
  const sanitized = body.trim();
  return sanitized.length >= 10 && sanitized.length <= 500;
};

export const validatePost = (post) => {
  const errors = {};
  
  if (!isValidTitle(post.title)) {
    errors.title = 'El título debe tener entre 3 y 100 caracteres.';
  }
  
  if (!isValidBody(post.body)) {
    errors.body = 'El contenido debe tener entre 10 y 500 caracteres.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};