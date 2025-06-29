import { ReactNode } from "react"
import QuickRangeSelector from "./QuickDateRangeSelector"
import { Button } from "./ui/button"
import { Bot, LayoutDashboard } from "lucide-react"
import { MultiSelect } from "./ui/multi-select"
import { useMetricsStore } from "@/store/useMetricsStore"

interface LayoutProps {
  children: ReactNode
  activeView: string
  setActiveView: (view: "builder" | "insights") => void
}

const CITY_OPTIONS = ["New York", "London", "Mumbai"]
const USER_TYPE_OPTIONS = ["customer", "operative"] // ✅ Add user type options

const Layout = ({ children, activeView, setActiveView }: LayoutProps) => {
  const { 
    getGlobalCityFilter, 
    setGlobalCityFilter,
    getGlobalUserTypeFilter, // ✅ Add global user type filter
    setGlobalUserTypeFilter  // ✅ Add global user type setter
  } = useMetricsStore()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 sticky top-0 h-screen shadow-sm">
        <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center mb-6">
          <Bot className="h-6 w-6 text-white" />
        </div>

        <div className="flex-1 flex flex-col items-center gap-4 mt-6">
          <Button
            variant={activeView === "builder" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-lg ${activeView === "builder" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"}`}
            onClick={() => setActiveView("builder")}
            title="Bot Builder"
          >
            <Bot className="h-5 w-5" />
          </Button>

          <Button
            variant={activeView === "insights" ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-lg ${activeView === "insights" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"}`}
            onClick={() => setActiveView("insights")}
            title="Analytics Dashboard"
          >
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* Main section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white shadow-sm z-10">
          <div className="w-full px-4 flex items-center justify-between py-2">
            <h1 className="text-lg font-semibold text-slate-800">Bot Builder</h1>
            <div className="flex items-center gap-4">
              {/* ✅ Global City Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">City:</label>
                <MultiSelect
                  options={CITY_OPTIONS.map((c) => ({ label: c, value: c }))}
                  selected={getGlobalCityFilter()}
                  onChange={setGlobalCityFilter}
                  placeholder="All Cities"
                />
              </div>
              
              {/* ✅ Global User Type Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">User Type:</label>
                <MultiSelect
                  options={USER_TYPE_OPTIONS.map((t) => ({ label: t, value: t }))}
                  selected={getGlobalUserTypeFilter()}
                  onChange={setGlobalUserTypeFilter}
                  placeholder="All Types"
                />
              </div>
              
              <QuickRangeSelector />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout