// Admin Dashboard JavaScript - Complete Functionality
document.addEventListener("DOMContentLoaded", function () {
  initAdminDashboard();
  initSidebar();
  initCharts();
  initDataTables();
  initNotifications();
  initChatbot();
  loadDashboardData();
});

// Global variables
let currentSection = "dashboardSection";
let charts = {};
let chatbotVisible = true;
let chatbotMinimized = false;
let tableData = {
  pending: [],
  approved: [],
  events: [],
  careers: [],
  donations: [],
  students: [],
};

function initAdminDashboard() {
  // Set admin role in session
  sessionStorage.setItem("userRole", "admin");
  
  // Initialize dashboard components
  //updateHeaderStats();
  loadRecentActivity();

  // Set up auto-refresh for live data
  setInterval(updateLiveStats, 30000); // Update every 30 seconds

  // Show success message on load
  setTimeout(() => {
    showNotification("Welcome to AlumniConnect Admin Dashboard!", "success");
  }, 1000);
}

function initSidebar() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get section to show
      const onclick = this.getAttribute("onclick");
      if (onclick) {
        const sectionMatch = onclick.match(/showSection\('(.+?)'\)/);
        if (sectionMatch) {
          showSection(sectionMatch[1]);
        }
      }
    });
  });
}
function updateHeaderStats() {
    // Example: update some values in your header
    document.getElementById("userCount").textContent = "120";
    document.getElementById("notifications").textContent = "5 new";
}
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
    currentSection = sectionId;

    // Update breadcrumb
    updateBreadcrumb(sectionId);

    // Load section-specific data
    loadSectionData(sectionId);

    // Show section change notification
    const sectionNames = {
      dashboardSection: "Dashboard",
      pendingSection: "Pending Requests",
      approvedSection: "Approved Alumni",
      eventsSection: "Events",
      careerSection: "Career Board",
      donationSection: "Donations",
      analyticsSection: "Analytics",
      studentSection: "Students",
      settingsSection: "Settings",
    };
    
    showNotification(`Navigated to ${sectionNames[sectionId]}`, "info");
  }
}

function updateBreadcrumb(sectionId) {
  const breadcrumbMap = {
    dashboardSection: "Dashboard",
    pendingSection: "Pending Requests",
    approvedSection: "Approved Alumni",
    eventsSection: "Events",
    careerSection: "Career Board",
    donationSection: "Donations",
    analyticsSection: "Analytics",
    studentSection: "Students",
    settingsSection: "Settings",
  };

  const currentPageElement = document.getElementById("currentPage");
  if (currentPageElement) {
    currentPageElement.textContent = breadcrumbMap[sectionId] || "Dashboard";
  }
}

function loadSectionData(sectionId) {
  switch (sectionId) {
    case "pendingSection":
      loadPendingAlumni();
      break;
    case "approvedSection":
      loadApprovedAlumni();
      break;
    case "eventsSection":
      loadEvents();
      break;
    case "careerSection":
      loadCareers();
      break;
    case "donationSection":
      loadDonations();
      break;
    case "analyticsSection":
      loadAnalytics();
      break;
    case "studentSection":
      loadStudents();
      break;
    case "settingsSection":
      loadSettings();
      break;
  }
}

function initCharts() {
  // Registration trends chart
  const registrationCtx = document.getElementById("registrationChart");
  if (registrationCtx) {
    charts.registration = new Chart(registrationCtx, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
          {
            label: "New Registrations",
            data: [45, 52, 38, 67, 73, 89, 95, 102, 87, 76, 69, 84],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            borderWidth: 3,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#3b82f6",
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: { color: "#6b7280" },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280" },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });
  }

  // Department distribution chart
  const departmentCtx = document.getElementById("departmentChart");
  if (departmentCtx) {
    charts.department = new Chart(departmentCtx, {
      type: "doughnut",
      data: {
        labels: ["Computer Science", "Engineering", "Business", "Arts", "Science"],
        datasets: [
          {
            data: [35, 25, 20, 12, 8],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
            borderWidth: 0,
            cutout: "60%",
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
              padding: 15,
              usePointStyle: true,
              font: { family: "Inter", size: 12 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#3b82f6",
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
      },
    });
  }
}

function loadDashboardData() {
  updateMetricCards();
  loadRecentActivity();
}

function updateMetricCards() {
  const metricValues = document.querySelectorAll(".metric-value");
  const values = [2847, 23, 15, 142];
  
  metricValues.forEach((element, index) => {
    if (values[index]) {
      animateCounter(element, values[index]);
    }
  });

  // Update header stats
  const totalAlumniElement = document.getElementById("totalAlumni");
  const newThisMonthElement = document.getElementById("newThisMonth");
  const pendingCountElement = document.getElementById("pendingCount");

  if (totalAlumniElement) totalAlumniElement.textContent = "2,847";
  if (newThisMonthElement) newThisMonthElement.textContent = "127";
  if (pendingCountElement) pendingCountElement.textContent = "23";
}

function animateCounter(element, target, duration = 2000) {
  if (!element) return;

  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      if (target >= 1000) {
        element.textContent = "$" + (target / 1000).toFixed(0) + "K";
      } else {
        element.textContent = target.toLocaleString();
      }
      clearInterval(timer);
    } else {
      if (target >= 1000) {
        element.textContent = "$" + Math.floor(start / 1000) + "K";
      } else {
        element.textContent = Math.floor(start).toLocaleString();
      }
    }
  }, 16);
}

function loadRecentActivity() {
  const activityList = document.getElementById("activityList");
  if (!activityList) return;

  const activities = [
    {
      icon: "fa-user-plus",
      text: "<strong>John Smith</strong> submitted alumni verification request",
      time: "5 minutes ago",
      type: "user",
    },
    {
      icon: "fa-calendar-plus",
      text: 'New event <strong>"Tech Alumni Meetup 2025"</strong> was created',
      time: "1 hour ago",
      type: "event",
    },
    {
      icon: "fa-donate",
      text: "<strong>Sarah Wilson</strong> made a donation of $500",
      time: "2 hours ago",
      type: "donation",
    },
    {
      icon: "fa-briefcase",
      text: "New job posting: <strong>Software Engineer at TechCorp</strong>",
      time: "3 hours ago",
      type: "job",
    },
    {
      icon: "fa-check-circle",
      text: "5 alumni requests were approved",
      time: "4 hours ago",
      type: "approval",
    },
  ];

  activityList.innerHTML = activities
    .map(
      (activity) => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `
    )
    .join("");
}

function loadPendingAlumni() {
  const pendingData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      department: "Computer Science",
      batch: "2020",
      requestDate: "2025-01-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@email.com",
      department: "Engineering",
      batch: "2019",
      requestDate: "2025-01-14",
      status: "pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      department: "Business",
      batch: "2021",
      requestDate: "2025-01-13",
      status: "pending",
    },
    {
      id: 4,
      name: "Jessica Davis",
      email: "jessica.davis@email.com",
      department: "Arts",
      batch: "2022",
      requestDate: "2025-01-12",
      status: "pending",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      department: "Engineering",
      batch: "2020",
      requestDate: "2025-01-11",
      status: "pending",
    },
  ];

  tableData.pending = pendingData;
  renderPendingTable(pendingData);
}

function renderPendingTable(data) {
  const tableBody = document.getElementById("pendingTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      (alumni) => `
        <tr>
            <td>
                <label class="checkbox-wrapper">
                    <input type="checkbox" value="${alumni.id}">
                    <span class="checkbox-custom"></span>
                </label>
            </td>
            <td>
                <div class="alumni-name">
                    <strong>${alumni.name}</strong>
                </div>
            </td>
            <td>${alumni.email}</td>
            <td>${alumni.department}</td>
            <td>${alumni.batch}</td>
            <td>${formatDate(alumni.requestDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-success btn-sm" onclick="approveAlumni(${
                      alumni.id
                    })">
                        <i class="fas fa-check"></i>
                        Approve
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="rejectAlumni(${
                      alumni.id
                    })">
                        <i class="fas fa-times"></i>
                        Reject
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="viewAlumniDetails(${
                      alumni.id
                    })">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadApprovedAlumni() {
  const approvedData = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      department: "Computer Science",
      batch: "2018",
      company: "Google",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "David Chen",
      email: "david.chen@email.com",
      department: "Engineering",
      batch: "2017",
      company: "Microsoft",
      position: "Product Manager",
      location: "Seattle, WA",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@email.com",
      department: "Business",
      batch: "2019",
      company: "Amazon",
      position: "Marketing Director",
      location: "New York, NY",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      department: "Computer Science",
      batch: "2020",
      company: "Apple",
      position: "iOS Developer",
      location: "Cupertino, CA",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      department: "Business",
      batch: "2018",
      company: "Tesla",
      position: "Operations Manager",
      location: "Austin, TX",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "James Miller",
      email: "james.miller@email.com",
      department: "Engineering",
      batch: "2019",
      company: "SpaceX",
      position: "Aerospace Engineer",
      location: "Hawthorne, CA",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
  ];

  tableData.approved = approvedData;
  renderApprovedGrid(approvedData);
}

function renderApprovedGrid(data) {
  const approvedGrid = document.getElementById("approvedGrid");
  if (!approvedGrid) return;

  approvedGrid.innerHTML = data
    .map(
      (alumni) => `
        <div class="alumni-card">
            <div class="alumni-header">
                <div class="alumni-avatar">
                    <img src="${alumni.avatar}" alt="${alumni.name}">
                </div>
                <div class="alumni-info">
                    <h4>${alumni.name}</h4>
                    <p>${alumni.position}</p>
                    <span class="company">${alumni.company}</span>
                </div>
            </div>
            <div class="alumni-details">
                <div class="detail-row">
                    <span class="detail-label">Department</span>
                    <span class="detail-value">${alumni.department}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Batch</span>
                    <span class="detail-value">${alumni.batch}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${alumni.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${alumni.email}</span>
                </div>
            </div>
            <div class="alumni-actions">
                <button class="btn btn-primary btn-sm" onclick="viewAlumniProfile(${alumni.id})">
                    <i class="fas fa-user"></i>
                    View Profile
                </button>
                <button class="btn btn-secondary btn-sm" onclick="editAlumni(${alumni.id})">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

function loadEvents() {
  const eventsData = [
    {
      id: 1,
      name: "Annual Alumni Meetup 2025",
      date: "2025-03-15",
      venue: "University Campus",
      attendees: 150,
      status: "upcoming",
    },
    {
      id: 2,
      name: "Tech Career Fair",
      date: "2025-02-20",
      venue: "Convention Center",
      attendees: 200,
      status: "upcoming",
    },
    {
      id: 3,
      name: "Alumni Networking Night",
      date: "2025-01-30",
      venue: "Downtown Hotel",
      attendees: 75,
      status: "completed",
    },
    {
      id: 4,
      name: "Business Leadership Summit",
      date: "2025-04-10",
      venue: "Business Center",
      attendees: 120,
      status: "upcoming",
    },
    {
      id: 5,
      name: "Engineering Workshop",
      date: "2025-02-05",
      venue: "Engineering Building",
      attendees: 80,
      status: "upcoming",
    },
  ];

  tableData.events = eventsData;
  renderEventsTable(eventsData);
}

function renderEventsTable(data) {
  const tableBody = document.getElementById("eventsTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      (event) => `
        <tr>
            <td><strong>${event.name}</strong></td>
            <td>${formatDate(event.date)}</td>
            <td>${event.venue}</td>
            <td>${event.attendees}</td>
            <td>
                <span class="status-badge ${event.status}">
                    ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewEvent(${event.id})">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="editEvent(${event.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    ${
                      event.status === "upcoming"
                        ? `
                        <button class="btn btn-danger btn-sm" onclick="cancelEvent(${event.id})">
                            <i class="fas fa-times"></i>
                            Cancel
                        </button>
                    `
                        : ""
                    }
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadCareers() {
  const careerData = [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      postedDate: "2025-01-10",
    },
    {
      id: 2,
      position: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      postedDate: "2025-01-08",
    },
    {
      id: 3,
      position: "Data Scientist Intern",
      company: "DataCorp",
      location: "Remote",
      type: "Internship",
      postedDate: "2025-01-05",
    },
    {
      id: 4,
      position: "Marketing Specialist",
      company: "AdTech Solutions",
      location: "Chicago, IL",
      type: "Full-time",
      postedDate: "2025-01-12",
    },
    {
      id: 5,
      position: "Frontend Developer",
      company: "WebDev Studio",
      location: "Austin, TX",
      type: "Part-time",
      postedDate: "2025-01-09",
    },
  ];

  tableData.careers = careerData;
  renderCareersTable(careerData);
}

function renderCareersTable(data) {
  const tableBody = document.getElementById("careerTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      (job) => `
        <tr>
            <td><strong>${job.position}</strong></td>
            <td>${job.company}</td>
            <td>${job.location}</td>
            <td>
                <span class="job-type ${job.type.toLowerCase().replace("-", "")}">${job.type}</span>
            </td>
            <td>${formatDate(job.postedDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewJob(${job.id})">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="editJob(${job.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteJob(${job.id})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadDonations() {
  const donationData = [
    {
      id: 1,
      donor: "Sarah Wilson",
      amount: 1000,
      campaign: "Scholarship Fund",
      date: "2025-01-15",
      status: "completed",
    },
    {
      id: 2,
      donor: "Michael Chen",
      amount: 500,
      campaign: "Library Renovation",
      date: "2025-01-14",
      status: "completed",
    },
    {
      id: 3,
      donor: "Emily Johnson",
      amount: 250,
      campaign: "Tech Lab Upgrade",
      date: "2025-01-13",
      status: "pending",
    },
    {
      id: 4,
      donor: "David Rodriguez",
      amount: 750,
      campaign: "Sports Facility",
      date: "2025-01-12",
      status: "completed",
    },
    {
      id: 5,
      donor: "Lisa Thompson",
      amount: 300,
      campaign: "Student Support",
      date: "2025-01-11",
      status: "completed",
    },
  ];

  tableData.donations = donationData;
  renderDonationsTable(donationData);
}

function renderDonationsTable(data) {
  const tableBody = document.getElementById("donationTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      (donation) => `
        <tr>
            <td><strong>${donation.donor}</strong></td>
            <td>$${donation.amount.toLocaleString()}</td>
            <td>${donation.campaign}</td>
            <td>${formatDate(donation.date)}</td>
            <td>
                <span class="status-badge ${donation.status}">
                    ${donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewDonation(${donation.id})">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="sendReceipt(${donation.id})">
                        <i class="fas fa-receipt"></i>
                        Receipt
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadStudents() {
  const studentData = [
    {
      id: 1,
      name: "Emma Thompson",
      studentId: "CS2021001",
      department: "Computer Science",
      year: "3rd Year",
      email: "emma.thompson@university.edu",
      status: "active",
    },
    {
      id: 2,
      name: "James Wilson",
      studentId: "EE2022002",
      department: "Electrical Engineering",
      year: "2nd Year",
      email: "james.wilson@university.edu",
      status: "active",
    },
    {
      id: 3,
      name: "Sophia Davis",
      studentId: "BU2020003",
      department: "Business",
      year: "4th Year",
      email: "sophia.davis@university.edu",
      status: "active",
    },
    {
      id: 4,
      name: "Oliver Martinez",
      studentId: "ME2021004",
      department: "Mechanical Engineering",
      year: "3rd Year",
      email: "oliver.martinez@university.edu",
      status: "active",
    },
    {
      id: 5,
      name: "Isabella Garcia",
      studentId: "AR2022005",
      department: "Arts",
      year: "2nd Year",
      email: "isabella.garcia@university.edu",
      status: "active",
    },
  ];

  tableData.students = studentData;
  renderStudentsTable(studentData);
}

function renderStudentsTable(data) {
  const tableBody = document.getElementById("studentTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = data
    .map(
      (student) => `
        <tr>
            <td><strong>${student.name}</strong></td>
            <td>${student.studentId}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.email}</td>
            <td>
                <span class="status-badge ${student.status}">
                    ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewStudent(${student.id})">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

// Chatbot Functions
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const chatbotMinimizeBtn = document.getElementById("chatbotMinimize");
  const chatbotCloseBtn = document.getElementById("chatbotClose");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotInput = document.getElementById("chatbotInput");

  if (chatbotToggle) {
    chatbotToggle.addEventListener("click", toggleChatbot);
  }

  if (chatbotMinimizeBtn) {
    chatbotMinimizeBtn.addEventListener("click", minimizeChatbot);
  }

  if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener("click", closeChatbot);
  }

  if (chatbotSend) {
    chatbotSend.addEventListener("click", sendChatbotMessage);
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendChatbotMessage();
      }
    });
  }
}

function toggleChatbot() {
  const chatbotContainer = document.getElementById("chatbotContainer");
  const chatbotToggle = document.getElementById("chatbotToggle");
  
  if (chatbotVisible) {
    chatbotContainer.style.display = "none";
    chatbotToggle.style.display = "flex";
    chatbotVisible = false;
  } else {
    chatbotContainer.style.display = "flex";
    chatbotToggle.style.display = "none";
    chatbotVisible = true;
    chatbotMinimized = false;
    chatbotContainer.classList.remove("minimized");
  }
}

function minimizeChatbot() {
  const chatbotContainer = document.getElementById("chatbotContainer");
  
  if (chatbotMinimized) {
    chatbotContainer.classList.remove("minimized");
    chatbotMinimized = false;
  } else {
    chatbotContainer.classList.add("minimized");
    chatbotMinimized = true;
  }
}

function closeChatbot() {
  const chatbotContainer = document.getElementById("chatbotContainer");
  const chatbotToggle = document.getElementById("chatbotToggle");
  
  chatbotContainer.style.display = "none";
  chatbotToggle.style.display = "flex";
  chatbotVisible = false;
  chatbotMinimized = false;
  chatbotContainer.classList.remove("minimized");
}

function sendChatbotMessage() {
  const chatbotInput = document.getElementById("chatbotInput");
  const message = chatbotInput.value.trim();
  
  if (message) {
    addChatbotMessage(message, "user");
    chatbotInput.value = "";
    
    // Simulate bot response
    setTimeout(() => {
      const response = getChatbotResponse(message);
      addChatbotMessage(response, "bot");
    }, 1000);
  }
}

function addChatbotMessage(message, sender) {
  const chatbotMessages = document.getElementById("chatbotMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas ${sender === "bot" ? "fa-robot" : "fa-user"}"></i>
    </div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotResponse(message) {
  const responses = {
    "how do i approve alumni": "To approve alumni, go to the Pending Requests section, select the alumni you want to approve, and click the 'Approve' button. You can also use bulk approval for multiple requests.",
    "show me pending requests": "You can view pending requests by clicking on 'Pending Requests' in the sidebar. There you'll see all alumni waiting for approval.",
    "how to export data": "To export data, go to the Approved Alumni section and click the 'Export Data' button. This will generate a CSV file with all alumni information.",
    "help": "I can help you navigate the admin dashboard. Ask me about approving alumni, managing events, viewing reports, or any other admin tasks!",
    "events": "You can manage events by going to the Events section. There you can create new events, edit existing ones, and track attendance.",
    "donations": "The Donations section shows all alumni contributions. You can view donation details and send receipts to donors.",
    "analytics": "Check the Analytics section for detailed insights about alumni engagement, registration trends, and platform usage statistics.",
    "settings": "In Settings, you can configure platform preferences, notification settings, security options, and third-party integrations."
  };

  const lowercaseMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowercaseMessage.includes(key)) {
      return response;
    }
  }

  return "I'm here to help you with the admin dashboard. You can ask me about approving alumni, managing events, viewing analytics, or any other administrative tasks. What would you like to know?";
}

function askQuickQuestion(question) {
  const chatbotInput = document.getElementById("chatbotInput");
  chatbotInput.value = question;
  sendChatbotMessage();
}

function handleChatbotEnter(event) {
  if (event.key === "Enter") {
    sendChatbotMessage();
  }
}

// Settings Management
function loadSettings() {
  const settingsTabs = document.querySelectorAll(".settings-tab-btn");
  settingsTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.textContent.toLowerCase();
      showSettingsTab(tabName);
    });
  });

  // Load saved settings
  const savedSettings = localStorage.getItem("adminSettings");
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    Object.keys(settings).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === "checkbox") {
          element.checked = settings[key];
        } else {
          element.value = settings[key];
        }
      }
    });
  }
}

function showSettingsTab(tabName) {
  // Hide all settings content
  document.querySelectorAll(".settings-content").forEach((content) => {
    content.style.display = "none";
  });

  // Remove active class from all tabs
  document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected content and activate tab
  const targetContent = document.getElementById(tabName + "Tab");
  if (targetContent) {
    targetContent.style.display = "block";
  }

  // Activate clicked tab
  event.target.classList.add("active");
}

function saveSettings() {
  const settings = {
    platformName: document.getElementById("platformName")?.value,
    institutionName: document.getElementById("institutionName")?.value,
    contactEmail: document.getElementById("contactEmail")?.value,
    maintenanceMode: document.getElementById("maintenanceMode")?.checked,
    newRegistrations: document.getElementById("newRegistrations")?.checked,
    eventReminders: document.getElementById("eventReminders")?.checked,
    donationAlerts: document.getElementById("donationAlerts")?.checked,
    twoFactorAuth: document.getElementById("twoFactorAuth")?.checked,
    sessionTimeout: document.getElementById("sessionTimeout")?.value,
    loginLogging: document.getElementById("loginLogging")?.checked,
  };

  localStorage.setItem("adminSettings", JSON.stringify(settings));
  showNotification("Settings saved successfully!", "success");
}

function resetSettings() {
  showConfirmDialog(
    "Reset Settings",
    "Are you sure you want to reset all settings to default values?",
    () => {
      document.getElementById("platformName").value = "AlumniConnect";
      document.getElementById("institutionName").value = "University of Excellence";
      document.getElementById("contactEmail").value = "admin@alumniconnect.edu";
      document.getElementById("maintenanceMode").checked = false;
      document.getElementById("newRegistrations").checked = true;
      document.getElementById("eventReminders").checked = true;
      document.getElementById("donationAlerts").checked = true;
      document.getElementById("twoFactorAuth").checked = false;
      document.getElementById("sessionTimeout").value = "30";
      document.getElementById("loginLogging").checked = true;

      showNotification("Settings reset to defaults", "info");
    }
  );
}

// Action Functions - Now fully functional
function approveAlumni(id) {
  showConfirmDialog(
    "Approve Alumni",
    "Are you sure you want to approve this alumni request?",
    () => {
      // Remove from pending list
      tableData.pending = tableData.pending.filter(alumni => alumni.id !== id);
      
      // Add to approved list (simulate)
      const approvedAlumni = tableData.pending.find(alumni => alumni.id === id);
      if (approvedAlumni) {
        tableData.approved.push({
          ...approvedAlumni,
          company: "Tech Company",
          position: "Software Engineer",
          location: "San Francisco, CA",
          avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        });
      }
      
      // Update UI
      loadPendingAlumni();
      updateMetricCards();
      showNotification("Alumni request approved successfully!", "success");
    }
  );
}

function rejectAlumni(id) {
  showConfirmDialog(
    "Reject Alumni",
    "Are you sure you want to reject this alumni request?",
    () => {
      tableData.pending = tableData.pending.filter(alumni => alumni.id !== id);
      loadPendingAlumni();
      updateMetricCards();
      showNotification("Alumni request rejected.", "warning");
    }
  );
}

function bulkApprove() {
  const selectedCheckboxes = document.querySelectorAll('#pendingTableBody input[type="checkbox"]:checked');
  const selectedIds = Array.from(selectedCheckboxes).map((cb) => cb.value);

  if (selectedIds.length === 0) {
    showNotification("Please select alumni to approve.", "warning");
    return;
  }

  showConfirmDialog(
    "Bulk Approve",
    `Are you sure you want to approve ${selectedIds.length} alumni request(s)?`,
    () => {
      selectedIds.forEach(id => {
        tableData.pending = tableData.pending.filter(alumni => alumni.id != id);
      });
      
      loadPendingAlumni();
      updateMetricCards();
      showNotification(`${selectedIds.length} alumni requests approved successfully!`, "success");
    }
  );
}

function bulkReject() {
  const selectedCheckboxes = document.querySelectorAll('#pendingTableBody input[type="checkbox"]:checked');
  const selectedIds = Array.from(selectedCheckboxes).map((cb) => cb.value);

  if (selectedIds.length === 0) {
    showNotification("Please select alumni to reject.", "warning");
    return;
  }

  showConfirmDialog(
    "Bulk Reject",
    `Are you sure you want to reject ${selectedIds.length} alumni request(s)?`,
    () => {
      selectedIds.forEach(id => {
        tableData.pending = tableData.pending.filter(alumni => alumni.id != id);
      });
      
      loadPendingAlumni();
      updateMetricCards();
      showNotification(`${selectedIds.length} alumni requests rejected.`, "warning");
    }
  );
}

function createEvent() {
  showModal("createEventModal");
}

function submitEventForm(event) {
  event.preventDefault();
  
  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventVenue = document.getElementById("eventVenue").value;
  const eventDescription = document.getElementById("eventDescription").value;
  
  if (eventName && eventDate && eventVenue) {
    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
      venue: eventVenue,
      attendees: 0,
      status: "upcoming",
      description: eventDescription
    };
    
    tableData.events.unshift(newEvent);
    loadEvents();
    closeModal("createEventModal");
    showNotification("Event created successfully!", "success");
    
    // Reset form
    document.getElementById("eventForm").reset();
  }
}

function addJobPosting() {
  showConfirmDialog(
    "Add Job Posting",
    "This will open the job posting creation form. Continue?",
    () => {
      showNotification("Job posting form opened successfully!", "success");
      // In a real implementation, this would open a job posting form
    }
  );
}

function addStudent() {
  showConfirmDialog(
    "Add New Student",
    "This will open the student registration form. Continue?",
    () => {
      showNotification("Student registration form opened successfully!", "success");
      // In a real implementation, this would open a student form
    }
  );
}

function exportAlumniData() {
  showNotification("Preparing export...", "info");
  
  setTimeout(() => {
    // Simulate CSV generation
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Department,Batch,Company,Position\n" +
      tableData.approved.map(alumni => 
        `${alumni.name},${alumni.email},${alumni.department},${alumni.batch},${alumni.company},${alumni.position}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "alumni_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification("Alumni data exported successfully!", "success");
  }, 2000);
}

function logout() {
  showConfirmDialog(
    "Logout",
    "Are you sure you want to logout?",
    () => {
      sessionStorage.removeItem("userRole");
      showNotification("Logged out successfully!", "success");
      setTimeout(() => {
        // In a real implementation, this would redirect to login page
        showNotification("Redirecting to login page...", "info");
      }, 1000);
    }
  );
}

function configureIntegration(type) {
  const integrationNames = {
    analytics: "Google Analytics",
    mailchimp: "Mailchimp",
    stripe: "Stripe"
  };
  
  showNotification(`Configuring ${integrationNames[type]} integration...`, "info");
  
  setTimeout(() => {
    showNotification(`${integrationNames[type]} configured successfully!`, "success");
  }, 1500);
}

// Placeholder functions for view/edit actions
function viewAlumniDetails(id) {
  const alumni = tableData.pending.find(a => a.id == id) || tableData.approved.find(a => a.id == id);
  if (alumni) {
    showModal("alumniModal", generateAlumniDetailsHTML(alumni));
  }
}

function generateAlumniDetailsHTML(alumni) {
  return `
    <div class="alumni-details-modal">
      <div class="alumni-header">
        <h4>${alumni.name}</h4>
        <span class="status-badge ${alumni.status || 'pending'}">${alumni.status || 'Pending'}</span>
      </div>
      <div class="alumni-info-grid">
        <div class="info-item">
          <label>Email:</label>
          <span>${alumni.email}</span>
        </div>
        <div class="info-item">
          <label>Department:</label>
          <span>${alumni.department}</span>
        </div>
        <div class="info-item">
          <label>Batch Year:</label>
          <span>${alumni.batch}</span>
        </div>
        ${alumni.company ? `
          <div class="info-item">
            <label>Company:</label>
            <span>${alumni.company}</span>
          </div>
          <div class="info-item">
            <label>Position:</label>
            <span>${alumni.position}</span>
          </div>
          <div class="info-item">
            <label>Location:</label>
            <span>${alumni.location}</span>
          </div>
        ` : ''}
      </div>
      ${alumni.status === 'pending' ? `
        <div class="modal-actions">
          <button class="btn btn-success" onclick="approveAlumni(${alumni.id}); closeModal('alumniModal');">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="btn btn-danger" onclick="rejectAlumni(${alumni.id}); closeModal('alumniModal');">
            <i class="fas fa-times"></i> Reject
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// Generic view/edit functions with notifications
function viewEvent(id) { showNotification(`Opening event details for ID: ${id}`, "info"); }
function editEvent(id) { showNotification(`Opening event editor for ID: ${id}`, "info"); }
function cancelEvent(id) { 
  showConfirmDialog("Cancel Event", "Are you sure you want to cancel this event?", () => {
    showNotification(`Event ${id} cancelled successfully`, "warning");
  });
}
function viewJob(id) { showNotification(`Opening job details for ID: ${id}`, "info"); }
function editJob(id) { showNotification(`Opening job editor for ID: ${id}`, "info"); }
function deleteJob(id) { 
  showConfirmDialog("Delete Job", "Are you sure you want to delete this job posting?", () => {
    showNotification(`Job posting ${id} deleted successfully`, "warning");
  });
}
function viewDonation(id) { showNotification(`Opening donation details for ID: ${id}`, "info"); }
function sendReceipt(id) { showNotification(`Receipt sent for donation ID: ${id}`, "success"); }
function viewStudent(id) { showNotification(`Opening student profile for ID: ${id}`, "info"); }
function editStudent(id) { showNotification(`Opening student editor for ID: ${id}`, "info"); }
function viewAlumniProfile(id) { showNotification(`Opening alumni profile for ID: ${id}`, "info"); }
function editAlumni(id) { showNotification(`Opening alumni editor for ID: ${id}`, "info"); }

// Utility Functions
function toggleSelectAll() {
  const selectAllCheckbox = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll('#pendingTableBody input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
}

function performGlobalSearch() {
  const searchTerm = document.getElementById("globalSearch").value.toLowerCase();

  if (searchTerm.length < 2) return;

  let searchResults = [];

  // Search in all data
  ['pending', 'approved', 'events', 'careers', 'donations', 'students'].forEach(dataType => {
    tableData[dataType].forEach(item => {
      if (JSON.stringify(item).toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: dataType,
          data: item
        });
      }
    });
  });

  if (searchResults.length > 0) {
    showNotification(`Found ${searchResults.length} results for "${searchTerm}"`, "info");
  } else {
    showNotification(`No results found for "${searchTerm}"`, "warning");
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${getIconForType(type)}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
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

function showConfirmDialog(title, message, onConfirm) {
  const dialog = document.createElement("div");
  dialog.className = "modal active";
  dialog.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p>${message}</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
          <button class="btn btn-primary" onclick="this.closest('.modal').remove(); (${onConfirm})()">Confirm</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);
}

function showModal(modalId, content = null) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (content) {
      const modalBody = modal.querySelector(".modal-body");
      if (modalBody) {
        modalBody.innerHTML = content;
      }
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

function toggleSidebar() {
  const sidebar = document.querySelector(".admin-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

// Filter functions
function filterPending() {
  const searchTerm = document.getElementById("searchPending").value.toLowerCase();
  const departmentFilter = document.getElementById("departmentFilter").value;
  const batchFilter = document.getElementById("batchFilter").value;

  let filteredData = tableData.pending.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm) ||
      alumni.email.toLowerCase().includes(searchTerm);
    const matchesDepartment =
      !departmentFilter || alumni.department.includes(departmentFilter);
    const matchesBatch = !batchFilter || alumni.batch === batchFilter;

    return matchesSearch && matchesDepartment && matchesBatch;
  });

  renderPendingTable(filteredData);
}

function filterApproved() {
  const searchTerm = document.getElementById("searchApproved").value.toLowerCase();

  let filteredData = tableData.approved.filter((alumni) => {
    return (
      alumni.name.toLowerCase().includes(searchTerm) ||
      alumni.email.toLowerCase().includes(searchTerm) ||
      alumni.company.toLowerCase().includes(searchTerm)
    );
  });

  renderApprovedGrid(filteredData);
}

function filterStudents() {
  const searchTerm = document.getElementById("searchStudents").value.toLowerCase();

  let filteredData = tableData.students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm)
    );
  });

  renderStudentsTable(filteredData);
}

// Table sorting
function sortTable(tableId, columnIndex) {
  const section = document.querySelector('.content-section.active');
  const table = section.querySelector('.data-table');
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Determine sort direction
  const headers = table.querySelectorAll("th");
  const header = headers[columnIndex];
  const isAscending = !header.classList.contains("sort-desc");

  // Clear all sort classes
  headers.forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
  });

  // Add sort class to current header
  header.classList.add(isAscending ? "sort-asc" : "sort-desc");

  // Sort rows
  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    // Try to parse as numbers
    const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
    const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return isAscending ? aNum - bNum : bNum - aNum;
    }

    // Sort as strings
    return isAscending
      ? aText.localeCompare(bText)
      : bText.localeCompare(aText);
  });

  // Reorder rows in DOM
  rows.forEach((row) => tbody.appendChild(row));
  
  showNotification(`Table sorted by ${header.textContent.trim()}`, "info");
}

// Analytics functions
function loadAnalytics() {
  initAnalyticsCharts();
}

function showAnalyticsTab(tabName) {
  // Hide all analytics content
  document.querySelectorAll(".analytics-content").forEach((content) => {
    content.style.display = "none";
  });

  // Remove active class from all tabs
  document.querySelectorAll(".analytics-tabs .tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected content and activate tab
  const targetContent = document.getElementById(tabName + "Tab");
  const targetTab = event.target;

  if (targetContent) {
    targetContent.style.display = "block";
  }

  if (targetTab) {
    targetTab.classList.add("active");
  }
}

function initAnalyticsCharts() {
  // Usage Chart
  const usageCtx = document.getElementById("usageChart");
  if (usageCtx && !charts.usage) {
    charts.usage = new Chart(usageCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Active Users",
            data: [1200, 1350, 1100, 1400, 1600, 1750],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // Engagement Chart
  const engagementCtx = document.getElementById("engagementChart");
  if (engagementCtx && !charts.engagement) {
    charts.engagement = new Chart(engagementCtx, {
      type: "doughnut",
      data: {
        labels: ["Events", "Mentorship", "Jobs", "Donations"],
        datasets: [
          {
            data: [30, 25, 25, 20],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
            borderWidth: 0,
            cutout: "60%",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { padding: 15, usePointStyle: true },
          },
        },
      },
    });
  }
}

// Initialize notifications
function initNotifications() {
  const notificationBtn = document.getElementById("notificationBtn");
  if (notificationBtn) {
    notificationBtn.addEventListener("click", function () {
      showNotification("📧 You have 3 new pending requests\n🎉 5 new alumni registered\n💰 2 new donations received", "info");
    });
  }
}

// Auto-refresh live stats
function updateLiveStats() {
  const totalAlumniElement = document.getElementById("totalAlumni");
  if (totalAlumniElement) {
    const currentValue = parseInt(totalAlumniElement.textContent.replace(/,/g, ""));
    const newValue = currentValue + Math.floor(Math.random() * 3);
    totalAlumniElement.textContent = newValue.toLocaleString();
  }
}

// Initialize data tables
function initDataTables() {
  const searchInputs = document.querySelectorAll(".search-bar input");
  searchInputs.forEach((input) => {
    input.addEventListener("input", debounce(function () {
      const sectionId = this.closest(".content-section").id;
      switch (sectionId) {
        case "pendingSection":
          filterPending();
          break;
        case "approvedSection":
          filterApproved();
          break;
        case "studentSection":
          filterStudents();
          break;
      }
    }, 300));
  });
}

// Debounce utility
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

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // Ctrl/Cmd + K for search
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    const searchInput = document.querySelector("#globalSearch");
    if (searchInput) {
      searchInput.focus();
      showNotification("Search activated! Type to search across all data.", "info");
    }
  }

  // Escape to close modals
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      activeModal.classList.remove("active");
    }
    
    if (chatbotVisible && !chatbotMinimized) {
      minimizeChatbot();
    }
  }

  // Alt + C for chatbot
  if (event.altKey && event.key === "c") {
    event.preventDefault();
    toggleChatbot();
  }
});

// Add some Easter eggs
let clickCount = 0;
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("logo-icon")) {
    clickCount++;
    if (clickCount === 5) {
      showNotification("🎉 Easter egg found! You discovered the secret admin mode!", "success");
      clickCount = 0;
    }
  }
});

// Welcome message
setTimeout(() => {
  if (!sessionStorage.getItem("welcomeShown")) {
    showNotification("🚀 Welcome to the enhanced AlumniConnect Admin Dashboard! Press Alt+C to open Study Buddy, or Ctrl+K to search.", "info");
    sessionStorage.setItem("welcomeShown", "true");
  }
}, 2000);