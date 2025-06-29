// Generate comprehensive 30-day data (2025-06-01 to 2025-06-30)

import { Cities, Products, STORE_IDS } from "./dummyData"

// Helper function to generate dates
const generateDates = () => {
  const dates = []
  for (let i = 1; i <= 30; i++) {
    const date = `2025-06-${i.toString().padStart(2, '0')}`
    dates.push(date)
  }
  return dates
}

const dates = generateDates()

// Enhanced Total Sessions Data - 30 days
export const totalSessionsData30Days = [
  // New York Customer - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 140 + Math.sin(index * 0.2) * 20 + (Math.random() - 0.5) * 10,
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // New York Customer - Hennypenny Fryer 2
  ...dates.map((date, index) => ({
    date,
    totalSessions: 85 + Math.sin(index * 0.15) * 15 + (Math.random() - 0.5) * 8,
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer2,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // New York Customer - Commercial Oven
  ...dates.map((date, index) => ({
    date,
    totalSessions: 45 + Math.sin(index * 0.1) * 10 + (Math.random() - 0.5) * 5,
    city: Cities.NewYork,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // New York Operative - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 95 + index * 2 + (Math.random() - 0.5) * 10,
    city: Cities.NewYork,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.NewYorkOperative
  })),
  
  // London Customer - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 75 + index * 3 + (Math.random() - 0.5) * 12,
    city: Cities.London,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  // London Customer - Commercial Oven
  ...dates.map((date, index) => ({
    date,
    totalSessions: 55 + index * 1.5 + (Math.random() - 0.5) * 8,
    city: Cities.London,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  // London Operative - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 85 + Math.cos(index * 0.3) * 15 + (Math.random() - 0.5) * 10,
    city: Cities.London,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonOperative
  })),
  
  // Mumbai Customer - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 105 + index * 1 + (Math.random() - 0.5) * 8,
    city: Cities.Mumbai,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiCustomer
  })),
  
  // Mumbai Operative - Hennypenny Fryer 1
  ...dates.map((date, index) => ({
    date,
    totalSessions: 165 - index * 2.5 + (Math.random() - 0.5) * 10,
    city: Cities.Mumbai,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiOperative
  }))
].map(item => ({ ...item, totalSessions: Math.round(Math.max(10, item.totalSessions)) }))

// Enhanced Unique Users Data - 30 days (reduced by ~40%)
export const uniqueUsersData30Days = [
  // New York Customer - Hennypenny Fryer 1 (Weekend peaks)
  ...dates.map((date, index) => {
    const dayOfWeek = (index + 2) % 7 // June 1 was a Sunday
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 10 : 0
    return {
      date,
      uniqueUsers: Math.round((35 + weekendBoost + Math.sin(index * 0.2) * 7 + (Math.random() - 0.5) * 4) * 0.6),
      city: Cities.NewYork,
      userType: "customer",
      product: Products.HennypennyFryer1,
      storeId: STORE_IDS.NewYorkCustomer
    }
  }),
  
  // New York Customer - Hennypenny Fryer 2
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.round((22 + Math.sin(index * 0.15) * 5 + (Math.random() - 0.5) * 3) * 0.6),
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer2,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // London Customer - Hennypenny Fryer 1 (Gradual growth)
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.round((22 + index * 1 + (Math.random() - 0.5) * 4) * 0.6),
    city: Cities.London,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  // London Operative - Business hours pattern
  ...dates.map((date, index) => {
    const dayOfWeek = (index + 2) % 7
    const businessDayBoost = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 12 : -8
    return {
      date,
      uniqueUsers: Math.round((28 + businessDayBoost + (Math.random() - 0.5) * 5) * 0.6),
      city: Cities.London,
      userType: "operative",
      product: Products.HennypennyFryer1,
      storeId: STORE_IDS.LondonOperative
    }
  }),
  
  // Mumbai Customer - Steady performance
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.round((30 + index * 0.7 + (Math.random() - 0.5) * 4) * 0.6),
    city: Cities.Mumbai,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiCustomer
  })),
  
  // Mumbai Operative - Sharp decline then plateau
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.round(Math.max(20, (50 - index * 1 + (Math.random() - 0.5) * 4) * 0.6)),
    city: Cities.Mumbai,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiOperative
  })),
  
  // Commercial Oven data across cities
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.round((14 + Math.sin(index * 0.1) * 3 + (Math.random() - 0.5) * 2) * 0.6),
    city: Cities.NewYork,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.NewYorkCustomer
  }))
].map(item => ({ ...item, uniqueUsers: Math.max(3, item.uniqueUsers) }))

export const UsersData30Days = [
  // New York Customer - Hennypenny Fryer 1 (Weekend peaks)
  ...dates.map((date, index) => {
    const dayOfWeek = (index + 2) % 7 // June 1 was a Sunday
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 15 : 0
    return {
      date,
      uniqueUsers: 60 + weekendBoost + Math.sin(index * 0.2) * 10 + (Math.random() - 0.5) * 5,
      city: Cities.NewYork,
      userType: "customer",
      product: Products.HennypennyFryer1,
      storeId: STORE_IDS.NewYorkCustomer
    }
  }),
  
  // New York Customer - Hennypenny Fryer 2
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: 35 + Math.sin(index * 0.15) * 8 + (Math.random() - 0.5) * 4,
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer2,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // London Customer - Hennypenny Fryer 1 (Gradual growth)
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: 35 + index * 1.5 + (Math.random() - 0.5) * 6,
    city: Cities.London,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  // London Operative - Business hours pattern
  ...dates.map((date, index) => {
    const dayOfWeek = (index + 2) % 7
    const businessDayBoost = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 20 : -15
    return {
      date,
      uniqueUsers: 45 + businessDayBoost + (Math.random() - 0.5) * 8,
      city: Cities.London,
      userType: "operative",
      product: Products.HennypennyFryer1,
      storeId: STORE_IDS.LondonOperative
    }
  }),
  
  // Mumbai Customer - Steady performance
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: 48 + index * 1 + (Math.random() - 0.5) * 5,
    city: Cities.Mumbai,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiCustomer
  })),
  
  // Mumbai Operative - Sharp decline then plateau
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: Math.max(35, 82 - index * 1.5 + (Math.random() - 0.5) * 5),
    city: Cities.Mumbai,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiOperative
  })),
  
  // Commercial Oven data across cities
  ...dates.map((date, index) => ({
    date,
    uniqueUsers: 22 + Math.sin(index * 0.1) * 5 + (Math.random() - 0.5) * 3,
    city: Cities.NewYork,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.NewYorkCustomer
  }))
].map(item => ({ ...item, uniqueUsers: Math.round(Math.max(5, item.uniqueUsers)) }))

// Enhanced Total Conversations Data - 30 days (reduced by ~40%)
export const totalConversationsData30Days = [
  // New York Customer - Fluctuating performance
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((100 + Math.sin(index * 0.25) * 18 + (Math.random() - 0.5) * 12) * 0.6),
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // New York Customer - Fryer 2
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((55 + index * 0.7 + (Math.random() - 0.5) * 7) * 0.6),
    city: Cities.NewYork,
    userType: "customer",
    product: Products.HennypennyFryer2,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  // New York Operative - Consistent mid-range
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((65 + index * 1.3 + (Math.random() - 0.5) * 8) * 0.6),
    city: Cities.NewYork,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.NewYorkOperative
  })),
  
  // London Customer - Explosive growth
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((50 + index * 4 + (Math.random() - 0.5) * 10) * 0.6),
    city: Cities.London,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  // London Operative - High start but decline
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round(Math.max(50, (115 - index * 2 + (Math.random() - 0.5) * 8) * 0.6)),
    city: Cities.London,
    userType: "operative",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.LondonOperative
  })),
  
  // Mumbai Customer - Steady upward trend
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((75 + index * 1.2 + (Math.random() - 0.5) * 7) * 0.6),
    city: Cities.Mumbai,
    userType: "customer",
    product: Products.HennypennyFryer1,
    storeId: STORE_IDS.MumbaiCustomer
  })),
  
  // Mumbai Operative - Volatile with recovery
  ...dates.map((date, index) => {
    const baseValue = index < 15 ? 120 - index * 3.5 : 75 + (index - 15) * 1.5
    return {
      date,
      totalConversations: Math.round((baseValue + (Math.random() - 0.5) * 10) * 0.6),
      city: Cities.Mumbai,
      userType: "operative",
      product: Products.HennypennyFryer1,
      storeId: STORE_IDS.MumbaiOperative
    }
  }),
  
  // Commercial Oven conversations
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((28 + index * 0.8 + (Math.random() - 0.5) * 5) * 0.6),
    city: Cities.NewYork,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.NewYorkCustomer
  })),
  
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((40 + index * 1.3 + (Math.random() - 0.5) * 7) * 0.6),
    city: Cities.London,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.LondonCustomer
  })),
  
  ...dates.map((date, index) => ({
    date,
    totalConversations: Math.round((50 + index * 0.7 + (Math.random() - 0.5) * 5) * 0.6),
    city: Cities.Mumbai,
    userType: "customer",
    product: Products.CommercialOven,
    storeId: STORE_IDS.MumbaiCustomer
  }))
].map(item => ({ ...item, totalConversations: Math.max(8, item.totalConversations) }))

// Self Service Data - 30 days with 85% resolved, 5% escalated, 10% abandoned
// Reduced numbers to match total sessions under 10k
export const selfServiceData30Days = [
  // Generate data for all combinations over 30 days
  ...dates.flatMap((date, dayIndex) => {
    // Add day-of-week variation
    const dayOfWeek = (dayIndex + 2) % 7 // June 1 was a Sunday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isMonday = dayOfWeek === 1
    
    // Some days have better/worse performance
    const performanceMultiplier = Math.sin(dayIndex * 0.1) * 0.3 + 1 // 0.7 to 1.3
    const weekendEffect = isWeekend ? 0.7 : 1.0 // Lower volume on weekends
    const mondayEffect = isMonday ? 1.2 : 1.0 // Higher escalations on Mondays
    
    return [
      // New York Customer - Hennypenny Fryer 1
      {
        date,
        city: "New York",
        userType: "customer",
        product: "Hennypenny Fryer 1",
        storeId: "NYC001",
        resolvedSessions: Math.round((17 + (Math.random() - 0.5) * 6) * performanceMultiplier * weekendEffect), // ~85%
        notResolvedSessions: Math.round((isWeekend ? 0 : (0.8 + (Math.random()) * 1.2)) * mondayEffect), // ~5%, some days 0
        abandonedSessions: Math.round((1.5 + (Math.random()) * 1) * weekendEffect), // ~10%
        totalConversations: 0 // Will be calculated
      },
      
      // New York Customer - Hennypenny Fryer 2
      {
        date,
        city: "New York",
        userType: "customer", 
        product: "Hennypenny Fryer 2",
        storeId: "NYC001",
        resolvedSessions: Math.round((12 + (Math.random() - 0.5) * 4) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 3 === 0 ? 0 : (0.6 + (Math.random()) * 0.8)) * mondayEffect),
        abandonedSessions: Math.round((0.8 + (Math.random()) * 0.7) * weekendEffect),
        totalConversations: 0
      },
      
      // New York Customer - Commercial Oven
      {
        date,
        city: "New York",
        userType: "customer",
        product: "Commercial Oven", 
        storeId: "NYC001",
        resolvedSessions: Math.round((7 + (Math.random() - 0.5) * 3) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 4 === 0 ? 0 : (0.3 + (Math.random()) * 0.5)) * mondayEffect),
        abandonedSessions: Math.round((0.5 + (Math.random()) * 0.5) * weekendEffect),
        totalConversations: 0
      },
      
      // New York Operative - Hennypenny Fryer 1 (Higher resolution rate)
      {
        date,
        city: "New York",
        userType: "operative",
        product: "Hennypenny Fryer 1",
        storeId: "NYC002", 
        resolvedSessions: Math.round((12 + (Math.random() - 0.5) * 4) * performanceMultiplier * (isWeekend ? 0.3 : 1)),
        notResolvedSessions: Math.round((isWeekend ? 0 : (dayIndex % 5 === 0 ? 0 : (0.4 + (Math.random()) * 0.6))) * mondayEffect),
        abandonedSessions: Math.round((0.3 + (Math.random()) * 0.4) * (isWeekend ? 0.5 : 1)),
        totalConversations: 0
      },
      
      // London Customer - Hennypenny Fryer 1
      {
        date,
        city: "London",
        userType: "customer",
        product: "Hennypenny Fryer 1",
        storeId: "LON001",
        resolvedSessions: Math.round((14 + (Math.random() - 0.5) * 5) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 3 === 1 ? 0 : (0.7 + (Math.random()) * 1)) * mondayEffect),
        abandonedSessions: Math.round((1 + (Math.random()) * 0.8) * weekendEffect),
        totalConversations: 0
      },
      
      // London Customer - Commercial Oven
      {
        date,
        city: "London",
        userType: "customer",
        product: "Commercial Oven",
        storeId: "LON001",
        resolvedSessions: Math.round((8 + (Math.random() - 0.5) * 3) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 4 === 1 ? 0 : (0.4 + (Math.random()) * 0.6)) * mondayEffect),
        abandonedSessions: Math.round((0.6 + (Math.random()) * 0.5) * weekendEffect),
        totalConversations: 0
      },
      
      // London Operative - Hennypenny Fryer 1
      {
        date,
        city: "London",
        userType: "operative",
        product: "Hennypenny Fryer 1",
        storeId: "LON002",
        resolvedSessions: Math.round((10 + (Math.random() - 0.5) * 4) * performanceMultiplier * (isWeekend ? 0.2 : 1)),
        notResolvedSessions: Math.round((isWeekend ? 0 : (dayIndex % 6 === 0 ? 0 : (0.3 + (Math.random()) * 0.5))) * mondayEffect),
        abandonedSessions: Math.round((0.4 + (Math.random()) * 0.4) * (isWeekend ? 0.3 : 1)),
        totalConversations: 0
      },
      
      // Mumbai Customer - Hennypenny Fryer 1
      {
        date,
        city: "Mumbai",
        userType: "customer",
        product: "Hennypenny Fryer 1", 
        storeId: "MUM001",
        resolvedSessions: Math.round((15 + (Math.random() - 0.5) * 5) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 3 === 2 ? 0 : (0.8 + (Math.random()) * 1)) * mondayEffect),
        abandonedSessions: Math.round((1.2 + (Math.random()) * 0.8) * weekendEffect),
        totalConversations: 0
      },
      
      // Mumbai Customer - Commercial Oven
      {
        date,
        city: "Mumbai",
        userType: "customer",
        product: "Commercial Oven",
        storeId: "MUM001",
        resolvedSessions: Math.round((9 + (Math.random() - 0.5) * 3) * performanceMultiplier * weekendEffect),
        notResolvedSessions: Math.round((dayIndex % 4 === 2 ? 0 : (0.5 + (Math.random()) * 0.7)) * mondayEffect),
        abandonedSessions: Math.round((0.7 + (Math.random()) * 0.5) * weekendEffect),
        totalConversations: 0
      },
      
      // Mumbai Operative - Hennypenny Fryer 1
      {
        date,
        city: "Mumbai",
        userType: "operative",
        product: "Hennypenny Fryer 1",
        storeId: "MUM002",
        resolvedSessions: Math.round((11 + (Math.random() - 0.5) * 4) * performanceMultiplier * (isWeekend ? 0.2 : 1)),
        notResolvedSessions: Math.round((isWeekend ? 0 : (dayIndex % 5 === 1 ? 0 : (0.4 + (Math.random()) * 0.6))) * mondayEffect),
        abandonedSessions: Math.round((0.5 + (Math.random()) * 0.4) * (isWeekend ? 0.3 : 1)),
        totalConversations: 0
      }
    ]
  })
].map(item => ({
  ...item,
  resolvedSessions: Math.max(1, item.resolvedSessions), // Ensure minimum 1
  notResolvedSessions: Math.max(0, item.notResolvedSessions), // Can be 0
  abandonedSessions: Math.max(0, item.abandonedSessions), // Can be 0
  totalConversations: Math.max(1, item.resolvedSessions) + Math.max(0, item.notResolvedSessions) + Math.max(0, item.abandonedSessions)
}))

export { generateDates }