import { auth,storage,ref,uploadBytes,listAll,getDownloadURL,deleteObject,signOut } from "../firebase/app.js";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


const listItems = document.getElementById(".items");
const PopupClosingBtn = document.getElementById("closeBtn");
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const FileName = document.getElementById("FileNameField");
const UserName = document.getElementById("userName");
const SignOut = document.getElementById("signOut");
const uploadFileBtn = document.getElementById("submit");
const list = document.getElementById("FileItemList");

const downloadButton = document.getElementById('Download');
const deleteButton = document.getElementById('Delete');

const userData = JSON.parse(sessionStorage.getItem("user"));

if (!userData) {
    window.location.href = "signin.html";
}

UserName.innerHTML += `Welcome, ${userData.displayName}`;
previewFile();
console.log(listItems);

console.log(listItems);

SignOut.addEventListener("click",function() {

    signOut(auth).then(() => {
        // Clear all session data
        // Sign-out successful.
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("authToken");
        sessionStorage.clear();
        localStorage.clear();
        clearAllCookies();
    
        window.location.href = "../index.html";
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
})

function clearAllCookies() {
    const cookies = document.cookie.split(";");
  
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

PopupClosingBtn.addEventListener("click",function() {
    ClosePopUp();
})


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
        uploadToTheFB(files[0]);
    })
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
                        
                        // Create a new list item
                        const listItem = document.createElement('li');
                        listItem.textContent = fileName;
                        listItem.dataset.url = url; // Store the download URL in a data attribute
                        listItem.dataset.name = fileName; // Store the file name in a data attribute
                        list.appendChild(listItem);

                    listItem.addEventListener('click',function() {
                        Showpopup(listItem);
                    })
                    
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

    if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the limit of 5MB. Please select a smaller file.");
        location.reload();
        fileInput.value = ""; // Clear the file input
    }

    const uid = userData.uid;
    const fileRef = ref(storage, `uploads/${uid}/${file.name}`);
    uploadBytes(fileRef, file)
    .then(() => {
        // File upload is complete
        location.reload();
        alert("File uploaded successfully");
    })
    .catch((error) => {
        // Handle the error
        console.error('Upload failed:', error);
    });
}

function Showpopup(item) {
    const popup = document.getElementById('popup');
    const fileNameElement = document.getElementById('FileName');
    let ItemName = item.dataset.name;

    fileNameElement.textContent = item.dataset.name;

    downloadButton.onclick = function() {
        window.open(item.dataset.url, '_blank');
    };

    deleteButton.addEventListener('click',function () {
        Deletefile(ItemName);
    })

    // Show the popup
    popup.style.display = "block";

}

function Deletefile(FileName) {
    const uid = userData.uid;
    const fileRef = ref(storage, `uploads/${uid}/${FileName}`);
    deleteObject(fileRef).then(() => {
        // Remove the item from the list
        alert("File deleted");
        location.reload();
    }).catch((error) => {
        console.error('Error deleting file:', error);
    });
};