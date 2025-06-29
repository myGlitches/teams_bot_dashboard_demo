// src/components/graphs/PerformanceCombinationChart.tsx

import { useMemo } from "react"
import Plot from 'react-plotly.js'
import { useMetricsStore } from "@/store/useMetricsStore"
import { selfServiceData } from "@/lib/data/selfServiceData"

export function PerformanceCombinationChart() {
  const { 
    startDate, 
    endDate,
    getGraphFilters,
    getGlobalCityFilter,     // ✅ Global city filter
    getGlobalUserTypeFilter, // ✅ Global user type filter
  } = useMetricsStore()

  // Get filters for performance combination chart
  const filters = getGraphFilters('performanceCombination')
  const globalCities = getGlobalCityFilter()         // ✅ Get global cities
  const globalUserTypes = getGlobalUserTypeFilter() // ✅ Get global user types

  // Filter and aggregate data by date
  const chartData = useMemo(() => {
    const filtered = selfServiceData.filter((d) => {
      const dt = new Date(d.date)
      const dateInRange = dt >= startDate && dt <= endDate
      
      // ✅ UPDATED: Use both global filters instead of graph-specific
      const cityMatch = globalCities.length === 0 || globalCities.includes(d.city)
      const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)
      const productMatch = filters.product.length === 0 || filters.product.includes(d.product)
      const storeIdMatch = filters.storeId.length === 0 || filters.storeId.includes(d.storeId)
      
      return dateInRange && cityMatch && userTypeMatch && productMatch && storeIdMatch
    })

    // Group by date
    const grouped = filtered.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = { resolved: 0, notResolved: 0, abandoned: 0, total: 0 }
      }
      acc[curr.date].resolved += curr.resolvedSessions
      acc[curr.date].notResolved += curr.notResolvedSessions
      acc[curr.date].abandoned += curr.abandonedSessions
      acc[curr.date].total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
      return acc
    }, {} as Record<string, { resolved: number, notResolved: number, abandoned: number, total: number }>)

    // Calculate percentages and format data
    const result = Object.entries(grouped)
      .map(([date, data]) => ({
        date,
        conversations: data.total,
        selfServicePct: data.total > 0 ? (data.resolved / data.total) * 100 : 0,
        externalEscalationPct: data.total > 0 ? (data.notResolved / data.total) * 100 : 0,
        abandonedPct: data.total > 0 ? (data.abandoned / data.total) * 100 : 0
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return result
  }, [startDate, endDate, globalCities, globalUserTypes, filters]) // ✅ Add both global filters to deps

  // Clean, simple color scheme
  const plotData = [
    // Conversations (Peach bars)
    {
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.conversations),
      name: 'Conversations',
      type: 'bar' as const,
      marker: {
        color: '#fed7aa', // peach color
        line: {
          color: '#f97316',
          width: 1
        }
      },
      yaxis: 'y',
      hovertemplate: '<b>Conversations</b><br>' +
                    'Date: %{x}<br>' +
                    'Count: %{y:,}<br>' +
                    '<extra></extra>'
    },
    // Self Service Resolution % (Green line)
    {
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.selfServicePct),
      name: 'Self Service Resolution %',
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      line: {
        color: '#16a34a', // green
        width: 3
      },
      marker: {
        color: '#16a34a',
        size: 7,
        symbol: 'circle'
      },
      yaxis: 'y2',
      hovertemplate: '<b>Self Service Resolution</b><br>' +
                    'Date: %{x}<br>' +
                    'Rate: %{y:.1f}%<br>' +
                    '<extra></extra>'
    },
    // External Escalation % (Red line)
    {
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.externalEscalationPct),
      name: 'External Escalation %',
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      line: {
        color: '#dc2626', // red
        width: 3
      },
      marker: {
        color: '#dc2626',
        size: 7,
        symbol: 'circle'
      },
      yaxis: 'y2',
      hovertemplate: '<b>External Escalation</b><br>' +
                    'Date: %{x}<br>' +
                    'Rate: %{y:.1f}%<br>' +
                    '<extra></extra>'
    },
    // Abandoned Conversations % (Yellow line)
    {
      x: chartData.map(d => d.date),
      y: chartData.map(d => d.abandonedPct),
      name: 'Abandoned Conversations %',
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      line: {
        color: '#eab308', // yellow
        width: 3
      },
      marker: {
        color: '#eab308',
        size: 7,
        symbol: 'circle'
      },
      yaxis: 'y2',
      hovertemplate: '<b>Abandoned Conversations</b><br>' +
                    'Date: %{x}<br>' +
                    'Rate: %{y:.1f}%<br>' +
                    '<extra></extra>'
    }
  ]

  const layout = {
    title: {
      text: 'Performance - Last Period',
      font: { size: 16, color: '#1f2937' },
      x: 0
    },
    showlegend: true,
    legend: {
      orientation: 'h' as const,
      x: 0,
      y: 1.1,
      font: { size: 11, color: '#6b7280' }
    },
    xaxis: {
      title: { text: 'Date' },
      showgrid: false,
      zeroline: false,
      tickangle: -45,
      tickfont: { size: 10, color: '#6b7280' }
    },
    yaxis: {
      title: {
        text: 'Conversations',
        font: { size: 12, color: '#6b7280' }
      },
      showgrid: true,
      gridcolor: '#f3f4f6',
      zeroline: false,
      tickfont: { size: 10, color: '#6b7280' }
    },
    yaxis2: {
      title: {
        text: 'Percentage (%)',
        font: { size: 12, color: '#6b7280' }
      },
      overlaying: 'y' as const,
      side: 'right' as const,
      showgrid: false,
      zeroline: false,
      tickfont: { size: 10, color: '#6b7280' },
      range: [0, 100]
    },
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    margin: { l: 60, r: 60, t: 80, b: 80 }
  }

  const config = {
    displayModeBar: false,
    responsive: true
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">    
      <div className="h-96">
        {chartData.length > 0 ? (
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
              <p>No data available for the selected filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}