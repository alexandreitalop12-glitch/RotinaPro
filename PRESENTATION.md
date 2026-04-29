# 🎤 GUIA DE APRESENTAÇÃO — APEX

> Versão executiva pronta para apresentar o projeto em 10-15 minutos

---

## ⏱️ APRESENTAÇÃO RÁPIDA (5 MINUTOS)

### Abertura (30 seg)
"Bom dia/tarde! Vou apresentar o APEX, um sistema de gestão de rotina e produtividade que construí com HTML, CSS e JavaScript puro. O principal: **funciona 100% no navegador, sem servidor, e dados salvam automaticamente.**"

### O Problema (1 min)
"Muitas pessoas têm dificuldade em:
- 📅 Manter consistência em rotinas diárias
- 🧼 Lembrar protocolos de higiene e skincare
- 📚 Organizar tempo para estudo
- 🔥 Rastrear hábitos importantes
- 🧠 Revisar conceitos-chave"

**Solução:** Um dashboard único que reúne tudo isso.

### A Solução (2 min)

#### Dashboard Principal
"Começa com um score circular que vai de 0-100%. Cada tarefa completa incrementa este score. Você vê em tempo real seu progresso do dia."

**4 Cards de Estatísticas:**
- Rotina (% de tarefas diárias)
- Higiene (% do protocolo)
- Estudo (% dos blocos)
- Média geral

#### 6 Páginas de Funcionalidade
1. **📊 Dashboard** - Visão geral do progresso
2. **📅 Rotina Diária** - 7 dias, 3 períodos cada, editável
3. **🧼 Higiene & Skincare** - Protocolo detalhado (bucal, corporal, skincare)
4. **📚 Estudo ENEM** - Blocos de estudo + redação + anotações
5. **🔥 Hábitos** - 8 hábitos com rastreador de 7 dias
6. **🧠 Flashcards** - 14 cards de memorização em 5 categorias

### Tecnologia (1.5 min)

```
┌─────────────────────────────────────────┐
│           ARQUITETURA APEX              │
├─────────────────────────────────────────┤
│                                         │
│  index.html          styles.css         │
│  (Estrutura)         (Estilos)          │
│       │                   │             │
│       └─────────┬─────────┘             │
│               DOM                       │
│               │                         │
│          scripts.js                     │
│         (Lógica JS)                     │
│               │                         │
│          localStorage                   │
│        (Persistência)                   │
│                                         │
└─────────────────────────────────────────┘
```

**Stack Tecnológico:**
- **HTML5**: Semântica estruturada
- **CSS3**: Grid + Flexbox + Animações
- **JavaScript Vanilla**: Zero frameworks
- **LocalStorage API**: Persistência no navegador
- **SVG**: Gráficos animados

**Sem:**
- ❌ Banco de dados
- ❌ Servidor
- ❌ Framework (React, Vue, Angular)
- ❌ Build tools

**Vantagens:**
- ✅ Rápido (0 latência)
- ✅ Privado (dados seu navegador)
- ✅ Offline (funciona sem internet)
- ✅ Fácil de manter (1 HTML, 1 CSS, 1 JS)

### Demo em Ação (1.5 min)

*[Abrir navegador com APEX]*

1. **Mostrar Dashboard**: "Começa com score 0%. Cada tarefa completa incrementa isso."

2. **Ir para Rotina**: "Aqui você vê as 7 dias da semana. Segunda tem escola à tarde e estudo de manhã. Sábado é simulado. Cada dia tem estrutura diferente."

3. **Marcar uma Tarefa**: "Ao clicar em 'Água 500ml', aparece checkmark e o score sobe. Dados salvam automaticamente no localStorage."

4. **Clicar Editar": "Em modo edição, posso adicionar/remover/modificar tarefas. Mudanças salvam na base de dados local."

5. **Ir para Hábitos**: "Aqui rastreio 8 hábitos por 7 dias. Cálculo automaticamente streak (dias consecutivos)."

6. **Flashcards**: "14 cards de conceitos importantes. Clico para revelar resposta. Filtro por categoria."

### Resultados (0.5 min)

"O sistema permite:
- ✅ Rastrear 56 tarefas diferentes (7 dias × 8 tarefas)
- ✅ Gerenciar protocolo de higiene de 20 etapas
- ✅ Organizar 8 blocos de estudo diários
- ✅ Acompanhar 8 hábitos ao longo da semana
- ✅ Revisar 14 conceitos-chave via flashcards

Tudo isso **salva automaticamente** no navegador."

---

## 📊 APRESENTAÇÃO LONGA (15 MINUTOS)

### I. Contexto & Objetivo (1 min)

**Contexto:**
"Desenvolvemos este projeto para resolver um problema real: falta de organização e consistência em rotinas pessoais. Muitas apps de produtividade são complexas, caras ou exigem login. Decidimos criar algo simples, rápido e 100% privado."

**Objetivo:**
"Construir um dashboard de produtividade com:
1. Interface limpa e moderna
2. Zero dependências externas
3. Dados salvam localmente
4. Funcione em desktop e mobile"

### II. Arquitetura Técnica (3 min)

#### Separação de Responsabilidades

```
CAMADA DE APRESENTAÇÃO (HTML)
├─ Definir elementos DOM
├─ Atributos (id, class, onclick)
└─ Estrutura semântica

        ↓↓↓

CAMADA DE ESTILOS (CSS)
├─ Cores (sistema de design)
├─ Layout (Grid + Flexbox)
├─ Animações
└─ Responsividade

        ↓↓↓

CAMADA DE LÓGICA (JavaScript)
├─ Gerenciar estado (S)
├─ Manipular DOM
├─ Persistência (localStorage)
└─ Interatividade
```

#### Fluxo de Dados

```
Usuario Clica
    ↓
Evento HTML acionado (onclick)
    ↓
Função JavaScript chamada
    ↓
Estado S é modificado
    ↓
saveS() persiste em localStorage
    ↓
renderXXX() atualiza DOM
    ↓
CSS anima a mudança
    ↓
Usuario vê resultado
```

#### Data Persistence

```json
LOCAL STORAGE 1: apex_v2
{
  "rotina": { "s1_01": true, "s1_02": false },
  "higiene": { "b1": true },
  "study": { "sb1_1": true },
  "habits": { "h_agua": { "Mon Apr 28 2025": true } },
  "studyNotes": [ { "subject": "Bio", "notes": "...", "score": 85 } ],
  "lastReset": "Tue Apr 29 2025"
}

LOCAL STORAGE 2: apex_days_data
{
  "1": { "label": "Segunda", "morning": [...], ... },
  "2": { "label": "Terça", "morning": [...], ... }
}
```

### III. Estrutura de Arquivos (2 min)

#### index.html (15.8 KB - 550 linhas)

**O que contém:**
- Estrutura HTML semântica
- 6 pages (uma para cada seção)
- Componentes reutilizáveis (cards, checkboxes, forms)
- Elementos SVG (anel de score)

**Exemplo de Componente:**
```html
<div class="page" id="page-rotina">
  <div class="week-tabs" id="week-tabs"></div>
  <button onclick="toggleEditMode()">✏️ Editar</button>
  
  <div class="rotina-section">
    <div class="sec-title">🌅 Manhã</div>
    <div class="check-list" id="rot-morning"></div>
  </div>
</div>
```

#### styles.css (20.2 KB - 600 linhas)

**Sistema de Design:**
- 20 variáveis CSS (:root)
- Cores: roxo (primário), ouro (secundário), ciano (terciário)
- Tipografia: Syne (títulos), DM Sans (corpo)

**Principais Seções:**
- Reset & base (limpa estilos padrão)
- Sidebar (barra lateral 68px)
- Main (conteúdo principal)
- Cards (componentes)
- Grids (layout responsivo)
- Checkboxes (interativos)
- Animações (@keyframes)

**Destaques:**
```css
:root {
  --bg: #080810;           /* Preto */
  --accent: #7b61ff;       /* Roxo */
  --gold: #f5c842;         /* Ouro */
  --cyan: #00e5c8;         /* Ciano */
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

#### scripts.js (48.1 KB - 900 linhas)

**Principais Componentes:**

1. **State Management**
```javascript
let S = {};  // Objeto global
loadS()      // Carrega do localStorage
saveS()      // Salva para localStorage
```

2. **Navigation**
```javascript
go(page)     // Muda de página
```

3. **Render Functions**
```javascript
renderDash()        // Dashboard
renderRotina(day)   // Rotina
renderHigiene()     // Higiene
renderStudy()       // Estudo
renderHabits()      // Hábitos
renderFlashcards()  // Flashcards
```

4. **Data**
```javascript
DAYS_DATA     // Rotina de 7 dias
HABITS        // Array de 8 hábitos
FLASHCARDS    // Array de 14 cards
BUCAL, CORP, SKIN_*  // Protocolos
```

5. **Utilities**
```javascript
toast(msg)    // Notificações
toggleItem()  // Checkbox
toggleEditMode()  // Edição
```

### IV. Fluxo de Operação (3 min)

#### Cenário 1: Marcar Tarefa

```javascript
1. Usuario clica checkbox
   └─ onclick="toggleItem('s1_01', 'rotina')"

2. toggleItem() executa:
   └─ S.rotina['s1_01'] = !S.rotina['s1_01']  (false → true)
   └─ saveS()  (persiste em localStorage)
   └─ toast('✅ Etapa concluída!')
   └─ renderCheckSection()  (re-renderiza com animação)
   └─ renderDash()  (recalcula score)

3. Score sobe (ex: 0% → 5%)
   └─ Anel de progresso anima
   └─ Label muda ("Sistema Offline" → "Iniciando Motores")
```

#### Cenário 2: Editar Rotina

```javascript
1. Usuario clica "Editar"
   └─ onclick="toggleEditMode()"

2. toggleEditMode() executa:
   └─ editMode = !editMode  (false → true)
   └─ .edit-mode adicionada ao page
   └─ renderDayEditForm()  (mostra inputs)

3. CSS aprova:
   ├─ Checkboxes desaparecem
   ├─ Inputs aparecem
   └─ Botões de save/delete/add aparecem

4. Usuario edita e clica Salvar
   └─ saveDayEdit()
   └─ Lê valores dos inputs
   └─ saveDaysData()  (localStorage['apex_days_data'])

5. Próxima vez que renderizar rotina, usa dados editados
```

#### Cenário 3: Novo Dia

```javascript
1. Usuario abre página amanhã
   └─ TODAY = new Date()  (nova data)

2. loadS() executa:
   └─ Carrega S do localStorage
   └─ Compara S.lastReset com TODAY
   └─ Se diferente (novo dia):
      ├─ S.rotina = {}  (limpa checkboxes)
      ├─ S.higiene = {}
      ├─ S.study = {}
      └─ S.lastReset = TODAY

3. Resultado: checkboxes resetam para começar novo dia
```

### V. Features Detalhadas (2 min)

#### 1. Dashboard
```
Score Ring (0-100%)
├─ Rotina: % de tarefas completas
├─ Higiene: % do protocolo
├─ Estudo: % dos blocos
└─ Média: (rotina + higiene + estudo) / 3

Cards:
├─ Estatísticas individuais
├─ Próximo evento
└─ Pilares do dia (ícones)
```

#### 2. Rotina Diária
```
Dados: 7 dias × 3 períodos × 8 tarefas médias = 168 tarefas
Edição: Add/remove/edit tarefas
Persistência: localStorage['apex_days_data']
```

#### 3. Higiene & Skincare
```
Bucal: Escovação, fio, enxaguante
Corporal: Ducha, hidratação
Skincare Manhã: Limpeza, hidratante, protetor
Skincare Noite: Limpeza, retinol, creme
Extras: Perfume, esfoliação
```

#### 4. Estudo ENEM
```
Blocos: 5-6 blocos por dia (variam)
Redação: 6 etapas (intro, desenvolvimento, conclusão, revisão)
Anotações: Formulário para salvar + histórico
```

#### 5. Hábitos
```
Dados: 8 hábitos × 7 dias = 56 pontos
Streak: Calcula dias consecutivos
Achievements: Badges ao atingir milestones
```

#### 6. Flashcards
```
Total: 14 cards
Categorias: Todos, Bio/Química, Higiene, Neurociência, ENEM
Mecanismo: Click para revelar resposta
Navegação: Anterior/Próximo com contador
```

### VI. Stack Tecnológico (1 min)

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| HTML | 5 | Estrutura |
| CSS | 3 | Estilos + Animações |
| JavaScript | ES6 | Lógica |
| LocalStorage | Web API | Persistência |
| SVG | 1.1 | Gráficos |
| Fonts | Google | Tipografia |

**Características:**
- ✅ Zero dependências npm
- ✅ Zero build process
- ✅ Zero frameworks
- ✅ 1 arquivo HTML
- ✅ 1 arquivo CSS
- ✅ 1 arquivo JS

### VII. Resultados & Impacto (1 min)

**Métricas:**
- 📊 Tamanho total: 84 KB (3 arquivos)
- 🚀 Tempo de carregamento: < 100ms
- 📱 Compatibilidade: Chrome, Firefox, Safari, Edge
- 💾 Persistência: Indefinida (enquanto não limpar cache)

**Benefícios:**
- 🏃 Execução rápida (sem rede)
- 🔒 Privacidade total (dados locais)
- 🎨 Interface moderna (CSS Grid + Flexbox)
- ⚡ Sem latência (sem servidor)

**Casos de Uso:**
1. Estudante preparando ENEM
2. Pessoa querendo rastrear hábitos
3. Profissional gerenciando rotina
4. Atleta otimizando performance

### VIII. Próximos Passos (1 min)

**Melhorias Possíveis:**
1. **Sincronização Cloud**: Firebase para sincronizar entre dispositivos
2. **Dark/Light Mode**: Toggle de tema
3. **Exportar/Importar**: Download de dados em JSON/CSV
4. **Notificações**: Push notifications para lembretes
5. **Gráficos**: Charts de progresso ao longo do tempo
6. **PWA**: App instalável como Progressive Web App

**Como Estender:**
1. Adicione novos dados em DAYS_DATA
2. Modifique cores em :root do CSS
3. Crie novas páginas duplicando um .page
4. Adicione função render para nova seção
5. Deploy em GitHub Pages (grátis)

### IX. Perguntas Frequentes (1 min)

**P: Onde os dados são salvos?**
R: No localStorage do navegador. Dados persiste mesmo fechando a aba.

**P: Posso usar em outro computador?**
R: Não, os dados ficam neste navegador/PC. Para sincronizar, teríamos que usar servidor.

**P: Posso editar os dados diretamente?**
R: Sim! Abra DevTools (F12), console, e digite: `S` para ver dados, ou `localStorage` para acessar.

**P: Funciona offline?**
R: Sim, 100% offline. Não precisa de internet.

**P: Posso fazer backup?**
R: Sim, em DevTools: `copy(JSON.stringify(localStorage))` copia tudo.

---

## 🎯 DICAS PARA APRESENTAR

### Antes da Apresentação
1. ✅ Abra index.html em 2 navegadores (backup)
2. ✅ Tenha dados pré-carregados para demo
3. ✅ Teste funcionalidades: clique, edite, navegue
4. ✅ Prepare screenshots em alta resolução

### Durante a Apresentação
1. 🎤 **Comece pelo "por quê"** - o problema que resolve
2. 🎨 **Mostre a UI bonita** - cores, animações, design
3. ⚡ **Destaque a velocidade** - zero latência
4. 🔒 **Mencione privacidade** - dados locais
5. 💻 **Mostre o código** - arquitetura simples
6. 🎬 **Demo em ação** - interaja com o app

### Estrutura de Apresentação

```
ABERTURA (30s)
├─ Bom dia, apresento APEX
├─ Sistema de produtividade
└─ 100% HTML + CSS + JS

PROBLEMA (1 min)
├─ Falta de organização
├─ Esquecimento de rotinas
└─ Ferramentas complexas

SOLUÇÃO (3 min)
├─ Um dashboard único
├─ 6 seções de funcionalidade
└─ Dados salvam automaticamente

DEMO (5 min)
├─ Abrir Dashboard
├─ Marcar tarefas
├─ Editar rotina
└─ Ver hábitos/flashcards

TECNOLOGIA (2 min)
├─ Stack: HTML + CSS + JS
├─ Sem frameworks
└─ LocalStorage para persistência

RESULTADO (1 min)
├─ 84 KB total
├─ Zero dependências
└─ 100% funcional

PERGUNTAS (2 min)
└─ Aberto para dúvidas
```

### Falas-Chave

**Abertura:**
"Vou apresentar o APEX, um sistema que construí para resolver um problema pessoal: falta de consistência em rotinas. A solução foi criar um dashboard simples, rápido e privado que funciona 100% no navegador."

**Sobre a Arquitetura:**
"O código é dividido em 3 camadas: HTML define a estrutura, CSS define a aparência, e JavaScript define o comportamento. Dados salvam no localStorage, então mesmo fechando o navegador, os dados persistem."

**Sobre a Performance:**
"Porque tudo roda localmente no navegador, não há latência de rede. Score atualiza em tempo real, dados salvam instantaneamente, transições são suaves. É tão rápido quanto um app nativo."

**Sobre a Privacidade:**
"Os dados ficam 100% no seu navegador. Não há servidor, não há nuvem, não há login. Você é o único que acessa seus dados. Isso é privacidade verdadeira."

**Sobre a Simplicidade:**
"O código tem zero dependências externas. Sem npm, sem webpack, sem build process. Abra o arquivo HTML no navegador e funciona. É assim que a web deveria ser."

---

## 📈 ESTATÍSTICAS PARA MENCIONAR

| Métrica | Valor |
|---------|-------|
| Linhas de Código | ~2050 |
| Arquivos | 3 |
| Tamanho Total | 84 KB |
| Tempo Carregamento | <100ms |
| Dependências | 0 |
| Variáveis CSS | 20 |
| Funções JS | 30+ |
| Dados Rastreados | 200+ |

---

## 🎬 ROTEIRO PARA DEMO (5 MIN)

### Passo 1: Mostrar Dashboard (1 min)
```
"Aqui vemos o Dashboard. O anel principal mostra score 0%, 
porque não completei nenhuma tarefa hoje.
Abaixo temos 4 cards:
- Rotina: % de tarefas
- Higiene: % do protocolo
- Estudo: % dos blocos
- Média: tudo junto

Vamos completar algumas tarefas para ver o score subir."
```

### Passo 2: Marcar Tarefas (1.5 min)
```
"Clico em 'Rotina' no menu.
Aqui estão as tarefas de hoje:
- 05:00 Água 500ml
- 05:30 Exercício 25min
- ...

Clico no checkbox de 'Água 500ml'.
[Click]
Boom! Checkmark aparece, notificação na base diz 'Etapa concluída',
e no Dashboard o score sobe para 5%.

Vou marcar mais alguns..."
[Mark 3-4 mais tarefas]
"Viu? Score agora está em 20%. Cada tarefa contribui."
```

### Passo 3: Editar Rotina (1.5 min)
```
"Agora vou clicar 'Editar Rotina' para adicionar uma tarefa.
[Click Editar]

Modo edição ativa! Agora vejo inputs para editar.
Posso adicionar uma nova tarefa clicando '+'.
[Click +]

Escrevo 'Ler 20 páginas', categoria 'Estudo'.
[Type]
Clico Salvar.
[Click]

Notificação confirma 'Nova tarefa adicionada!'.
Próxima vez que abrir Rotina, essa tarefa estará lá."
```

### Passo 4: Mostrar Hábitos (1 min)
```
"Clico em 'Hábitos'.
Aqui rastreio 8 hábitos por 7 dias.
[Mostrar linha]
Cada quadrado é um dia. Roxo = dia completo, cinza = não.

Vejo que 'Beber 2L de água' tem 3 dias roxos e 4 cinzas.
Streak mostra 2 (últimos 2 dias consecutivos).

Se eu clicar, alterna o dia."
[Click em um quadrado]
"Ativado! Próxima vez que renderizar, mostra o novo estado."
```

### Passo 5: Mostrar Flashcards (0.5 min)
```
"Por fim, Flashcards. 14 cards para memorizar conceitos.
[Mostrar card]
Pergunta: 'Qual a função da endoderme?'
Clico para revelar...
[Click]
'Produz melanina e protege contra UV'.

Posso filtrar por categoria, navegar com setas."
```

### Encerramento
```
"Tudo isso foi construído com HTML, CSS e JavaScript puro.
Dados salvam automaticamente no localStorage.
Zero latência porque roda localmente.
100% privado porque não há servidor.
84 KB total porque não há frameworks desnecessários.

Obrigado!"
```

---

## 🎓 CONCLUSÃO

APEX é um exemplo de como **simplicidade é poder** em desenvolvimento web.

✅ **Rápido**: Sem rede, sem delays
✅ **Privado**: Dados locais, sem servidores
✅ **Simples**: 3 arquivos, zero dependências
✅ **Funcional**: Resolve problema real
✅ **Bonito**: Design moderno com CSS

**A takeaway:**
Nem sempre você precisa de React, Docker e AWS. Às vezes, HTML + CSS + JavaScript puro, bem estruturado, é suficiente e melhor.

---

**Criado em**: 29 de abril de 2026
**Versão**: 1.0 - Pronto para apresentar
**Tempo**: 5-15 minutos conforme detalhe
