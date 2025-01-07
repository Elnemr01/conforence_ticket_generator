
let myInfo=JSON.parse(localStorage.getItem("info"));

let spanName= document.querySelector("span.name");
spanName.innerHTML=myInfo[1];


let github=document.querySelector("span.github");
github.innerHTML=`@${myInfo[3]}`;

let email=document.querySelector("span.email");
email.innerHTML=myInfo[2];

let personPhoto=document.querySelector(".personPhoto")
personPhoto.setAttribute("src",myInfo[0]);