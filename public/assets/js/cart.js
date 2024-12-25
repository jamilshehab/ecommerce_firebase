import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
    getFirestore, collection, getDocs, deleteDoc, doc
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

const cartContainer = document.getElementById('cartId');

async function fetchCartItems() {
    try {
        // Fetch the cart items from Firestore
        const cartRef = collection(db, "carts");
        const querySnapshot = await getDocs(cartRef);
        let total = 0;

        // Clear the cart container before appending new items
        cartContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const cartItem = doc.data();
            const productId = cartItem.productId;
            const name = cartItem.name;
            const image = cartItem.image;
            const price = cartItem.price;

            // Create a div for each cart item
            let cartItemDiv = document.createElement('div');
            cartItemDiv.innerHTML = `
                <div class="grid grid-cols-3 items-center gap-4">
                    <div class="col-span-2 flex items-center gap-4 mb-4">
                        <div class="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                            <img src='${image}' class="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-gray-800">${name}</h3>
                            <button class="deleteCart text-xs bg-red-700 py-2 px-4 mt-4 text-white rounded-2xl"  data-id="${doc.id}">Remove</button>
                        </div>
                    </div>
                    <div class="ml-auto">
                        <h4 class="text-base   text-gray-500">${price}</h4>
                    </div>
                </div>
            `;

            // Append the cart item to the cart container
            cartContainer.appendChild(cartItemDiv);
            // Attach event listener to the delete button
            const deleteButton = cartItemDiv.querySelector('.deleteCart');
            deleteButton.addEventListener('click', () => removeFromCart(doc.id));
            // Add the price to the total
            total += parseFloat(price);
        });

        // Create and display the total price outside the loop
        const totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price', 'text-right');
        totalPriceElement.innerHTML = `<span class="text-right text-xl font-bold py-4 ">Total: $${total.toFixed(2)}</span>`;
        cartContainer.appendChild(totalPriceElement);

        // Create and display the Order button
        const orderButton = document.createElement('button');
        orderButton.classList.add('order-button', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'py-2', 'px-4', 'mt-4', 'rounded', 'ml-auto', 'block');
        orderButton.innerHTML = 'Order Now';


        // Append the order button under the total price
        cartContainer.appendChild(orderButton);

        // Add event listener to handle order when the button is clicked
        orderButton.addEventListener('click', async () => {
            try {
                // Fetch all cart items to delete
                const cartRef = collection(db, "carts");
                const querySnapshot = await getDocs(cartRef);

                // Delete each cart item
                const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
                await Promise.all(deletePromises);

                cartContainer.innerHTML = ''; // Clear the cart visually
                alert('Your order has been placed successfully, and your cart has been cleared!');
            } catch (error) {
                console.error('Error placing order and clearing cart:', error);
                alert('There was an error placing your order. Please try again.');
            }
        });

    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}
// Function to remove item from cart
async function removeFromCart(cartItemId) {
    try {
        const cartRef = doc(db, "carts", cartItemId);
        await deleteDoc(cartRef); // Remove item from Firestore
        alert('Item removed from cart');
        fetchCartItems(); // Re-fetch cart items after removal
    } catch (error) {
        alert('Error removing item from cart:', error);
    }
}

// Fetch cart items when the page loads
fetchCartItems();


