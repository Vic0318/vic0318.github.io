/**
 * PORTAFOLIO VIC0318 - SCRIPT INTERACTIVO JS
 * Funcionalidades: Selector de Tema, Filtrado de Proyectos, Efecto Máquina de Escribir, Menú Móvil y Contacto.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initMobileMenu();
  initActiveNavObserver();
  initProjectFilters();
  initCopyEmail();
});

/* ==========================================================================
   1. GESTOR DE TEMA (CLARO / OSCURO) CON PERSISTENCIA Y DETECCIÓN DEL SO
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Función para aplicar tema
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  // Alternar al hacer clic
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Reaccionar si el usuario cambia el tema del sistema operativo
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ==========================================================================
   2. EFECTO MÁQUINA DE ESCRIBIR EN EL HERO
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'Desarrollador de Software & Cloud',
    'Full Stack Web Platforms',
    'Docker, IaaS & Microservicios',
    'PostgreSQL, MariaDB & CouchDB',
    'Especialista en TypeScript & Python'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pausa al completar la palabra
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pausa antes de la siguiente palabra
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. MENÚ DE NAVEGACIÓN MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  }

  toggleBtn.addEventListener('click', toggleMenu);

  // Cerrar al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   4. ENLACE ACTIVO EN SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. FILTRADO DE PROYECTOS POR CATEGORÍA
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. COPIAR CORREO ELECTRÓNICO AL PORTAPAPELES
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailText.textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback clásico
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }
    } catch (err) {
      console.error('Error al copiar correo:', err);
    }
  });
}

/* ==========================================================================
   7. MANEJADOR DEL FORMULARIO DE CONTACTO
   ========================================================================== */
window.handleContactSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!name || !email || !message) {
    status.className = 'form-status error';
    status.textContent = 'Por favor completa todos los campos requeridos.';
    return;
  }

  // Feedback al usuario
  status.className = 'form-status success';
  status.textContent = '¡Gracias! Abriendo tu cliente de correo para enviar el mensaje...';
  submitBtn.disabled = true;

  // Abrir cliente de correo predeterminado mediante mailto
  const recipient = 'vamv2003@gmail.com';
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject || 'Contacto desde el Portafolio')}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;

  setTimeout(() => {
    window.location.href = mailtoUrl;
    submitBtn.disabled = false;
    document.getElementById('contact-form').reset();
  }, 1000);
};
