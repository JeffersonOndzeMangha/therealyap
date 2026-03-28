import { describe, it, expect, beforeEach } from 'vitest'
import {
  CHANNEL_URL,
  SOCIAL_LINKS,
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
    expect(html).toContain('YAP')
  })

  it('includes a Watch Now CTA link to YouTube', () => {
    const html = createNavHTML()
    expect(html).toContain('youtube.com')
    expect(html).toContain('Watch Now')
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
})
