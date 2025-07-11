// Dashboard frontend: fetch statistik & tampilkan chart, notifikasi real-time
import { Leaderboard } from './components/Leaderboard.js';
import { IdleStats } from './components/IdleStats.js';
import { ExportImportPanel } from './components/ExportImportPanel.js';

const dashboard = document.getElementById('dashboard');
const notifications = document.getElementById('notifications');
const socket = io('http://localhost:3000');

function showNotification(msg) {
  const div = document.createElement('div');
  div.className = 'alert alert-info';
  div.innerText = escapeHtml(msg);
  notifications.prepend(div);
  setTimeout(() => div.remove(), 7000);
}

// Notifikasi real-time
socket.on('apiKeyCreated', data => showNotification('API Key dibuat: ' + data.key));
socket.on('usersRestored', data => showNotification('Restore user: ' + data.count + ' user')); 
socket.on('supportTicketCreated', data => showNotification('Tiket support baru: ' + data.subject));
socket.on('errorLogged', data => showNotification('Error: ' + data.error));
socket.on('bigTransaction', data => showNotification('Transaksi besar: ' + data.userId + ' ' + data.type + ' ' + data.amount));
socket.on('transaction', data => showNotification('Transaksi: ' + data.userId + ' ' + data.type + ' ' + data.amount));
socket.on('roleChanged', data => showNotification(`Role user ${data.userId} diubah (${data.action})`));

// Fetch dashboard statistik
fetch('/admin/dashboard', { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
  .then(r => r.json())
  .then(data => {
    dashboard.innerHTML = `
      <div class="row">
        <div class="col">Total User: <b>${data.totalUser}</b></div>
        <div class="col">Total FC: <b>${data.totalFC}</b></div>
        <div class="col">Total Bank: <b>${data.totalBank}</b></div>
        <div class="col">Passive Income: <b>${data.passiveIncome}</b></div>
        <div class="col">Gacha Fragment: <b>${data.gachaFragment}</b></div>
        <div class="col">Asuransi Bank: <b>${data.bankInsurance ? 'Aktif' : 'Tidak'}</b></div>
        <div class="col">Prestige Tier: <b>${data.prestigeTier}</b></div>
        <div class="col">Achievement Streak: <b>${data.achievementStreak}</b></div>
        <div class="col">Event Global: <b>${data.eventGlobal || '-'}</b></div>
      </div>
      <div class="row">
        <div class="col">Quest Adaptif: <b>${data.questAdaptif?.type || '-'}</b> (${data.questAdaptif?.target || '-'})</div>
        <div class="col">Leaderboard Dinamis: <b>${data.leaderboardDinamis || '-'}</b></div>
        <div class="col">Achievement Hidden: <b>${data.achievementHidden?.join(', ') || '-'}</b></div>
      </div>
    `;
  });

// Fetch growth data & tampilkan chart
fetch('/admin/analytics', { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
  .then(r => r.json())
  .then(data => {
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.growth.map(g => g.date),
        datasets: [{
          label: 'User Growth',
          data: data.growth.map(g => g.count),
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  });

// Analytics lanjutan: top saldo, top bank, distribusi level
fetch('/admin/analytics/advanced', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
  .then(r=>r.json())
  .then(data => {
    // Top saldo
    let html = '<h3>Top Saldo</h3><table class="table table-sm"><thead><tr><th>UserID</th><th>Username</th><th>Saldo</th></tr></thead><tbody>';
    data.topSaldo.forEach(u => {
      html += `<tr><td>${u.userId}</td><td>${u.username||''}</td><td>${u.balance}</td></tr>`;
    });
    html += '</tbody></table>';
    // Top bank
    html += '<h3>Top Bank</h3><table class="table table-sm"><thead><tr><th>UserID</th><th>Username</th><th>Bank</th></tr></thead><tbody>';
    data.topBank.forEach(u => {
      html += `<tr><td>${u.userId}</td><td>${u.username||''}</td><td>${u.bank}</td></tr>`;
    });
    html += '</tbody></table>';
    // Distribusi level chart
    const chartDiv = document.createElement('div');
    chartDiv.innerHTML = '<h3>Distribusi Level</h3><canvas id="levelDistChart" height="80"></canvas>';
    dashboard.appendChild(chartDiv);
    dashboard.insertAdjacentHTML('beforeend', html);
    const ctx = document.getElementById('levelDistChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.levelDist.map(l=>l._id),
        datasets: [{
          label: 'Jumlah User',
          data: data.levelDist.map(l=>l.count),
          backgroundColor: 'rgba(54,162,235,0.7)'
        }]
      }
    });
  });

// Tampilkan tabel user
function renderUsers(users) {
  let html = '<h3>User List</h3><table class="table table-sm"><thead><tr><th>UserID</th><th>Username</th><th>Balance</th><th>Level</th></tr></thead><tbody>';
  users.forEach(u => {
    html += `<tr><td>${u.userId}</td><td>${u.username || ''}</td><td>${u.balance}</td><td>${u.level}</td></tr>`;
  });
  html += '</tbody></table>';
  dashboard.insertAdjacentHTML('beforeend', html);
}
fetch('/admin/users?limit=10', { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
  .then(r => r.json())
  .then(data => renderUsers(data.users));

// Tampilkan tabel support ticket
function renderTickets(tickets) {
  let html = '<h3>Support Tickets</h3><table class="table table-sm"><thead><tr><th>ID</th><th>UserID</th><th>Subject</th><th>Status</th><th>Action</th></tr></thead><tbody>';
  tickets.forEach(t => {
    html += `<tr><td>${t._id}</td><td>${t.userId}</td><td>${t.subject}</td><td>${t.status}</td><td><button class='btn btn-sm btn-info' onclick='showTicket("${t._id}")'>Detail</button> <button class='btn btn-sm btn-success' onclick='closeTicket("${t._id}")'>Close</button></td></tr>`;
  });
  html += '</tbody></table>';
  dashboard.insertAdjacentHTML('beforeend', html);
}
window.closeTicket = function(id) {
  fetch(`/admin/support-tickets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken') || '' },
    body: JSON.stringify({ status: 'closed' })
  }).then(() => location.reload());
};
fetch('/admin/support-tickets', { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
  .then(r => r.json())
  .then(data => renderTickets(data));

// Tabel API Key & Manajemen
function renderApiKeys(keys) {
  let html = '<h3>API Keys</h3><table class="table table-sm"><thead><tr><th>Key</th><th>Desc</th><th>Active</th><th>Expires</th><th>Action</th></tr></thead><tbody>';
  keys.forEach(k => {
    html += `<tr><td style='font-size:10px'>${k.key}</td><td>${k.description||''}</td><td>${k.isActive?'Yes':'No'}</td><td>${k.expiresAt?new Date(k.expiresAt).toLocaleDateString():'-'}</td><td>
      <button class='btn btn-sm btn-warning' onclick='toggleApiKey("${k._id}",${!k.isActive})'>${k.isActive?'Nonaktifkan':'Aktifkan'}</button>
      <button class='btn btn-sm btn-danger' onclick='deleteApiKey("${k._id}")'>Hapus</button>
    </td></tr>`;
  });
  html += '</tbody></table>';
  html += `<form id='addApiKeyForm' class='mt-2'><input type='text' placeholder='Deskripsi' id='apiDesc' class='form-control mb-1'><input type='text' placeholder='Permissions (comma separated)' id='apiPerm' class='form-control mb-1'><button class='btn btn-success btn-sm'>Tambah API Key</button></form>`;
  dashboard.insertAdjacentHTML('beforeend', html);
  document.getElementById('addApiKeyForm').onsubmit = function(e) {
    e.preventDefault();
    fetch('/admin/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
      body: JSON.stringify({ description: document.getElementById('apiDesc').value, permissions: document.getElementById('apiPerm').value.split(',').map(s=>s.trim()) })
    }).then(()=>location.reload());
  };
}
window.toggleApiKey = function(id, active) {
  fetch(`/admin/api-keys/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
    body: JSON.stringify({ isActive: active })
  }).then(()=>location.reload());
};
window.deleteApiKey = function(id) {
  fetch(`/admin/api-keys/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' }
  }).then(()=>location.reload());
};
fetch('/admin/api-keys', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
  .then(r=>r.json()).then(renderApiKeys);

// Manajemen Admin & Role
function renderAdmins(admins) {
  let html = '<h3>Manajemen Admin</h3><table class="table table-sm"><thead><tr><th>Username</th><th>Roles</th><th>Status</th><th>Aksi</th></tr></thead><tbody>';
  admins.forEach(a => {
    html += `<tr><td>${a.username}</td><td>${(a.roles||[]).join(', ')}</td><td>${a.isActive?'Aktif':'Nonaktif'}</td><td>
      <button class='btn btn-sm btn-warning' onclick='toggleAdminActive("${a._id}",${!a.isActive})'>${a.isActive?'Nonaktifkan':'Aktifkan'}</button>
      <button class='btn btn-sm btn-danger' onclick='deleteAdmin("${a._id}")'>Hapus</button>
    </td></tr>`;
  });
  html += '</tbody></table>';
  html += `<form id='addAdminForm' class='mt-2 row g-2'>
    <div class='col'><input type='text' class='form-control' id='adminUser' placeholder='Username'></div>
    <div class='col'><input type='password' class='form-control' id='adminPass' placeholder='Password'></div>
    <div class='col'><input type='text' class='form-control' id='adminRoles' placeholder='Roles (comma separated)'></div>
    <div class='col'><button class='btn btn-success btn-sm'>Tambah Admin</button></div>
  </form>`;
  dashboard.insertAdjacentHTML('beforeend', html);
  document.getElementById('addAdminForm').onsubmit = function(e) {
    e.preventDefault();
    fetch('/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
      body: JSON.stringify({ username: document.getElementById('adminUser').value, password: document.getElementById('adminPass').value, roles: document.getElementById('adminRoles').value.split(',').map(s=>s.trim()) })
    }).then(()=>location.reload());
  };
}
window.toggleAdminActive = function(id, active) {
  fetch(`/admin/admins/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
    body: JSON.stringify({ isActive: active })
  }).then(()=>location.reload());
};
window.deleteAdmin = function(id) {
  fetch(`/admin/admins/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' }
  }).then(()=>location.reload());
};
fetch('/admin/admins', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
  .then(r=>r.json()).then(renderAdmins);

// Form broadcast & notifikasi
const broadcastDiv = document.createElement('div');
broadcastDiv.innerHTML = `
  <h3>Broadcast & Notifikasi</h3>
  <form id='broadcastForm' class='mb-3'>
    <div class='row g-2'>
      <div class='col'><input type='text' class='form-control' id='bcTarget' placeholder='Channel/User ID'></div>
      <div class='col'><select class='form-select' id='bcType'><option value='channel'>Channel</option><option value='user'>User</option></select></div>
      <div class='col'><select class='form-select' id='bcFormat'><option value='text'>Pesan Biasa</option><option value='embed'>Embed</option></select></div>
    </div>
    <textarea class='form-control mt-2' id='bcMsg' placeholder='Pesan'></textarea>
    <button class='btn btn-primary mt-2'>Kirim Broadcast</button>
  </form>
`;
dashboard.appendChild(broadcastDiv);
document.getElementById('broadcastForm').onsubmit = function(e) {
  e.preventDefault();
  const type = document.getElementById('bcType').value;
  const target = document.getElementById('bcTarget').value;
  const message = document.getElementById('bcMsg').value;
  const format = document.getElementById('bcFormat').value;
  fetch('/admin/broadcast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
    body: JSON.stringify({ type, target, message, format })
  }).then(r=>r.json()).then(res=>{
    showNotification(res.success ? 'Broadcast terkirim!' : 'Gagal: '+(res.error||'Unknown error'));
  });
};

// === Advanced Search & Filter User ===
// Form pencarian/filter user
const searchDiv = document.createElement('div');
searchDiv.innerHTML = `
  <h3>Pencarian & Filter User</h3>
  <form id='searchUserForm' class='row g-2 mb-3'>
    <div class='col'><input type='text' class='form-control' id='searchName' placeholder='Username'></div>
    <div class='col'><input type='number' class='form-control' id='searchLevel' placeholder='Level'></div>
    <div class='col'><input type='number' class='form-control' id='searchSaldo' placeholder='Min Saldo'></div>
    <div class='col'><select class='form-select' id='searchBanned'><option value=''>Banned?</option><option value='true'>Ya</option><option value='false'>Tidak</option></select></div>
    <div class='col'><button class='btn btn-primary btn-sm'>Cari</button></div>
  </form>
  <div id='searchUserResult'></div>
`;
dashboard.appendChild(searchDiv);
document.getElementById('searchUserForm').onsubmit = function(e) {
  e.preventDefault();
  const params = [];
  if(document.getElementById('searchName').value) params.push('name='+encodeURIComponent(document.getElementById('searchName').value));
  if(document.getElementById('searchLevel').value) params.push('level='+encodeURIComponent(document.getElementById('searchLevel').value));
  if(document.getElementById('searchSaldo').value) params.push('saldo='+encodeURIComponent(document.getElementById('searchSaldo').value));
  if(document.getElementById('searchBanned').value) params.push('banned='+encodeURIComponent(document.getElementById('searchBanned').value));
  fetch('/admin/users/advanced?'+params.join('&'), { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(users => {
      let html = '<table class="table table-sm"><thead><tr><th>UserID</th><th>Username</th><th>Level</th><th>Saldo</th><th>Banned</th></tr></thead><tbody>';
      users.forEach(u => {
        html += `<tr><td>${u.userId}</td><td>${u.username||''}</td><td>${u.level}</td><td>${u.balance}</td><td>${u.banned?'Ya':'-'}</td></tr>`;
      });
      html += '</tbody></table>';
      document.getElementById('searchUserResult').innerHTML = html;
    });
};

// === DARK MODE & BRANDING ===
// Tambahkan toggle dark mode dan logo branding
const brandingDiv = document.createElement('div');
brandingDiv.innerHTML = `
  <div class='d-flex align-items-center mb-3'>
    <img src='https://cdn-icons-png.flaticon.com/512/616/616494.png' style='height:40px;margin-right:10px'>
    <span style='font-size:1.5rem;font-weight:bold;'>Flippy Flip Admin Panel</span>
    <button id='toggleDark' class='btn btn-outline-secondary btn-sm ms-auto'>Dark Mode</button>
  </div>
`;
document.body.prepend(brandingDiv);

// Dark mode logic
const darkCss = `body, .modal-content { background: #181a1b !important; color: #eee !important; } .table { color: #eee !important; } .form-control, .form-select { background: #222 !important; color: #eee !important; border-color: #444 !important; } .btn { border-radius: 4px; }`;
let darkStyle = null;
function setDarkMode(on) {
  if (on) {
    if (!darkStyle) {
      darkStyle = document.createElement('style');
      darkStyle.innerHTML = darkCss;
      document.head.appendChild(darkStyle);
    }
    localStorage.setItem('darkMode', '1');
  } else {
    if (darkStyle) darkStyle.remove();
    darkStyle = null;
    localStorage.removeItem('darkMode');
  }
}
document.getElementById('toggleDark').onclick = () => {
  setDarkMode(!darkStyle);
};
if (localStorage.getItem('darkMode')) setDarkMode(true);

// Theme Customization
const themeColors = [
  { name: 'Default', bg: '#181a1b', fg: '#eee', accent: '#4e79a7' },
  { name: 'Ocean', bg: '#1b263b', fg: '#e0e1dd', accent: '#00b4d8' },
  { name: 'Sunset', bg: '#2d132c', fg: '#fff1e6', accent: '#ff6f61' },
  { name: 'Forest', bg: '#183a1d', fg: '#f1faee', accent: '#43aa8b' }
];

function applyTheme(themeIdx) {
  const theme = themeColors[themeIdx] || themeColors[0];
  document.body.style.background = theme.bg;
  document.body.style.color = theme.fg;
  document.querySelectorAll('.table').forEach(t=>t.style.color=theme.fg);
  document.querySelectorAll('.form-control, .form-select').forEach(e=>{
    e.style.background = theme.bg;
    e.style.color = theme.fg;
    e.style.borderColor = theme.accent;
  });
  localStorage.setItem('themeIdx', themeIdx);
}

const themeDiv = document.createElement('div');
themeDiv.innerHTML = `<div class='mb-2'>Theme: ${themeColors.map((t,i)=>`<button class='btn btn-sm' style='background:${t.accent};color:#fff;margin-right:4px' onclick='applyTheme(${i})'>${t.name}</button>`).join('')}</div>`;
document.body.prepend(themeDiv);

window.applyTheme = applyTheme;
if (localStorage.getItem('themeIdx')) applyTheme(Number(localStorage.getItem('themeIdx')));

// Cek login
if (!localStorage.getItem('adminToken')) {
  window.location = 'login.html';
}
// Logout button
const logoutBtn = document.createElement('button');
logoutBtn.className = 'btn btn-danger btn-sm float-end';
logoutBtn.innerText = 'Logout';
logoutBtn.onclick = () => { localStorage.removeItem('adminToken'); window.location = 'login.html'; };
document.body.prepend(logoutBtn);

// Modal support ticket detail & balas
const ticketModal = document.createElement('div');
ticketModal.id = 'ticketModal';
ticketModal.style = 'display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000a;z-index:9999;align-items:center;justify-content:center';
ticketModal.innerHTML = `<div style='background:#fff;color:#222;padding:2rem;min-width:350px;max-width:90vw;border-radius:8px;position:relative'>
  <button id='closeModalBtn' style='position:absolute;top:8px;right:8px' class='btn btn-sm btn-secondary'>&times;</button>
  <div id='modalContent'></div>
</div>`;
document.body.appendChild(ticketModal);
document.getElementById('closeModalBtn').onclick = () => ticketModal.style.display = 'none';

window.showTicket = function(id) {
  fetch(`/admin/support-tickets`, { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(tickets => {
      const t = tickets.find(tt=>tt._id===id);
      if (!t) return;
      let html = `<b>Subject:</b> ${t.subject}<br><b>UserID:</b> ${t.userId}<br><b>Status:</b> ${t.status}<br><b>Pesan:</b><br><div class='border p-2 mb-2'>${t.message}</div>`;
      html += '<b>Replies:</b><ul>';
      (t.replies||[]).forEach(r=>{
        html += `<li><b>${r.admin||'Admin'}:</b> ${r.message} <span style='font-size:10px'>(${new Date(r.date).toLocaleString()})</span></li>`;
      });
      html += '</ul>';
      html += `<form id='replyForm'><input type='text' class='form-control mb-2' id='replyMsg' placeholder='Balas tiket...'><button class='btn btn-primary btn-sm'>Kirim Balasan</button></form>`;
      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('replyForm').onsubmit = function(e) {
        e.preventDefault();
        fetch(`/admin/support-tickets/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
          body: JSON.stringify({ reply: document.getElementById('replyMsg').value })
        }).then(()=>{ ticketModal.style.display='none'; location.reload(); });
      };
      ticketModal.style.display = 'flex';
    });
};

// === UI Role Management ===
const roleDiv = document.createElement('div');
roleDiv.innerHTML = `
  <h3>Role Management</h3>
  <div id='roleTable'></div>
  <form id='roleForm' class='row g-2 mb-3'>
    <div class='col'><input type='text' class='form-control' id='roleUserId' placeholder='User ID'></div>
    <div class='col'>
      <select class='form-select' id='roleRoles' multiple>
        ${roleOptions.map(r=>`<option value='${r}'>${r}</option>`).join('')}
      </select>
    </div>
    <div class='col'><button class='btn btn-primary btn-sm'>Update Role</button></div>
  </form>
`;
dashboard.appendChild(roleDiv);
// Filter & Search Role
const roleFilterDiv = document.createElement('div');
roleFilterDiv.innerHTML = `
  <form id='roleFilterForm' class='row g-2 mb-2'>
    <div class='col'><input type='text' class='form-control' id='filterUserId' placeholder='Cari User ID'></div>
    <div class='col'><input type='text' class='form-control' id='filterRole' placeholder='Cari Role'></div>
    <div class='col'><button class='btn btn-secondary btn-sm'>Filter</button></div>
  </form>
`;
roleDiv.prepend(roleFilterDiv);
document.getElementById('roleFilterForm').onsubmit = function(e) {
  e.preventDefault();
  const userId = document.getElementById('filterUserId').value.trim().toLowerCase();
  const role = document.getElementById('filterRole').value.trim().toLowerCase();
  fetch('/admin/roles', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(roles => {
      if (userId) roles = roles.filter(r => r.userId.toLowerCase().includes(userId));
      if (role) roles = roles.filter(r => (r.roles||[]).some(x => x.toLowerCase().includes(role)));
      renderRoles(roles);
    });
};
function renderRoles(roles) {
  let html = '<table class="table table-sm"><thead><tr><th><input type="checkbox" id="selectAllRole"></th><th>UserID</th><th>Roles</th><th>Aksi</th></tr></thead><tbody>';
  roles.forEach(r => {
    html += `<tr><td><input type='checkbox' class='roleCheck' value='${r.userId}'></td><td>${r.userId}</td><td>${(r.roles||[]).join(', ')}</td><td><button class='btn btn-danger btn-sm' onclick='deleteRoleUser("${r.userId}")'>Hapus</button></td></tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('roleTable').innerHTML = html;
  document.getElementById('selectAllRole').onclick = function() {
    document.querySelectorAll('.roleCheck').forEach(cb => cb.checked = this.checked);
  };
}
function fetchRoles() {
  fetch('/admin/roles', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json()).then(renderRoles);
}
document.getElementById('roleForm').onsubmit = function(e) {
  e.preventDefault();
  const selected = Array.from(document.getElementById('roleRoles').selectedOptions).map(o=>o.value);
  fetch(`/admin/roles/${document.getElementById('roleUserId').value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
    body: JSON.stringify({ roles: selected })
  }).then(()=>fetchRoles());
};
window.deleteRoleUser = function(userId) {
  if (!confirm('Hapus role user ini?')) return;
  fetch(`/admin/roles/${userId}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' }
  }).then(()=>fetchRoles());
};

// Bulk Role Action
const bulkDiv = document.createElement('div');
bulkDiv.innerHTML = `<div class='mb-2'><button class='btn btn-warning btn-sm' id='bulkAssignBtn'>Assign Role ke Pilihan</button> <button class='btn btn-danger btn-sm' id='bulkDeleteBtn'>Hapus Role Pilihan</button></div>`;
roleDiv.appendChild(bulkDiv);
document.getElementById('bulkAssignBtn').onclick = function() {
  const ids = Array.from(document.querySelectorAll('.roleCheck:checked')).map(cb=>cb.value);
  const role = prompt('Masukkan role yang ingin di-assign (user/admin/superadmin):');
  if (!role) return;
  ids.forEach(userId => {
    fetch(`/admin/roles/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
      body: JSON.stringify({ roles: [role] })
    }).then(()=>fetchRoles());
  });
};
document.getElementById('bulkDeleteBtn').onclick = function() {
  const ids = Array.from(document.querySelectorAll('.roleCheck:checked')).map(cb=>cb.value);
  if (!confirm('Hapus semua role user terpilih?')) return;
  ids.forEach(userId => {
    fetch(`/admin/roles/${userId}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' }
    }).then(()=>fetchRoles());
  });
};

// History/Audit Role Change
// History/Audit Upgrade
const upgradeAuditDiv = document.createElement('div');
upgradeAuditDiv.innerHTML = `<h4>Riwayat Upgrade Asset</h4><div id='auditUpgradeTable'></div>`;
dashboard.appendChild(upgradeAuditDiv);
function fetchAuditUpgrade() {
  fetch('/admin/audit-log', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(logs => {
      const rows = logs.filter(l => l.action && l.action.includes('upgrade'));
      let html = '<table class="table table-sm"><thead><tr><th>Waktu</th><th>User</th><th>Asset</th><th>Level</th><th>Detail</th></tr></thead><tbody>';
      rows.forEach(l => {
        html += `<tr><td>${new Date(l.timestamp||l.createdAt).toLocaleString()}</td><td>${l.details?.userId||'-'}</td><td>${l.details?.assetType||'-'}</td><td>${l.details?.level||'-'}</td><td>${JSON.stringify(l.details)}</td></tr>`;
      });
      html += '</tbody></table>';
      document.getElementById('auditUpgradeTable').innerHTML = html;
    });
}
fetchAuditUpgrade();
const auditDiv = document.createElement('div');
auditDiv.innerHTML = `<h4>Riwayat Perubahan Role</h4><div id='auditRoleTable'></div>`;
roleDiv.appendChild(auditDiv);
function fetchAuditRole() {
  fetch('/admin/audit-log', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(logs => {
      const rows = logs.filter(l => l.action && l.action.includes('role'));
      let html = '<table class="table table-sm"><thead><tr><th>Waktu</th><th>Admin</th><th>Aksi</th><th>UserID</th><th>Detail</th></tr></thead><tbody>';
      rows.forEach(l => {
        html += `<tr><td>${new Date(l.timestamp||l.createdAt).toLocaleString()}</td><td>${l.adminId||'-'}</td><td>${l.action}</td><td>${l.details?.userId||'-'}</td><td>${JSON.stringify(l.details)}</td></tr>`;
      });
      html += '</tbody></table>';
      document.getElementById('auditRoleTable').innerHTML = html;
    });
}
fetchAuditRole();

// Role-based UI: hanya superadmin bisa akses role management
function checkRoleUI() {
  fetch('/admin/roles', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(roles => {
      const me = roles.find(r => r.userId === localStorage.getItem('myUserId'));
      if (!me || !(me.roles||[]).includes('superadmin')) {
        roleDiv.style.display = 'none';
        showNotification('Hanya superadmin yang bisa mengakses role management!');
      }
    });
}
// Pastikan myUserId tersimpan di localStorage saat login
checkRoleUI();

// Export/Import Role
const exportDiv = document.createElement('div');
exportDiv.innerHTML = `<button class='btn btn-success btn-sm mb-2' id='exportRoleBtn'>Export Role (JSON)</button> <input type='file' id='importRoleFile' style='display:none'><button class='btn btn-info btn-sm mb-2' id='importRoleBtn'>Import Role (JSON)</button>`;
roleDiv.appendChild(exportDiv);
document.getElementById('exportRoleBtn').onclick = function() {
  fetch('/admin/roles', { headers: { 'x-admin-token': localStorage.getItem('adminToken')||'' } })
    .then(r=>r.json())
    .then(roles => {
      const blob = new Blob([JSON.stringify(roles, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roles-backup.json';
      a.click();
      URL.revokeObjectURL(url);
    });
};
document.getElementById('importRoleBtn').onclick = function() {
  document.getElementById('importRoleFile').click();
};
document.getElementById('importRoleFile').onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const roles = JSON.parse(ev.target.result);
      if (!Array.isArray(roles)) throw new Error('Format tidak valid');
      roles.forEach(r => {
        fetch(`/admin/roles/${r.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-admin-token': localStorage.getItem('adminToken')||'' },
          body: JSON.stringify({ roles: r.roles })
        });
      });
      showNotification('Import role selesai!');
      setTimeout(fetchRoles, 1000);
    } catch (err) {
      showNotification('Import gagal: ' + err.message);
    }
  };
  reader.readAsText(file);
};

// Leaderboard Idle
fetch('/api/idle/leaderboard', { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
  .then(r => r.json())
  .then(data => {
    let html = '<h3>Idle Leaderboard</h3><table class="table table-sm"><thead><tr><th>#</th><th>User</th><th>Income</th><th>Worker</th><th>Prestige</th></tr></thead><tbody>';
    data.forEach((u, i) => {
      html += `<tr><td>${i+1}</td><td>${u.username||u.userId}</td><td>${u.totalIncome||0}</td><td>${u.worker||0}</td><td>${u.prestige||0}</td></tr>`;
    });
    html += '</tbody></table>';
    dashboard.innerHTML += html;
  });

// Statistik Idle User (contoh: userId dari localStorage atau input)
// Visualisasi asset & efek user
if (idleStatsUserId) {
  fetch('/api/idle/stats/' + idleStatsUserId, { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
    .then(r => r.json())
    .then(data => {
      let html = `<h3>Asset & Efek Kamu</h3><ul>`;
      html += `<li>Bank Vault: Level ${data.bankVault?.level||1}, Kapasitas ${data.bankVault?.capacity||'-'}</li>`;
      html += `<li>Shop Booster: Level ${data.shopBooster?.level||1}, Diskon ${Math.floor((data.shopBooster?.discount||0)*100)}%</li>`;
      html += `<li>Gems Generator: Level ${data.gemsGenerator?.level||1}, Gems/hari ${data.gemsGenerator?.gemsPerDay||'-'}</li>`;
      html += `<li>Energy Station: Level ${data.energyStation?.level||1}, Recovery ${data.energyStation?.recovery||'-'}/10m</li>`;
      html += `<li>Prestige Multiplier: Level ${data.prestigeMultiplier?.level||1}, Bonus x${data.prestigeMultiplier?.bonus?.toFixed(2)||'-'}</li>`;
      html += `<li>Inventory Expander: Level ${data.inventoryExpander?.level||1}, Slot ${data.inventoryExpander?.slots||'-'}</li>`;
      html += `</ul>`;
      dashboard.innerHTML += html;
    });
}
socket.on('upgrade', data => showNotification(`Upgrade asset: ${data.userId} - ${data.assetType} ke level ${data.level}`));
const idleStatsUserId = localStorage.getItem('idleStatsUserId');
if (idleStatsUserId) {
  fetch('/api/idle/stats/' + idleStatsUserId, { headers: { 'x-admin-token': localStorage.getItem('adminToken') || '' } })
    .then(r => r.json())
    .then(data => {
      let html = `<h3>Idle Progress Kamu</h3><ul>`;
      html += `<li>Income: <b>${data.totalIncome}</b></li>`;
      html += `<li>Worker: <b>${data.worker}</b></li>`;
      html += `<li>Prestige: <b>${data.prestige}</b></li>`;
      html += `<li>Gems: <b>${data.gems}</b></li>`;
      html += `<li>Material: <b>${data.material}</b></li>`;
      html += `<li>Achievement: <b>${(data.achievements||[]).join(', ')||'-'}</b></li>`;
      html += `</ul>`;
      dashboard.innerHTML += html;
    });
  // Grafik progres idle (income, worker, prestige)
  const chartDiv = document.createElement('div');
  chartDiv.innerHTML = `<canvas id="idleProgressChart" height="80"></canvas>`;
  dashboard.appendChild(chartDiv);
  const ctx = document.getElementById('idleProgressChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Worker', 'Prestige', 'Gems', 'Material'],
      datasets: [{
        label: 'Idle Progress',
        data: [data.totalIncome, data.worker, data.prestige, data.gems, data.material],
        backgroundColor: ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f']
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// Contoh render modular
// dashboard.innerHTML += Leaderboard({ data: leaderboardData });
// dashboard.innerHTML += IdleStats({ stats: userStats });
// dashboard.innerHTML += ExportImportPanel({ onExport, onImport });

/**
 * Escape HTML special characters for safe output (prevent XSS)
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
