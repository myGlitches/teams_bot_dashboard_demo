import { useState, useMemo } from "react"
import { useMetricsStore } from "@/store/useMetricsStore"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import StatCard from "@/components/StatCards"
import { TotalSessionsGraph } from "@/components/graphs/TotalSessionsGraph"
import { UniqueUsersGraph } from "@/components/graphs/UniqueUsersGraph"
import { PerformanceCombinationChart } from "@/components/graphs/PerformanceCombinationChart"
import { ResolutionBreakdownDonut } from "@/components/graphs/ResolutionBreakdownDonut"
import { MultiSelect } from "@/components/ui/multi-select"
import { TotalConversationsGraph } from "./graphs/TotalConversationsGraph"
import FAQManagement from "./FAQManagement"
import { outcomeData } from "@/lib/data/outcomeData"

export default function BotInsights() {
  const { 
    startDate, 
    endDate,
    getSelfServiceFilters,
    setSelfServiceProduct,
    setSelfServiceStoreId
  } = useMetricsStore()
  
  const [selectedTab, setSelectedTab] = useState("engagement")

  // Get self-service filters using the method instead of getter
  const selfServiceFilters = getSelfServiceFilters()

  // Sample data for stat cards - Updated to use new structure
  const data = useMemo(() => {
    return [
      { date: "2025-06-16", totalSessions: 105, uniqueUsers: 48, totalConversations: 112, city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001" },
      { date: "2025-06-17", totalSessions: 120, uniqueUsers: 51, totalConversations: 108, city: "New York", userType: "customer", product: "Hennypenny Fryer 1", storeId: "NYC001" },
      { date: "2025-06-22", totalSessions: 100, uniqueUsers: 49, totalConversations: 115, city: "London", userType: "operative", product: "Commercial Oven", storeId: "LON002" },
      { date: "2025-06-23", totalSessions: 140, uniqueUsers: 62, totalConversations: 138, city: "London", userType: "operative", product: "Commercial Oven", storeId: "LON002" },
    ].filter((d) => {
      const dt = new Date(d.date)
      return dt >= startDate && dt <= endDate
    })
  }, [startDate, endDate])

  const resolved = outcomeData.filter((d) => d.outcome === "resolved").length
  const totalUsers = data.reduce((sum, d) => sum + d.uniqueUsers, 0)
  const totalSessions = data.reduce((sum, d) => sum + d.totalSessions, 0)
  const totalConversations = data.reduce((sum, d) => sum + d.totalConversations, 0)
  const ssr = ((resolved / totalConversations) * 100).toFixed(1)


  const productOptions = [
    { label: "Hennypenny Fryer 1", value: "Hennypenny Fryer 1" },
    { label: "Hennypenny Fryer 2", value: "Hennypenny Fryer 2" },
    { label: "Commercial Oven", value: "Commercial Oven" }
  ]

  const storeIdOptions = [
    { label: "NYC001", value: "NYC001" },
    { label: "NYC002", value: "NYC002" },
    { label: "LON001", value: "LON001" },
    { label: "LON002", value: "LON002" },
    { label: "MUM001", value: "MUM001" },
    { label: "MUM002", value: "MUM002" }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto p-4">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatCard 
            title="Total Sessions" 
            value={totalSessions.toLocaleString()} 
            iconType="totalSessions"
            description="Sessions started"
          />
          <StatCard 
            title="Total Requests" 
            value={totalConversations.toLocaleString()} 
            iconType="totalConversations"
            description="Total exchanges"
          />
          <StatCard 
            title="Total Users" 
            value={totalUsers.toLocaleString()} 
            iconType="totalUsers"
            description="Unique users"
          />
          <StatCard 
            title="Resolutions" 
            value={resolved.toLocaleString()} 
            iconType="resolved"
            description="Resolved queries"
          />
          <StatCard 
            title="Success Rate" 
            value={`${ssr}%`} 
            iconType="ssr"
            description="Resolution rate"
            className="col-span-2 md:col-span-1"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="border-b border-slate-200 bg-slate-50/50 px-6 pt-6">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1">
                <TabsTrigger
                  value="engagement"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Engagement
                </TabsTrigger>
                <TabsTrigger
                  value="selfservice"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Self Service Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="faqs"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  FAQs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="engagement" className="p-6 space-y-6">
              {/* First row: Total Sessions full width */}
              <div className="w-full">
                <TotalSessionsGraph />
              </div>

              {/* Second row: Unique Users and Total Conversations */}
              <div className="w-full flex md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <UniqueUsersGraph />
                </div>
                <div className="w-full md:w-1/2">
                  <TotalConversationsGraph />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="selfservice" className="p-6 space-y-6">
              {/* Global Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h2 className="text-xl font-semibold text-slate-900">Self Service Analytics</h2>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">Product:</label>
                    <MultiSelect
                      options={productOptions}
                      selected={selfServiceFilters.product}
                      onChange={setSelfServiceProduct}
                      placeholder="All Products"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">Store:</label>
                    <MultiSelect
                      options={storeIdOptions}
                      selected={selfServiceFilters.storeId}
                      onChange={setSelfServiceStoreId}
                      placeholder="All Stores"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Combination Chart - Full Width */}
              <div className="w-full">
                <PerformanceCombinationChart />
              </div>

              {/* Resolution Breakdown Donut - Full Width */}
              <div className="w-full">
                <ResolutionBreakdownDonut />
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="p-6">
              <FAQManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}