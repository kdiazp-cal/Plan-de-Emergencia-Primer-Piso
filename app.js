
const screens = {
  home: document.getElementById('homeScreen'),
  emergencies: document.getElementById('emergencyScreen'),
  detail: document.getElementById('detailScreen')
};
const emergencyData = {
  incendio: { title: '🔥 INCENDIO', steps: ['Mantén la calma.','Evacúa inmediatamente.','No utilices ascensores.','Sigue las rutas señalizadas.'] },
  sismo: { title: '🌎 SISMO', steps: ['Mantén la calma.','Protégete bajo una mesa o estructura firme.','Aléjate de ventanas.','Cuando termine el movimiento, evacúa.'] },
  medica: { title: '🚑 EMERGENCIA MÉDICA', steps: ['Mantén la calma.','Solicita ayuda inmediata.','Contacta al personal del instituto.','Si es necesario, llama al 131.'] },
  violencia: { title: '🔫 BALACERA / VIOLENCIA EXTREMA', steps: ['Mantén la calma.','Refúgiate en una sala o espacio seguro.','Agáchate y cubre tu cabeza.','No salgas hasta recibir instrucciones.'] },
  quimica: { title: '☣ EMERGENCIA QUÍMICA', steps: ['Aléjate del área afectada.','Evita el contacto con sustancias.','Sigue instrucciones del personal.','Evacúa si se indica.'] },
  electrica: { title: '⚡ EMERGENCIA ELÉCTRICA', steps: ['Aléjate de equipos energizados.','No toques cables ni tableros.','Informa al personal.','Evacúa si existe riesgo.'] },
  bomba: { title: '💣 AMENAZA DE BOMBA', steps: ['Mantén la calma.','Evacúa siguiendo las rutas señalizadas.','No manipules objetos sospechosos.','Dirígete al punto de encuentro.'] },
  gas: { title: '🧯 FUGA DE GAS', steps: ['No enciendas ni apagues interruptores.','Evacúa inmediatamente.','Aléjate del área afectada.','Sigue instrucciones del personal.'] },
  vecina: { title: '🏭 EMERGENCIA VECINA', steps: ['Mantente atento a indicaciones institucionales.','Podría requerirse evacuación preventiva.','Sigue la señalización.','Dirígete al punto de encuentro si se indica.'] },
  simulacro: { title: '🎓 MODO SIMULACRO', steps: ['Escucha la instrucción inicial.','Sigue la ruta de evacuación.','Dirígete al punto de encuentro.','Permanece hasta nueva instrucción.'] }
};
const config = window.APP_CONFIG || {};
const reportEmails = (config.reportEmails || []).join(',');
const documentUrl = config.documentUrl || '';
const alertPollMs = config.alertPollMs || 5000;

function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}
function openEmergency(key){
  const data = emergencyData[key];
  if(!data) return;
  document.getElementById('detailHeader').textContent = data.title;
  const list = document.getElementById('detailSteps');
  list.innerHTML = '';
  data.steps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  });
  showScreen('detail');
}
document.getElementById('goEmergencies').addEventListener('click', () => showScreen('emergencies'));
document.getElementById('backHome').addEventListener('click', () => showScreen('home'));
document.getElementById('backEmergencies').addEventListener('click', () => showScreen('emergencies'));
document.querySelectorAll('.em-btn').forEach(btn => btn.addEventListener('click', () => openEmergency(btn.dataset.key)));
document.querySelectorAll('.extra-em').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('hiddenPanel').hidden = true;
  openEmergency(btn.dataset.key);
}));

const hiddenPanel = document.getElementById('hiddenPanel');
hiddenPanel.hidden = true;
document.getElementById('menuBtn').addEventListener('click', (e) => { e.stopPropagation(); hiddenPanel.hidden = false; });
document.getElementById('closePanel').addEventListener('click', () => hiddenPanel.hidden = true);
hiddenPanel.addEventListener('click', (e) => { if (e.target === hiddenPanel) hiddenPanel.hidden = true; });

document.getElementById('openReportBtn').addEventListener('click', () => { document.getElementById('reportModal').hidden = false; });
document.getElementById('closeReportBtn').addEventListener('click', () => { document.getElementById('reportModal').hidden = true; });
document.getElementById('reportModal').addEventListener('click', (e) => { if (e.target.id === 'reportModal') e.currentTarget.hidden = true; });

document.getElementById('reportForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = [
    'Se reporta una emergencia desde la app.',
    '',
    'Tipo: ' + (fd.get('tipo') || ''),
    'Ubicación: ' + (fd.get('ubicacion') || ''),
    'Detalle: ' + (fd.get('detalle') || '')
  ].join('\n');

  if (!reportEmails) {
    alert('Debes editar config.js y agregar los correos reales.');
    return;
  }

  window.location.href = 'mailto:' + reportEmails +
    '?subject=' + encodeURIComponent('Reporte de emergencia - Primer Piso') +
    '&body=' + encodeURIComponent(body);
});

document.querySelectorAll('.plan-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('imageModalTitle').textContent = btn.textContent.trim();
    document.getElementById('imageModalImg').src = btn.dataset.img;
    document.getElementById('imageModal').hidden = false;
  });
});
document.getElementById('closeImageBtn').addEventListener('click', () => { document.getElementById('imageModal').hidden = true; });
document.getElementById('imageModal').addEventListener('click', (e) => { if (e.target.id === 'imageModal') e.currentTarget.hidden = true; });

document.getElementById('openDocumentBtn').addEventListener('click', () => {
  if (!documentUrl) {
    alert('Aún no se ha configurado el enlace del documento completo. Se edita en config.js');
    return;
  }
  window.open(documentUrl, '_blank', 'noopener');
});

const alertBanner = document.getElementById('alertBanner');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');
const alertViewBtn = document.getElementById('alertViewBtn');
const alertCloseBtn = document.getElementById('alertCloseBtn');
let lastAlert = '';


function applyLocalAlertOverride() {
  try {
    const raw = localStorage.getItem('localAlertOverride');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.active) {
      alertTitle.textContent = '⚠ ' + (data.title || 'Emergencia activa');
      alertMessage.textContent = data.message || 'Se solicita evacuar y revisar las indicaciones.';
      alertBanner.hidden = false;
      alertViewBtn.onclick = () => {
        alertBanner.hidden = true;
        if (data.emergencyKey && emergencyData[data.emergencyKey]) openEmergency(data.emergencyKey);
        else showScreen('emergencies');
      };
    } else {
      alertBanner.hidden = true;
    }
    return true;
  } catch (err) {
    return false;
  }
}

const openAdminBtn = document.getElementById('openAdminBtn');
const adminModal = document.getElementById('adminModal');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminForm = document.getElementById('adminForm');

if (openAdminBtn) {
  openAdminBtn.addEventListener('click', () => { adminModal.hidden = false; });
}
if (closeAdminBtn) {
  closeAdminBtn.addEventListener('click', () => { adminModal.hidden = true; });
}
if (adminModal) {
  adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) adminModal.hidden = true;
  });
}
if (adminForm) {
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(adminForm);
    const user = fd.get('user');
    const password = fd.get('password');
    const state = fd.get('state');
    const title = fd.get('title') || 'Evacuación inmediata';
    const message = fd.get('message') || 'Se solicita evacuar el primer piso y revisar las indicaciones.';
    const emergencyKey = fd.get('emergencyKey') || '';

    const authUsers = (config.authUsers || []);
    const authPassword = config.authPassword || '';

    if (!authUsers.includes(user) || password !== authPassword) {
      alert('Usuario o clave incorrecta.');
      return;
    }

    const payload = state === 'on'
      ? { active: true, title, message, emergencyKey }
      : { active: false, title: 'Emergencia activa', message: '', emergencyKey: '' };

    localStorage.setItem('localAlertOverride', JSON.stringify(payload));
    applyLocalAlertOverride();
    adminModal.hidden = true;
    alert(state === 'on' ? 'Alerta activada en este dispositivo.' : 'Alerta desactivada en este dispositivo.');
  });
}


async function pollAlert() {
  if (applyLocalAlertOverride()) return;
  try {
    const res = await fetch('./alerta.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const current = JSON.stringify(data);
    if (current === lastAlert) return;
    lastAlert = current;

    if (data.active) {
      alertTitle.textContent = '⚠ ' + (data.title || 'Emergencia activa');
      alertMessage.textContent = data.message || 'Se solicita evacuar y revisar las indicaciones.';
      alertBanner.hidden = false;
      if (navigator.vibrate) navigator.vibrate([300,100,300]);
      alertViewBtn.onclick = () => {
        alertBanner.hidden = true;
        if (data.emergencyKey && emergencyData[data.emergencyKey]) openEmergency(data.emergencyKey);
        else showScreen('emergencies');
      };
    } else {
      alertBanner.hidden = true;
    }
  } catch (err) {
    console.log('Sin alerta remota');
  }
}
alertCloseBtn.addEventListener('click', () => { alertBanner.hidden = true; });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
    pollAlert();
    setInterval(pollAlert, alertPollMs);
  });
} else {
  pollAlert();
  setInterval(pollAlert, alertPollMs);
}
