/* THEME TOGGLE */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Apply saved theme on load
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

/* NAV SCROLL */
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
});

/* ACTIVE LINK */
const ids = ['work', 'about', 'contact'];
function setActive() {
  let current = '';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });

/* SKILL BARS */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar div').forEach(b => b.style.width = b.dataset.w);
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const skillsEl = document.querySelector('.skills');
if (skillsEl) skillObs.observe(skillsEl);

/* FORM */
function submitForm() {
  const name  = document.getElementById('fname');
  const email = document.getElementById('femail');
  const msg   = document.getElementById('fmessage');
  [name, email, msg].forEach(i => i.classList.remove('error'));
  if (!name.value.trim())  name.classList.add('error');
  if (!email.value.trim()) email.classList.add('error');
  if (!msg.value.trim())   msg.classList.add('error');
  if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) return;

  const btn = document.querySelector('.form button');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('formCard').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }, 1000);
}

function resetForm() {
  document.getElementById('formCard').style.display = '';
  document.getElementById('formSuccess').classList.remove('show');
  document.querySelectorAll('.field input, .field textarea').forEach(i => i.value = '');
  const btn = document.querySelector('.form button');
  btn.textContent = 'Enviar mensagem →';
  btn.disabled = false;
}

document.querySelectorAll('.field input, .field textarea').forEach(i => {
  i.addEventListener('input', () => i.classList.remove('error'));
});
