// src/components/graphs/ResolutionBreakdownDonut.tsx

import { useMemo } from "react"
import Plot from 'react-plotly.js'
import { useMetricsStore } from "@/store/useMetricsStore"
import { selfServiceData } from "@/lib/data/selfServiceData"

export function ResolutionBreakdownDonut() {
  const { 
    startDate, 
    endDate,
    getGraphFilters,
    getGlobalCityFilter, // ✅ Add global city filter
  } = useMetricsStore()

  // Get filters for resolution breakdown chart
  const filters = getGraphFilters('resolutionBreakdown')
  const globalCities = getGlobalCityFilter() // ✅ Get global cities

  // Filter and aggregate data
  const aggregatedData = useMemo(() => {
    const filtered = selfServiceData.filter((d) => {
      const dt = new Date(d.date)
      const dateInRange = dt >= startDate && dt <= endDate
      
      // ✅ FIXED: Use global city filter instead of graph-specific
      const cityMatch = globalCities.length === 0 || globalCities.includes(d.city)
      const userTypeMatch = filters.userType.length === 0 || filters.userType.includes(d.userType)
      const productMatch = filters.product.length === 0 || filters.product.includes(d.product)
      const storeIdMatch = filters.storeId.length === 0 || filters.storeId.includes(d.storeId)
      
      return dateInRange && cityMatch && userTypeMatch && productMatch && storeIdMatch
    })

    return filtered.reduce((acc, curr) => {
      acc.resolved += curr.resolvedSessions
      acc.notResolved += curr.notResolvedSessions
      acc.abandoned += curr.abandonedSessions
      acc.total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
      return acc
    }, { resolved: 0, notResolved: 0, abandoned: 0, total: 0 })
  }, [startDate, endDate, globalCities, filters]) // ✅ Add globalCities to deps

  // Calculate percentages
  const resolvedPct = aggregatedData.total > 0 ? ((aggregatedData.resolved / aggregatedData.total) * 100).toFixed(2) : "0.00"
  const abandonedDuringServicePct = aggregatedData.total > 0 ? ((aggregatedData.abandoned / aggregatedData.total) * 100).toFixed(2) : "0.00"
  const externalEscalationPct = aggregatedData.total > 0 ? ((aggregatedData.notResolved / aggregatedData.total) * 100).toFixed(2) : "0.00"

  // Create donut chart data matching the reference
  const plotData = [{
    values: [
      aggregatedData.resolved,
      aggregatedData.abandoned,
      aggregatedData.notResolved,
    ],
    labels: [
      'Self-service resolution',
      'Abandoned during self service',
      'External escalation submitted',
    ],
    type: 'pie' as const,
    hole: 0.5,
    marker: {
      colors: [
        '#22c55e', // green - Self-service resolution
        '#fbbf24', // amber - Abandoned during self service
        '#3b82f6', // blue - External escalation submitted
      ],
      line: {
        color: '#ffffff',
        width: 2
      }
    },
    textinfo: 'none' as const,
    hovertemplate: '<b>%{label}</b><br>' +
                  'Count: %{value}<br>' +
                  'Percentage: %{percent}<br>' +
                  '<extra></extra>'
  }]

  const layout = {
    showlegend: false,
    annotations: [
      {
        text: `<span style="font-size: 24px; color: #1e293b; font-weight: bold;">${aggregatedData.total.toLocaleString()}</span><br><span style="font-size: 12px; color: #64748b;">TOTAL</span>`,
        x: 0.5,
        y: 0.5,
        font: { size: 14, color: '#64748b' },
        showarrow: false,
        align: 'center' as const
      }
    ],
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    margin: { l: 0, r: 0, t: 0, b: 0 }
  }

  const config = {
    displayModeBar: false,
    responsive: true
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div className="flex-1">
              <div className="font-medium text-slate-900">Self-service resolution</div>
              <div className="text-lg font-bold text-slate-700">{resolvedPct}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-amber-400"></div>
            <div className="flex-1">
              <div className="font-medium text-slate-900">Abandoned during self service</div>
              <div className="text-lg font-bold text-slate-700">{abandonedDuringServicePct}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <div className="font-medium text-slate-900">External escalation submitted</div>
              <div className="text-lg font-bold text-slate-700">{externalEscalationPct}%</div>
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="h-80">
          {aggregatedData.total > 0 ? (
            <Plot
              data={plotData}
              layout={layout}
              config={config}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <p>No data available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}