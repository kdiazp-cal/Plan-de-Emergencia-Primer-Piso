
const screens = {
  home: document.getElementById('homeScreen'),
  emergencies: document.getElementById('emergencyScreen'),
  detail: document.getElementById('detailScreen')
};

const emergencyData = {
  incendio: {
    title: '🔥 INCENDIO',
    steps: [
      'Mantén la calma.',
      'Evacúa inmediatamente.',
      'No utilices ascensores.',
      'Sigue las rutas señalizadas.'
    ]
  },
  sismo: {
    title: '🌎 SISMO',
    steps: [
      'Mantén la calma.',
      'Protégete bajo una mesa o estructura firme.',
      'Aléjate de ventanas.',
      'Cuando termine el movimiento, evacúa.'
    ]
  },
  medica: {
    title: '🚑 EMERGENCIA MÉDICA',
    steps: [
      'Mantén la calma.',
      'Solicita ayuda inmediata.',
      'Contacta al personal del instituto.',
      'Si es necesario, llama al 131.'
    ]
  },
  violencia: {
    title: '🔫 BALACERA / VIOLENCIA EXTREMA',
    steps: [
      'Mantén la calma.',
      'Refúgiate en una sala o espacio seguro.',
      'Agáchate y cubre tu cabeza.',
      'No salgas hasta recibir instrucciones.'
    ]
  },
  quimica: {
    title: '☣ EMERGENCIA QUÍMICA',
    steps: [
      'Aléjate del área afectada.',
      'Evita el contacto con sustancias.',
      'Sigue instrucciones del personal.',
      'Evacúa si se indica.'
    ]
  },
  electrica: {
    title: '⚡ EMERGENCIA ELÉCTRICA',
    steps: [
      'Aléjate de equipos energizados.',
      'No toques cables ni tableros.',
      'Informa al personal.',
      'Evacúa si existe riesgo.'
    ]
  },
  bomba: {
    title: '💣 AMENAZA DE BOMBA',
    steps: [
      'Mantén la calma.',
      'Evacúa siguiendo las rutas señalizadas.',
      'No manipules objetos sospechosos.',
      'Dirígete al punto de encuentro.'
    ]
  }
};

function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

document.getElementById('goEmergencies').addEventListener('click', () => showScreen('emergencies'));
document.getElementById('backHome').addEventListener('click', () => showScreen('home'));
document.getElementById('backEmergencies').addEventListener('click', () => showScreen('emergencies'));

document.querySelectorAll('.em-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;
    const data = emergencyData[key];
    document.getElementById('detailHeader').textContent = data.title;
    const list = document.getElementById('detailSteps');
    list.innerHTML = '';
    data.steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      list.appendChild(li);
    });
    showScreen('detail');
  });
});

const hiddenPanel = document.getElementById('hiddenPanel');
if (hiddenPanel) hiddenPanel.hidden = true;
document.getElementById('menuBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  hiddenPanel.hidden = false;
});
document.getElementById('closePanel').addEventListener('click', () => hiddenPanel.hidden = true);
hiddenPanel.addEventListener('click', (e) => {
  if (e.target === hiddenPanel) hiddenPanel.hidden = true;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
