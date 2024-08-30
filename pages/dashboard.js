import { auth,storage,ref,uploadBytes,listAll,getDownloadURL } from "../firebase/app.js";

const listItems = document.querySelectorAll(".items");
const PopupClosingBtn = document.getElementById("closeBtn");
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const FileName = document.getElementById("FileNameField");
const UserName = document.getElementById("userName");
const SignOut = document.getElementById("signOut");
const uploadFileBtn = document.getElementById("submit");
const list = document.getElementById("FileItemList");
const userData = JSON.parse(sessionStorage.getItem("user"));

if (!userData) {
    window.location.href = "signin.html";
    //return 0;
}

UserName.innerHTML += `Welcome, ${userData.displayName}`;
previewFile();
console.log(listItems);

console.log(listItems);

let listTags = Object.keys(listItems)
listItems.forEach(Items=>{
    Items.addEventListener("click",function() {
        Showpopup();
    })
})

SignOut.addEventListener("click",function() {
    // Clearing session data on logout
    sessionStorage.clear();
    window.location.href = "../index.html";
})

PopupClosingBtn.addEventListener("click",function() {
    ClosePopUp();
})

function Showpopup() {
    document.getElementById("popup").style.display = "block";
}

function ClosePopUp() {
    document.getElementById("popup").style.display = "none";
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.add('dragover');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.remove('dragover');
    }, false);
});

// Handle dropped files
uploadArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

// Handle browse button click
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
});

function handleFiles(files) {
    files = [...files];
    FileName.innerHTML = files[0].name;
    uploadFileBtn.addEventListener("click",function () {
        //files.forEach(uploadToTheFB);
        uploadToTheFB(files[0]);
    })
    //files.forEach(previewFile);
    console.log(files);
}

function previewFile() {
    const folderRef = ref(storage, `uploads/${userData.uid}`);
    listAll(folderRef)
        .then((res) => {
            list.innerHTML = '';
            // Iterate over each item (file) in the folder
            res.items.forEach((itemRef) => {
                    // Get the download URL for each file
                    getDownloadURL(itemRef).then((url) => {
                    // Get the file name
                    const fileName = itemRef.name;
                    // Append the file name and download link to the list
                    list.innerHTML += `<li>${fileName}</a></li>`;
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            });
        })
        .catch((error) => {
            console.error('Error listing files:', error);
        });
}

function uploadToTheFB(file) {
    const uid = userData.uid;
    const fileRef = ref(storage, `uploads/${uid}/${file.name}`);
    uploadBytes(fileRef, file)
        .then(() => {
        // File upload is complete
        location.reload();
        console.log('File uploaded successfully');
    })
    .catch((error) => {
        // Handle the error
        console.error('Upload failed:', error);
    });

    
}
