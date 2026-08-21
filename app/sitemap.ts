import { MetadataRoute } from 'next'
import { POSITIONS_DATA } from '../lib/positionsData'
import { SOLUTIONS_DATA } from '../lib/solutionsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://desirespec-ai.onrender.com'
  const currentDate = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
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

  // Dynamic pSEO Position Routes
  const positionRoutes: MetadataRoute.Sitemap = POSITIONS_DATA.map((pos) => ({
    url: `${baseUrl}/positions/${pos.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...solutionRoutes, ...positionRoutes]
}
