document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    // This event listener is for the FINAL submission after details are filled
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        handleRegister();
    });
});

async function handleVerifyUsn() {
    const role = document.getElementById("role").value;
    const usnInput = document.getElementById("usn");
    const usn = usnInput.value.toUpperCase(); // Convert to uppercase for consistent validation
    usnInput.value = usn; // Update the field with the uppercase version

    // --- USN FORMAT VALIDATION ---
    const usnFormat = /^[A-Z]{3}\d{5}$/; // 3 letters followed by 5 digits
    if (!usnFormat.test(usn)) {
        showNotification("Invalid USN format. It should be 3 letters and 5 numbers (e.g., CSE21001).", "error");
        return;
    }
    
    try {
        {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usn, password })
        });
        const data = await response.json();

        if (data.token && data.role) {
            alert("Login successful!");
            // You can redirect or store token here
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        alert("Network error. Please try again.");
    }
}
}

async function handleRegister() {
    // Collect all data, including the non-editable fields
    const usn = document.getElementById("usn").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    if (password !== confirmPassword) {
        showNotification("Passwords do not match!", "error");
        return;
    }
    
    if (password.length < 6) {
        showNotification("Password must be at least 6 characters long.", "error");
        return;
    }

    const submitButton = document.querySelector('#detailsStep button[type="submit"]');
    const btnText = submitButton.querySelector(".btn-text");
    const btnLoader = submitButton.querySelector(".btn-loader");
    
    // Show loading state
    submitButton.disabled = true;
    btnText.style.display = "none";
    btnLoader.style.display = "flex";

    try {
        const registrationData = { usn, fullName, email, phone, password, role };
        
        // This API call sends all data to the backend to finalize the account
        const data = await apiRequest('/auth/register', 'POST', registrationData);

        showNotification(data.message || "Account created! Please log in.", "success");
        
        setTimeout(() => {
            window.location.href = "login.html"; // Redirect to login page
        }, 2000);

    } catch (error) {
        submitButton.disabled = false;
        btnText.style.display = "block";
        btnLoader.style.display = "none";
    }
}

function showNotification(message, type = "info") {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  notification.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  document.body.appendChild(notification);
  
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Function to toggle password visibility
function togglePasswordVisibility(fieldId, iconId) {
    const passwordField = document.getElementById(fieldId);
    const toggleIcon = document.getElementById(iconId);
    const isPassword = passwordField.type === "password";

    passwordField.type = isPassword ? "text" : "password";
    toggleIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
    passwordField.focus();
}