import { useState, useMemo } from "react"
import { useMetricsStore } from "@/store/useMetricsStore"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import StatCard from "@/components/StatCards"
import { TotalSessionsGraph } from "@/components/graphs/TotalSessionsGraph"
import { UniqueUsersGraph } from "@/components/graphs/UniqueUsersGraph"
import { PerformanceCombinationChart } from "@/components/graphs/PerformanceCombinationChart"
import { TotalConversationsGraph } from "./graphs/TotalConversationsGraph"
import FAQManagement from "./FAQManagement"
// ✅ Updated imports to use 30-day data
import { 
  totalSessionsData30Days, 
  uniqueUsersData30Days, 
  selfServiceData30Days 
} from "@/lib/data/comprehensiveFulldata"

export default function BotInsights() {
  const { 
    startDate, 
    endDate,
    getGlobalCityFilter,
    getGlobalUserTypeFilter,
  } = useMetricsStore()
  
  const [selectedTab, setSelectedTab] = useState("engagement")

  // Get global filters
  const globalCities = getGlobalCityFilter()
  const globalUserTypes = getGlobalUserTypeFilter()

  // Calculate stats from actual 30-day data sources with global filters applied
  const statsData = useMemo(() => {
    // Filter each dataset separately with global filters
    const filteredSessionsData = totalSessionsData30Days.filter((d) => {
      const dt = new Date(d.date)
      return (
        dt >= startDate &&
        dt <= endDate &&
        (globalCities.length === 0 || globalCities.includes(d.city)) &&
        (globalUserTypes.length === 0 || globalUserTypes.includes(d.userType))
      )
    })

    const filteredUsersData = uniqueUsersData30Days.filter((d) => {
      const dt = new Date(d.date)
      return (
        dt >= startDate &&
        dt <= endDate &&
        (globalCities.length === 0 || globalCities.includes(d.city)) &&
        (globalUserTypes.length === 0 || globalUserTypes.includes(d.userType))
      )
    })

    // Filter self-service data with global filters  
    const filteredSelfServiceData = selfServiceData30Days.filter((d) => {
      const dt = new Date(d.date)
      return (
        dt >= startDate &&
        dt <= endDate &&
        (globalCities.length === 0 || globalCities.includes(d.city)) &&
        (globalUserTypes.length === 0 || globalUserTypes.includes(d.userType))
      )
    })

    // Calculate totals from each dataset
    const totalSessions = filteredSessionsData.reduce((sum, d) => sum + d.totalSessions, 0)
    const totalUniqueUsers = filteredUsersData.reduce((sum, d) => sum + d.uniqueUsers, 0)

    // Calculate self-service metrics from actual self-service data
    const totalResolved = filteredSelfServiceData.reduce((sum, d) => sum + d.resolvedSessions, 0)
    const totalEscalations = filteredSelfServiceData.reduce((sum, d) => sum + d.notResolvedSessions, 0)
    const totalAbandoned = filteredSelfServiceData.reduce((sum, d) => sum + d.abandonedSessions, 0)
    const totalSelfServiceSessions = totalResolved + totalEscalations + totalAbandoned

    // ✅ Calculate percentages based on self-service data - should show ~85%, ~10%, ~5%
    const selfResolvedPercentage = totalSelfServiceSessions > 0 ? 
      ((totalResolved / totalSelfServiceSessions) * 100).toFixed(1) : "0.0"
    const escalationPercentage = totalSelfServiceSessions > 0 ? 
      ((totalEscalations / totalSelfServiceSessions) * 100).toFixed(1) : "0.0"
    const abandonedPercentage = totalSelfServiceSessions > 0 ? 
      ((totalAbandoned / totalSelfServiceSessions) * 100).toFixed(1) : "0.0"

    return {
      totalSessions,
      totalUniqueUsers,
      totalResolved,
      totalEscalations,
      totalAbandoned,
      selfResolvedPercentage,
      escalationPercentage,
      abandonedPercentage
    }
  }, [startDate, endDate, globalCities, globalUserTypes])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto p-4">
        
        {/* Stats Cards - Updated with real calculated metrics from 30-day data */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <StatCard 
            title="# Sessions" 
            value={statsData.totalSessions.toLocaleString()} 
            iconType="totalSessions"
            description="Sessions started"
            tooltipDescription="Total number of times users started a conversation with the bot."
          />
          <StatCard 
            title="# Unique Users" 
            value={statsData.totalUniqueUsers.toLocaleString()} 
            iconType="totalUsers"
            description="Distinct users"
            tooltipDescription="Number of different people who used the bot (no duplicates counted)."
          />
          <StatCard 
            title="% Self-Resolved" 
            value={`${statsData.selfResolvedPercentage}%`} 
            iconType="resolved"
            description="Resolution rate"
            tooltipDescription="Percentage of conversations that were successfully resolved by the bot alone."
          />
          <StatCard 
            title="% Escalations" 
            value={`${statsData.escalationPercentage}%`} 
            iconType="escalations"
            description="Escalation rate"
            tooltipDescription="Percentage of conversations that needed human assistance to resolve."
          />
          <StatCard 
            title="% Abandoned" 
            value={`${statsData.abandonedPercentage}%`} 
            iconType="abandoned"
            description="Abandonment rate"
            tooltipDescription="Percentage of users who left the conversation without finding a solution."
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
                  Engagement Metrics
                </TabsTrigger>
                <TabsTrigger
                  value="selfservice"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Self Service Metrics
                </TabsTrigger>
                <TabsTrigger
                  value="faqs"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                >
                  Requests Deep-dive
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
              {/* Performance Combination Chart - Full Width */}
              <div className="w-full">
                <PerformanceCombinationChart />
              </div>

              {/* Resolution Breakdown Donut - Full Width */}
              {/* <div className="w-full">
                <ResolutionBreakdownDonut />
              </div> */}
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