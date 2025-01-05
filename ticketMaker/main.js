let nameInpt=document.querySelector("#name");
let mailInpt=document.querySelector("#email");
let githubInpt=document.querySelector("#github");
let icon=document.querySelector(".upload");
let fileInpt=document.querySelector("#image");
let uploadContent=document.querySelector(".content");
let hint0=document.querySelector(".hint1");
let submit=document.querySelector(".submit");
let inputs=document.querySelectorAll("input");
let moveToOtherPage=document.querySelector(".moveTo");

let validMail=false;
let data=[];


mailInpt.addEventListener("input",handleEmailInput);
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
        mHint.classList.toggle("empty");
        validMail=true;
    }
    else {
        mHint.style.display="flex";
        mHint.classList.toggle("empty");
        validMail=false;
    }
}

//------------------------------------------------------

function uploadAvatar () {
    fileInpt.click();
    fileInpt.addEventListener("change",addPhotoToPage);
}

//------------------------------------------------------

function addPhotoToPage (eve) {
    let file = eve.target.files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadContent.innerHTML=`
        <input type="file" name="image" id="image" accept=".png, .jpg">
        <img src="${e.target.result}" alt="photo" loading="lazy">
        <div class="text">
            <button type="button" onclick="deleteImage(event)">Remove image</button>
            <button type="button" onclick="changeImage(event)">Change image</button>
        </div>`;
        data.push(e.target.result);
        hint0.style.opacity="0";
        uploadContent.classList.add("added");
    }
    reader.readAsDataURL(file);
}

//------------------------------------------------------

function deleteImage (event) {
    fileInpt.value="";
    uploadContent.innerHTML=`
    <input type="file" name="image" id="image" accept=".png, .jpg">
    <img src="../images/icon-upload.svg" alt="photo" loading="lazy" class="upload">
    <span class="text">Drag and drop or click to upload</span>`;
    uploadContent.classList.toggle("added");
    hint0.style.opacity="1";
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
    let askMove=false;
    inputs.forEach((input,i)=> {
        let hint=document.querySelector(`.hint${i}`);
        if(input.value==="") {
            hint.style.display="flex";
            hint.classList.toggle("empty");
            askMove=false;
        }
        else if (!validMail && i===2) {
            hint.style.display="flex";
            hint.classList.toggle("empty");
            askMove=false;
        }
        else {
            hint.style.display="none";
            askMove=true;
        }
    });

    if(askMove) {
        inputs.forEach((inpt,i)=> {
            if(i!==0) {
                data.push(inpt.value);
            }
        });
        localStorage.setItem("info",JSON.stringify(data));
        moveToOtherPage.click();
    }
}
