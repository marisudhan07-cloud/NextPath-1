// Enhanced Alumni Portal JavaScript
document.addEventListener("DOMContentLoaded", function () {
  initPortal();
  initSidebar();
  initTabs();
  initChatbot();
  initNotifications();
  loadPortalData();
});

// Global variables
let currentTab = "dashboard";
let chatbotOpen = false;
let notificationPanelOpen = false;
let currentFilters = {};
let currentView = 'grid';

// Portal Initialization
function initPortal() {
  loadUserProfile();
  updateDashboardStats();
  initScrollBehavior();
  initKeyboardShortcuts();
}

function initScrollBehavior() {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initKeyboardShortcuts() {
  document.addEventListener("keydown", function (event) {
    // Escape to close modals and panels
    if (event.key === "Escape") {
      closeAllModalsAndPanels();
    }

    // Ctrl/Cmd + K for search
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      const searchInput = document.querySelector("#globalSearch");
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Alt + C for chatbot
    if (event.altKey && event.key === "c") {
      event.preventDefault();
      toggleChatbot();
    }
  });
}

function closeAllModalsAndPanels() {
  // Close modals
  const activeModals = document.querySelectorAll(".modal.active");
  activeModals.forEach(modal => modal.classList.remove("active"));

  // Close notification panel
  if (notificationPanelOpen) {
    toggleNotifications();
  }

  // Close chatbot if open
  if (chatbotOpen) {
    toggleChatbot();
  }
}

// Enhanced Sidebar Navigation
function initSidebar() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      
      const tabName = this.getAttribute("data-tab");
      if (tabName) {
        // Remove active class from all items
        navItems.forEach((nav) => nav.classList.remove("active"));
        
        // Add active class to clicked item
        this.classList.add("active");
        
        // Show the selected tab
        showTab(tabName);
      }
    });
  });
}

function showTab(tabName) {
  // Hide all tab contents with animation
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected tab with animation
  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    setTimeout(() => {
      targetTab.classList.add("active");
      currentTab = tabName;

      // Update page title
      updatePageTitle(tabName);

      // Load tab-specific data
      loadTabData(tabName);

      // Update URL without reloading
      history.pushState(null, null, `#${tabName}`);
    }, 150);
  }
}

function updatePageTitle(tabName) {
  const titleMap = {
    dashboard: "Dashboard",
    directory: "Alumni Directory",
    mentorship: "Mentorship Hub",
    events: "Alumni Events",
    careers: "Career Center",
    donations: "Give Back",
    profile: "My Profile",
  };

  const subtitleMap = {
    dashboard: "Welcome back",
    directory: "Connect with fellow alumni",
    mentorship: "Share knowledge and grow together",
    events: "Stay connected with your community",
    careers: "Discover new opportunities",
    donations: "Support your alma mater",
    profile: "Manage your profile information",
  };

  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  if (pageTitle) {
    pageTitle.textContent = titleMap[tabName] || "Dashboard";
  }

  if (pageSubtitle) {
    pageSubtitle.textContent = subtitleMap[tabName] || "";
  }
}

function loadTabData(tabName) {
  switch (tabName) {
    case "dashboard":
      loadDashboardData();
      break;
    case "directory":
      loadAlumniDirectory();
      break;
    case "mentorship":
      loadMentorshipData();
      break;
    case "events":
      loadEventsData();
      break;
    case "careers":
      loadCareersData();
      break;
    case "donations":
      loadDonationsData();
      break;
    case "profile":
      loadProfileData();
      break;
  }
}

// Enhanced User Profile Management
function loadUserProfile() {
  const userInfo = {
    name: "Asif",
    batch: "Class of 2018",
    department: "ECE",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
  };

  const userName = document.querySelector(".user-name");
  const userBatch = document.querySelector(".user-batch");
  const userAvatar = document.querySelector(".user-avatar img");

  if (userName) userName.textContent = userInfo.name;
  if (userBatch) userBatch.textContent = `${userInfo.batch} • ${userInfo.department}`;
  if (userAvatar) userAvatar.src = userInfo.avatar;
}

// Enhanced Dashboard Statistics
function updateDashboardStats() {
  const stats = {
    network: 247,
    mentoring: 3,
    events: 5,
    impact: 890,
  };

  document.querySelectorAll(".card-number").forEach((element, index) => {
    const values = Object.values(stats);
    if (values[index]) {
      animateCounter(element, values[index]);
    }
  });
}

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const startTime = Date.now();

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;
    
    if (progress >= 1) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOut);
      element.textContent = current;
    }
  }, 16);
}

// Enhanced Dashboard Data Loading
function loadDashboardData() {
  loadRecentActivity();
  loadQuickStats();
}

function loadRecentActivity() {
  const activityFeed = document.getElementById("activityFeed");
  if (!activityFeed) return;

  const activities = [
    {
      icon: "fa-user-plus",
      text: "<strong>Sarah Johnson</strong> connected with you",
      time: "2 hours ago",
      action: () => showTab('directory')
    },
    {
      icon: "fa-calendar-plus",
      text: "New event: <strong>Tech Alumni Meetup</strong> available",
      time: "5 hours ago",
      action: () => showTab('events')
    },
    {
      icon: "fa-briefcase",
      text: "Job posted: <strong>Senior Developer at TechCorp</strong>",
      time: "1 day ago",
      action: () => showTab('careers')
    },
    {
      icon: "fa-handshake",
      text: "Mentorship session scheduled with <strong>Emma Thompson</strong>",
      time: "2 days ago",
      action: () => showTab('mentorship')
    },
  ];

  activityFeed.innerHTML = activities
    .map((activity, index) => `
        <div class="activity-item" onclick="handleActivityClick(${index})" style="cursor: pointer;">
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `)
    .join("");

  // Store activity actions for reference
  window.activityActions = activities.map(a => a.action);
}

function handleActivityClick(index) {
  if (window.activityActions && window.activityActions[index]) {
    window.activityActions[index]();
  }
}

function loadQuickStats() {
  // Additional dashboard statistics can be loaded here
  const statsData = {
    connectionRequests: 5,
    unreadMessages: 12,
    upcomingEvents: 3,
    jobAlerts: 8
  };

  // Update notification count
  const notificationCount = document.querySelector('.notification-count');
  if (notificationCount) {
    const total = Object.values(statsData).reduce((sum, val) => sum + val, 0);
    notificationCount.textContent = total;
  }
}

// Enhanced Alumni Directory
function loadAlumniDirectory() {
  const directoryGrid = document.getElementById("directoryGrid");
  if (!directoryGrid) return;

  const alumniData = generateAlumniData();
  renderAlumniDirectory(alumniData);
}

function generateAlumniData() {
  const names = ["Jegadeesh", "Irshath", "Nishitha", "Nandhini", "Neshika", "Manii", "kanish", "Manish"];
  const titles = ["Senior Software Engineer", "Product Manager", "Marketing Director", "Data Scientist", "UX Designer", "DevOps Engineer", "Financial Analyst", "Research Scientist"];
  const companies = ["Google", "Microsoft", "Amazon", "Netflix", "Apple", "Meta", "Tesla", "SpaceX"];
  const locations = ["San Francisco, CA", "Seattle, WA", "New York, NY", "Los Angeles, CA", "Austin, TX", "Boston, MA", "Chicago, IL", "Portland, OR"];
  const departments = ["Computer Science", "Engineering", "Business", "Design", "Mathematics", "Physics"];
  const batches = ["2018", "2017", "2019", "2020", "2016", "2021"];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    batch: batches[i % batches.length],
    department: departments[i % departments.length],
    location: locations[i % locations.length],
    avatar: `https://images.pexels.com/photos/${[774909, 1181686, 1181424, 1222271, 1239291, 1043471, 733872, 1239293][i % 8]}/pexels-photo-${[774909, 1181686, 1181424, 1222271, 1239291, 1043471, 733872, 1239293][i % 8]}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
    skills: generateRandomSkills(),
  }));
}

function generateRandomSkills() {
  const allSkills = ["JavaScript", "Python", "React", "Node.js", "Java", "C++", "Machine Learning", "Data Analysis", "Project Management", "Leadership", "Digital Marketing", "UI/UX Design", "Cloud Computing", "DevOps"];
  const numSkills = Math.floor(Math.random() * 4) + 3;
  return allSkills.sort(() => 0.5 - Math.random()).slice(0, numSkills);
}

function renderAlumniDirectory(data) {
  const directoryGrid = document.getElementById("directoryGrid");
  if (!directoryGrid) return;

  directoryGrid.innerHTML = data
    .map(alumni => `
        <div class="alumni-card" onclick="viewAlumniProfile(${alumni.id})" data-batch="${alumni.batch}" data-dept="${alumni.department.toLowerCase().replace(/\s+/g, '')}" data-location="${alumni.location.toLowerCase()}">
            <div class="alumni-header">
                <div class="alumni-avatar">
                    <img src="${alumni.avatar}" alt="${alumni.name}" loading="lazy">
                </div>
                <div class="alumni-info">
                    <h4>${alumni.name}</h4>
                    <p>${alumni.title}</p>
                    <span class="company">${alumni.company}</span>
                </div>
            </div>
            <div class="alumni-details">
                <div class="detail-row">
                    <span class="detail-label">Batch:</span>
                    <span class="detail-value">${alumni.batch}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">${alumni.department}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${alumni.location}</span>
                </div>
            </div>
            <div class="alumni-skills">
                ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            <div class="alumni-actions">
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); connectWithAlumni(${alumni.id})">
                    <i class="fas fa-user-plus"></i>
                    Connect
                </button>
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); messageAlumni(${alumni.id})">
                    <i class="fas fa-envelope"></i>
                    Message
                </button>
            </div>
        </div>
    `)
    .join("");
}

// Enhanced Mentorship Data
function loadMentorshipData() {
  loadMyMentees();
  loadUpcomingSessions();
  loadMentorshipRequests();
  initMentorshipTabs();
}

function initMentorshipTabs() {
  const mentorshipTabs = document.querySelectorAll(".mentorship-tabs .tab-btn");
  mentorshipTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const tabName = this.getAttribute("data-mentorship-tab");
      showMentorshipTab(tabName);
    });
  });
}

function showMentorshipTab(tabName) {
  // Hide all mentorship content
  document.querySelectorAll(".mentorship-tab-content").forEach(content => {
    content.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".mentorship-tabs .tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  // Show selected content and activate tab
  const targetContent = document.getElementById(tabName + "Tab");
  if (targetContent) {
    targetContent.classList.add("active");
  }

  // Activate clicked tab
  event.target.classList.add("active");
}

function loadMyMentees() {
  const menteesList = document.getElementById("menteesList");
  if (!menteesList) return;

  const mentees = [
    {
      id: 1,
      name: "Mari sudhan J",
      year: "2nd Year",
      department: "ECE",
      avatar: "mari.jpg",
      interests: ["Web Development", "Machine Learning"],
      nextSession: "2025-01-20 15:00",
      progress: 75
    },
    {
      id: 2,
      name: "Prakash",
      year: "2nd Year",
      department: "ECE",
      avatar: "no image",
      interests: ["Mobile Development", "UI/UX"],
      nextSession: "2025-01-22 14:00",
      progress: 60
    },
    {
      id: 3,
      name: "Nithish",
      year: "2nd Year",
      department: "Data Science",
      avatar: "no image",
      interests: ["Data Analysis", "Python"],
      nextSession: "2025-01-25 16:00",
      progress: 85
    },
  ];

  menteesList.innerHTML = mentees
    .map(mentee => `
        <div class="mentee-card">
            <div class="mentee-header">
                <div class="mentee-avatar">
                    <img src="${mentee.avatar}" alt="${mentee.name}" loading="lazy">
                </div>
                <div class="mentee-info">
                    <h4>${mentee.name}</h4>
                    <p>${mentee.year} • ${mentee.department}</p>
                </div>
            </div>
            <div class="mentee-progress">
                <div class="progress-label">
                    <strong>Progress:</strong>
                    <span>${mentee.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${mentee.progress}%"></div>
                </div>
            </div>
            <div class="mentee-interests">
                <strong>Interests:</strong>
                <div class="interests-tags">
                    ${mentee.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join("")}
                </div>
            </div>
            <div class="mentee-session">
                <strong>Next Session:</strong>
                <span>${formatDateTime(mentee.nextSession)}</span>
            </div>
            <div class="mentee-actions">
                <button class="btn btn-primary btn-sm" onclick="scheduleSession(${mentee.id})">
                    <i class="fas fa-calendar"></i>
                    Schedule
                </button>
                <button class="btn btn-secondary btn-sm" onclick="messageMentee(${mentee.id})">
                    <i class="fas fa-envelope"></i>
                    Message
                </button>
            </div>
        </div>
    `)
    .join("");
}

function loadUpcomingSessions() {
  const upcomingSessions = document.getElementById("upcomingSessions");
  if (!upcomingSessions) return;

  const sessions = [
    {
      id: 1,
      mentee: "Mari sudhan J",
      topic: "Career Guidance Session",
      date: "2025-01-20 15:00",
      duration: "1 hour",
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      mentee: "Nithish",
      topic: "Technical Interview Prep",
      date: "2025-01-22 14:00",
      duration: "45 minutes",
      type: "video",
      status: "pending"
    },
  ];

  upcomingSessions.innerHTML = sessions
    .map(session => `
        <div class="session-card ${session.status}">
            <div class="session-header">
                <h4>${session.topic}</h4>
                <span class="session-type ${session.type}">
                    <i class="fas ${session.type === "video" ? "fa-video" : "fa-phone"}"></i>
                    ${session.type}
                </span>
            </div>
            <div class="session-details">
                <div class="session-mentee">
                    <strong>With:</strong> ${session.mentee}
                </div>
                <div class="session-time">
                    <strong>Time:</strong> ${formatDateTime(session.date)}
                </div>
                <div class="session-duration">
                    <strong>Duration:</strong> ${session.duration}
                </div>
                <div class="session-status">
                    <strong>Status:</strong> 
                    <span class="status-badge ${session.status}">${session.status}</span>
                </div>
            </div>
            <div class="session-actions">
                <button class="btn btn-primary btn-sm" onclick="joinSession(${session.id})">
                    <i class="fas fa-video"></i>
                    Join Session
                </button>
                <button class="btn btn-secondary btn-sm" onclick="rescheduleSession(${session.id})">
                    <i class="fas fa-calendar-alt"></i>
                    Reschedule
                </button>
            </div>
        </div>
    `)
    .join("");
}

function loadMentorshipRequests() {
  const requestsList = document.getElementById("mentorshipRequests");
  if (!requestsList) return;

  const requests = [
    {
      id: 1,
      name: "KANISH",
      year: "1st Year",
      department: "ECE",
      message: "Hi! I'm interested in learning about web development and would love your guidance.",
      date: "2025-01-15",
      avatar: "no image"
    },
    {
      id: 2,
      name: "MANII",
      year: "2nd Year",
      department: "Data Science",
      message: "I'm looking for mentorship in machine learning and data analysis. Your profile caught my attention!",
      date: "2025-01-14",
      avatar: 'no image'
    }
  ];

  requestsList.innerHTML = requests
    .map(request => `
        <div class="request-card">
            <div class="request-header">
                <div class="request-avatar">
                    <img src="${request.avatar}" alt="${request.name}" loading="lazy">
                </div>
                <div class="request-info">
                    <h4>${request.name}</h4>
                    <p>${request.year} • ${request.department}</p>
                    <span class="request-date">${formatDate(request.date)}</span>
                </div>
            </div>
            <div class="request-message">
                <p>${request.message}</p>
            </div>
            <div class="request-actions">
                <button class="btn btn-primary btn-sm" onclick="acceptRequest(${request.id})">
                    <i class="fas fa-check"></i>
                    Accept
                </button>
                <button class="btn btn-secondary btn-sm" onclick="declineRequest(${request.id})">
                    <i class="fas fa-times"></i>
                    Decline
                </button>
            </div>
        </div>
    `)
    .join("");
}

// Enhanced Events Data
function loadEventsData() {
  loadUpcomingEvents();
  loadRegisteredEvents();
  loadPastEvents();
  initEventsTabs();
}

function initEventsTabs() {
  const eventsTabs = document.querySelectorAll(".events-tabs .tab-btn");
  eventsTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const tabName = this.getAttribute("data-events-tab");
      showEventsTab(tabName);
    });
  });
}

function showEventsTab(tabName) {
  // Hide all events content
  document.querySelectorAll(".events-tab-content").forEach(content => {
    content.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".events-tabs .tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  // Show selected content and activate tab
  const targetContent = document.getElementById(tabName + "EventsTab");
  if (targetContent) {
    targetContent.classList.add("active");
  }

  // Activate clicked tab
  event.target.classList.add("active");
}

function loadUpcomingEvents() {
  const upcomingEventsList = document.getElementById("upcomingEventsList");
  if (!upcomingEventsList) return;

  const events = [
    {
      id: 1,
      title: "Annual Alumni Meetup 2025",
      date: "2025-12-15",
      time: "18:00",
      location: "SNS college of technology",
      type: "networking",
      attendees: 150,
      price: "Free",
      image: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      description: "Join fellow alumni for an evening of networking and reconnection. Share experiences, build new connections, and celebrate our shared journey.",
    },
    {
      id: 2,
      title: "Tech Career Fair 2025",
      date: "2025-11-20",
      time: "10:00",
      location: "SNS college of engineering",
      type: "career",
      attendees: 200,
      price: "$25",
      image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      description: "Explore career opportunities with top tech companies. Meet recruiters, attend workshops, and discover your next career move.",
    },
    {
      id: 3,
      title: "Alumni Webinar: AI in 2025",
      date: "2025-10-25",
      time: "19:00",
      location: "Online",
      type: "workshop",
      attendees: 300,
      price: "Free",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      description: "Learn about the latest trends in artificial intelligence from industry experts and fellow alumni working at the forefront of AI.",
    },
  ];

  renderEventsList(upcomingEventsList, events);
}

function renderEventsList(container, events) {
  container.innerHTML = events
    .map(event => `
        <div class="event-card" onclick="viewEventDetails(${event.id})">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="event-date-badge">
                    ${formatEventDate(event.date)}
                </div>
                <div class="event-price-badge">
                    ${event.price}
                </div>
            </div>
            <div class="event-content">
                <div class="event-type-badge ${event.type}">
                    ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${event.attendees} attending</span>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); registerForEvent(${event.id})">
                        <i class="fas fa-calendar-plus"></i>
                        Register
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); shareEvent(${event.id})">
                        <i class="fas fa-share"></i>
                        Share
                    </button>
                </div>
            </div>
        </div>
    `)
    .join("");
}

function loadRegisteredEvents() {
  const registeredEventsList = document.getElementById("registeredEventsList");
  if (!registeredEventsList) return;

  const events = [
    {
      id: 4,
      title: "Alumni Basketball Tournament",
      date: "2025-02-28",
      time: "14:00",
      location: "Sports Complex",
      type: "social",
      attendees: 80,
      price: "$10",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      description: "Join us for a fun basketball tournament featuring alumni teams from different graduation years.",
      status: "registered"
    }
  ];

  renderEventsList(registeredEventsList, events);
}

function loadPastEvents() {
  const pastEventsList = document.getElementById("pastEventsList");
  if (!pastEventsList) return;

  const events = [
    {
      id: 5,
      title: "Holiday Alumni Mixer 2024",
      date: "2024-12-15",
      time: "19:00",
      location: "Downtown Hotel",
      type: "social",
      attendees: 120,
      price: "$35",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      description: "A wonderful evening of celebration with fellow alumni to close out 2024.",
      status: "attended"
    }
  ];

  renderEventsList(pastEventsList, events);
}

// Enhanced Careers Data
function loadCareersData() {
  const jobsList = document.getElementById("jobsList");
  if (!jobsList) return;

  const jobs = generateJobsData();
  renderJobsList(jobs);
}

function generateJobsData() {
  const jobTitles = [
    "Senior Software Engineer", "Product Manager", "Data Scientist", "UX Designer", 
    "DevOps Engineer", "Marketing Manager", "Financial Analyst", "Research Scientist",
    "Business Analyst", "Frontend Developer", "Backend Developer", "Full Stack Developer"
  ];
  
  const companies = [
    "TechCorp Inc.", "StartupXYZ", "DataCorp", "InnovateTech", "FutureSoft", 
    "DigitalFirst", "CloudTech", "AI Solutions", "FinTech Pro", "HealthTech"
  ];
  
  const locations = [
    "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA",
    "Chicago, IL", "Los Angeles, CA", "Denver, CO", "Portland, OR", "Remote"
  ];

  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: jobTitles[i % jobTitles.length],
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    type: ["Full-time", "Part-time", "Contract", "Internship"][i % 4],
    remote: Math.random() > 0.5,
    salary: generateSalaryRange(jobTitles[i % jobTitles.length]),
    postedBy: ["Sarah Wilson", "David Chen", "Lisa Rodriguez", "James Thompson"][i % 4],
    postedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: generateJobDescription(jobTitles[i % jobTitles.length]),
    requirements: generateJobRequirements(jobTitles[i % jobTitles.length]),
    benefits: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budget", "Flexible Hours"].slice(0, 3 + Math.floor(Math.random() * 2)),
  }));
}

function generateSalaryRange(title) {
  const baseSalaries = {
    "Senior Software Engineer": [120, 160],
    "Product Manager": [100, 140],
    "Data Scientist": [110, 150],
    "UX Designer": [80, 120],
    "DevOps Engineer": [110, 145],
    "Marketing Manager": [70, 110],
    "Financial Analyst": [65, 95],
    "Research Scientist": [90, 130]
  };
  
  const range = baseSalaries[title] || [60, 100];
  return `$${range[0]}k - $${range[1]}k`;
}

function generateJobDescription(title) {
  const descriptions = {
    "Senior Software Engineer": "Join our team to build next-generation software solutions using cutting-edge technologies.",
    "Product Manager": "Lead product strategy and development for our growing platform with cross-functional teams.",
    "Data Scientist": "Analyze complex datasets to drive business decisions and build predictive models.",
    "UX Designer": "Create intuitive and beautiful user experiences for our digital products."
  };
  
  return descriptions[title] || "Exciting opportunity to grow your career with our innovative team.";
}

function generateJobRequirements(title) {
  const requirements = {
    "Senior Software Engineer": ["5+ years experience", "React/Node.js", "System Design"],
    "Product Manager": ["3+ years PM experience", "Analytics", "Leadership"],
    "Data Scientist": ["Python/R", "Machine Learning", "Statistics"],
    "UX Designer": ["Figma/Sketch", "User Research", "Prototyping"]
  };
  
  return requirements[title] || ["Relevant experience", "Strong communication", "Problem solving"];
}

function renderJobsList(jobs) {
  const jobsList = document.getElementById("jobsList");
  if (!jobsList) return;

  jobsList.innerHTML = jobs
    .map(job => `
        <div class="job-card" data-type="${job.type.toLowerCase().replace('-', '')}" data-remote="${job.remote}">
            <div class="job-header">
                <div class="company-logo">
                    <i class="fas fa-building"></i>
                </div>
                <div class="job-info">
                    <h4>${job.title}</h4>
                    <p>${job.company}</p>
                    <div class="job-meta">
                        <span class="job-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${job.location}
                        </span>
                        <span class="job-type ${job.type.toLowerCase().replace("-", "")}">
                            ${job.type}
                        </span>
                        ${job.remote ? '<span class="remote-badge">Remote</span>' : ""}
                    </div>
                </div>
                <div class="job-salary">
                    ${job.salary}
                </div>
            </div>
            <div class="job-description">
                ${job.description}
            </div>
            <div class="job-requirements">
                <strong>Requirements:</strong>
                <div class="requirements-list">
                    ${job.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join("")}
                </div>
            </div>
            <div class="job-benefits">
                <strong>Benefits:</strong>
                <div class="benefits-list">
                    ${job.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join("")}
                </div>
            </div>
            <div class="job-footer">
                <div class="job-posted">
                    Posted by <strong>${job.postedBy}</strong> • ${formatDate(job.postedDate)}
                </div>
                <div class="job-actions">
                    <button class="btn btn-primary" onclick="applyToJob(${job.id})">
                        <i class="fas fa-paper-plane"></i>
                        Apply Now
                    </button>
                    <button class="btn btn-secondary" onclick="saveJob(${job.id})">
                        <i class="fas fa-bookmark"></i>
                        Save
                    </button>
                </div>
            </div>
        </div>
    `)
    .join("");
}

// Enhanced Donations Data
function loadDonationsData() {
  const campaignsList = document.getElementById("campaignsList");
  if (!campaignsList) return;

  const campaigns = [
    {
      id: 1,
      title: "Student Scholarship Fund",
      description: "Help deserving students pursue their education without financial burden.",
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      raised: 68000,
      goal: 100000,
      featured: true,
      donors: 245,
      daysLeft: 45
    },
    {
      id: 2,
      title: "Modern Tech Lab",
      description: "Upgrade campus technology infrastructure for better learning experiences.",
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      raised: 22500,
      goal: 50000,
      featured: false,
      donors: 89,
      daysLeft: 30
    },
    {
      id: 3,
      title: "Library Renovation",
      description: "Create modern study spaces and expand digital resources.",
      image: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      raised: 41000,
      goal: 50000,
      featured: false,
      donors: 156,
      daysLeft: 20
    },
    {
      id: 4,
      title: "Research Equipment Fund",
      description: "Support cutting-edge research with state-of-the-art equipment.",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      raised: 15000,
      goal: 75000,
      featured: false,
      donors: 67,
      daysLeft: 60
    },
  ];

  campaignsList.innerHTML = campaigns
    .map(campaign => `
        <div class="campaign-card ${campaign.featured ? 'featured' : ''}">
            <div class="campaign-image">
                <img src="${campaign.image}" alt="${campaign.title}" loading="lazy">
                ${campaign.featured ? '<div class="campaign-badge">Featured</div>' : ''}
                <div class="days-left-badge">${campaign.daysLeft} days left</div>
            </div>
            <div class="campaign-content">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(campaign.raised / campaign.goal * 100).toFixed(1)}%"></div>
                </div>
                <div class="campaign-stats">
                    <span class="raised">$${campaign.raised.toLocaleString()} raised</span>
                    <span class="goal">of $${campaign.goal.toLocaleString()} goal</span>
                </div>
                <div class="campaign-meta">
                    <span class="donors">${campaign.donors} donors</span>
                    <span class="percentage">${(campaign.raised / campaign.goal * 100).toFixed(1)}% funded</span>
                </div>
                <button class="btn btn-primary" onclick="donate(${campaign.id})">
                    <i class="fas fa-heart"></i>
                    Donate Now
                </button>
            </div>
        </div>
    `)
    .join("");
}

// Enhanced Profile Data
function loadProfileData() {
  const profileSections = document.getElementById("profileSections");
  if (!profileSections) return;

  const profileData = {
    about: "Passionate software engineer with 6+ years of experience in full-stack development. Love mentoring students and giving back to the alumni community. Specialized in building scalable web applications and leading development teams.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Google",
        period: "2021 - Present",
        description: "Lead development of cloud infrastructure solutions, manage a team of 5 engineers, and contribute to open-source projects."
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        period: "2018 - 2021",
        description: "Developed enterprise software solutions, worked on Azure platform features, and mentored junior developers."
      }
    ],
    skills: ["JavaScript", "Python", "React", "Node.js", "Cloud Computing", "Machine Learning", "Team Leadership", "System Design"],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Stanford University",
        year: "2020"
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2018"
      }
    ],
    contact: [
      { icon: "fas fa-envelope", text: "michael.chen@email.com", link: "mailto:michael.chen@email.com" },
      { icon: "fab fa-linkedin", text: "linkedin.com/in/michaelchen", link: "https://linkedin.com/in/michaelchen" },
      { icon: "fab fa-github", text: "github.com/michaelchen", link: "https://github.com/michaelchen" },
      { icon: "fas fa-phone", text: "+1 (555) 123-4567", link: "tel:+15551234567" }
    ]
  };

  profileSections.innerHTML = `
    <div class="profile-section">
      <h4><i class="fas fa-user"></i> About</h4>
      <p>${profileData.about}</p>
    </div>

    <div class="profile-section">
      <h4><i class="fas fa-briefcase"></i> Experience</h4>
      ${profileData.experience.map(exp => `
        <div class="experience-item">
          <div class="experience-header">
            <h5>${exp.title}</h5>
            <span class="experience-period">${exp.period}</span>
          </div>
          <p class="experience-company">${exp.company}</p>
          <p class="experience-desc">${exp.description}</p>
        </div>
      `).join('')}
    </div>

    <div class="profile-section">
      <h4><i class="fas fa-graduation-cap"></i> Education</h4>
      ${profileData.education.map(edu => `
        <div class="education-item">
          <h5>${edu.degree}</h5>
          <p class="education-school">${edu.school}</p>
          <span class="education-year">${edu.year}</span>
        </div>
      `).join('')}
    </div>

    <div class="profile-section">
      <h4><i class="fas fa-cogs"></i> Skills & Expertise</h4>
      <div class="skills-list">
        ${profileData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>

    <div class="profile-section">
      <h4><i class="fas fa-address-book"></i> Contact Information</h4>
      <div class="contact-info">
        ${profileData.contact.map(contact => `
          <div class="contact-item">
            <i class="${contact.icon}"></i>
            <a href="${contact.link}" target="_blank" rel="noopener noreferrer">${contact.text}</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Enhanced Tab Management
function initTabs() {
  // Initialize all tab systems
  initMentorshipTabs();
  initEventsTabs();
}

// Enhanced Study Buddy Chatbot
function initChatbot() {
  // Set initial state
  chatbotOpen = false;
  const chatbot = document.getElementById("studyBuddy");
  const content = document.getElementById("chatbotContent");
  const toggleBtn = document.getElementById("chatbotToggleBtn");
  
  if (chatbot) {
    chatbot.classList.add("collapsed");
  }
  
  if (content) {
    content.style.display = "none";
  }
  
  if (toggleBtn) {
    toggleBtn.querySelector('i').className = "fas fa-chevron-up";
  }

  // Add welcome message with delay
  setTimeout(() => {
    addBotMessage("Hello! I'm your Study Buddy. I can help you navigate the portal, find alumni, schedule sessions, and more! Try the quick questions above or ask me anything.");
  }, 1000);
}

function toggleChatbot() {
  const chatbot = document.getElementById("studyBuddy");
  const content = document.getElementById("chatbotContent");
  const toggleBtn = document.getElementById("chatbotToggleBtn");
  
  if (!chatbot || !content || !toggleBtn) return;
  
  chatbotOpen = !chatbotOpen;
  
  if (chatbotOpen) {
    chatbot.classList.remove("collapsed");
    content.style.display = "flex";
    toggleBtn.querySelector('i').className = "fas fa-chevron-down";
  } else {
    chatbot.classList.add("collapsed");
    content.style.display = "none";
    toggleBtn.querySelector('i').className = "fas fa-chevron-up";
  }
}

function askQuestion(question) {
  addUserMessage(question);
  
  setTimeout(() => {
    const response = generateBotResponse(question);
    addBotMessage(response);
  }, 500);
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message) {
    addUserMessage(message);
    input.value = "";

    setTimeout(() => {
      const response = generateBotResponse(message);
      addBotMessage(response);
    }, 800);
  }
}

function addUserMessage(message) {
  const messagesContainer = document.getElementById("chatbotMessages");
  const messageElement = document.createElement("div");
  messageElement.className = "message user-message";
  messageElement.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
  const messagesContainer = document.getElementById("chatbotMessages");
  const messageElement = document.createElement("div");
  messageElement.className = "message bot-message";
  messageElement.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    "find alumni": "You can find alumni in the Alumni Directory section! Use the filters to search by batch, department, or location. You can also search for specific skills or companies.",
    "schedule mentorship": "To schedule mentorship sessions, go to the Mentorship Hub and click on 'Schedule' next to any of your mentees. You can also view upcoming sessions in the Sessions tab.",
    "upcoming events": "Check out the Events section to see all upcoming alumni events! You can filter by type (networking, workshops, social) and register for events that interest you.",
    "post a job": "To post a job, visit the Career Center and click the 'Post Job' button. Fill out the job details and it will be visible to all alumni in the network.",
    "donation": "You can support your alma mater in the Give Back section. Choose from featured campaigns like scholarships, tech lab upgrades, or library renovation.",
    "profile": "You can update your profile information in the My Profile section. Add your experience, skills, and contact details to help other alumni connect with you.",
    "networking": "The best way to network is through the Alumni Directory. Connect with alumni in your field, join upcoming networking events, or participate in mentorship programs.",
    "help": "I can help you with:\n• Finding alumni in your field\n• Scheduling mentorship sessions\n• Discovering upcoming events\n• Posting or finding job opportunities\n• Making donations\n• Updating your profile\n\nWhat would you like to know more about?"
  };

  // Find matching response
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return response;
    }
  }

  // Default responses based on keywords
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! Great to chat with you. How can I help you navigate the alumni portal today?";
  }
  
  if (lowerMessage.includes("thank")) {
    return "You're welcome! I'm always here to help. Is there anything else you'd like to know about the alumni portal?";
  }

  return "I'm here to help you navigate the alumni portal! You can ask me about finding alumni, scheduling mentorship, upcoming events, job opportunities, donations, or updating your profile. What would you like to explore?";
}

function handleChatEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Enhanced Notification System
function initNotifications() {
  const notificationBtn = document.querySelector(".notification-btn");
  if (notificationBtn) {
    notificationBtn.addEventListener("click", toggleNotifications);
  }

  loadNotifications();
}

function toggleNotifications() {
  const panel = document.getElementById("notificationPanel");
  if (panel) {
    notificationPanelOpen = !notificationPanelOpen;
    panel.classList.toggle("active", notificationPanelOpen);
  }
}

function loadNotifications() {
  const notificationList = document.getElementById("notificationList");
  if (!notificationList) return;

  const notifications = [
    {
      id: 1,
      title: "New Connection Request",
      message: "Sarah Johnson wants to connect with you",
      time: "2 hours ago",
      unread: true,
      type: "connection"
    },
    {
      id: 2,
      title: "Event Reminder",
      message: "Tech Alumni Meetup is tomorrow at 6 PM",
      time: "5 hours ago",
      unread: true,
      type: "event"
    },
    {
      id: 3,
      title: "New Job Posting",
      message: "Senior Developer position at TechCorp matches your profile",
      time: "1 day ago",
      unread: false,
      type: "job"
    },
    {
      id: 4,
      title: "Mentorship Session Confirmed",
      message: "Your session with Emma Thompson is confirmed for tomorrow",
      time: "1 day ago",
      unread: true,
      type: "mentorship"
    },
    {
      id: 5,
      title: "Donation Thank You",
      message: "Thank you for your $100 contribution to the Scholarship Fund",
      time: "2 days ago",
      unread: false,
      type: "donation"
    }
  ];

  notificationList.innerHTML = notifications
    .map(notification => `
        <div class="notification-item ${notification.unread ? "unread" : ""}" onclick="handleNotificationClick(${notification.id})">
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
        </div>
    `)
    .join("");
}

function handleNotificationClick(id) {
  const notificationItem = event.target.closest(".notification-item");
  if (notificationItem) {
    notificationItem.classList.remove("unread");
  }

  // Handle different notification types
  const notification = getNotificationById(id);
  if (notification) {
    switch (notification.type) {
      case "connection":
        showTab("directory");
        break;
      case "event":
        showTab("events");
        break;
      case "job":
        showTab("careers");
        break;
      case "mentorship":
        showTab("mentorship");
        break;
      case "donation":
        showTab("donations");
        break;
    }
    toggleNotifications(); // Close the panel
  }
}

function getNotificationById(id) {
  // This would normally fetch from a data source
  const notificationTypes = {
    1: { type: "connection" },
    2: { type: "event" },
    3: { type: "job" },
    4: { type: "mentorship" },
    5: { type: "donation" }
  };
  return notificationTypes[id];
}

function markAllAsRead() {
  const unreadItems = document.querySelectorAll(".notification-item.unread");
  unreadItems.forEach(item => {
    item.classList.remove("unread");
  });

  showNotification("All notifications marked as read", "success");
}

// Enhanced Action Functions with Real Functionality
function connectWithAlumni(id) {
  showActionModal(
    "Connect with Alumni",
    "Send a personalized connection request to this alumni.",
    `
      <div class="form-group">
        <label for="connectionMessage">Personal Message:</label>
        <textarea id="connectionMessage" placeholder="Hi! I'd love to connect with you and learn about your experience at..."></textarea>
      </div>
    `,
    () => {
      const message = document.getElementById("connectionMessage").value;
      if (message.trim()) {
        showNotification("Connection request sent successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please write a personal message", "warning");
      }
    }
  );
}

function messageAlumni(id) {
  showActionModal(
    "Send Message",
    "Send a direct message to this alumni.",
    `
      <div class="form-group">
        <label for="messageSubject">Subject:</label>
        <input type="text" id="messageSubject" placeholder="Enter message subject">
      </div>
      <div class="form-group">
        <label for="messageBody">Message:</label>
        <textarea id="messageBody" placeholder="Type your message here..."></textarea>
      </div>
    `,
    () => {
      const subject = document.getElementById("messageSubject").value;
      const body = document.getElementById("messageBody").value;
      if (subject.trim() && body.trim()) {
        showNotification("Message sent successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please fill in all fields", "warning");
      }
    }
  );
}

function registerForEvent(id) {
  showActionModal(
    "Register for Event",
    "Complete your registration for this event.",
    `
      <div class="form-group">
        <label for="attendeeType">Attendance Type:</label>
        <select id="attendeeType">
          <option value="in-person">In-Person</option>
          <option value="virtual">Virtual</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dietaryRestrictions">Dietary Restrictions (if applicable):</label>
        <input type="text" id="dietaryRestrictions" placeholder="None">
      </div>
      <div class="form-group">
        <input type="checkbox" id="agreeTerms">
        <label for="agreeTerms">I agree to the event terms and conditions</label>
      </div>
    `,
    () => {
      const agreeTerms = document.getElementById("agreeTerms").checked;
      if (agreeTerms) {
        showNotification("Successfully registered for event!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please agree to the terms and conditions", "warning");
      }
    }
  );
}

function applyToJob(id) {
  showActionModal(
    "Apply for Job",
    "Submit your application for this position.",
    `
      <div class="form-group">
        <label for="resumeFile">Upload Resume:</label>
        <input type="file" id="resumeFile" accept=".pdf,.doc,.docx">
      </div>
      <div class="form-group">
        <label for="coverLetter">Cover Letter:</label>
        <textarea id="coverLetter" placeholder="Write a compelling cover letter..."></textarea>
      </div>
      <div class="form-group">
        <label for="expectedSalary">Expected Salary:</label>
        <input type="text" id="expectedSalary" placeholder="e.g., $120,000 or Negotiable">
      </div>
    `,
    () => {
      const coverLetter = document.getElementById("coverLetter").value;
      if (coverLetter.trim()) {
        showNotification("Application submitted successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please write a cover letter", "warning");
      }
    }
  );
}

function donate(campaignId) {
  showActionModal(
    "Make a Donation",
    "Support this campaign with your generous contribution.",
    `
      <div class="donation-amounts">
        <div class="amount-options">
          <button type="button" class="amount-btn" onclick="selectAmount(25)">$25</button>
          <button type="button" class="amount-btn" onclick="selectAmount(50)">$50</button>
          <button type="button" class="amount-btn" onclick="selectAmount(100)">$100</button>
          <button type="button" class="amount-btn" onclick="selectAmount(250)">$250</button>
        </div>
        <div class="custom-amount">
          <label for="customAmount">Or enter custom amount:</label>
          <input type="number" id="customAmount" placeholder="Enter amount" min="1">
        </div>
      </div>
      <div class="form-group">
        <input type="checkbox" id="anonymousDonation">
        <label for="anonymousDonation">Make this an anonymous donation</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="recurringDonation">
        <label for="recurringDonation">Make this a monthly recurring donation</label>
      </div>
    `,
    () => {
      const customAmount = document.getElementById("customAmount").value;
      const selectedAmount = document.querySelector(".amount-btn.selected");
      
      if (customAmount || selectedAmount) {
        const amount = customAmount || selectedAmount.textContent.replace('$', '');
        showNotification(`Thank you for your $${amount} donation!`, "success");
        closeModal("actionModal");
      } else {
        showNotification("Please select or enter a donation amount", "warning");
      }
    }
  );
}

function selectAmount(amount) {
  // Remove selected class from all buttons
  document.querySelectorAll(".amount-btn").forEach(btn => {
    btn.classList.remove("selected");
  });
  
  // Add selected class to clicked button
  event.target.classList.add("selected");
  
  // Clear custom amount
  document.getElementById("customAmount").value = "";
}

function scheduleSession(menteeId) {
  showActionModal(
    "Schedule Mentorship Session",
    "Set up a mentorship session with your mentee.",
    `
      <div class="form-group">
        <label for="sessionDate">Date:</label>
        <input type="date" id="sessionDate" min="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label for="sessionTime">Time:</label>
        <input type="time" id="sessionTime">
      </div>
      <div class="form-group">
        <label for="sessionDuration">Duration:</label>
        <select id="sessionDuration">
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
        </select>
      </div>
      <div class="form-group">
        <label for="sessionTopic">Session Topic:</label>
        <input type="text" id="sessionTopic" placeholder="e.g., Career guidance, Technical interview prep">
      </div>
      <div class="form-group">
        <label for="meetingLink">Meeting Link (optional):</label>
        <input type="url" id="meetingLink" placeholder="https://meet.google.com/...">
      </div>
    `,
    () => {
      const date = document.getElementById("sessionDate").value;
      const time = document.getElementById("sessionTime").value;
      const topic = document.getElementById("sessionTopic").value;
      
      if (date && time && topic) {
        showNotification("Mentorship session scheduled successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please fill in all required fields", "warning");
      }
    }
  );
}

function postJob() {
  showActionModal(
    "Post New Job",
    "Share a job opportunity with the alumni network.",
    `
      <div class="form-group">
        <label for="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" placeholder="e.g., Senior Software Engineer">
      </div>
      <div class="form-group">
        <label for="companyName">Company:</label>
        <input type="text" id="companyName" placeholder="Company name">
      </div>
      <div class="form-group">
        <label for="jobLocation">Location:</label>
        <input type="text" id="jobLocation" placeholder="e.g., San Francisco, CA or Remote">
      </div>
      <div class="form-group">
        <label for="jobType">Job Type:</label>
        <select id="jobType">
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>
      <div class="form-group">
        <label for="salaryRange">Salary Range:</label>
        <input type="text" id="salaryRange" placeholder="e.g., $100k - $150k or Competitive">
      </div>
      <div class="form-group">
        <label for="jobDescription">Job Description:</label>
        <textarea id="jobDescription" placeholder="Describe the role, responsibilities, and requirements..."></textarea>
      </div>
    `,
    () => {
      const title = document.getElementById("jobTitle").value;
      const company = document.getElementById("companyName").value;
      const description = document.getElementById("jobDescription").value;
      
      if (title && company && description) {
        showNotification("Job posting created successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please fill in all required fields", "warning");
      }
    }
  );
}

function createEvent() {
  showActionModal(
    "Create New Event",
    "Organize an event for the alumni community.",
    `
      <div class="form-group">
        <label for="eventTitle">Event Title:</label>
        <input type="text" id="eventTitle" placeholder="e.g., Alumni Tech Meetup">
      </div>
      <div class="form-group">
        <label for="eventDate">Date:</label>
        <input type="date" id="eventDate" min="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label for="eventTime">Time:</label>
        <input type="time" id="eventTime">
      </div>
      <div class="form-group">
        <label for="eventLocation">Location:</label>
        <input type="text" id="eventLocation" placeholder="e.g., University Campus or Online">
      </div>
      <div class="form-group">
        <label for="eventType">Event Type:</label>
        <select id="eventType">
          <option value="networking">Networking</option>
          <option value="workshop">Workshop</option>
          <option value="social">Social</option>
          <option value="fundraising">Fundraising</option>
        </select>
      </div>
      <div class="form-group">
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" placeholder="Describe your event..."></textarea>
      </div>
    `,
    () => {
      const title = document.getElementById("eventTitle").value;
      const date = document.getElementById("eventDate").value;
      const description = document.getElementById("eventDescription").value;
      
      if (title && date && description) {
        showNotification("Event created successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please fill in all required fields", "warning");
      }
    }
  );
}

function updateProfile() {
  showTab('profile');
  showNotification("Redirected to profile section for editing", "info");
}

function editProfile() {
  showActionModal(
    "Edit Profile",
    "Update your profile information.",
    `
      <div class="form-group">
        <label for="profileBio">Bio:</label>
        <textarea id="profileBio" placeholder="Tell us about yourself...">Passionate software engineer with 6+ years of experience in full-stack development.</textarea>
      </div>
      <div class="form-group">
        <label for="currentPosition">Current Position:</label>
        <input type="text" id="currentPosition" value="Senior Software Engineer at Google">
      </div>
      <div class="form-group">
        <label for="profileLocation">Location:</label>
        <input type="text" id="profileLocation" value="San Francisco, CA">
      </div>
      <div class="form-group">
        <label for="profileSkills">Skills (comma-separated):</label>
        <input type="text" id="profileSkills" value="JavaScript, Python, React, Node.js, Cloud Computing">
      </div>
    `,
    () => {
      showNotification("Profile updated successfully!", "success");
      closeModal("actionModal");
      // Reload profile data
      setTimeout(() => loadProfileData(), 500);
    }
  );
}

function becomeMentor() {
  showActionModal(
    "Become a Mentor",
    "Join our mentorship program and help current students.",
    `
      <div class="form-group">
        <label for="mentorExpertise">Areas of Expertise:</label>
        <input type="text" id="mentorExpertise" placeholder="e.g., Software Development, Product Management">
      </div>
      <div class="form-group">
        <label for="mentorExperience">Years of Experience:</label>
        <select id="mentorExperience">
          <option value="1-2">1-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>
      <div class="form-group">
        <label for="mentorAvailability">Availability:</label>
        <select id="mentorAvailability">
          <option value="1-2">1-2 hours per week</option>
          <option value="3-5">3-5 hours per week</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>
      <div class="form-group">
        <label for="mentorMotivation">Why do you want to mentor?</label>
        <textarea id="mentorMotivation" placeholder="Share your motivation for becoming a mentor..."></textarea>
      </div>
    `,
    () => {
      const expertise = document.getElementById("mentorExpertise").value;
      const motivation = document.getElementById("mentorMotivation").value;
      
      if (expertise && motivation) {
        showNotification("Mentor application submitted successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please fill in all required fields", "warning");
      }
    }
  );
}

function logout() {
  showActionModal(
    "Confirm Logout",
    "Are you sure you want to logout?",
    `<p>You will be redirected to the login page.</p>`,
    () => {
      showNotification("Logging out...", "info");
      closeModal("actionModal");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  );
}

// Enhanced Filtering Functions
function filterDirectory() {
  const batchFilter = document.getElementById("batchFilter").value;
  const deptFilter = document.getElementById("deptFilter").value;
  const locationFilter = document.getElementById("locationFilter").value;

  const cards = document.querySelectorAll(".alumni-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesBatch = !batchFilter || card.dataset.batch === batchFilter;
    const matchesDept = !deptFilter || card.dataset.dept === deptFilter;
    const matchesLocation = !locationFilter || card.dataset.location.includes(locationFilter);
    
    const shouldShow = matchesBatch && matchesDept && matchesLocation;
    
    if (shouldShow) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  showNotification(`Found ${visibleCount} alumni matching your filters`, "info");
}

function filterEvents() {
  const typeFilter = document.getElementById("eventTypeFilter").value;
  const locationFilter = document.getElementById("eventLocationFilter").value;

  showNotification("Filtering events...", "info");
}

function filterJobs() {
  const typeFilter = document.getElementById("jobTypeFilter").value;
  const experienceFilter = document.getElementById("experienceFilter").value;
  const remoteFilter = document.getElementById("remoteFilter").value;

  const cards = document.querySelectorAll(".job-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesType = !typeFilter || card.dataset.type === typeFilter;
    const matchesRemote = !remoteFilter || 
      (remoteFilter === "remote" && card.dataset.remote === "true") ||
      (remoteFilter === "onsite" && card.dataset.remote === "false");
    
    const shouldShow = matchesType && matchesRemote;
    
    if (shouldShow) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  showNotification(`Found ${visibleCount} jobs matching your criteria`, "info");
}

function setView(viewType) {
  const viewButtons = document.querySelectorAll(".view-btn");
  viewButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.view === viewType) {
      btn.classList.add("active");
    }
  });

  currentView = viewType;
  showNotification(`Switched to ${viewType} view`, "info");
}

function performGlobalSearch() {
  const searchTerm = document.getElementById("globalSearch").value.toLowerCase();

  if (searchTerm.length < 2) return;

  // Simulate search functionality
  showNotification(`Searching for "${searchTerm}"...`, "info");
}

// Enhanced Modal Management
function showActionModal(title, description, content, onConfirm) {
  const modal = document.getElementById("actionModal");
  const titleElement = document.getElementById("actionModalTitle");
  const bodyElement = document.getElementById("actionModalBody");
  const confirmBtn = document.getElementById("actionModalConfirm");

  if (titleElement) titleElement.textContent = title;
  if (bodyElement) {
    bodyElement.innerHTML = `
      <p>${description}</p>
      ${content}
    `;
  }

  // Remove previous event listeners
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  // Add new event listener
  newConfirmBtn.addEventListener("click", onConfirm);

  modal.classList.add("active");
}

function showModal(modalId, content) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const modalBody = modal.querySelector(".modal-body");
    if (modalBody) {
      modalBody.innerHTML = content;
    }
    modal.classList.add("active");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function viewAlumniProfile(id) {
  const profileContent = `
    <div class="alumni-profile-modal">
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Alumni">
        </div>
        <div class="profile-info">
          <h3>Sarah Wilson</h3>
          <p>Senior Software Engineer at Google</p>
          <span class="profile-batch">Class of 2018 • Computer Science</span>
        </div>
      </div>
      <div class="profile-details">
        <div class="detail-section">
          <h4><i class="fas fa-user"></i> About</h4>
          <p>Passionate software engineer with 6+ years of experience in full-stack development. Love mentoring students and giving back to the alumni community.</p>
        </div>
        <div class="detail-section">
          <h4><i class="fas fa-cogs"></i> Skills</h4>
          <div class="skills-list">
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
          </div>
        </div>
        <div class="detail-section">
          <h4><i class="fas fa-briefcase"></i> Experience</h4>
          <p>Currently working at Google as a Senior Software Engineer, previously at Microsoft for 3 years.</p>
        </div>
      </div>
      <div class="profile-actions">
        <button class="btn btn-primary" onclick="connectWithAlumni(${id}); closeModal('alumniModal');">
          <i class="fas fa-user-plus"></i>
          Connect
        </button>
        <button class="btn btn-secondary" onclick="messageAlumni(${id}); closeModal('alumniModal');">
          <i class="fas fa-envelope"></i>
          Message
        </button>
      </div>
    </div>
  `;
  
  showModal("alumniModal", profileContent);
}

function showActivityModal() {
  const activityContent = `
    <div class="activity-modal">
      <h4>All Recent Activity</h4>
      <div class="activity-list">
        ${Array.from({ length: 10 }, (_, i) => `
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-${['user-plus', 'calendar', 'briefcase', 'handshake', 'heart'][i % 5]}"></i>
            </div>
            <div class="activity-content">
              <p><strong>Activity ${i + 1}</strong> - Some activity description here</p>
              <span class="activity-time">${i + 1} hours ago</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  showModal("actionModal", activityContent);
  document.getElementById("actionModalTitle").textContent = "Recent Activity";
  document.querySelector(".modal-footer").style.display = "none";
}

function viewEventDetails(id) {
  const eventContent = `
    <div class="event-details-modal">
      <div class="event-header">
        <h3>Annual Alumni Meetup 2025</h3>
        <span class="event-date">March 15, 2025</span>
      </div>
      <div class="event-image">
        <img src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=500&h=250&fit=crop" alt="Event">
      </div>
      <div class="event-details">
        <p>Join fellow alumni for an evening of networking and reconnection. Share experiences, build new connections, and celebrate our shared journey.</p>
        
        <div class="event-info-grid">
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>6:00 PM - 9:00 PM</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>University Campus</span>
          </div>
          <div class="info-item">
            <i class="fas fa-users"></i>
            <span>150 Attendees</span>
          </div>
          <div class="info-item">
            <i class="fas fa-tag"></i>
            <span>Free Event</span>
          </div>
        </div>
        
        <div class="event-agenda">
          <h4>Agenda</h4>
          <ul>
            <li>6:00 PM - Registration & Welcome Reception</li>
            <li>6:30 PM - Opening Remarks</li>
            <li>7:00 PM - Networking Session</li>
            <li>8:00 PM - Panel Discussion</li>
            <li>8:30 PM - Closing & Group Photo</li>
          </ul>
        </div>
      </div>
      <div class="event-actions">
        <button class="btn btn-primary" onclick="registerForEvent(${id}); closeModal('actionModal');">
          <i class="fas fa-calendar-plus"></i>
          Register Now
        </button>
        <button class="btn btn-secondary" onclick="shareEvent(${id});">
          <i class="fas fa-share"></i>
          Share Event
        </button>
      </div>
    </div>
  `;
  
  showModal("actionModal", eventContent);
  document.getElementById("actionModalTitle").textContent = "Event Details";
  document.querySelector(".modal-footer").style.display = "none";
}

// Additional Action Functions
function saveJob(id) {
  showNotification("Job saved to your list!", "success");
}

function shareEvent(id) {
  showNotification("Event link copied to clipboard!", "success");
}

function messageMentee(menteeId) {
  showNotification("Opening message composer...", "info");
}

function joinSession(sessionId) {
  showNotification("Opening video session in new tab...", "info");
  // In a real application, this would open the video call
}

function rescheduleSession(sessionId) {
  scheduleSession(sessionId); // Reuse the schedule session modal
}

function acceptRequest(requestId) {
  showNotification("Mentorship request accepted!", "success");
  // Refresh the requests list
  setTimeout(() => loadMentorshipRequests(), 1000);
}

function declineRequest(requestId) {
  showNotification("Mentorship request declined", "info");
  // Refresh the requests list
  setTimeout(() => loadMentorshipRequests(), 1000);
}

function changeAvatar() {
  showActionModal(
    "Change Avatar",
    "Upload a new profile picture.",
    `
      <div class="form-group">
        <label for="avatarFile">Choose new avatar:</label>
        <input type="file" id="avatarFile" accept="image/*">
      </div>
      <div class="form-group">
        <p><small>Recommended: Square image, at least 200x200 pixels</small></p>
      </div>
    `,
    () => {
      const file = document.getElementById("avatarFile").files[0];
      if (file) {
        showNotification("Avatar updated successfully!", "success");
        closeModal("actionModal");
      } else {
        showNotification("Please select an image file", "warning");
      }
    }
  );
}

function makeDonation() {
  showTab('donations');
}

// Enhanced Notification System
function showNotification(message, type = "info") {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${getIconForType(type)}"></i>
      <span>${message}</span>
    `;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
}

function getIconForType(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

// Enhanced Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatEventDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector(".portal-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

// Data Loading Functions
function loadPortalData() {
  // Load all initial data
  loadDashboardData();
}

// Close panels when clicking outside
document.addEventListener("click", function (event) {
  const notificationPanel = document.getElementById("notificationPanel");
  const notificationBtn = document.querySelector(".notification-btn");

  if (
    notificationPanelOpen &&
    notificationPanel &&
    !notificationPanel.contains(event.target) &&
    !notificationBtn.contains(event.target)
  ) {
    toggleNotifications();
  }

  // Close modals when clicking backdrop
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active");
  }
});

// URL routing for direct navigation
window.addEventListener("load", function() {
  const hash = window.location.hash.substring(1);
  if (hash && ["dashboard", "directory", "mentorship", "events", "careers", "donations", "profile"].includes(hash)) {
    showTab(hash);
  }
});

// Enhanced search functionality
document.addEventListener("input", function(event) {
  if (event.target.id === "jobSearchInput") {
    const searchTerm = event.target.value.toLowerCase();
    const jobCards = document.querySelectorAll(".job-card");
    
    jobCards.forEach(card => {
      const title = card.querySelector("h4").textContent.toLowerCase();
      const company = card.querySelector("p").textContent.toLowerCase();
      const description = card.querySelector(".job-description").textContent.toLowerCase();
      
      const matches = title.includes(searchTerm) || 
                     company.includes(searchTerm) || 
                     description.includes(searchTerm);
      
      card.style.display = matches ? "block" : "none";
    });
  }
});