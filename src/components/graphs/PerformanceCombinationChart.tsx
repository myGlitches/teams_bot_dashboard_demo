import { useMemo, useState } from "react"
import Plot from 'react-plotly.js'
import { useMetricsStore } from "@/store/useMetricsStore"
import { selfServiceData30Days } from "@/lib/data/comprehensiveFulldata"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import TypeableStoreFilter from "../filters/TypeableStoreFilter"

const PRODUCT_OPTIONS = ["Hennypenny Fryer 1", "Hennypenny Fryer 2", "Commercial Oven"]

// Dimension options for the dropdown
const DIMENSION_OPTIONS = [
  { label: "User", value: "userType" },
  { label: "Products", value: "product" },
  { label: "Cities", value: "city" }
]

export function PerformanceCombinationChart() {
  const { 
    startDate, 
    endDate,
    getGraphFilters,
    setGraphProduct,
    setGraphStoreId,
    getGlobalCityFilter,
    getGlobalUserTypeFilter,
  } = useMetricsStore()

  // Local state for selected dimension
  const [selectedDimension, setSelectedDimension] = useState<string[]>([])

  // Get filters for performance combination chart
  const filters = getGraphFilters('performanceCombination')
  const globalCities = getGlobalCityFilter()
  const globalUserTypes = getGlobalUserTypeFilter()

  const handleProductChange = (values: string[]) => {
    setGraphProduct('performanceCombination', values)
  }

  const handleStoreIdChange = (values: string[]) => {
    setGraphStoreId('performanceCombination', values)
  }

  const handleDimensionChange = (values: string[]) => {
    setSelectedDimension(values)
  }

  // Filter and aggregate data by date
  const chartData = useMemo(() => {
    const filtered = selfServiceData30Days.filter((d) => {
      const dt = new Date(d.date)
      const dateInRange = dt >= startDate && dt <= endDate
      
      const cityMatch = globalCities.length === 0 || globalCities.includes(d.city)
      const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)
      const productMatch = filters.product.length === 0 || filters.product.includes(d.product)
      const storeIdMatch = filters.storeId.length === 0 || filters.storeId.includes(d.storeId)
      
      return dateInRange && cityMatch && userTypeMatch && productMatch && storeIdMatch
    })

    // If no dimension is selected, aggregate all data by date
    if (selectedDimension.length === 0) {
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

      const result = Object.entries(grouped)
        .map(([date, data]) => ({
          date,
          conversations: data.total,
          selfServicePct: data.total > 0 ? (data.resolved / data.total) * 100 : 0,
          externalEscalationPct: data.total > 0 ? (data.notResolved / data.total) * 100 : 0,
          abandonedPct: data.total > 0 ? (data.abandoned / data.total) * 100 : 0,
          dimensionKey: "Total"
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      return result
    }

    // If dimensions are selected, group by dimension combinations and then by date
    const dimensionGrouped = filtered.reduce((acc, curr) => {
      const combinationValues = selectedDimension.map(dim => curr[dim as keyof typeof curr] as string)
      const dimensionKey = combinationValues.join(" - ")
      
      if (!acc[dimensionKey]) {
        acc[dimensionKey] = {}
      }
      
      if (!acc[dimensionKey][curr.date]) {
        acc[dimensionKey][curr.date] = { resolved: 0, notResolved: 0, abandoned: 0, total: 0 }
      }
      
      acc[dimensionKey][curr.date].resolved += curr.resolvedSessions
      acc[dimensionKey][curr.date].notResolved += curr.notResolvedSessions
      acc[dimensionKey][curr.date].abandoned += curr.abandonedSessions
      acc[dimensionKey][curr.date].total += curr.resolvedSessions + curr.notResolvedSessions + curr.abandonedSessions
      
      return acc
    }, {} as Record<string, Record<string, { resolved: number, notResolved: number, abandoned: number, total: number }>>)

    // Convert to chart data format
    const result: Array<{
      date: string,
      conversations: number,
      selfServicePct: number,
      externalEscalationPct: number,
      abandonedPct: number,
      dimensionKey: string
    }> = []

    Object.entries(dimensionGrouped).forEach(([dimensionKey, dateData]) => {
      Object.entries(dateData).forEach(([date, data]) => {
        result.push({
          date,
          conversations: data.total,
          selfServicePct: data.total > 0 ? (data.resolved / data.total) * 100 : 0,
          externalEscalationPct: data.total > 0 ? (data.notResolved / data.total) * 100 : 0,
          abandonedPct: data.total > 0 ? (data.abandoned / data.total) * 100 : 0,
          dimensionKey
        })
      })
    })

    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [startDate, endDate, globalCities, globalUserTypes, filters, selectedDimension])

  // Create plot data based on whether dimensions are selected
  const plotData = useMemo(() => {
    const colors = ['#fed7aa', '#16a34a', '#dc2626', '#eab308']
    
    if (selectedDimension.length === 0) {
      // No dimensions - show single set of traces
      return [
        {
          x: chartData.map(d => d.date),
          y: chartData.map(d => d.conversations),
          name: 'Conversations',
          type: 'bar' as const,
          marker: {
            color: colors[0],
            line: { color: '#f97316', width: 1 }
          },
          yaxis: 'y',
          hovertemplate: '<b>Conversations</b><br>Date: %{x}<br>Count: %{y:,}<br><extra></extra>'
        },
        {
          x: chartData.map(d => d.date),
          y: chartData.map(d => d.selfServicePct),
          name: '% Self-Resolved',
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          line: { color: colors[1], width: 3 },
          marker: { color: colors[1], size: 7, symbol: 'circle' },
          yaxis: 'y2',
          hovertemplate: '<b>% Self-Resolved</b><br>Date: %{x}<br>Rate: %{y:.1f}%<br><extra></extra>'
        },
        {
          x: chartData.map(d => d.date),
          y: chartData.map(d => d.externalEscalationPct),
          name: '% Escalation',
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          line: { color: colors[2], width: 3 },
          marker: { color: colors[2], size: 7, symbol: 'circle' },
          yaxis: 'y2',
          hovertemplate: '<b>% Escalation</b><br>Date: %{x}<br>Rate: %{y:.1f}%<br><extra></extra>'
        },
        {
          x: chartData.map(d => d.date),
          y: chartData.map(d => d.abandonedPct),
          name: '% Abandoned',
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          line: { color: colors[3], width: 3 },
          marker: { color: colors[3], size: 7, symbol: 'circle' },
          yaxis: 'y2',
          hovertemplate: '<b>% Abandoned</b><br>Date: %{x}<br>Rate: %{y:.1f}%<br><extra></extra>'
        }
      ]
    }

    // With dimensions - show traces for each dimension combination
    const dimensionKeys = [...new Set(chartData.map(d => d.dimensionKey))]
    const traces: any[] = []
    
    dimensionKeys.forEach((dimKey, index) => {
      const dimData = chartData.filter(d => d.dimensionKey === dimKey)
      // const baseColor = colors[index % colors.length]
      
      // Only show percentage lines for dimensions (conversations bar would be too cluttered)
      traces.push({
        x: dimData.map(d => d.date),
        y: dimData.map(d => d.selfServicePct),
        name: `${dimKey} - Self-Resolved`,
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        line: { color: colors[1], width: 2, dash: index > 0 ? 'dot' : 'solid' },
        marker: { color: colors[1], size: 5 },
        yaxis: 'y2',
        hovertemplate: `<b>${dimKey} - Self-Resolved</b><br>Date: %{x}<br>Rate: %{y:.1f}%<br><extra></extra>`
      })
    })
    
    return traces
  }, [chartData, selectedDimension])

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
    yaxis: selectedDimension.length === 0 ? {
      title: {
        text: 'Conversations',
        font: { size: 12, color: '#6b7280' }
      },
      showgrid: true,
      gridcolor: '#f3f4f6',
      zeroline: false,
      tickfont: { size: 10, color: '#6b7280' }
    } : {
      title: {
        text: 'Percentage (%)',
        font: { size: 12, color: '#6b7280' }
      },
      showgrid: true,
      gridcolor: '#f3f4f6',
      zeroline: false,
      tickfont: { size: 10, color: '#6b7280' },
      range: [0, 100]
    },
    yaxis2: selectedDimension.length === 0 ? {
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
    } : undefined,
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
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Performance Combination
            </h3>
          </div>
          <p className="text-sm text-slate-500">Resolution rates and conversation volume</p>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-col">
            <Label className="mb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Dimensions</Label>
            <div className="relative">
            <MultiSelect
              options={DIMENSION_OPTIONS}
              selected={selectedDimension}
              onChange={handleDimensionChange}
              placeholder="No dimension (Total)"
            />
            </div>
          </div>

          
          <div className="flex flex-col">
            <Label className="mb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Product</Label>
            <div className="relative">
              <MultiSelect
                options={PRODUCT_OPTIONS.map((p) => ({ label: p, value: p }))}
                selected={filters.product}
                onChange={handleProductChange}
                placeholder="All products"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <TypeableStoreFilter
                selected={filters.storeId}
                onChange={handleStoreIdChange}
                placeholder="Type store ID..."
                label="Store"
              />
            </div>
          </div>
        </div>
      </div>
    
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