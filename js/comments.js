import { database } from './init.js';

const pageID = document.getElementById("recipeName").innerText; // Use innerText for text content
const commentsRef = database.ref("recipes/" + pageID);
const commentList = document.getElementById("comments-container");
const postCommentForm = document.getElementById("postComment");

postCommentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById("comment").value;
    const commentorName = document.getElementById("user").value;
    const rating = document.getElementById("rating").value;

    commentsRef.push().set({
        text: commentText,
        username: commentorName,
        // Use Firebase server time if possible
        time: (new Date()).toISOString(),
        rating: rating
    });

    postCommentForm.reset(); // Reset the form by its actual ID
});

function updateComments() {
    commentsRef.on('value', (snapshot) => {
        commentList.innerHTML = ''; // Clear comments list
        const val = snapshot.val();
        // Check if comments exist
        if (val) {
            Object.values(val).forEach(comment => {
                commentListAdd(comment);
            });
        } else {
            commentList.innerHTML = '<p> Be the first to leave a comment! </p>';
        }
    });
}

function commentListAdd(comment) {
    var thisComment = document.createElement('div');
    var commentUser = document.createElement('h2');
    var commentDate = document.createElement('h3');
    var commentText = document.createElement('p');
    thisComment.classList.add("comment");
    // Assuming the property is "username" based on how it's set
    commentUser.innerText = comment.username; // Use innerText instead of innerHTML when setting text content
    commentText.innerText = comment.text;
    commentDate.innerText = comment.time; // Display formatted time or format this as needed
    thisComment.appendChild(commentUser);
    thisComment.appendChild(commentDate);
    thisComment.appendChild(commentText);
    commentList.appendChild(thisComment);
}

updateComments(); // Call the function to start loading the comments