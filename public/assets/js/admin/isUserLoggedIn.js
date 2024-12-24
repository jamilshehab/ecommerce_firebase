import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from
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

const userLogout = document.getElementById('signout');
userLogout.addEventListener('click', () => {
    signOut(authentication)
        .then(() => {
            alert("User signed out successfully.");
            window.location.href = "/login.html"; // Redirect to the login page
        })
        .catch((error) => {
            console.error("Sign out error:", error.message);
            alert("An error occurred during sign out.");
        });
});
isUserLogin();

function isUserLogin() {
    onAuthStateChanged(authentication, (user) => {
        if (!user) {
            alert('User is not signed in, redirecting to login page...');
            window.location.href = "/login.html";
        }
    });
}
