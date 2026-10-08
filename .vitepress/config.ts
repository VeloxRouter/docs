import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VeloxRouter',
  description: 'Official documentation for VeloxRouter ecosystem',
  base: '/docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Packages', link: '/packages/middlewares' }
    ],
    sidebar: {
      '/packages/': [
        {
          text: 'Packages',
          items: [
            { text: 'Middlewares', link: '/packages/middlewares' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/VeloxRouter' }
    ]
  }
})
