// Student Dashboard JavaScript - Complete Fixed Implementation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Global variables
let currentSection = 'dashboard';
let sidebarOpen = false;
let chatbotOpen = true;
let currentUser = {
    name: 'Mari sudhan J',
    year: '2nd Year',
    department: 'ECE',
    id: 'CS2021001',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
};

// Initialize Application
function initializeApp() {
    console.log('Initializing Student Dashboard...');
    
    initializeSidebar();
    initializeChatbot();
    initializeEventListeners();
    loadDashboardData();
    animateCounters();
    loadAllSectionData();
    
    // Show welcome animation
    showWelcomeAnimation();
    
    console.log('Student Dashboard initialized successfully!');
}

function showWelcomeAnimation() {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.style.opacity = '0';
        pageTitle.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            pageTitle.style.transition = 'all 0.5s ease-out';
            pageTitle.style.opacity = '1';
            pageTitle.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Sidebar Management
function initializeSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section from data attribute
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('sidebarToggle');
    
    if (!sidebar) return;
    
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('open', sidebarOpen);
    
    // Add animation to button
    if (button) {
        button.style.transform = sidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    }
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function showSection(sectionId) {
    // Hide all sections with fade out animation
    document.querySelectorAll('.content-section').forEach(section => {
        if (section.classList.contains('active')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                section.classList.remove('active');
                section.style.opacity = '';
                section.style.transform = '';
            }, 150);
        }
    });

    // Show selected section with fade in animation
    setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                targetSection.style.transition = 'all 0.3s ease-out';
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50);
            
            currentSection = sectionId;
            updatePageTitle(sectionId);
            loadSectionData(sectionId);
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 1024 && sidebarOpen) {
                toggleSidebar();
            }
        }
    }, 150);
}

function updatePageTitle(sectionId) {
    const titles = {
        dashboard: { title: 'Student Dashboard', subtitle: 'Welcome back' },
        alumni: { title: 'Alumni Directory', subtitle: 'Connect with experienced alumni' },
        mentorship: { title: 'Find Mentors', subtitle: 'Get guidance from industry experts' },
        events: { title: 'Alumni Events', subtitle: 'Discover networking opportunities' },
        career: { title: 'Career Opportunities', subtitle: 'Explore job openings and internships' },
        resources: { title: 'Learning Resources', subtitle: 'Access tools and materials' },
        profile: { title: 'My Profile', subtitle: 'Manage your information' }
    };

    const pageData = titles[sectionId] || titles.dashboard;
    
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');

    if (pageTitle && pageSubtitle) {
        // Animate title change
        pageTitle.style.transform = 'translateX(-20px)';
        pageTitle.style.opacity = '0';
        
        setTimeout(() => {
            pageTitle.textContent = pageData.title;
            pageSubtitle.textContent = pageData.subtitle;
            
            pageTitle.style.transition = 'all 0.3s ease-out';
            pageTitle.style.transform = 'translateX(0)';
            pageTitle.style.opacity = '1';
        }, 150);
    }
}

// Data Loading Functions
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'alumni':
            loadAlumniDirectory();
            break;
        case 'mentorship':
            loadMentorshipData();
            break;
        case 'events':
            loadEventsData();
            break;
        case 'career':
            loadCareersData();
            break;
        case 'resources':
            loadResourcesData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

function loadAllSectionData() {
    // Pre-load all section data for smooth transitions
    loadAlumniDirectory();
    loadMentorshipData();
    loadEventsData();
    loadCareersData();
}

function loadDashboardData() {
    loadActivityFeed();
    loadUpcomingSessions();
    animateCounters();
}

function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;

    const activities = [
        {
            icon: 'fas fa-user-plus',
            title: '<strong>John Smith</strong> accepted your mentorship request',
            time: '2 hours ago',
            type: 'success'
        },
        {
            icon: 'fas fa-calendar-check',
            title: 'Registered for <strong>Tech Career Fair 2025</strong>',
            time: '1 day ago',
            type: 'info'
        },
        {
            icon: 'fas fa-briefcase',
            title: 'Applied to <strong>Software Engineering Intern</strong> at TechCorp',
            time: '2 days ago',
            type: 'primary'
        },
        {
            icon: 'fas fa-star',
            title: 'Received 5-star rating from mentor <strong>Sarah Wilson</strong>',
            time: '3 days ago',
            type: 'success'
        },
        {
            icon: 'fas fa-book',
            title: 'Completed <strong>JavaScript Advanced</strong> course',
            time: '5 days ago',
            type: 'achievement'
        }
    ];

    let html = '';
    activities.forEach((activity, index) => {
        html += `
            <div class="activity-item" style="animation-delay: ${index * 0.1}s">
                <div class="activity-icon ${activity.type}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.title}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `;
    });

    activityFeed.innerHTML = html;
}

function loadUpcomingSessions() {
    const sessionsList = document.getElementById('sessionsList');
    if (!sessionsList) return;

    const sessions = [
        {
            title: 'Career Guidance Session',
            mentor: 'mari',
            time: 'Today, 3:00 PM',
            type: 'upcoming',
            id: 1
        },
        {
            title: 'Technical Interview Prep',
            mentor: 'mani',
            time: 'Tomorrow, 2:00 PM',
            type: 'scheduled',
            id: 2
        },
        {
            title: 'Resume Review',
            mentor: 'manju',
            time: 'Friday, 4:00 PM',
            type: 'scheduled',
            id: 3
        }
    ];

    let html = '';
    sessions.forEach((session, index) => {
        html += `
            <div class="session-item" style="animation-delay: ${index * 0.1}s">
                <div class="session-info">
                    <h4>${session.title}</h4>
                    <p>with ${session.mentor}</p>
                    <span class="session-time">
                        <i class="fas fa-clock"></i>
                        ${session.time}
                    </span>
                </div>
                <button class="btn ${session.type === 'upcoming' ? 'btn-primary' : 'btn-secondary'} btn-sm" 
                        onclick="${session.type === 'upcoming' ? `joinSession(${session.id})` : `rescheduleSession(${session.id})`}">
                    <i class="fas ${session.type === 'upcoming' ? 'fa-video' : 'fa-calendar-alt'}"></i>
                    ${session.type === 'upcoming' ? 'Join' : 'Reschedule'}
                </button>
            </div>
        `;
    });

    sessionsList.innerHTML = html;
}

function animateCounters() {
    const counters = document.querySelectorAll('.card-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
                
                // Add bounce effect when done
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, duration / 50);
    });
}

function loadAlumniDirectory() {
    const alumniGrid = document.getElementById('alumniGrid');
    if (!alumniGrid) return;

    const alumni = [
        {
            id: 1,
            name: 'Jegadeesh',
            title: 'Senior Software Engineer',
            company: 'Google',
            batch: '2018',
            department: 'ECE',
            location: 'San Francisco, CA',
            avatar: 'jega.jpg',
            skills: ['JavaScript', 'Python', 'React', 'Machine Learning'],
            industry: 'technology',
            experience: '6-10',
            rating: 4.9,
            connections: 156
        },
        {
            id: 2,
            name: 'IRSHATH',
            title: 'Product Manager',
            company: 'Microsoft',
            batch: '2017',
            department: 'Engineering',
            location: 'Seattle, WA',
            avatar: 'irshath.jpg',
            skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile'],
            industry: 'technology',
            experience: '6-10',
            rating: 4.8,
            connections: 234
        },
        {
            id: 3,
            name: 'NANDHINI',
            title: 'Marketing Director',
            company: 'Amazon',
            batch: '2019',
            department: 'Business',
            location: 'New York, NY',
            avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            skills: ['Digital Marketing', 'Brand Strategy', 'Analytics', 'SEO'],
            industry: 'technology',
            experience: '3-5',
            rating: 4.7,
            connections: 189
        },
        {
            id: 4,
            name: 'NISHITHA',
            title: 'Data Scientist',
            company: 'Netflix',
            batch: '2020',
            department: 'Computer Science',
            location: 'Los Angeles, CA',
            avatar: 'nishitha.jpg',
            skills: ['Machine Learning', 'Python', 'Statistics', 'TensorFlow'],
            industry: 'technology',
            experience: '3-5',
            rating: 4.9,
            connections: 167
        },
        {
            id: 5,
            name: 'NESHIKA',
            title: 'UX Designer',
            company: 'Adobe',
            batch: '2019',
            department: 'Design',
            location: 'San Diego, CA',
            avatar: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
            industry: 'technology',
            experience: '3-5',
            rating: 4.8,
            connections: 145
        },
        {
            id: 6,
            name: 'RABAS ALBER',
            title: 'Financial Analyst',
            company: 'Goldman Sachs',
            batch: '2018',
            department: 'Finance',
            location: 'New York, NY',
            avatar: 'https://images.pexels.com/photos/1181719/pexels-photo-1181719.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            skills: ['Financial Modeling', 'Excel', 'Risk Analysis', 'Bloomberg'],
            industry: 'finance',
            experience: '6-10',
            rating: 4.6,
            connections: 198
        }
    ];

    renderAlumniGrid(alumni);
}

function renderAlumniGrid(alumni) {
    const alumniGrid = document.getElementById('alumniGrid');
    if (!alumniGrid) return;

    let html = '';
    alumni.forEach((alum, index) => {
        html += `
            <div class="alumni-card" onclick="viewAlumniProfile(${alum.id})" style="animation-delay: ${index * 0.1}s">
                <div class="alumni-header">
                    <div class="alumni-avatar">
                        <img src="${alum.avatar}" alt="${alum.name}" loading="lazy">
                    </div>
                    <div class="alumni-info">
                        <h4>${alum.name}</h4>
                        <p>${alum.title}</p>
                        <span class="company">${alum.company}</span>
                    </div>
                </div>
                <div class="alumni-details">
                    <div class="detail-row">
                        <span class="detail-label">Batch:</span>
                        <span class="detail-value">${alum.batch}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Department:</span>
                        <span class="detail-value">${alum.department}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${alum.location}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Rating:</span>
                        <span class="detail-value">${alum.rating} ⭐</span>
                    </div>
                </div>
                <div class="alumni-skills">
                    ${alum.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="alumni-actions">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); connectWithAlumni(${alum.id})">
                        <i class="fas fa-user-plus"></i>
                        Connect
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); messageAlumni(${alum.id})">
                        <i class="fas fa-envelope"></i>
                        Message
                    </button>
                </div>
            </div>
        `;
    });

    alumniGrid.innerHTML = html;
}

function loadMentorshipData() {
    loadAvailableMentors();
    loadMyMentors();
}

function loadAvailableMentors() {
    const mentorsGrid = document.getElementById('mentorsGrid');
    if (!mentorsGrid) return;

    const mentors = [
        {
            id: 1,
            name: 'Jegadeesh',
            title: 'Senior Software Engineer',
            company: 'Google',
            expertise: ['Software Engineering', 'Career Development', 'Technical Interviews'],
            rating: 4.9,
            sessions: 45,
            avatar: 'jega.jpg',
            price: 'Free',
            responseTime: '< 2 hours',
            languages: ['English', 'Spanish']
        },
        {
            id: 2,
            name: 'IRSHATH',
            title: 'Product Manager',
            company: 'Microsoft',
            expertise: ['Product Management', 'Leadership', 'Strategy'],
            rating: 4.8,
            sessions: 32,
            avatar: 'irshath.jpg',
            price: 'Free',
            responseTime: '< 4 hours',
            languages: ['English', 'Mandarin']
        },
        {
            id: 3,
            name: 'Nandhini',
            title: 'Marketing Director',
            company: 'Amazon',
            expertise: ['Marketing', 'Brand Strategy', 'Digital Marketing'],
            rating: 4.7,
            sessions: 28,
            avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            price: 'Free',
            responseTime: '< 6 hours',
            languages: ['English', 'Spanish']
        },
        {
            id: 4,
            name: 'Nishitha',
            title: 'Data Scientist',
            company: 'Netflix',
            expertise: ['Data Science', 'Machine Learning', 'Statistics'],
            rating: 4.9,
            sessions: 41,
            avatar: 'nishitha.jpg',
            price: 'Free',
            responseTime: '< 3 hours',
            languages: ['English']
        }
    ];

    let html = '';
    mentors.forEach((mentor, index) => {
        html += `
            <div class="mentor-card" onclick="viewMentorProfile(${mentor.id})" style="animation-delay: ${index * 0.1}s">
                <div class="mentor-header">
                    <div class="mentor-avatar">
                        <img src="${mentor.avatar}" alt="${mentor.name}" loading="lazy">
                    </div>
                    <div class="mentor-info">
                        <h4>${mentor.name}</h4>
                        <p>${mentor.title}</p>
                        <span class="mentor-company">${mentor.company}</span>
                    </div>
                </div>
                <div class="mentor-expertise">
                    <strong>Expertise:</strong>
                    <div class="expertise-tags">
                        ${mentor.expertise.map(skill => `<span class="expertise-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="mentor-stats">
                    <div class="mentor-stat">
                        <span class="stat-value">${mentor.rating}</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="mentor-stat">
                        <span class="stat-value">${mentor.sessions}</span>
                        <span class="stat-label">Sessions</span>
                    </div>
                    <div class="mentor-stat">
                        <span class="stat-value">${mentor.responseTime}</span>
                        <span class="stat-label">Response</span>
                    </div>
                </div>
                <div class="mentor-actions">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); requestMentorship(${mentor.id})">
                        <i class="fas fa-handshake"></i>
                        Request Mentorship
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); messageMentor(${mentor.id})">
                        <i class="fas fa-envelope"></i>
                        Message
                    </button>
                </div>
            </div>
        `;
    });

    mentorsGrid.innerHTML = html;
}

function loadMyMentors() {
    const myMentorsList = document.getElementById('myMentorsList');
    if (!myMentorsList) return;

    const myMentors = [
        {
            id: 1,
            name: 'Nithiyakumar',
            title: 'Senior Developer',
            company: 'TechCorp',
            nextSession: '2025-01-20 15:00',
            avatar: '',
            totalSessions: 8,
            rating: 4.9
        },
        {
            id: 2,
            name: 'Maniii',
            title: 'UX Designer',
            company: 'DesignCo',
            nextSession: '2025-01-22 14:00',
            avatar: '',
            totalSessions: 5,
            rating: 4.8
        }
    ];

    let html = '';
    myMentors.forEach((mentor, index) => {
        html += `
            <div class="mentor-card" style="animation-delay: ${index * 0.1}s">
                <div class="mentor-header">
                    <div class="mentor-avatar">
                        <img src="${mentor.avatar}" alt="${mentor.name}" loading="lazy">
                    </div>
                    <div class="mentor-info">
                        <h4>${mentor.name}</h4>
                        <p>${mentor.title} at ${mentor.company}</p>
                        <div class="mentor-stats">
                            <span class="stat-item">${mentor.totalSessions} sessions</span>
                            <span class="stat-item">${mentor.rating} ⭐</span>
                        </div>
                    </div>
                </div>
                <div class="next-session">
                    <strong>Next Session:</strong>
                    <span>${formatDateTime(mentor.nextSession)}</span>
                </div>
                <div class="mentor-actions">
                    <button class="btn btn-primary btn-sm" onclick="joinSession(${mentor.id})">
                        <i class="fas fa-video"></i>
                        Join Session
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="messageMentor(${mentor.id})">
                        <i class="fas fa-envelope"></i>
                        Message
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="scheduleMeeting(${mentor.id})">
                        <i class="fas fa-calendar"></i>
                        Schedule
                    </button>
                </div>
            </div>
        `;
    });

    myMentorsList.innerHTML = html;
}

function loadEventsData() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    const events = [
        {
            id: 1,
            title: 'Tech Career Fair 2025',
            date: '2025-02-20',
            time: '10:00 AM - 6:00 PM',
            location: 'Convention Center, Downtown',
            type: 'career-fair',
            attendees: 200,
            maxAttendees: 500,
            image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Connect with top tech companies and explore career opportunities. Network with industry leaders and learn about the latest trends.',
            organizer: 'Alumni Association',
            tags: ['Networking', 'Career', 'Technology'],
            price: 'Free'
        },
        {
            id: 2,
            title: 'Alumni Networking Night',
            date: '2025-01-30',
            time: '6:00 PM - 9:00 PM',
            location: 'University Campus - Alumni Hall',
            type: 'networking',
            attendees: 150,
            maxAttendees: 200,
            image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Meet and network with alumni from various industries. Enjoy cocktails, appetizers, and meaningful conversations.',
            organizer: 'Alumni Network',
            tags: ['Networking', 'Social', 'Alumni'],
            price: '$25'
        },
        {
            id: 3,
            title: 'AI & Machine Learning Workshop',
            date: '2025-01-25',
            time: '2:00 PM - 5:00 PM',
            location: 'Online (Zoom)',
            type: 'workshop',
            attendees: 300,
            maxAttendees: 500,
            image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Learn about the latest trends in artificial intelligence and machine learning. Hands-on coding sessions included.',
            organizer: 'Tech Alumni Group',
            tags: ['Workshop', 'AI', 'Technology'],
            price: 'Free'
        },
        {
            id: 4,
            title: 'Startup Pitch Competition',
            date: '2025-02-15',
            time: '1:00 PM - 8:00 PM',
            location: 'Innovation Hub, Silicon Valley',
            type: 'competition',
            attendees: 180,
            maxAttendees: 250,
            image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Watch innovative startups pitch their ideas to a panel of investors and industry experts.',
            organizer: 'Entrepreneurship Club',
            tags: ['Startup', 'Competition', 'Investment'],
            price: '$50'
        },
        {
            id: 5,
            title: 'Women in Tech Panel',
            date: '2025-02-08',
            time: '7:00 PM - 9:00 PM',
            location: 'Tech Hub, San Francisco',
            type: 'panel',
            attendees: 120,
            maxAttendees: 150,
            image: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Inspiring panel discussion with successful women leaders in technology sharing their experiences.',
            organizer: 'Women in Tech Alumni',
            tags: ['Panel', 'Women', 'Technology'],
            price: 'Free'
        },
        {
            id: 6,
            title: 'Finance Industry Insights',
            date: '2025-01-28',
            time: '6:30 PM - 8:30 PM',
            location: 'Financial District, NYC',
            type: 'seminar',
            attendees: 85,
            maxAttendees: 100,
            image: 'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
            description: 'Deep dive into current trends in the finance industry with expert analysis and Q&A session.',
            organizer: 'Finance Alumni Network',
            tags: ['Finance', 'Seminar', 'Industry'],
            price: '$30'
        }
    ];

    renderEventsGrid(events);
}

function renderEventsGrid(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    let html = '';
    events.forEach((event, index) => {
        const attendanceRate = Math.round((event.attendees / event.maxAttendees) * 100);
        
        html += `
            <div class="event-card" onclick="viewEventDetails(${event.id})" style="animation-delay: ${index * 0.1}s">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}" loading="lazy">
                    <div class="event-date-badge">
                        ${formatEventDate(event.date)}
                    </div>
                </div>
                <div class="event-content">
                    <div class="event-type-badge ${event.type}">
                        ${event.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                            <span>${event.attendees}/${event.maxAttendees} (${attendanceRate}%)</span>
                        </div>
                        <div class="event-meta-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>${event.price}</span>
                        </div>
                    </div>
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
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
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); saveEvent(${event.id})">
                            <i class="fas fa-bookmark"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    eventsGrid.innerHTML = html;
}

function loadCareersData() {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;

    const jobs = [
        {
            id: 1,
            title: 'Software Engineering Intern',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'internship',
            remote: true,
            salary: '$25-30/hour',
            postedBy: 'Sarah Wilson',
            postedDate: '2025-01-15',
            deadline: '2025-02-15',
            description: 'Join our team as a software engineering intern and work on cutting-edge projects that impact millions of users.',
            requirements: ['Computer Science student', 'JavaScript/Python', 'Problem solving', 'Team collaboration'],
            benefits: ['Mentorship Program', 'Flexible Hours', 'Full-time Potential', 'Health Benefits'],
            department: 'Engineering',
            experience: 'Entry Level',
            applicants: 45,
            views: 234
        },
        {
            id: 2,
            title: 'Data Analyst Intern',
            company: 'DataCorp',
            location: 'Remote',
            type: 'internship',
            remote: true,
            salary: '$22-28/hour',
            postedBy: 'David Chen',
            postedDate: '2025-01-12',
            deadline: '2025-02-10',
            description: 'Analyze data and create insights to drive business decisions in a fast-paced startup environment.',
            requirements: ['Statistics/Math background', 'Python/R', 'Data visualization', 'SQL knowledge'],
            benefits: ['Remote Work', 'Learning Budget', 'Certification Support', 'Flexible Schedule'],
            department: 'Analytics',
            experience: 'Entry Level',
            applicants: 32,
            views: 189
        },
        {
            id: 3,
            title: 'Marketing Assistant',
            company: 'StartupXYZ',
            location: 'New York, NY',
            type: 'part-time',
            remote: false,
            salary: '$20-24/hour',
            postedBy: 'Lisa Rodriguez',
            postedDate: '2025-01-10',
            deadline: '2025-02-01',
            description: 'Support marketing campaigns and social media management for an innovative fintech startup.',
            requirements: ['Marketing/Business student', 'Social media savvy', 'Creative thinking', 'Adobe Creative Suite'],
            benefits: ['Flexible Schedule', 'Industry Experience', 'Networking', 'Performance Bonus'],
            department: 'Marketing',
            experience: 'Entry Level',
            applicants: 28,
            views: 156
        },
        {
            id: 4,
            title: 'UX Design Intern',
            company: 'DesignHub',
            location: 'Los Angeles, CA',
            type: 'internship',
            remote: true,
            salary: '$24-28/hour',
            postedBy: 'Maria Garcia',
            postedDate: '2025-01-08',
            deadline: '2025-01-30',
            description: 'Create user-centered designs for web and mobile applications in a creative and collaborative environment.',
            requirements: ['Design student', 'Figma/Sketch', 'User research', 'Portfolio required'],
            benefits: ['Design Tools Access', 'Portfolio Development', 'Mentorship', 'Hybrid Work'],
            department: 'Design',
            experience: 'Entry Level',
            applicants: 67,
            views: 298
        },
        {
            id: 5,
            title: 'Business Analyst Trainee',
            company: 'ConsultingPro',
            location: 'Chicago, IL',
            type: 'full-time',
            remote: false,
            salary: '$55,000-65,000/year',
            postedBy: 'Robert Kim',
            postedDate: '2025-01-05',
            deadline: '2025-01-25',
            description: 'Entry-level position for recent graduates to develop business analysis skills in management consulting.',
            requirements: ['Recent graduate', 'Analytical skills', 'Excel proficiency', 'Communication skills'],
            benefits: ['Training Program', 'Career Growth', 'Travel Opportunities', 'Full Benefits'],
            department: 'Consulting',
            experience: 'Entry Level',
            applicants: 89,
            views: 412
        },
        {
            id: 6,
            title: 'Full-Stack Developer',
            company: 'WebSolutions',
            location: 'Austin, TX',
            type: 'full-time',
            remote: true,
            salary: '$60,000-75,000/year',
            postedBy: 'James Thompson',
            postedDate: '2025-01-03',
            deadline: '2025-01-20',
            description: 'Build and maintain web applications using modern technologies in an agile development environment.',
            requirements: ['CS degree', 'React/Node.js', '1-2 years experience', 'Git proficiency'],
            benefits: ['Remote-first', 'Stock Options', 'Unlimited PTO', 'Learning Stipend'],
            department: 'Engineering',
            experience: '1-2 years',
            applicants: 156,
            views: 678
        }
    ];

    renderJobsGrid(jobs);
}

function renderJobsGrid(jobs) {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;

    let html = '';
    jobs.forEach((job, index) => {
        html += `
            <div class="job-card" onclick="viewJobDetails(${job.id})" style="animation-delay: ${index * 0.1}s">
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
                            <span class="job-type ${job.type}">
                                ${job.type.replace('-', ' ').toUpperCase()}
                            </span>
                            ${job.remote ? '<span class="remote-badge">Remote</span>' : ''}
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
                        ${job.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join('')}
                    </div>
                </div>
                <div class="job-benefits">
                    <strong>Benefits:</strong>
                    <div class="benefits-list">
                        ${job.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
                    </div>
                </div>
                <div class="job-stats">
                    <div class="job-stat">
                        <i class="fas fa-eye"></i>
                        <span>${job.views} views</span>
                    </div>
                    <div class="job-stat">
                        <i class="fas fa-users"></i>
                        <span>${job.applicants} applicants</span>
                    </div>
                    <div class="job-stat">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Deadline: ${formatDate(job.deadline)}</span>
                    </div>
                </div>
                <div class="job-footer">
                    <div class="job-posted">
                        Posted by <strong>${job.postedBy}</strong> • ${formatDate(job.postedDate)}
                    </div>
                    <div class="job-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); applyToJob(${job.id})">
                            <i class="fas fa-paper-plane"></i>
                            Apply Now
                        </button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); saveJob(${job.id})">
                            <i class="fas fa-bookmark"></i>
                            Save
                        </button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); shareJob(${job.id})">
                            <i class="fas fa-share"></i>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    jobsGrid.innerHTML = html;
}

function loadResourcesData() {
    // Resources are already in HTML, this can be used for dynamic loading
    addResourceInteractions();
}

function addResourceInteractions() {
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
}

function loadProfileData() {
    // Profile data is already in HTML, this can be used for dynamic loading
    setupProfileInteractions();
}

function setupProfileInteractions() {
    const avatarUpload = document.getElementById('avatarUpload');
    if (avatarUpload) {
        avatarUpload.addEventListener('click', uploadAvatar);
    }

    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', editProfile);
    }
}

// Chatbot Management
function initializeChatbot() {
    console.log('Initializing chatbot...');
    
    const chatbotHeader = document.getElementById('chatbotHeader');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const questionBtns = document.querySelectorAll('.question-btn');
    
    if (chatbotHeader) {
        chatbotHeader.addEventListener('click', toggleChatbot);
        console.log('Chatbot header click listener added');
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        console.log('Chatbot input keypress listener added');
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        console.log('Send button click listener added');
    }
    
    // Add listeners for predefined questions
    questionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            if (question) {
                askPredefinedQuestion(question);
            }
        });
    });
    
    // Add initial bot message with animation
    setTimeout(() => {
        addBotMessage("Hi Emma! I'm your Study Buddy. How can I help you today? 🤖");
    }, 1000);
    
    console.log('Chatbot initialized successfully!');
}

function toggleChatbot() {
    const chatbot = document.getElementById('aiChatbot');
    const toggle = document.getElementById('chatbotToggle');
    
    if (!chatbot) return;
    
    chatbotOpen = !chatbotOpen;
    chatbot.classList.toggle('collapsed', !chatbotOpen);
    
    if (toggle) {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = chatbotOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            icon.style.transform = chatbotOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
    
    // Add animation effects
    if (chatbotOpen) {
        const content = document.getElementById('chatbotContent');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                content.style.transition = 'all 0.3s ease-out';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    // Add haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
    
    console.log('Chatbot toggled:', chatbotOpen ? 'opened' : 'collapsed');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    console.log('Sending message:', message);

    if (message) {
        addUserMessage(message);
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateBotResponse(message);
            addBotMessage(response);
        }, 1000 + Math.random() * 1000);
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const typingElement = document.createElement('div');
    typingElement.className = 'message bot-message typing-indicator';
    typingElement.id = 'typing-indicator';
    typingElement.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
        'hello': "Hi 👋 How can I assist you today?",
        'hi': "Hello! I'm here to help you navigate your academic and career journey. What would you like to know?",
        'help': "I can help you with:\n• Finding mentors 👨‍🏫\n• Discovering events 📅\n• Exploring career opportunities 💼\n• Navigating resources 📚\n• Profile management 👤",
        'mentor': "Great! You can find amazing mentors in the Mentorship section. They can help with:\n• Career guidance\n• Technical skills\n• Interview preparation\n• Industry insights\n\nWould you like me to show you how to request a mentor?",
        'events': "Check out the Events section for:\n• Networking events 🤝\n• Career fairs 💼\n• Workshops 🛠️\n• Alumni meetups 👥\n\nThere are 3 upcoming events you might be interested in!",
        'jobs': "The Career Center has exclusive opportunities:\n• 68 active job postings 📊\n• Internships and full-time positions\n• Direct connections to alumni employers\n\nYou currently have 5 applications in progress!",
        'resources': "Our Resources section includes:\n• Academic papers 📄\n• Video lectures 🎥\n• Study tools 🔧\n• Resume builder 📝\n• Interview prep 🎯\n• Coding challenges 💻",
        'profile': "You can update your profile to:\n• Add new skills\n• Update contact information\n• Upload a new photo\n• Track your progress\n\nWould you like help with any of these?",
        'application': "Your job applications:\n• 5 submitted applications\n• 2 pending responses\n• 1 interview scheduled\n\nWould you like to check the status or apply to new positions?",
        'schedule': "You have:\n• Career session with Sarah Johnson today at 3 PM\n• Technical prep with Mike Chen tomorrow at 2 PM\n\nNeed help joining a session or scheduling a new one?",
        'thank': "You're very welcome! 😊 I'm always here to help you succeed. Is there anything else you'd like to know?",
        'default': "I'm here to help you succeed! 🚀 You can ask me about:\n• Finding mentors\n• Upcoming events\n• Job opportunities\n• Learning resources\n• Managing your profile\n\nWhat would you like to explore?"
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }

    // Check for specific questions
    if (lowerMessage.includes('how') && lowerMessage.includes('mentor')) {
        return "To find a mentor:\n1. Go to the Mentorship section\n2. Browse available mentors\n3. Click on their profile to learn more\n4. Click 'Request Mentorship'\n5. Wait for their response!\n\nYou can filter mentors by expertise and industry. 🎯";
    }
    
    if (lowerMessage.includes('apply') && lowerMessage.includes('job')) {
        return "To apply for jobs:\n1. Visit the Career Center\n2. Browse available positions\n3. Click on any job to see details\n4. Click 'Apply Now'\n5. Complete the application\n\nTip: Make sure your profile is complete for better chances! ✨";
    }
    
    if (lowerMessage.includes('event') && lowerMessage.includes('register')) {
        return "To register for events:\n1. Go to the Events section\n2. Browse upcoming events\n3. Click on an event for details\n4. Click 'Register'\n5. Complete the registration\n\nDon't forget to add events to your calendar! 📅";
    }

    return responses.default;
}

function askPredefinedQuestion(question) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

// Event Listeners Setup
function initializeEventListeners() {
    console.log('Setting up event listeners...');
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
        console.log('Logout button listener added');
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
        console.log('Sidebar toggle listener added');
    }
    
    // Global search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keyup', performGlobalSearch);
        console.log('Global search listener added');
    }
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
        console.log('Notification button listener added');
    }
    
    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
        console.log('Modal close listener added');
    }
    
    // Overview cards
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });
    console.log(`Overview cards listeners added: ${overviewCards.length}`);
    
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
    console.log(`Action buttons listeners added: ${actionButtons.length}`);
    
    // View all buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.id === 'viewAllActivityBtn') {
                viewAllActivity();
            } else if (this.id === 'viewAllSessionsBtn') {
                viewAllSessions();
            }
        });
    });
    console.log(`View all buttons listeners added: ${viewAllBtns.length}`);
    
    // Filter listeners
    setupFilterListeners();
    
    // Resource buttons
    const resourceBtns = document.querySelectorAll('[data-resource]');
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resource = this.getAttribute('data-resource');
            accessResource(resource);
        });
    });
    console.log(`Resource buttons listeners added: ${resourceBtns.length}`);
    
    // Tab listeners
    setupTabListeners();
    
    // Modal close listeners
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
            
            if (chatbotOpen) {
                toggleChatbot();
            }
        }
        
        // Global search shortcut
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Window resize listener
    window.addEventListener('resize', function() {
        // Close sidebar on desktop
        if (window.innerWidth > 1024 && sidebarOpen) {
            toggleSidebar();
        }
    });

    // Online/offline listeners
    window.addEventListener('online', function() {
        showNotification('Connection restored! 🌐', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('You are offline! 📴', 'warning');
    });
    
    console.log('All event listeners set up successfully!');
}

function setupFilterListeners() {
    const filters = ['industryFilter', 'experienceFilter', 'locationFilter', 'eventTypeFilter', 'eventDateFilter', 'jobTypeFilter', 'industryJobFilter', 'mentorSearch', 'mentorSpecializationFilter', 'jobSearch'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            if (filter.tagName === 'INPUT') {
                filter.addEventListener('keyup', function() {
                    if (filterId.includes('mentor')) {
                        filterMentors();
                    } else if (filterId.includes('job')) {
                        filterJobs();
                    } else {
                        filterAlumni();
                    }
                });
            } else {
                filter.addEventListener('change', function() {
                    if (filterId.includes('event')) {
                        filterEvents();
                    } else if (filterId.includes('job') || filterId.includes('career')) {
                        filterJobs();
                    } else if (filterId.includes('mentor')) {
                        filterMentors();
                    } else {
                        filterAlumni();
                    }
                });
            }
        }
    });
}

function setupTabListeners() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            const parentTabs = this.closest('.mentorship-tabs, .events-tabs, .career-tabs');
            
            if (parentTabs) {
                if (parentTabs.classList.contains('mentorship-tabs')) {
                    showMentorshipTab(tabName);
                } else if (parentTabs.classList.contains('events-tabs')) {
                    showEventsTab(tabName);
                } else if (parentTabs.classList.contains('career-tabs')) {
                    showCareerTab(tabName);
                }
            }
        });
    });
}

// Tab Management
function showMentorshipTab(tabName) {
    // Hide all mentorship content
    document.querySelectorAll('.mentorship-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.mentorship-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected content and activate tab
    const targetContent = document.getElementById(tabName + 'Tab');
    if (targetContent) {
        targetContent.classList.add('active');
    }

    // Activate clicked tab
    const clickedTab = document.querySelector(`.mentorship-tabs .tab-btn[data-tab="${tabName}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

function showEventsTab(tabName) {
    // Hide all events content
    document.querySelectorAll('.events-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.events-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected content and activate tab
    const targetContent = document.getElementById(tabName + 'Tab');
    if (targetContent) {
        targetContent.classList.add('active');
    }

    // Activate clicked tab
    const clickedTab = document.querySelector(`.events-tabs .tab-btn[data-tab="${tabName}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

function showCareerTab(tabName) {
    // Hide all career content
    document.querySelectorAll('.career-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.career-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected content and activate tab
    const targetContent = document.getElementById(tabName + 'JobsTab');
    if (targetContent) {
        targetContent.classList.add('active');
    }

    // Activate clicked tab
    const clickedTab = document.querySelector(`.career-tabs .tab-btn[data-tab="${tabName}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Quick Actions Handler
function handleQuickAction(action) {
    switch(action) {
        case 'mentor':
            showSection('mentorship');
            showNotification('Navigating to mentorship section... 🎯', 'info');
            break;
        case 'event':
            showSection('events');
            showNotification('Navigating to events section... 📅', 'info');
            break;
        case 'jobs':
            showSection('career');
            showNotification('Navigating to career center... 💼', 'info');
            break;
        case 'profile':
            showSection('profile');
            showNotification('Navigating to profile section... 👤', 'info');
            break;
        default:
            showNotification('Action not recognized', 'warning');
    }
}

// Action Functions
function connectWithAlumni(id) {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Connection request sent successfully! 🎉', 'success');
        resetButton(event.target, '<i class="fas fa-check"></i> Connected');
    }, 1500);
}

function messageAlumni(id) {
    showNotification('Opening message composer... 📝', 'info');
    setTimeout(() => {
        showModal('Message Alumni', createMessageForm('alumni', id));
    }, 500);
}

function viewAlumniProfile(id) {
    const profileContent = `
        <div class="profile-modal">
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Alumni">
                </div>
                <div class="profile-info">
                    <h3>Sarah Wilson</h3>
                    <p>Senior Software Engineer at Google</p>
                    <span class="profile-batch">Class of 2018 • Computer Science</span>
                    <div class="profile-stats">
                        <span class="stat">4.9 ⭐ Rating</span>
                        <span class="stat">156 Connections</span>
                        <span class="stat">45 Mentoring Sessions</span>
                    </div>
                </div>
            </div>
            <div class="profile-details">
                <div class="detail-section">
                    <h4>About</h4>
                    <p>Passionate software engineer with 6+ years of experience at Google. Love mentoring students and giving back to the community. Specialized in full-stack development, system design, and career guidance.</p>
                </div>
                <div class="detail-section">
                    <h4>Experience</h4>
                    <div class="experience-item">
                        <strong>Senior Software Engineer</strong> - Google (2020-Present)
                        <p>Leading development of scalable web applications serving millions of users.</p>
                    </div>
                    <div class="experience-item">
                        <strong>Software Engineer</strong> - Facebook (2018-2020)
                        <p>Developed features for Instagram and WhatsApp platforms.</p>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Skills</h4>
                    <div class="skills-list">
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">Node.js</span>
                        <span class="skill-tag">System Design</span>
                        <span class="skill-tag">Leadership</span>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="connectWithAlumni(1); closeModal();">
                    <i class="fas fa-user-plus"></i>
                    Connect
                </button>
                <button class="btn btn-secondary" onclick="messageAlumni(1); closeModal();">
                    <i class="fas fa-envelope"></i>
                    Message
                </button>
                <button class="btn btn-secondary" onclick="requestMentorship(1); closeModal();">
                    <i class="fas fa-handshake"></i>
                    Request Mentorship
                </button>
            </div>
        </div>
    `;
    showModal('Alumni Profile', profileContent);
}

function requestMentorship(mentorId) {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Mentorship request sent successfully! 🎯', 'success');
        resetButton(event.target, '<i class="fas fa-clock"></i> Pending');
    }, 1500);
}

function messageMentor(mentorId) {
    showNotification('Opening message composer... 💬', 'info');
    setTimeout(() => {
        showModal('Message Mentor', createMessageForm('mentor', mentorId));
    }, 500);
}

function viewMentorProfile(id) {
    const profileContent = `
        <div class="profile-modal">
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Mentor">
                </div>
                <div class="profile-info">
                    <h3>Sarah Wilson</h3>
                    <p>Senior Software Engineer at Google</p>
                    <div class="mentor-rating">
                        <span class="rating">4.9 ⭐</span>
                        <span class="sessions">45 sessions completed</span>
                        <span class="response-time">< 2 hours response time</span>
                    </div>
                </div>
            </div>
            <div class="profile-details">
                <div class="detail-section">
                    <h4>Expertise</h4>
                    <div class="skills-list">
                        <span class="skill-tag">Software Engineering</span>
                        <span class="skill-tag">Career Development</span>
                        <span class="skill-tag">Technical Interviews</span>
                        <span class="skill-tag">System Design</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>About</h4>
                    <p>I'm passionate about helping students transition into successful tech careers. With 6+ years at Google, I can provide insights into software engineering, career growth, interview preparation, and technical leadership.</p>
                </div>
                <div class="detail-section">
                    <h4>Mentorship Approach</h4>
                    <ul>
                        <li>One-on-one career guidance sessions</li>
                        <li>Technical interview preparation</li>
                        <li>Code review and feedback</li>
                        <li>Industry insights and networking</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>Student Reviews</h4>
                    <div class="review-item">
                        <div class="review-header">
                            <strong>Mike S.</strong>
                            <span class="review-rating">⭐⭐⭐⭐⭐</span>
                        </div>
                        <p>"Sarah helped me land my dream internship at Google. Her guidance was invaluable!"</p>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="requestMentorship(1); closeModal();">
                    <i class="fas fa-handshake"></i>
                    Request Mentorship
                </button>
                <button class="btn btn-secondary" onclick="messageMentor(1); closeModal();">
                    <i class="fas fa-envelope"></i>
                    Message
                </button>
                <button class="btn btn-secondary" onclick="scheduleMeeting(1); closeModal();">
                    <i class="fas fa-calendar"></i>
                    Schedule Meeting
                </button>
            </div>
        </div>
    `;
    showModal('Mentor Profile', profileContent);
}

function registerForEvent(id) {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Successfully registered for event! 📅', 'success');
        resetButton(event.target, '<i class="fas fa-check"></i> Registered');
    }, 1500);
}

function shareEvent(id) {
    if (navigator.share) {
        navigator.share({
            title: 'Alumni Event',
            text: 'Check out this amazing alumni event!',
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('Event link copied to clipboard! 🔗', 'success');
    }
}

function saveEvent(id) {
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    // Toggle save state
    if (icon.classList.contains('fa-bookmark')) {
        icon.classList.remove('fa-bookmark');
        icon.classList.add('fas', 'fa-bookmark');
        showNotification('Event saved! 💾', 'success');
    } else {
        icon.classList.remove('fas', 'fa-bookmark');
        icon.classList.add('fa-bookmark');
        showNotification('Event removed from saved! 🗑️', 'info');
    }
}

function applyToJob(id) {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Application submitted successfully! 🎯', 'success');
        resetButton(event.target, '<i class="fas fa-check"></i> Applied');
        updateJobApplications();
    }, 2000);
}

function saveJob(id) {
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    // Toggle save state
    if (icon.classList.contains('fa-bookmark')) {
        icon.classList.remove('fa-bookmark');
        icon.classList.add('fas', 'fa-bookmark');
        showNotification('Job saved! 💾', 'success');
    } else {
        icon.classList.remove('fas', 'fa-bookmark');
        icon.classList.add('fa-bookmark');
        showNotification('Job removed from saved! 🗑️', 'info');
    }
}

function shareJob(id) {
    if (navigator.share) {
        navigator.share({
            title: 'Job Opportunity',
            text: 'Check out this job opportunity!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showNotification('Job link copied to clipboard! 🔗', 'success');
    }
}

function viewJobDetails(id) {
    const jobContent = `
        <div class="job-detail-modal">
            <div class="job-header">
                <div class="company-logo">
                    <i class="fas fa-building"></i>
                </div>
                <div class="job-info">
                    <h3>Software Engineering Intern</h3>
                    <p class="company">TechCorp Inc.</p>
                    <div class="job-meta">
                        <span class="location"><i class="fas fa-map-marker-alt"></i> San Francisco, CA</span>
                        <span class="type">Internship</span>
                        <span class="remote">Remote</span>
                    </div>
                </div>
                <div class="job-salary">$25-30/hour</div>
            </div>
            <div class="job-details">
                <div class="detail-section">
                    <h4>Job Description</h4>
                    <p>Join our team as a software engineering intern and work on cutting-edge projects that impact millions of users. You'll collaborate with senior engineers, participate in code reviews, and contribute to real production systems.</p>
                </div>
                <div class="detail-section">
                    <h4>Responsibilities</h4>
                    <ul>
                        <li>Develop and maintain web applications using modern technologies</li>
                        <li>Participate in agile development processes</li>
                        <li>Write clean, maintainable, and well-documented code</li>
                        <li>Collaborate with cross-functional teams</li>
                        <li>Learn and apply new technologies and frameworks</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>Requirements</h4>
                    <div class="requirements-list">
                        <span class="requirement-tag">Computer Science Student</span>
                        <span class="requirement-tag">JavaScript/Python</span>
                        <span class="requirement-tag">Problem Solving</span>
                        <span class="requirement-tag">Team Collaboration</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Benefits</h4>
                    <div class="benefits-list">
                        <span class="benefit-tag">Mentorship Program</span>
                        <span class="benefit-tag">Flexible Hours</span>
                        <span class="benefit-tag">Full-time Potential</span>
                        <span class="benefit-tag">Health Benefits</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Company Culture</h4>
                    <p>We believe in innovation, collaboration, and continuous learning. Our inclusive environment encourages creativity and professional growth.</p>
                </div>
            </div>
            <div class="job-actions">
                <button class="btn btn-primary" onclick="applyToJob(1); closeModal();">
                    <i class="fas fa-paper-plane"></i>
                    Apply Now
                </button>
                <button class="btn btn-secondary" onclick="saveJob(1);">
                    <i class="fas fa-bookmark"></i>
                    Save Job
                </button>
                <button class="btn btn-secondary" onclick="shareJob(1);">
                    <i class="fas fa-share"></i>
                    Share
                </button>
            </div>
        </div>
    `;
    showModal('Job Details', jobContent);
}

function viewEventDetails(id) {
    const eventContent = `
        <div class="event-detail-modal">
            <div class="event-header">
                <div class="event-image">
                    <img src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop" alt="Event">
                </div>
                <div class="event-info">
                    <h3>Tech Career Fair 2025</h3>
                    <div class="event-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>February 20, 2025</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>10:00 AM - 6:00 PM</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Convention Center, Downtown</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>200/500 attendees</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="event-details">
                <div class="detail-section">
                    <h4>About This Event</h4>
                    <p>Connect with top tech companies and explore career opportunities. Network with industry leaders and learn about the latest trends in technology. This is your chance to meet recruiters from Google, Microsoft, Amazon, Netflix, and many more!</p>
                </div>
                <div class="detail-section">
                    <h4>Featured Companies</h4>
                    <div class="companies-list">
                        <span class="company-tag">Google</span>
                        <span class="company-tag">Microsoft</span>
                        <span class="company-tag">Amazon</span>
                        <span class="company-tag">Netflix</span>
                        <span class="company-tag">Apple</span>
                        <span class="company-tag">Meta</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Schedule</h4>
                    <div class="schedule-item">
                        <strong>10:00 AM - 11:00 AM:</strong> Registration and Networking Breakfast
                    </div>
                    <div class="schedule-item">
                        <strong>11:00 AM - 3:00 PM:</strong> Career Fair - Company Booths
                    </div>
                    <div class="schedule-item">
                        <strong>3:00 PM - 4:00 PM:</strong> Panel Discussion: "Future of Tech"
                    </div>
                    <div class="schedule-item">
                        <strong>4:00 PM - 6:00 PM:</strong> One-on-one interviews and networking
                    </div>
                </div>
                <div class="detail-section">
                    <h4>What to Bring</h4>
                    <ul>
                        <li>Multiple copies of your resume</li>
                        <li>Business cards (if available)</li>
                        <li>Portfolio or project examples</li>
                        <li>Professional attire</li>
                        <li>Laptop for coding interviews</li>
                    </ul>
                </div>
            </div>
            <div class="event-actions">
                <button class="btn btn-primary" onclick="registerForEvent(1); closeModal();">
                    <i class="fas fa-calendar-plus"></i>
                    Register Now
                </button>
                <button class="btn btn-secondary" onclick="shareEvent(1);">
                    <i class="fas fa-share"></i>
                    Share Event
                </button>
                <button class="btn btn-secondary" onclick="saveEvent(1);">
                    <i class="fas fa-bookmark"></i>
                    Save Event
                </button>
            </div>
        </div>
    `;
    showModal('Event Details', eventContent);
}

function joinSession(sessionId) {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Joining video session... 📹', 'info');
        // Simulate opening video call
        window.open('https://meet.google.com/fake-session-' + sessionId, '_blank');
        resetButton(event.target, '<i class="fas fa-video"></i> In Session');
    }, 1000);
}

function rescheduleSession(sessionId) {
    showNotification('Opening scheduling options... 📅', 'info');
    setTimeout(() => {
        showModal('Reschedule Session', createScheduleForm(sessionId));
    }, 500);
}

function scheduleMeeting(mentorId) {
    showNotification('Opening calendar... 📅', 'info');
    setTimeout(() => {
        showModal('Schedule Meeting', createScheduleForm(mentorId));
    }, 500);
}

function editProfile() {
    showNotification('Opening profile editor... ✏️', 'info');
    setTimeout(() => {
        showModal('Edit Profile', createProfileEditForm());
    }, 500);
}

function uploadAvatar() {
    showNotification('Opening file selector... 📷', 'info');
    
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const avatars = document.querySelectorAll('.profile-avatar img, .profile-avatar-large img');
                avatars.forEach(avatar => {
                    avatar.src = e.target.result;
                });
                showNotification('Profile picture updated! ✨', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Resource Actions
function accessResource(resourceType) {
    const messages = {
        'papers': 'Opening research paper database... 📄',
        'videos': 'Loading video lectures... 🎥',
        'tools': 'Accessing study tools... 🔧',
        'resume': 'Opening resume builder... 📝',
        'interview': 'Starting interview practice... 🎯',
        'assessment': 'Loading career assessment... 📊',
        'coding': 'Opening coding challenges... 💻',
        'certifications': 'Browsing certifications... 🏆',
        'groups': 'Finding study groups... 👥'
    };
    
    showNotification(messages[resourceType] || 'Accessing resource... 🚀', 'info');
    
    // Simulate opening resource
    setTimeout(() => {
        showNotification('Resource loaded successfully! 🎉', 'success');
    }, 1500);
}

// Filter Functions
function filterAlumni() {
    const industryFilter = document.getElementById('industryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    showNotification('Applying alumni filters... 🔍', 'info');
    
    // Add loading state
    const alumniGrid = document.getElementById('alumniGrid');
    if (alumniGrid) {
        alumniGrid.style.opacity = '0.5';
        setTimeout(() => {
            alumniGrid.style.opacity = '1';
            showNotification('Filters applied! ✨', 'success');
        }, 1000);
    }
}

function filterMentors() {
    showNotification('Filtering mentors... 🔍', 'info');
    
    const mentorsGrid = document.getElementById('mentorsGrid');
    if (mentorsGrid) {
        mentorsGrid.style.opacity = '0.5';
        setTimeout(() => {
            mentorsGrid.style.opacity = '1';
            showNotification('Mentors filtered! ✨', 'success');
        }, 800);
    }
}

function filterEvents() {
    const eventTypeFilter = document.getElementById('eventTypeFilter');
    const eventDateFilter = document.getElementById('eventDateFilter');
    
    showNotification('Filtering events... 🔍', 'info');
    
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        eventsGrid.style.opacity = '0.5';
        setTimeout(() => {
            eventsGrid.style.opacity = '1';
            showNotification('Events filtered! ✨', 'success');
        }, 800);
    }
}

function filterJobs() {
    showNotification('Filtering jobs... 🔍', 'info');
    
    const jobsGrid = document.getElementById('jobsGrid');
    if (jobsGrid) {
        jobsGrid.style.opacity = '0.5';
        setTimeout(() => {
            jobsGrid.style.opacity = '1';
            showNotification('Jobs filtered! ✨', 'success');
        }, 800);
    }
}

function performGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.length < 2) return;
    
    showNotification(`Searching for "${searchTerm}"... 🔍`, 'info');
    
    // Simulate search results
    setTimeout(() => {
        const results = Math.floor(Math.random() * 20) + 5;
        showNotification(`Found ${results} results for "${searchTerm}"! 📊`, 'success');
    }, 1000);
}

// Utility Functions
function showLoadingButton(button) {
    if (!button) return;
    
    const originalContent = button.innerHTML;
    button.dataset.originalContent = originalContent;
    button.innerHTML = '<div class="loading"></div>';
    button.disabled = true;
}

function resetButton(button, newContent = null) {
    if (!button) return;
    
    const originalContent = button.dataset.originalContent;
    button.innerHTML = newContent || originalContent;
    button.disabled = false;
}

function updateJobApplications() {
    // Update application counter in overview card
    const applicationCounter = document.querySelector('.career-card .card-number');
    if (applicationCounter) {
        const current = parseInt(applicationCounter.textContent);
        applicationCounter.textContent = current + 1;
        
        // Add bounce animation
        applicationCounter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            applicationCounter.style.transform = 'scale(1)';
        }, 200);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function formatEventDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    toast.classList.add('show');

    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Form Creators
function createMessageForm(type, id) {
    return `
        <div class="message-form">
            <div class="form-group">
                <label for="messageSubject">Subject</label>
                <input type="text" id="messageSubject" placeholder="Enter subject...">
            </div>
            <div class="form-group">
                <label for="messageContent">Message</label>
                <textarea id="messageContent" rows="5" placeholder="Type your message here..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="sendDirectMessage('${type}', ${id})">
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

function createScheduleForm(id) {
    return `
        <div class="schedule-form">
            <div class="form-group">
                <label for="meetingDate">Date</label>
                <input type="date" id="meetingDate" min="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
                <label for="meetingTime">Time</label>
                <input type="time" id="meetingTime">
            </div>
            <div class="form-group">
                <label for="meetingDuration">Duration</label>
                <select id="meetingDuration">
                    <option value="30">30 minutes</option>
                    <option value="60" selected>1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                </select>
            </div>
            <div class="form-group">
                <label for="meetingTopic">Topic</label>
                <input type="text" id="meetingTopic" placeholder="e.g., Career Guidance, Interview Prep">
            </div>
            <div class="form-group">
                <label for="meetingNotes">Additional Notes</label>
                <textarea id="meetingNotes" rows="3" placeholder="Any specific topics you'd like to discuss..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="scheduleMeetingConfirm(${id})">
                    <i class="fas fa-calendar-check"></i>
                    Schedule Meeting
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

function createProfileEditForm() {
    return `
        <div class="profile-edit-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editFirstName">First Name</label>
                    <input type="text" id="editFirstName" value="Emma">
                </div>
                <div class="form-group">
                    <label for="editLastName">Last Name</label>
                    <input type="text" id="editLastName" value="Thompson">
                </div>
            </div>
            <div class="form-group">
                <label for="editEmail">Email</label>
                <input type="email" id="editEmail" value="emma.thompson@university.edu">
            </div>
            <div class="form-group">
                <label for="editPhone">Phone</label>
                <input type="tel" id="editPhone" value="+1 (555) 123-4567">
            </div>
            <div class="form-group">
                <label for="editBio">Bio</label>
                <textarea id="editBio" rows="4">Passionate computer science student with interests in machine learning and web development. Always eager to learn new technologies and contribute to meaningful projects.</textarea>
            </div>
            <div class="form-group">
                <label for="editSkills">Skills (comma-separated)</label>
                <input type="text" id="editSkills" value="Python, JavaScript, React, Machine Learning, SQL">
            </div>
            <div class="form-group">
                <label for="editLinkedIn">LinkedIn URL</label>
                <input type="url" id="editLinkedIn" value="linkedin.com/in/emmathompson">
            </div>
            <div class="form-group">
                <label for="editGitHub">GitHub URL</label>
                <input type="url" id="editGitHub" value="github.com/emmathompson">
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="saveProfileChanges()">
                    <i class="fas fa-save"></i>
                    Save Changes
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;
}

// Form Action Handlers
function sendDirectMessage(type, id) {
    const subject = document.getElementById('messageSubject').value;
    const content = document.getElementById('messageContent').value;
    
    if (!subject || !content) {
        showNotification('Please fill in all fields! ⚠️', 'warning');
        return;
    }
    
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Message sent successfully! 📧', 'success');
        closeModal();
    }, 1500);
}

function scheduleMeetingConfirm(id) {
    const date = document.getElementById('meetingDate').value;
    const time = document.getElementById('meetingTime').value;
    const topic = document.getElementById('meetingTopic').value;
    
    if (!date || !time || !topic) {
        showNotification('Please fill in all required fields! ⚠️', 'warning');
        return;
    }
    
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Meeting scheduled successfully! 📅', 'success');
        closeModal();
    }, 1500);
}

function saveProfileChanges() {
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Profile updated successfully! ✨', 'success');
        closeModal();
    }, 1500);
}

// Additional Helper Functions
function logout() {
    console.log('Logout function called');
    showLoadingButton(event.target);
    setTimeout(() => {
        showNotification('Logging out... 👋', 'info');
        // Redirect to login.html
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }, 500);
}

function showNotifications() {
    const notifications = [
        { id: 1, title: 'New mentorship request', time: '2 min ago', type: 'info', read: false },
        { id: 2, title: 'Event reminder: Tech Fair tomorrow', time: '1 hour ago', type: 'warning', read: false },
        { id: 3, title: 'Job application status update', time: '3 hours ago', type: 'success', read: false },
        { id: 4, title: 'New message from Sarah Wilson', time: '1 day ago', type: 'info', read: true }
    ];
    
    const notificationContent = `
        <div class="notifications-list">
            <div class="notifications-header">
                <h4>Notifications</h4>
                <button class="btn btn-sm" onclick="markAllAsRead()">Mark all as read</button>
            </div>
            ${notifications.map(notif => `
                <div class="notification-item ${notif.read ? 'read' : 'unread'}">
                    <div class="notification-content">
                        <h5>${notif.title}</h5>
                        <span class="notification-time">${notif.time}</span>
                    </div>
                    <div class="notification-actions">
                        <button class="btn btn-sm" onclick="markAsRead(${notif.id})">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    showModal('Notifications', notificationContent);
}

function markAllAsRead() {
    showNotification('All notifications marked as read! ✅', 'success');
    closeModal();
    
    // Update notification count
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
        notificationCount.textContent = '0';
        notificationCount.style.display = 'none';
    }
}

function markAsRead(id) {
    showNotification('Notification marked as read! ✅', 'success');
}

function viewAllActivity() {
    showNotification('Loading activity history... 📊', 'info');
}

function viewAllSessions() {
    showNotification('Loading all sessions... 📅', 'info');
}

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export functions for global access
window.studentDashboard = {
    showSection,
    toggleSidebar,
    toggleChatbot,
    sendMessage,
    showNotification,
    showModal,
    closeModal,
    logout
};