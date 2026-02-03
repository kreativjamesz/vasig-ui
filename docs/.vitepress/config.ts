import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vasig UI',
  description: 'A clean, modern UI kit for Vue 3 + TypeScript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
      { text: 'GitHub', link: 'https://github.com' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Modal', link: '/components/modal' }
        ]
      }
    ]
  }
})
