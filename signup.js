document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // User type selection
  const studentTypeBtn = document.getElementById('student-type');
  const alumniTypeBtn = document.getElementById('alumni-type');
  const alumniFields = document.getElementById('alumni-fields');
  const yearLabel = document.getElementById('year-label');
  
  let selectedUserType = 'student';

  // Toggle user type
  function selectUserType(type) {
    selectedUserType = type;
    
    if (type === 'student') {
      studentTypeBtn.classList.add('active', 'border-blue-600', 'bg-blue-50');
      studentTypeBtn.classList.remove('border-gray-300', 'bg-white');
      studentTypeBtn.querySelector('i').classList.add('text-blue-600');
      studentTypeBtn.querySelector('i').classList.remove('text-gray-600');
      studentTypeBtn.querySelector('span').classList.add('text-blue-600');
      studentTypeBtn.querySelector('span').classList.remove('text-gray-600');
      
      alumniTypeBtn.classList.remove('active', 'border-purple-600', 'bg-purple-50');
      alumniTypeBtn.classList.add('border-gray-300', 'bg-white');
      alumniTypeBtn.querySelector('i').classList.remove('text-purple-600');
      alumniTypeBtn.querySelector('i').classList.add('text-gray-600');
      alumniTypeBtn.querySelector('span').classList.remove('text-purple-600');
      alumniTypeBtn.querySelector('span').classList.add('text-gray-600');
      
      alumniFields.classList.add('hidden');
      yearLabel.textContent = 'Expected Graduation';
    } else {
      alumniTypeBtn.classList.add('active', 'border-purple-600', 'bg-purple-50');
      alumniTypeBtn.classList.remove('border-gray-300', 'bg-white');
      alumniTypeBtn.querySelector('i').classList.add('text-purple-600');
      alumniTypeBtn.querySelector('i').classList.remove('text-gray-600');
      alumniTypeBtn.querySelector('span').classList.add('text-purple-600');
      alumniTypeBtn.querySelector('span').classList.remove('text-gray-600');
      
      studentTypeBtn.classList.remove('active', 'border-blue-600', 'bg-blue-50');
      studentTypeBtn.classList.add('border-gray-300', 'bg-white');
      studentTypeBtn.querySelector('i').classList.remove('text-blue-600');
      studentTypeBtn.querySelector('i').classList.add('text-gray-600');
      studentTypeBtn.querySelector('span').classList.remove('text-blue-600');
      studentTypeBtn.querySelector('span').classList.add('text-gray-600');
      
      alumniFields.classList.remove('hidden');
      yearLabel.textContent = 'Graduation Year';
    }
    
    lucide.createIcons();
  }

  studentTypeBtn.addEventListener('click', () => selectUserType('student'));
  alumniTypeBtn.addEventListener('click', () => selectUserType('alumni'));

  // Password visibility toggle
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  
  togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePasswordBtn.querySelector('i');
    if (type === 'password') {
      icon.setAttribute('data-lucide', 'eye');
    } else {
      icon.setAttribute('data-lucide', 'eye-off');
    }
    lucide.createIcons();
  });

  // Form validation
  const form = document.getElementById('signup-form');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirm-password');

  // Real-time password validation
  function validatePasswords() {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    
    if (password.length > 0 && password.length < 8) {
      passwordField.classList.add('error');
      passwordField.classList.remove('success');
    } else if (password.length >= 8) {
      passwordField.classList.remove('error');
      passwordField.classList.add('success');
    } else {
      passwordField.classList.remove('error', 'success');
    }
    
    if (confirmPassword.length > 0) {
      if (password === confirmPassword && password.length >= 8) {
        confirmPasswordField.classList.remove('error');
        confirmPasswordField.classList.add('success');
      } else {
        confirmPasswordField.classList.add('error');
        confirmPasswordField.classList.remove('success');
      }
    } else {
      confirmPasswordField.classList.remove('error', 'success');
    }
  }

  passwordField.addEventListener('input', validatePasswords);
  confirmPasswordField.addEventListener('input', validatePasswords);

  // Email validation
  const emailField = form.querySelector('input[type="email"]');
  emailField.addEventListener('input', () => {
    const email = emailField.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length > 0) {
      if (emailRegex.test(email)) {
        emailField.classList.remove('error');
        emailField.classList.add('success');
      } else {
        emailField.classList.add('error');
        emailField.classList.remove('success');
      }
    } else {
      emailField.classList.remove('error', 'success');
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Account Created!';
      submitBtn.classList.remove('from-blue-600', 'to-purple-600');
      submitBtn.classList.add('from-green-600', 'to-green-700');
      
      // Show success message
      setTimeout(() => {
        alert(`Welcome to NextPath! Your ${selectedUserType} account has been created successfully.`);
        
        // Redirect based on user type
        if (selectedUserType === 'student') {
          window.location.href = '../student/index.html';
        } else {
          window.location.href = '../alumni/index.html';
        }
      }, 1000);
    }, 2000);
  });

  // Sign in link
  const signInLink = document.querySelector('button.underline');
  signInLink.addEventListener('click', () => {
    alert('Sign in feature coming soon! For now, you can create a new account.');
  });

  // Terms and Privacy links
  const termsLinks = document.querySelectorAll('a[href="#"]');
  termsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (link.textContent.includes('Terms')) {
        alert('Terms of Service: By using NextPath, you agree to connect respectfully with fellow students and alumni, maintain professional conduct, and use the platform for educational and career development purposes only.');
      } else {
        alert('Privacy Policy: NextPath protects your personal information and only shares necessary details with verified alumni and students for networking purposes. Your data is secure and never sold to third parties.');
      }
    });
  });

  // Add smooth animations to form elements
  const formElements = form.querySelectorAll('input, select, button');
  formElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    element.classList.add('animate-fade-in-up');
  });
});