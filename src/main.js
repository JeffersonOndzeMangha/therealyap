import './style.css'
import { renderApp } from './app.js'
import { initBackground } from './bg.js'

renderApp(document.querySelector('#app'))
initBackground()

// Cosmic section reveal on scroll via IntersectionObserver
function initSectionReveal() {
  const sections = document.querySelectorAll('.cosmic-section')
  if (!sections.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  sections.forEach((section) => observer.observe(section))
}

initSectionReveal()
