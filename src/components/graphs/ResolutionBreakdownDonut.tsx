// import { useMemo, useState } from "react"
// import Plot from 'react-plotly.js'
// import { useMetricsStore } from "@/store/useMetricsStore"
// import { selfServiceData30Days } from "@/lib/data/comprehensiveFulldata"
// import { Label } from "@/components/ui/label"
// import { MultiSelect } from "@/components/ui/multi-select"
// import TypeableStoreFilter from "../filters/TypeableStoreFilter"

// const PRODUCT_OPTIONS = ["Hennypenny Fryer 1", "Hennypenny Fryer 2", "Commercial Oven"]

// // Dimension options for the dropdown
// const DIMENSION_OPTIONS = [
//   { label: "User", value: "userType" },
//   { label: "Products", value: "product" },
//   { label: "Cities", value: "city" }
// ]

// export function ResolutionBreakdownDonut() {
//   const { 
//     startDate, 
//     endDate,
//     getGraphFilters,
//     setGraphProduct,
//     setGraphStoreId,
//     getGlobalCityFilter,
//     getGlobalUserTypeFilter,
//   } = useMetricsStore()

//   // Local state for selected dimension
//   const [selectedDimension, setSelectedDimension] = useState<string[]>([])

//   // Get filters for resolution breakdown chart
//   const filters = getGraphFilters('resolutionBreakdown')
//   const globalCities = getGlobalCityFilter()
//   const globalUserTypes = getGlobalUserTypeFilter()

//   const handleProductChange = (values: string[]) => {
//     setGraphProduct('resolutionBreakdown', values)
//   }

//   const handleStoreIdChange = (values: string[]) => {
//     setGraphStoreId('resolutionBreakdown', values)
//   }

//   const handleDimensionChange = (values: string[]) => {
//     setSelectedDimension(values)
//   }

//   // Filter and aggregate data
//   const aggregatedData = useMemo(() => {
//     const filtered = selfServiceData30Days.filter((d) => {
//       const dt = new Date(d.date)
//       const dateInRange = dt >= startDate && dt <= endDate
      
//       const cityMatch = globalCities.length === 0 || globalCities.includes(d.city)
//       const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)
//       const productMatch = filters.product.length === 0 || filters.product.includes(d.product)
//       const storeIdMatch = filters.storeId.length === 0 || filters.storeId.includes(d.storeId)
      
//       return dateInRange && cityMatch && userTypeMatch && productMatch && storeIdMatch
//     })

//     // If no dimension is selected, aggregate all data
//     if (selectedDimension.length === 0) {
//       return filtered.reduce((acc, curr) => {
//         acc.resolved += curr.resolvedSessions
//         acc.notResolved += curr.notResolvedSessions
//         acc.abandoned += curr.abandonedSessions
//         acc.total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
//         return acc
//       }, { resolved: 0, notResolved: 0, abandoned: 0, total: 0 })
//     }

//     // If dimensions are selected, we'll show the total but could extend this to show breakdown by dimension
//     // For now, keeping it simple with total aggregation respecting the dimension filter effect
//     return filtered.reduce((acc, curr) => {
//       acc.resolved += curr.resolvedSessions
//       acc.notResolved += curr.notResolvedSessions
//       acc.abandoned += curr.abandonedSessions
//       acc.total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
//       return acc
//     }, { resolved: 0, notResolved: 0, abandoned: 0, total: 0 })
//   }, [startDate, endDate, globalCities, globalUserTypes, filters, selectedDimension])

//   // Calculate percentages
//   const resolvedPct = aggregatedData.total > 0 ? ((aggregatedData.resolved / aggregatedData.total) * 100).toFixed(2) : "0.00"
//   const abandonedDuringServicePct = aggregatedData.total > 0 ? ((aggregatedData.abandoned / aggregatedData.total) * 100).toFixed(2) : "0.00"
//   const externalEscalationPct = aggregatedData.total > 0 ? ((aggregatedData.notResolved / aggregatedData.total) * 100).toFixed(2) : "0.00"

//   // Get dimension breakdown for display (if dimension is selected)
//   const dimensionBreakdown = useMemo(() => {
//     if (selectedDimension.length === 0) return null

//     const filtered = selfServiceData30Days.filter((d) => {
//       const dt = new Date(d.date)
//       const dateInRange = dt >= startDate && dt <= endDate
      
//       const cityMatch = globalCities.length === 0 || globalCities.includes(d.city)
//       const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)
//       const productMatch = filters.product.length === 0 || filters.product.includes(d.product)
//       const storeIdMatch = filters.storeId.length === 0 || filters.storeId.includes(d.storeId)
      
//       return dateInRange && cityMatch && userTypeMatch && productMatch && storeIdMatch
//     })

//     const breakdown = filtered.reduce((acc, curr) => {
//       const combinationValues = selectedDimension.map(dim => curr[dim as keyof typeof curr] as string)
//       const dimensionKey = combinationValues.join(" - ")
      
//       if (!acc[dimensionKey]) {
//         acc[dimensionKey] = { resolved: 0, notResolved: 0, abandoned: 0, total: 0 }
//       }
      
//       acc[dimensionKey].resolved += curr.resolvedSessions
//       acc[dimensionKey].notResolved += curr.notResolvedSessions
//       acc[dimensionKey].abandoned += curr.abandonedSessions
//       acc[dimensionKey].total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
      
//       return acc
//     }, {} as Record<string, { resolved: number, notResolved: number, abandoned: number, total: number }>)

//     return Object.entries(breakdown).map(([key, data]) => ({
//       dimension: key,
//       ...data,
//       resolvedPct: data.total > 0 ? ((data.resolved / data.total) * 100).toFixed(1) : "0.0"
//     }))
//   }, [startDate, endDate, globalCities, globalUserTypes, filters, selectedDimension])

//   // Create donut chart data
//   const plotData = [{
//     values: [
//       aggregatedData.resolved,
//       aggregatedData.abandoned,
//       aggregatedData.notResolved,
//     ],
//     labels: [
//       'Self-service resolution',
//       'Abandoned during self service',
//       'External escalation submitted',
//     ],
//     type: 'pie' as const,
//     hole: 0.5,
//     marker: {
//       colors: [
//         '#22c55e', // green - Self-service resolution
//         '#fbbf24', // amber - Abandoned during self service
//         '#3b82f6', // blue - External escalation submitted
//       ],
//       line: {
//         color: '#ffffff',
//         width: 2
//       }
//     },
//     textinfo: 'none' as const,
//     hovertemplate: '<b>%{label}</b><br>' +
//                   'Count: %{value}<br>' +
//                   'Percentage: %{percent}<br>' +
//                   '<extra></extra>'
//   }]

//   const layout = {
//     showlegend: false,
//     annotations: [
//       {
//         text: `<span style="font-size: 24px; color: #1e293b; font-weight: bold;">${aggregatedData.total.toLocaleString()}</span><br><span style="font-size: 12px; color: #64748b;">TOTAL</span>`,
//         x: 0.5,
//         y: 0.5,
//         font: { size: 14, color: '#64748b' },
//         showarrow: false,
//         align: 'center' as const
//       }
//     ],
//     plot_bgcolor: 'transparent',
//     paper_bgcolor: 'transparent',
//     margin: { l: 0, r: 0, t: 0, b: 0 }
//   }

//   const config = {
//     displayModeBar: false,
//     responsive: true
//   }

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
//             <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-green-900 bg-clip-text text-transparent">
//               Resolution Breakdown
//             </h3>
//           </div>
//           <p className="text-sm text-slate-500">Distribution of conversation outcomes</p>
//         </div>
        
//         <div className="flex gap-3 flex-wrap">
//           {/* Dimensions Dropdown */}
          

          

         
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Legend and dimension breakdown */}
//         <div className="space-y-3">
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 rounded-full bg-green-500"></div>
//             <div className="flex-1">
//               <div className="font-medium text-slate-900">Self-service resolution</div>
//               <div className="text-lg font-bold text-slate-700">{resolvedPct}%</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 rounded-full bg-amber-400"></div>
//             <div className="flex-1">
//               <div className="font-medium text-slate-900">Abandoned during self service</div>
//               <div className="text-lg font-bold text-slate-700">{abandonedDuringServicePct}%</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 rounded-full bg-blue-500"></div>
//             <div className="flex-1">
//               <div className="font-medium text-slate-900">External escalation submitted</div>
//               <div className="text-lg font-bold text-slate-700">{externalEscalationPct}%</div>
//             </div>
//           </div>

//           {/* Show dimension breakdown if dimensions are selected */}
//           {dimensionBreakdown && dimensionBreakdown.length > 0 && (
//             <div className="mt-6 pt-4 border-t border-slate-200">
//               <h4 className="text-sm font-semibold text-slate-700 mb-3">Breakdown by Dimension:</h4>
//               <div className="space-y-2 max-h-32 overflow-y-auto">
//                 {dimensionBreakdown.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center text-xs">
//                     <span className="text-slate-600 truncate flex-1 mr-2">{item.dimension}</span>
//                     <span className="font-medium text-slate-800">{item.resolvedPct}%</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Donut Chart */}
//         <div className="h-80">
//           {aggregatedData.total > 0 ? (
//             <Plot
//               data={plotData}
//               layout={layout}
//               config={config}
//               style={{ width: '100%', height: '100%' }}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-slate-500">
//               <div className="text-center">
//                 <div className="text-2xl mb-2">📊</div>
//                 <p>No data available</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }