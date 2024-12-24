import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getFirestore, collection, addDoc, getDocs, deleteDoc, doc
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

let productTable = document.getElementById('tablebody');

fetchProducts();

async function fetchProducts() {
    productTable.innerHTML = ''; // Clear existing rows

    try {
        const querySnapshot = await getDocs(collectionProducts);
        querySnapshot.forEach((doc) => {
            const productData = doc.data();

            // Create table row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">
                    <img src="${productData.image}" class="w-16 h-16 rounded-full">
                </td>
                <td class="px-6 py-4">
                    ${productData.name}
                </td>
                <td class="px-6 py-4">
                    ${productData.price} $
                </td>
                <td class="px-6 py-4">
                  <button 
                        class="deleteProduct bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 duration-75" 
                        data-id="${doc.id}"   
                    >
                        Delete
                    </button>
                </td>
            `;

            // Attach event listener to the delete button
            const deleteButton = row.querySelector('.deleteProduct');
            deleteButton.addEventListener('click', () => deleteProduct(doc.id));

            productTable.appendChild(row);
        });
    } catch (error) {
        alert(`Error fetching products: ${error.message}`);
    }
}

// Function to delete a product
async function deleteProduct(productId) {
    try {
        // Delete the product from Firestore
        await deleteDoc(doc(collectionProducts, productId));
        alert('Product deleted successfully!');

        // Refresh the product list
        fetchProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
        alert(`Error deleting product: ${error.message}`);
    }
}