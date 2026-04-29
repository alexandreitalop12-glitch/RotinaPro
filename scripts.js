// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let S = {};
const TODAY = new Date();
const WEEKDAY = TODAY.getDay(); // 0=Dom, 1=Seg...

function loadS() {
  const d = {
    rotina: {},
    higiene: {},
    study: {},
    habits: {},
    studyNotes: [],
    lastReset: TODAY.toDateString(),
  };
  const saved = localStorage.getItem('apex_v2');
  S = saved ? {...d, ...JSON.parse(saved)} : d;
  if (S.lastReset !== TODAY.toDateString()) {
    S.rotina = {}; S.higiene = {}; S.study = {};
    S.lastReset = TODAY.toDateString();
    saveS();
  }
}
function saveS() { localStorage.setItem('apex_v2', JSON.stringify(S)); }

// ══════════════════════════════════════════
// EDIT MODE STATE
// ══════════════════════════════════════════
let editMode = false;
let customDaysData = null;
let selectedDay = undefined;

function getDaysData() {
  if (customDaysData) return customDaysData;
  const saved = localStorage.getItem('apex_days_data');
  return saved ? JSON.parse(saved) : null;
}

function saveDaysData(data) {
  customDaysData = data;
  localStorage.setItem('apex_days_data', JSON.stringify(data));
}

function resetToOriginal() {
  if (!confirm('Tem certeza que deseja restaurar os dados originais? Todas as alterações serão perdidas.')) return;
  customDaysData = null;
  localStorage.removeItem('apex_days_data');
  toast('✅ Dados originais restaurados!');
  if (editMode) {
    toggleEditMode();
  } else {
    renderRotina();
  }
}

function initDaysData() {
  const saved = getDaysData();
  if (saved) {
    customDaysData = saved;
  }
}

// ══════════════════════════════════════════
// EDIT MODE FUNCTIONS
// ══════════════════════════════════════════
function toggleEditMode() {
  editMode = !editMode;
  const btn = document.getElementById('edit-toggle-btn');
  if (btn) {
    btn.classList.toggle('active', editMode);
    btn.textContent = editMode ? '❌ Sair da Edição' : '✏️ Editar Rotina';
  }
  const page = document.getElementById('page-rotina');
  if (page) {
    page.classList.toggle('edit-mode', editMode);
  }
  if (editMode) {
    renderDayEditForm();
  } else {
    renderRotina();
  }
}

function renderDayEditForm() {
  const dayNum = selectedDay !== undefined ? selectedDay : WEEKDAY;
  const data = getDaysData() || DAYS_DATA;
  const day = data[dayNum] || DAYS_DATA[1];
  
  const container = document.getElementById('rotina-content');
  if (!container) return;
  
  // Add header with edit toggle
  let html = `
    <div class="edit-header">
      <div class="page-title">✏️ Editar Rotina</div>
      <button class="edit-toggle" id="edit-toggle-btn" onclick="toggleEditMode()">✏️ Editar Rotina</button>
    </div>
    <div class="day-edit-row">
      <div style="flex:1">
        <div class="day-edit-label">Nome do Dia</div>
        <input class="edit-input" id="edit-day-label" value="${day.label || ''}" placeholder="Ex: Segunda-feira">
      </div>
      <div style="flex:1">
        <div class="day-edit-label">Tipo do Dia</div>
        <input class="edit-input" id="edit-day-type" value="${day.type || ''}" placeholder="Ex: Escola + Estudo">
      </div>
      <div style="flex:1">
        <div class="day-edit-label">Label Tarde</div>
        <input class="edit-input" id="edit-day-aftlabel" value="${day.aftLabel || ''}" placeholder="Ex: ☀️ Tarde — Escola">
      </div>
    </div>
    <button class="edit-toggle" style="margin-bottom:16px" onclick="saveDayEdit(${dayNum})">💾 Salvar Alterações do Dia</button>
    <button class="edit-toggle" style="margin-bottom:16px;margin-left:8px" onclick="resetToOriginal()">🔄 Restaurar Original</button>
  `;
  
  // Render sections with edit controls
  html += renderEditSection('Manhã', day.morning || [], 'morning', dayNum);
  html += renderEditSection('Tarde', day.afternoon || [], 'afternoon', dayNum);
  html += renderEditSection('Noite', day.night || [], 'night', dayNum);
  
  container.innerHTML = html;
}

function renderEditSection(title, items, sectionKey, dayNum) {
  let html = `
    <div style="margin-bottom:20px">
      <div style="font-size:12px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">${title}</div>
  `;
  
  items.forEach((item, idx) => {
    html += `
      <div style="background:var(--bg3);border-radius:8px;padding:12px;margin-bottom:8px;border:1px solid var(--border)">
        <div class="edit-row">
          <input class="edit-input" id="edit-title-${sectionKey}-${idx}" value="${item.title || ''}" placeholder="Título">
          <select id="edit-tag-${sectionKey}-${idx}">
            <option value="hig" ${item.tag === 'hig' ? 'selected' : ''}>Higiene</option>
            <option value="bio" ${item.tag === 'bio' ? 'selected' : ''}>Biológico</option>
            <option value="est" ${item.tag === 'est' ? 'selected' : ''}>Estudo</option>
            <option value="ment" ${item.tag === 'ment' ? 'selected' : ''}>Mental</option>
          </select>
        </div>
        <textarea class="edit-textarea" id="edit-desc-${sectionKey}-${idx}" placeholder="Descrição">${item.desc || ''}</textarea>
        <div class="edit-controls" style="margin-top:8px">
          <button class="edit-btn" onclick="saveItemEdit(${dayNum}, '${sectionKey}', ${idx})">💾</button>
          <button class="edit-btn delete" onclick="deleteItem(${dayNum}, '${sectionKey}', ${idx})">🗑️</button>
        </div>
      </div>
    `;
  });
  
  html += `
      <button class="add-item-btn" onclick="addNewItem(${dayNum}, '${sectionKey}')">+ Adicionar Nova Tarefa</button>
    </div>
  `;
  
  return html;
}

function saveDayEdit(dayNum) {
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  
  data[dayNum] = {
    label: document.getElementById('edit-day-label').value,
    type: document.getElementById('edit-day-type').value,
    aftLabel: document.getElementById('edit-day-aftlabel').value,
    morning: data[dayNum]?.morning || [],
    afternoon: data[dayNum]?.afternoon || [],
    night: data[dayNum]?.night || []
  };
  
  saveDaysData(data);
  toast('✅ Dia salvo com sucesso!');
  renderDayEditForm();
}

function saveItemEdit(dayNum, sectionKey, idx) {
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  
  if (!data[dayNum][sectionKey]) return;
  
  data[dayNum][sectionKey][idx] = {
    id: data[dayNum][sectionKey][idx].id,
    title: document.getElementById(`edit-title-${sectionKey}-${idx}`).value,
    desc: document.getElementById(`edit-desc-${sectionKey}-${idx}`).value,
    tag: document.getElementById(`edit-tag-${sectionKey}-${idx}`).value
  };
  
  saveDaysData(data);
  toast('✅ Tarefa salva!');
}

function deleteItem(dayNum, sectionKey, idx) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
  
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  data[dayNum][sectionKey].splice(idx, 1);
  saveDaysData(data);
  toast('🗑️ Tarefa excluída');
  renderDayEditForm();
}

function addNewItem(dayNum, sectionKey) {
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  
  if (!data[dayNum][sectionKey]) {
    data[dayNum][sectionKey] = [];
  }
  
  const newId = `custom_${dayNum}_${sectionKey}_${Date.now()}`;
  const newItem = {
    id: newId,
    title: 'Nova Tarefa',
    desc: 'Descrição da nova tarefa',
    tag: 'bio'
  };
  
  data[dayNum][sectionKey].push(newItem);
  saveDaysData(data);
  toast('➕ Nova tarefa adicionada!');
  renderDayEditForm();
}

// Override renderRotina to use custom data
function getCurrentDayData(dayNum) {
  const data = getDaysData() || DAYS_DATA;
  return data[dayNum] || DAYS_DATA[1];
}

// ══════════════════════════════════════════
// NAV
// ══════════════════════════════════════════
function go(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  document.querySelector(`[data-p="${p}"]`).classList.add('active');
  refreshAll();
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ══════════════════════════════════════════
// DATA — ROTINA POR DIA DA SEMANA
// ══════════════════════════════════════════
const DAYS_DATA = {
  1: { // Segunda
    label: 'Segunda-feira', type: 'Escola Tarde + Estudo Manhã',
    morning: [
      { id:'s1_01', title:'05:00 — Água 500ml + Raspagem de Língua', desc:'Em jejum, antes de qualquer líquido', tag:'hig' },
      { id:'s1_02', title:'05:15 — Luz Natural (10–15 min)', desc:'Janela ou quintal. Regula cortisol e circadiano', tag:'bio' },
      { id:'s1_03', title:'05:30 — HIIT ou Flexões', desc:'Exercício intenso curto para despertar o metabolismo', tag:'bio' },
      { id:'s1_04', title:'05:50 — Banho Gelado + Skincare Matinal', desc:'Pico de dopamina e motivação. FPS obrigatório', tag:'hig' },
      { id:'s1_05', title:'06:20 — Café da Manhã Proteico', desc:'Ovos/frango — saciedade e foco cognitivo', tag:'bio' },
      { id:'s1_06', title:'07:30–11:30 — Bloco de Estudo ENEM', desc:'Foco em Matemática. Método: questões primeiro, teoria depois. Celular no outro cômodo', tag:'est' },
    ],
    afternoon: [
      { id:'s1_07', title:'11:35 — Deslocamento para Escola (85 min)', desc:'Podcasts educativos ou revisão mental do estudo', tag:'est' },
      { id:'s1_08', title:'13:00–17:00 — Escola', desc:'Hidratação e higiene bucal pós-almoço nos intervalos', tag:'est' },
    ],
    night: [
      { id:'s1_09', title:'18:30 — Chegada + Banho Morno', desc:'Relaxamento muscular pós-escola', tag:'hig' },
      { id:'s1_10', title:'19:30 — Jantar Leve', desc:'Evite gorduras e açúcares — não prejudicam o sono profundo', tag:'bio' },
      { id:'s1_11', title:'20:30 — Telas OFF', desc:'Luz azul inibe melatonina por até 90 min. Livro físico', tag:'ment' },
      { id:'s1_12', title:'21:30 — Planejamento + Diário de Gratidão', desc:'Organize o dia seguinte e registre 3 gratidões', tag:'ment' },
      { id:'s1_13', title:'22:15 — Sono Total', desc:'Quarto escuro e frio (19–21°C). Pico de GH e limpeza cerebral', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Escola'
  },
  2: { // Terça
    label: 'Terça-feira', type: 'Escola Dia Inteiro',
    morning: [
      { id:'s2_01', title:'05:00 — Água + Raspagem + Luz Natural', desc:'Rotina completa de despertar', tag:'hig' },
      { id:'s2_02', title:'05:15 — Banho Gelado + Skincare + Perfumação', desc:'Estratégica: hidratante antes do perfume para maior durabilidade', tag:'hig' },
      { id:'s2_03', title:'05:40 — Café da Manhã Proteico Rápido', desc:'Ovos + fruta — energia sustentada', tag:'bio' },
      { id:'s2_04', title:'05:55 — Deslocamento (85 min)', desc:'Flashcards ou revisão de áudio. Use o tempo ao máximo', tag:'est' },
    ],
    afternoon: [
      { id:'s2_05', title:'07:20–17:00 — Escola', desc:'Manter hidratação. Higiene bucal pós-almoço com kit de sobrevivência', tag:'est' },
    ],
    night: [
      { id:'s2_06', title:'18:30 — Banho Morno + Higiene Íntima Completa', desc:'Rotina corporal completa após o dia longo', tag:'hig' },
      { id:'s2_07', title:'19:00 — Revisão Rápida (30 min)', desc:'Prática espaçada: temas vistos na escola hoje', tag:'est' },
      { id:'s2_08', title:'20:30 — Telas OFF + Leitura + Respiração 4-7-8', desc:'Baixar frequência cardíaca e frequência mental para o sono', tag:'ment' },
      { id:'s2_09', title:'22:15 — Sono Total', desc:'Quarto escuro e frio (19–21°C)', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Escola'
  },
  3: { // Quarta
    label: 'Quarta-feira', type: 'Escola Manhã + Estágio Tarde',
    morning: [
      { id:'s3_01', title:'05:00 — Rotina Completa de Despertar', desc:'Água, raspagem, luz natural — igual terça', tag:'hig' },
      { id:'s3_02', title:'05:15 — Banho Gelado + Skincare + Perfumação', desc:'Aplicar hidratante → perfume em pontos de pulso', tag:'hig' },
      { id:'s3_03', title:'05:40 — Café Proteico Rápido', desc:'Energia sustentada para escola + estágio', tag:'bio' },
      { id:'s3_04', title:'05:55 — Deslocamento com Flashcards', desc:'Use o tempo no ônibus/transporte de forma ativa', tag:'est' },
      { id:'s3_05', title:'07:20–11:40 — Escola', desc:'Primeira metade do dia — manter foco e hidratação', tag:'est' },
    ],
    afternoon: [
      { id:'s3_06', title:'11:40–13:00 — Transição Crítica', desc:'Almoço LEVE (evitar sonolência no estágio). Kit de sobrevivência: higiene bucal + reaplique desodorante', tag:'hig' },
      { id:'s3_07', title:'13:00–17:00 — Estágio', desc:'Dia mais pesado da semana. Foco e profissionalismo', tag:'est' },
    ],
    night: [
      { id:'s3_08', title:'18:30 — Chegada + Banho + Higiene Completa', desc:'Cansaço mental maior hoje. Priorize o relaxamento', tag:'hig' },
      { id:'s3_09', title:'19:30 — Jantar Leve', desc:'Nada pesado — recuperação é prioridade esta noite', tag:'bio' },
      { id:'s3_10', title:'20:30 — Telas OFF + Meditação', desc:'Respiração 4-7-8: inspire 4s, segure 7s, expire 8s', tag:'ment' },
      { id:'s3_11', title:'22:15 — Sono Total', desc:'Recuperação é produtividade. Quarto 19–21°C', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Estágio'
  },
  4: { // Quinta
    label: 'Quinta-feira', type: 'Escola Dia Inteiro',
    morning: [
      { id:'s4_01', title:'05:00 — Rotina de Despertar', desc:'Água, raspagem, luz natural', tag:'hig' },
      { id:'s4_02', title:'05:15 — Banho Gelado + Skincare + Perfumação', desc:'Rotina matinal completa de higiene', tag:'hig' },
      { id:'s4_03', title:'05:40 — Café Proteico', desc:'Ovos + proteína para foco', tag:'bio' },
      { id:'s4_04', title:'05:55 — Deslocamento + Flashcards', desc:'Revisão ativa no trajeto', tag:'est' },
    ],
    afternoon: [
      { id:'s4_05', title:'07:20–17:00 — Escola', desc:'Hidratação e higiene nos intervalos. Kit de sobrevivência sempre na mochila', tag:'est' },
    ],
    night: [
      { id:'s4_06', title:'18:30 — Banho Morno + Higiene Íntima', desc:'Rotina completa', tag:'hig' },
      { id:'s4_07', title:'19:00 — Revisão Espaçada (30 min)', desc:'Temas de hoje na escola', tag:'est' },
      { id:'s4_08', title:'20:30 — Telas OFF + Descanso', desc:'Leitura e respiração 4-7-8', tag:'ment' },
      { id:'s4_09', title:'22:15 — Sono', desc:'Quarto escuro e frio', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Escola'
  },
  5: { // Sexta
    label: 'Sexta-feira', type: 'Escola Dia Inteiro',
    morning: [
      { id:'s5_01', title:'05:00 — Rotina de Despertar', desc:'Água, raspagem, luz natural', tag:'hig' },
      { id:'s5_02', title:'05:15 — Banho Gelado + Skincare + Perfumação', desc:'Sexta: exfoliação facial (1x/semana) antes do skincare', tag:'hig' },
      { id:'s5_03', title:'05:40 — Café Proteico', desc:'Energia para fechar a semana', tag:'bio' },
      { id:'s5_04', title:'05:55 — Deslocamento + Revisão Final da Semana', desc:'Revise mentalmente os principais conceitos da semana', tag:'est' },
    ],
    afternoon: [
      { id:'s5_05', title:'07:20–17:00 — Escola', desc:'Último dia de escola da semana. Feche forte.', tag:'est' },
    ],
    night: [
      { id:'s5_06', title:'18:30 — Banho + Higiene', desc:'Mereça seu descanso da semana', tag:'hig' },
      { id:'s5_07', title:'19:30 — Jantar', desc:'Pode ser um pouco mais tranquilo hoje', tag:'bio' },
      { id:'s5_08', title:'20:30 — Lazer com família/amigos', desc:'Saúde mental é produtividade', tag:'ment' },
      { id:'s5_09', title:'22:30 — Sono', desc:'Pode dormir um pouco mais tarde na sexta', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Escola'
  },
  6: { // Sábado
    label: 'Sábado', type: 'Simulado + Redação + Autocuidado',
    morning: [
      { id:'s6_01', title:'07:00 — Acordar (Regularidade!)', desc:'Mantenha o horário mesmo no fim de semana', tag:'bio' },
      { id:'s6_02', title:'07:30 — Rotina de Higiene Completa', desc:'Banho, skincare, café proteico', tag:'hig' },
      { id:'s6_03', title:'08:30–12:30 — Simulado ENEM Realista', desc:'Cronômetro ligado. Sem celular. Simule o ambiente real de prova', tag:'est' },
    ],
    afternoon: [
      { id:'s6_04', title:'14:00 — Produção de Redação', desc:'Repertórios curingas: filosofia, história, atualidades', tag:'est' },
      { id:'s6_05', title:'16:00 — Autocuidado Master', desc:'Esfoliação facial, corte de unhas, barba/cabelo, hidratação profunda', tag:'hig' },
    ],
    night: [
      { id:'s6_06', title:'19:00 — Jantar + Família', desc:'Lazer consciente — você mereceu', tag:'ment' },
      { id:'s6_07', title:'22:30 — Sono', desc:'Prepare-se para a atividade física do domingo', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Estudo + Autocuidado'
  },
  0: { // Domingo
    label: 'Domingo', type: 'Reset do Sistema',
    morning: [
      { id:'s0_01', title:'Atividade Física Prazerosa ao Ar Livre', desc:'Caminhada, esporte, bike — o que trouxer alegria', tag:'bio' },
      { id:'s0_02', title:'Banho + Hidratação Pós-atividade', desc:'Cuide do corpo que trabalhou', tag:'hig' },
      { id:'s0_03', title:'Café da Manhã Tranquilo', desc:'Aproveite sem pressa', tag:'bio' },
    ],
    afternoon: [
      { id:'s0_04', title:'Organização do Quarto e da Mochila', desc:'Ambiente organizado reduz carga cognitiva e ansiedade', tag:'ment' },
      { id:'s0_05', title:'Revisão da Agenda da Semana', desc:'Planeje segunda-feira — mentalize a semana que virá', tag:'est' },
    ],
    night: [
      { id:'s0_06', title:'Jantar Leve e Cedo', desc:'Prepare o corpo para o sono de recuperação máxima', tag:'bio' },
      { id:'s0_07', title:'Preparação Mental — Meditação', desc:'Visualize a semana sendo executada com excelência', tag:'ment' },
      { id:'s0_08', title:'21:30–22:00 — Sono Antecipado', desc:'Garantir pico de cortisol na segunda-feira cedo', tag:'bio' },
    ],
    aftLabel: '☀️ Tarde — Organização'
  },
};

// ══════════════════════════════════════════
// HIGIENE DATA
// ══════════════════════════════════════════
const BUCAL = [
  { id:'b1', title:'Ao Acordar: Raspagem de Língua', desc:'Cobre ou plástico. Antes de qualquer líquido para evitar ingestão de bactérias' },
  { id:'b2', title:'Após Refeições: Escovação Técnica 45°', desc:'Ângulo de 45° em direção à gengiva. Movimentos vibratórios e de varredura' },
  { id:'b3', title:'Antes de Dormir: Fio Dental Abraçando Cada Dente', desc:'O momento mais crítico — salivação diminui e bactérias proliferam mais rápido' },
  { id:'b4', title:'Antes de Dormir: Escovação Final', desc:'Após o fio dental. Não comer ou beber nada além de água depois' },
];
const CORP = [
  { id:'c1', title:'Lavar as Mãos ANTES de Urinar', desc:'Evitar transferência de germes para a glande' },
  { id:'c2', title:'Secar a Glande após Urinar', desc:'Papel higiênico. Umidade é gatilho para infecções fúngicas' },
  { id:'c3', title:'No Banho: Retrair Prepúcio Totalmente', desc:'Lavar a glande apenas com espuma do sabonete + mãos (sem esponjas abrasivas)' },
  { id:'c4', title:'Secar Minuciosamente a Região Íntima', desc:'A umidade é o principal gatilho para fungos e odores' },
  { id:'c5', title:'Lavar e Secar entre os Dedos dos Pés', desc:'Evitar chulé (bromidrose) e frieiras. Use talco se necessário' },
];
const SKIN_MANHA = [
  { id:'sk1', title:'Lavar Rosto com Sabonete Facial', desc:'Nunca o sabonete do corpo — pH diferente' },
  { id:'sk2', title:'Hidratante Facial', desc:'Aplicar enquanto rosto ainda levemente úmido para melhor absorção' },
  { id:'sk3', title:'Protetor Solar FPS 30+', desc:'Obrigatório mesmo em locais fechados. Previne envelhecimento precoce e manchas' },
];
const SKIN_NOITE = [
  { id:'sk4', title:'Limpeza Profunda com Sabonete Facial', desc:'Remove poluição, sebo e resíduos do dia. Não vá dormir sem fazer' },
  { id:'sk5', title:'Óleo ou Balm para Barba (se tiver barba)', desc:'Hidratação e controle dos fios. Aplicar com movimentos circulares' },
];
const SKIN_EXTRAS = [
  { id:'sx1', title:'Hidratante Corporal ANTES do Perfume', desc:'Cria barreira que prende moléculas da fragrância — duração 2–3x maior' },
  { id:'sx2', title:'Aplicar Perfume em Pontos de Pulso', desc:'Pescoço, pulsos, atrás das orelhas — onde o sangue aquece a fragrância' },
  { id:'sx3', title:'Esfoliação Facial (1x por semana — Sexta/Sábado)', desc:'Remove células mortas e melhora a absorção dos produtos seguintes' },
  { id:'sx4', title:'Cuidado com Unhas e Cabelo (Sábado)', desc:'Parte do refinamento estético total — não negligenciar' },
];

// ══════════════════════════════════════════
// STUDY BLOCKS
// ══════════════════════════════════════════
const STUDY_BLOCKS_BY_DAY = {
  1: [
    { id:'sb1_1', title:'Questões de Matemática', desc:'Mínimo 20 questões. Marque as erradas para revisão', time:'07:30–09:00' },
    { id:'sb1_2', title:'Teoria dos Erros da Sessão Anterior', desc:'Estude APENAS o que você errou. Eficiência máxima', time:'09:00–10:00' },
    { id:'sb1_3', title:'Questões de Ciências da Natureza', desc:'Física, Química ou Biologia. Alternar semanalmente', time:'10:00–11:30' },
  ],
  6: [
    { id:'sb6_1', title:'Simulado Completo — Área 1', desc:'Linguagens + Humanas (90 questões). Cronômetro ligado', time:'08:30–10:30' },
    { id:'sb6_2', title:'Simulado Completo — Área 2', desc:'Ciências + Matemática (90 questões). Sem pausa longa', time:'10:30–12:30' },
    { id:'sb6_3', title:'Correção e Análise de Erros', desc:'Categorize cada erro: distração, desconhecimento ou pegadinha', time:'14:00–15:00' },
    { id:'sb6_4', title:'Produção de Redação', desc:'Tema atual + repertório curinga. Cronometre em 60 min', time:'15:00–16:00' },
  ],
  0: [
    { id:'sb0_1', title:'Revisão Semanal Geral (opcional)', desc:'Apenas o essencial. Domingo é para recarregar', time:'Tarde' },
  ],
};
const DEFAULT_STUDY = [
  { id:'sbD_1', title:'Revisão Noturna (30 min)', desc:'Temas vistos na escola hoje — prática espaçada', time:'19:00–19:30' },
];

// ══════════════════════════════════════════
// HABITS
// ══════════════════════════════════════════
const HABITS = [
  { id:'h_agua', name:'🚿 Banho gelado', color:'accent' },
  { id:'h_sun', name:'☀️ Luz natural manhã', color:'gold' },
  { id:'h_dental', name:'🦷 Higiene bucal noite', color:'accent' },
  { id:'h_telas', name:'📵 Telas OFF 22h', color:'red' },
  { id:'h_sono', name:'😴 Sono às 22:15', color:'accent' },
  { id:'h_quest', name:'📝 Questões ENEM', color:'gold' },
  { id:'h_agua2', name:'💧 Hidratação (água)', color:'cyan' },
  { id:'h_plan', name:'📋 Planejamento noturno', color:'accent' },
];
const WEEK_LABELS = ['D','S','T','Q','Q','S','S'];

// ══════════════════════════════════════════
// FLASHCARDS
// ══════════════════════════════════════════
const FLASHCARDS = [
  { cat:'neuro', q:'Por que dormir às 22:15 é crítico para performance?', a:'Durante o sono profundo (00h–02h) ocorre o pico de GH (hormônio do crescimento) e a limpeza linfática cerebral (sistema glinfático), essencial para consolidação da memória.' },
  { cat:'neuro', q:'O que é ritmo circadiano e como a luz regula o cortisol?', a:'Ritmo de 24h que regula sono, hormônios e metabolismo. A exposição à luz natural pela manhã sinaliza ao hipotálamo para liberar cortisol — o hormônio do estado de alerta.' },
  { cat:'neuro', q:'Por que o celular no outro cômodo melhora o foco?', a:'A mera presença do smartphone (mesmo silenciado e virado) consome carga cognitiva, pois o córtex pré-frontal monitora a possibilidade de notificações, reduzindo a atenção disponível.' },
  { cat:'neuro', q:'O que é a técnica de respiração 4-7-8?', a:'Inspire por 4 segundos, segure por 7, expire por 8. Ativa o sistema parassimpático, reduz o cortisol e prepara o cérebro para o sono. Mais eficaz que contar ovelhas.' },
  { cat:'hig', q:'Por que usar raspador de língua antes de qualquer líquido?', a:'A saburra lingual formada durante o sono é carregada de bactérias. Engolir água antes de remover reintroduz essas bactérias ao organismo. O raspador elimina o biofilme bacteriano da manhã.' },
  { cat:'hig', q:'Por que aplicar hidratante ANTES do perfume?', a:'O hidratante cria uma barreira oclusiva que "aprisionando" as moléculas odoríferas na pele, retardando sua evaporação. Aumenta a longevidade da fragrância em 2–3x.' },
  { cat:'hig', q:'Por que secar completamente a região íntima após o banho?', a:'Fungos e bactérias se multiplicam em ambientes úmidos e quentes. A secagem rigorosa elimina o ambiente ideal para infecções por Candida e bactérias como E. coli.' },
  { cat:'hig', q:'Por que o protetor solar é obrigatório mesmo em locais fechados?', a:'A radiação UVA atravessa vidros e causa fotoenvelhecimento (colágeno, manchas) sem queimar. O dano acumula silenciosamente. FPS 30+ diário é prevenção de manchas e envelhecimento precoce.' },
  { cat:'bio', q:'Por que o banho gelado gera pico de dopamina?', a:'A imersão em água fria ativa o sistema noradrenérgico e libera dopamina e norepinefrina, aumentando o estado de alerta, motivação e concentração por horas após o banho.' },
  { cat:'bio', q:'Por que evitar gorduras e açúcares à noite?', a:'Insulina alta inibe o GH liberado no sono. Gorduras saturadas retardam o esvaziamento gástrico, elevando a temperatura corporal e dificultando a queda de temperatura necessária para o sono profundo.' },
  { cat:'enem', q:'O que é a Prática Espaçada e por que é eficaz?', a:'Revisar o conteúdo em intervalos crescentes (1h depois, 1 dia, 3 dias, 7 dias). Cada evocação fortalece o engrama neural. Retém até 300% mais que a releitura passiva.' },
  { cat:'enem', q:'Por que questões primeiro, teoria depois?', a:'O "efeito de desafio gerado" (Generation Effect): tentar responder antes de aprender cria lacunas cognitivas que tornam o cérebro biologicamente mais receptivo à informação subsequente.' },
  { cat:'enem', q:'Qual a diferença entre cochilo de 20 min e 90 min?', a:'20 min = fases 1 e 2 do sono (sem sono profundo). Acorda energizado. 90 min = ciclo completo, ideal se tiver tempo. Acordar no meio do sono profundo (30–60 min) gera "inércia do sono" — pior que não dormir.' },
  { cat:'bio', q:'Por que lavar as mãos ANTES de urinar?', a:'As mãos tocam superfícies contaminadas (celular, dinheiro, maçanetas) constantemente. A glande é mucosa úmida — altamente susceptível a patógenos transferidos digitalmente durante a micção.' },
];

let fcFilter = 'all';
let fcFiltered = [...FLASHCARDS];
let fcIdx = 0;

// ══════════════════════════════════════════
// RENDER FUNCTIONS
// ══════════════════════════════════════════

function renderDash() {
  const d = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('dash-date').textContent = d.toLocaleDateString('pt-BR', opts);

  const quotes = [
    'Trate seu corpo como uma máquina de precisão.',
    'Consistência é a chave para o pico de GH e limpeza cerebral.',
    'Higiene de informação: o celular rouba carga cognitiva mesmo silenciado.',
    'A luz azul inibe a melatonina por até 90 minutos. Telas OFF antes do sono.',
    'Questões primeiro, teoria depois. Não perca tempo com resumos coloridos.',
    'Um ambiente organizado reduz a ansiedade e libera energia cognitiva.',
    'Saúde mental é produtividade. Descanso é parte do método.',
    'O hidratante antes do perfume triplica a duração da fragrância.',
  ];
  const qEl = document.getElementById('dash-quote');
  if (qEl) qEl.textContent = quotes[d.getDate() % quotes.length];

  // calc scores
  const dayData = getCurrentDayData(WEEKDAY);
  const allRot = [...(dayData.morning||[]), ...(dayData.afternoon||[]), ...(dayData.night||[])];
  const rotDone = allRot.filter(i => S.rotina[i.id]).length;
  const rotPct = allRot.length ? Math.round((rotDone/allRot.length)*100) : 0;

  const allHig = [...BUCAL, ...CORP, ...SKIN_MANHA, ...SKIN_NOITE];
  const higDone = allHig.filter(i => S.higiene[i.id]).length;
  const higPct = allHig.length ? Math.round((higDone/allHig.length)*100) : 0;

  const blocks = STUDY_BLOCKS_BY_DAY[WEEKDAY] || DEFAULT_STUDY;
  const estDone = blocks.filter(b => S.study[b.id]).length;
  const estPct = blocks.length ? Math.round((estDone/blocks.length)*100) : 0;

  const overall = Math.round((rotPct + higPct + estPct) / 3);

  document.getElementById('d-rot').textContent = rotPct + '%';
  document.getElementById('d-rot-lbl').textContent = rotDone + '/' + allRot.length + ' etapas';
  document.getElementById('d-hig').textContent = higPct + '%';
  document.getElementById('d-est').textContent = estPct + '%';
  document.getElementById('d-est-lbl').textContent = estDone + '/' + blocks.length + ' blocos';
  document.getElementById('d-dia').textContent = dayData.label.split('-')[0].trim();
  document.getElementById('d-dia-lbl').textContent = dayData.type;

  document.getElementById('score-num').textContent = overall;
  const circle = document.getElementById('score-circle');
  const circ = 2 * Math.PI * 38;
  circle.style.strokeDashoffset = circ - (circ * overall / 100);

  const bar = document.getElementById('score-bar');
  if (bar) bar.style.width = overall + '%';

  const labels = [
    [0,  'Sistema Offline',  'Complete suas rotinas do dia'],
    [20, 'Iniciando Motores','Bom começo — continue!'],
    [40, 'Aquecendo',        'Você está no caminho certo'],
    [60, 'Alta Performance', 'Meio caminho, foco total!'],
    [80, 'Modo Titã Ativo',  'Impressionante consistência'],
    [95, 'APEX COMPLETO',   'Dia perfeito executado! 🔱'],
  ];
  let lbl = labels[0];
  labels.forEach(l => { if (overall >= l[0]) lbl = l; });
  document.getElementById('score-label').textContent = lbl[1];
  document.getElementById('score-sub').textContent = lbl[2];

  // next event
  const hour = d.getHours() * 60 + d.getMinutes();
  const EVENTS = [
    { m:300, title:'Acordar + Água + Raspagem', tag:'hig' },
    { m:315, title:'Luz natural (10–15 min)', tag:'bio' },
    { m:330, title:'Exercício matinal / HIIT', tag:'bio' },
    { m:350, title:'Banho + Skincare', tag:'hig' },
    { m:380, title:'Café da Manhã Proteico', tag:'bio' },
    { m:450, title:'Bloco de Estudo / Deslocamento', tag:'est' },
    { m:780, title:'Escola / Estágio', tag:'est' },
    { m:1110, title:'Chegada + Banho', tag:'hig' },
    { m:1170, title:'Jantar', tag:'bio' },
    { m:1230, title:'Telas OFF', tag:'ment' },
    { m:1290, title:'Planejamento + Gratidão', tag:'ment' },
    { m:1335, title:'Sono Total 💤', tag:'bio' },
  ];
  const next = EVENTS.find(e => e.m > hour) || EVENTS[EVENTS.length - 1];
  const hh = Math.floor(next.m / 60).toString().padStart(2,'0');
  const mm = (next.m % 60).toString().padStart(2,'0');
  const tagMap = { hig:'pill-accent', est:'pill-gold', bio:'pill-cyan', ment:'pill-red' };
  const nec = document.getElementById('next-event-content');
  if (nec) nec.innerHTML = `
    <div style="font-family:var(--font-display);font-weight:700;font-size:22px;letter-spacing:-0.5px;margin-bottom:6px">${hh}:${mm}</div>
    <div style="font-size:14px;font-weight:500;margin-bottom:8px">${next.title}</div>
    <span class="pill ${tagMap[next.tag]||'pill-accent'}">${next.tag.toUpperCase()}</span>
  `;

  // pillars
  const pillars = document.getElementById('pillars-today');
  if (pillars) pillars.innerHTML = [
    { icon:'🌅', title:'Manhã', val: rotDone > 0 ? '✓ Iniciada':'Pendente', done: rotDone > 0 },
    { icon:'🧼', title:'Higiene', val: higPct+'%', done: higPct > 0 },
    { icon:'📚', title:'Estudo', val: estDone+'/'+blocks.length, done: estDone > 0 },
    { icon:'💤', title:'Sono', val:'22:15', done: false },
  ].map(p => `
    <div style="display:flex;align-items:center;gap:10px">
      <div style="font-size:18px">${p.icon}</div>
      <div style="flex:1">
        <div style="font-size:12px;color:var(--text2)">${p.title}</div>
        <div style="font-size:13px;font-weight:500;color:${p.done?'var(--accent)':'var(--text)'}">${p.val}</div>
      </div>
    </div>
  `).join('');
}

function renderRotina(dayNum) {
  if (editMode) {
    renderDayEditForm();
    return;
  }
  
  selectedDay = dayNum;
  const wt = document.getElementById('week-tabs');
  if (!wt) return;
  wt.innerHTML = '';
  const dayNames = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const dayTypes = {1:'Push+Est',2:'Escola',3:'Escola+Est',4:'Escola',5:'Escola',6:'Simulado',0:'Reset'};
  const restDays = [0,6];
  [1,2,3,4,5,6,0].forEach(d => {
    const btn = document.createElement('div');
    const isRest = restDays.includes(d);
    const isToday = d === WEEKDAY;
    btn.className = 'week-tab' + (isRest ? ' rest':'') + ((selectedDay||WEEKDAY) === d ? ' active':'');
    btn.textContent = dayNames[d] + (isToday ? ' ★':'');
    btn.title = dayTypes[d] || '';
    btn.onclick = () => renderRotina(d);
    wt.appendChild(btn);
  });

  const day = getCurrentDayData(selectedDay !== undefined ? selectedDay : WEEKDAY);

  const lbl = document.getElementById('rot-aft-label');
  if (lbl) lbl.textContent = day.aftLabel || '☀️ Tarde';

  renderCheckSection('rot-morning', day.morning || [], 'rotina');
  renderCheckSection('rot-afternoon', day.afternoon || [], 'rotina');
  renderCheckSection('rot-night', day.night || [], 'rotina');
}

function renderCheckSection(containerId, items, stateKey) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  if (!items.length) { c.innerHTML = '<div style="color:var(--text3);font-size:12px">Nenhuma etapa para este período</div>'; return; }
  items.forEach(item => {
    const done = S[stateKey][item.id];
    const div = document.createElement('div');
    div.className = 'check-item' + (done ? ' done':'');
    div.onclick = () => toggleItem(item.id, stateKey, containerId, items);
    const tagMap = { hig:'tag-hig', est:'tag-est', bio:'tag-bio', ment:'tag-ment' };
    div.innerHTML = `
      <div class="checkbox ${done?'on':''}"></div>
      <div class="check-info">
        <div class="check-title">${item.title}</div>
        <div class="check-sub">${item.desc}</div>
      </div>
      ${item.tag ? `<div class="check-tag ${tagMap[item.tag]||'tag-hig'}">${item.tag}</div>` : ''}
    `;
    c.appendChild(div);
  });
}

function toggleItem(id, stateKey, containerId, items) {
  S[stateKey][id] = !S[stateKey][id];
  saveS();
  if (S[stateKey][id]) toast('✅ Etapa concluída!');
  renderCheckSection(containerId, items, stateKey);
  renderDash();
}

function renderHigiene() {
  renderSkinSteps('bucal-list', BUCAL, 'higiene');
  renderSkinSteps('corp-list', CORP, 'higiene');
  renderSkinSteps('skin-manha', SKIN_MANHA, 'higiene');
  renderSkinSteps('skin-noite', SKIN_NOITE, 'higiene');
  renderSkinSteps('skin-extras', SKIN_EXTRAS, 'higiene');
}

function renderSkinSteps(cid, items, sk) {
  const c = document.getElementById(cid);
  if (!c) return;
  c.innerHTML = '';
  items.forEach((item, i) => {
    const done = S[sk][item.id];
    const div = document.createElement('div');
    div.className = 'skin-step' + (done ? ' done':'');
    div.onclick = () => {
      S[sk][item.id] = !S[sk][item.id];
      saveS();
      if (S[sk][item.id]) toast('✅ ' + item.title.split(':')[0]);
      renderHigiene(); renderDash();
    };
    div.innerHTML = `
      <div class="step-num ${done?'done-num':''}">${i+1}</div>
      <div class="step-info">
        <div class="step-title">${item.title}</div>
        <div class="step-desc">${item.desc}</div>
      </div>
      <div class="step-check ${done?'on':''}"></div>
    `;
    c.appendChild(div);
  });
}

function renderStudy() {
  const blocks = STUDY_BLOCKS_BY_DAY[WEEKDAY] || DEFAULT_STUDY;
  const c = document.getElementById('study-blocks');
  if (!c) return;
  c.innerHTML = '';
  blocks.forEach(b => {
    const done = S.study[b.id];
    const div = document.createElement('div');
    div.className = 'check-item' + (done ? ' done':'');
    div.onclick = () => {
      S.study[b.id] = !S.study[b.id];
      saveS();
      if (S.study[b.id]) toast('📚 Bloco concluído!');
      renderStudy(); renderDash();
    };
    div.innerHTML = `
      <div class="checkbox ${done?'on':''}"></div>
      <div class="check-info">
        <div class="check-title">${b.title}</div>
        <div class="check-sub">${b.desc} <span style="color:var(--gold)">— ${b.time}</span></div>
      </div>
    `;
    c.appendChild(div);
  });

  const done = blocks.filter(b => S.study[b.id]).length;
  const pct = blocks.length ? Math.round((done/blocks.length)*100) : 0;
  const lbl = document.getElementById('study-done-label');
  const bar = document.getElementById('study-bar');
  if (lbl) lbl.textContent = done + ' / ' + blocks.length + ' blocos';
  if (bar) bar.style.width = pct + '%';

  // redacao
  const redSteps = [
    {id:'r1', t:'Escolher o tema da redação', d:'Use tema atual ou do banco de simulados'},
    {id:'r2', t:'Levantar repertório curinga', d:'Filosofia (Rousseau, Hobbes), história, estatísticas'},
    {id:'r3', t:'Estruturar a proposta de intervenção', d:'Agente, ação, modo, finalidade, efeito esperado'},
    {id:'r4', t:'Escrever em 60 minutos cronometrado', d:'Simule as condições reais do ENEM'},
    {id:'r5', t:'Revisar conectivos e concordância', d:'Leia em voz baixa para pegar erros de fluência'},
  ];
  const rc = document.getElementById('redacao-list');
  if (rc) {
    rc.innerHTML = '';
    redSteps.forEach(s => {
      const done2 = S.study['red_'+s.id];
      const d2 = document.createElement('div');
      d2.className = 'check-item' + (done2?' done':'');
      d2.onclick = () => {
        S.study['red_'+s.id] = !S.study['red_'+s.id];
        saveS(); renderStudy();
      };
      d2.innerHTML = `<div class="checkbox ${done2?'on':''}"></div><div class="check-info"><div class="check-title">${s.t}</div><div class="check-sub">${s.d}</div></div>`;
      rc.appendChild(d2);
    });
  }

  // notes list
  const nl = document.getElementById('study-notes-list');
  if (nl) {
    nl.innerHTML = '';
    S.studyNotes.slice(-3).reverse().forEach(n => {
      nl.innerHTML += `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:10px;margin-top:8px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <div style="font-weight:500;font-size:13px">${n.subject}</div>
          <div style="font-size:10px;color:var(--text3)">${n.date}</div>
        </div>
        ${n.notes ? `<div style="font-size:12px;color:var(--text2)">${n.notes}</div>` : ''}
        ${n.score ? `<div style="margin-top:4px"><span class="pill pill-gold">${n.score}% acertos</span></div>` : ''}
      </div>`;
    });
  }
}

function saveStudyNote() {
  const sub = document.getElementById('study-subject').value.trim();
  const notes = document.getElementById('study-notes').value.trim();
  const score = document.getElementById('study-score').value;
  if (!sub) { toast('⚠️ Digite a matéria estudada'); return; }
  S.studyNotes.push({
    subject: sub, notes, score,
    date: new Date().toLocaleDateString('pt-BR', {day:'2-digit',month:'2-digit'})
  });
  if (S.studyNotes.length > 20) S.studyNotes.shift();
  saveS();
  document.getElementById('study-subject').value = '';
  document.getElementById('study-notes').value = '';
  document.getElementById('study-score').value = '';
  toast('💾 Registro salvo!');
  renderStudy();
}

function renderHabits() {
  const now = new Date();
  const weekDays = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    weekDays.push({ day: WEEK_LABELS[d.getDay()], key: d.toDateString() });
  }

  const hdr = document.getElementById('habit-header');
  if (hdr) {
    hdr.innerHTML = weekDays.map((w, i) => `
      <div style="width:26px;text-align:center;font-size:10px;color:${i===6?'var(--accent)':'var(--text3)'};font-family:var(--font-display);font-weight:700">${w.day}</div>
    `).join('');
  }

  const rows = document.getElementById('habit-rows');
  if (!rows) return;
  rows.innerHTML = '';
  let totalDots = 0, doneDots = 0;

  HABITS.forEach(h => {
    if (!S.habits[h.id]) S.habits[h.id] = {};
    const row = document.createElement('div');
    row.className = 'habit-row';
    const streak = weekDays.filter(w => S.habits[h.id][w.key]).length;
    totalDots += 7; doneDots += streak;
    row.innerHTML = `
      <div class="habit-name" style="min-width:140px;max-width:140px">${h.name}</div>
      <div class="habit-dots" id="hd-${h.id}"></div>
      <div class="habit-streak" style="color:${streak>=5?'var(--gold)':streak>=3?'var(--accent)':'var(--text3)'}">${streak}🔥</div>
    `;
    rows.appendChild(row);

    const dotWrap = row.querySelector(`#hd-${h.id}`);
    weekDays.forEach((w, i) => {
      const on = S.habits[h.id][w.key];
      const dot = document.createElement('div');
      dot.className = 'habit-dot' + (on ? (h.color==='gold'?' gold-on':' on'):'');
      dot.textContent = w.day;
      dot.onclick = () => {
        S.habits[h.id][w.key] = !S.habits[h.id][w.key];
        saveS();
        if (S.habits[h.id][w.key]) toast('🔥 +1 ' + h.name);
        renderHabits();
      };
      dotWrap.appendChild(dot);
    });
  });

  const pct = totalDots ? Math.round((doneDots/totalDots)*100) : 0;
  const pctEl = document.getElementById('habit-total-pct');
  const bar = document.getElementById('habit-bar');
  if (pctEl) pctEl.textContent = pct + '%';
  if (bar) bar.style.width = pct + '%';

  // achievements
  const ach = document.getElementById('habit-achievements');
  if (ach) {
    const achievements = [];
    HABITS.forEach(h => {
      const streak = weekDays.filter(w => (S.habits[h.id]||{})[w.key]).length;
      if (streak >= 7) achievements.push({ icon:'🏆', txt: h.name + ' — Semana Perfeita!' });
      else if (streak >= 5) achievements.push({ icon:'🔥', txt: h.name + ' — 5 dias seguidos' });
    });
    if (pct >= 80) achievements.push({ icon:'⚡', txt: 'Consistência de elite — +80% esta semana' });
    ach.innerHTML = achievements.length
      ? achievements.map(a => `<span class="pill pill-gold">${a.icon} ${a.txt}</span>`).join('')
      : '<div style="color:var(--text3);font-size:12px">Complete hábitos para desbloquear conquistas!</div>';
  }
}

function renderFlashcards() {
  fcFiltered = fcFilter === 'all' ? [...FLASHCARDS] : FLASHCARDS.filter(c => c.cat === fcFilter);
  if (fcIdx >= fcFiltered.length) fcIdx = 0;
  showCard();
}

function showCard() {
  const fc = document.getElementById('fc-card-area');
  if (!fc || !fcFiltered.length) return;
  const card = fcFiltered[fcIdx];
  fc.innerHTML = `
    <div class="flashcard" id="fc-main" onclick="revealCard()">
      <div class="fc-question">${card.q}</div>
      <div class="fc-answer">${card.a}</div>
      <div class="fc-hint">Clique para revelar a resposta</div>
    </div>
  `;
  document.getElementById('fc-counter').textContent = (fcIdx+1) + ' / ' + fcFiltered.length;
}

function revealCard() {
  const fc = document.getElementById('fc-main');
  if (!fc) return;
  fc.classList.toggle('revealed');
  const hint = fc.querySelector('.fc-hint');
  if (hint) hint.style.display = fc.classList.contains('revealed') ? 'none' : '';
}
function nextCard() { fcIdx = (fcIdx+1) % fcFiltered.length; showCard(); }
function prevCard() { fcIdx = (fcIdx - 1 + fcFiltered.length) % fcFiltered.length; showCard(); }
function setFcFilter(f, btn) {
  fcFilter = f; fcIdx = 0;
  document.querySelectorAll('#fc-filter .btn').forEach(b => b.classList.remove('btn-prime'));
  document.querySelectorAll('#fc-filter .btn').forEach(b => b.classList.add('btn-ghost'));
  btn.classList.add('btn-prime'); btn.classList.remove('btn-ghost');
  renderFlashcards();
}

// ══════════════════════════════════════════
// REFRESH ALL
// ══════════════════════════════════════════
function refreshAll() {
  renderDash();
  renderRotina();
  renderHigiene();
  renderStudy();
  renderHabits();
  renderFlashcards();
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
loadS();
initDaysData();
refreshAll();
setInterval(renderDash, 60000);
