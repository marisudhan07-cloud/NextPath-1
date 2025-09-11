document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Add event listeners for user type selection
  const userTypeRadios = document.querySelectorAll('input[name="userType"]');
  userTypeRadios.forEach(radio => {
    radio.addEventListener('change', handleUserTypeChange);
  });

  // Add form validation
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', handleFormSubmit);

  // Add real-time validation
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('password').addEventListener('input', validatePassword);
  document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
});

function handleUserTypeChange(event) {
  const userType = event.target.value;
  const studentFields = document.getElementById('studentFields');
  const alumniFields = document.getElementById('alumniFields');

  // Hide both field sets first
  studentFields.classList.add('hidden');
  alumniFields.classList.add('hidden');

  // Show relevant fields based on selection
  if (userType === 'student') {
    studentFields.classList.remove('hidden');
    // Make student fields required
    setFieldsRequired('studentFields', true);
    setFieldsRequired('alumniFields', false);
  } else if (userType === 'alumni') {
    alumniFields.classList.remove('hidden');
    // Make alumni fields required
    setFieldsRequired('alumniFields', true);
    setFieldsRequired('studentFields', false);
  }

  // Refresh icons after DOM changes
  lucide.createIcons();
}

function setFieldsRequired(containerId, required) {
  const container = document.getElementById(containerId);
  const inputs = container.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    if (required) {
      input.setAttribute('required', '');
    } else {
      input.removeAttribute('required');
    }
  });
}

function validateEmail() {
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value && !emailRegex.test(email.value)) {
    emailError.classList.remove('hidden');
    email.classList.add('border-red-500');
    return false;
  } else {
    emailError.classList.add('hidden');
    email.classList.remove('border-red-500');
    return true;
  }
}

function validatePassword() {
  const password = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');

  if (password.value && password.value.length < 8) {
    passwordError.classList.remove('hidden');
    password.classList.add('border-red-500');
    return false;
  } else {
    passwordError.classList.add('hidden');
    password.classList.remove('border-red-500');
    return true;
  }
}

function validateConfirmPassword() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  if (confirmPassword.value && password.value !== confirmPassword.value) {
    confirmPasswordError.classList.remove('hidden');
    confirmPassword.classList.add('border-red-500');
    return false;
  } else {
    confirmPasswordError.classList.add('hidden');
    confirmPassword.classList.remove('border-red-500');
    return true;
  }
}

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const button = field.nextElementSibling.querySelector('i');

  if (field.type === 'password') {
    field.type = 'text';
    button.setAttribute('data-lucide', 'eye-off');
  } else {
    field.type = 'password';
    button.setAttribute('data-lucide', 'eye');
  }

  lucide.createIcons();
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  // Check if user type is selected
  const userType = document.querySelector('input[name="userType"]:checked');
  if (!userType) {
    alert('Please select whether you are a Student or Alumni');
    return;
  }

  // Check if terms are agreed
  const agreeTerms = document.getElementById('agreeTerms');
  if (!agreeTerms.checked) {
    alert('Please agree to the Terms of Service and Privacy Policy');
    return;
  }

  if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    alert('Please fix the errors in the form before submitting');
    return;
  }

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.classList.add('loading');
  submitButton.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    submitButton.textContent = originalText;

    // Show success message
    alert(`Account created successfully!\n\nWelcome to NextPath, ${document.getElementById('firstName').value}!\n\nYou can now log in to your ${userType.value} dashboard.`);

    // Redirect based on user type
    if (userType.value === 'student') {
      window.location.href = 'student.html';
    } else {
      window.location.href = 'alumni.html';
    }
  }, 2000);
}

function showTerms() {
  alert('Terms of Service:\n\n• Use the platform responsibly and professionally\n• Respect other users and maintain appropriate communication\n• Do not share false or misleading information\n• Protect your account credentials\n• Report any inappropriate behavior\n• Comply with all applicable laws and regulations\n\nFull terms available after account creation.');
}

function showPrivacy() {
  alert('Privacy Policy:\n\n• We protect your personal information with industry-standard security\n• Your data is used only to provide platform services\n• We do not sell your information to third parties\n• You can control your privacy settings after signup\n• You can request data deletion at any time\n• We use cookies to improve your experience\n\nFull privacy policy available after account creation.');
}

// Form field animations
function animateFieldEntry() {
  const fields = document.querySelectorAll('.space-y-6 > div');
  fields.forEach((field, index) => {
    field.style.animationDelay = `${index * 0.1}s`;
    field.classList.add('field-group');
  });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateFieldEntry, 300);
});

// Auto-focus first field
window.addEventListener('load', () => {
  document.getElementById('firstName').focus();
});

// Enhanced form validation with real-time feedback
function addRealTimeValidation() {
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('border-red-500');
        input.classList.add('border-green-500');
      } else {
        input.classList.remove('border-green-500');
        input.classList.add('border-red-500');
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        input.classList.remove('border-green-500', 'border-red-500');
      }, 2000);
    });
  });
}

// Initialize enhanced validation
document.addEventListener('DOMContentLoaded', addRealTimeValidation);
