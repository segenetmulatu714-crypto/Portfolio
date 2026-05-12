document.addEventListener('DOMContentLoaded', function() {

    const projectURLs = {
        fashion: 'https://segenetmulatu.github.io/fashion-store',
        hotel: 'https://segenetmulatu.github.io/hotel-booking',
        food: 'https://segenetmulatu.github.io/food-delivery'
    };

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            
            if (e.target.classList.contains('view-project')) {
                return;
            }
            
            
            const projectType = this.dataset.project;
            const url = projectURLs[projectType];
            
            this.classList.add('clicked');
            
            
            setTimeout(() => {
                this.classList.remove('clicked');
                if (url) {
                    window.open(url, '_blank');
                } else {
                    showNotification('Project link coming soon!');
                }
            }, 200);
        });

        
        const viewButton = card.querySelector('.view-project');
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const projectType = card.dataset.project;
                const url = projectURLs[projectType];
                
                if (url) {
                    window.open(url, '_blank');
                } else {
                    showNotification('Project demo coming soon!');
                }
            });
        }
    });

    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.background = 'none';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    
    function showNotification(message) {
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
      
        if (e.key === 'p' && !e.ctrlKey && !e.metaKey) {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
