import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyARAbO1a-jLVBn02lMY3ywhVdxoPnKVZJY",
    authDomain: "ecommerce-ef8dd.firebaseapp.com",
    databaseURL: "https://ecommerce-ef8dd-default-rtdb.firebaseio.com",
    projectId: "ecommerce-ef8dd",
    storageBucket: "ecommerce-ef8dd.firebasestorage.app",
    messagingSenderId: "559897536669",
    appId: "1:559897536669:web:b7e2fec6df06ed73a2cc74",
    measurementId: "G-8QN99RFX43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth();
const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const signInEmail = email.value;
    const signInPassword = password.value;

    signInWithEmailAndPassword(authentication, signInEmail, signInPassword)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log(user);
            alert('User signed in successfully!');

            // Redirect to index.html
            window.location.href = "/index.html"; // Update this with the correct path to your index page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Log and show the error message
            console.log("Error during sign-in:", errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});
