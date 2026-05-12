*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial;
}

body{
    background:#f4f4f4;
}

header{
    background:#0f172a;
    color:white;
    text-align:center;
    padding:40px;
}

header h1{
    font-size:40px;
}

header p{
    margin-top:10px;
}

.contact{
    margin-top:20px;
}

.contact a{
    color:#38bdf8;
    text-decoration:none;
}

.projects{
    display:flex;
    justify-content:center;
    gap:30px;
    padding:50px;
    flex-wrap:wrap;
}

.card{
    background:white;
    width:300px;
    border-radius:15px;
    overflow:hidden;
    box-shadow:0 4px 10px rgba(0,0,0,0.2);
    transition:0.3s;
}

.card:hover{
    transform:translateY(-10px);
}

.card img{
    width:100%;
    height:200px;
    object-fit:cover;
}

.card h2{
    padding:15px;
}

.card p{
    padding:0 15px 20px;
}

.card button{
    margin:15px;
    padding:10px 20px;
    border:none;
    background:#2563eb;
    color:white;
    border-radius:8px;
    cursor:pointer;
}

.card button:hover{
    background:#1d4ed8;
}        if (viewButton) {
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
