/* ============================================================
   NEWERLLELY — JS
   ============================================================ */

/* ---------- 🔧 ЗАМЕНИ ЭТИ ДАННЫЕ ---------- */
const WHATSAPP_NUMBER = '79999999999';
const TELEGRAM_USER   = 'newerllely';
/* ------------------------------------------- */


/* ============ 1. ФОРМА ============ */
const form = document.getElementById('order-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  const msg = `
🌟 Новая заявка на журнал

👤 Имя: ${data.name}
📞 Контакт: ${data.contact}
🎉 Повод: ${data.occasion}
📅 К дате: ${data.date || '—'}
📄 Листов: ${data.pages}
📦 Формат: ${data.type}

💬 Комментарий:
${data.comment || '—'}
  `.trim();

  const orders = JSON.parse(localStorage.getItem('nw_orders') || '[]');
  orders.push({...data, sentAt: new Date().toISOString()});
  localStorage.setItem('nw_orders', JSON.stringify(orders));

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

  form.innerHTML = `
    <div style="text-align:center; padding:60px 20px;">
      <h3 style="font-family:'Playfair Display',serif; font-size:32px; font-weight:400; margin-bottom:16px;">
        Спасибо! 💌
      </h3>
      <p style="font-size:16px; opacity:.75; max-width:420px; margin:0 auto; line-height:1.7;">
        Мы получили вашу заявку и свяжемся с вами в течение дня.<br>
        Если WhatsApp не открылся — напишите нам сами: <b>@${TELEGRAM_USER}</b>
      </p>
    </div>
  `;
});


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
