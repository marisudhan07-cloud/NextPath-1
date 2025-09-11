document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Navigation functions
function showNotifications() {
  alert('Notifications:\n• 3 new mentor requests\n• Job posting got 15 new applications\n• Upcoming event: PM Workshop tomorrow\n• Rahul Kumar sent a message\n• Monthly impact report available');
}

function showProfileMenu() {
  const menu = confirm('Profile Menu:\n• View Profile\n• Account Settings\n• Privacy Settings\n• Logout\n\nClick OK to view profile, Cancel to close');
  if (menu) {
    alert('Opening Alumni Profile...\n\n• Professional Information\n• Mentoring Preferences\n• Company Details\n• Achievement Showcase');
  }
}

// Quick Actions
function reviewMentorRequests() {
  alert('Mentor Requests Dashboard:\n\n• 3 pending requests\n• Review student profiles\n• Accept/decline with feedback\n• Set mentoring capacity\n• Schedule intro sessions');
}

function postJob() {
  alert('Post New Job Opportunity:\n\n• Job title and description\n• Requirements and qualifications\n• Salary range and benefits\n• Application deadline\n• Screening questions\n• Auto-notify relevant students');
}

function hostEvent() {
  alert('Host New Event:\n\n• Workshop/Webinar/Panel\n• Date, time, and duration\n• Target audience\n• Registration management\n• Recording options\n• Certificate generation');
}

function viewAnalytics() {
  alert('Impact Analytics Dashboard:\n\n• Mentoring statistics\n• Job posting performance\n• Event attendance metrics\n• Student success tracking\n• Monthly impact reports\n• Peer comparison');
}

// Mentor Request Management
function acceptMentorRequest(studentId) {
  const students = {
    'arjun': 'Arjun Kumar',
    'priya': 'Priya Singh'
  };
  alert(`Mentor request accepted for ${students[studentId]}!\n\n• Welcome message sent\n• Intro session scheduled\n• Mentoring guidelines shared\n• Added to your mentees list`);
}

function declineMentorRequest(studentId) {
  const students = {
    'arjun': 'Arjun Kumar',
    'priya': 'Priya Singh'
  };
  const reason = prompt(`Declining request from ${students[studentId]}.\n\nOptional: Provide feedback or reason:`);
  if (reason !== null) {
    alert(`Request declined with feedback sent to ${students[studentId]}.`);
  }
}

function viewProfile(studentId) {
  const profiles = {
    'arjun': 'Arjun Kumar - Profile\n\n• Computer Science Final Year\n• CGPA: 8.5/10\n• Skills: Java, Python, React\n• Projects: E-commerce app, ML model\n• Interests: Product Management\n• Career Goal: PM at tech company',
    'priya': 'Priya Singh - Profile\n\n• MBA 2nd Year\n• Previous: Software Engineer (3 years)\n• Skills: Analytics, Strategy, Leadership\n• Projects: Market research, Product launch\n• Interests: Tech Product Management\n• Career Goal: Senior PM role'
  };
  alert(profiles[studentId] || 'Loading student profile...');
}

// Job Management
function manageAllJobs() {
  alert('Job Management Dashboard:\n\n• All your job postings\n• Application tracking\n• Candidate screening\n• Interview scheduling\n• Offer management\n• Performance analytics');
}

function manageJob(jobId) {
  const jobs = {
    'senior-pm': 'Senior Product Manager Position:\n\n• 45 applications received\n• 12 candidates shortlisted\n• 3 interviews scheduled\n• Review applications\n• Schedule interviews\n• Send updates to candidates',
    'product-intern': 'Product Intern Position:\n\n• 28 applications received\n• 8 candidates shortlisted\n• Screening in progress\n• Review applications\n• Conduct phone screens\n• Select final candidates'
  };
  alert(jobs[jobId] || 'Loading job details...');
}

// Mentee Management
function chatWithMentee(menteeId) {
  const mentees = {
    'rahul': 'Chat with Rahul Kumar:\n\n• Software Engineering student\n• Currently working on React project\n• Needs guidance on system design\n• Last discussed: Career roadmap\n• Next session: Code review',
    'sneha': 'Chat with Sneha Patel:\n\n• MBA student interested in PM\n• Working on product strategy case\n• Session due tomorrow\n• Last discussed: Market analysis\n• Next topic: User research methods',
    'vikram': 'Chat with Vikram Gupta:\n\n• Data Science enthusiast\n• Building ML portfolio\n• Needs industry insights\n• Last discussed: Career transition\n• Next topic: Technical interviews'
  };
  alert(mentees[menteeId] || 'Opening chat with mentee...');
}

function viewAllMentees() {
  alert('All Mentees Dashboard:\n\n• 8 active mentees\n• Session scheduling\n• Progress tracking\n• Goal setting\n• Performance metrics\n• Success stories\n• Feedback collection');
}

// Event Management
function manageEvents() {
  alert('Event Management:\n\n• Upcoming events\n• Registration management\n• Attendee communication\n• Content preparation\n• Recording setup\n• Post-event follow-up');
}

function manageEvent(eventId) {
  const events = {
    'pm-workshop': 'Product Management Workshop:\n\n• Date: Dec 20, 7:00 PM\n• 45 registered participants\n• Agenda: PM fundamentals\n• Materials: Slides, case studies\n• Recording: Enabled\n• Certificates: Auto-generated',
    'career-panel': 'Career Transition Panel:\n\n• Date: Jan 5, 6:00 PM\n• 32 registered participants\n• Format: Panel discussion\n• Topics: Career pivots, skills\n• Q&A session included\n• Networking session after'
  };
  alert(events[eventId] || 'Loading event details...');
}

// Give Back Functions
function donateToScholarship() {
  alert('Scholarship Fund Donation:\n\n• Support deserving students\n• Tax-deductible contribution\n• Choose scholarship criteria\n• Track fund utilization\n• Receive impact reports\n• Connect with recipients');
}

function sponsorEvent() {
  alert('Event Sponsorship:\n\n• Sponsor student events\n• Workshop funding\n• Equipment donations\n• Venue sponsorship\n• Speaker arrangements\n• Brand visibility options');
}

function resourceDonation() {
  alert('Resource Donation:\n\n• Donate books and materials\n• Online course subscriptions\n• Software licenses\n• Hardware equipment\n• Mentoring time\n• Industry connections');
}

// Additional utility functions
function scheduleSession(menteeId) {
  alert(`Scheduling session with ${menteeId}:\n\n• Available time slots\n• Session duration: 30-60 mins\n• Video call setup\n• Agenda preparation\n• Reminder notifications\n• Session recording option`);
}

function sendMessage(recipientId) {
  alert(`Sending message to ${recipientId}:\n\n• Direct messaging\n• File attachments\n• Voice messages\n• Video calls\n• Screen sharing\n• Message history`);
}

function generateReport() {
  alert('Generating Impact Report:\n\n• Mentoring statistics\n• Student success metrics\n• Job placement rates\n• Event impact analysis\n• Feedback summary\n• Recommendations for improvement');
}
