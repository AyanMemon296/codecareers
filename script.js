/**
 * script.js — DRY · KISS · SOC
 * Handles: theme toggle, nav highlight, dynamic rendering from content.json, and tech ecosystem showcase
 */

// ─── THEME ────────────────────────────────────────────────────────────────────
(function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    menuIconOpen.classList.toggle('hidden', !isHidden);
    menuIconClose.classList.toggle('hidden', isHidden);
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });
}

// ─── ACTIVE NAV ON SCROLL ─────────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// ─── ICON MAPS ────────────────────────────────────────────────────────────────
// Course track SVGs (inline, no emoji)
const COURSE_ICONS = {
  web: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>`,
  mobile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/>
  </svg>`,
  data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>`,
};

// SVG icon for table track group headers (smaller)
const TABLE_ICONS = {
  web: `<svg class="th-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>`,
  mobile: `<svg class="th-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>`,
  data: `<svg class="th-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
};

// Full catalog of tech stack SVG icons from assets/icons/
const TECH_ICONS = {
  android_studio: 'android_studio',
  antigravity: 'antigravity',
  bolt: 'bolt',
  chatgpt: 'chatgpt',
  claude: 'claude',
  cloudflare: 'cloudflare',
  css: 'css',
  cursor: 'cursor',
  dart: 'dart',
  docker: 'docker',
  express: 'express',
  fastapi: 'fastapi',
  firebase: 'firebase',
  flutter: 'flutter',
  gemini: 'gemini',
  git: 'git',
  github: 'github',
  github_actions: 'github_actions',
  google_ai_studio: 'google_ai_studio',
  google_play_console: 'google_play_console',
  html5: 'html5',
  javascript: 'javascript',
  kiro: 'kiro',
  lovable: 'lovable',
  nest_js: 'nest_js',
  netlify: 'netlify',
  next_js: 'next_js',
  node_js: 'node_js',
  postgresql: 'postgresql',
  prisma: 'prisma',
  pydantic: 'pydantic',
  python: 'python',
  railway: 'railway',
  react: 'react',
  redis: 'redis',
  render: 'render',
  replit: 'replit',
  sqlalchemy: 'sqlalchemy',
  sqlite: 'sqlite',
  sqlmodel: 'sqlmodel',
  supabase: 'supabase',
  swagger: 'swagger',
  tailwind_css: 'tailwind_css',
  typescript: 'typescript',
  v0: 'v0',
  vercel: 'vercel',
  vite: 'vite',
  vscode: 'vscode'
};

// Dark-colored icons that need inversion in dark mode for maximum contrast
const DARK_ICONS = new Set([
  'github',
  'next_js',
  'vercel',
  'replit',
  'prisma',
  'antigravity',
  'cursor',
  'v0',
  'bolt',
  'kiro',
  'express',
  'chatgpt',
  'railway',
  'render'
]);

function getIconClass(key) {
  return DARK_ICONS.has(key) ? 'dark-invert' : '';
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function el(tag, cls, html = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

// Tech stack icons: uniform 20px (w-5 h-5) per assets/icons/ SVGs
function techStackHTML(stack) {
  return stack.map(key => {
    const file = TECH_ICONS[key] || key;
    const label = key.replace(/_/g, ' ');
    const darkInvert = getIconClass(key);
    return `<div class="tech-icon" title="${label}">
      <img src="assets/icons/${file}.svg" alt="${label}" class="${darkInvert}" loading="lazy" width="20" height="20"
           onerror="this.parentElement.style.display='none'"/>
    </div>`;
  }).join('');
}

function courseIconHTML(id) { return COURSE_ICONS[id] || ''; }

function macDots(label = '') {
  return `<span class="mac-dot bg-red-400"></span>
          <span class="mac-dot bg-yellow-400"></span>
          <span class="mac-dot bg-green-400"></span>
          ${label ? `<span class="project-type-label">${label}</span>` : ''}`;
}

// ─── STATE ────────────────────────────────────────────────────────────────────
let data = null;
let activeTrack = 'web';
let activeLevel = 1;
let activeTechCategory = 'All';

// ─── COURSE CARDS ─────────────────────────────────────────────────────────────
function renderCourseCards() {
  const container = document.getElementById('course-cards');
  container.innerHTML = '';
  data.courses.forEach(course => {
    const [l1, l2] = course.levels;
    const pills = l1.months.flatMap(m => m.modules.map(mod => mod.name)).slice(0, 5);
    const card = el('div', 'course-card');
    card.innerHTML = `
      <div class="course-icon">${courseIconHTML(course.icon)}</div>
      <div class="course-title">${course.title}</div>
      <div class="course-desc">${l1.outcomeDesc}</div>
      <div class="course-pills">${pills.map(t => `<span class="pill">${t}</span>`).join('')}</div>
      <div class="tech-stack">${techStackHTML(l1.stack.slice(0, 8))}</div>
      <div class="course-levels mt-5">
        <button class="level-chip" onclick="selectTrackAndLevel('${course.id}', 1)" title="View 3-Month Curriculum for ${course.title}">
          <div class="duration">3 Months</div>
          <div class="level-title">${l1.title}</div>
        </button>
        <button class="level-chip" onclick="selectTrackAndLevel('${course.id}', 2)" title="View 6-Month Curriculum for ${course.title}">
          <div class="duration">6 Months</div>
          <div class="level-title">${l2.title}</div>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Global handler to switch track + level from course cards & slide down smoothly
window.selectTrackAndLevel = function(trackId, levelNum) {
  activeTrack = trackId;
  activeLevel = levelNum;
  
  // Update curriculum controls
  document.getElementById('level-btn-1').classList.toggle('active', levelNum === 1);
  document.getElementById('level-btn-2').classList.toggle('active', levelNum === 2);
  renderCurriculumTabs();
  renderCurriculum();

  // Smooth scroll to curriculum section
  const curriculumSec = document.getElementById('curriculum');
  if (curriculumSec) {
    curriculumSec.scrollIntoView({ behavior: 'smooth' });
  }
};

// ─── CURRICULUM TABS ──────────────────────────────────────────────────────────
function renderCurriculumTabs() {
  const container = document.getElementById('curriculum-tabs');
  container.innerHTML = '';
  data.courses.forEach(course => {
    const btn = el('button', `track-tab${course.id === activeTrack ? ' active' : ''}`);
    btn.innerHTML = `<span class="tab-icon">${courseIconHTML(course.icon)}</span>${course.title}`;
    btn.addEventListener('click', () => {
      activeTrack = course.id;
      renderCurriculumTabs();
      renderCurriculum();
    });
    container.appendChild(btn);
  });
}

// Month-specific tech stack mappings for visual roadmap
const MONTH_TECH_MAP = {
  'web-1': ['html5', 'css', 'javascript', 'git', 'vscode'],
  'web-2': ['typescript', 'react', 'tailwind_css', 'vite'],
  'web-3': ['react', 'github', 'cursor', 'v0', 'vercel', 'netlify'],
  'web-4': ['node_js', 'express', 'postgresql', 'prisma'],
  'web-5': ['next_js', 'redis', 'supabase', 'railway'],
  'web-6': ['docker', 'github_actions', 'claude', 'gemini', 'render'],
  'mobile-1': ['dart', 'flutter', 'vscode'],
  'mobile-2': ['flutter', 'android_studio', 'cursor'],
  'mobile-3': ['sqlite', 'firebase', 'google_play_console', 'bolt'],
  'mobile-4': ['flutter', 'dart', 'postgresql', 'fastapi'],
  'mobile-5': ['firebase', 'supabase', 'docker'],
  'mobile-6': ['github_actions', 'google_ai_studio', 'google_play_console'],
  'data-1': ['python', 'sqlite', 'vscode'],
  'data-2': ['python', 'git', 'github'],
  'data-3': ['python', 'chatgpt', 'gemini'],
  'data-4': ['python', 'postgresql', 'fastapi'],
  'data-5': ['pydantic', 'sqlalchemy', 'sqlmodel'],
  'data-6': ['docker', 'github_actions', 'google_ai_studio', 'claude', 'render']
};

// ─── CURRICULUM: STATIC 3-MONTH VISUAL ROADMAP ───────────────────────────────
function renderCurriculum() {
  const container = document.getElementById('curriculum-content');
  container.innerHTML = '';

  const course = data.courses.find(c => c.id === activeTrack);
  const level = course.levels.find(l => l.level === activeLevel);

  // Minimal header: track title + outcome role
  const header = el('div', 'curr-level-header');
  header.innerHTML = `
    <span class="curr-track-name">${level.title}</span>
    <span class="curr-outcome-chip">${level.outcome}</span>
  `;
  container.appendChild(header);

  const lastMonthNum = level.months[level.months.length - 1].month;
  const roadmap = el('div', 'roadmap-container');

  level.months.forEach((month, idx) => {
    const isCapstone = month.month === lastMonthNum;
    const projectType = isCapstone ? 'Capstone Deliverable' : 'Guided Project';
    const monthKey = `${activeTrack}-${month.month}`;
    const techKeys = MONTH_TECH_MAP[monthKey] || level.stack.slice(0, 4);

    // Week range for each month
    const startWeek = (month.month - 1) * 4 + 1;
    const endWeek = month.month * 4;

    // Month Column Card
    const col = el('div', 'roadmap-col');
    col.innerHTML = `
      <!-- Column Head -->
      <div class="roadmap-col-head">
        <div class="roadmap-meta">
          <span class="roadmap-step-badge">Month ${month.month}</span>
          <span class="roadmap-type-chip">Weeks ${startWeek}–${endWeek}</span>
        </div>
        <h3 class="roadmap-col-title">${month.title}</h3>
      </div>

      <!-- Column Body -->
      <div class="roadmap-col-body">
        <!-- Major Modules -->
        <div>
          <div class="roadmap-section-label">Core Modules</div>
          <ul class="roadmap-modules-list">
            ${month.modules.map(mod => `
              <li class="roadmap-module-item">
                <span class="roadmap-dot"></span>
                <span>${mod.name}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Key Technologies (SVGs) -->
        <div>
          <div class="roadmap-section-label">Technologies</div>
          <div class="roadmap-tech-strip">
            ${techKeys.map(key => {
              const file = TECH_ICONS[key] || key;
              const label = key.replace(/_/g, ' ');
              const darkInvert = getIconClass(key);
              return `<div class="roadmap-tech-icon" title="${label}">
                <img src="assets/icons/${file}.svg" alt="${label}" class="${darkInvert}" loading="lazy" width="16" height="16" onerror="this.parentElement.style.display='none'"/>
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Milestone Deliverable Project -->
        <div class="roadmap-project-box">
          <div class="roadmap-project-titlebar">
            ${macDots()}
            <span class="roadmap-project-tag">${isCapstone ? 'Capstone' : 'Project'}</span>
          </div>
          <div class="roadmap-project-content">
            <p class="roadmap-project-desc">${month.project}</p>
          </div>
        </div>
      </div>
    `;

    roadmap.appendChild(col);

    // Visual Connector Arrow between columns (except after the last column)
    if (idx < level.months.length - 1) {
      const connector = el('div', 'roadmap-connector');
      connector.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;
      roadmap.appendChild(connector);
    }
  });

  container.appendChild(roadmap);
}

// ─── LEVEL SWITCHER ───────────────────────────────────────────────────────────
window.setLevel = function(level) {
  activeLevel = level;
  document.getElementById('level-btn-1').classList.toggle('active', level === 1);
  document.getElementById('level-btn-2').classList.toggle('active', level === 2);
  renderCurriculum();
};

// ─── TECHNOLOGIES & TOOLS ECOSYSTEM ───────────────────────────────────────────
function renderTechEcosystem() {
  const filterContainer = document.getElementById('tech-category-filters');
  const gridContainer = document.getElementById('tech-tools-grid');
  if (!filterContainer || !gridContainer || !data.toolsEcosystem) return;

  const categories = ['All', ...data.toolsEcosystem.map(c => c.category)];

  // Category filter tabs
  filterContainer.innerHTML = '';
  categories.forEach(cat => {
    const btn = el('button', `tech-filter-btn${cat === activeTechCategory ? ' active' : ''}`, cat);
    btn.addEventListener('click', () => {
      activeTechCategory = cat;
      renderTechEcosystem();
    });
    filterContainer.appendChild(btn);
  });

  // Filter tools
  let visibleTools = [];
  data.toolsEcosystem.forEach(catGroup => {
    if (activeTechCategory === 'All' || activeTechCategory === catGroup.category) {
      catGroup.tools.forEach(tool => {
        visibleTools.push({ ...tool, category: catGroup.category });
      });
    }
  });

  gridContainer.innerHTML = '';
  visibleTools.forEach(tool => {
    const darkInvert = getIconClass(tool.id);
    const card = el('div', 'tool-item-card');
    card.innerHTML = `
      <div class="tool-icon-wrap">
        <img src="assets/icons/${tool.id}.svg" alt="${tool.name}" class="${darkInvert}" loading="lazy" width="24" height="24"
             onerror="this.parentElement.innerHTML='&bull;'"/>
      </div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-category">${tool.category}</div>
    `;
    gridContainer.appendChild(card);
  });
}

// ─── COMPARISON TABLE — clean borders, no heavy tints ─────────────────────────
function renderComparisonTable() {
  const container = document.getElementById('comparison-table');
  const rows = data.comparison.rows;

  let html = `<table class="compare-table">
    <thead>
      <tr>
        <th rowspan="2" class="th-feature">Feature</th>
        <th colspan="2" class="th-group border-l border-gray-200 dark:border-gray-700">${TABLE_ICONS.web} Web Development</th>
        <th colspan="2" class="th-group border-l border-gray-200 dark:border-gray-700">${TABLE_ICONS.mobile} Mobile Development</th>
        <th colspan="2" class="th-group border-l border-gray-200 dark:border-gray-700">${TABLE_ICONS.data} Data Science</th>
      </tr>
      <tr>
        <th class="th-sub th-sub-3mo">3 Months</th>
        <th class="th-sub th-sub-6mo">6 Months</th>
        <th class="th-sub th-sub-3mo">3 Months</th>
        <th class="th-sub th-sub-6mo">6 Months</th>
        <th class="th-sub th-sub-3mo">3 Months</th>
        <th class="th-sub th-sub-6mo">6 Months</th>
      </tr>
    </thead>
    <tbody>`;

  rows.forEach(row => {
    html += `<tr>
      <td class="td-label">${row.label}</td>
      <td class="td-group-start">${row.web3}</td>
      <td>${row.web6}</td>
      <td class="td-group-start">${row.mob3}</td>
      <td>${row.mob6}</td>
      <td class="td-group-start">${row.data3}</td>
      <td>${row.data6}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// ─── BOOTSTRAP ────────────────────────────────────────────────────────────────
fetch('content.json')
  .then(r => r.json())
  .then(json => {
    data = json;
    renderCourseCards();
    renderCurriculumTabs();
    renderCurriculum();
    renderTechEcosystem();
    renderComparisonTable();
  })
  .catch(err => console.error('Failed to load content.json:', err));
