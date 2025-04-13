// Menu fixo e mudança de cor ao rolar
const header = document.querySelector('.header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Slider de depoimentos
const depoimentos = document.querySelectorAll('.depoimento');
let currentDepoimento = 0;

function showDepoimento(index) {
    depoimentos.forEach((depoimento, i) => {
        depoimento.style.display = i === index ? 'block' : 'none';
    });
}

function nextDepoimento() {
    currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
    showDepoimento(currentDepoimento);
}

// Inicializar slider
showDepoimento(0);
setInterval(nextDepoimento, 5000);

// Validação do formulário
const form = document.querySelector('.contato-form');
const formGroups = document.querySelectorAll('.form-group');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const value = input.value.trim();
        
        if (!value) {
            isValid = false;
            group.classList.add('error');
        } else {
            group.classList.remove('error');
            
            // Validação específica para email
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    group.classList.add('error');
                }
            }
        }
    });
    
    if (isValid) {
        // Simulação de envio bem-sucedido
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Reset do formulário após 2 segundos
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
                
                // Remove classes de erro
                formGroups.forEach(group => group.classList.remove('error'));
            }, 2000);
        }, 1500);
    }
});

// Animações ao scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.beneficio-card, .solucao-card, .resultado-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Adiciona animação aos números dos resultados
    const resultadoNumeros = document.querySelectorAll('.resultado-numero');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('pt-BR');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    const observerNumeros = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observerNumeros.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    resultadoNumeros.forEach(numero => {
        const target = parseInt(numero.textContent.replace(/\D/g, ''));
        numero.setAttribute('data-target', target);
        numero.textContent = '0';
        observerNumeros.observe(numero);
    });
});

// Menu mobile (para telas menores)
const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        if (!document.querySelector('.menu-button')) {
            header.querySelector('.container').appendChild(menuButton);
        }
    } else {
        const menuButton = document.querySelector('.menu-button');
        if (menuButton) {
            menuButton.remove();
        }
        nav.classList.remove('active');
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

document.addEventListener('DOMContentLoaded', function() {
    const solucaoGrid = document.querySelector('.solucao-grid');
    let isHovered = false;

    solucaoGrid.addEventListener('mouseenter', () => {
        isHovered = true;
        solucaoGrid.style.animationPlayState = 'paused';
    });

    solucaoGrid.addEventListener('mouseleave', () => {
        isHovered = false;
        solucaoGrid.style.animationPlayState = 'running';
    });
});

// Interatividade do fundo
document.addEventListener('mousemove', (e) => {
    const interactive = document.querySelector('.interactive');
    const x = e.clientX;
    const y = e.clientY;
    
    interactive.style.transform = `translate(${x - window.innerWidth/2}px, ${y - window.innerHeight/2}px)`;
}); 