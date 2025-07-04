import { MetadataRoute } from 'next'

async function getBlogPosts() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blog/posts?limit=1000`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  
  const blogUrls = posts.map((post: any) => ({
    url: `https://miitaso.com/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://miitaso.com',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://miitaso.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/services',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://miitaso.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://miitaso.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://miitaso.com/tools',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://miitaso.com/resources',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://miitaso.com/case-studies',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://miitaso.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://miitaso.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...blogUrls,
  ]
}