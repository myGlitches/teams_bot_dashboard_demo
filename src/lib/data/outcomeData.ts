export const outcomeData = [
  { date: "2025-06-21", region: "East", userType: "customer", userId: "u1", outcome: "resolved", platform: "Web", issueType: "Technical", timeOfDay: "Morning", priority: "Low" },
  { date: "2025-06-21", region: "West", userType: "operative", userId: "u2", outcome: "not_resolved", platform: "Mobile", issueType: "Technical", timeOfDay: "Afternoon", priority: "Medium" },
  { date: "2025-06-21", region: "Central", userType: "customer", userId: "u3", outcome: "abandoned", platform: "Web", issueType: "Technical", timeOfDay: "Evening", priority: "High" },
  { date: "2025-06-22", region: "East", userType: "operative", userId: "u4", outcome: "resolved", platform: "Mobile", issueType: "Technical", timeOfDay: "Morning", priority: "Low" },
  { date: "2025-06-22", region: "West", userType: "customer", userId: "u5", outcome: "resolved", platform: "Web", issueType: "Technical", timeOfDay: "Afternoon", priority: "Medium" },
  { date: "2025-06-22", region: "Central", userType: "customer", userId: "u6", outcome: "abandoned", platform: "Mobile", issueType: "Technical", timeOfDay: "Evening", priority: "High" },
  { date: "2025-06-23", region: "West", userType: "customer", userId: "u7", outcome: "not_resolved", platform: "Web", issueType: "Technical", timeOfDay: "Morning", priority: "Low" },
  { date: "2025-06-23", region: "West", userType: "operative", userId: "u8", outcome: "not_resolved", platform: "Mobile", issueType: "Technical", timeOfDay: "Afternoon", priority: "Medium" },
  { date: "2025-06-24", region: "East", userType: "operative", userId: "u9", outcome: "resolved", platform: "Web", issueType: "Technical", timeOfDay: "Evening", priority: "High" },
  { date: "2025-06-24", region: "Central", userType: "customer", userId: "u10", outcome: "abandoned", platform: "Mobile", issueType: "Technical", timeOfDay: "Morning", priority: "Low" },
  { date: "2025-06-25", region: "West", userType: "customer", userId: "u11", outcome: "resolved", platform: "Web", issueType: "Technical", timeOfDay: "Afternoon", priority: "Medium" },
  { date: "2025-06-25", region: "Central", userType: "operative", userId: "u12", outcome: "not_resolved", platform: "Mobile", issueType: "Technical", timeOfDay: "Evening", priority: "High" },
  { date: "2025-06-26", region: "East", userType: "customer", userId: "u13", outcome: "abandoned", platform: "Web", issueType: "Technical", timeOfDay: "Morning", priority: "Low" },
  { date: "2025-06-26", region: "West", userType: "operative", userId: "u14", outcome: "resolved", platform: "Mobile", issueType: "Technical", timeOfDay: "Afternoon", priority: "Medium" },
  { date: "2025-06-27", region: "Central", userType: "customer", userId: "u15", outcome: "resolved", platform: "Web", issueType: "Technical", timeOfDay: "Evening", priority: "High" },
]

export const DIMENSION_OPTIONS = [
    { key: "region", label: "Region" },
    { key: "userType", label: "User Type" },
    { key: "platform", label: "Platform" },
    { key: "issueType", label: "Issue Type" },
    { key: "timeOfDay", label: "Time of Day" },
    { key: "priority", label: "Priority" },
  ]