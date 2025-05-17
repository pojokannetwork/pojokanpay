// Kirim JWT di setiap request
axios.interceptors.request.use(cfg => {
  const t = localStorage.getItem('jwt');
  if (t) cfg.headers.Authorization = 'Bearer ' + t;
  return cfg;
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.sidebar button');
  const sections = document.querySelectorAll('.section');

  // Toggle sidebar menu dan tampilkan section terkait
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(btn.dataset.section).classList.add('active');
    });
  });

  // Default ke dashboard saat pertama load
  document.querySelector('.sidebar nav button').click();

  // Handle login form submission
  document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('jwt', res.data.token);
      document.getElementById('login-msg').textContent = 'Login berhasil!';
      // Pindah ke dashboard
      document.querySelector('[data-section="dashboard"]').click();
    } catch {
      document.getElementById('login-msg').textContent = 'Login gagal!';
    }

    e.target.reset();
  });
});
