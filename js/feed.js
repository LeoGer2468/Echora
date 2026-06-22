import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const postBtn =
        document.getElementById("postBtn");

    const postInput =
        document.getElementById("postInput");

    const feedPosts =
        document.getElementById("feedPosts");

    async function loadPosts() {

        feedPosts.innerHTML = "";

        const q = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        snapshot.forEach((docSnap) => {

            const post = docSnap.data();

            feedPosts.innerHTML += `
                <div class="post">

                    <div class="user">
                        <div class="pfp"></div>
                        <span>${post.authorName}</span>
                    </div>

                    <p>${post.content}</p>

                </div>

                <div class="divider"></div>
            `;
        });

    }

    postBtn.addEventListener("click", async () => {

        const content = postInput.value.trim();
        const userDoc = await getDoc(
    doc(db, "users", user.uid)
);

const userData = userDoc.data();

        if (!content) return;

        await addDoc(
            collection(db, "posts"),
            {
                authorId: user.uid,
                authorName: userData.username,
                content: content,
                createdAt: Date.now()
            }
        );

        postInput.value = "";

        loadPosts();

    });

    loadPosts();

});