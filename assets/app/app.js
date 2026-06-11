/* ═══════════════════════════════════════════════════
   EMPRESAS SALFATE SpA — app.js
   ═══════════════════════════════════════════════════ */

/* ─── FLOTA TABS ─── */
function showFleet(id, el) {
  document.querySelectorAll('.fleet-list').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.fleet-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('fleet-' + id).classList.add('active');
  el.classList.add('active');
}

/* ─── FADE IN ─── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* ─── URL LIMPIA AL NAVEGAR ─── */
// 1. Limpia el hash al hacer scroll entre secciones
const secciones = document.querySelectorAll('section[id]');
const urlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      history.replaceState(null, '', window.location.pathname);
    }
  });
}, { threshold: 0.4 });
secciones.forEach(s => urlObs.observe(s));

// 2. Intercepta clics en links ancla para que nunca aparezca el hash
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    }
  });
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');
const overlay   = document.getElementById('navOverlay');

function toggleMenu(open) {
  const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.classList.toggle('active', isOpen);
  overlay.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());
overlay.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.nav-link-item').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

/* ─── EMAILJS ─── */
emailjs.init("rnBzz29iqUHyigb7J");

/* ─── FORMULARIO ─── */
function validarCampo(id, errId, validacion, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!validacion(el.value.trim())) {
    el.classList.add('input-error');
    err.textContent = msg;
    return false;
  }
  el.classList.remove('input-error');
  err.textContent = '';
  return true;
}

function enviarFormulario() {
  const okNombre  = validarCampo('f-nombre',  'err-nombre',  v => v.length >= 2,                          'Por favor ingrese su nombre.');
  const okEmail   = validarCampo('f-email',   'err-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),  'Ingrese un email válido.');
  const okMensaje = validarCampo('f-mensaje', 'err-mensaje', v => v.length >= 10,                         'El mensaje debe tener al menos 10 caracteres.');

  if (!okNombre || !okEmail || !okMensaje) return;

  document.getElementById('btn-text').style.display    = 'none';
  document.getElementById('btn-loading').style.display = 'inline';
  document.getElementById('btnEnviar').disabled        = true;

  const templateParams = {
    nombre:   document.getElementById('f-nombre').value.trim(),
    empresa:  document.getElementById('f-empresa').value.trim() || '—',
    email:    document.getElementById('f-email').value.trim(),
    telefono: document.getElementById('f-telefono').value.trim() || '—',
    mensaje:  document.getElementById('f-mensaje').value.trim()
  };

  emailjs.send("service_a88ti98", "template_wk5sbpi", templateParams)
    .then(() => {
      document.getElementById('contact-form-wrap').style.display = 'none';
      document.getElementById('form-success').style.display      = 'flex';
    })
    .catch(error => {
      console.error('Error EmailJS:', error);
      alert('Hubo un error al enviar. Por favor intenta de nuevo.');
      document.getElementById('btn-text').style.display    = 'inline';
      document.getElementById('btn-loading').style.display = 'none';
      document.getElementById('btnEnviar').disabled        = false;
    });
}

function resetForm() {
  document.getElementById('contact-form-wrap').style.display = 'block';
  document.getElementById('form-success').style.display      = 'none';
  ['f-nombre','f-empresa','f-email','f-telefono','f-mensaje'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('btn-text').style.display    = 'inline';
  document.getElementById('btn-loading').style.display = 'none';
  document.getElementById('btnEnviar').disabled        = false;
  ['f-nombre','f-email','f-mensaje'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
  });
}

/* ═══════════════════════════════════════════════════
   GALERÍAS POR OBRA
   ═══════════════════════════════════════════════════ */
const galerias = {

  /* ── OBRAS EJECUTADAS (1 foto — solo abre imagen) ── */
  canquen: [
    { src:'./assets/img/Obras ejecutadas/obra_craquen siena.webp', cap:'Urbanización Condominio Canquén' },
  ],
  platina: [
    { src:'./assets/img/Obras ejecutadas/barrio_la_platina.jpg', cap:'Urbanización La Platina I y II' },
  ],
  ovejeria: [
    { src:'./assets/img/Obras ejecutadas/arriendo camiones.jpeg', cap:'Tranque Ovejería – Arriendo de Camiones' },
  ],
  balmaceda: [
    { src:'./assets/img/Obras ejecutadas/edificio balmaceda.jpg', cap:'Excavación Masiva – Edificio Balmaceda' },
  ],

  /* ── OBRAS EN EJECUCIÓN (7 fotos con galería) ── */
  besalco: [
    { src:'./assets/img/obras en ejecucion/besalco.webp',           cap:'Obras Ferroviarias Tramo 2 – Vista 1' },
    { src:'./assets/img/obras en ejecucion/besalco_2.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 2' },
    { src:'./assets/img/obras en ejecucion/besalco_3.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 3' },
    { src:'./assets/img/obras en ejecucion/besalco_4.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 4' },
    { src:'./assets/img/obras en ejecucion/besalco_5.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 5' },
    { src:'./assets/img/obras en ejecucion/besalco_6.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 6' },
    { src:'./assets/img/obras en ejecucion/besalco_7.webp',         cap:'Obras Ferroviarias Tramo 2 – Vista 7' },
  ],
  moller: [
    { src:'./assets/img/obras en ejecucion/moller.webp',           cap:'Los Trapenses Etapa 8 – Vista 1' },
    { src:'./assets/img/obras en ejecucion/moller_2.webp',          cap:'Los Trapenses Etapa 8 – Vista 2' },
    { src:'./assets/img/obras en ejecucion/moller_3.webp',          cap:'Los Trapenses Etapa 8 – Vista 3' },
    { src:'./assets/img/obras en ejecucion/moller_4.webp',          cap:'Los Trapenses Etapa 8 – Vista 4' },
    { src:'./assets/img/obras en ejecucion/moller_5.webp',          cap:'Los Trapenses Etapa 8 – Vista 5' },
    { src:'./assets/img/obras en ejecucion/moller_6.webp',          cap:'Los Trapenses Etapa 8 – Vista 6' },
    { src:'./assets/img/obras en ejecucion/moller_7.webp',          cap:'Los Trapenses Etapa 8 – Vista 7' },
  ],
  mariscal: [
    { src:'./assets/img/obras en ejecucion/el mariscal.webp',      cap:'Proyecto El Mariscal – Vista 1' },
    { src:'./assets/img/obras en ejecucion/mariscal_2.webp',        cap:'Proyecto El Mariscal – Vista 2' },
    { src:'./assets/img/obras en ejecucion/mariscal_3.webp',        cap:'Proyecto El Mariscal – Vista 3' },
    { src:'./assets/img/obras en ejecucion/mariscal_4.webp',        cap:'Proyecto El Mariscal – Vista 4' },
    { src:'./assets/img/obras en ejecucion/mariscal_5.webp',        cap:'Proyecto El Mariscal – Vista 5' },
    { src:'./assets/img/obras en ejecucion/mariscal_6.webp',        cap:'Proyecto El Mariscal – Vista 6' },
    { src:'./assets/img/obras en ejecucion/mariscal_7.webp',        cap:'Proyecto El Mariscal – Vista 7' },
  ],
};

/* ─── LIGHTBOX ENGINE ─── */
let galeriaActual = [];
let lbIdx = 0;

function abrirGaleria(obra, idx) {
  galeriaActual = galerias[obra];
  if (!galeriaActual || galeriaActual.length === 0) return;
  lbIdx = idx;
  actualizarLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function actualizarLightbox() {
  document.getElementById('lb-img').src             = galeriaActual[lbIdx].src;
  document.getElementById('lb-caption').textContent = galeriaActual[lbIdx].cap;
  const counter = document.getElementById('lb-counter');
  const nav     = document.querySelectorAll('.lb-prev, .lb-next');
  if (galeriaActual.length > 1) {
    counter.textContent   = (lbIdx + 1) + ' / ' + galeriaActual.length;
    counter.style.display = '';
    nav.forEach(b => b.style.display = '');
  } else {
    counter.textContent   = '';
    counter.style.display = 'none';
    nav.forEach(b => b.style.display = 'none');
  }
}

function cerrarLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function cambiarSlide(dir) {
  lbIdx = (lbIdx + dir + galeriaActual.length) % galeriaActual.length;
  actualizarLightbox();
}

/* Teclado */
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape')     cerrarLightbox();
  if (e.key === 'ArrowRight') cambiarSlide(1);
  if (e.key === 'ArrowLeft')  cambiarSlide(-1);
});

/* Touch / swipe en móvil */
let touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
document.getElementById('lightbox').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) cambiarSlide(diff > 0 ? 1 : -1);
});

/* Actualizar badges de foto-count automáticamente */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.obra-card[onclick]').forEach(card => {
    const match = card.getAttribute('onclick').match(/abrirGaleria\('(\w+)'/);
    if (!match) return;
    const key   = match[1];
    const badge = card.querySelector('.obra-card__foto-count');
    if (badge && galerias[key]) {
      badge.textContent = '📷 ' + galerias[key].length + ' fotos';
    }
  });
});