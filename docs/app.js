// Safe-CLI-Agent 插件市场
// 从 registry.json 加载插件列表，支持搜索和筛选

const REGISTRY_URL = '../registry.json'
const REPO_BASE = 'https://github.com/wu222222/cli-agent-plugins'

const ICON_MAP = {
  terminal: '&#x1F4BB;',
  target: '&#x1F3AF;',
  globe: '&#x1F310;',
  code: '&#x2328;',
  lock: '&#x1F512;',
  search: '&#x1F50D;',
  book: '&#x1F4D6;',
  chart: '&#x1F4CA;',
  compress: '&#x1F4C4;',
  default: '&#x1F9E9;',
}

let allPlugins = []
let currentFilter = 'all'
let searchQuery = ''

// 加载插件数据
async function loadPlugins() {
  const listEl = document.getElementById('pluginList')
  const emptyEl = document.getElementById('emptyState')

  try {
    const resp = await fetch(REGISTRY_URL)
    if (!resp.ok) throw new Error('加载失败')
    const data = await resp.json()
    allPlugins = data.plugins || []
    renderPlugins()
  } catch (e) {
    listEl.innerHTML = `<div class="loading" style="color:#f56c6c">加载失败: ${e.message}</div>`
  }
}

// 渲染插件列表
function renderPlugins() {
  const listEl = document.getElementById('pluginList')
  const emptyEl = document.getElementById('emptyState')

  let filtered = allPlugins.filter(p => {
    if (currentFilter !== 'all' && p.type !== currentFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }
    return true
  })

  if (filtered.length === 0) {
    listEl.innerHTML = ''
    emptyEl.style.display = 'block'
    return
  }

  emptyEl.style.display = 'none'
  listEl.innerHTML = filtered.map(p => renderCard(p)).join('')
}

// 渲染单个插件卡片
function renderCard(p) {
  const icon = ICON_MAP[p.icon] || ICON_MAP.default
  const category = p.category || 'other'
  const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')
  const detailUrl = `${REPO_BASE}/tree/main/${p.repo_path || ''}`
  const downloadUrl = `${REPO_BASE}/archive/refs/heads/main.zip`

  return `
    <div class="plugin-card">
      <div class="plugin-icon ${category}">${icon}</div>
      <div class="plugin-body">
        <div class="plugin-top">
          <span class="plugin-name">${p.name}</span>
          <span class="plugin-type">${p.type}</span>
          <span class="plugin-version">v${p.version}</span>
        </div>
        <div class="plugin-desc">${p.description}</div>
        ${tags ? `<div class="plugin-tags">${tags}</div>` : ''}
        <div class="plugin-actions">
          <a class="btn btn-primary" href="${downloadUrl}" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            下载 ZIP
          </a>
          <a class="btn btn-secondary" href="${detailUrl}" target="_blank">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            源码
          </a>
        </div>
      </div>
    </div>
  `
}

// 搜索
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim()
  renderPlugins()
})

// 筛选
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    currentFilter = btn.dataset.filter
    renderPlugins()
  })
})

// 初始化
loadPlugins()
