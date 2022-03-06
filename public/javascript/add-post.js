async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();

    if (title && post_content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_content
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard'); // or redirect to dashboard ? 
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.new-post').addEventListener('submit', newPostHandler);