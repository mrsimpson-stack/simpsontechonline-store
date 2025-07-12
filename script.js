// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Running Shoes",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "shoes",
        description: "High-performance running shoes with cushioning technology"
    },
    {
        id: 2,
        name: "Casual Sneakers",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "shoes",
        description: "Comfortable everyday sneakers in multiple colors"
    },
    {
        id: 3,
        name: "Designer T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "clothes",
        description: "Premium cotton t-shirt with unique design"
    },
    {
        id: 4,
        name: "Denim Jeans",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "clothes",
        description: "Classic fit jeans with stretch technology"
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "tech",
        description: "True wireless earbuds with 20hr battery life"
    },
    {
        id: 6,
        name: "Smart Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "tech",
        description: "Fitness tracking and smartphone notifications"
    }
];

// Shopping cart
let cart = [];

// Display products
function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(product.name);
}

// Update cart count in navbar
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Show notification when item is added to cart
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filter products by category
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        displayProducts(button.getAttribute('data-category'));
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

// Admin System Configuration
const ADMIN_PASSWORD = "SimpsonTech@2023"; // Change this to your secure password
let isAdminLoggedIn = false;

// DOM Elements
const adminLoginModal = document.getElementById('admin-login');
const adminPanel = document.getElementById('admin-panel');
const adminAccessBtn = document.getElementById('admin-access');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');

// Toggle Admin Access
adminAccessBtn.addEventListener('click', () => {
  if (!isAdminLoggedIn) {
    adminLoginModal.style.display = 'flex';
  } else {
    adminPanel.style.display = 'block';
  }
});

// Login Functionality
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const password = document.getElementById('admin-password').value;
  
  if (password === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    adminLoginModal.style.display = 'none';
    adminPanel.style.display = 'block';
    document.getElementById('admin-password').value = '';
    loginError.textContent = '';
  } else {
    loginError.textContent = 'Incorrect password!';
  }
});

// Logout Functionality
logoutBtn.addEventListener('click', () => {
  isAdminLoggedIn = false;
  adminPanel.style.display = 'none';
});

// Add New Product
document.getElementById('add-product-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newProduct = {
    id: products.length + 1,
    name: document.getElementById('product-name').value,
    price: parseFloat(document.getElementById('product-price').value),
    image: document.getElementById('product-image').value,
    category: document.getElementById('product-category').value,
    description: document.getElementById('product-desc').value
  };
  
  // Add validation here
  if (!newProduct.image.startsWith('http')) {
    alert('Please enter a valid image URL');
    return;
  }
  
  products.push(newProduct);
  displayProducts();
  e.target.reset();
  alert('Product added successfully!');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === adminLoginModal) {
    adminLoginModal.style.display = 'none';
  }
});
