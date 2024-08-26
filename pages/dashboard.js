const listItems = document.querySelectorAll('li');
const PopupClosingBtn = document.getElementById("closeBtn");
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const FileName = document.getElementById("FileNameField");
//const fileList = document.getElementById('fileList');

listItems.forEach(Items=>{
    Items.addEventListener("click",function() {
        Showpopup();
    })
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
    files.forEach(uploadFile);
    //files.forEach(previewFile);
}

function uploadFile(file) {
    // You can add your file upload logic here
    // For example, using XMLHttpRequest or Fetch to send the file to the server
    FileName.innerHTML = file.name;
    console.log('Uploading:', file);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        let li = document.createElement('li');
        li.innerHTML = `<strong>${file.name}</strong> (${Math.round(file.size / 1024)} KB)`;
        fileList.appendChild(li);
    };
}