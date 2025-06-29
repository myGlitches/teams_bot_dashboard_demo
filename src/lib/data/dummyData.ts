// data/dummyData.ts

// Enums for configurable values
export enum Cities {
  NewYork = 'New York',
  London = 'London',
  Mumbai = 'Mumbai'
}

export enum Products {
  HennypennyFryer1 = 'Hennypenny Fryer 1',
  HennypennyFryer2 = 'Hennypenny Fryer 2',
  CommercialOven = 'Commercial Oven'
}

export const STORE_IDS = {
  // Customer stores
  NewYorkCustomer: 'NYC001',
  LondonCustomer: 'LON001',
  MumbaiCustomer: 'MUM001',
  // Operative stores
  NewYorkOperative: 'NYC002',
  LondonOperative: 'LON002',
  MumbaiOperative: 'MUM002'
} as const;

export interface MetricData {
  date: string
  city: string
  userType: string
  product: string
  storeId: string
  totalSessions?: number
  uniqueUsers?: number
  totalConversations?: number
}

export const totalSessionsData: MetricData[] = [
  // New York customers - Hennypenny Fryer 1 - Strong start, decline mid-period
  { date: "2025-06-16", totalSessions: 145, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalSessions: 138, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalSessions: 125, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalSessions: 110, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalSessions: 98, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalSessions: 105, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalSessions: 120, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalSessions: 135, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalSessions: 142, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalSessions: 148, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalSessions: 155, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalSessions: 160, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },

  // New York customers - Hennypenny Fryer 2 - Lower but steady
  { date: "2025-06-16", totalSessions: 85, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalSessions: 88, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalSessions: 82, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalSessions: 79, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalSessions: 75, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalSessions: 78, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalSessions: 84, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalSessions: 89, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalSessions: 92, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalSessions: 95, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalSessions: 98, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalSessions: 102, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },

  // New York customers - Commercial Oven - Lowest volumes
  { date: "2025-06-16", totalSessions: 45, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalSessions: 48, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalSessions: 42, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalSessions: 39, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalSessions: 35, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalSessions: 38, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalSessions: 44, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalSessions: 49, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalSessions: 52, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalSessions: 55, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalSessions: 58, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalSessions: 62, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },

  // New York operatives - Hennypenny Fryer 1 - Steady growth
  { date: "2025-06-16", totalSessions: 85, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-17", totalSessions: 92, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-18", totalSessions: 98, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-19", totalSessions: 105, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-20", totalSessions: 118, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-21", totalSessions: 125, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-22", totalSessions: 132, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-23", totalSessions: 140, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-24", totalSessions: 145, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-25", totalSessions: 150, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-26", totalSessions: 142, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-27", totalSessions: 138, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },

  // London customers - Hennypenny Fryer 1 - Start low, surge later
  { date: "2025-06-16", totalSessions: 75, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-17", totalSessions: 78, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-18", totalSessions: 82, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-19", totalSessions: 95, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-20", totalSessions: 108, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-21", totalSessions: 125, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-22", totalSessions: 140, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-23", totalSessions: 158, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-24", totalSessions: 165, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-25", totalSessions: 172, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-26", totalSessions: 180, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-27", totalSessions: 188, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },

  // London customers - Commercial Oven - Different pattern
  { date: "2025-06-16", totalSessions: 55, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-17", totalSessions: 58, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-18", totalSessions: 62, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-19", totalSessions: 68, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-20", totalSessions: 75, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-21", totalSessions: 82, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-22", totalSessions: 89, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-23", totalSessions: 95, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-24", totalSessions: 102, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-25", totalSessions: 108, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-26", totalSessions: 115, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-27", totalSessions: 122, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },

  // Mumbai customers - Consistent middle performance
  { date: "2025-06-16", totalSessions: 105, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-17", totalSessions: 108, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-18", totalSessions: 112, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-19", totalSessions: 115, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-20", totalSessions: 118, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-21", totalSessions: 122, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-22", totalSessions: 125, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-23", totalSessions: 128, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-24", totalSessions: 132, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-25", totalSessions: 135, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-26", totalSessions: 138, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-27", totalSessions: 140, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },

  // Mumbai operatives - Start high, drop significantly
  { date: "2025-06-16", totalSessions: 165, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-17", totalSessions: 155, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-18", totalSessions: 145, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-19", totalSessions: 135, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-20", totalSessions: 125, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-21", totalSessions: 115, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-22", totalSessions: 105, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-23", totalSessions: 95, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-24", totalSessions: 88, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-25", totalSessions: 82, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-26", totalSessions: 78, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-27", totalSessions: 75, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
]

export const uniqueUsersData: MetricData[] = [
  // New York customers - Weekend peaks, weekday dips
  { date: "2025-06-16", uniqueUsers: 68, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", uniqueUsers: 72, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", uniqueUsers: 58, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", uniqueUsers: 52, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", uniqueUsers: 48, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", uniqueUsers: 65, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", uniqueUsers: 75, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", uniqueUsers: 78, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", uniqueUsers: 55, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", uniqueUsers: 50, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", uniqueUsers: 45, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", uniqueUsers: 62, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },

  // New York customers - Fryer 2 - Lower numbers
  { date: "2025-06-16", uniqueUsers: 35, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", uniqueUsers: 38, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", uniqueUsers: 32, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", uniqueUsers: 28, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", uniqueUsers: 25, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", uniqueUsers: 30, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", uniqueUsers: 36, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", uniqueUsers: 39, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", uniqueUsers: 33, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", uniqueUsers: 29, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", uniqueUsers: 26, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", uniqueUsers: 34, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },

  // London customers - Gradual growth
  { date: "2025-06-16", uniqueUsers: 35, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-17", uniqueUsers: 38, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-18", uniqueUsers: 42, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-19", uniqueUsers: 48, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-20", uniqueUsers: 55, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-21", uniqueUsers: 62, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-22", uniqueUsers: 58, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-23", uniqueUsers: 68, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-24", uniqueUsers: 72, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-25", uniqueUsers: 78, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-26", uniqueUsers: 82, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-27", uniqueUsers: 85, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },

  // London operatives - Business hours pattern
  { date: "2025-06-16", uniqueUsers: 42, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-17", uniqueUsers: 45, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-18", uniqueUsers: 65, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-19", uniqueUsers: 68, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-20", uniqueUsers: 72, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-21", uniqueUsers: 38, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-22", uniqueUsers: 35, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-23", uniqueUsers: 70, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-24", uniqueUsers: 75, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-25", uniqueUsers: 78, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-26", uniqueUsers: 80, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-27", uniqueUsers: 42, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },

  // Mumbai customers - Steady performance
  { date: "2025-06-16", uniqueUsers: 48, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-17", uniqueUsers: 52, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-18", uniqueUsers: 55, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-19", uniqueUsers: 58, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-20", uniqueUsers: 60, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-21", uniqueUsers: 62, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-22", uniqueUsers: 65, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-23", uniqueUsers: 68, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-24", uniqueUsers: 70, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-25", uniqueUsers: 72, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-26", uniqueUsers: 75, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-27", uniqueUsers: 78, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },

  // Mumbai operatives - Sharp decline then plateau
  { date: "2025-06-16", uniqueUsers: 82, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-17", uniqueUsers: 78, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-18", uniqueUsers: 72, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-19", uniqueUsers: 65, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-20", uniqueUsers: 58, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-21", uniqueUsers: 52, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-22", uniqueUsers: 48, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-23", uniqueUsers: 45, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-24", uniqueUsers: 42, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-25", uniqueUsers: 40, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-26", uniqueUsers: 38, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-27", uniqueUsers: 36, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },

  // Commercial Oven data across cities
  { date: "2025-06-16", uniqueUsers: 22, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", uniqueUsers: 25, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", uniqueUsers: 20, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", uniqueUsers: 18, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", uniqueUsers: 16, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", uniqueUsers: 19, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", uniqueUsers: 23, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", uniqueUsers: 26, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", uniqueUsers: 24, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", uniqueUsers: 21, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", uniqueUsers: 19, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", uniqueUsers: 27, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
]

export const totalConversationsData: MetricData[] = [
  // New York customers - Fluctuating performance with peaks and valleys
  { date: "2025-06-16", totalConversations: 180, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalConversations: 165, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalConversations: 145, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalConversations: 135, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalConversations: 125, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalConversations: 140, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalConversations: 155, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalConversations: 170, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalConversations: 185, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalConversations: 195, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalConversations: 200, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalConversations: 210, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkCustomer },

  // New York customers - Fryer 2 - Lower conversation volume
  { date: "2025-06-16", totalConversations: 95, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalConversations: 88, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalConversations: 82, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalConversations: 78, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalConversations: 72, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalConversations: 85, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalConversations: 92, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalConversations: 98, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalConversations: 105, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalConversations: 112, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalConversations: 118, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalConversations: 125, city: Cities.NewYork, userType: "customer", product: Products.HennypennyFryer2, storeId: STORE_IDS.NewYorkCustomer },

  // New York operatives - Consistent mid-range with slight growth
  { date: "2025-06-16", totalConversations: 110, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-17", totalConversations: 115, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-18", totalConversations: 120, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-19", totalConversations: 125, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-20", totalConversations: 132, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-21", totalConversations: 138, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-22", totalConversations: 145, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-23", totalConversations: 150, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-24", totalConversations: 155, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-25", totalConversations: 160, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-26", totalConversations: 165, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },
  { date: "2025-06-27", totalConversations: 170, city: Cities.NewYork, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.NewYorkOperative },

  // London customers - Explosive growth from low start
  { date: "2025-06-16", totalConversations: 85, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-17", totalConversations: 92, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-18", totalConversations: 105, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-19", totalConversations: 125, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-20", totalConversations: 145, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-21", totalConversations: 165, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-22", totalConversations: 185, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-23", totalConversations: 205, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-24", totalConversations: 225, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-25", totalConversations: 240, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-26", totalConversations: 255, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-27", totalConversations: 270, city: Cities.London, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonCustomer },

  // London operatives - High start but dramatic decline
  { date: "2025-06-16", totalConversations: 195, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-17", totalConversations: 180, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-18", totalConversations: 165, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-19", totalConversations: 150, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-20", totalConversations: 135, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-21", totalConversations: 120, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-22", totalConversations: 110, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-23", totalConversations: 105, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-24", totalConversations: 100, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-25", totalConversations: 95, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-26", totalConversations: 90, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },
  { date: "2025-06-27", totalConversations: 85, city: Cities.London, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.LondonOperative },

  // Mumbai customers - Steady upward trend
  { date: "2025-06-16", totalConversations: 125, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-17", totalConversations: 130, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-18", totalConversations: 135, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-19", totalConversations: 140, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-20", totalConversations: 145, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-21", totalConversations: 150, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-22", totalConversations: 155, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-23", totalConversations: 160, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-24", totalConversations: 165, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-25", totalConversations: 170, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-26", totalConversations: 175, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-27", totalConversations: 180, city: Cities.Mumbai, userType: "customer", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiCustomer },

  // Mumbai operatives - Volatile with recovery pattern
  { date: "2025-06-16", totalConversations: 200, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-17", totalConversations: 185, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-18", totalConversations: 170, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-19", totalConversations: 155, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-20", totalConversations: 140, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-21", totalConversations: 125, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-22", totalConversations: 135, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-23", totalConversations: 145, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-24", totalConversations: 155, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-25", totalConversations: 165, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-26", totalConversations: 175, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },
  { date: "2025-06-27", totalConversations: 185, city: Cities.Mumbai, userType: "operative", product: Products.HennypennyFryer1, storeId: STORE_IDS.MumbaiOperative },

  // Commercial Oven conversations across cities
  { date: "2025-06-16", totalConversations: 45, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-17", totalConversations: 48, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-18", totalConversations: 52, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-19", totalConversations: 55, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-20", totalConversations: 58, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-21", totalConversations: 62, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-22", totalConversations: 65, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-23", totalConversations: 69, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-24", totalConversations: 72, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-25", totalConversations: 75, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-26", totalConversations: 78, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },
  { date: "2025-06-27", totalConversations: 82, city: Cities.NewYork, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.NewYorkCustomer },

  { date: "2025-06-16", totalConversations: 65, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-17", totalConversations: 68, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-18", totalConversations: 72, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-19", totalConversations: 78, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-20", totalConversations: 85, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-21", totalConversations: 92, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-22", totalConversations: 98, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-23", totalConversations: 105, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-24", totalConversations: 112, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-25", totalConversations: 118, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-26", totalConversations: 125, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },
  { date: "2025-06-27", totalConversations: 132, city: Cities.London, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.LondonCustomer },

  { date: "2025-06-16", totalConversations: 85, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-17", totalConversations: 88, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-18", totalConversations: 92, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-19", totalConversations: 95, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-20", totalConversations: 98, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-21", totalConversations: 102, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-22", totalConversations: 105, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-23", totalConversations: 108, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-24", totalConversations: 112, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-25", totalConversations: 115, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-26", totalConversations: 118, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
  { date: "2025-06-27", totalConversations: 122, city: Cities.Mumbai, userType: "customer", product: Products.CommercialOven, storeId: STORE_IDS.MumbaiCustomer },
]