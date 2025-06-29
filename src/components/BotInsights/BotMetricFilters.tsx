import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useMetricsStore } from "@/store/useMetricsStore"

const BotMetricFilters = () => {
  const {
    selectedMetrics,
    toggleMetric,
  } = useMetricsStore()

  const METRIC_OPTIONS = [
    { key: "totalSessions", label: "Total Sessions" },
    { key: "totalConversations", label: "Total Conversations" },
    { key: "avgMessagesPerSession", label: "Avg Msgs / Session" },
    { key: "avgLatency", label: "Avg Latency (s)" },
    { key: "uniqueUsers", label: "Unique Users" },
  ]

  return (
    <div className="w-full md:w-64 bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-6">
      {/* Metrics */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-2">Metrics</h3>
        <div className="space-y-2">
          {METRIC_OPTIONS.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={selectedMetrics.includes(key)}
                onCheckedChange={() => toggleMetric(key)}
              />
              <Label htmlFor={key} className="text-sm text-slate-600">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BotMetricFilters
