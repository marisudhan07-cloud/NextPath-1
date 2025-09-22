// Enhanced Alumni Management Platform JavaScript - Complete Functional Version
let chatbotOpen = false;
let chatbotMinimized = false;
let chatHistory = [];
let isTyping = false;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initScrollAnimations();
  initMobileMenu();
  initSmoothScroll();
  initStatsCounter();
  initParticles();
  initChatbot();
  initButtonInteractions();

  // Chart for impact section
  if (document.getElementById("impactChart")) {
    initImpactChart();
  }

  // Initialize header scroll effects
  initHeaderEffects();
});

// Enhanced scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        
        if (entry.target.classList.contains("features-grid")) {
          const cards = entry.target.querySelectorAll(".feature-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-fade-in");
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll("section, .feature-card, .stat-card, .about-feature").forEach((element) => {
    observer.observe(element);
  });
}

// Enhanced mobile menu
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const icon = toggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    navLinks.querySelectorAll("a, button").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = toggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      });
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        const icon = toggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  }
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const toggle = document.querySelector(".mobile-menu-toggle");

  if (navLinks && toggle) {
    navLinks.classList.toggle("active");
    const icon = toggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  }
}

// Enhanced smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".landing-header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const headerHeight = document.querySelector(".landing-header").offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Enhanced stats counter
function initStatsCounter() {
  const statsElements = document.querySelectorAll(".stat-number");

  const countUpAnimation = (element, target, duration = 2000) => {
    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      start = target * easeOutCubic;
      element.textContent = formatNumber(Math.floor(start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = formatNumber(target);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+";
    }
    return num.toString();
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          let target = 0;

          if (text.includes("M+")) {
            target = parseFloat(text) * 1000000;
          } else if (text.includes("K+")) {
            target = parseFloat(text) * 1000;
          } else if (text.includes("$")) {
            const numStr = text.replace(/[$M+]/g, "");
            target = parseFloat(numStr) * 1000000;
          } else {
            target = parseInt(text.replace(/[^0-9]/g, ""));
          }

          if (target > 0) {
            countUpAnimation(element, target);
            statsObserver.unobserve(element);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  statsElements.forEach((element) => {
    statsObserver.observe(element);
  });
}

// Enhanced particle system
function initParticles() {
  const particles = document.querySelector(".hero-particles");
  if (particles) {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 6 + 2;
      const animationDelay = Math.random() * 8;
      const animationDuration = 8 + Math.random() * 12;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3));
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${animationDuration}s infinite ease-in-out;
        animation-delay: ${animationDelay}s;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
      `;
      particles.appendChild(particle);
    }
  }
}

// Enhanced impact chart
function initImpactChart() {
  const ctx = document.getElementById("impactChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Alumni Connected", "Events Hosted", "Mentorships Created", "Jobs Posted"],
      datasets: [
        {
          data: [15000, 500, 1000, 2500],
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(245, 158, 11, 0.8)",
            "rgba(239, 68, 68, 0.8)",
          ],
          borderWidth: 0,
          cutout: "70%",
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              family: "Inter",
              weight: "500",
            },
            color: "#4b5563",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#3b82f6",
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: false,
          titleFont: { size: 14, weight: "600" },
          bodyFont: { size: 13 },
          padding: 12,
        },
      },
      elements: {
        arc: {
          borderRadius: 8,
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1500,
        easing: "easeOutCubic",
      },
    },
  });
}

// Enhanced header scroll effects
function initHeaderEffects() {
  let ticking = false;

  const updateHeader = () => {
    const header = document.querySelector(".landing-header");
    if (header) {
      const scrolled = window.pageYOffset;
      
      if (scrolled > 50) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
        header.style.backdropFilter = "blur(20px)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
        header.style.backdropFilter = "blur(10px)";
      }
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// ENHANCED CHATBOT FUNCTIONALITY
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");

  if (chatbotToggle && chatbotWindow) {
    // Add initial welcome message
    addBotMessage("Hi! 👋 I'm your Study Buddy. I'm here to help you with everything about AlumniConnect. What would you like to know?", true);
    
    // Add pulse animation to toggle
    const pulse = chatbotToggle.querySelector('.chatbot-pulse');
    if (pulse) {
      setInterval(() => {
        if (!chatbotOpen) {
          pulse.style.animation = 'pulse 2s infinite';
        }
      }, 5000);
    }
  }
}

function toggleChatbot() {
  if (!chatbotOpen) {
    openChatbot();
  } else {
    closeChatbot();
  }
}

function openChatbot() {
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  
  if (chatbotWindow && chatbotToggle) {
    chatbotOpen = true;
    chatbotMinimized = false;
    chatbotToggle.classList.add("hidden");
    chatbotWindow.classList.add("open");
    
    // Focus on input field
    setTimeout(() => {
      const inputField = document.getElementById("chatbot-input-field");
      if (inputField) inputField.focus();
    }, 300);
  }
}

function minimizeChatbot() {
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  
  if (chatbotWindow && chatbotToggle) {
    chatbotMinimized = true;
    chatbotOpen = false;
    chatbotWindow.classList.remove("open");
    chatbotToggle.classList.remove("hidden");
    
    showNotification("Study Buddy minimized. Click to reopen anytime!", "info", 3000);
  }
}

function closeChatbot() {
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  
  if (chatbotWindow && chatbotToggle) {
    chatbotOpen = false;
    chatbotMinimized = false;
    chatbotWindow.classList.remove("open");
    chatbotToggle.classList.remove("hidden");
  }
}

function handleChatInput(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function sendMessage() {
  const inputField = document.getElementById("chatbot-input-field");
  const message = inputField.value.trim();
  
  if (message) {
    addUserMessage(message);
    inputField.value = "";
    
    showTypingIndicator();
    
    setTimeout(() => {
      hideTypingIndicator();
      const response = generateBotResponse(message);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  }
}

function handleQuickQuestion(question) {
  addUserMessage(question);
  
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateBotResponse(question);
    addBotMessage(response);
  }, 800 + Math.random() * 500);
}

function addUserMessage(message) {
  const messagesContainer = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("div");
  messageElement.className = "message user-message animate-message";
  messageElement.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
      <span class="message-time">${getCurrentTime()}</span>
    </div>
    <div class="message-avatar">
      <i class="fas fa-user"></i>
    </div>
  `;
  
  messagesContainer.appendChild(messageElement);
  scrollToBottom();
  chatHistory.push({ type: 'user', message: message, time: new Date() });
}

function addBotMessage(message, isInitial = false) {
  const messagesContainer = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("div");
  messageElement.className = `message bot-message animate-message ${isInitial ? 'initial-welcome' : ''}`;
  messageElement.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <p>${message}</p>
      <span class="message-time">${getCurrentTime()}</span>
    </div>
  `;
  
  messagesContainer.appendChild(messageElement);
  scrollToBottom();
  if (!isInitial) {
    chatHistory.push({ type: 'bot', message: message, time: new Date() });
  }
}

function showTypingIndicator() {
  isTyping = true;
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.classList.add("show");
  }
}

function hideTypingIndicator() {
  isTyping = false;
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.classList.remove("show");
  }
}

function scrollToBottom() {
  const messagesContainer = document.getElementById("chatbot-messages");
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Comprehensive response system with detailed answers
  if (message.includes("register") || message.includes("sign up") || message.includes("alumni")) {
    return `To register as an alumni member:
    
1. Click the "Sign In" button in the header
2. Select "Create New Account" 
3. Choose "Alumni" as your role
4. Provide your graduation year and degree
5. Verify your email address
6. Complete your profile with career information

Would you like me to guide you through the registration process?`;
  }
  
  else if (message.includes("mentor") || message.includes("mentorship")) {
    return `Our Mentorship Hub connects you with experienced alumni:

• **Find Mentors**: Browse by industry, company, or expertise
• **Smart Matching**: AI-powered compatibility scoring  
• **Structured Programs**: 3, 6, or 12-month mentoring tracks
• **Progress Tracking**: Goal setting and milestone monitoring

Ready to find your perfect mentor? I can help you search by your specific interests!`;
  }
  
  else if (message.includes("event") || message.includes("meetup") || message.includes("reunion")) {
    return `Upcoming Alumni Events:

📅 **This Month:**
• Regional Networking Mixer - March 15th (Virtual)
• Career Development Workshop - March 22nd 
• Alumni Startup Showcase - March 28th

🎓 **Annual Events:**
• Homecoming Weekend - October 2024
• Global Alumni Conference - Summer 2024

You can RSVP, add to calendar, and get reminders. Want me to show you events in your area?`;
  }
  
  else if (message.includes("career") || message.includes("job") || message.includes("opportunity")) {
    return `Career Center Features:

💼 **Job Board**: 500+ exclusive alumni-shared opportunities
🎯 **Job Matching**: Personalized recommendations based on your profile  
📄 **Resume Reviews**: Get feedback from industry professionals
💬 **Career Coaching**: 1-on-1 sessions with career counselors
🏢 **Company Insights**: Inside information from alumni at top companies

Currently, we have ${Math.floor(Math.random() * 50) + 50} new job postings this week! What industry interests you?`;
  }
  
  else if (message.includes("donation") || message.includes("give") || message.includes("contribute")) {
    return `Support Your Alma Mater:

💝 **Donation Options:**
• One-time contributions
• Monthly recurring donations  
• Scholarship funds
• Specific program support
• Capital campaigns

🔒 **Secure Processing**: Bank-level encryption
📊 **Transparency**: Track exactly where your donation goes
💸 **Tax Benefits**: Automated tax-deductible receipts

Every donation, big or small, makes a real difference. What cause would you like to support?`;
  }
  
  else if (message.includes("profile") || message.includes("update") || message.includes("edit")) {
    return `Update Your Alumni Profile:

✏️ **Personal Information**: Contact details, location
🎓 **Education**: Degrees, graduation years, honors
💼 **Career**: Current role, company, industry
🏆 **Achievements**: Awards, publications, certifications  
📷 **Photos**: Professional headshot, cover image
🔒 **Privacy**: Control what information is visible

A complete profile increases your networking opportunities by 300%! Need help with any specific section?`;
  }
  
  else if (message.includes("help") || message.includes("support") || message.includes("assist")) {
    return `I'm here to help! I can assist with:

🔧 **Technical Support**: Login issues, password reset, troubleshooting
📚 **Platform Guidance**: How to use features, navigate sections  
👥 **Networking**: Finding alumni, joining groups, messaging
🎯 **Career Support**: Job search, mentorship, skill development
📅 **Events**: Finding events, RSVP process, virtual access

What specific area would you like help with? I'm your dedicated Study Buddy!`;
  }
  
  else if (message.includes("thank") || message.includes("thanks")) {
    return `You're very welcome! 😊 I'm always here to help make your AlumniConnect experience amazing. 

Is there anything else you'd like to know about our platform? I love helping alumni succeed!`;
  }
  
  else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return `Hello there! 👋 Great to see you! I'm your friendly Study Buddy, ready to help you make the most of AlumniConnect.

Whether you need help with registration, finding mentors, exploring career opportunities, or anything else - just ask! What brings you here today?`;
  }
  
  else {
    const responses = [
      `That's a great question! I can help you with information about:
      
• 👥 Alumni registration and profiles
• 🤝 Mentorship programs  
• 📅 Events and networking
• 💼 Career opportunities
• 💝 Donations and giving back
• ⚙️ Platform features and support

What specific topic interests you most?`,

      `I'd love to help you with that! AlumniConnect offers many features for alumni engagement:

🌟 Connect with fellow graduates
🎯 Find mentors in your field  
📈 Advance your career
🎪 Attend exclusive events
❤️ Give back to your alma mater

Which area would you like to explore first?`,

      `Thanks for reaching out! I'm here to make your alumni experience exceptional. 

Whether you're looking to network, find career opportunities, or support your school, I can guide you through everything AlumniConnect has to offer.

What would you like to discover today?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// BUTTON INTERACTION HANDLERS - REAL FUNCTIONALITY
function initButtonInteractions() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `;
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  });
}

// REAL ACTION HANDLERS
function handleSignIn() {
  showNotification("Redirecting to login page...", "info", 2000);
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
}

function handleGetStarted() {
  window.location.href = "register.html";
}

function handleWatchDemo() {
  showNotification("Loading demo video...", "info", 2000);
  setTimeout(() => {
    // Create demo modal
    const modal = createDemoModal();
    document.body.appendChild(modal);
    modal.classList.add('show');
  }, 2000);
}

function createDemoModal() {
  const modal = document.createElement('div');
  modal.className = 'demo-modal';
  modal.innerHTML = `
    <div class="demo-modal-content">
      <div class="demo-header">
        <h3>AlumniConnect Demo</h3>
        <button class="demo-close" onclick="closeDemoModal()">&times;</button>
      </div>
      <div class="demo-video">
        <div class="demo-placeholder">
          <i class="fas fa-play-circle"></i>
          <h4>Interactive Demo</h4>
          <p>See how AlumniConnect transforms alumni engagement</p>
          <div class="demo-features">
            <div class="demo-feature">
              <i class="fas fa-users"></i>
              <span>Alumni Directory</span>
            </div>
            <div class="demo-feature">
              <i class="fas fa-handshake"></i>
              <span>Mentorship Hub</span>
            </div>
            <div class="demo-feature">
              <i class="fas fa-calendar"></i>
              <span>Event Management</span>
            </div>
            <div class="demo-feature">
              <i class="fas fa-briefcase"></i>
              <span>Career Center</span>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-actions">
        <button class="btn btn-primary" onclick="handleSignIn()">Sign Up Now</button>
        <button class="btn btn-secondary" onclick="closeDemoModal()">Close</button>
      </div>
    </div>
  `;
  return modal;
}

function closeDemoModal() {
  const modal = document.querySelector('.demo-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function handleFeatureClick(feature) {
  const featureData = {
    directory: {
      name: "Smart Alumni Directory",
      description: "Advanced search with AI-powered matching",
      action: () => window.location.href = "login.html?redirect=directory"
    },
    mentorship: {
      name: "Mentorship Hub", 
      description: "Connect with experienced alumni mentors",
      action: () => window.location.href = "login.html?redirect=mentorship"
    },
    events: {
      name: "Event Management",
      description: "Join reunions and networking events",
      action: () => window.location.href = "login.html?redirect=events"
    },
    careers: {
      name: "Career Center",
      description: "Access exclusive job opportunities",
      action: () => window.location.href = "login.html?redirect=careers"
    },
    donations: {
      name: "Donation Platform",
      description: "Support your alma mater securely",
      action: () => window.location.href = "login.html?redirect=donations"
    },
    assistant: {
      name: "AI Study Buddy",
      description: "Get instant platform support",
      action: openChatbot
    }
  };

  const data = featureData[feature];
  if (data) {
    showNotification(`Accessing ${data.name}...`, "info", 2000);
    setTimeout(data.action, 2000);
  }
}

function handleLearnMore(feature) {
  openChatbot();
  setTimeout(() => {
    const questions = {
      directory: "Tell me more about the Smart Alumni Directory",
      mentorship: "How does the mentorship program work?", 
      events: "What events are available?",
      careers: "How can I access career opportunities?",
      donations: "How can I make a donation?"
    };
    
    if (questions[feature]) {
      handleQuickQuestion(questions[feature]);
    }
  }, 1000);
}

function handleStatClick(stat) {
  const statData = {
    users: { 
      title: "Active Alumni Network",
      details: "2500+ verified alumni across 150+ countries, with 85% active monthly engagement"
    },
    institutions: {
      title: "Partner Institutions", 
      details: "50+ educational institutions trust AlumniConnect for their alumni engagement"
    },
    donations: {
      title: "Fundraising Success",
      details: "$12M+ raised through our secure platform, with 95% donor satisfaction rate"
    },
    mentorships: {
      title: "Mentorship Impact",
      details: "1500+ successful mentoring relationships with 92% completion rate"
    }
  };

  const data = statData[stat];
  if (data) {
    showDetailedNotification(data.title, data.details);
  }
}

function handleViewFullReport() {
  showNotification("Generating comprehensive impact report...", "info", 3000);
  setTimeout(() => {
    const reportModal = createReportModal();
    document.body.appendChild(reportModal);
    reportModal.classList.add('show');
  }, 3000);
}

function createReportModal() {
  const modal = document.createElement('div');
  modal.className = 'report-modal';
  modal.innerHTML = `
    <div class="report-modal-content">
      <div class="report-header">
        <h3><i class="fas fa-chart-line"></i> AlumniConnect Impact Report 2024</h3>
        <button class="report-close" onclick="closeReportModal()">&times;</button>
      </div>
      <div class="report-content">
        <div class="report-stats">
          <div class="report-stat">
            <div class="stat-icon"><i class="fas fa-users"></i></div>
            <div class="stat-details">
              <h4>25,000+</h4>
              <p>Active Alumni</p>
              <small>↑ 32% from last year</small>
            </div>
          </div>
          <div class="report-stat">
            <div class="stat-icon"><i class="fas fa-graduation-cap"></i></div>
            <div class="stat-details">
              <h4>500+</h4>
              <p>Partner Institutions</p>
              <small>↑ 28% growth</small>
            </div>
          </div>
          <div class="report-stat">
            <div class="stat-icon"><i class="fas fa-heart"></i></div>
            <div class="stat-details">
              <h4>$12M+</h4>
              <p>Total Raised</p>
              <small>↑ 45% increase</small>
            </div>
          </div>
          <div class="report-stat">
            <div class="stat-icon"><i class="fas fa-handshake"></i></div>
            <div class="stat-details">
              <h4>15,000+</h4>
              <p>Mentorship Matches</p>
              <small>92% success rate</small>
            </div>
          </div>
        </div>
        <div class="report-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>✅ Launched AI-powered alumni matching</li>
            <li>✅ Integrated virtual event platform</li>
            <li>✅ 95% user satisfaction rating</li>
            <li>✅ Expanded to 45 new countries</li>
            <li>✅ $2M+ in scholarship funding distributed</li>
          </ul>
        </div>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary" onclick="downloadReport()">Download Full Report</button>
        <button class="btn btn-secondary" onclick="closeReportModal()">Close</button>
      </div>
    </div>
  `;
  return modal;
}

function closeReportModal() {
  const modal = document.querySelector('.report-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
}

function downloadReport() {
  showNotification("Downloading comprehensive report...", "success", 3000);
  // Simulate download
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,AlumniConnect Impact Report 2024\n\nThank you for your interest in our platform!';
  link.download = 'AlumniConnect_Impact_Report_2024.txt';
  link.click();
}

function handleLearnMoreAbout() {
  scrollToSection("features");
  setTimeout(() => {
    openChatbot();
    setTimeout(() => {
      addBotMessage("I'd love to tell you more about NextGen Devops! We're revolutionizing alumni engagement with cutting-edge technology. What specific aspect interests you most?");
    }, 1000);
  }, 1500);
}

function handleStartJourney() {
  showNotification("Welcome to your NextGen Devops journey! 🚀", "success", 3000);
  setTimeout(() => {
    handleSignIn();
  }, 3000);
}

function handleSocialClick(platform) {
  const urls = {
    twitter: "https://twitter.com/alumniconnect",
    linkedin: "https://linkedin.com/company/alumniconnect", 
    facebook: "https://facebook.com/alumniconnect",
    instagram: "https://instagram.com/alumniconnect"
  };
  
  showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, "info", 2000);
  setTimeout(() => {
    window.open(urls[platform], '_blank');
  }, 2000);
}

function handleRoleAccess(role) {
  const roleData = {
    admin: { name: "Administrator Dashboard", redirect: "admin" },
    alumni: { name: "Alumni Portal", redirect: "alumni" },
    student: { name: "Student Dashboard", redirect: "student" }
  };
  
  const data = roleData[role];
  if (data) {
    showNotification(`Accessing ${data.name}...`, "info", 2000);
    setTimeout(() => {
      window.location.href = `login.html?role=${data.redirect}`;
    }, 2000);
  }
}

function handleResourceClick(resource) {
  const resources = {
    docs: "https://docs.alumniconnect.com",
    api: "https://api.alumniconnect.com/docs", 
    community: "https://community.alumniconnect.com"
  };
  
  showNotification(`Loading ${resource}...`, "info", 2000);
  setTimeout(() => {
    if (resources[resource]) {
      window.open(resources[resource], '_blank');
    }
  }, 2000);
}

function handleCompanyClick(section) {
  const sections = {
    about: () => scrollToSection('about'),
    contact: () => openChatbot(),
    privacy: () => showLegalModal('Privacy Policy'),
    terms: () => showLegalModal('Terms of Service')
  };
  
  if (sections[section]) {
    sections[section]();
  }
}

function handleLegalClick(document) {
  showLegalModal(document.charAt(0).toUpperCase() + document.slice(1));
}

function showLegalModal(title) {
  const modal = document.createElement('div');
  modal.className = 'legal-modal';
  modal.innerHTML = `
    <div class="legal-modal-content">
      <div class="legal-header">
        <h3>${title}</h3>
        <button class="legal-close" onclick="closeLegalModal()">&times;</button>
      </div>
      <div class="legal-content">
        <p>This is a demo of the ${title} page. In a real application, this would contain the complete legal document.</p>
        <p>For demonstration purposes, please contact us through the chatbot for more information.</p>
      </div>
      <div class="legal-actions">
        <button class="btn btn-primary" onclick="openChatbot(); closeLegalModal();">Contact Us</button>
        <button class="btn btn-secondary" onclick="closeLegalModal()">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.classList.add('show');
}

function closeLegalModal() {
  const modal = document.querySelector('.legal-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
}

// ENHANCED NOTIFICATION SYSTEM
function showNotification(message, type = "info", duration = 4000) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle", 
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle"
  };
  
  notification.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <button class="notification-close" onclick="this.parentNode.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add("show"), 100);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, duration);
}

function showDetailedNotification(title, details) {
  const notification = document.createElement("div");
  notification.className = "notification detailed info";
  
  notification.innerHTML = `
    <i class="fas fa-info-circle"></i>
    <div class="notification-content">
      <strong>${title}</strong>
      <p>${details}</p>
    </div>
    <button class="notification-close" onclick="this.parentNode.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 100);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, 8000);
}

// OPTIMIZED SCROLL HANDLER
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const optimizedScrollHandler = debounce(function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-background");
  
  if (parallax) {
    const speed = scrolled * 0.3;
    parallax.style.transform = `translateY(${speed}px)`;
  }
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// ACCESSIBILITY AND KEYBOARD SUPPORT
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    // Close any open modals
    const modals = document.querySelectorAll('.demo-modal, .report-modal, .legal-modal');
    modals.forEach(modal => {
      if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      }
    });
    
    // Close chatbot if open
    if (chatbotOpen) {
      closeChatbot();
    }
    
    // Close mobile menu if open
    const navLinks = document.querySelector(".nav-links");
    if (navLinks && navLinks.classList.contains("active")) {
      toggleMobileMenu();
    }
  }
});

// Add CSS animations via JavaScript
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(1); opacity: 0; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    80% { transform: translateY(-10px); }
  }
  
  .animate-message {
    animation: slideInUp 0.3s ease-out;
  }
  
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize accessibility features
document.querySelectorAll('.btn, .nav-link, .feature-card').forEach(element => {
  element.addEventListener('focus', function() {
    this.style.outline = '2px solid #3b82f6';
    this.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
});

// Service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
}

console.log('AlumniConnect Platform Loaded Successfully! 🚀');
