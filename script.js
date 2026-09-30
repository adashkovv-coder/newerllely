/* ============================================================
   NEWERLLELY — JS
   ============================================================ */

/* ---------- 🔧 ЗАМЕНИ ЭТИ ДАННЫЕ ---------- */
const WHATSAPP_NUMBER = '79999999999';
const TELEGRAM_USER   = 'newerllely';
/* ------------------------------------------- */



/* ============ 2. LIGHTBOX ============ */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox(){
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


/* ============ 3. REVEAL ============ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add('on');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
