import { themeConfig } from '@/config'
import { OGImageRoute } from 'astro-og-canvas'
import { getCollection, type CollectionEntry } from 'astro:content'

export const prerender = true

const collectionEntries = await getCollection('posts')

function hex2rgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b]
}

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', pubDate: Date } }]
// to { 'post.md': { title: 'Example', pubDate: Date } }
const pages = Object.fromEntries(
  collectionEntries.map((entry: CollectionEntry<'posts'>) => [
    entry.id.replace(/\.(md|mdx)$/, ''),
    entry.data
  ])
)

// OpenGraph for the index page
// Adding a default page at the root path
pages.index = {
  title: themeConfig.site.title,
  description: themeConfig.site.description,
  pubDate: new Date()
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path: string, page: CollectionEntry<'posts'>['data']) => ({
    cacheDir: false,
    quality: 100,
    title: page.title,
    description: page.description,
    logo: {
      path: 'public/og/og-logo.png',
      size: [80]
    },
    bgGradient: [[255, 255, 255]],
    bgImage: {
      path: page.image
        ? `./src/content/posts/${page.image}`
        : './src/assets/Edwin_Andrade.unsplash.jpg',
      fit: 'cover'
    },
    padding: 64,
    font: {
      title: {
        color: hex2rgb(page.titleColor || '#ffffff'),
        size: 72,
        families: ['Gabriela']
      },
      description: {
        color: hex2rgb(page.descriptionColor || '#ffffcc'),
        size: 24,
        families: ['Montserrat']
      }
    },
    fonts: [
      // Gabriela Weights 400
      'fonts/gabriela_5.2.8/ttf/gabriela-latin-400-normal.ttf',
      // Montserrat Weights 100-900
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-100-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-200-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-300-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-400-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-500-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-600-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-700-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-800-italic.ttf',
      'fonts/montserrat_5.2.8/ttf/montserrat-latin-900-italic.ttf'
    ]
  })
})
