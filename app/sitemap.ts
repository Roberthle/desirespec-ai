import { MetadataRoute } from 'next'
import { POSITIONS_DATA } from '../lib/positionsData'

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
    {
      url: `${baseUrl}/guides/arousal-cadence-bpm-synchronization`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  // Dynamic pSEO position routes
  const positionRoutes: MetadataRoute.Sitemap = POSITIONS_DATA.map((pos) => ({
    url: `${baseUrl}/positions/${pos.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...positionRoutes]
}
