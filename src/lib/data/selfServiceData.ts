// src/data/selfServiceData.ts

export interface SelfServiceData {
  date: string
  city: string  // Changed from region
  userType: string
  product: string
  storeId: string  // Added
  resolvedSessions: number
  notResolvedSessions: number
  abandonedSessions: number
  totalConversations: number
}

// Generate realistic self-service data with city and storeId dimensions (condensed)
export const selfServiceData: SelfServiceData[] = [
  // New York Customer - Hennypenny Fryer 1 (4 data points)
  { date: "2025-06-01", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 85, notResolvedSessions: 18, abandonedSessions: 9, totalConversations: 112 },
  { date: "2025-06-04", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 94, notResolvedSessions: 22, abandonedSessions: 12, totalConversations: 128 },
  { date: "2025-06-07", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 91, notResolvedSessions: 21, abandonedSessions: 11, totalConversations: 123 },
  { date: "2025-06-10", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 99, notResolvedSessions: 25, abandonedSessions: 14, totalConversations: 138 },

  // New York Customer - Hennypenny Fryer 2
  { date: "2025-06-01", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 60, notResolvedSessions: 10, abandonedSessions: 6, totalConversations: 76 },
  { date: "2025-06-04", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 67, notResolvedSessions: 13, abandonedSessions: 8, totalConversations: 88 },
  { date: "2025-06-07", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 63, notResolvedSessions: 12, abandonedSessions: 7, totalConversations: 82 },
  { date: "2025-06-10", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 71, notResolvedSessions: 15, abandonedSessions: 9, totalConversations: 95 },

  // New York Customer - Commercial Oven
  { date: "2025-06-01", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 45, notResolvedSessions: 8, abandonedSessions: 4, totalConversations: 57 },
  { date: "2025-06-04", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 51, notResolvedSessions: 10, abandonedSessions: 6, totalConversations: 67 },
  { date: "2025-06-07", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 46, notResolvedSessions: 8, abandonedSessions: 4, totalConversations: 58 },
  { date: "2025-06-10", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 55, notResolvedSessions: 12, abandonedSessions: 7, totalConversations: 74 },

  // New York Operative - Hennypenny Fryer 1 (Higher resolution rates)
  { date: "2025-06-01", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 52, notResolvedSessions: 7, abandonedSessions: 4, totalConversations: 63 },
  { date: "2025-06-04", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 58, notResolvedSessions: 9, abandonedSessions: 6, totalConversations: 73 },
  { date: "2025-06-07", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 53, notResolvedSessions: 7, abandonedSessions: 4, totalConversations: 64 },
  { date: "2025-06-10", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 61, notResolvedSessions: 10, abandonedSessions: 7, totalConversations: 78 },

  // London Customer - Hennypenny Fryer 1
  { date: "2025-06-01", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 68, notResolvedSessions: 20, abandonedSessions: 12, totalConversations: 100 },
  { date: "2025-06-04", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 79, notResolvedSessions: 24, abandonedSessions: 15, totalConversations: 118 },
  { date: "2025-06-07", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 72, notResolvedSessions: 20, abandonedSessions: 12, totalConversations: 104 },
  { date: "2025-06-10", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 84, notResolvedSessions: 27, abandonedSessions: 17, totalConversations: 128 },

  // London Customer - Commercial Oven
  { date: "2025-06-01", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 38, notResolvedSessions: 12, abandonedSessions: 7, totalConversations: 57 },
  { date: "2025-06-04", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 44, notResolvedSessions: 15, abandonedSessions: 9, totalConversations: 68 },
  { date: "2025-06-07", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 37, notResolvedSessions: 11, abandonedSessions: 6, totalConversations: 54 },
  { date: "2025-06-10", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 48, notResolvedSessions: 17, abandonedSessions: 11, totalConversations: 76 },

  // London Operative - Hennypenny Fryer 1
  { date: "2025-06-01", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 43, notResolvedSessions: 10, abandonedSessions: 6, totalConversations: 59 },
  { date: "2025-06-04", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 51, notResolvedSessions: 13, abandonedSessions: 9, totalConversations: 73 },
  { date: "2025-06-07", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 44, notResolvedSessions: 9, abandonedSessions: 6, totalConversations: 59 },
  { date: "2025-06-10", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 54, notResolvedSessions: 15, abandonedSessions: 10, totalConversations: 79 },

  // Mumbai Customer - Hennypenny Fryer 1 (NEW DATA)
  { date: "2025-06-01", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 75, notResolvedSessions: 16, abandonedSessions: 9, totalConversations: 100 },
  { date: "2025-06-04", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 82, notResolvedSessions: 18, abandonedSessions: 10, totalConversations: 110 },
  { date: "2025-06-07", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 78, notResolvedSessions: 17, abandonedSessions: 8, totalConversations: 103 },
  { date: "2025-06-10", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 85, notResolvedSessions: 19, abandonedSessions: 11, totalConversations: 115 },

  // Mumbai Customer - Commercial Oven
  { date: "2025-06-01", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 42, notResolvedSessions: 10, abandonedSessions: 5, totalConversations: 57 },
  { date: "2025-06-04", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 48, notResolvedSessions: 12, abandonedSessions: 7, totalConversations: 67 },
  { date: "2025-06-07", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 45, notResolvedSessions: 11, abandonedSessions: 6, totalConversations: 62 },
  { date: "2025-06-10", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 52, notResolvedSessions: 14, abandonedSessions: 8, totalConversations: 74 },

  // Mumbai Operative - Hennypenny Fryer 1
  { date: "2025-06-01", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 58, notResolvedSessions: 8, abandonedSessions: 4, totalConversations: 70 },
  { date: "2025-06-04", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 62, notResolvedSessions: 10, abandonedSessions: 6, totalConversations: 78 },
  { date: "2025-06-07", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 55, notResolvedSessions: 9, abandonedSessions: 5, totalConversations: 69 },
  { date: "2025-06-10", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 65, notResolvedSessions: 12, abandonedSessions: 7, totalConversations: 84 },
]

// Helper function to calculate SSR (Self Service Resolution Rate)
export const calculateSSR = (resolvedSessions: number, notResolvedSessions: number, abandonedSessions: number): number => {
 const total = resolvedSessions + notResolvedSessions + abandonedSessions
 return total > 0 ? (resolvedSessions / total) * 100 : 0
}

// Helper function to calculate other rates
export const calculateAbandonRate = (abandonedSessions: number, resolvedSessions: number, notResolvedSessions: number): number => {
 const total = resolvedSessions + notResolvedSessions + abandonedSessions
 return total > 0 ? (abandonedSessions / total) * 100 : 0
}

export const calculateNotResolvedRate = (notResolvedSessions: number, resolvedSessions: number, abandonedSessions: number): number => {
 const total = resolvedSessions + notResolvedSessions + abandonedSessions
 return total > 0 ? (notResolvedSessions / total) * 100 : 0
}