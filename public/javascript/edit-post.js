// save new content to post
async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('.edit-title-textarea').value;
    const post_content = document.querySelector('.edit-post-textarea').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // console.log(title)
    // console.log(post_content)
    // console.log(id)

    if (title && post_content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                post_content
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-post-btn').addEventListener('click', editPostHandler);