import React, { useState, useMemo } from 'react'
import { AnswerData, FAQ } from '@/lib/types'
import { mockFAQs, topicData } from '@/lib/data/outcomeData'
import AnswerFAQDialog from './AnswerFAQDialog'
import FAQManagementComp from './FAQManagementComp'
import { useMetricsStore } from '@/store/useMetricsStore'

interface FAQWithSuccess extends FAQ {
  onSuccess?: () => void
}

// Main component with global filters integration
export default function FAQTab() {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQWithSuccess | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [resolutionFilter, setResolutionFilter] = useState<string[]>([]) // Local resolution filter
  const [productFilter, setProductFilter] = useState<string[]>([]) // Local product filter
  const [currentPage, setCurrentPage] = useState<number>(1)
  
  // ✅ Use actual global filters from the store
  const { 
    getGlobalCityFilter, 
    getGlobalUserTypeFilter 
  } = useMetricsStore()
  
  const globalCities: string[] = getGlobalCityFilter()
  const globalUserTypes: string[] = getGlobalUserTypeFilter()

  // Apply all filters to FAQ data
  const filteredFAQs = useMemo(() => {
    return mockFAQs.filter((faq: FAQ) => {
      const cityMatch = globalCities.length === 0 || globalCities.includes(faq.city)
      const userTypeMatch = globalUserTypes.length === 0 || globalUserTypes.includes(faq.userType)
      
      // Product filter
      const productMatch = productFilter.length === 0 || productFilter.includes(faq.product)
      
      // Resolution status filter
      let resolutionMatch = true
      if (resolutionFilter.length > 0) {
        const hasResolved = resolutionFilter.includes('resolved')
        const hasUnresolved = resolutionFilter.includes('unresolved')
        
        if (hasResolved && hasUnresolved) {
          resolutionMatch = true // Show all if both selected
        } else if (hasResolved) {
          resolutionMatch = faq.resolved
        } else if (hasUnresolved) {
          resolutionMatch = !faq.resolved
        }
      }
      
      return cityMatch && userTypeMatch && productMatch && resolutionMatch
    })
  }, [globalCities, globalUserTypes, productFilter, resolutionFilter])

  // Calculate pagination - Changed to 5 items per page
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage)
  
  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [resolutionFilter, productFilter, globalCities, globalUserTypes])

  // Apply ONLY global filters to topic data (excluding local product and resolution filters)
  const filteredTopicData = useMemo(() => {
    // Filter FAQs by global filters only (city and user type), not local product or resolution filters
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
  }, [globalCities, globalUserTypes]) // Note: productFilter and resolutionFilter are NOT included here

  // Export filteredTopicData for potential use in parent components
  // You can access this data if needed: const { filteredTopicData } = useFAQData()
  // For now, we'll log it to prevent the unused variable warning
  React.useEffect(() => {
    console.log('Topic data updated:', filteredTopicData)
  }, [filteredTopicData])



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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      {/* Left Half - FAQ Management */}
      <div className="border-r border-slate-200 flex flex-col">
        <FAQManagementComp 
          onAnswerFAQ={handleAnswerFAQ}
          filteredFAQs={filteredFAQs}
          resolutionFilter={resolutionFilter}
          setResolutionFilter={setResolutionFilter}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
        />
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