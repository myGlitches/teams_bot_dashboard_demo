import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, Activity, BarChart2, PieChart, Users, MessageCircle, Clock, ArrowUpCircle, XCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const iconMap: Record<string, React.ReactNode> = {
  resolved: <CheckCircle className="w-5 h-5 text-green-500" />,
  notResolved: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  abandoned: <XCircle className="w-5 h-5 text-red-500" />,
  escalations: <ArrowUpCircle className="w-5 h-5 text-orange-500" />,
  ssr: <BarChart2 className="w-5 h-5 text-blue-500" />,
  abandonRate: <PieChart className="w-5 h-5 text-gray-500" />,
  notResolvedRate: <AlertTriangle className="w-5 h-5 text-red-500" />,
  totalSessions: <Users className="w-5 h-5 text-blue-500" />,
  totalConversations: <MessageCircle className="w-5 h-5 text-purple-500" />,
  avgMessagesPerSession: <Activity className="w-5 h-5 text-green-500" />,
  avgLatency: <Clock className="w-5 h-5 text-orange-500" />,
  totalUsers: <Users className="w-5 h-5 text-blue-500" />,
}

interface StatCardProps {
    title: string
    value: string | number
    iconType?: "resolved" | "notResolved" | "abandoned" | "escalations" | "ssr" | "abandonRate" | "notResolvedRate" | "totalSessions" | "totalConversations" | "avgMessagesPerSession" | "avgLatency" | "totalUsers"
    description?: string
    className?: string
    tooltipDescription?: string
}

const StatCard = ({
  title,
  value,
  iconType,
  description,
  className = "",
  tooltipDescription,
}: StatCardProps) => {
  const truncatedTitle = title.length > 15 ? `${title.slice(0, 15)}...` : title
  const showTooltip = title.length > 15 || tooltipDescription

  const cardContent = (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-500 font-medium" title={title}>
          {truncatedTitle}
        </span>
        {iconType && iconMap[iconType]}
      </div>
      <span className="text-3xl font-semibold text-slate-800 leading-snug">{value}</span>
      {description && (
        <span className="text-xs text-slate-400 mt-1 leading-tight">{description}</span>
      )}
    </div>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4} className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium text-slate-900">{title}</p>
              {tooltipDescription && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tooltipDescription}
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return cardContent
}

export default StatCard