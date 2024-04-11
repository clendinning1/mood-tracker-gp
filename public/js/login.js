

// SIGNUP FORM
const signupFormHandler = async (event) => {
    console.log("(1)");

    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        // send the post req ('signup post route' in controllers/api/userRoutes.js)
        console.log("(2)");
        
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log("(3)");

        if (response.ok) {
            // redirect to moodpage if you sign up successfully
            document.location.replace('/moodpage');
            console.log("(4)");
        } else {
            // otherwise, alert bad login
            alert(response.statusText);
            console.log("(5)");
        }
    }
};


// LOGIN FORM
const loginFormHandler = async (event) => {
    console.log("step 0");

    event.preventDefault();

    console.log("step 1");

    // pull email and pass from login input
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log("step 2");

    if (email && password) {
        console.log("step 3");

        // send the post request ('login post route' in controllers/api/userRoutes.js)
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log("step 4");

        if (response.ok) {
            // redirect to moodpage if you log in successfully
            console.log("Successfully logged in");
            document.location.replace('/moodpage');
        } else {
            // otherwise, alert bad login
            console.log("Unable to log in");
            alert(response.statusText);
        }
    }
};


document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
