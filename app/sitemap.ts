import { MetadataRoute } from 'next'
import { POSITIONS_DATA } from '../lib/positionsData'
import { SOLUTIONS_DATA } from '../lib/solutionsData'
import { POSITION_ALIASES } from '../lib/positionAliases'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://desirespec-ai.onrender.com'
  const currentDate = new Date()

  // Static & Authority Editorial Guides
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides/the-anti-porn-intimacy-reset`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/healing-intimacy-blocks-and-body-freezing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/overcoming-performance-anxiety-and-pressure`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/compounding-intimacy-for-long-term-couples`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/pelvic-tilt-biomechanics`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  // Dynamic pSEO High-Volume Solution Pages
  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS_DATA.map((sol) => ({
    url: `${baseUrl}/solutions/${sol.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Dynamic pSEO Position Routes (Canonical + High-Volume Aliases)
  const positionRoutes: MetadataRoute.Sitemap = POSITIONS_DATA.map((pos) => ({
    url: `${baseUrl}/positions/${pos.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const aliasRoutes: MetadataRoute.Sitemap = Object.keys(POSITION_ALIASES).map((alias) => ({
    url: `${baseUrl}/positions/${alias}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...solutionRoutes, ...positionRoutes, ...aliasRoutes]
}
