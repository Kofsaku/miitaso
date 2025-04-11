export type ServiceType = "product" | "mvp" | "consulting" | "design"

export type CaseStudy = {
  id: number
  title: string
  description: string
  content: string
  image: string
  category: string
  serviceType: ServiceType
  date: string
} 