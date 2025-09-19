document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  const logoIcon = navbar.querySelector('[data-lucide="graduation-cap"]');
  const logoText = navbar.querySelector('span');
  const navLinks = navbar.querySelectorAll('.md\\:flex a');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  let isMenuOpen = false;

  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('bg-white/95', scrolled);
    navbar.classList.toggle('backdrop-blur-md', scrolled);
    navbar.classList.toggle('shadow-lg', scrolled);
    navbar.classList.toggle('bg-transparent', !scrolled);
    
    // Keep both icon and text visible when scrolled
    if (scrolled) {
      logoIcon.style.color = '#3b82f6';
      logoText.style.color = '#1f2937';
    } else {
      logoIcon.style.color = '#ffffff';
      logoText.style.color = '#ffffff';
    }
    
    navLinks.forEach(link => {
      link.classList.toggle('text-gray-700', scrolled);
      link.classList.toggle('hover:text-blue-600', scrolled);
      link.classList.toggle('text-white', !scrolled);
      link.classList.toggle('hover:text-blue-200', !scrolled);
    });
    mobileMenuButton.classList.toggle('text-gray-900', scrolled);
    mobileMenuButton.classList.toggle('text-white', !scrolled);
    // Refresh Lucide icons after class changes
    lucide.createIcons();
  };

  window.addEventListener('scroll', handleScroll);

  // Mobile Menu Toggle
  mobileMenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    menuIcon.classList.toggle('hidden', isMenuOpen);
    closeIcon.classList.toggle('hidden', !isMenuOpen);
    // Refresh Lucide icons after toggle
    lucide.createIcons();
  });

  // Counter Animation
  const counters = [
    { element: document.getElementById('counter-50000'), end: 50000, suffix: '+' },
    { element: document.getElementById('counter-200'), end: 200, suffix: '+' },
    { element: document.getElementById('counter-15000'), end: 15000, suffix: '+' },
    { element: document.getElementById('counter-98'), end: 98, suffix: '%' }
  ];

  counters.forEach(counter => {
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          const startTime = Date.now();
          const duration = 2000;
          const endTime = startTime + duration;

          const updateCounter = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const count = Math.floor(progress * counter.end);
            counter.element.textContent = count.toLocaleString() + counter.suffix;
            if (now < endTime) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(counter.element);
  });
});

// Functional buttons for home page
function showDemo() {
  alert('Demo video will be available soon! For now, explore our platform by signing up.');
}

function registerEvent(eventType) {
  const eventNames = {
    'tech-workshop': 'Tech Career Workshop',
    'networking-night': 'Alumni Networking Night',
    'startup-pitch': 'Startup Pitch Session'
  };
  
  alert(`Thank you for your interest in ${eventNames[eventType]}! Registration confirmation will be sent to your email.`);
}

function showSuccessStories() {
  alert('Success Stories section coming soon! Check out our testimonials above for now.');
}

function showHelpCenter() {
  alert('Help Center: For immediate assistance, please contact support@nextpath.com');
}

function showContactUs() {
  alert('Contact Us:\nEmail: support@nextgendevops.com\nPhone: +91-XXXXXXXXXX\nAddress: NextGen devops ,SNS Tech , coimbatore');
}

function showPrivacyPolicy() {
  alert('Privacy Policy: We protect your data with industry-standard security measures. Full policy available after signup.');
}

function showTermsOfService() {
  alert('Terms of Service: By using NextPath, you agree to our community guidelines and platform rules. Full terms available after signup.');
}
