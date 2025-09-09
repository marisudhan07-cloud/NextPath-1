document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Sidebar navigation
  const sidebarLinks = document.querySelectorAll('nav a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      sidebarLinks.forEach(l => {
        l.classList.remove('text-purple-600', 'bg-purple-50');
        l.classList.add('text-gray-600');
      });
      
      // Add active class to clicked link
      link.classList.remove('text-gray-600');
      link.classList.add('text-purple-600', 'bg-purple-50');
    });
  });

  // Accept/Decline mentoring requests
  const acceptButtons = document.querySelectorAll('button:contains("Accept")');
  const declineButtons = document.querySelectorAll('button:contains("Decline")');

  // Since :contains is not available in querySelector, we'll use a different approach
  document.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'Accept') {
      e.target.textContent = 'Accepted';
      e.target.classList.remove('bg-green-600', 'hover:bg-green-700');
      e.target.classList.add('bg-gray-400', 'cursor-not-allowed');
      e.target.disabled = true;
      
      // Hide decline button
      const declineBtn = e.target.nextElementSibling;
      if (declineBtn && declineBtn.textContent.trim() === 'Decline') {
        declineBtn.style.display = 'none';
      }
    }
    
    if (e.target.textContent.trim() === 'Decline') {
      const requestCard = e.target.closest('.border');
      if (requestCard) {
        requestCard.style.opacity = '0.5';
        requestCard.style.pointerEvents = 'none';
      }
      e.target.textContent = 'Declined';
      e.target.classList.remove('bg-gray-200', 'hover:bg-gray-300');
      e.target.classList.add('bg-red-200', 'cursor-not-allowed');
      e.target.disabled = true;
      
      // Hide accept button
      const acceptBtn = e.target.previousElementSibling;
      if (acceptBtn && acceptBtn.textContent.trim() === 'Accept') {
        acceptBtn.style.display = 'none';
      }
    }
  });

  // Post New Job button
  const postJobBtn = document.querySelector('button:contains("Post New Job")');
  document.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'Post New Job') {
      alert('Job posting feature coming soon! You\'ll be able to create detailed job postings for students.');
    }
  });

  // View Applications buttons
  document.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'View Applications') {
      alert('Applications viewer coming soon! You\'ll be able to review and manage all applications.');
    }
  });

  // Message buttons for mentees
  const messageButtons = document.querySelectorAll('[data-lucide="message-circle"]');
  messageButtons.forEach(button => {
    button.parentElement.addEventListener('click', () => {
      alert('Messaging feature coming soon! You\'ll be able to chat directly with your mentees.');
    });
  });

  // Quick Actions
  const quickActionButtons = document.querySelectorAll('.space-y-3 button');
  quickActionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.textContent.trim();
      switch(action) {
        case 'Update Profile':
          alert('Profile update feature coming soon!');
          break;
        case 'Post Job Opening':
          alert('Job posting feature coming soon!');
          break;
        case 'Schedule Workshop':
          alert('Workshop scheduling feature coming soon!');
          break;
        case 'Make Donation':
          alert('Donation feature coming soon! Help support student scholarships and programs.');
          break;
        default:
          alert('Feature coming soon!');
      }
    });
  });

  // Notification and message buttons in header
  const notificationBtn = document.querySelector('[data-lucide="bell"]').parentElement;
  const messageBtn = document.querySelector('[data-lucide="mail"]').parentElement;

  notificationBtn.addEventListener('click', () => {
    alert('Notifications feature coming soon!');
  });

  messageBtn.addEventListener('click', () => {
    alert('Messages feature coming soon!');
  });

  // Add some interactive animations
  const cards = document.querySelectorAll('.bg-white');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.transition = 'transform 0.2s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Stats animation on page load
  const statNumbers = document.querySelectorAll('.text-2xl.font-bold');
  statNumbers.forEach((stat, index) => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const increment = finalValue / 50;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '');
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '');
      }
    }, 30 + (index * 10));
  });
});