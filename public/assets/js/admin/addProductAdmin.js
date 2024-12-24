import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getFirestore, collection, addDoc
} from
    "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

//initialize firebase configuration
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const collectionProducts = collection(db, "products");
const addProductForm = document.getElementById('addproducts');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productImage = document.getElementById('productImage');

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productData = {
        name: productName.value,
        price: productPrice.value,
        image: productImage.value,
    };

    // Add the product to Firestore
    addDoc(collectionProducts, productData)
        .then((productRef) => {
            // Success: Display the ID of the added product
            alert(`Product added successfully! ID `);

            // Reset the form
            addProductForm.reset();
        })
        .catch((err) => {
            // Error: Log and alert the error
            console.error(err); // For debugging purposes
            alert(`Error adding product: ${err.message}`);
        });
});