// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("edit-post");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// save new content to post
async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('.edit-title-textarea').value;
    const post_content = document.querySelector('.edit-post-textarea').value;

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // console.log(id)
    // console.log(title)
    // console.log(post_content)

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
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-post-btn').addEventListener('click', editPostHandler);