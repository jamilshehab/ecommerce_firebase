import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from
    "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
//initialize firebase 
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
const authentication = getAuth(app);
const db = getFirestore();
const userData = collection(db, "users");

// Form and Input Elements
const registerForm = document.getElementById('register');
const firstName = document.getElementById('yourfirstname');
const lastName = document.getElementById('yourlastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmyourpassword');

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    // Retrieve input values
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    try {
        // Check if passwords match
        if (passwordValue !== confirmPasswordValue) {
            alert("Passwords do not match!");
            return;
        }

        // Register user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(authentication, emailValue, passwordValue);
        const user = userCredential.user;

        // Add user data to Firestore
        await addDoc(userData, {
            uid: user.uid,
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            createdAt: new Date(),
        });
        registerForm.reset();
        window.location.href = "/index.html"; // Update this with the correct path to your index page
    } catch (error) {
        console.error("Error during registration:", error.code, error.message);
        alert(error.message);
    }
});