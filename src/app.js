export const CHANNEL_URL = 'https://www.youtube.com/@therealYAP.official'
/** Permanent Discord server invite link */
export const DISCORD_URL = 'https://discord.gg/cyVNXY2uV'

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
    url: 'https://www.instagram.com/therealyap.official',
    label: 'Follow on Instagram',
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/therealyap',
    label: 'Follow on X',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/cyVNXY2uV',
    label: 'Join us on Discord',
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
        <li><a href="#team">Team</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#episodes">Episodes</a></li>
        <li><a href="#connect">Connect</a></li>
        <li>
          <a class="nav-icon-link" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer" aria-label="Join us on Discord">
            <svg class="nav-icon" viewBox="0 0 20 19" width="22" height="22" aria-hidden="true"><use href="/icons.svg#discord-icon"/></svg>
          </a>
        </li>
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
    role: 'Host',
    bio: 'Sound, vision, vibes — OG Dara brings the energy and insight that keeps every conversation alive.',
  },
  {
    name: 'Ambid',
    emoji: '👨🏿',
    role: 'Production',
    bio: 'Ambid handles the craft behind the scenes, making sure every episode looks and sounds its best.',
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
        <div class="features-grid" role="list">
          <div class="feature-card" role="listitem">
            <div class="feature-icon">🎙️</div>
            <h3>Authentic Conversations</h3>
            <p>Unscripted discussions that go deep on topics that actually matter to you.</p>
          </div>
          <div class="feature-card" role="listitem">
            <div class="feature-icon">🌍</div>
            <h3>Diverse Voices</h3>
            <p>Guests from all walks of life sharing their unique perspectives and stories.</p>
          </div>
          <div class="feature-card" role="listitem">
            <div class="feature-icon">📅</div>
            <h3>Weekly Episodes</h3>
            <p>Fresh content every week so you never run out of great conversations to enjoy.</p>
          </div>
        </div>
      </div>
    </section>
  `
}

export function createTeamHTML() {
  return `
    <section id="team" class="cosmic-section">
      <div class="section-container">
        <h2 class="section-title">Meet the Team</h2>
        <p class="section-subtitle">
          The crew behind the mic and behind the magic.
        </p>
        <div class="team-grid" role="list">
          ${TEAM_MEMBERS.map(
            (member) => `
            <div class="team-card" role="listitem" data-role="${member.role.toLowerCase()}">
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

export const FAQ_ITEMS = [
  {
    question: 'What is YAP?',
    answer:
      'YAP – Yet Another Podcast – is an unscripted YouTube show where Jeffy, OG Dara, and Mike dive into real conversations about culture, creativity, tech, and everyday life. No filters, no teleprompters.',
  },
  {
    question: 'How often do you release new episodes?',
    answer:
      'New episodes drop every week. Subscribe on YouTube and turn on notifications so you never miss a drop.',
  },
  {
    question: 'Where can I watch or listen?',
    answer:
      'Every episode is on our YouTube channel. You can also connect with the community on Discord, Instagram, and X (Twitter).',
  },
  {
    question: 'Can I suggest a topic or guest?',
    answer:
      'Absolutely! Jump into our Discord server and head to the suggestions channel — the hosts read every message.',
  },
  {
    question: 'Is YAP suitable for all audiences?',
    answer:
      'YAP features candid, unfiltered conversations that may include mature themes and strong language. Best enjoyed by audiences 16+.',
  },
]

export function createFaqHTML() {
  return `
    <section id="faq" class="cosmic-section">
      <div class="section-container">
        <h2 class="section-title">What to Expect</h2>
        <p class="section-subtitle">
          New here? Here are answers to the questions first-time listeners ask most.
        </p>
        <dl class="faq-list">
          ${FAQ_ITEMS.map(
            (item) => `
            <div class="faq-item">
              <dt class="faq-question">${item.question}</dt>
              <dd class="faq-answer">${item.answer}</dd>
            </div>
          `
          ).join('')}
        </dl>
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
                ${link.name === 'Discord' ? '<svg class="social-icon" viewBox="0 0 20 19" width="20" height="20" aria-hidden="true"><use href="/icons.svg#discord-icon"/></svg>' : ''}
                ${link.label}
              </a>
            </li>
          `
          ).join('')}
        </ul>
        <div class="discord-cta">
          <a class="discord-cta-link" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">
            <svg class="discord-cta-icon" viewBox="0 0 20 19" width="48" height="48" aria-hidden="true"><use href="/icons.svg#discord-icon"/></svg>
            <span class="discord-cta-title">Join us on Discord</span>
            <span class="discord-cta-desc">Chat with the community &amp; stay in the loop</span>
          </a>
        </div>
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
      ${createTeamHTML()}
      ${createFaqHTML()}
      ${createEpisodesHTML()}
      ${createConnectHTML()}
    </main>
    ${createFooterHTML()}
  `
}
