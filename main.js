/* ==========================================================================
   LÓGICA JAVASCRIPT MODULAR Y ACCESIBLE (ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormValidation();
  initScrollAnimations();
});

/**
  1. Menú Hamburguesa Responsivo
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
  2. Validación de Formularios con Estados Visuales (Éxito / Error)
 */
function initFormValidation() {
  const fullContactForm = document.getElementById('fullContactForm');
  const formStatus = document.getElementById('formStatus');

  if (fullContactForm) {
    fullContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validación simple
      if (!firstName || !lastName || !email || !message) {
        showStatus('Por favor, completa todos los campos requeridos.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Ingresa un correo electrónico válido.', 'error');
        return;
      }

      // Simulación de envío exitoso
      showStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      fullContactForm.reset();
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 5000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/**
  3. Animaciones Suaves de Aparición (Intersection Observer)
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar efecto de fade-in a secciones principales
  const animatedElements = document.querySelectorAll('section, .service-item, .portfolio-item');
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}