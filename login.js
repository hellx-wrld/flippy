// Login logic
const form = document.getElementById('loginForm');
const errorDiv = document.getElementById('loginError');
form.onsubmit = async e => {
  e.preventDefault();
  errorDiv.textContent = '';
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Cari admin dan verifikasi password
  const res = await fetch('/admin/admins', { headers: { 'x-admin-token': password } });
  if (res.ok) {
    localStorage.setItem('adminToken', password);
    window.location = 'index.html';
  } else {
    errorDiv.textContent = 'Login gagal. Username/password salah atau tidak aktif.';
  }
};
