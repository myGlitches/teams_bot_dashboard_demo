import { FAQ, ResolutionOption } from '@/lib/types'
import { MessageCircleQuestion, Send, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import { MultiSelect } from './ui/multi-select'
import { getProductColor } from './AnswerFAQDialog'

interface FAQManagementProps {
    onAnswerFAQ: (faq: FAQ, callback: () => void) => void
    filteredFAQs: FAQ[]
    resolutionFilter: string[]
    setResolutionFilter: (resolutions: string[]) => void
    productFilter: string[]
    setProductFilter: (products: string[]) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
    itemsPerPage: number
  }
  
  function FAQManagementComp({ 
    onAnswerFAQ, 
    filteredFAQs,
    resolutionFilter,
    setResolutionFilter,
    productFilter,
    setProductFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage
  }: FAQManagementProps) {
  
  
    const resolutionOptions: ResolutionOption[] = [
      { label: "Resolved", value: "resolved" },
      { label: "Unresolved", value: "unresolved" }
    ]

    // Get unique products for filter options
    const productOptions = [
      { label: "PFE-500 Pressure Fryer", value: "PFE-500 Pressure Fryer" },
      { label: "PFG-600 Pressure Fryer", value: "PFG-600 Pressure Fryer" },
      { label: "FlexFusion Combi Oven", value: "FlexFusion Combi Oven" },
      { label: "FlexFusion Platinum", value: "FlexFusion Platinum" },
      { label: "Evolution Elite Fryer", value: "Evolution Elite Fryer" },
      { label: "OFE-321 Open Fryer", value: "OFE-321 Open Fryer" },
      { label: "F5 Open Fryer", value: "F5 Open Fryer" },
      { label: "Computron 8000", value: "Computron 8000" },
      { label: "Computron 1000", value: "Computron 1000" },
      { label: "SmartCombi Steamer", value: "SmartCombi Steamer" },
      { label: "SpaceSaver Plus", value: "SpaceSaver Plus" },
      { label: "Heated Holding Cabinet", value: "Heated Holding Cabinet" },
      { label: "Rotisserie Oven", value: "Rotisserie Oven" }
    ]
  
    const handleAnswerClick = (faq: FAQ): void => {
      onAnswerFAQ(faq, () => {
        // FAQ answered callback can be handled here if needed
      })
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedFAQs = filteredFAQs.slice(startIndex, startIndex + itemsPerPage)
  
    return (
      <div className="flex flex-col min-h-0">
        {/* Header with Filters */}
        <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                <MessageCircleQuestion className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate-900">Top Questions</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Status:</label>
                  <MultiSelect
                    options={resolutionOptions}
                    selected={resolutionFilter}
                    onChange={setResolutionFilter}
                    placeholder="All Status"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Product:</label>
                  <MultiSelect
                    options={productOptions}
                    selected={productFilter}
                    onChange={setProductFilter}
                    placeholder="All Products"
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {filteredFAQs.length} questions
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* FAQ List - Free scrolling */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {paginatedFAQs.map((faq) => (
              <div
                key={faq.id}
                className="group bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm hover:border-slate-300 transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Question with resolution indicators */}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-medium text-slate-900 leading-relaxed">
                      {faq.question}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {faq.resolved ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
  
                  {/* Metadata with only product tag */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span className="font-medium text-slate-900">{faq.frequency}</span>
                      <span>total</span>
                      {resolutionFilter.length === 0 && (
                        <span className="text-slate-500">
                          ({faq.resolvedCount} resolved, {faq.unresolvedCount} unresolved)
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-slate-600">
                      <span>Last asked {faq.lastAsked}</span>
                    </div>
                    
                    {/* Product Tag - Only tag remaining */}
                    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getProductColor(faq.product)}`}>
                      {faq.product}
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
  
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFAQs.length)} of {filteredFAQs.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
  
            {/* Empty State */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <MessageCircleQuestion className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">No questions found</h4>
                <p className="text-sm text-slate-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
export default FAQManagementComp