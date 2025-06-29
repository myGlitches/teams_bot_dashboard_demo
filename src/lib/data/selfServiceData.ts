// src/data/selfServiceData.ts

export interface SelfServiceData {
  date: string
  city: string
  userType: string
  product: string
  storeId: string
  resolvedSessions: number
  notResolvedSessions: number
  abandonedSessions: number
  totalConversations: number
}

// Extended self-service data covering the same date range as other datasets (2025-06-16 to 2025-06-27)
export const selfServiceData: SelfServiceData[] = [
  // Original data (2025-06-01 to 2025-06-10)
  { date: "2025-06-01", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 85, notResolvedSessions: 18, abandonedSessions: 9, totalConversations: 112 },
  { date: "2025-06-04", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 94, notResolvedSessions: 22, abandonedSessions: 12, totalConversations: 128 },
  { date: "2025-06-07", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 91, notResolvedSessions: 21, abandonedSessions: 11, totalConversations: 123 },
  { date: "2025-06-10", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 99, notResolvedSessions: 25, abandonedSessions: 14, totalConversations: 138 },

  // Extended data for recent dates (2025-06-16 to 2025-06-27) matching other datasets
  
  // New York Customer - Hennypenny Fryer 1
  { date: "2025-06-16", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 102, notResolvedSessions: 28, abandonedSessions: 15, totalConversations: 145 },
  { date: "2025-06-17", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 97, notResolvedSessions: 26, abandonedSessions: 15, totalConversations: 138 },
  { date: "2025-06-18", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 88, notResolvedSessions: 24, abandonedSessions: 13, totalConversations: 125 },
  { date: "2025-06-19", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 77, notResolvedSessions: 22, abandonedSessions: 11, totalConversations: 110 },
  { date: "2025-06-20", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 69, notResolvedSessions: 20, abandonedSessions: 9, totalConversations: 98 },
  { date: "2025-06-21", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 74, notResolvedSessions: 21, abandonedSessions: 10, totalConversations: 105 },
  { date: "2025-06-22", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 84, notResolvedSessions: 24, abandonedSessions: 12, totalConversations: 120 },
  { date: "2025-06-23", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 95, notResolvedSessions: 27, abandonedSessions: 13, totalConversations: 135 },
  { date: "2025-06-24", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 100, notResolvedSessions: 28, abandonedSessions: 14, totalConversations: 142 },
  { date: "2025-06-25", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 104, notResolvedSessions: 30, abandonedSessions: 14, totalConversations: 148 },
  { date: "2025-06-26", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 109, notResolvedSessions: 31, abandonedSessions: 15, totalConversations: 155 },
  { date: "2025-06-27", city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001", resolvedSessions: 112, notResolvedSessions: 32, abandonedSessions: 16, totalConversations: 160 },

  // New York Customer - Hennypenny Fryer 2
  { date: "2025-06-16", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 60, notResolvedSessions: 17, abandonedSessions: 8, totalConversations: 85 },
  { date: "2025-06-17", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 62, notResolvedSessions: 18, abandonedSessions: 8, totalConversations: 88 },
  { date: "2025-06-18", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 58, notResolvedSessions: 16, abandonedSessions: 8, totalConversations: 82 },
  { date: "2025-06-19", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 55, notResolvedSessions: 16, abandonedSessions: 8, totalConversations: 79 },
  { date: "2025-06-20", city: "New York", userType: "customer", product: "Hennypenny Fryer 2", storeId: "NYC001", resolvedSessions: 53, notResolvedSessions: 15, abandonedSessions: 7, totalConversations: 75 },

  // New York Customer - Commercial Oven
  { date: "2025-06-16", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 32, notResolvedSessions: 9, abandonedSessions: 4, totalConversations: 45 },
  { date: "2025-06-17", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 34, notResolvedSessions: 10, abandonedSessions: 4, totalConversations: 48 },
  { date: "2025-06-18", city: "New York", userType: "customer", product: "Commercial Oven", storeId: "NYC001", resolvedSessions: 30, notResolvedSessions: 8, abandonedSessions: 4, totalConversations: 42 },

  // New York Operative - Hennypenny Fryer 1 (Higher resolution rates)
  { date: "2025-06-16", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 72, notResolvedSessions: 9, abandonedSessions: 4, totalConversations: 85 },
  { date: "2025-06-17", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 78, notResolvedSessions: 10, abandonedSessions: 4, totalConversations: 92 },
  { date: "2025-06-18", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 83, notResolvedSessions: 11, abandonedSessions: 4, totalConversations: 98 },
  { date: "2025-06-19", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 89, notResolvedSessions: 12, abandonedSessions: 4, totalConversations: 105 },
  { date: "2025-06-20", city: "New York", userType: "operative", product: "Hennypenny Fryer 1", storeId: "NYC002", resolvedSessions: 100, notResolvedSessions: 13, abandonedSessions: 5, totalConversations: 118 },

  // London Customer - Hennypenny Fryer 1
  { date: "2025-06-16", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 53, notResolvedSessions: 15, abandonedSessions: 7, totalConversations: 75 },
  { date: "2025-06-17", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 55, notResolvedSessions: 16, abandonedSessions: 7, totalConversations: 78 },
  { date: "2025-06-18", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 58, notResolvedSessions: 16, abandonedSessions: 8, totalConversations: 82 },
  { date: "2025-06-19", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 67, notResolvedSessions: 19, abandonedSessions: 9, totalConversations: 95 },
  { date: "2025-06-20", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 76, notResolvedSessions: 22, abandonedSessions: 10, totalConversations: 108 },
  { date: "2025-06-21", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 88, notResolvedSessions: 25, abandonedSessions: 12, totalConversations: 125 },
  { date: "2025-06-22", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 98, notResolvedSessions: 28, abandonedSessions: 14, totalConversations: 140 },
  { date: "2025-06-23", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 111, notResolvedSessions: 32, abandonedSessions: 15, totalConversations: 158 },
  { date: "2025-06-24", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 116, notResolvedSessions: 33, abandonedSessions: 16, totalConversations: 165 },
  { date: "2025-06-25", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 121, notResolvedSessions: 34, abandonedSessions: 17, totalConversations: 172 },
  { date: "2025-06-26", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 126, notResolvedSessions: 36, abandonedSessions: 18, totalConversations: 180 },
  { date: "2025-06-27", city: "London", userType: "customer", product: "Hennypenny Fryer 1", storeId: "LON001", resolvedSessions: 132, notResolvedSessions: 38, abandonedSessions: 18, totalConversations: 188 },

  // London Customer - Commercial Oven
  { date: "2025-06-16", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 39, notResolvedSessions: 11, abandonedSessions: 5, totalConversations: 55 },
  { date: "2025-06-17", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 41, notResolvedSessions: 12, abandonedSessions: 5, totalConversations: 58 },
  { date: "2025-06-18", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 44, notResolvedSessions: 12, abandonedSessions: 6, totalConversations: 62 },
  { date: "2025-06-19", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 48, notResolvedSessions: 14, abandonedSessions: 6, totalConversations: 68 },
  { date: "2025-06-20", city: "London", userType: "customer", product: "Commercial Oven", storeId: "LON001", resolvedSessions: 53, notResolvedSessions: 15, abandonedSessions: 7, totalConversations: 75 },

  // London Operative - Hennypenny Fryer 1
  { date: "2025-06-16", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 65, notResolvedSessions: 12, abandonedSessions: 5, totalConversations: 82 },
  { date: "2025-06-17", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 68, notResolvedSessions: 13, abandonedSessions: 6, totalConversations: 87 },
  { date: "2025-06-18", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 73, notResolvedSessions: 14, abandonedSessions: 6, totalConversations: 93 },
  { date: "2025-06-19", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 78, notResolvedSessions: 15, abandonedSessions: 7, totalConversations: 100 },
  { date: "2025-06-20", city: "London", userType: "operative", product: "Hennypenny Fryer 1", storeId: "LON002", resolvedSessions: 83, notResolvedSessions: 16, abandonedSessions: 7, totalConversations: 106 },

  // Mumbai Customer - Hennypenny Fryer 1
  { date: "2025-06-16", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 74, notResolvedSessions: 21, abandonedSessions: 10, totalConversations: 105 },
  { date: "2025-06-17", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 76, notResolvedSessions: 22, abandonedSessions: 10, totalConversations: 108 },
  { date: "2025-06-18", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 79, notResolvedSessions: 22, abandonedSessions: 11, totalConversations: 112 },
  { date: "2025-06-19", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 81, notResolvedSessions: 23, abandonedSessions: 11, totalConversations: 115 },
  { date: "2025-06-20", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 83, notResolvedSessions: 24, abandonedSessions: 11, totalConversations: 118 },
  { date: "2025-06-21", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 86, notResolvedSessions: 24, abandonedSessions: 12, totalConversations: 122 },
  { date: "2025-06-22", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 88, notResolvedSessions: 25, abandonedSessions: 12, totalConversations: 125 },
  { date: "2025-06-23", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 90, notResolvedSessions: 26, abandonedSessions: 12, totalConversations: 128 },
  { date: "2025-06-24", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 93, notResolvedSessions: 26, abandonedSessions: 13, totalConversations: 132 },
  { date: "2025-06-25", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 95, notResolvedSessions: 27, abandonedSessions: 13, totalConversations: 135 },
  { date: "2025-06-26", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 97, notResolvedSessions: 28, abandonedSessions: 13, totalConversations: 138 },
  { date: "2025-06-27", city: "Mumbai", userType: "customer", product: "Hennypenny Fryer 1", storeId: "MUM001", resolvedSessions: 98, notResolvedSessions: 28, abandonedSessions: 14, totalConversations: 140 },

  // Mumbai Customer - Commercial Oven
  { date: "2025-06-16", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 60, notResolvedSessions: 17, abandonedSessions: 8, totalConversations: 85 },
  { date: "2025-06-17", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 62, notResolvedSessions: 18, abandonedSessions: 8, totalConversations: 88 },
  { date: "2025-06-18", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 65, notResolvedSessions: 18, abandonedSessions: 9, totalConversations: 92 },
  { date: "2025-06-19", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 67, notResolvedSessions: 19, abandonedSessions: 9, totalConversations: 95 },
  { date: "2025-06-20", city: "Mumbai", userType: "customer", product: "Commercial Oven", storeId: "MUM001", resolvedSessions: 69, notResolvedSessions: 20, abandonedSessions: 9, totalConversations: 98 },

  // Mumbai Operative - Hennypenny Fryer 1 (Higher resolution rates)
  { date: "2025-06-16", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 140, notResolvedSessions: 18, abandonedSessions: 7, totalConversations: 165 },
  { date: "2025-06-17", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 132, notResolvedSessions: 16, abandonedSessions: 7, totalConversations: 155 },
  { date: "2025-06-18", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 124, notResolvedSessions: 15, abandonedSessions: 6, totalConversations: 145 },
  { date: "2025-06-19", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 115, notResolvedSessions: 14, abandonedSessions: 6, totalConversations: 135 },
  { date: "2025-06-20", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 107, notResolvedSessions: 13, abandonedSessions: 5, totalConversations: 125 },
  { date: "2025-06-21", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 98, notResolvedSessions: 12, abandonedSessions: 5, totalConversations: 115 },
  { date: "2025-06-22", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 90, notResolvedSessions: 11, abandonedSessions: 4, totalConversations: 105 },
  { date: "2025-06-23", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 81, notResolvedSessions: 10, abandonedSessions: 4, totalConversations: 95 },
  { date: "2025-06-24", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 75, notResolvedSessions: 9, abandonedSessions: 4, totalConversations: 88 },
  { date: "2025-06-25", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 70, notResolvedSessions: 8, abandonedSessions: 4, totalConversations: 82 },
  { date: "2025-06-26", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 67, notResolvedSessions: 8, abandonedSessions: 3, totalConversations: 78 },
  { date: "2025-06-27", city: "Mumbai", userType: "operative", product: "Hennypenny Fryer 1", storeId: "MUM002", resolvedSessions: 64, notResolvedSessions: 8, abandonedSessions: 3, totalConversations: 75 },
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