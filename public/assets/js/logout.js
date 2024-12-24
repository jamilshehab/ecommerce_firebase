import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signOut } from
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


const logoutButton = document.getElementById('logout'); // Button for logging out

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(authentication); // Sign out the user from Firebase Authentication
        alert("User logged out successfully!");

        // Optionally, redirect to login or home page after logout
        window.location.href = "/login.html"; // Replace with your login page URL
    } catch (error) {
        console.error("Error during logout:", error.code, error.message);
        alert("Error during logout: " + error.message);
    }
});

