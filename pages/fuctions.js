import { auth,signInWithEmailAndPassword } from "../firebase/app.js";

const email = document.getElementById("loggingEmail");
const password = document.getElementById("loggingPassword");
const submit = document.getElementById("SubmitSignin");
let user;

submit.addEventListener("click",function(){
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
       window.location.href = "/pages/dashboard.html";
        console.log("done")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})

export {user};