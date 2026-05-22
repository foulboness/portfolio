 /* ── THEME ── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  themeBtn.addEventListener('click', () => {
    const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  });

  /* ── HAMBURGER ── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.style.display = mob.style.display === 'flex' ? 'none' : 'flex';
  });
  function closeMobile() {
    ham.classList.remove('open');
    mob.style.display = 'none';
  }

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── MODALS ── */
  function openModal(id) {
    document.getElementById('modal-' + id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }
  function closeModalOut(e, id) {
    if(e.target === e.currentTarget) closeModal(id);
  }
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => { m.classList.remove('open'); document.body.style.overflow = ''; });
  });

  /* ── CONTACT FORM ── */
  /* ── CONTACT FORM ── */
    async function submitForm() {
      const n = document.getElementById('fname').value.trim();
      const em = document.getElementById('femail').value.trim();
      const ms = document.getElementById('fmsg').value.trim();
      const successDiv = document.getElementById('formSuccess');
      const errorDiv = document.getElementById('formError');
      const btn = document.getElementById('submitBtn');

      // Reset messages
      successDiv.style.display = 'none';
      errorDiv.style.display = 'none';

      if (!n || !em || !ms) {
        alert('Please fill in all fields.');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(em)) {
        errorDiv.textContent = 'Invalid email address.';
        errorDiv.style.display = 'block';
        return;
      }

      // Change button text to indicate loading
      const originalBtnHTML = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

     try {
        // Send data to your Vercel Python Serverless Function
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: n,
            email: em,
            message: ms
          })
        });

        if (response.ok) {
          successDiv.style.display = 'block';
          document.getElementById('fname').value = '';
          document.getElementById('femail').value = '';
          document.getElementById('fmsg').value = '';
          setTimeout(() => successDiv.style.display = 'none', 4000);
        } else {
          errorDiv.textContent = 'Server error. Please try again later.';
          errorDiv.style.display = 'block';
        }
      } catch (error) {
        errorDiv.textContent = 'Failed to connect. Check your internet connection.';
        errorDiv.style.display = 'block';
      } finally {
        btn.innerHTML = originalBtnHTML;
        btn.disabled = false;
      }
    }

  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navAs.forEach(a => {
      a.style.color = 'var(--text-dim)'; // Reset
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--text)'; // Highlight
      }
    });
  });