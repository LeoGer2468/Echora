import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");

console.log("Button found");
signupBtn.addEventListener("click", async () => {

       console.log("Signup clicked");

    const username =
        document.getElementById("username").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await setDoc(
            doc(db, "users", userCredential.user.uid),
            {
                username: username,
                bio: "",
                font: "Trebuchet MS",
                pfp: "",
                banner: "",
                createdAt: Date.now()
            }
        );

        alert("Account created!");

        window.location.href = "feed.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

});