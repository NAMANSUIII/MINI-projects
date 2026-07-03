function searchGoogle(){

let text=document.getElementById("search").value;

if(text==""){
alert("Enter something to search");
return;
}

window.open("https://www.google.com/search?q="+encodeURIComponent(text),"_blank");

}

function lucky(){

window.open("https://www.google.com","_blank");

}

function changeTheme(){

document.body.classList.toggle("dark");

}