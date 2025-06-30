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
  className = "",
  tooltipDescription,
}: StatCardProps) => {
  // Limit character count for title to prevent line wrapping
  const maxTitleLength = 20  // Adjust this number based on your card width
  const truncatedTitle = title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title
  const showTooltip = title.length > maxTitleLength || tooltipDescription

  const cardContent = (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span 
          className="text-sm text-slate-500 font-medium truncate max-w-[120px]" 
          title={title}
        >
          {truncatedTitle}
        </span>
        {iconType && (
          <div className="flex-shrink-0 ml-2">
            {iconMap[iconType]}
          </div>
        )}
      </div>
      <span className="text-3xl font-semibold text-slate-800 leading-snug break-words">{value}</span>
      {/* {description && (
        <span className="text-xs text-slate-400 mt-1 leading-tight truncate">{description}</span>
      )} */}
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