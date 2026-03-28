import { describe, it, expect, beforeEach } from 'vitest'
import {
  CHANNEL_URL,
  LOGO_URL,
  LOGO_FALLBACK_URL,
  LOGO_ALT,
  logoImg,
  SOCIAL_LINKS,
  TEAM_MEMBERS,
  createNavHTML,
  createHeroHTML,
  createAboutHTML,
  createEpisodesHTML,
  createConnectHTML,
  createFooterHTML,
  renderApp,
} from '../app.js'

describe('CHANNEL_URL', () => {
  it('points to the YAP YouTube channel', () => {
    expect(CHANNEL_URL).toContain('youtube.com')
    expect(CHANNEL_URL).toContain('therealyap')
  })
})

describe('LOGO_URL / LOGO_FALLBACK_URL / LOGO_ALT', () => {
  it('LOGO_URL is a non-empty string', () => {
    expect(typeof LOGO_URL).toBe('string')
    expect(LOGO_URL.length).toBeGreaterThan(0)
  })

  it('LOGO_FALLBACK_URL points to the local SVG', () => {
    expect(typeof LOGO_FALLBACK_URL).toBe('string')
    expect(LOGO_FALLBACK_URL).toContain('.svg')
  })

  it('LOGO_ALT describes the logo', () => {
    expect(typeof LOGO_ALT).toBe('string')
    expect(LOGO_ALT.length).toBeGreaterThan(0)
    expect(LOGO_ALT.toLowerCase()).toContain('logo')
  })
})

describe('logoImg', () => {
  it('returns an img tag with src, alt, onerror and class', () => {
    const html = logoImg('test-logo', 100, 50)
    expect(html).toContain(`src="${LOGO_URL}"`)
    expect(html).toContain(`alt="${LOGO_ALT}"`)
    expect(html).toContain('onerror=')
    expect(html).toContain(LOGO_FALLBACK_URL)
    expect(html).toContain('class="test-logo"')
    expect(html).toContain('width="100"')
    expect(html).toContain('height="50"')
  })
})

describe('SOCIAL_LINKS', () => {
  it('contains at least one social link', () => {
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0)
  })

  it('every link has name, url and label', () => {
    for (const link of SOCIAL_LINKS) {
      expect(link).toHaveProperty('name')
      expect(link).toHaveProperty('url')
      expect(link).toHaveProperty('label')
      expect(link.url).toMatch(/^https?:\/\//)
    }
  })
})

describe('createNavHTML', () => {
  it('returns a string containing the nav element', () => {
    const html = createNavHTML()
    expect(typeof html).toBe('string')
    expect(html).toContain('<nav')
    expect(html).not.toContain('nav-brand-name')
    expect(html).not.toContain('>YAP<')
  })

  it('includes a Watch Now CTA link to YouTube', () => {
    const html = createNavHTML()
    expect(html).toContain('youtube.com')
    expect(html).toContain('Watch Now')
  })

  it('renders the logo image in the navbar', () => {
    const html = createNavHTML()
    expect(html).toContain(LOGO_URL)
    expect(html).toContain(LOGO_ALT)
    expect(html).toContain('nav-logo')
  })
})

describe('createHeroHTML', () => {
  it('contains the hero section', () => {
    const html = createHeroHTML()
    expect(html).toContain('id="hero"')
  })

  it('includes main call-to-action linking to YouTube', () => {
    const html = createHeroHTML()
    expect(html).toContain('youtube.com')
    expect(html).toContain('YouTube')
  })

  it('mentions the podcast name', () => {
    const html = createHeroHTML()
    expect(html.toLowerCase()).toContain('podcast')
  })

  it('renders the logo image in the hero', () => {
    const html = createHeroHTML()
    expect(html).toContain(LOGO_URL)
    expect(html).toContain(LOGO_ALT)
    expect(html).toContain('hero-logo')
  })
})

describe('TEAM_MEMBERS', () => {
  it('contains five team members', () => {
    expect(TEAM_MEMBERS).toHaveLength(5)
  })

  it('every member has name, emoji, role and bio', () => {
    for (const m of TEAM_MEMBERS) {
      expect(m).toHaveProperty('name')
      expect(m).toHaveProperty('emoji')
      expect(m).toHaveProperty('role')
      expect(m).toHaveProperty('bio')
    }
  })

  it('includes three hosts and two production members', () => {
    const hosts = TEAM_MEMBERS.filter((m) => m.role === 'Host')
    const prod = TEAM_MEMBERS.filter((m) => m.role === 'Production')
    expect(hosts).toHaveLength(3)
    expect(prod).toHaveLength(2)
  })
})

describe('createAboutHTML', () => {
  it('contains the about section', () => {
    const html = createAboutHTML()
    expect(html).toContain('id="about"')
  })

  it('contains feature cards', () => {
    const html = createAboutHTML()
    expect(html).toContain('feature-card')
  })

  it('renders all team members by name', () => {
    const html = createAboutHTML()
    for (const m of TEAM_MEMBERS) {
      expect(html).toContain(m.name)
    }
  })

  it('includes the Meet the Team heading', () => {
    const html = createAboutHTML()
    expect(html).toContain('Meet the Team')
  })

  it('renders team cards with roles', () => {
    const html = createAboutHTML()
    expect(html).toContain('team-card')
    expect(html).toContain('team-role')
  })
})

describe('createEpisodesHTML', () => {
  it('contains the episodes section', () => {
    const html = createEpisodesHTML()
    expect(html).toContain('id="episodes"')
  })

  it('links to the YouTube channel', () => {
    const html = createEpisodesHTML()
    expect(html).toContain(CHANNEL_URL)
  })
})

describe('createConnectHTML', () => {
  it('contains the connect section', () => {
    const html = createConnectHTML()
    expect(html).toContain('id="connect"')
  })

  it('renders all social links', () => {
    const html = createConnectHTML()
    for (const link of SOCIAL_LINKS) {
      expect(html).toContain(link.url)
      expect(html).toContain(link.label)
    }
  })
})

describe('createFooterHTML', () => {
  it('contains the footer element', () => {
    const html = createFooterHTML()
    expect(html).toContain('<footer')
  })

  it('includes the current year', () => {
    const html = createFooterHTML()
    const year = new Date().getFullYear().toString()
    expect(html).toContain(year)
  })

  it('mentions YAP', () => {
    const html = createFooterHTML()
    expect(html).toContain('YAP')
  })

  it('renders the logo image in the footer', () => {
    const html = createFooterHTML()
    expect(html).toContain(LOGO_URL)
    expect(html).toContain(LOGO_ALT)
    expect(html).toContain('footer-logo')
  })
})

describe('renderApp', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
  })

  it('populates the container with HTML', () => {
    renderApp(container)
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })

  it('renders all major sections', () => {
    renderApp(container)
    expect(container.querySelector('#navbar')).not.toBeNull()
    expect(container.querySelector('#hero')).not.toBeNull()
    expect(container.querySelector('#about')).not.toBeNull()
    expect(container.querySelector('#episodes')).not.toBeNull()
    expect(container.querySelector('#connect')).not.toBeNull()
    expect(container.querySelector('#footer')).not.toBeNull()
  })

  it('renders logo images in navbar, hero and footer', () => {
    renderApp(container)
    const logos = container.querySelectorAll(`img[src="${LOGO_URL}"]`)
    expect(logos.length).toBeGreaterThanOrEqual(3)
    logos.forEach((img) => {
      expect(img.getAttribute('alt')).toBe(LOGO_ALT)
    })
  })
})
