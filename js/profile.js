import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }
    const params =
    new URLSearchParams(window.location.search);

const profileUid =
    params.get("uid") || user.uid;

    const userDoc = await getDoc(
    doc(db, "users", profileUid)
);

    if (userDoc.exists()) {

        const data = userDoc.data();
        if (data.banner) {

    document.getElementById(
        "profileBanner"
    ).src = data.banner;

}
        const isOwnProfile =
    profileUid === user.uid;
    if (!isOwnProfile) {

    document.getElementById("bioInput").style.display =
        "none";

    document.getElementById("saveBioBtn").style.display =
        "none";

    document.getElementById("pfpUpload").style.display =
        "none";

    document.getElementById("savePfpBtn").style.display =
        "none";
}

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

    const profilePosts =
    document.getElementById("profilePosts");

const postsQuery = query(
    collection(db, "posts"),
    where("authorId", "==", profileUid)
);

const postsSnapshot =
    await getDocs(postsQuery);

profilePosts.innerHTML = "";

postsSnapshot.forEach((postDoc) => {

    const post = postDoc.data();

    profilePosts.innerHTML += `
        <div class="post">

            <div class="post-content">
                ${post.content}
            </div>

        </div>

        <div class="divider"></div>
    `;
});

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
const bannerUpload =
    document.getElementById("bannerUpload");

const saveBannerBtn =
    document.getElementById("saveBannerBtn");
const pfpUpload =
    
    document.getElementById("pfpUpload");

saveBannerBtn.addEventListener("click", async () => {

    const file = bannerUpload.files[0];

    if (!file) {
        alert("Select a banner first.");
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

    const bannerUrl =
        data.secure_url;

    await updateDoc(
        doc(db, "users", user.uid),
        {
            banner: bannerUrl
        }
    );

    document.getElementById(
        "profileBanner"
    ).src = bannerUrl;

    alert("Banner updated!");

});

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