
// TypeScript interfaces
export interface FAQ {
    id: number
    question: string
    frequency: number
    lastAsked: string
    userTypes: string[]
    cities: string[]
    trending: boolean
    urgency: 'high' | 'medium' | 'low'
    city: string
    userType: string
    resolved: boolean
    product: string
    resolvedCount?: number
    unresolvedCount?: number
  }
  
  export interface TopicData {
    topic: string
    percentage: number
    count: number
    color: string
  }
  
  
  export interface ResolutionOption {
    label: string
    value: string
  }
  
  export interface AnswerData {
    faq: FAQ
    answer: string
    tags: string[]
    category: string
    relatedProducts: string[]
  }
  