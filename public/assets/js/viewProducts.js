import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getFirestore, collection, getDocs, getDoc, doc, addDoc
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

let productRow = document.getElementById('productData');

// Function to add product to the cart


async function fetchProducts() {
    productRow.innerHTML = ''; // Clear existing products

    try {
        const querySnapshot = await getDocs(collectionProducts);
        querySnapshot.forEach((doc) => {
            const productData = doc.data();

            // Create a div for each product with unique IDs or classes
            let productDiv = document.createElement('div');
            productDiv.id = `product-${doc.id}`;  // Assigning a unique ID to each product
            productDiv.classList.add('product-card');

            productDiv.innerHTML = `
                <div class="h-56 w-full">
                    <img class="mx-auto h-full product-image" src="${productData.image}" alt="${productData.name}" />
                </div>
                <div class="pt-6">
                    <h3 class="product-name text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">${productData.name}</h3>
                    <div class="mt-4 flex items-center justify-between gap-4">
                        <p class="product-price text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${productData.price} $</p>
                        <button type="button" class="addToCartBtn inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black" data-id="${doc.id}">
                            Add to cart
                        </button>
                    </div>
                </div>
            `;

            // Append each product div to the productData container
            productRow.appendChild(productDiv);

            // Attach event listener to each "Add to Cart" button
            const addToCartBtns = productDiv.querySelectorAll('.addToCartBtn');
            addToCartBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-id');
                    addToCartItems(productId);
                }); // Pass the product ID when clicked
            });
        });
    } catch (error) {
        alert(`Error fetching products: ${error.message}`);
    }
}

// Function to add product to the cart using data from the elements
async function addToCartItems(productId) {
    try {
        // Get the product element by its unique ID
        const productDiv = document.getElementById(`product-${productId}`);

        // Get the product data from the corresponding element
        const productName = productDiv.querySelector('.product-name').textContent;
        const productImage = productDiv.querySelector('.product-image').src;
        const productPrice = productDiv.querySelector('.product-price').textContent;

        // Optional: Check if the product data exists
        if (!productName || !productImage || !productPrice) {
            alert('Error: Missing product details');
            return;
        }

        // Add the selected product to the Firestore cart collection
        const cartRef = collection(db, "carts");
        await addDoc(cartRef, {
            productId: productId,  // Store product ID for later reference
            name: productName,
            image: productImage,
            price: productPrice
        });

        alert('Product added to cart!');

    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding product to cart.');
    }
}


fetchProducts();