import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VeloxRouter',
  description: 'Official documentation for the VeloxRouter ecosystem',
  base: '/docs/',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Packages', link: '/packages/router' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ],
      '/packages/': [
        {
          text: 'Ecosystem Packages',
          items: [
            { text: 'Router Core', link: '/packages/router' },
            { text: 'SSE Streaming', link: '/packages/sse' },
            { text: 'Middlewares', link: '/packages/middlewares' },
            { text: 'Validator', link: '/packages/validator' },
            { text: 'JSON-RPC', link: '/packages/rpc' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/VeloxRouter' }
    ]
  }
})
