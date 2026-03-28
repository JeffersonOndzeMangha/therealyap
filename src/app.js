export const CHANNEL_URL = 'https://www.youtube.com/@therealyap'

export const LOGO_URL = 'https://github.com/user-attachments/assets/3831e048-ffdf-45b9-b28f-c00f8c56001a'
export const LOGO_FALLBACK_URL = '/logo.svg'
export const LOGO_ALT = 'YAP – Yet Another Podcast logo'

/** Returns an img tag that falls back to the local SVG if the primary source fails. */
export function logoImg(cssClass, width, height) {
  return `<img class="${cssClass}" src="${LOGO_URL}" alt="${LOGO_ALT}" width="${width}" height="${height}" onerror="this.onerror=null;this.src='${LOGO_FALLBACK_URL}'" />`
}
export const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    url: CHANNEL_URL,
    label: 'Watch on YouTube',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/therealyap',
    label: 'Follow on Instagram',
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/therealyap',
    label: 'Follow on X',
  },
]

export function createNavHTML() {
  return `
    <nav id="navbar">
      <a class="nav-brand" href="/">
        ${logoImg('nav-logo', 72, 40)}
        <span class="nav-brand-name">YAP</span>
      </a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#episodes">Episodes</a></li>
        <li><a href="#connect">Connect</a></li>
        <li>
          <a class="nav-cta" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer">
            Watch Now
          </a>
        </li>
      </ul>
    </nav>
  `
}

export function createHeroHTML() {
  return `
    <section id="hero">
      <div class="hero-content">
        ${logoImg('hero-logo', 420, 237)}
        <span class="hero-badge">🎙️ New Episodes Every Week</span>
        <h1 class="hero-title">Yet Another<br/><span class="accent">Podcast</span></h1>
        <p class="hero-subtitle">
          Real talk, real people, real stories. Dive into conversations that
          matter — from culture and creativity to tech and beyond.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer">
            🎬 Watch on YouTube
          </a>
          <a class="btn btn-secondary" href="#episodes">
            Browse Episodes
          </a>
        </div>
      </div>
    </section>
  `
}

export function createAboutHTML() {
  return `
    <section id="about">
      <div class="section-container">
        <h2 class="section-title">About the Show</h2>
        <p class="section-subtitle">
          YAP is a YouTube podcast that brings unfiltered, authentic conversations
          to your screen. No scripts, no filters — just honest dialogue between
          real people with real experiences.
        </p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎙️</div>
            <h3>Authentic Conversations</h3>
            <p>Unscripted discussions that go deep on topics that actually matter to you.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌍</div>
            <h3>Diverse Voices</h3>
            <p>Guests from all walks of life sharing their unique perspectives and stories.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3>Weekly Episodes</h3>
            <p>Fresh content every week so you never run out of great conversations to enjoy.</p>
          </div>
        </div>
      </div>
    </section>
  `
}

export function createEpisodesHTML() {
  return `
    <section id="episodes">
      <div class="section-container">
        <h2 class="section-title">Latest Episodes</h2>
        <p class="section-subtitle">
          Check out our most recent episodes on YouTube.
        </p>
        <div class="episodes-cta">
          <a class="btn btn-primary" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer">
            🎬 Watch All Episodes on YouTube
          </a>
        </div>
      </div>
    </section>
  `
}

export function createConnectHTML() {
  return `
    <section id="connect">
      <div class="section-container">
        <h2 class="section-title">Connect With Us</h2>
        <p class="section-subtitle">
          Stay up to date and join the conversation across our social channels.
        </p>
        <ul class="social-list">
          ${SOCIAL_LINKS.map(
            (link) => `
            <li>
              <a class="social-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
                ${link.label}
              </a>
            </li>
          `
          ).join('')}
        </ul>
      </div>
    </section>
  `
}

export function createFooterHTML() {
  const year = new Date().getFullYear()
  return `
    <footer id="footer">
      <div class="footer-content">
        <span class="footer-brand">
          ${logoImg('footer-logo', 56, 32)}
          YAP – Yet Another Podcast
        </span>
        <span class="footer-copy">&copy; ${year} All rights reserved.</span>
      </div>
    </footer>
  `
}

export function renderApp(container) {
  container.innerHTML = `
    ${createNavHTML()}
    <main>
      ${createHeroHTML()}
      ${createAboutHTML()}
      ${createEpisodesHTML()}
      ${createConnectHTML()}
    </main>
    ${createFooterHTML()}
  `
}
