const menuBtn = document.getElementById("menu-btn"); 
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const navSearch = document.getElementById("nav-search");

navSearch.addEventListener("click", (e) => {
  navSearch.classList.toggle("open");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".deals__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval: 500,
  delay: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
});

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
let cart = [];


// Open/Close Cart Sidebar
cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.parentElement.querySelector('img').src; // Get product image URL

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
    }

    saveCartToLocalStorage();
    updateCart();
  });
});

// Save the cart for the logged-in user
function saveCartToLocalStorage() {
  const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
  if (loggedInUser) {
    localStorage.setItem(`cart_${loggedInUser.email}`, JSON.stringify(cart));
  }
}

// Load the cart for the logged-in user
function loadCartFromLocalStorage() {
  const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
  if (loggedInUser) {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${loggedInUser.email}`));
    if (storedCart) {
      cart = storedCart;
    }
  }
  updateCart();
}

function updateCart() {
  // Clear current cart items
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update total and item count
  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = cart.reduce((count, item) => count + item.quantity, 0);

  // Add event listeners to remove buttons
  const removeItemButtons = document.querySelectorAll('.remove-item-btn');
  removeItemButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1); // Remove item from cart
      saveCartToLocalStorage(); // Save updated cart
      updateCart(); // Update cart display
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const isLoggedIn = sessionStorage.getItem('loggedIn');

  if (isLoggedIn && storedUser) {
    const navLinks = document.getElementById('nav-links');
    
    // Create a new list item for user info
    const userInfoItem = document.createElement('li');
    userInfoItem.innerHTML = ` <span class="user-name">${storedUser.name} </span> &nbsp; <button id="logout-btn" class="logout-button">Logout</button>`;

    // Append the user info to the nav
    navLinks.appendChild(userInfoItem);

    // Add logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('loggedIn');
      sessionStorage.removeItem('user');
      window.location.href = "register.html"; // Redirect to register.html
    });

    // Load the user's cart
    loadCartFromLocalStorage();
  } else {
    window.location.href = "register.html"; 
  }
});
