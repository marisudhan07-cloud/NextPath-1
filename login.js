document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLoginForm();
  initPasswordToggle();
  createBackgroundShapes();
  loadFormState();
});

async function handleLogin() {
    const form = document.getElementById("loginForm");
    const usn = document.getElementById("usn").value.toUpperCase(); // Changed from username to usn
    const password = document.getElementById("password").value;
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector(".btn-text");
    const btnLoader = submitButton.querySelector(".btn-loader");

    form.classList.add("loading");
    submitButton.disabled = true;
    btnText.style.display = "none";
    btnLoader.style.display = "flex";

    if (!usn || !password) {
        showNotification("Please fill in all fields", "error");
        resetSubmitButton();
        return;
    }

    try {
        // Now sending the USN to the backend
        const data = await apiRequest('/auth/login', 'POST', { usn, password });

        if (data.token && data.role) {
            localStorage.setItem('authToken', data.token);
            showNotification("Login successful! Redirecting...", "success");
            setTimeout(() => {
                redirectToRoleDashboard(data.role);
            }, 1500);
        }
    } catch (error) {
        resetSubmitButton();
    }
}

function redirectToRoleDashboard(role) {
  const redirectMap = {
    admin: "admin.html",
    alumni: "portal.html",
    student: "student.html",
  };
  window.location.href = redirectMap[role] || "index.html";
}

function initLoginForm() {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function (e) { e.preventDefault(); handleLogin(); });

  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateInput);
    input.addEventListener("input", clearValidation);
  });
}

function resetSubmitButton() {
  const form = document.getElementById("loginForm");
  const submitButton = form.querySelector('button[type="submit"]');
  const btnText = submitButton.querySelector(".btn-text");
  const btnLoader = submitButton.querySelector(".btn-loader");
  form.classList.remove("loading");
  submitButton.disabled = false;
  btnText.style.display = "block";
  btnLoader.style.display = "none";
}

function setDemoCredentials(username, password) {
  const usnField = document.getElementById("usn"); // Changed to target usn field
  const passwordField = document.getElementById("password");

  usnField.value = username; // Fills the usn field with demo username
  passwordField.value = password;

  usnField.classList.add("filled");
  passwordField.classList.add("filled");

  setTimeout(() => {
    usnField.classList.remove("filled");
    passwordField.classList.remove("filled");
  }, 1000);

  showNotification(`Demo credentials filled for ${username}`, "info");
}

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("passwordToggleIcon");
  const isPassword = passwordField.type === "password";
  passwordField.type = isPassword ? "text" : "password";
  toggleIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  passwordField.focus();
}

function initPasswordToggle() {}

function validateInput(event) {
  const input = event.target;
  input.classList.remove("valid", "invalid");
  if (input.checkValidity()) {
    input.classList.add("valid");
  } else {
    input.classList.add("invalid");
  }
}

function clearValidation(event) {
  event.target.classList.remove("valid", "invalid");
}

function showNotification(message, type = "info") {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `<i class="fas ${getIconForType(type)}"></i><span>${message}</span>`;
  document.body.appendChild(notification);
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => { notification.remove(); }, 300);
  }, 4000);
}

function getIconForType(type) {
  const icons = {
    success: "fa-check-circle", error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle", info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

function createBackgroundShapes() {}

function saveFormState() {
  const usn = document.getElementById("usn").value; // Changed from username
  const rememberMe = document.getElementById("rememberMe").checked;
  if (rememberMe && usn) {
    localStorage.setItem("rememberedUsn", usn); // Changed from username
  } else {
    localStorage.removeItem("rememberedUsn");
  }
}

function loadFormState() {
  const rememberedUsn = localStorage.getItem("rememberedUsn"); // Changed from username
  if (rememberedUsn) {
    document.getElementById("usn").value = rememberedUsn; // Changed from username
    document.getElementById("rememberMe").checked = true;
  }
}

document.getElementById("usn")?.addEventListener("input", saveFormState);
document.getElementById("rememberMe")?.addEventListener("change", saveFormState);

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}