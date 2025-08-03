/**
 * Jurema Vet - Clínica Veterinária
 * Script principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navList = document.querySelector('.nav-list');
    const backToTopButton = document.querySelector('.back-to-top');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    // Função para adicionar classe ao header quando rolar a página
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Função para mostrar/esconder o botão de voltar ao topo
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    // Função para criar menu mobile
    function toggleMobileMenu() {
        navList.classList.toggle('active');
        mobileMenuIcon.querySelector('i').classList.toggle('fa-bars');
        mobileMenuIcon.querySelector('i').classList.toggle('fa-times');
    }
    
    // Função para marcar link ativo no menu
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Função para rolagem suave ao clicar nos links do menu
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile após clicar
                if (navList.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        }
    }
    
    // Função para auto-scroll do slider de depoimentos
    function autoScrollTestimonials() {
        if (testimonialSlider) {
            let scrollAmount = 0;
            const slideWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 32; // Card width + gap
            
            setInterval(() => {
                testimonialSlider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                
                scrollAmount += slideWidth;
                
                // Reset scroll position when reaching the end
                if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.offsetWidth) {
                    scrollAmount = 0;
                }
            }, 5000); // Auto-scroll every 5 seconds
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('scroll', toggleBackToTopButton);
    window.addEventListener('scroll', setActiveNavLink);
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', toggleMobileMenu);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Inicializar funções
    toggleHeaderClass();
    toggleBackToTopButton();
    setActiveNavLink();
    autoScrollTestimonials();
    
    // Adicionar classe para menu mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-list {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background-color: var(--light-color);
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                box-shadow: var(--shadow-md);
                z-index: 999;
            }
            
            .nav-list.active {
                left: 0;
            }
            
            .nav-list li {
                margin: 1.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
});