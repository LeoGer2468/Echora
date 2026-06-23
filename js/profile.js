import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    getDoc,
    updateDoc
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

        if (data.pfp) {
    document.getElementById(
        "profilePfp"
    ).src = data.pfp;
}

        document.getElementById("profileUsername").textContent =
            data.username;

        document.getElementById("profileBio").textContent =
            data.bio || "No bio yet.";

            document.getElementById("bioInput").value =
    data.bio || "";

    }

    const saveBtn = document.getElementById("saveBioBtn");

saveBtn.addEventListener("click", async () => {

    const newBio =
        document.getElementById("bioInput").value;

    await updateDoc(
        doc(db, "users", user.uid),
        {
            bio: newBio
        }
    );

    document.getElementById("profileBio").textContent =
        newBio;

    alert("Bio saved!");
});
const pfpUpload =
    document.getElementById("pfpUpload");

const savePfpBtn =
    document.getElementById("savePfpBtn");

savePfpBtn.addEventListener("click", async () => {

    const file = pfpUpload.files[0];

    if (!file) {
        alert("Select an image first.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        "echora_pfps"
    );

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhzrhmnho/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    const imageUrl = data.secure_url;

    await updateDoc(
        doc(db, "users", user.uid),
        {
            pfp: imageUrl
        }
    );

    document.getElementById(
        "profilePfp"
    ).src = imageUrl;

    alert("Profile picture updated!");

});

});