import { auth,createUserWithEmailAndPassword,updateProfile } from "./firebase/app.js";

let email = document.getElementById("emailAddress");
let name = document.getElementById("uname");
let password1 = document.getElementById("password");
let password2 = document.getElementById("confirm-password");
let submitBtn = document.getElementById("submit");
let Msg = document.getElementById("Alert");

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

submitBtn.addEventListener("click",function(){
    event.preventDefault();
    //let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!emailPattern.test(email.value)) {
            clearAlt()
            Msg.innerHTML += "Please enter a valid email address.<br>";
            console.log("err");
            return 0;
        }
        if (name === "") {
            clearAlt()
            Msg.innerHTML += "Please enter your name.<br>";
            console.log("err");
            return 0;
        }
        if (!strongPasswordPattern.test(password1.value)) {
            clearAlt()
            Msg.innerHTML += "Enter a strong password.<br>";
            console.log("err");
             return 0;
        }
        if (password1.value !== password2.value) {
            clearAlt()
            Msg.innerHTML += "Passwords do not match.<br>";
            console.log("err");
        }
        else{
            clearAlt()
            signIn(email.value,password2.value);
        }
})

function clearAlt(){
    Msg.innerHTML ="";
}

function signIn(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Update the user's display name
            updateProfile(user, {
                displayName: name.value
            }).then(() => {
                console.log("Username set successfully:", user.displayName);
                redirectAfterSubmit();

            }).catch((error) => {
                console.error("Error setting username:", error);
            });
        })
        .catch((error) => {
            Msg.innerHTML += "Account Create Fail";
            console.error("Error signing up:", error);
        })
}

function redirectAfterSubmit() {
    window.location.href = "/pages/signin.html";
}