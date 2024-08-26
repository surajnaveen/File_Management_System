import { auth,signInWithEmailAndPassword } from "../firebase/app.js";

const email = document.getElementById("loggingEmail");
const password = document.getElementById("loggingPassword");
const submit = document.getElementById("SubmitSignin");

submit.addEventListener("click",function(){
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
    .then((userCredential) => {
        // Signed in
        //session
        let user = userCredential.user;
        sessionStorage.setItem("user", JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified
        }));

        window.location.href = "/pages/dashboard.html";
        console.log("yes");
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage,errorCode);
    });
})