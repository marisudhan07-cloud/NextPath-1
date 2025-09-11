document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Chatbot functionality
let isChatbotOpen = false;

function toggleChatbot() {
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  
  isChatbotOpen = !isChatbotOpen;
  
  if (isChatbotOpen) {
    chatbotWindow.classList.remove('hidden');
    chatbotToggle.innerHTML = '<i data-lucide="x" class="h-6 w-6"></i>';
  } else {
    chatbotWindow.classList.add('hidden');
    chatbotToggle.innerHTML = '<i data-lucide="message-circle" class="h-6 w-6"></i>';
  }
  
  lucide.createIcons();
}

function askQuestion(question) {
  const chatMessages = document.getElementById('chat-messages');
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'flex justify-end chatbot-message';
  userMessage.innerHTML = `
    <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
      <p class="text-sm">${question}</p>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Simulate bot response
  setTimeout(() => {
    const botResponse = getBotResponse(question);
    const botMessage = document.createElement('div');
    botMessage.className = 'flex items-start chatbot-message';
    botMessage.innerHTML = `
      <div class="bg-blue-100 p-2 rounded-full mr-2">
        <i data-lucide="bot" class="h-4 w-4 text-blue-600"></i>
      </div>
      <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
        <p class="text-sm">${botResponse}</p>
      </div>
    `;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    lucide.createIcons();
  }, 1000);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();
  
  if (message) {
    askQuestion(message);
    chatInput.value = '';
  }
}

function getBotResponse(question) {
  const responses = {
    'How do I find mentors?': 'You can find mentors by going to the "Find Mentors" section in your dashboard. Browse through alumni profiles, filter by industry or company, and send connection requests. Most mentors respond within 24-48 hours!',
    'What job opportunities are available?': 'Check out the "Browse Jobs" section for the latest opportunities. We have internships, full-time positions, and freelance projects from top companies. New jobs are added daily!',
    'How to improve my profile?': 'Complete all profile sections (85% done!), add your projects, skills, and achievements. Upload a professional photo and write a compelling bio. A complete profile gets 3x more mentor connections!',
    'default': 'I can help you with finding mentors, job opportunities, profile optimization, event registration, and general platform navigation. What specific area would you like assistance with?'
  };
  
  return responses[question] || responses['default'];
}

// Dashboard functionality
function showNotifications() {
  alert('Notifications:\n• New job match: Software Engineer at Google\n• Sarah Anderson sent you a message\n• Tech Workshop starts tomorrow');
}

function showProfileMenu() {
  const menu = confirm('Profile Menu:\n• View Profile\n• Settings\n• Logout\n\nClick OK to view profile, Cancel to close');
  if (menu) {
    updateProfile();
  }
}

function findMentors() {
  alert('Redirecting to Mentor Discovery page...\n\nHere you can:\n• Browse alumni by company/industry\n• Filter by expertise\n• Send connection requests\n• View mentor profiles');
}

function browseJobs() {
  alert('Opening Job Opportunities page...\n\nFeatures:\n• Latest job postings\n• Filter by location/company\n• One-click applications\n• Track application status');
}

function viewEvents() {
  alert('Events & Workshops page:\n\n• Upcoming events\n• Registration management\n• Past event recordings\n• Networking opportunities');
}

function updateProfile() {
  alert('Profile Settings:\n\n• Personal Information\n• Education Details\n• Skills & Achievements\n• Privacy Settings\n• Portfolio Upload');
}

function viewAllJobs() {
  alert('Loading all job opportunities...\n\n• 150+ active positions\n• Filter by: Location, Company, Role\n• Sort by: Date, Salary, Relevance\n• Save favorites');
}

function viewJob(jobId) {
  const jobs = {
    'software-engineer': 'Software Engineer Intern at Google\n\nFull job description, requirements, and application process...',
    'product-manager': 'Product Manager Trainee at Microsoft\n\nDetailed role information and application guidelines...'
  };
  alert(jobs[jobId] || 'Job details loading...');
}

function applyJob(jobId) {
  alert(`Application submitted for ${jobId}!\n\nNext steps:\n• HR will review your profile\n• Expect response in 3-5 days\n• Check email for updates`);
}

function viewAllEvents() {
  alert('All Events:\n\n• Tech Career Workshop (Tomorrow)\n• Alumni Networking Night (Dec 20)\n• Startup Pitch Session (Dec 25)\n• Industry Panel Discussion (Jan 5)');
}

function joinEvent(eventId) {
  alert('Joining Tech Career Workshop!\n\n• Meeting link sent to email\n• Starts tomorrow at 6:00 PM\n• Duration: 2 hours\n• Certificate provided');
}

function registerEvent(eventId) {
  alert('Successfully registered for Alumni Networking Night!\n\n• Date: Dec 20, 7:00 PM\n• Venue: Mumbai\n• Confirmation email sent\n• Networking kit included');
}

function findMoreMentors() {
  alert('Mentor Discovery:\n\n• 500+ alumni mentors available\n• Filter by: Industry, Company, Experience\n• Average response time: 24 hours\n• Free mentorship sessions');
}

function chatWithMentor(mentorId) {
  const mentors = {
    'sarah': 'Opening chat with Sarah Anderson...\n\nSenior SDE at Amazon\n• Available for career guidance\n• Specializes in system design\n• Response time: < 2 hours',
    'raj': 'Opening chat with Raj Kumar...\n\nProduct Manager at Google\n• Product strategy expert\n• Startup experience\n• Weekly 1:1 sessions available'
  };
  alert(mentors[mentorId] || 'Opening mentor chat...');
}

// Handle Enter key in chat input
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && document.getElementById('chat-input') === document.activeElement) {
    sendMessage();
  }
});
