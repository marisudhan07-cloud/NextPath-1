document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Chatbot functionality
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const quickQuestions = document.querySelectorAll('.quick-question');

  let isChatbotOpen = false;

  // Predefined responses
  const responses = {
    'find mentors': 'Great! You can find mentors by going to the "Find Mentors" section in your sidebar. You can filter by industry, experience level, and availability. Would you like me to show you some recommended mentors based on your profile?',
    'job opportunities': 'I can help you with job opportunities! Check out the "Job Opportunities" section where you\'ll find internships and full-time positions. You currently have 8 active applications. Would you like tips on improving your applications?',
    'upcoming events': 'Here are your upcoming events:\n• Tech Career Workshop - Dec 15, 6:00 PM IST\n• Alumni Networking Night - Dec 20, 7:00 PM IST\n\nYou\'re registered for the workshop. Would you like to register for the networking event?',
    'profile tips': 'Your profile is 85% complete! Here are some tips to improve it:\n• Add more skills and certifications\n• Upload a professional photo\n• Write a compelling summary\n• Add project details\n\nWould you like specific guidance on any of these areas?',
    'hello': 'Hello! Welcome to NextPath. I\'m here to help you navigate your career journey. What would you like to know about?',
    'help': 'I can help you with:\n• Finding mentors and alumni\n• Job and internship opportunities\n• Upcoming events and workshops\n• Profile optimization tips\n• General platform navigation\n\nWhat specific area interests you?',
    'default': 'I\'m here to help with your NextPath journey! You can ask me about mentors, job opportunities, events, or profile tips. What would you like to know?'
  };

  // Toggle chatbot
  chatbotToggle.addEventListener('click', () => {
    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
      chatbotWindow.classList.remove('hidden');
      chatbotWindow.classList.add('animate-slide-up');
      chatInput.focus();
    } else {
      chatbotWindow.classList.add('hidden');
    }
  });

  // Close chatbot
  chatbotClose.addEventListener('click', () => {
    isChatbotOpen = false;
    chatbotWindow.classList.add('hidden');
  });

  // Send message function
  function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(message.toLowerCase());
      addMessage(response, 'bot');
    }, 1000);
  }

  // Add message to chat
  function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-2';

    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="flex items-start space-x-2 flex-row-reverse">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i data-lucide="user" class="h-4 w-4 text-white"></i>
          </div>
          <div class="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
            <p class="text-sm">${message}</p>
          </div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <i data-lucide="bot" class="h-4 w-4 text-blue-600"></i>
        </div>
        <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
          <p class="text-sm text-gray-800" style="white-space: pre-line;">${message}</p>
        </div>
      `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Reinitialize Lucide icons for new messages
    lucide.createIcons();
  }

  // Get response based on message
  function getResponse(message) {
    for (const key in responses) {
      if (message.includes(key)) {
        return responses[key];
      }
    }
    return responses.default;
  }

  // Send message on button click
  sendButton.addEventListener('click', () => {
    sendMessage(chatInput.value);
  });

  // Send message on Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(chatInput.value);
    }
  });

  // Quick question buttons
  quickQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const question = button.textContent.trim();
      sendMessage(question);
    });
  });

  // Sidebar navigation
  const sidebarLinks = document.querySelectorAll('nav a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      sidebarLinks.forEach(l => {
        l.classList.remove('text-blue-600', 'bg-blue-50');
        l.classList.add('text-gray-600');
      });
      
      // Add active class to clicked link
      link.classList.remove('text-gray-600');
      link.classList.add('text-blue-600', 'bg-blue-50');
    });
  });

  // Notification and message buttons
  const notificationBtn = document.querySelector('[data-lucide="bell"]').parentElement;
  const messageBtn = document.querySelector('[data-lucide="mail"]').parentElement;

  notificationBtn.addEventListener('click', () => {
    alert('Notifications feature coming soon!');
  });

  messageBtn.addEventListener('click', () => {
    alert('Messages feature coming soon!');
  });
});