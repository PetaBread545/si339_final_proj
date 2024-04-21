const pageID = document.getElementById("recipeName").innerHTML;
const database = firebase.database()
const commentsRef = database.ref("recipes/" + pageID);
var commentList = document.getElementById("comments-container")

document.getElementById("postComment").addEventListener('submit', function(event){
    event.preventDefault();
    const commentText = document.getElementById("comment").value;
    const commentorName = document.getElementById("user").value;
    const rating = document.getElementById("rating").value;
    commentsRef.push().set({
        text: commentText,
        username: commentorName,
        time: new Date().toDateString(),
        rating: rating
    })
    document.getElementById("commentForm").reset()
})

updateComments();
function updateComments(){
    commentList.innerHTML = ''
    commentsRef.on('child_added', (snapshot) => {
        const comment = snapshot.val();
        commentListAdd(comment);
    })
    if(commentsRef.hasChild() == false){
        commentList.innerHTML = '<p> Be the first to leave a comment! </p>'
    }
};
function commentListAdd(comment){
    var thisComment = document.createElement('div');
    var commentUser = document.createElement('h2');
    var commentDate = document.createElement('h3');
    var commentText = document.createElement('p');
    thisComment.classList.add("comment")
    commentUser.innerHTML = comment.userName;
    commentText.innerHTML = comment.text;
    commentDate.innerHTML = comment.time;
    thisComment.appendChild(commentUser);
    thisComment.appendChild(commentDate)
    thisComment.appendChild(commentText);
    commentList.appendChild(thisComment); 
};