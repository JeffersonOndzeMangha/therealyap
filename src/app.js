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
      <div class="hero-grid" aria-hidden="true"></div>
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

export const TEAM_MEMBERS = [
  {
    name: 'Jeffy',
    emoji: '🧔🏿',
    role: 'Host',
    bio: 'The voice that started it all. Jeffy brings bold energy and fearless takes to every conversation.',
  },
  {
    name: 'Serenity',
    emoji: '👩🏾‍🦱',
    role: 'Host',
    bio: 'Sharp wit meets genuine warmth. Serenity keeps it real and always asks the questions you\'re thinking.',
  },
  {
    name: 'Mike',
    emoji: '👨🏿‍🦲',
    role: 'Host',
    bio: 'The calm in the storm. Mike brings perspective and depth that turns good chats into great ones.',
  },
  {
    name: 'Cedric',
    emoji: '🧑🏿‍💻',
    role: 'Production',
    bio: 'The wizard behind the scenes. Cedric makes sure every frame and every cut hits just right.',
  },
  {
    name: 'OG Dara',
    emoji: '🧑🏿‍🎧',
    role: 'Production',
    bio: 'Sound, vision, vibes — OG Dara engineers the magic that brings the whole show together.',
  },
]

export function createAboutHTML() {
  return `
    <section id="about" class="cosmic-section">
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

        <h2 class="section-title team-section-title">Meet the Team</h2>
        <p class="section-subtitle">
          The crew behind the mic and behind the magic.
        </p>
        <div class="team-grid">
          ${TEAM_MEMBERS.map(
            (member) => `
            <div class="team-card" data-role="${member.role.toLowerCase()}">
              <div class="team-avatar">${member.emoji}</div>
              <h3 class="team-name">${member.name}</h3>
              <span class="team-role">${member.role}</span>
              <p class="team-bio">${member.bio}</p>
            </div>
          `
          ).join('')}
        </div>
      </div>
    </section>
  `
}

export function createEpisodesHTML() {
  return `
    <section id="episodes" class="cosmic-section">
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
    <section id="connect" class="cosmic-section">
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

export function createBackgroundHTML() {
  return `
    <canvas id="bg-canvas" aria-hidden="true"></canvas>
    <div class="bg-orbs" aria-hidden="true">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>
      <div class="bg-orb bg-orb-4"></div>
    </div>
  `
}

export function renderApp(container) {
  container.innerHTML = `
    ${createBackgroundHTML()}
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
