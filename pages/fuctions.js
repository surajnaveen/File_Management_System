import { auth,signInWithEmailAndPassword,onAuthStateChanged } from "../firebase/app.js";

const email = document.getElementById("loggingEmail");
const password = document.getElementById("loggingPassword");
const submit = document.getElementById("SubmitSignin");
const ErrMassage = document.getElementById("loggingError");

submit.addEventListener("click",function(){

    signInWithEmailAndPassword(auth, email.value, password.value)
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
        ErrMassage.innerHTML = "";
        ErrMassage.innerHTML += "Check your Email and Password";
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage,errorCode);
    });
})