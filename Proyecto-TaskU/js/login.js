// js/login.js

(function () {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const messageEl = document.getElementById('login-message');

  const API_BASE = null; // Futuro: 'http://localhost:3000/api'

  // Helpers
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isInacapEmail = (email) =>
    ['@inacap.cl', '@alumnos.inacap.cl', '@profesor.inacap.cl'].some(d => email.endsWith(d));

  const showMsg = (msg, type = 'info') => {
    messageEl.textContent = msg;
    messageEl.style.color = type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : 'inherit';
  };

  const getInitials = (email) => {
    const base = email.split('@')[0].replace(/[._-]/g, ' ').trim();
    const parts = base.split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return base.slice(0, 2).toUpperCase();
  };

  const getName = (email) => {
    const base = email.split('@')[0].replace(/[._-]/g, ' ').trim();
    return base.charAt(0).toUpperCase() + base.slice(1);
  };

  // Evento submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showMsg('');

    let email = (emailInput.value || '').trim().toLowerCase();
    const password = passInput.value || '';

    // Validaciones de front
    if (!email || !password) {
      showMsg('Por favor completa todos los campos.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showMsg('Ingresa un correo válido.', 'error');
      emailInput.focus();
      return;
    }
    if (!isInacapEmail(email)) {
      // No bloqueamos, solo avisamos (puedes cambiar a bloqueo si lo necesitas)
      showMsg('Sugerencia: usa tu correo institucional (@inacap.cl).');
    }

    // FUTURO: Llamado real a API
    // try {
    //   const res = await fetch(`${API_BASE}/login`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });
    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data.error || 'Error de login');
    //   localStorage.setItem('auth.token', data.token);
    //   localStorage.setItem('auth.user', JSON.stringify(data.user));
    //   location.href = 'dashboard.html';
    //   return;
    // } catch (err) {
    //   showMsg(err.message || 'Error al iniciar sesión.', 'error');
    //   return;
    // }

    // Simulación (mientras no hay backend)
    if (password.length < 6) {
      showMsg('La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    const mockUser = {
      email,
      nombre: getName(email),
      iniciales: getInitials(email),
      rol: 'alumno' // Futuro: lo dará el backend
    };
    const mockToken = `mock.${btoa(email)}.${Date.now()}`;

    localStorage.setItem('auth.token', mockToken);
    localStorage.setItem('auth.user', JSON.stringify(mockUser));

    showMsg('Inicio de sesión exitoso. Redirigiendo…', 'success');
    setTimeout(() => { location.href = 'dashboard.html'; }, 400);
  });

  // UX: validación ligera on-blur
  emailInput.addEventListener('blur', () => {
    let email = (emailInput.value || '').trim().toLowerCase();
    if (email && isValidEmail(email) && !isInacapEmail(email)) {
      showMsg('Recuerda: puedes usar tu correo institucional (@inacap.cl).');
    } else if (email && !isValidEmail(email)) {
      showMsg('Formato de correo inválido.', 'error');
    } else {
      showMsg('');
    }
  });
})();
