let loginForm = document.querySelector('form');
let errorDiv = document.querySelector('.error-message')
let modal = document.querySelector('.modal');
let inputs = Array.from(document.querySelectorAll('input'));

inputs.forEach(function (input) {
  input.addEventListener('focus',clearInput);
});
loginForm.addEventListener('submit', processLogin);
modal.addEventListener('click', removeModal);

function clearInput () {
  clearError(this);
};

function removeModal (event) {
  event.stopPropagation();
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

function processLogin (event) {
  event.preventDefault();
  // clear error message
  displayError('');
  // set a string to later check if there where errors
  let errorMessage = '';
  // validation
  if (!validateEmail()) {
    console.log('wow this regex was bad all along');
    error(loginForm.email);
    errorMessage += 'Invalid email';
  }
  if (!validatePassword()) {
    error(loginForm.password);
    if (errorMessage) {
      errorMessage += '<br> Missing password';
    } else {
      errorMessage += 'Missing password';
    }
  }
  // display errors if validation failed
  if (errorMessage) {
    displayError(errorMessage);
    return;
  }
  // show modal if validation worked
  modal.style.display = 'block';
}

function error (target) {
  target.style.border = '3px solid #673ab7';
}
function clearError (target) {
  target.style.border = '';
}
function displayError (message) {
  errorDiv.innerHTML = message;
  errorDiv.style.visibility = 'visible';
}

// return true iff valid
function validateEmail () {
  let emailInput = loginForm.email.value;
  // http://emailregex.com/
  let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput);
  return isValid;
}
function validatePassword () {
  let passwordInput = loginForm.password.value;
  let isValid = false;
  if (passwordInput !== '') isValid = true;
  return isValid;
}