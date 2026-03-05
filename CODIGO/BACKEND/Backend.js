
/* ═══════════════════════════════════════
  SONIDO DE CLICK
═══════════════════════════════════════ */
const clickSound = new Audio('../../AUDIO/Click.mp3');

document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  const btn  = e.target.closest('button');
  
  if (link) {
    e.preventDefault();
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    clickSound.onended = () => { window.location.href = link.href; };
  } else if (btn) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }
});

/* ═══════════════════════════════════════
   MENÚ HAMBURGUESA (mobile)
═══════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });
}
/* ═══════════════════════════════════════
   EMAILJS CONFIGURACIÓN
═══════════════════════════════════════ */
const SERVICE_ID  = "service_z7dyi3n";
const TEMPLATE_ID = "template_t2kclal";
const PUBLIC_KEY  = "nDAc_2WyXqW-SGwtN";

emailjs.init(PUBLIC_KEY);

/* ═══════════════════════════════════════
   FORMULARIO DE CONTACTO
═══════════════════════════════════════ */
function handleForm(event) {
  event.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('formStatus');
  const btn     = event.target.querySelector("button[type='submit']");

  /* ── Validación ── */
  if (!name || !email || !message) {
    status.textContent = 'Por favor, completa todos los campos.';
    status.style.color = '#888';
    return;
  }

  /* ── Estado de carga ── */
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  status.textContent = '';
  status.style.color = '';

  /* ── Parámetros del template ── */
  const templateParams = {
    name,
    email,
    message,
    time: new Date().toLocaleString('es-MX', {
      dateStyle: 'long',
      timeStyle: 'short',
    }),
  };

  /* ── Envío ── */
  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(() => {
      status.textContent = `✔ ¡Gracias, ${name}! Tu mensaje fue enviado correctamente.`;
      status.style.color = '#e63946';
      event.target.reset();
      setTimeout(() => { status.textContent = ''; }, 5000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      status.textContent = '✖ Hubo un error. Intenta de nuevo.';
      status.style.color = '#888';
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
    });
}