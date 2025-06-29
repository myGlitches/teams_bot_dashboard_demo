import Plot from "react-plotly.js"
import { useMetricsStore } from "@/store/useMetricsStore"
import { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { uniqueUsersData30Days } from "@/lib/data/comprehensiveFulldata"
import { Data } from "plotly.js"
import TypeableStoreFilter from "../filters/TypeableStoreFilter"

const PRODUCT_OPTIONS = ["Hennypenny Fryer 1", "Hennypenny Fryer 2", "Commercial Oven"]

// Dimension options for the dropdown
const DIMENSION_OPTIONS = [
  { label: "User", value: "userType" },
  { label: "Products", value: "product" },
  { label: "Cities", value: "city" }
]

export const UniqueUsersGraph = () => {
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

  // Get filters specific to this graph
  const filters = getGraphFilters('uniqueUsers')
  const globalCities = getGlobalCityFilter()
  const globalUserTypes = getGlobalUserTypeFilter()

  const handleProductChange = (values: string[]) => {
    setGraphProduct('uniqueUsers', values)
  }

  const handleStoreIdChange = (values: string[]) => {
    setGraphStoreId('uniqueUsers', values)
  }

  const handleDimensionChange = (values: string[]) => {
    setSelectedDimension(values)
  }

  // Filter and process data based on global filters and graph-specific filters
  const data = useMemo(() => {
    return uniqueUsersData30Days.filter((d) => {
      const dt = new Date(d.date)
      return (
        dt >= startDate &&
        dt <= endDate &&
        (globalCities.length === 0 || globalCities.includes(d.city)) &&
        (globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)) &&
        (filters.product.length === 0 || filters.product.includes(d.product)) &&
        (filters.storeId.length === 0 || filters.storeId.includes(d.storeId))
      )
    })
  }, [startDate, endDate, globalCities, globalUserTypes, filters])

  const traces: Data[] = useMemo(() => {
    const colors = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"]

    // If no dimension is selected, show total aggregated data
    if (selectedDimension.length === 0) {
      // Group by date and sum all users
      const aggregatedData = data.reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = 0
        }
        acc[curr.date] += curr.uniqueUsers || 0
        return acc
      }, {} as Record<string, number>)

      const sortedDates = Object.keys(aggregatedData).sort()
      
      return [{
        x: sortedDates,
        y: sortedDates.map(date => aggregatedData[date]),
        type: "scatter",
        mode: "lines+markers",
        name: "Total Unique Users",
        line: { color: colors[0], width: 3 },
        marker: { size: 8 }
      }]
    }

    // Generate all unique combinations of the selected dimensions
    const traces: Data[] = []
    let colorIndex = 0
    
    // Create a map to store unique combinations and their aggregated data
    const combinationMap = new Map<string, Record<string, number>>()
    
    // Process each data point
    data.forEach(item => {
      // Create combination key based on selected dimensions
      const combinationValues = selectedDimension.map(dim => item[dim as keyof typeof item] as string)
      const combinationKey = combinationValues.join(" - ")
      
      // Initialize the combination if it doesn't exist
      if (!combinationMap.has(combinationKey)) {
        combinationMap.set(combinationKey, {})
      }
      
      // Add users to the combination for this date
      const combinationData = combinationMap.get(combinationKey)!
      if (!combinationData[item.date]) {
        combinationData[item.date] = 0
      }
      combinationData[item.date] += item.uniqueUsers || 0
    })
    
    // Convert the map to traces
    combinationMap.forEach((dateData, combinationKey) => {
      const sortedDates = Object.keys(dateData).sort()
      
      if (sortedDates.length > 0 && sortedDates.some(date => dateData[date] > 0)) {
        traces.push({
          x: sortedDates,
          y: sortedDates.map(date => dateData[date] || 0),
          type: "scatter",
          mode: "lines+markers",
          name: combinationKey,
          line: { color: colors[colorIndex % colors.length], width: 3 },
          marker: { size: 6 }
        })
        colorIndex++
      }
    })

    return traces
  }, [data, selectedDimension])

  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-white/60 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/5 to-green-500/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="relative p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
                Unique Users
              </h3>
            </div>
            <p className="text-sm text-slate-500">Active user growth trends</p>
          </div>
          
          {/* FIXED FILTER SECTION */}
          <div className="flex items-end gap-1 flex-wrap min-w-0">
            {/* Dimensions Dropdown */}
            <div className="flex flex-col min-w-0" style={{minWidth: '120px'}}>
              <Label className="mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Dimensions</Label>
              <div className="relative" style={{minWidth: '120px'}}>
                <MultiSelect
                  options={DIMENSION_OPTIONS}
                  selected={selectedDimension}
                  onChange={handleDimensionChange}
                  placeholder="No dimension (Total)"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0" style={{minWidth: '120px'}}>
              <Label className="mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">Product</Label>
              <div className="relative" style={{minWidth: '120px'}}>
                <MultiSelect
                  options={PRODUCT_OPTIONS.map((p) => ({ label: p, value: p }))}
                  selected={filters.product}
                  onChange={handleProductChange}
                  placeholder="All products"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0" style={{minWidth: '100px', maxWidth: '100px' }}>
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

        <div className="relative">
          <Plot
            data={traces}
            layout={{
              margin: { t: 20, b: 80, l: 60, r: 40 },
              xaxis: { 
                title: { text: "Date", font: { size: 12, color: "#64748b" } }, 
                tickangle: -30,
                gridcolor: "#f1f5f9",
                tickfont: { size: 11, color: "#64748b" }
              },
              yaxis: { 
                title: { text: "Users", font: { size: 12, color: "#64748b" } },
                gridcolor: "#f1f5f9",
                tickfont: { size: 11, color: "#64748b" }
              },
              hovermode: "x unified",
              legend: { 
                orientation: "h", 
                y: -0.35,
                x: 0,
                xanchor: "left",
                font: { size: 11, color: "#475569" }
              },
              plot_bgcolor: "rgba(0,0,0,0)",
              paper_bgcolor: "rgba(0,0,0,0)",
              font: { family: "Inter, system-ui, sans-serif" }
            }}
            config={{ 
              displaylogo: false, 
              responsive: true,
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </div>
    </div>
  )
}