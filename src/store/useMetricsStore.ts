import { Cities } from "@/lib/data/dummyData"
import { create } from "zustand"

// Universal filter interface for all dimensions
interface UniversalFilters {
  userType: string[]
  city: string[]
  product: string[]
  storeId: string[]
}

// Graph identifier type for type safety
type GraphId = 'totalSessions' | 'uniqueUsers' | 'totalConversations' | 'performanceCombination' | 'resolutionBreakdown'

interface MetricsState {
  // Global date filters
  startDate: Date
  endDate: Date
  quickRange: "custom" | "12h" | "1d" | "7d" | "14d" | "30d"
  
  // ✅ Global filters
  globalCityFilter: string[]
  globalUserTypeFilter: string[] // ✅ Add global user type filter

  // ✅ Global filter actions
  setGlobalCityFilter: (cities: string[]) => void
  getGlobalCityFilter: () => string[]
  setGlobalUserTypeFilter: (userTypes: string[]) => void // ✅ Add global user type actions
  getGlobalUserTypeFilter: () => string[]
  
  // Legacy support (can be removed later)
  selectedMetrics: string[]
  selectedIntents: string[]

  // Dynamic graph filters - each graph can have its own filter state
  graphFilters: Record<GraphId, UniversalFilters>

  // Actions for date management
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  setQuickRange: (range: MetricsState["quickRange"]) => void

  // Dynamic filter actions
  setGraphFilter: (graphId: GraphId, dimension: keyof UniversalFilters, values: string[]) => void
  resetGraphFilters: (graphId: GraphId) => void
  resetAllFilters: () => void

  // Convenience methods for specific dimensions
  setGraphUserType: (graphId: GraphId, types: string[]) => void
  setGraphCity: (graphId: GraphId, cities: string[]) => void
  setGraphProduct: (graphId: GraphId, products: string[]) => void
  setGraphStoreId: (graphId: GraphId, storeIds: string[]) => void

  // Self-service specific actions (direct state instead of getter)
  setSelfServiceUserType: (types: string[]) => void
  setSelfServiceCity: (cities: string[]) => void
  setSelfServiceProduct: (products: string[]) => void
  setSelfServiceStoreId: (storeIds: string[]) => void

  // Legacy actions (for backward compatibility)
  toggleMetric: (key: string) => void
  toggleIntent: (intent: string) => void

  // Helper methods
  getGraphFilters: (graphId: GraphId) => UniversalFilters
  getAllActiveFilters: () => Record<GraphId, UniversalFilters>
  getSelfServiceFilters: () => UniversalFilters
}

// Default filter state
const createDefaultFilters = (): UniversalFilters => ({
  userType: [],
  city: [],
  product: [],
  storeId: []
})

// Initial graph filters with New York as default
const createInitialGraphFilters = (): Record<GraphId, UniversalFilters> => ({
  totalSessions: {
    userType: [],
    city: [Cities.NewYork], // Default to New York
    product: [],
    storeId: []
  },
  uniqueUsers: {
    userType: [],
    city: [Cities.NewYork],
    product: [],
    storeId: []
  },
  totalConversations: {
    userType: [],
    city: [Cities.NewYork],
    product: [],
    storeId: []
  },
  performanceCombination: {
    userType: [],
    city: [Cities.NewYork],
    product: [],
    storeId: []
  },
  resolutionBreakdown: {
    userType: [],
    city: [Cities.NewYork],
    product: [],
    storeId: []
  }
})

export const useMetricsStore = create<MetricsState>((set, get) => ({
  // Global state
  startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
  endDate: new Date(),
  quickRange: "30d",
  selectedMetrics: ["totalSessions", "totalConversations", "avgMessagesPerSession", "avgLatency"],
  selectedIntents: [],
  
  // ✅ Global filters - Set New York as default for global city filter
  globalCityFilter: [Cities.NewYork], // 🔄 Changed from [] to [Cities.NewYork]
  globalUserTypeFilter: [], // ✅ Add global user type filter
  
  // ✅ Global filter actions
  setGlobalCityFilter: (cities) => set({ globalCityFilter: cities }),
  getGlobalCityFilter: () => get().globalCityFilter,
  setGlobalUserTypeFilter: (userTypes) => set({ globalUserTypeFilter: userTypes }), // ✅ Add actions
  getGlobalUserTypeFilter: () => get().globalUserTypeFilter,

  // Dynamic graph filters
  graphFilters: createInitialGraphFilters(),

  // Date actions
  setStartDate: (date) => set({ startDate: date, quickRange: "custom" }),
  setEndDate: (date) => set({ endDate: date, quickRange: "custom" }),
  setQuickRange: (range) => set({ quickRange: range }),

  // Dynamic filter actions
  setGraphFilter: (graphId, dimension, values) => {
    set((state) => ({
      graphFilters: {
        ...state.graphFilters,
        [graphId]: {
          ...state.graphFilters[graphId],
          [dimension]: values
        }
      }
    }))
  },

  resetGraphFilters: (graphId) =>
    set((state) => ({
      graphFilters: {
        ...state.graphFilters,
        [graphId]: createDefaultFilters()
      }
    })),

  resetAllFilters: () =>
    set({
      graphFilters: Object.keys(get().graphFilters).reduce((acc, graphId) => {
        acc[graphId as GraphId] = createDefaultFilters()
        return acc
      }, {} as Record<GraphId, UniversalFilters>),
      // 🔄 Also reset global filters to New York default
      globalCityFilter: [Cities.NewYork],
      globalUserTypeFilter: []
    }),

  // Convenience methods for specific dimensions
  setGraphUserType: (graphId, types) => {
    get().setGraphFilter(graphId, 'userType', types)
  },
  setGraphCity: (graphId, cities) => {
    get().setGraphFilter(graphId, 'city', cities)
  },
  setGraphProduct: (graphId, products) => {
    get().setGraphFilter(graphId, 'product', products)
  },
  setGraphStoreId: (graphId, storeIds) => {
    get().setGraphFilter(graphId, 'storeId', storeIds)
  },

  // Self-service actions (delegate to performanceCombination AND resolutionBreakdown graphs)
  setSelfServiceUserType: (types) => {
    get().setGraphUserType('performanceCombination', types)
    get().setGraphUserType('resolutionBreakdown', types)
  },
  setSelfServiceCity: (cities) => {
    get().setGraphCity('performanceCombination', cities)
    get().setGraphCity('resolutionBreakdown', cities)
  },
  setSelfServiceProduct: (products) => {
    get().setGraphProduct('performanceCombination', products)
    get().setGraphProduct('resolutionBreakdown', products)  
  },
  setSelfServiceStoreId: (storeIds) => {
    get().setGraphStoreId('performanceCombination', storeIds)
    get().setGraphStoreId('resolutionBreakdown', storeIds)
  },

  // Helper methods
  getGraphFilters: (graphId) => get().graphFilters[graphId],
  getAllActiveFilters: () => get().graphFilters,
  getSelfServiceFilters: () => get().graphFilters.performanceCombination,

  // Legacy actions
  toggleMetric: (key) =>
    set((state) => ({
      selectedMetrics: state.selectedMetrics.includes(key)
        ? state.selectedMetrics.filter((m) => m !== key)
        : [...state.selectedMetrics, key],
    })),

  toggleIntent: (intent) =>
    set((state) => ({
      selectedIntents: state.selectedIntents.includes(intent)
        ? state.selectedIntents.filter((i) => i !== intent)
        : [...state.selectedIntents, intent],
    })),
}))

// Export types for use in components
export type { UniversalFilters, GraphId }