import { app } from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const auth = getAuth(app);

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        alert("Account created!");

        window.location.href = "feed.html";

    } catch (error) {

        alert(error.message);

    }

});