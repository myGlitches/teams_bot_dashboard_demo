import Plot from "react-plotly.js"
import { useMetricsStore } from "@/store/useMetricsStore"
import { useMemo } from "react"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { uniqueUsersData } from "@/lib/data/dummyData"
import { Data } from "plotly.js"
import TypeableStoreFilter from "../filters/TypeableStoreFilter"

// Removed CITY_OPTIONS and USER_TYPE_OPTIONS since they're now global
const PRODUCT_OPTIONS = ["Hennypenny Fryer 1", "Hennypenny Fryer 2", "Commercial Oven"]
const STORE_ID_OPTIONS = ["NYC001", "NYC002", "LON001", "LON002", "MUM001", "MUM002"]

export const UniqueUsersGraph = () => {
  const {
    startDate,
    endDate,
    getGraphFilters,
    setGraphProduct,
    setGraphStoreId,
    getGlobalCityFilter,     // ✅ Global city filter
    getGlobalUserTypeFilter, // ✅ Global user type filter
  } = useMetricsStore()

  // Get filters specific to this graph
  const filters = getGraphFilters('uniqueUsers')
  const globalCities = getGlobalCityFilter()         // ✅ Get global cities
  const globalUserTypes = getGlobalUserTypeFilter() // ✅ Get global user types

  const handleProductChange = (values: string[]) => {
    setGraphProduct('uniqueUsers', values)
  }

  const handleStoreIdChange = (values: string[]) => {
    setGraphStoreId('uniqueUsers', values)
  }

  // ✅ UPDATED: Use both global filters in data filtering
  const data = useMemo(() => {
    return uniqueUsersData.filter((d) => {
      const dt = new Date(d.date)
      return (
        dt >= startDate &&
        dt <= endDate &&
        (globalCities.length === 0 || globalCities.includes(d.city)) &&           // ✅ Global city filter
        (globalUserTypes.length === 0 || globalUserTypes.includes(d.userType)) && // ✅ Global user type filter
        (filters.product.length === 0 || filters.product.includes(d.product)) &&
        (filters.storeId.length === 0 || filters.storeId.includes(d.storeId))
      )
    })
  }, [startDate, endDate, globalCities, globalUserTypes, filters]) // ✅ Add both global filters to deps

  const traces: Data[] = useMemo(() => {
    // ✅ Use global filters instead of graph-specific filters
    const citiesToShow = globalCities.length > 0 ? globalCities : ["New York", "London", "Mumbai"]
    const userTypesToShow = globalUserTypes.length > 0 ? globalUserTypes : ["customer", "operative"]
    const productsToShow = filters.product.length > 0 ? filters.product : PRODUCT_OPTIONS
    const storeIdsToShow = filters.storeId.length > 0 ? filters.storeId : STORE_ID_OPTIONS
    
    const traces: Data[] = []
    const colors = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"]
    let colorIndex = 0

    citiesToShow.forEach(city => {
      userTypesToShow.forEach(userType => {
        productsToShow.forEach(product => {
          storeIdsToShow.forEach(storeId => {
            const filteredData = data.filter(d => 
              d.city === city && 
              d.userType === userType && 
              d.product === product && 
              d.storeId === storeId
            )
            
            if (filteredData.length > 0) {
              const hasValidData = filteredData.some(d => d.uniqueUsers !== undefined)
              if (hasValidData) {
                traces.push({
                  x: filteredData.map(d => d.date),
                  y: filteredData.map(d => d.uniqueUsers!).filter(val => val !== undefined),
                  type: "scatter",
                  mode: "lines+markers",
                  name: `${city} - ${userType} - ${product} - ${storeId}`,
                  line: { color: colors[colorIndex % colors.length] },
                  marker: { size: 6 }
                })
                colorIndex++
              }
            }
          })
        })
      })
    })

    return traces
  }, [data, globalCities, globalUserTypes, filters]) // ✅ Add both global filters to deps

  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-white/60 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/5 to-green-500/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="relative p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
                Unique Users
              </h3>
            </div>
            <p className="text-sm text-slate-500">Active user growth trends</p>
          </div>
          
          {/* ✅ Removed City and User Type filters - now handled globally */}
          <div className="flex gap-3 flex-wrap">
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