import { useState, useMemo } from 'react'
import { X, MessageCircleQuestion, Users, TrendingUp, Calendar, Send, BarChart3, Filter } from 'lucide-react'
import { useMetricsStore } from "@/store/useMetricsStore"
import { MultiSelect } from "@/components/ui/multi-select"
import Plot from 'react-plotly.js'

// TypeScript interfaces
interface FAQ {
  id: number
  question: string
  frequency: number
  lastAsked: string
  userTypes: string[]
  cities: string[]
  trending: boolean
  urgency: 'high' | 'medium' | 'low'
  city: string
  userType: string
}

interface TopicData {
  topic: string
  percentage: number
  count: number
  color: string
}

interface PriorityOption {
  label: string
  value: string
}

interface AnswerData {
  faq: FAQ
  answer: string
  tags: string[]
  category: string
  relatedProducts: string[]
}

// Mock FAQ data (added cities array for hover display)
const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I reset my Hennypenny Fryer 1?",
    frequency: 47,
    lastAsked: "2 hours ago",
    userTypes: ["customer", "operative"],
    cities: ["New York", "London"], // Cities where this question is asked
    trending: true,
    urgency: "high",
    city: "New York",
    userType: "customer"
  },
  {
    id: 2,
    question: "What's the recommended cleaning schedule for Commercial Oven?",
    frequency: 32,
    lastAsked: "5 hours ago",
    userTypes: ["customer"],
    cities: ["London", "Mumbai"],
    trending: false,
    urgency: "medium",
    city: "London", 
    userType: "customer"
  },
  {
    id: 3,
    question: "Why is my fryer temperature inconsistent?",
    frequency: 28,
    lastAsked: "1 day ago",
    userTypes: ["operative"],
    cities: ["Mumbai", "London", "New York"],
    trending: true,
    urgency: "high",
    city: "Mumbai",
    userType: "operative"
  },
  {
    id: 4,
    question: "How to calibrate temperature sensors?",
    frequency: 19,
    lastAsked: "3 days ago",
    userTypes: ["operative"],
    cities: ["New York"],
    trending: false,
    urgency: "low",
    city: "New York",
    userType: "operative"
  },
  {
    id: 5,
    question: "What are the warranty terms for kitchen equipment?",
    frequency: 15,
    lastAsked: "1 week ago",
    userTypes: ["customer"],
    cities: ["London", "New York"],
    trending: false,
    urgency: "medium",
    city: "London",
    userType: "customer"
  }
]

// Enhanced topic data
const topicData: TopicData[] = [
  { 
    topic: "Initial Setup", 
    percentage: 40, 
    count: 62, 
    color: "#3b82f6"
  },
  { 
    topic: "The Automated Three-Minute Filtration Process", 
    percentage: 30, 
    count: 47, 
    color: "#10b981"
  },
  { 
    topic: "Understanding the Nuances of the Auto Top-Off System", 
    percentage: 20, 
    count: 31, 
    color: "#f59e0b"
  },
  { 
    topic: "Oil Management", 
    percentage: 10, 
    count: 16, 
    color: "#ef4444"
  }
]

interface FAQManagementProps {
  onAnswerFAQ: (faq: FAQ, callback: () => void) => void
  filteredFAQs: FAQ[]
  priorityFilter: string[]
  setPriorityFilter: (priorities: string[]) => void
}

const FAQManagement = ({ 
  onAnswerFAQ, 
  filteredFAQs,
  priorityFilter,
  setPriorityFilter
}: FAQManagementProps) => {
  const [_faqs, setFaqs] = useState<FAQ[]>(mockFAQs)

  const priorityOptions: PriorityOption[] = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" }
  ]

  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const handleAnswerClick = (faq: FAQ): void => {
    onAnswerFAQ(faq, () => {
      setFaqs(prev => prev.filter(f => f.id !== faq.id))
    })
  }

  return (
    <div className="flex flex-col min-h-0">
      {/* Header with Priority Filter */}
      <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <MessageCircleQuestion className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <h3 className="font-semibold text-slate-900">Unanswered FAQs</h3>
                <p className="text-xs text-slate-600">Questions that need answers</p>
              </div>
            </div>
          </div>
          <div className="flex text-xs text-slate-500 font-medium">

          <div className="flex items-center gap-2 w-full">
            <Filter className="w-4 h-4 text-slate-500" />
            <label className="text-sm font-medium text-slate-700">Priority:</label>
            <MultiSelect
              options={priorityOptions}
              selected={priorityFilter}
              onChange={setPriorityFilter}
              placeholder="All Priorities"
              />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              {filteredFAQs.length} pending
            </div>
          </div>
        </div>
        
        
      </div>

      {/* FAQ List - Free scrolling */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="group bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm hover:border-slate-300 transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Question with trending indicator */}
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-medium text-slate-900 leading-relaxed">
                    {faq.question}
                  </h4>
                  {faq.trending && (
                    <TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>

                {/* Metadata with city tag on hover */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Users className="w-3 h-3" />
                    <span className="font-medium text-slate-900">{faq.frequency}</span>
                    <span>times asked</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-3 h-3" />
                    <span>Last asked {faq.lastAsked}</span>
                  </div>
                  
                  {/* User Types */}
                  <div className="flex items-center gap-2">
                    {faq.userTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-200"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Cities with hover tooltip */}
                  <div className="relative group/cities">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 cursor-help">
                      {faq.cities.length === 1 ? faq.cities[0] : `${faq.cities.length} cities`}
                    </span>
                    {faq.cities.length > 1 && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/cities:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {faq.cities.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  {/* Urgency */}
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getUrgencyColor(faq.urgency)}`}>
                    {faq.urgency} priority
                  </span>
                </div>

                {/* Action */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleAnswerClick(faq)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200"
                  >
                    <Send className="w-3 h-3" />
                    Answer
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <MessageCircleQuestion className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">All caught up!</h4>
              <p className="text-sm text-slate-600">All questions have been answered.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TopicsAnalysisProps {
  filteredTopicData: TopicData[]
}

const TopicsAnalysis = ({ filteredTopicData }: TopicsAnalysisProps) => {
  // Donut chart data
  const donutData = [{
    values: filteredTopicData.map(d => d.count),
    labels: filteredTopicData.map(d => d.topic),
    type: 'pie' as const,
    hole: 0.5,
    marker: {
      colors: filteredTopicData.map(d => d.color),
      line: {
        color: '#ffffff',
        width: 2
      }
    },
    textinfo: 'none' as const,
    hovertemplate: '<b>%{label}</b><br>' +
                  'Questions: %{value}<br>' +
                  'Percentage: %{percent}<br>' +
                  '<extra></extra>'
  }]

  const donutLayout = {
    showlegend: false,
    annotations: [
      {
        text: `<span style="font-size: 18px; color: #1e293b; font-weight: bold;">${filteredTopicData.reduce((sum, d) => sum + d.count, 0)}</span><br><span style="font-size: 10px; color: #64748b;">TOTAL</span>`,
        x: 0.5,
        y: 0.5,
        font: { size: 11, color: '#64748b' },
        showarrow: false,
        align: 'center' as const
      }
    ],
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    margin: { l: 0, r: 0, t: 0, b: 0 }
  }

  const donutConfig = {
    displayModeBar: false,
    responsive: true
  }

  return (
    <div className="flex flex-col min-h-0">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Topic Analytics</h3>
            <p className="text-xs text-slate-600">Popular question categories</p>
          </div>
        </div>
      </div>

      {/* Content - Free scrolling */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="h-48">
              <Plot
                data={donutData}
                layout={donutLayout}
                config={donutConfig}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          {/* Simplified Topic List */}
          <div className="space-y-3">
            {filteredTopicData.map((item) => (
              <div key={item.topic} className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {item.topic}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                      <div className="text-sm font-bold text-slate-900 min-w-0">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface AnswerFAQDialogProps {
  faq: FAQ | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AnswerData) => void
}

const AnswerFAQDialog = ({ faq, isOpen, onClose, onSubmit }: AnswerFAQDialogProps) => {
  const [answer, setAnswer] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [relatedProducts, setRelatedProducts] = useState<string>('')

  const handleSubmit = (): void => {
    if (answer.trim() && faq) {
      onSubmit({
        faq,
        answer: answer.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        category: category.trim(),
        relatedProducts: relatedProducts.split(',').map(p => p.trim()).filter(Boolean)
      })
      setAnswer('')
      setTags('')
      setCategory('')
      setRelatedProducts('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <MessageCircleQuestion className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Answer FAQ</h3>
              <p className="text-xs text-slate-600">Provide a comprehensive answer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-slate-900 mb-2">{faq?.question}</h4>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {faq?.frequency} times asked
              </span>
              <span>Last asked {faq?.lastAsked}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide a detailed, helpful answer..."
                className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Troubleshooting"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="reset, temperature"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Related Products</label>
              <input
                type="text"
                value={relatedProducts}
                onChange={(e) => setRelatedProducts(e.target.value)}
                placeholder="Hennypenny Fryer 1, Commercial Oven"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Save Answer
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FAQWithSuccess extends FAQ {
  onSuccess?: () => void
}

// Main component with global filters integration
export default function FAQTab() {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQWithSuccess | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]) // Local priority filter
  
  // Global filters integration
  const { 
    getGlobalCityFilter, 
    getGlobalUserTypeFilter 
  } = useMetricsStore()
  
  const globalCities = getGlobalCityFilter()
  const globalUserTypes = getGlobalUserTypeFilter()

  // Apply global filters + priority filter to FAQ data
  const filteredFAQs = useMemo(() => {
    return mockFAQs.filter((faq) => {
      const cityMatch = globalCities.length === 0 || globalCities.includes(faq.city)
      const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(faq.userType)
      const priorityMatch = priorityFilter.length === 0 || priorityFilter.includes(faq.urgency)
      return cityMatch && userTypeMatch && priorityMatch
    })
  }, [globalCities, globalUserTypes, priorityFilter])

  // Apply ONLY global filters to topic data (excluding priority filter)
  const filteredTopicData = useMemo(() => {
    // Filter FAQs by global filters only (city and user type), not priority
    const globallyFilteredFAQs = mockFAQs.filter((faq) => {
      const cityMatch = globalCities.length === 0 || globalCities.includes(faq.city)
      const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(faq.userType)
      return cityMatch && userTypeMatch
    })

    // Calculate topic data based on globally filtered FAQs
    const totalFiltered = globallyFilteredFAQs.length
    const totalOriginal = mockFAQs.length
    const ratio = totalOriginal > 0 ? totalFiltered / totalOriginal : 1

    return topicData.map(topic => ({
      ...topic,
      count: Math.round(topic.count * ratio),
      percentage: Math.round(topic.percentage * ratio * (100 / (100 * ratio || 1)))
    })).filter(topic => topic.count > 0)
  }, [globalCities, globalUserTypes]) // Note: priorityFilter is NOT included here

  const handleAnswerFAQ = (faq: FAQ, onSuccess: () => void): void => {
    setSelectedFAQ({ ...faq, onSuccess })
    setIsDialogOpen(true)
  }

  const handleSubmitAnswer = (data: AnswerData): void => {
    console.log('FAQ Answer submitted:', data)
    
    if (selectedFAQ?.onSuccess) {
      selectedFAQ.onSuccess()
    }
    
    setIsDialogOpen(false)
    setSelectedFAQ(null)
  }

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false)
    setSelectedFAQ(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 rounded-xl overflow-hidden bg-white">
      {/* Left Half - FAQ Management */}
      <div className="border-r border-slate-200 flex flex-col">
        <FAQManagement 
          onAnswerFAQ={handleAnswerFAQ}
          filteredFAQs={filteredFAQs}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </div>

      {/* Right Half - Topics Analysis */}
      <div className="flex flex-col">
        <TopicsAnalysis filteredTopicData={filteredTopicData} />
      </div>

      {/* Dialog */}
      <AnswerFAQDialog
        faq={selectedFAQ}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitAnswer}
      />
    </div>
  )
}