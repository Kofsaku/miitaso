import { MetadataRoute } from 'next'

/**
 * サイトマップ。実在する公開ルートのみを列挙する
 * （存在しないルートを載せると404をクローラーに宣伝することになる）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://miitaso.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://miitaso.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/services/ai',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/services/development',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/services/new-business',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/minecraft-english',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://miitaso.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
