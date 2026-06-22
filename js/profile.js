import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userDoc = await getDoc(
        doc(db, "users", user.uid)
    );

    if (userDoc.exists()) {

        const data = userDoc.data();

        document.getElementById("profileUsername").textContent =
            data.username;

        document.getElementById("profileBio").textContent =
            data.bio || "No bio yet.";

    }

});