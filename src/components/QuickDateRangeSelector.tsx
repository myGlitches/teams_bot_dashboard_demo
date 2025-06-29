// components/QuickRangeSelector.tsx
import { useMetricsStore } from "@/store/useMetricsStore"
import { Button } from "@/components/ui/button"
import { addHours, subDays } from "date-fns"

const quickOptions = [
  { label: "12h", value: "12h" },
  { label: "1d", value: "1d" },
  { label: "7d", value: "7d" },
  { label: "14d", value: "14d" },
  { label: "30d", value: "30d" },
]

export default function QuickRangeSelector() {
  const { setStartDate, setEndDate, setQuickRange, quickRange } = useMetricsStore()

  const handleSelect = (range: string) => {
    const now = new Date()
    let from: Date

    switch (range) {
      case "12h":
        from = addHours(now, -12)
        break
      case "1d":
        from = subDays(now, 1)
        break
      case "7d":
        from = subDays(now, 7)
        break
      case "14d":
        from = subDays(now, 14)
        break
      case "30d":
        from = subDays(now, 30)
        break
      default:
        from = subDays(now, 7)
    }

    setStartDate(from)
    setEndDate(now)
    setQuickRange(range as any)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {quickOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            onClick={() => handleSelect(option.value)}
            className={`rounded-md ${
              quickRange === option.value
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
