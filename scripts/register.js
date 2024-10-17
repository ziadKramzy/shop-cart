// Select the elements
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

// Get the input fields for signup
const signupNameInput = document.querySelector('.signup .input[placeholder="Name"]');
const signupEmailInput = document.querySelector('.signup .input[placeholder="Email"]');
const signupPasswordInput = document.querySelector('.signup .input[placeholder="Password"]');
const signupSubmitBtn = document.querySelector('.signup .submit-btn');

// Get the input fields for login
const loginEmailInput = document.querySelector('.login .input[placeholder="Email"]');
const loginPasswordInput = document.querySelector('.login .input[placeholder="Password"]');
const loginSubmitBtn = document.querySelector('.login .submit-btn');

// Handle the sliding between signup and login forms
loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up');
        } else {
            signupBtn.parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up');
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
        }
    });
});

// Handle user registration
signupSubmitBtn.addEventListener('click', () => {
    const name = signupNameInput.value;
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;

    if (name && email && password) {
        // Create a user object
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        // Get existing users from localStorage or initialize an empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email is already registered
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("Email is already registered. Please use a different email.");
            return;
        }

        // Add the new user to the array
        users.push(newUser);

        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Set session login status
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(newUser)); // Store current user in session

        // Redirect to index.html
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields");
    }
});

// Handle user login
loginSubmitBtn.addEventListener('click', () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // Retrieve the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if any user matches the entered credentials
    const existingUser = users.find(user => user.email === email && user.password === password);

    if (existingUser) {
        // Set session login status
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(existingUser)); // Store current user in session

        // Successful login, redirect to index.html
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
});
