var menuButton = document.getElementById("menu");
var navBar = document.querySelector(".nav_bar");
menuButton.addEventListener("click", function(){
    if(navBar.style.display == "none"){
        navBar.style.setProperty("display", "block");
    }else{
        navBar.style.setProperty("display", "none")
    }
})