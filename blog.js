document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commentForm');
  const commentsContainer = document.getElementById('commentsContainer');

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `
        <strong>${comment.name}</strong> <span>(${comment.rating} estrellas)</span>
        <p>${comment.message}</p>
        <small>${new Date(comment.date).toLocaleString()}</small>
      `;
      commentsContainer.appendChild(commentDiv);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const rating = document.getElementById('rating').value;

    if (name && message) {
      const newComment = {
        name,
        message,
        rating,
        date: new Date().toISOString()
      };

      const comments = JSON.parse(localStorage.getItem('comments')) || [];
      comments.unshift(newComment);
      localStorage.setItem('comments', JSON.stringify(comments));

      form.reset();
      loadComments();
    }
  });

  loadComments();
});
