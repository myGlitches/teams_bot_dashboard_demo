import Plot from "react-plotly.js"
import type { PlotData } from "plotly.js" 

const usageMetrics = [
  { month: "Jan", sessions: 300, users: 120, conversations: 270, messagesPerSession: 5 },
  { month: "Feb", sessions: 420, users: 180, conversations: 400, messagesPerSession: 4.3 },
  { month: "Mar", sessions: 500, users: 220, conversations: 450, messagesPerSession: 6 },
]

const outcomeMetrics = [
  { month: "Jan", resolved: 200, notResolved: 40, abandoned: 60 },
  { month: "Feb", resolved: 310, notResolved: 45, abandoned: 65 },
  { month: "Mar", resolved: 360, notResolved: 50, abandoned: 90 },
]

const months = usageMetrics.map((m) => m.month)

const sessionsTrace: Partial<PlotData> = {
  x: months,
  y: usageMetrics.map((m) => m.sessions),
  name: "Total Sessions",
  type: "bar",
  marker: { color: "#3b82f6" },
}

const usersTrace: Partial<PlotData> = {
  x: months,
  y: usageMetrics.map((m) => m.users),
  name: "Unique Users",
  type: "scatter",
  mode: "lines+markers",
  yaxis: "y2",
  line: { color: "#10b981", width: 3 },
}

const outcomeTrace: Partial<PlotData> = {
  x: months,
  y: outcomeMetrics.map((m) => m.resolved),
  name: "Resolved",
  type: "bar",
  marker: { color: "#22c55e" },
}

const notResolvedTrace: Partial<PlotData> = {
  x: months,
  y: outcomeMetrics.map((m) => m.notResolved),
  name: "Not Resolved",
  type: "bar",
  marker: { color: "#f97316" },
}

const abandonedTrace: Partial<PlotData> = {
  x: months,
  y: outcomeMetrics.map((m) => m.abandoned),
  name: "Abandoned",
  type: "bar",
  marker: { color: "#ef4444" },
}

const BotMetricCharts = () => {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Volume & Reach Chart */}
      <Plot
        data={[sessionsTrace, usersTrace]}
        layout={{
          title: { text: "Volume & Reach" },
          barmode: "group",
          yaxis: { title: { text: "Sessions" } },
          yaxis2: {
            title: { text: "Users" },
            overlaying: "y",
            side: "right",
          },
          margin: { t: 40, b: 40, l: 40, r: 40 },
          legend: { orientation: "h" },
        }}
        config={{ displaylogo: false }}
        style={{ width: "100%", maxWidth: "600px", height: "400px" }}
      />

      {/* Outcome & Quality Chart */}
      <Plot
        data={[outcomeTrace, notResolvedTrace, abandonedTrace]}
        layout={{
          title: { text: "Outcome & Quality" },
          barmode: "stack",
          yaxis: { title: { text: "Sessions" } },
          margin: { t: 40, b: 40, l: 40, r: 40 },
          legend: { orientation: "h" },
        }}
        config={{ displaylogo: false }}
        style={{ width: "100%", maxWidth: "600px", height: "400px" }}
      />
    </div>
  )
}

export default BotMetricCharts
