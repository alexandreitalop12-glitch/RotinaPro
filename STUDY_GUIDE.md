# 🎓 GUIA DE ESTUDO COMPLETO — APEX

> Este guia foi criado para você aprender e apresentar o código de forma clara e profissional.
> Cada seção explica **o que** faz e **por que** foi feito assim.

---

## 📖 Como Usar Este Guia

1. **Leia as seções em ordem** - cada uma prepara a próxima
2. **Abra os arquivos no VS Code** - veja o código enquanto lê
3. **Execute mentalmente** - imagine como o código flui
4. **Teste no navegador** - abra index.html e interaja
5. **Pratique apresentar** - resuma cada seção com suas palavras

---

## 🔵 PARTE 1: O ARQUIVO HTML (index.html)

### O que é HTML?
HTML = Linguagem de marcação para estruturar uma página web.
- **Elementos**: `<div>`, `<button>`, `<input>`, etc.
- **Atributos**: `id`, `class`, `onclick`
- **Propósito**: Define ONDE está cada coisa na página

### Estrutura Geral do APEX

```html
<!DOCTYPE html>
<!-- Declara que isto é HTML5 (padrão moderno) -->

<html lang="pt-BR">
<!-- Define idioma como português do Brasil -->

<head>
  <!-- Metadados (informações sobre a página) -->
  <meta charset="UTF-8">
  <!-- Suporta caracteres acentuados (ã, é, ç) -->
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Faz a página ser responsiva em celulares -->
  
  <link rel="stylesheet" href="styles.css">
  <!-- Importa o arquivo CSS (cores, fontes, layouts) -->
</head>

<body>
  <!-- Conteúdo visível da página -->
  
  <div class="app">
    <!-- Container raiz que envolve toda a aplicação -->
    
    <nav class="sidebar">
      <!-- Barra lateral com 6 botões de navegação -->
      <!-- Cada botão leva a uma página diferente -->
    </nav>
    
    <main class="main">
      <!-- Área principal onde o conteúdo muda -->
      
      <div class="page active" id="page-dash">
        <!-- Dashboard (primeira página que aparece) -->
      </div>
      
      <div class="page" id="page-rotina">
        <!-- Rotina diária (segunda página) -->
      </div>
      
      <!-- ... mais 4 páginas (higiene, estudo, hábitos, flashcards) ... -->
    </main>
  </div>
  
  <script src="scripts.js"></script>
  <!-- Importa o arquivo JavaScript (toda a lógica) -->
</body>
</html>
```

### Componentes Principais

#### 1. SIDEBAR (Barra de Navegação)

```html
<nav class="sidebar">
  <!-- Container da sidebar -->
  
  <div class="logo">APEX</div>
  <!-- Logo vertical com efeito brilho roxo -->
  <!-- Em CSS: writing-mode: vertical-rl + transform: rotate(180deg) -->
  
  <div class="nav-items">
    <!-- Container dos 6 botões de navegação -->
    
    <div class="nav-item" data-p="dash" onclick="go('dash')">
      <!-- Cada botão tem:
           - class="nav-item" para estilizar
           - data-p="dash" para identificação
           - onclick="go('dash')" para funcionalidade -->
      
      <span class="nav-icon">⚡</span>
      <!-- Ícone emoji que muda de opacidade ao hover -->
      
      <span class="nav-tip">Dashboard</span>
      <!-- Dica que aparece ao passar mouse por cima -->
    </div>
    
    <!-- Botões similares para: rotina, higiene, estudo, hábitos, flashcards -->
  </div>
</nav>
```

**O que acontece ao clicar em um botão:**
1. `onclick="go('dash')"` é acionado
2. Função `go('dash')` é chamada em scripts.js
3. Página anterior é ocultada (remove class "active")
4. Página nova é exibida (adiciona class "active")
5. CSS anima a transição com fadeUp

#### 2. DASHBOARD (Página Principal)

```html
<div class="page active" id="page-dash">
  <!-- active: esta página é mostrada por padrão -->
  
  <div class="page-header">
    <!-- Cabeçalho da página -->
    
    <div class="title-sec">
      <div class="page-title">📊 Dashboard</div>
      <div id="dash-date" class="page-sub">Carregando...</div>
      <!-- Data é preenchida por JavaScript: new Date().toLocaleDateString() -->
    </div>
    
    <div class="pilares" id="pilares">
      <!-- Ícones dos pilares do dia (visibilidade, alimentação, descanso, movimento) -->
      <!-- Preenchidos dinamicamente por renderDash() -->
    </div>
  </div>
  
  <!-- Score Ring (SVG - Gráfico Vetorial) -->
  <div class="score-ring-wrapper">
    <svg width="90" height="90" viewBox="0 0 90 90">
      <!-- viewBox: Define as coordenadas internas do SVG -->
      
      <defs>
        <!-- Definições de estilos SVG -->
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
          <!-- Gradiente com 2 cores -->
          <stop offset="0%" style="stop-color: var(--accent); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: var(--cyan); stop-opacity: 1" />
        </linearGradient>
      </defs>
      
      <!-- Círculo de fundo (carcaça) -->
      <circle cx="45" cy="45" r="38" fill="none" stroke="var(--border2)" stroke-width="3" opacity="0.4" />
      
      <!-- Círculo de progresso (muda conforme score) -->
      <circle cx="45" cy="45" r="38" fill="none" stroke="url(#pg)" stroke-width="3" 
              stroke-dasharray="238.76 238.76" id="score-circle" stroke-linecap="round" />
      <!-- stroke-dasharray: cria efeito de linha tracejada
           stroke-dashoffset: controla quanto da linha fica visível (alterado por JS) -->
    </svg>
    
    <!-- Texto no centro do anel -->
    <div class="score-text">
      <div id="score-value">0%</div>
      <!-- Percentual de conclusão -->
      
      <div id="score-label">Sistema Offline</div>
      <!-- Descrição do status (muda conforme score) -->
    </div>
  </div>
  
  <!-- Cards de Estatísticas -->
  <div class="g4 mb2">
    <!-- grid: 4 colunas | mb2: margin-bottom grande -->
    
    <div class="stat">
      <div class="stat-label">Rotina</div>
      <div class="stat-val" id="d-rot">0%</div>
      <!-- % de tarefas completas na rotina -->
    </div>
    
    <div class="stat">
      <div class="stat-label">Higiene</div>
      <div class="stat-val" id="d-hig">0%</div>
    </div>
    
    <div class="stat">
      <div class="stat-label">Estudo</div>
      <div class="stat-val" id="d-est">0%</div>
    </div>
    
    <div class="stat">
      <div class="stat-label">Média</div>
      <div class="stat-val" id="d-avg">0%</div>
    </div>
  </div>
  
  <!-- Próximo Evento -->
  <div class="card">
    <div class="card-label">Próximo</div>
    <div id="next-event">Carregando...</div>
  </div>
</div>
```

**Como funciona:**
1. Ao abrir a página, `renderDash()` é chamado
2. Busca dados de S.rotina, S.higiene, S.study
3. Calcula percentuais (tarefas_completas / total_tarefas)
4. Atualiza texto no HTML via `getElementById().textContent = valor`
5. Desenha anel de progresso via SVG stroke-dashoffset

#### 3. ROTINA DIÁRIA

```html
<div class="page" id="page-rotina">
  <!-- Abas dos 7 dias (segunda, terça, ... domingo) -->
  <div class="week-tabs" id="week-tabs"></div>
  <!-- Preenchidas por: WEEK_DAYS.map(d => `<div class="week-tab" onclick="renderRotina(${d})">...`) -->
  
  <!-- Botão de Edição -->
  <button class="btn btn-ghost" id="edit-toggle-btn" onclick="toggleEditMode()">
    ✏️ Editar Rotina
  </button>
  
  <!-- Conteúdo da Rotina -->
  <div class="rotina-wrapper" id="rotina-content">
    <!-- Divido em Manhã, Tarde, Noite -->
    
    <div class="rotina-section">
      <!-- Manhã -->
      <div class="sec-title">🌅 Manhã</div>
      <div class="check-list" id="rot-morning">
        <!-- Lista de checkboxes gerada por renderCheckSection() -->
      </div>
    </div>
    
    <div class="rotina-section">
      <!-- Tarde -->
      <div class="sec-title">☀️ Tarde</div>
      <div class="check-list" id="rot-afternoon"></div>
    </div>
    
    <div class="rotina-section">
      <!-- Noite -->
      <div class="sec-title">🌙 Noite</div>
      <div class="check-list" id="rot-night"></div>
    </div>
  </div>
</div>
```

**Cada item de rotina é assim:**
```html
<div class="check-item">
  <!-- Container de um checkbox individual -->
  
  <div class="checkbox"></div>
  <!-- Quadrado clicável (fica roxo quando marcado) -->
  
  <div class="check-info">
    <!-- Informações da tarefa -->
    <div class="check-title">05:00 — Água 500ml + Raspagem de Língua</div>
    <div class="check-sub">Em jejum, antes de qualquer líquido</div>
  </div>
  
  <div class="check-tag tag-hig">hig</div>
  <!-- Badge com a categoria (hig=higiene, bio=biologia, est=estudo, ment=mental) -->
  <!-- CSS define cores diferentes por categoria -->
</div>
```

**O que acontece ao clicar no checkbox:**
1. `onclick="toggleItem('id_da_tarefa', 'rotina', ...)"` é acionado
2. `S.rotina['id_da_tarefa']` muda de true para false (ou vice-versa)
3. `saveS()` persiste no localStorage
4. `renderCheckSection()` re-renderiza a lista (anima a mudança)
5. `renderDash()` atualiza o score

#### 4. HIGIENE & SKINCARE

```html
<div class="page" id="page-higiene">
  <!-- Divide em 5 seções -->
  
  <div class="card">
    <!-- BUCAL (Higiene Bucal) -->
    <div class="sec-title">🦷 Bucal</div>
    <div class="check-list" id="bucal-list"></div>
    
    <!-- CORP (Higiene Corporal) -->
    <div class="sec-title">🚿 Corporal</div>
    <div class="check-list" id="corp-list"></div>
    
    <!-- SKIN MANHA (Skincare Manhã) -->
    <div class="sec-title">🌅 Skincare Manhã</div>
    <div class="check-list" id="skin-manha"></div>
    
    <!-- SKIN NOITE (Skincare Noite) -->
    <div class="sec-title">🌙 Skincare Noite</div>
    <div class="check-list" id="skin-noite"></div>
    
    <!-- EXTRAS -->
    <div class="sec-title">✨ Extras</div>
    <div class="check-list" id="skin-extras"></div>
  </div>
</div>
```

**Estrutura igual à rotina** - mesmos checkboxes, mesma lógica de clique.

#### 5. ESTUDO ENEM

```html
<div class="page" id="page-enem">
  <!-- Blocos de Estudo do Dia -->
  <div class="card">
    <div class="sec-title">📚 Blocos de Estudo</div>
    <div class="check-list" id="study-blocks"></div>
    <!-- Exemplo: 6:00-7:00 Biologia, 7:00-8:00 Português, etc -->
  </div>
  
  <!-- Redação (6 etapas) -->
  <div class="card">
    <div class="sec-title">✍️ Redação</div>
    <div class="check-list" id="redacao-list"></div>
    <!-- Introdução, Desenvolvimento 1, 2, 3, Conclusão, Revisão -->
  </div>
  
  <!-- Registro de Anotações -->
  <div class="card">
    <div class="sec-title">📝 Anotações de Estudo</div>
    
    <form id="study-form">
      <input id="study-subject" placeholder="Assunto..." type="text">
      <textarea id="study-notes" placeholder="Suas anotações..."></textarea>
      <input id="study-score" placeholder="Score (%)" type="number">
      <button type="button" onclick="saveStudyNote()">💾 Salvar</button>
    </form>
    
    <div id="study-notes-list">
      <!-- Histórico de anotações salvas -->
      <!-- Cada nota mostra: "Matemática — Funções | 85% | 28/04" -->
    </div>
  </div>
</div>
```

#### 6. HÁBITOS

```html
<div class="page" id="page-habitos">
  <!-- Header com dias da semana -->
  <div class="habit-header" id="habit-header">
    <!-- D S T Q Q S S (primeira letra de cada dia) -->
    <!-- CSS permite esconder em mobile -->
  </div>
  
  <!-- Linhas de hábitos -->
  <div id="habit-rows">
    <!-- Exemplo de 1 linha: -->
    
    <div class="habit-row">
      <!-- Nome do hábito -->
      <div class="habit-name">💧 Beber 2L de Água</div>
      
      <!-- 7 quadrados de dias (um para cada dia da semana) -->
      <div class="habit-dots" id="hd-h_agua">
        <div class="habit-dot" onclick="toggleHabit('h_agua', 'dia1')">D</div>
        <div class="habit-dot on" onclick="toggleHabit('h_agua', 'dia2')">S</div>
        <!-- "on" = dia foi completado, cor aparece -->
        <div class="habit-dot" onclick="toggleHabit('h_agua', 'dia3')">T</div>
        <!-- ... 4 dias mais -->
      </div>
      
      <!-- Streak (contagem) -->
      <div class="habit-streak">2🔥</div>
      <!-- Quantos dias consecutivos completaram este hábito -->
    </div>
    
    <!-- ... 7 hábitos mais ... -->
  </div>
  
  <!-- Badges de Conquistas -->
  <div id="habit-achievements">
    <!-- Aparecem quando atinge milestones -->
    <!-- Exemplo: "7 Dias Seguidos 🏆" -->
  </div>
</div>
```

**Dados de Hábitos:**
```javascript
// Em scripts.js:
HABITS = [
  { id: 'h_agua', name: '💧 Beber 2L de Água', ... },
  { id: 'h_sono', name: '😴 Dormir 8h', ... },
  // ... 6 mais
]

// Em S (localStorage):
S.habits = {
  'h_agua': {
    'Mon Apr 28 2025': true,
    'Tue Apr 29 2025': false,
    'Wed Apr 30 2025': true,
    // ... 4 dias mais
  }
}
```

#### 7. FLASHCARDS

```html
<div class="page" id="page-flashcard">
  <!-- Filtro por Categoria -->
  <div id="fc-filter" class="fc-filter">
    <button class="btn btn-prime" onclick="setFcFilter('all', this)">
      Todos (14)
    </button>
    <button class="btn btn-ghost" onclick="setFcFilter('bio', this)">
      Bio/Química (4)
    </button>
    <button class="btn btn-ghost" onclick="setFcFilter('hig', this)">
      Higiene (2)
    </button>
    <button class="btn btn-ghost" onclick="setFcFilter('neuro', this)">
      Neurociência (3)
    </button>
    <button class="btn btn-ghost" onclick="setFcFilter('enem', this)">
      ENEM (5)
    </button>
  </div>
  <!-- btn-prime: roxo (ativo)
       btn-ghost: transparente (inativo)
       Clique muda as classes -->
  
  <!-- Card Revelável -->
  <div class="fc-wrapper">
    <div id="fc-card-area">
      <!-- O card é renderizado aqui por showCard() -->
      
      <!-- Quando renderizado, fica assim: -->
      <div class="flashcard" id="fc-main" onclick="revealCard()">
        <div class="fc-question">
          Qual a função da endoderme na pele?
        </div>
        <!-- Visível por padrão -->
        
        <div class="fc-answer">
          Produz células de melanina e protege contra radiação UV
        </div>
        <!-- Oculto por CSS: display: none
             Fica visível quando adiciona class "revealed" -->
        
        <div class="fc-hint">Clique para revelar</div>
      </div>
    </div>
    
    <!-- Controles -->
    <div class="fc-controls">
      <button onclick="prevCard()">← Anterior</button>
      <span id="fc-counter">1 / 14</span>
      <button onclick="nextCard()">Próximo →</button>
    </div>
  </div>
</div>
```

---

## 🎨 PARTE 2: O ARQUIVO CSS (styles.css)

### O que é CSS?
CSS = Linguagem para estilizar e fazer layout em páginas web.
- Define **cores**, **tamanhos**, **posições**, **animações**
- Usa **seletores** (classes, IDs) para aplicar estilos
- Cascata: estilos mais específicos sobrescrevem gerais

### Seções Principais

#### 1. VARIÁVEIS CSS (Sistema de Design)

```css
:root {
  /* :root = escopo global (todas as páginas) */
  
  /* ── CORES DE FUNDO ── */
  --bg: #080810;      /* Preto puro - fundo principal */
  --bg2: #0e0e1a;     /* Cinza muito escuro - sidebar */
  --bg3: #14141f;     /* Cinza escuro - elementos internos */
  --card: #111120;    /* Cards normais */
  --card2: #191928;   /* Cards ao hover */
  
  /* ── CORES DE DESTAQUE ── */
  --accent: #7b61ff;        /* Roxo - tema primário */
  --accent-glow: rgba(...); /* Roxo com transparência - backgrounds hover */
  --gold: #f5c842;          /* Ouro - secundário */
  --cyan: #00e5c8;          /* Ciano - terciário */
  --red: #ff4f6d;           /* Vermelho - alertas */
  
  /* ── CORES DE TEXTO ── */
  --text: #ededf5;    /* Branco suave - texto principal */
  --text2: #8888aa;   /* Cinza - texto secundário */
  --text3: #44445a;   /* Cinza escuro - texto terciário */
  
  /* ── TIPOGRAFIA ── */
  --font-display: 'Syne', sans-serif;    /* Títulos (ousado) */
  --font-body: 'DM Sans', sans-serif;    /* Corpo (legível) */
  
  /* ── ESPAÇAMENTO ── */
  --r: 12px;   /* Border-radius padrão */
  --r2: 18px;  /* Border-radius maior */
}
```

**Como usar variáveis:**
```css
/* Em qualquer lugar do CSS: */
color: var(--text);              /* Usa a cor de texto */
background: var(--accent);        /* Usa a cor roxa */
border-radius: var(--r2);         /* Usa o raio grande */
```

**Vantagem:**
- Muda uma cor uma vez, afeta TODA a aplicação
- Fácil manter consistência visual
- Rápido fazer temas (claro/escuro)

#### 2. RESET (Limpar Estilos Padrão)

```css
* { 
  margin: 0;          /* Remove espaço externo padrão */
  padding: 0;         /* Remove espaço interno padrão */
  box-sizing: border-box;  /* Inclui border/padding no cálculo de tamanho */
}

body {
  background: var(--bg);       /* Cor de fundo global */
  color: var(--text);          /* Cor de texto global */
  font-family: var(--font-body); /* Fonte para todo o texto */
  font-size: 14px;             /* Tamanho de fonte padrão */
  min-height: 100vh;           /* Mínimo de altura = viewport */
  overflow-x: hidden;          /* Esconde scroll horizontal */
}

/* Grid sutil no fundo */
body::before {
  content: '';                 /* Cria pseudo-elemento (element fantasma) */
  position: fixed;             /* Fica fixo mesmo scrollando */
  inset: 0;                    /* top: 0, right: 0, bottom: 0, left: 0 */
  
  background-image:
    linear-gradient(rgba(123,97,255,0.03) 1px, transparent 1px),
    /* Linhas horizontais roxas sutis */
    linear-gradient(90deg, rgba(123,97,255,0.03) 1px, transparent 1px);
    /* Linhas verticais roxas sutis */
  
  background-size: 40px 40px;  /* Grade de 40x40px */
  pointer-events: none;        /* Não interfere com cliques */
  z-index: 0;                  /* Fica atrás de tudo */
}
```

#### 3. SIDEBAR (Barra Lateral)

```css
.sidebar {
  width: 68px;                    /* Largura fixa */
  background: var(--bg2);         /* Fundo cinza escuro */
  border-right: 1px solid var(--border); /* Borda sutil */
  
  display: flex;                  /* Flexbox: alinha itens em coluna */
  flex-direction: column;         /* Itens em coluna (vertical) */
  align-items: center;            /* Centraliza horizontalmente */
  
  padding: 18px 0;                /* Espaço interno vertical */
  
  position: fixed;                /* Fica fixo ao scrollar */
  top: 0; left: 0; bottom: 0;     /* Ocupa toda altura esquerda */
  z-index: 100;                   /* Fica acima do main */
}

.logo {
  font-family: var(--font-display);  /* Fonte ousada */
  font-weight: 800;                  /* Extra bold */
  font-size: 18px;
  color: var(--accent);              /* Roxo */
  letter-spacing: 2px;               /* Espaçamento entre letras */
  
  writing-mode: vertical-rl;         /* Texto de baixo para cima */
  transform: rotate(180deg);         /* Inverte para ler normal */
  
  margin-bottom: 28px;               /* Espaço abaixo */
  
  text-shadow: 0 0 20px rgba(123,97,255,0.5);  /* Brilho roxo */
  /* (offset-x, offset-y, blur-radius, color) */
}

.nav-items {
  display: flex;           /* Flexbox */
  flex-direction: column;  /* Coluna */
  gap: 4px;                /* Espaço entre itens */
  flex: 1;                 /* Ocupa espaço disponível */
  width: 100%;
  padding: 0 8px;          /* Espaço lateral */
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  
  height: 46px;
  border-radius: var(--r);  /* Cantos arredondados */
  
  cursor: pointer;  /* Mouse vira mãozinha */
  
  transition: all 0.2s;  /* Anima mudanças por 200ms */
  /* all: todas as propriedades
     0.2s: duração
     ease: tipo de animação (padrão) */
  
  border: 1px solid transparent;  /* Borda invisível (espaço reservado) */
  
  position: relative;  /* Para posicionar filhos */
  font-size: 18px;
}

.nav-item:hover {
  background: var(--bg3);         /* Fica mais claro */
  border-color: var(--border2);   /* Borda roxo sutil fica visível */
}

.nav-item.active {
  background: var(--accent-glow);     /* Fundo roxo (transparente) */
  border-color: rgba(123,97,255,0.35); /* Borda roxo sólida */
}

.nav-icon {
  opacity: 0.45;  /* Meio transparente */
  transition: opacity 0.2s;  /* Anima mudança de opacidade */
}

.nav-item:hover .nav-icon, 
.nav-item.active .nav-icon {
  opacity: 1;  /* Ícone fica opaco (visível) */
}
```

#### 4. MAIN (Conteúdo Principal)

```css
.main {
  margin-left: 68px;                    /* Empurra para dar espaço ao sidebar */
  padding: 28px 28px 60px;              /* Espaço interno */
  flex: 1;                              /* Ocupa espaço restante */
  max-width: calc(100vw - 68px);        /* Máximo = viewport - sidebar */
}

.page {
  display: none;  /* Todas as páginas começam ocultas */
}

.page.active {
  display: block;  /* Página com .active fica visível */
  
  animation: fadeUp 0.35s ease;
  /* Anima entrada com transição suave para cima */
}

@keyframes fadeUp {
  /* Define animação chamada "fadeUp" */
  
  from {
    opacity: 0;                      /* Começa invisível */
    transform: translateY(12px);     /* Começa 12px abaixo */
  }
  
  to {
    opacity: 1;                      /* Termina visível */
    transform: translateY(0);        /* Termina na posição normal */
  }
}
```

#### 5. CARDS

```css
.card {
  background: var(--card);          /* Fundo cinza */
  border: 1px solid var(--border);  /* Borda sutil */
  border-radius: var(--r2);         /* Cantos muito arredondados */
  padding: 22px;                    /* Espaço interno */
  
  transition: border-color 0.2s;    /* Anima mudança de borda */
}

.card:hover {
  border-color: var(--border2);  /* Borda fica mais visível */
}

.card-label {
  font-size: 10px;
  text-transform: uppercase;     /* Maiúsculas */
  letter-spacing: 1.5px;         /* Espaçamento entre letras */
  color: var(--text3);           /* Cinza escuro */
}
```

#### 6. GRIDS (Layout com Múltiplas Colunas)

```css
.g2 {
  display: grid;                                           /* Grid layout */
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  /* 
    repeat(auto-fit, ...) = cria o máximo de colunas que cabem
    minmax(260px, 1fr) = cada coluna tem min 260px, max 1fr
    Resultado: Em telas largas = 2-4 colunas
               Em telas pequenas = 1 coluna
  */
  gap: 14px;  /* Espaço entre itens */
}

.g3 {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  /* 3 colunas por padrão */
}

.g4 {
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 14px;
  /* 4 colunas por padrão (cards pequenos no dashboard) */
}
```

#### 7. CHECKBOXES

```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--border2);  /* Borda roxo sutil */
  border-radius: 6px;                  /* Cantos ligeiramente arredondados */
  
  transition: all 0.18s;               /* Anima mudanças rápido */
}

.checkbox.on {
  background: var(--accent);           /* Fundo roxo */
  border-color: var(--accent);         /* Borda roxo */
}

.checkbox.on::after {
  content: '✓';                        /* Mostra marca de check */
  color: #fff;                         /* Branco */
  font-size: 11px;
  font-weight: 700;                    /* Bold */
}
```

**CSS não mostra o ::after diretamente (JavaScript adiciona o conteúdo):**
```javascript
// Em scripts.js:
div.innerHTML = `<div class="checkbox ${done ? 'on' : ''}"></div>`;
// Se done = true, adiciona class "on"
// CSS então mostra o ✓ via ::after
```

#### 8. EDIT MODE

```css
.edit-mode .checkbox { display: none; }
/* Em modo edição, checkbox desaparece */

.edit-mode .edit-controls { display: flex; }
/* Em modo edição, botões de edição aparecem */

.edit-input {
  background: var(--bg3);               /* Fundo cinza */
  border: 1px solid var(--border2);     /* Borda roxo sutil */
  color: var(--text);                   /* Texto branco */
  padding: 8px 12px;
  border-radius: var(--r);
}

.edit-input:focus {
  outline: none;                        /* Remove outline padrão */
  border-color: var(--accent);          /* Borda roxo */
  box-shadow: 0 0 8px rgba(123,97,255,0.2); /* Brilho roxo sutil */
}
```

#### 9. TOAST (Notificações)

```css
.toast {
  position: fixed;                     /* Fica fixo na tela */
  bottom: 28px;                        /* 28px do chão */
  left: 50%;                           /* Centralizado horizontalmente */
  
  transform: translateX(-50%) translateY(80px);
  /* Move para esquerda 50% + 80px para baixo (fora da tela) */
  
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* Anima posição com efeito "bounce" */
  
  pointer-events: none;                /* Não interfere com cliques */
  z-index: 999;                        /* Fica acima de tudo */
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  /* Quando .show é adicionada, anima para cima (0px de deslocamento) */
}
```

**Como JavaScript usa:**
```javascript
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');  // Adiciona .show → anima para cima
  
  setTimeout(() => t.classList.remove('show'), 2400);  // Remove após 2.4s
}
```

#### 10. RESPONSIVIDADE

```css
@media (max-width: 560px) {
  /* Estas regras só se aplicam em telas ≤ 560px */
  
  .main {
    padding: 14px;  /* Menos espaço em mobile */
  }
  
  .sidebar {
    width: 54px;  /* Sidebar mais fina */
  }
  
  .habit-dots {
    display: none;  /* Esconde dias de hábitos em mobile */
  }
  
  .g2 {
    grid-template-columns: 1fr;  /* 1 coluna em mobile */
  }
}
```

---

## ⚙️ PARTE 3: O ARQUIVO JAVASCRIPT (scripts.js)

### O que é JavaScript?
JavaScript = Linguagem de programação para adicionar **interatividade**.
- Responde a cliques, submissões, intervalos de tempo
- Modifica o HTML e CSS dinamicamente
- Salva/carrega dados
- Calcula valores

### Seção 1: Estado (State Management)

#### 1.1 Inicialização

```javascript
// Objeto global que armazena TODO o estado da aplicação
let S = {};

// Data de hoje
const TODAY = new Date();

// Dia da semana (0=Dom, 1=Seg, 2=Ter, ... 6=Sáb)
const WEEKDAY = TODAY.getDay();

function loadS() {
  // Esta função roda quando a página abre
  
  // Define estrutura padrão dos dados
  const d = {
    rotina: {},        // { 's1_01': true, 's1_02': false, ... }
    higiene: {},       // { 'b1': true, 'b2': false, ... }
    study: {},         // { 'sb1_1': true, 'sb1_2': false, ... }
    habits: {},        // { 'h_agua': { 'Mon Apr 28 2025': true, ... }, ... }
    studyNotes: [],    // Array de { subject: '...', notes: '...', score: 85 }
    lastReset: TODAY.toDateString(),  // "Tue Apr 29 2025"
  };
  
  // Tenta carregar dados salvos do localStorage
  const saved = localStorage.getItem('apex_v2');
  // localStorage.getItem('chave') = busca valor salvo
  // retorna null se não encontrar
  
  if (saved) {
    // Se achou dados salvos
    S = { ...d, ...JSON.parse(saved) };
    // JSON.parse() converte string JSON → objeto JavaScript
    // { ...d, ...saved } = mescla estrutura padrão com dados salvos
  } else {
    // Se não achou dados salvos
    S = d;  // Usa estrutura padrão
  }
  
  // Verifica se é um novo dia
  if (S.lastReset !== TODAY.toDateString()) {
    // lastReset != hoje → é um novo dia
    
    // Limpa checkboxes (resets para amanhã recomeçar)
    S.rotina = {};
    S.higiene = {};
    S.study = {};
    
    // Atualiza data do último reset
    S.lastReset = TODAY.toDateString();
    
    // Salva mudanças
    saveS();
  }
}

function saveS() {
  // Esta função salva S no localStorage
  
  localStorage.setItem('apex_v2', JSON.stringify(S));
  // localStorage.setItem('chave', 'valor')
  // JSON.stringify() converte objeto JavaScript → string JSON
  // Dados persistem mesmo fechando navegador
}
```

**LocalStorage explicado:**
```javascript
// Salvar:
localStorage.setItem('chave', 'valor');  // valor é sempre string

// Carregar:
const valor = localStorage.getItem('chave');  // retorna string ou null

// Deletar:
localStorage.removeItem('chave');

// Limpar tudo:
localStorage.clear();

// Dados salvos no navegador específico
// Não saem da máquina
// Não é enviado a servidor
```

#### 1.2 Edit Mode State

```javascript
// Flag que controla se está em modo edição
let editMode = false;

// Cópia dos dados de rotina personalizados
let customDaysData = null;
// null = usar DAYS_DATA original
// objeto = usar dados editados

// Qual dia está sendo editado
let selectedDay = undefined;
// undefined = usar dia de hoje (WEEKDAY)

function getDaysData() {
  // Retorna dados personalizados ou originais
  
  if (customDaysData) {
    return customDaysData;
    // Se há dados editados, usa esses
  }
  
  const saved = localStorage.getItem('apex_days_data');
  // Tenta carregar dados salvos
  
  if (saved) {
    return JSON.parse(saved);  // Retorna dados salvos
  }
  
  return null;  // Nenhum dado customizado
  // Quando null, renderRotina() usa DAYS_DATA original
}

function saveDaysData(data) {
  // Salva edições de rotina
  
  customDaysData = data;  // Salva em memória
  localStorage.setItem('apex_days_data', JSON.stringify(data));  // Persiste
}
```

### Seção 2: Funções de Navegação

```javascript
function go(p) {
  // p = página ('dash', 'rotina', 'higiene', 'enem', 'habitos', 'flashcard')
  // Esta função muda de página
  
  // Remove classe "active" de TODAS as páginas
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  // querySelectorAll() = busca TODOS os elementos com selector
  // .forEach() = para cada um, executa função
  
  // Remove classe "active" de TODOS os nav-items
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  
  // Adiciona classe "active" à página selecionada
  document.getElementById('page-' + p).classList.add('active');
  // getElementById('page-dash') + classList.add() + 'active'
  // Resultado: página fica visível e anima
  
  // Adiciona classe "active" ao botão do nav correspondente
  document.querySelector(`[data-p="${p}"]`).classList.add('active');
  // querySelector([data-p="dash"]) = busca 1 elemento com data-p="dash"
  
  // Re-renderiza tudo
  refreshAll();
  // Chama todas as funções render
}
```

**Exemplo de fluxo:**
```javascript
// Usuário clica em botão "Rotina"
// Evento onclick="go('rotina')" é disparado
// go('rotina') executa:

// 1. Remove .active de todas as páginas
//    <div class="page active" id="page-dash">  →  <div class="page" id="page-dash">
//    <div class="page" id="page-rotina">  →  SEM MUDANÇA (já não tinha)

// 2. Adiciona .active à página-rotina
//    <div class="page" id="page-rotina">  →  <div class="page active" id="page-rotina">

// 3. CSS detecta .active e aplica:
//    display: block;  (página fica visível)
//    animation: fadeUp 0.35s ease;  (anima entrada)

// 4. renderRotina() preenche o HTML com dados
```

### Seção 3: Dados de Rotina (DAYS_DATA)

```javascript
const DAYS_DATA = {
  // Objeto com 7 propriedades (uma por dia da semana)
  // Chave = número do dia (0=Dom, 1=Seg, ..., 6=Sáb)
  
  0: {  // Domingo (dia de repouso)
    label: 'Domingo',
    type: 'Repouso & Reset',
    morning: [
      // Array de tarefas da manhã
      {
        id: 'd0_01',                                  // ID único
        title: '06:30 — Meditação 10min',              // Título mostrado
        desc: 'Mindfulness & gratidão',                // Descrição sob o título
        tag: 'ment'                                    // Categoria (ment=mental)
      },
      // ... mais tarefas
    ],
    afternoon: [
      // Array de tarefas da tarde
      { id: 'd0_02', title: '14:00 — Leitura 30min', desc: 'Ficção ou não-ficção', tag: 'ment' },
      // ...
    ],
    night: [
      // Array de tarefas da noite
      // ...
    ],
    aftLabel: '☀️ Tarde — Lazer & Descanso',  // Label customizado para tarde
  },
  
  1: {  // Segunda-feira
    label: 'Segunda-feira',
    type: 'Escola Tarde + Estudo Manhã',
    morning: [
      {
        id: 's1_01',
        title: '05:00 — Água 500ml + Raspagem de Língua',
        desc: 'Em jejum, antes de qualquer líquido',
        tag: 'hig'  // hig = higiene
      },
      {
        id: 's1_02',
        title: '05:30 — Exercício 25min',
        desc: 'Caminhada, corrida ou treino',
        tag: 'bio'  // bio = biológico
      },
      // ... mais tarefas da segunda
    ],
    afternoon: [
      {
        id: 's1_10',
        title: '12:00 — Almoço + Descanso',
        desc: 'Refeição adequada e digestão',
        tag: 'bio'
      },
      // ...
    ],
    night: [
      // ...
    ],
    aftLabel: '🎒 Tarde — Escola',  // Mostra "Escola" na tarde
  },
  
  // Terça (2), Quarta (3), Quinta (4), Sexta (5), Sábado (6)
  // ... estrutura similar ...
};

// Tags de categorização (cores diferentes no UI):
// 'hig'  = roxo  (higiene)
// 'bio'  = ciano (biológico)
// 'est'  = ouro  (estudo)
// 'ment' = vermelho (mental)
```

### Seção 4: Renderização (Render Functions)

#### 4.1 Renderizar Dashboard

```javascript
function renderDash() {
  // Atualiza data no header
  const d = new Date();
  const opts = {
    weekday: 'long',    // "Monday"
    year: 'numeric',    // "2025"
    month: 'long',      // "April"
    day: 'numeric'      // "28"
  };
  const dateStr = d.toLocaleDateString('pt-BR', opts);
  // Resultado: "segunda-feira, 28 de abril de 2025"
  
  document.getElementById('dash-date').textContent = dateStr;
  // Coloca a data no HTML
  
  // ── CALCULAR PERCENTUAIS ──
  
  // Pega dados de rotina de hoje
  const dayData = getCurrentDayData(WEEKDAY);
  
  // Junta todas as tarefas (manhã + tarde + noite)
  const allRot = [
    ...(dayData.morning || []),    // Spread operator: expande array
    ...(dayData.afternoon || []),
    ...(dayData.night || [])
  ];
  
  // Conta quantas estão marcadas como feitas (true)
  const rotDone = allRot.filter(i => S.rotina[i.id]).length;
  // .filter() = retorna array com apenas os que atendem critério
  // S.rotina[i.id] = true se marcado, undefined se não
  // undefined é falsy, então não entra no resultado
  
  // Calcula percentual
  const rotPct = allRot.length ? Math.round((rotDone / allRot.length) * 100) : 0;
  // Evita divisão por zero com ? :
  
  // ── REPETIR PARA HIGIENE E ESTUDO ──
  // (mesma lógica, diferentes arrays)
  
  // Calcular overall
  const overall = Math.round((rotPct + higPct + estPct) / 3);
  
  // ── ATUALIZAR VISUAL ──
  
  // Atualizar circle (anel de progresso)
  const circle = document.getElementById('score-circle');
  
  const circumference = 2 * Math.PI * 38;  // Perímetro do círculo
  // r=38, então 2πr = perímetro
  
  circle.style.strokeDashoffset = circumference - (circumference * overall / 100);
  // strokeDashoffset controla quanto da linha tracejada fica visível
  // 0 = linha completa
  // circumference = linha invisível
  
  // Atualizar label
  const labels = [
    [0, 'Sistema Offline', 'Complete suas rotinas'],
    [20, 'Iniciando Motores', 'Bom começo!'],
    [40, 'Aquecendo', 'Você está indo bem'],
    [60, 'Alta Performance', 'Continue assim!'],
    [80, 'Modo Titã Ativo', 'Impressionante!'],
    [95, 'APEX COMPLETO', 'Dia perfeito! 🔱'],
  ];
  
  let lbl = labels[0];  // Começa com 0
  labels.forEach(l => {
    if (overall >= l[0]) lbl = l;  // Se score >= threshold, usa este label
  });
  // Resultado: encontra o maior threshold que é ≤ overall
  
  document.getElementById('score-label').textContent = lbl[1];
  // Mostra "Sistema Offline", "Iniciando Motores", etc.
}
```

**SVG Stroke-Dasharray/Offset explicado:**

```
Imagine uma linha tracejada: ▬▬▬▬▬▬▬▬

stroke-dasharray: 100 100
┌─ tamanho do traço (100)
└─ tamanho do espaço (100)
Resultado: █ █ █ █

stroke-dashoffset: 0
Linha começa normalmente: █ █ █ █

stroke-dashoffset: 50
Linha desliza 50px para esquerda (antes é oculto): ▫ █ █ █

Aplicado ao circle:
- dasharray = circumference (linha tem tamanho = perímetro)
- offset = 0 ao 100% = linha fica visível/invisível gradualmente
```

#### 4.2 Renderizar Rotina

```javascript
function renderRotina(dayNum) {
  // dayNum = qual dia mostrar (0-6)
  // Se undefined, usa hoje (WEEKDAY)
  
  if (editMode) {
    renderDayEditForm();  // Se em edição, renderiza form
    return;  // Sai da função
  }
  
  selectedDay = dayNum;  // Salva qual dia está selecionado
  
  // ── CRIAR ABAS DOS DIAS ──
  
  const wt = document.getElementById('week-tabs');
  wt.innerHTML = '';  // Limpa conteúdo anterior
  
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const restDays = [0, 6];  // Domingo e sábado são "repouso"
  
  [1, 2, 3, 4, 5, 6, 0].forEach(d => {
    // Cria aba para cada dia
    
    const btn = document.createElement('div');
    // Cria novo elemento <div>
    
    btn.className = 'week-tab'
      + (restDays.includes(d) ? ' rest' : '')  // Adiciona class se é fim de semana
      + ((selectedDay || WEEKDAY) === d ? ' active' : '');  // Adiciona class se está selecionado
    
    btn.textContent = dayNames[d] + (d === WEEKDAY ? ' ★' : '');
    // Mostra nome do dia, com ★ para hoje
    
    btn.onclick = () => renderRotina(d);
    // Ao clicar, re-renderiza com outro dia
    
    wt.appendChild(btn);
    // Adiciona aba ao container
  });
  
  // ── RENDERIZAR SEÇÕES ──
  
  const day = getCurrentDayData(selectedDay !== undefined ? selectedDay : WEEKDAY);
  // Pega dados do dia selecionado
  
  renderCheckSection('rot-morning', day.morning || [], 'rotina');
  // Renderiza manhã
  // 1º arg: ID do container HTML
  // 2º arg: array de tarefas
  // 3º arg: chave em S (S.rotina, S.higiene, etc)
  
  renderCheckSection('rot-afternoon', day.afternoon || [], 'rotina');
  renderCheckSection('rot-night', day.night || [], 'rotina');
}

function renderCheckSection(containerId, items, stateKey) {
  // Renderiza uma seção de checkboxes
  
  const c = document.getElementById(containerId);
  c.innerHTML = '';  // Limpa
  
  items.forEach(item => {
    // Para cada tarefa no array
    
    const done = S[stateKey][item.id];
    // Verifica se está marcada como feita
    // S.rotina['s1_01'] = true ou false ou undefined
    // undefined é falsy (não feita)
    
    const div = document.createElement('div');
    div.className = 'check-item' + (done ? ' done' : '');
    // Adiciona class "done" se item foi feito
    // CSS pode usar .done para estilo diferente
    
    div.onclick = () => toggleItem(item.id, stateKey, containerId, items);
    // Ao clicar, alterna o checkbox
    
    // Define mapa de cores por tag
    const tagMap = {
      hig: 'tag-hig',    // roxo
      est: 'tag-est',    // ouro
      bio: 'tag-bio',    // ciano
      ment: 'tag-ment'   // vermelho
    };
    
    // Renderiza HTML da tarefa
    div.innerHTML = `
      <div class="checkbox ${done ? 'on' : ''}"></div>
      <!-- Checkbox: vazio se não feito, "on" se feito (CSS mostra ✓) -->
      
      <div class="check-info">
        <div class="check-title">${item.title}</div>
        <div class="check-sub">${item.desc}</div>
      </div>
      
      ${item.tag ? `<div class="check-tag ${tagMap[item.tag] || 'tag-hig'}">${item.tag}</div>` : ''}
      <!-- Badge com categoria (hig, bio, est, ment) -->
    `;
    
    c.appendChild(div);
    // Adiciona tarefa ao container
  });
}

function toggleItem(id, stateKey, containerId, items) {
  // Alterna checkbox de um item
  
  S[stateKey][id] = !S[stateKey][id];
  // Inverte: true → false, false → true, undefined → true
  // Se S.rotina['s1_01'] era false, vira true
  
  saveS();
  // Salva no localStorage
  
  if (S[stateKey][id]) {
    toast('✅ Etapa concluída!');  // Mostra notificação
  }
  
  renderCheckSection(containerId, items, stateKey);
  // Re-renderiza a seção (checkbox anima)
  
  renderDash();
  // Atualiza score (pode ter mudado percentual)
}
```

#### 4.3 Renderizar Hábitos

```javascript
function renderHabits() {
  // Renderiza página de hábitos
  
  const now = new Date();
  const weekDays = [];
  
  // Coleta últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    // Subtrai dias: hoje -6, -5, -4, -3, -2, -1, 0
    
    weekDays.push({
      day: WEEK_LABELS[d.getDay()],        // "D", "S", "T", etc
      key: d.toDateString()                // "Mon Apr 28 2025"
    });
  }
  // Resultado: array com últimos 7 dias
  
  // Renderizar header (dias da semana)
  const hdr = document.getElementById('habit-header');
  hdr.innerHTML = weekDays.map((w, i) => `
    <div style="color: ${i === 6 ? 'var(--accent)' : 'var(--text3)'}">
      ${w.day}
    </div>
    <!-- i===6 = hoje, usa cor roxo (destaque) -->
    <!-- Outros dias, cinza -->
  `).join('');
  
  // Renderizar linhas de hábitos
  HABITS.forEach(h => {
    // Para cada hábito
    
    if (!S.habits[h.id]) S.habits[h.id] = {};
    // Se não existe entrada, cria objeto vazio
    
    const row = document.createElement('div');
    row.className = 'habit-row';
    
    // Contar streak (dias consecutivos do final para trás)
    let streak = 0;
    for (let i = weekDays.length - 1; i >= 0; i--) {
      if (S.habits[h.id][weekDays[i].key]) {
        streak++;
      } else {
        break;  // Para no primeiro dia não completo
      }
    }
    // Resultado: se últimos 3 dias foram completos, streak=3
    
    row.innerHTML = `
      <div class="habit-name">${h.name}</div>
      <div class="habit-dots" id="hd-${h.id}"></div>
      <div class="habit-streak">${streak}🔥</div>
    `;
    
    const dotWrap = row.querySelector(`#hd-${h.id}`);
    
    weekDays.forEach((w, i) => {
      // Para cada dia, cria quadrado clicável
      
      const on = S.habits[h.id][w.key];
      // true se hábito foi completo neste dia
      
      const dot = document.createElement('div');
      dot.className = 'habit-dot' + (on ? ' on' : '');
      // "on" mostra o quadrado preenchido/colorido
      
      dot.textContent = w.day;
      
      dot.onclick = () => {
        // Ao clicar, alterna o dia
        S.habits[h.id][w.key] = !S.habits[h.id][w.key];
        saveS();
        renderHabits();  // Re-renderiza para atualizar
      };
      
      dotWrap.appendChild(dot);
    });
  });
}
```

#### 4.4 Renderizar Flashcards

```javascript
let fcFilter = 'all';    // Filtro ativo
let fcIdx = 0;           // Índice do card mostrado
let fcFiltered = [];     // Array filtrado de cards

function renderFlashcards() {
  // Filtra cards por categoria
  fcFiltered = fcFilter === 'all'
    ? [...FLASHCARDS]  // Cópia de todos
    : FLASHCARDS.filter(c => c.cat === fcFilter);  // Apenas categoria
  
  if (fcIdx >= fcFiltered.length) fcIdx = 0;  // Reset index se fora do range
  
  showCard();
}

function showCard() {
  // Mostra o card atual
  
  const fc = document.getElementById('fc-card-area');
  const card = fcFiltered[fcIdx];
  
  // Renderiza HTML do card
  fc.innerHTML = `
    <div class="flashcard" id="fc-main" onclick="revealCard()">
      <!-- Pergunta (sempre visível) -->
      <div class="fc-question">${card.q}</div>
      
      <!-- Resposta (oculta, aparece ao clicar) -->
      <div class="fc-answer">${card.a}</div>
      <!-- CSS: display: none, muda para display: block ao clicar -->
      
      <!-- Dica -->
      <div class="fc-hint">Clique para revelar</div>
    </div>
  `;
  
  // Atualiza contador
  document.getElementById('fc-counter').textContent = (fcIdx + 1) + ' / ' + fcFiltered.length;
}

function revealCard() {
  // Alterna visibilidade da resposta
  const fc = document.getElementById('fc-main');
  fc.classList.toggle('revealed');
  // toggle = adiciona se não tiver, remove se tiver
  // CSS mostra fc-answer quando .revealed está presente
}

function nextCard() {
  // Próximo card
  fcIdx = (fcIdx + 1) % fcFiltered.length;
  // % = módulo: quando chega ao final, volta ao 0
  showCard();
}

function prevCard() {
  // Card anterior
  fcIdx = (fcIdx - 1 + fcFiltered.length) % fcFiltered.length;
  // +fcFiltered.length evita números negativos
  showCard();
}

function setFcFilter(f, btn) {
  // Muda filtro
  
  fcFilter = f;
  fcIdx = 0;  // Reset para primeiro card do filtro
  
  // Remove class .btn-prime (roxo) de todos os botões
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

### Seção 5: Funções Utilitárias

```javascript
function toast(msg) {
  // Mostra notificação temporária no rodapé
  
  const t = document.getElementById('toast');
  t.textContent = msg;
  
  t.classList.add('show');
  // CSS: transformY(0) = posição normal
  // animation: 0.4s com bounce
  
  setTimeout(() => {
    t.classList.remove('show');
    // Remove .show após 2.4 segundos
    // CSS: transformY(80px) = volta para baixo da tela
  }, 2400);
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
  // Retorna dados do dia (personalizados ou originais)
  const data = getDaysData() || DAYS_DATA;
  return data[dayNum] || DAYS_DATA[1];
}
```

### Seção 6: Inicialização (Startup)

```javascript
// Estas linhas rodam quando a página abre

loadS();           // Carrega dados do localStorage
initDaysData();    // Carrega dados personalizados de rotina
refreshAll();      // Renderiza todas as páginas

// Atualiza dashboard a cada 1 minuto
setInterval(renderDash, 60000);
// 60000 ms = 60 segundos = 1 minuto
```

---

## 📊 Fluxo Completo de um Dia de Uso

### 1. Usuário abre a página (00:00 - 23:59)

```
Browser carrega index.html
    ↓
CSS é carregado (styles.css)
    ↓
JavaScript inicia (scripts.js)
    ├─ loadS() → busca S do localStorage
    ├─ initDaysData() → busca rotina personalizada
    ├─ refreshAll() → renderiza Dashboard
    └─ setInterval(renderDash, 60000) → atualiza a cada minuto
    
Página exibe Dashboard com score 0%
```

### 2. Usuário clica em tarefa (ex: "05:00 - Água")

```
HTML: <div class="check-item" onclick="toggleItem(...)">
    ↓
toggleItem('s1_01', 'rotina', ...) é chamado
    ↓
S.rotina['s1_01'] = !S.rotina['s1_01']  (false → true)
    ↓
saveS()  (localStorage.setItem('apex_v2', JSON.stringify(S)))
    ↓
renderCheckSection() re-renderiza a lista
    ├─ Checkbox muda de classe: '' → 'on'
    ├─ CSS mostra ✓
    └─ Animação suave
    
toast('✅ Etapa concluída!')  (notificação aparece)
    ↓
renderDash()  (recalcula score)
    ├─ Conta tarefas completas
    ├─ Calcula novo percentual
    └─ Anima anel de progresso
    
Resultado: score sobe de 0% para (ex) 5%
```

### 3. Usuário muda de dia

```
Clica em aba "Terça" na página Rotina
    ↓
renderRotina(2)  (2 = terça-feira)
    ├─ Limpa conteúdo anterior
    ├─ Cria abas dos 7 dias (com "Terça" como ativo)
    ├─ Busca dados de segunda (DAYS_DATA[2])
    └─ Renderiza checkboxes para terça
    
Página mostra rotina de terça
(S.rotina ainda tem dados de segunda, mas visual muda)
```

### 4. Usuário clica "Editar Rotina"

```
Button com onclick="toggleEditMode()"
    ↓
editMode = !editMode  (false → true)
    ↓
Adiciona class .edit-mode à página
    ↓
renderDayEditForm()
    ├─ Busca dados de rotina
    ├─ Renderiza inputs de edição
    └─ Mostra botões de salvar/deletar/adicionar
    
CSS aplica estilos de edit-mode:
    ├─ .edit-mode .checkbox { display: none; }
    ├─ .edit-mode .edit-controls { display: flex; }
    └─ .edit-input { background: cinza; }
    
Página mostra formulário de edição
```

### 5. Usuário edita e clica "Salvar"

```
saveDayEdit(1)  (salva segunda-feira)
    ├─ Lê valores dos inputs
    ├─ Atualiza data[1] com novos valores
    ├─ saveDaysData(data)
    │  ├─ customDaysData = data
    │  └─ localStorage.setItem('apex_days_data', JSON.stringify(data))
    └─ renderDayEditForm()  (re-renderiza form)
    
toast('✅ Dia salvo com sucesso!')
```

### 6. Usuário fecha navegador

```
S com dados do dia está em memória
localStorage.setItem() foi chamado várias vezes
    ↓
Dados salvos no navegador:
    ├─ localStorage['apex_v2'] = "{rotina: {...}, higiene: {...}, ...}"
    └─ localStorage['apex_days_data'] = "{1: {...}, 2: {...}, ...}"
```

### 7. Usuário abre página amanhã

```
TODAY = new Date()  (novo dia)
    ↓
loadS()
    ├─ Carrega dados do localStorage
    ├─ Verifica: S.lastReset !== TODAY.toDateString()?
    │  └─ Se sim (novo dia):
    │     ├─ S.rotina = {}
    │     ├─ S.higiene = {}
    │     ├─ S.study = {}
    │     ├─ S.lastReset = "novo dia"
    │     └─ saveS()
    └─ Resultado: checkboxes resetam para novo dia
    
refreshAll()  (renderiza com checkboxes vazios)
```

---

## 🎯 Resumo para Apresentar

Quando for apresentar o APEX, explique assim:

### Slide 1: O que é?
"APEX é um dashboard de produtividade pessoal que rastreia 5 áreas-chave do dia: rotina, higiene, estudo, hábitos e revisão. Tudo no navegador, sem servidor, sem login."

### Slide 2: Como funciona?
"Separamos o código em 3 arquivos:
- **HTML**: Estrutura e componentes (o que existe)
- **CSS**: Cores e layout (como parece)
- **JavaScript**: Lógica e interatividade (o que faz)

Dados salvam no localStorage do navegador."

### Slide 3: Fluxo de Uso
"Usuário abre → Dashboard mostra score 0%
→ Clica em tarefas para marcar como completo
→ Score sobe automaticamente
→ Pode editar rotina diária
→ Dados salvam no navegador"

### Slide 4: Tecnologia
"Stack: HTML5 + CSS3 + Vanilla JavaScript
- Sem frameworks (puro, rápido)
- SVG para gráficos animados
- LocalStorage para persistência
- Responsive (desktop + mobile)"

### Slide 5: Principais Features
"✅ Score circular animado
✅ Edição inline da rotina
✅ Rastreamento de 8 hábitos
✅ 14 flashcards de revisão
✅ Protocolo de higiene detalhado
✅ 7 estruturas diferentes por dia da semana"

---

## 🎓 Próximos Passos para Aprender Mais

1. **Modificar Dados**: Mude DAYS_DATA para adicionar/remover tarefas
2. **Adicionar Cores**: Modifique :root em styles.css para tema escuro/claro
3. **Adicionar Habitos**: Adicione hábitos ao array HABITS
4. **Adicionar Flashcards**: Adicione cards ao array FLASHCARDS
5. **Exportar Dados**: Crie botão que faz download de S em JSON
6. **Sincronizar Cloud**: Use um servidor para sincronizar dados entre dispositivos

---

**Criado em**: 29 de abril de 2026
**Para**: Estudo e apresentação do sistema APEX
**Nível**: Intermediário (conhece HTML/CSS básico)
