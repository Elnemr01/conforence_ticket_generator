let nameInpt=document.querySelector("#name");
let mailInpt=document.querySelector("#email");
let githubInpt=document.querySelector("#github");
let icon=document.querySelector(".upload");
let fileInpt=document.querySelector("#image");
let uploadContent=document.querySelector(".content");
let submit=document.querySelector(".submit");
let moveToOtherPage=document.querySelector(".moveTo");

let src="";
let flagObj={
    photo: false,
    name: false,
    email: false,
    github: false,
}


mailInpt.addEventListener("input",handleEmailInput);
nameInpt.addEventListener("input",handleNameInput);
githubInpt.addEventListener("input",handleGitHubInput);
icon.addEventListener("click",uploadAvatar);
submit.addEventListener("click",generateTicket);

// -------------------- functions -------------------//
localStorage.clear();

function handleEmailInput (eve) {
    let mailReg=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/igm;
    let val=mailInpt.value;
    let mHint=document.querySelector(".hint2");
    if(val.match(mailReg)) {
        mHint.style.display="none";
        mHint.classList.remove("empty");
        flagObj.email=true;
    }
    else {
        mHint.style.display="flex";
        mHint.classList.add("empty");
        flagObj.email=false;
    }
}

//------------------------------------------------------

function handleGitHubInput () {
    let val=githubInpt.value;
    let reg=/^[a-zA-Z0-9-]+$/igm;
    let hint=document.querySelector(".hint3");

    if(val.match(reg)) {
        hint.style.display="none";
        hint.classList.remove("empty");
        flagObj.github=true;
    }
    else {
        hint.style.display="flex";
        hint.classList.add("empty");
        flagObj.github=false;
    }
}

//------------------------------------------------------

function handleNameInput () {
    let val=nameInpt.value,res="";
    let hint=document.querySelector(".hint1");
    for(let i=0;i<val.length;i++) {
        if(val[i]!=" ")
            res+=val[i];
    }
    if(res=="") {
        hint.style.display="flex";
        hint.classList.add("empty");
        flagObj.name=false;
    }
    else {
        hint.style.display="none";
        hint.classList.remove("empty");
        flagObj.name=true;
    }

}

//------------------------------------------------------

function uploadAvatar () {
    fileInpt.click();
    fileInpt.addEventListener("change",addPhotoToPage);
    flagObj.photo=true;
}

//------------------------------------------------------

function addPhotoToPage (eve) {
    let file = eve.target.files[0];
    let hint=document.querySelector(`.hint0`);
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadContent.innerHTML=`
        <input type="file" name="image" id="image" accept=".png, .jpg">
        <img src="${e.target.result}" alt="photo" loading="lazy">
        <div class="text">
            <button type="button" onclick="deleteImage(event)">Remove image</button>
            <button type="button" onclick="changeImage(event)">Change image</button>
        </div>`;
        src=e.target.result;
        hint.style.display="none";
    }
    reader.readAsDataURL(file);
    // if(file.type!="image/jpeg" || file.type!="image/png") flagObj.photo=false;
}

//------------------------------------------------------

function deleteImage (event) {
    fileInpt.value="";
    src="";
    flagObj.photo=false;
    let hint=document.querySelector(`.hint0`);
    uploadContent.innerHTML=`
    <input type="file" name="image" id="image" accept=".png, .jpg" data-flag="photo">
    <img src="../images/icon-upload.svg" alt="photo" loading="lazy" class="upload">
    <span class="text">Drag and drop or click to upload</span>`;
    hint.style.display="flex";
    icon=document.querySelector(".upload");
    icon.addEventListener("click",uploadAvatar);
    event.preventDefault();
}

//------------------------------------------------------

function changeImage (event) {
    fileInpt.value="";
    uploadAvatar();
}

//------------------------------------------------------

function generateTicket () {
    let inputs=document.querySelectorAll("input");
    let askMove=true;
    inputs.forEach((input,i)=> {
        let hint=document.querySelector(`.hint${i}`);
        if(flagObj[input.getAttribute("data-flag")]===false) {
            hint.style.display="flex";
            hint.classList.add("empty");
            askMove=false;
        }
    });

    if(askMove) {
        let data=[];
        data.push(src);

        inputs.forEach((input,i)=> {
            if(i!=0) {
                data.push(input.value);
            }
        });
        localStorage.setItem("info",JSON.stringify(data));
        moveToOtherPage.click();
    }
}


