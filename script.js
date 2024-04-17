const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });
    const data = await response.json();
    renderPost(data);
    postForm.reset();
});

async function fetchPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    posts.forEach(post => renderPost(post));
}

function renderPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
    `;
    postsContainer.appendChild(postDiv);
}

fetchPosts();
