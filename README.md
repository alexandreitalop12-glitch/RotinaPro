# 📋 APEX — Sistema de Alta Performance
## Documentação Técnica Completa

---

## 📌 Visão Geral do Projeto

**APEX** é um aplicativo web de gerenciamento de rotina e produtividade pessoal. Funciona como um dashboard integrado que monitora e rastreia:
- ✅ Rotina diária por dia da semana
- 🧼 Protocolo de higiene e skincare
- 📚 Blocos de estudo para ENEM
- 🔥 Rastreamento de hábitos semanais
- 🧠 Flashcards para memorização
- ⚡ Score de performance diária

**Tecnologia**: HTML5 + CSS3 + Vanilla JavaScript (sem frameworks)
**Persistência**: LocalStorage (dados salvos no navegador)
**Responsivo**: Funciona em desktop e mobile

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos
```
RotinaPro/
├── index.html      (15.8 KB) - Marcação HTML + Componentes UI
├── styles.css      (20.2 KB) - Estilos, cores e layout
└── scripts.js      (48.1 KB) - Lógica, dados e funcionalidades
```

### Separação de Responsabilidades (MVC)
- **View (HTML)**: Estrutura dos componentes na tela
- **Style (CSS)**: Aparência visual, cores, animações
- **Controller (JS)**: Lógica de negócio, gerenciamento de estado, interatividade

---

## 📄 ARQUIVO: index.html

### Estrutura Geral
```html
<!DOCTYPE html>           ← Declaração do padrão HTML5
<html lang="pt-BR">       ← Linguagem portuguesa do Brasil
<head>                    ← Metadados e links externos
  <meta charset="UTF-8">  ← Suporte a caracteres acentuados
  <meta name="viewport">  ← Responsive design para mobile
  <link rel="stylesheet" href="styles.css"> ← Link para CSS
</head>
<body>                    ← Conteúdo visível da página
  <div class="app">       ← Container principal da aplicação
    <nav class="sidebar"> ← Barra de navegação lateral (68px)
    <main class="main">   ← Área principal de conteúdo
  </div>
  <script src="scripts.js"> ← Link para JavaScript
</body>
</html>
```

### Componentes Principais

#### 1. **SIDEBAR (Navegação)**
```html
<nav class="sidebar">
  <div class="logo">APEX</div>           ← Logo vertical animado
  <div class="nav-items">               ← 6 botões de navegação
    <div class="nav-item" onclick="go('dash')">
      <span class="nav-icon">⚡</span>  ← Ícone do menu
      <span class="nav-tip">Dashboard</span> ← Tooltip ao passar mouse
    </div>
```

**Páginas Acessíveis:**
- ⚡ Dashboard (Visão geral)
- 📅 Rotina Diária (Checklist por período do dia)
- 🧼 Higiene & Skincare (Protocolo de higiene)
- 📚 Estudo ENEM (Blocos de estudo)
- 🔥 Hábitos (Rastreador semanal)
- 🧠 Flashcards (Memorização)

#### 2. **DASHBOARD (Página Principal)**
```html
<div class="page active" id="page-dash">
  <!-- Score Ring (SVG animado) -->
  <svg width="90" height="90" viewBox="0 0 90 90">
    <!-- Círculo de progresso com gradiente -->
    <circle stroke="url(#pg)" stroke-dasharray="238.76" id="score-circle"/>
  </svg>
  
  <!-- Cards de estatísticas -->
  <div class="g4 mb2">  ← Grid com 4 colunas
    <div class="stat">
      <div class="stat-val" id="d-rot">0%</div>  ← Dinâmico, atualizado por JS
    </div>
  </div>
</div>
```

**O que o Dashboard Mostra:**
- Score geral (0-100%) com anel de progresso animado
- Percentual de conclusão: Rotina, Higiene, Estudo
- Próximo evento do dia
- Pilares de hoje (ícones coloridos)

#### 3. **ROTINA DIÁRIA**
```html
<div id="page-rotina">
  <div class="week-tabs" id="week-tabs"></div>  ← Abas dos 7 dias (geradas por JS)
  <button onclick="toggleEditMode()">✏️ Editar</button>
  
  <div class="g2">  ← Grid com 2 colunas
    <div class="card">
      <div id="rot-morning"></div>   ← Manhã (checklist)
      <div id="rot-afternoon"></div> ← Tarde (checklist)
      <div id="rot-night"></div>     ← Noite (checklist)
    </div>
  </div>
</div>
```

**Funcionalidade:**
- Clique em um dia para ver sua rotina específica
- Cada tarefa é um checkbox clicável
- Modo edição permite adicionar/remover/editar tarefas

#### 4. **HIGIENE & SKINCARE**
```html
<div id="page-higiene">
  <div class="card">
    <div id="bucal-list"></div>      ← Higiene bucal
    <div id="corp-list"></div>       ← Higiene corporal
    <div id="skin-manha"></div>      ← Skincare manhã
    <div id="skin-noite"></div>      ← Skincare noite
    <div id="skin-extras"></div>     ← Extras (perfume, etc)
  </div>
</div>
```

#### 5. **ESTUDO ENEM**
```html
<div id="page-enem">
  <div id="study-blocks"></div>      ← Blocos de estudo do dia
  <div id="redacao-list"></div>      ← Etapas de redação
  <div id="study-notes-list"></div>  ← Histórico de notas
</div>
```

#### 6. **HÁBITOS**
```html
<div id="page-habitos">
  <div id="habit-header"></div>      ← Dias da semana (D S T Q Q S S)
  <div id="habit-rows"></div>        ← 8 hábitos com 7 quadrados de dias
  <div id="habit-achievements"></div> ← Badges desbloqueadas
</div>
```

#### 7. **FLASHCARDS**
```html
<div id="page-flashcard">
  <div id="fc-filter">               ← Filtro por categoria
    <button onclick="setFcFilter('all')">Todos</button>
    <button onclick="setFcFilter('bio')">Bio/Química</button>
  </div>
  <div id="fc-card-area"></div>      ← Card revelável
</div>
```

---

## 🎨 ARQUIVO: styles.css

### Variáveis CSS (Sistema de Design)
```css
:root {
  /* Cores de fundo */
  --bg: #080810;           ← Preto quase puro (fundo principal)
  --bg2: #0e0e1a;          ← Cinza muito escuro (sidebar)
  --bg3: #14141f;          ← Cinza escuro (elementos internos)
  --card: #111120;         ← Cor dos cards
  --card2: #191928;        ← Cards hover
  
  /* Cores de destaque */
  --accent: #7b61ff;       ← Roxo (tema principal)
  --gold: #f5c842;         ← Ouro (destaque secundário)
  --cyan: #00e5c8;         ← Ciano (terceiro destaque)
  --red: #ff4f6d;          ← Vermelho (alertas)
  
  /* Cores de texto */
  --text: #ededf5;         ← Branco suave
  --text2: #8888aa;        ← Cinza claro (texto secundário)
  --text3: #44445a;        ← Cinza escuro (texto terciário)
  
  /* Fontes */
  --font-display: 'Syne', sans-serif;    ← Títulos (geometria ousada)
  --font-body: 'DM Sans', sans-serif;    ← Corpo (legibilidade)
  
  /* Espaçamento */
  --r: 12px;   ← Border-radius pequeno
  --r2: 18px;  ← Border-radius grande
}
```

### Principais Seções de CSS

#### 1. **Reset e Base**
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
/* Remove espaçamentos padrão e usa border-box para cálculos */

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}

/* Fundo com padrão de grid sutil */
body::before {
  background-image:
    linear-gradient(rgba(123,97,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123,97,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

#### 2. **SIDEBAR**
```css
.sidebar {
  width: 68px;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  z-index: 100;  ← Fica acima de tudo
}

.logo {
  writing-mode: vertical-rl;  ← Texto vertical (de baixo para cima)
  transform: rotate(180deg);  ← Inverte para ficar legível
  text-shadow: 0 0 20px rgba(123,97,255,0.5);  ← Brilho roxo
}

.nav-item {
  height: 46px;
  border-radius: var(--r);
  cursor: pointer;
  transition: all 0.2s;  ← Animação suave ao hover
}

.nav-item:hover { background: var(--bg3); }
.nav-item.active { background: var(--accent-glow); }
/* .active é adicionada por JavaScript quando a página está ativa */
```

#### 3. **MAIN (Conteúdo)**
```css
.main {
  margin-left: 68px;  ← Desloca para dar espaço ao sidebar
  padding: 28px 28px 60px;
  flex: 1;
  max-width: calc(100vw - 68px);
}

.page {
  display: none;  ← Todas as páginas começam ocultas
}

.page.active {
  display: block;  ← Classe .active mostra a página
  animation: fadeUp 0.35s ease;  ← Animação de entrada
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

#### 4. **CARDS**
```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 22px;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: var(--border2);  ← Borda fica mais visível ao hover
}

.card-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text3);
}
```

#### 5. **GRIDS (Layout Responsivo)**
```css
.g2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  /* Colunas com min 260px, máximo 1fr cada
     auto-fit: cria o máximo de colunas que cabem */
  gap: 14px;
}

.g4 {
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  /* 4 itens pequenos por linha */
}
```

#### 6. **CHECKBOXES & TOGGLES**
```css
.checkbox {
  width: 20px; height: 20px;
  border: 1.5px solid var(--border2);
  border-radius: 6px;
  transition: all 0.18s;
}

.checkbox.on {
  background: var(--accent);
  border-color: var(--accent);
}

.checkbox.on::after {
  content: '✓';  ← Marca de check
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}
```

#### 7. **EDIT MODE**
```css
.edit-mode .checkbox { display: none; }
.edit-mode .edit-controls { display: flex; }
.edit-mode .add-item-btn { display: block; }
/* Estilos específicos ativados quando editMode = true */

.edit-input {
  background: var(--bg3);
  border: 1px solid var(--border2);
  color: var(--text);
}

.edit-input:focus {
  outline: none;
  border-color: var(--accent);  ← Borda roxo ao focar
}
```

#### 8. **TOAST (Notificações)**
```css
.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  /* Começa fora da tela (embaixo) */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* Bezier: animação com bounce */
  pointer-events: none;  ← Não interfere com cliques
  z-index: 999;  ← Fica acima de tudo
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  /* Anima para cima quando .show é adicionada */
}
```

#### 9. **RESPONSIVIDADE**
```css
@media (max-width: 560px) {
  .main { padding: 14px; }
  .sidebar { width: 54px; }
  .habit-dots { display: none; }
  /* Ajusta layout para mobile */
}
```

---

## 🔧 ARQUIVO: scripts.js

### Seção 1: ESTADO (State Management)

#### 1.1 Inicialização
```javascript
let S = {};  // Objeto global que armazena TODOS os dados
const TODAY = new Date();
const WEEKDAY = TODAY.getDay();  // 0=Dom, 1=Seg, 2=Ter, ..., 6=Sab

function loadS() {
  // Define estrutura padrão dos dados
  const d = {
    rotina: {},        // { id_tarefa: true/false }
    higiene: {},       // { id_higiene: true/false }
    study: {},         // { id_bloco: true/false }
    habits: {},        // { id_habito: { "dataString": true/false } }
    studyNotes: [],    // Array de anotações de estudo
    lastReset: TODAY.toDateString(),  // Data da última sincronização
  };
  
  const saved = localStorage.getItem('apex_v2');
  // localStorage: dados persistem mesmo fechando o navegador
  
  S = saved ? {...d, ...JSON.parse(saved)} : d;
  // Se há dados salvos, mescla com o padrão
  
  if (S.lastReset !== TODAY.toDateString()) {
    // Se é um novo dia, reseta os checkboxes
    S.rotina = {}; S.higiene = {}; S.study = {};
    S.lastReset = TODAY.toDateString();
    saveS();
  }
}

function saveS() {
  // Converte objeto S em JSON e salva no localStorage
  localStorage.setItem('apex_v2', JSON.stringify(S));
  // Dados salvos persistem entre sessões
}
```

### Seção 2: EDIT MODE (Edição de Rotina)

#### 2.1 Estado da Edição
```javascript
let editMode = false;              // Ativado ao clicar "✏️ Editar"
let customDaysData = null;         // Cópia dos DAYS_DATA personalizados
let selectedDay = undefined;       // Qual dia está sendo editado

function getDaysData() {
  // Retorna dados personalizados ou originais
  if (customDaysData) return customDaysData;
  const saved = localStorage.getItem('apex_days_data');
  return saved ? JSON.parse(saved) : null;
  // null significa usar DAYS_DATA original (ver seção 4)
}

function saveDaysData(data) {
  // Salva edições no localStorage e memória
  customDaysData = data;
  localStorage.setItem('apex_days_data', JSON.stringify(data));
}
```

#### 2.2 Toggle de Modo Edição
```javascript
function toggleEditMode() {
  editMode = !editMode;  // Alterna true ↔ false
  
  const btn = document.getElementById('edit-toggle-btn');
  if (btn) {
    btn.classList.toggle('active', editMode);
    // Adiciona/remove classe .active ao botão
    btn.textContent = editMode ? '❌ Sair da Edição' : '✏️ Editar Rotina';
  }
  
  const page = document.getElementById('page-rotina');
  if (page) {
    page.classList.toggle('edit-mode', editMode);
    // Adiciona/remove classe .edit-mode para mostrar inputs
  }
  
  if (editMode) {
    renderDayEditForm();  // Renderiza formulário de edição
  } else {
    renderRotina();  // Volta à visualização normal
  }
}
```

#### 2.3 Renderizar Formulário de Edição
```javascript
function renderDayEditForm() {
  const dayNum = selectedDay !== undefined ? selectedDay : WEEKDAY;
  const data = getDaysData() || DAYS_DATA;  // Prefere personalizados
  const day = data[dayNum] || DAYS_DATA[1];  // Volta ao padrão se vazio
  
  const container = document.getElementById('rotina-content');
  
  // Cria HTML para edição
  let html = `
    <div class="day-edit-row">
      <input id="edit-day-label" value="${day.label || ''}">
      <input id="edit-day-type" value="${day.type || ''}">
      <input id="edit-day-aftlabel" value="${day.aftLabel || ''}">
    </div>
    <button onclick="saveDayEdit(${dayNum})">💾 Salvar</button>
  `;
  
  // Adiciona seções (manhã, tarde, noite)
  html += renderEditSection('Manhã', day.morning || [], 'morning', dayNum);
  html += renderEditSection('Tarde', day.afternoon || [], 'afternoon', dayNum);
  html += renderEditSection('Noite', day.night || [], 'night', dayNum);
  
  container.innerHTML = html;
}

function renderEditSection(title, items, sectionKey, dayNum) {
  let html = `<div style="margin-bottom:20px">`;
  
  items.forEach((item, idx) => {
    html += `
      <div class="edit-row">
        <input id="edit-title-${sectionKey}-${idx}" value="${item.title || ''}">
        <select id="edit-tag-${sectionKey}-${idx}">
          <option value="hig" ${item.tag === 'hig' ? 'selected' : ''}>Higiene</option>
          <option value="bio" ${item.tag === 'bio' ? 'selected' : ''}>Biológico</option>
          <option value="est" ${item.tag === 'est' ? 'selected' : ''}>Estudo</option>
          <option value="ment" ${item.tag === 'ment' ? 'selected' : ''}>Mental</option>
        </select>
        <button onclick="deleteItem(${dayNum}, '${sectionKey}', ${idx})">🗑️</button>
      </div>
    `;
  });
  
  html += `<button onclick="addNewItem(${dayNum}, '${sectionKey}')">+ Adicionar</button></div>`;
  return html;
}

function saveDayEdit(dayNum) {
  // Lê valores dos inputs e salva
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

function deleteItem(dayNum, sectionKey, idx) {
  if (!confirm('Tem certeza que deseja excluir?')) return;
  
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  data[dayNum][sectionKey].splice(idx, 1);  // Remove elemento do array
  saveDaysData(data);
  toast('🗑️ Tarefa excluída');
  renderDayEditForm();
}

function addNewItem(dayNum, sectionKey) {
  const data = getDaysData() || JSON.parse(JSON.stringify(DAYS_DATA));
  
  if (!data[dayNum][sectionKey]) {
    data[dayNum][sectionKey] = [];
  }
  
  const newItem = {
    id: `custom_${dayNum}_${sectionKey}_${Date.now()}`,
    title: 'Nova Tarefa',
    desc: 'Descrição',
    tag: 'bio'
  };
  
  data[dayNum][sectionKey].push(newItem);
  saveDaysData(data);
  toast('➕ Nova tarefa adicionada!');
  renderDayEditForm();
}
```

### Seção 3: NAVEGAÇÃO

```javascript
function go(p) {
  // Remove classe .active de todas as páginas
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  
  // Remove classe .active de todos os nav-items
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  
  // Adiciona .active à página selecionada
  document.getElementById('page-' + p).classList.add('active');
  
  // Adiciona .active ao botão do nav
  document.querySelector(`[data-p="${p}"]`).classList.add('active');
  
  // Recarrega conteúdo da página
  refreshAll();
}
```

### Seção 4: DADOS (DAYS_DATA)

```javascript
const DAYS_DATA = {
  1: {  // Segunda-feira
    label: 'Segunda-feira',
    type: 'Escola Tarde + Estudo Manhã',
    morning: [
      {
        id: 's1_01',
        title: '05:00 — Água 500ml + Raspagem de Língua',
        desc: 'Em jejum, antes de qualquer líquido',
        tag: 'hig'  // hig=higiene, bio=biológico, est=estudo, ment=mental
      },
      // ... mais itens
    ],
    afternoon: [ /* ... */ ],
    night: [ /* ... */ ],
    aftLabel: '☀️ Tarde — Escola'  // Label customizado para a tarde
  },
  // ... domingo a domingo (0-6)
};

// Tags de coloração:
// hig (roxo) - Higiene
// bio (ciano) - Biológico
// est (ouro) - Estudo
// ment (vermelho) - Mental
```

### Seção 5: RENDERIZAÇÃO (Render Functions)

#### 5.1 Dashboard
```javascript
function renderDash() {
  // Atualiza data
  const d = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dash-date').textContent = d.toLocaleDateString('pt-BR', opts);
  
  // Calcula percentuais
  const dayData = getCurrentDayData(WEEKDAY);
  const allRot = [...(dayData.morning || []), ...(dayData.afternoon || []), ...(dayData.night || [])];
  const rotDone = allRot.filter(i => S.rotina[i.id]).length;
  const rotPct = allRot.length ? Math.round((rotDone / allRot.length) * 100) : 0;
  
  // Repete para higiene (allHig) e estudo (blocks)
  const overall = Math.round((rotPct + higPct + estPct) / 3);
  
  // Atualiza circle (stroke-dashoffset para progresso)
  const circle = document.getElementById('score-circle');
  const circ = 2 * Math.PI * 38;  // Perímetro do círculo
  circle.style.strokeDashoffset = circ - (circ * overall / 100);
  // strokeDashoffset controla quanto da linha tracejada fica visível
  
  // Define label do score
  const labels = [
    [0, 'Sistema Offline', 'Complete suas rotinas do dia'],
    [20, 'Iniciando Motores', 'Bom começo — continue!'],
    [40, 'Aquecendo', 'Você está no caminho certo'],
    [60, 'Alta Performance', 'Meio caminho, foco total!'],
    [80, 'Modo Titã Ativo', 'Impressionante consistência'],
    [95, 'APEX COMPLETO', 'Dia perfeito executado! 🔱'],
  ];
  let lbl = labels[0];
  labels.forEach(l => { if (overall >= l[0]) lbl = l; });
  document.getElementById('score-label').textContent = lbl[1];
}
```

#### 5.2 Rotina
```javascript
function renderRotina(dayNum) {
  if (editMode) {
    renderDayEditForm();
    return;
  }
  
  selectedDay = dayNum;
  
  // Cria abas dos 7 dias
  const wt = document.getElementById('week-tabs');
  wt.innerHTML = '';
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const restDays = [0, 6];  // Fim de semana
  
  [1, 2, 3, 4, 5, 6, 0].forEach(d => {
    const btn = document.createElement('div');
    btn.className = 'week-tab' + (restDays.includes(d) ? ' rest' : '') + ((selectedDay || WEEKDAY) === d ? ' active' : '');
    btn.textContent = dayNames[d] + (d === WEEKDAY ? ' ★' : '');
    btn.onclick = () => renderRotina(d);
    wt.appendChild(btn);
  });
  
  // Renderiza as 3 seções
  const day = getCurrentDayData(selectedDay !== undefined ? selectedDay : WEEKDAY);
  renderCheckSection('rot-morning', day.morning || [], 'rotina');
  renderCheckSection('rot-afternoon', day.afternoon || [], 'rotina');
  renderCheckSection('rot-night', day.night || [], 'rotina');
}

function renderCheckSection(containerId, items, stateKey) {
  const c = document.getElementById(containerId);
  c.innerHTML = '';
  
  items.forEach(item => {
    const done = S[stateKey][item.id];
    const div = document.createElement('div');
    div.className = 'check-item' + (done ? ' done' : '');
    div.onclick = () => toggleItem(item.id, stateKey, containerId, items);
    
    const tagMap = {
      hig: 'tag-hig',
      est: 'tag-est',
      bio: 'tag-bio',
      ment: 'tag-ment'
    };
    
    div.innerHTML = `
      <div class="checkbox ${done ? 'on' : ''}"></div>
      <div class="check-info">
        <div class="check-title">${item.title}</div>
        <div class="check-sub">${item.desc}</div>
      </div>
      ${item.tag ? `<div class="check-tag ${tagMap[item.tag] || 'tag-hig'}">${item.tag}</div>` : ''}
    `;
    c.appendChild(div);
  });
}

function toggleItem(id, stateKey, containerId, items) {
  S[stateKey][id] = !S[stateKey][id];  // Inverte true/false
  saveS();  // Salva no localStorage
  if (S[stateKey][id]) toast('✅ Etapa concluída!');
  renderCheckSection(containerId, items, stateKey);  // Re-renderiza
  renderDash();  // Atualiza score
}
```

#### 5.3 Hábitos
```javascript
function renderHabits() {
  const now = new Date();
  const weekDays = [];
  
  // Coleta últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    weekDays.push({
      day: WEEK_LABELS[d.getDay()],
      key: d.toDateString()  // "Mon Apr 28 2025"
    });
  }
  
  // Renderiza dias da semana como header
  const hdr = document.getElementById('habit-header');
  hdr.innerHTML = weekDays.map((w, i) => `
    <div style="color: ${i === 6 ? 'var(--accent)' : 'var(--text3)'}">${w.day}</div>
  `).join('');
  
  // Renderiza cada hábito com 7 quadrados
  HABITS.forEach(h => {
    if (!S.habits[h.id]) S.habits[h.id] = {};
    
    const row = document.createElement('div');
    row.className = 'habit-row';
    
    const streak = weekDays.filter(w => S.habits[h.id][w.key]).length;
    // Conta quantos dias o hábito foi concluído
    
    row.innerHTML = `
      <div class="habit-name">${h.name}</div>
      <div class="habit-dots" id="hd-${h.id}"></div>
      <div class="habit-streak">${streak}🔥</div>
    `;
    
    const dotWrap = row.querySelector(`#hd-${h.id}`);
    weekDays.forEach((w, i) => {
      const on = S.habits[h.id][w.key];
      const dot = document.createElement('div');
      dot.className = 'habit-dot' + (on ? (h.color === 'gold' ? ' gold-on' : ' on') : '');
      dot.textContent = w.day;
      dot.onclick = () => {
        S.habits[h.id][w.key] = !S.habits[h.id][w.key];
        saveS();
        renderHabits();
      };
      dotWrap.appendChild(dot);
    });
  });
}
```

#### 5.4 Flashcards
```javascript
function renderFlashcards() {
  // Filtra cards por categoria
  fcFiltered = fcFilter === 'all' ? [...FLASHCARDS] : FLASHCARDS.filter(c => c.cat === fcFilter);
  if (fcIdx >= fcFiltered.length) fcIdx = 0;
  showCard();
}

function showCard() {
  const fc = document.getElementById('fc-card-area');
  const card = fcFiltered[fcIdx];
  
  fc.innerHTML = `
    <div class="flashcard" id="fc-main" onclick="revealCard()">
      <div class="fc-question">${card.q}</div>
      <div class="fc-answer">${card.a}</div>
      <div class="fc-hint">Clique para revelar a resposta</div>
    </div>
  `;
  
  document.getElementById('fc-counter').textContent = (fcIdx + 1) + ' / ' + fcFiltered.length;
}

function revealCard() {
  const fc = document.getElementById('fc-main');
  fc.classList.toggle('revealed');  // Alterna classe
  // CSS mostra fc-answer quando .revealed está presente
}

function nextCard() {
  fcIdx = (fcIdx + 1) % fcFiltered.length;
  showCard();
}

function prevCard() {
  fcIdx = (fcIdx - 1 + fcFiltered.length) % fcFiltered.length;
  showCard();
}

function setFcFilter(f, btn) {
  fcFilter = f;
  fcIdx = 0;
  
  // Remove classe .btn-prime de todos os botões
  document.querySelectorAll('#fc-filter .btn').forEach(b => {
    b.classList.remove('btn-prime');
    b.classList.add('btn-ghost');
  });
  
  // Adiciona .btn-prime ao botão clicado
  btn.classList.add('btn-prime');
  btn.classList.remove('btn-ghost');
  
  renderFlashcards();
}
```

### Seção 6: UTILIDADES

```javascript
function toast(msg) {
  // Mostra notificação temporária
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');  // Anima para cima
  
  setTimeout(() => t.classList.remove('show'), 2400);
  // Remove depois de 2.4 segundos
}

function refreshAll() {
  // Re-renderiza todas as páginas
  renderDash();
  renderRotina();
  renderHigiene();
  renderStudy();
  renderHabits();
  renderFlashcards();
}

function getCurrentDayData(dayNum) {
  // Retorna dados personalizados ou originais
  const data = getDaysData() || DAYS_DATA;
  return data[dayNum] || DAYS_DATA[1];
}
```

### Seção 7: INICIALIZAÇÃO

```javascript
loadS();           // Carrega dados do localStorage
initDaysData();    // Carrega edições personalizadas
refreshAll();      // Renderiza tudo
setInterval(renderDash, 60000);  // Atualiza score a cada minuto
```

---

## 🔄 Fluxo de Funcionamento Geral

```
1. PÁGINA CARREGA
   ├─ loadS() → Carrega dados salvos do localStorage
   ├─ initDaysData() → Carrega rotinas personalizadas
   └─ refreshAll() → Renderiza todas as páginas

2. USUÁRIO CLICA EM NAV
   ├─ go('página') é chamado
   ├─ Remove .active de todas as páginas
   ├─ Adiciona .active à página selecionada
   └─ refreshAll() atualiza conteúdo

3. USUÁRIO MARCA CHECKBOX
   ├─ toggleItem() é chamado
   ├─ S[stateKey][id] é invertido (true ↔ false)
   ├─ saveS() persiste no localStorage
   ├─ renderCheckSection() re-renderiza a lista
   └─ renderDash() atualiza score

4. USUÁRIO CLICA "EDITAR ROTINA"
   ├─ toggleEditMode() ativa editMode = true
   ├─ Adiciona .edit-mode à página
   ├─ renderDayEditForm() mostra inputs
   ├─ Usuário edita e clica "Salvar"
   ├─ saveDayEdit() persiste edições
   └─ renderRotina() volta à visualização normal

5. INTERVALO DE 1 MINUTO
   └─ setInterval(renderDash, 60000) atualiza score
```

---

## 💾 Estrutura de Dados (localStorage)

### apex_v2 (Progresso Diário)
```json
{
  "rotina": {
    "s1_01": true,
    "s1_02": false,
    "s2_05": true
  },
  "higiene": {
    "b1": true,
    "sk1": false
  },
  "study": {
    "sb1_1": true
  },
  "habits": {
    "h_agua": {
      "Mon Apr 28 2025": true,
      "Tue Apr 29 2025": false
    }
  },
  "studyNotes": [
    {
      "subject": "Matemática — Funções",
      "notes": "Derivadas ainda estão confusas",
      "score": "85",
      "date": "28/04"
    }
  ],
  "lastReset": "Tue Apr 29 2025"
}
```

### apex_days_data (Rotinas Personalizadas)
```json
{
  "1": {
    "label": "Segunda-feira",
    "type": "Escola Tarde + Estudo Manhã",
    "morning": [ /* ... */ ],
    "afternoon": [ /* ... */ ],
    "night": [ /* ... */ ],
    "aftLabel": "☀️ Tarde — Escola"
  }
}
```

---

## 🎯 Principais Funcionalidades

### 1️⃣ Dashboard
- Score circular animado (0-100%)
- Cards de estatísticas (Rotina, Higiene, Estudo)
- Próximo evento do dia
- Pilares de hoje

### 2️⃣ Rotina Diária
- 7 dias da semana com edição
- 3 períodos (Manhã, Tarde, Noite)
- Checkboxes com cores por categoria
- Modo edição: adicionar/remover/editar tarefas

### 3️⃣ Higiene & Skincare
- Protocolo bucal (4 etapas)
- Higiene corporal (5 etapas)
- Skincare manhã (3 etapas)
- Skincare noite (2 etapas)
- Extras (perfume, esfoliação, etc)

### 4️⃣ Estudo ENEM
- Blocos de estudo diários (variam por dia)
- Etapas de redação (6 passos)
- Registro de anotações com score de acertos
- Princípios do método exibidos

### 5️⃣ Hábitos
- 8 hábitos rastreáveis
- 7 dias de cada (D S T Q Q S S)
- Calculador de streak (consistência)
- Badges de conquistas

### 6️⃣ Flashcards
- 14 cards de conceitos-chave
- 5 categorias (Todos, Bio, Higiene, Neuro, ENEM)
- Revelar/esconder resposta ao clicar
- Navegação anterior/próximo

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| **HTML5** | Semântica e estrutura |
| **CSS3** | Grid, Flexbox, Animações, Variáveis |
| **JavaScript Vanilla** | Lógica, DOM manipulation |
| **LocalStorage API** | Persistência de dados |
| **SVG** | Gráficos (anel de score) |
| **Google Fonts** | Tipografia (Syne, DM Sans) |

---

## 📊 Estatísticas do Código

| Métrica | Valor |
|---------|-------|
| Linhas HTML | ~550 |
| Linhas CSS | ~600 |
| Linhas JS | ~900 |
| Variáveis CSS | 20+ |
| Funções JS | 30+ |
| Dados de Rotina | 56 itens (7 dias) |
| Flashcards | 14 cards |
| Hábitos | 8 hábitos |

---

## ⚙️ Como o Sistema Funciona

### Ciclo de Vida de um Dia

1. **00:00** - Novo dia (lastReset muda)
2. **Usuário abre app** - loadS() limpa dados do dia anterior
3. **Usuário marca tarefas** - S é atualizado e salvo
4. **A cada minuto** - renderDash() recalcula score
5. **23:59** - Dados persistem no localStorage
6. **Próximo dia 00:00** - Ciclo reinicia

### Fluxo de Dados

```
Usuario (clique)
    ↓
Função (toggleItem, saveDayEdit, etc)
    ↓
S (objeto global) é modificado
    ↓
saveS() → localStorage.setItem()
    ↓
renderXXX() → DOM atualizado
    ↓
CSS + Transições animam a mudança
```

---

## 🎨 Sistema de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Roxo (Accent) | #7b61ff | Primário (títulos, focagem) |
| Ouro (Gold) | #f5c842 | Secundário (estudo) |
| Ciano (Cyan) | #00e5c8 | Terciário (biologia) |
| Vermelho (Red) | #ff4f6d | Alertas (mental) |
| Branco (Text) | #ededf5 | Texto principal |
| Cinza Escuro (Bg) | #080810 | Fundo |

---

## 🔐 Segurança e Privacidade

✅ **Dados Locais**: Tudo fica no navegador (localStorage)
✅ **Sem Servidor**: Não há comunicação com servidor
✅ **Sem Login**: Dados não precisam de autenticação
⚠️ **Limitação**: Dados só persistem neste navegador/dispositivo

---

## 📱 Responsividade

```css
Desktop (> 560px)
├─ Sidebar: 68px
├─ Main: Padding 28px
└─ Habit dots: Visíveis

Mobile (≤ 560px)
├─ Sidebar: 54px
├─ Main: Padding 14px
└─ Habit dots: Ocultos
```

---

## 🎓 Resumo para Apresentação

**O que é APEX?**
Um sistema de gestão de rotina e produtividade em tempo real, com dashboard inteligente que rastreia progresso diário em 5 áreas: rotina, higiene, estudo, hábitos e flashcards.

**Por que foi construído assim?**
- **Separação de Responsabilidades**: HTML (estrutura), CSS (estilos), JS (lógica)
- **Persistência Local**: Dados salvos no navegador sem depender de servidor
- **Interatividade**: Sem page refresh, tudo em SPA (Single Page Application)
- **Design Responsivo**: Funciona em desktop e mobile

**Principais Inovações:**
1. Score circular animado que recalcula a cada ação
2. Modo edição inline da rotina diária
3. Sincronização automática com localStorage
4. Sistema de hábitos com streak (consistência)
5. Flashcards de alta retenção com filtros

**Stack Técnico:**
- Vanilla JS (sem frameworks)
- CSS Grid + Flexbox
- LocalStorage API
- SVG para gráficos

**Resultado Final:**
Um aplicativo funcional, rápido e 100% offline que já está sendo usado para rastrear progresso pessoal diariamente.

---

**Criado em**: 29 de abril de 2026
**Versão**: 1.0 (Separação de Arquivos + Documentação)
**Tamanho Total**: ~84 KB (HTML + CSS + JS)
