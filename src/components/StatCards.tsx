import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, Activity, BarChart2, PieChart, Users, MessageCircle, Clock } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  resolved: <CheckCircle className="w-5 h-5 text-green-500" />,
  notResolved: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  abandoned: <Activity className="w-5 h-5 text-slate-500" />,
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
    iconType?: "resolved" | "notResolved" | "abandoned" | "ssr" | "abandonRate" | "notResolvedRate" | "totalSessions" | "totalConversations" | "avgMessagesPerSession" | "avgLatency" | "totalUsers"
    description?: string
    className?: string
}

const StatCard = ({
  title,
  value,
  iconType,
  description,
  className = "",
}: StatCardProps) => (
  <div
    className={cn(
      "bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between",
      className
    )}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-slate-500 font-medium">{title}</span>
      {iconType && iconMap[iconType]}
    </div>
    <span className="text-3xl font-semibold text-slate-800 leading-snug">{value}</span>
    {description && (
      <span className="text-xs text-slate-400 mt-1 leading-tight">{description}</span>
    )}
  </div>
)

export default StatCard
