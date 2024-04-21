// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase configuration for your project
const firebaseConfig = {
    apiKey: "AIzaSyAidhG9aOtiR1GPmcicMKC2uzFOI5SvSQ0",
    authDomain: "si339final.firebaseapp.com",
    projectId: "si339final",
    storageBucket: "si339final.appspot.com",
    messagingSenderId: "871224604451",
    appId: "1:871224604451:web:3077444f5cccbcfcd3be96",
    measurementId: "G-SXWP24X75P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app, 'https://si339final-default-rtdb.firebaseio.com');


const pageID = document.getElementById("recipeName").innerText; // Use innerText for text content
const commentsRef = ref(database, "recipes/" + pageID);
const commentList = document.getElementById("comments-container");
const postCommentForm = document.getElementById("postComment");

postCommentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById("comment").value;
    const commentorName = document.getElementById("user").value;
    const rating = document.getElementById("rating").value;

    let newCommentRef = push(commentsRef);

    set(newCommentRef, {
        text: commentText,
        username: commentorName,
        time: new Date().toISOString(),
        rating: rating
    });

    postCommentForm.reset(); // Reset the form by its actual ID
});



function updateComments() {
    onValue(commentsRef, (snapshot) => {
        commentList.innerHTML = ''; // Clear comments list
        const val = snapshot.val();
        // Check if comments exist
        if (val) {
            Object.values(val).forEach(comment => {
                commentListAdd(comment);
            });
        } else {
            document.querySelector(".commentPlaceholder").innerHTML = '<p> Be the first to leave a comment! </p>';
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