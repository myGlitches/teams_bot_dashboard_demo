import { AnswerData, FAQ } from '@/lib/types'
import { useState } from 'react'
import { CheckCircle, MessageCircleQuestion, Send, Users, X } from 'lucide-react'

interface AnswerFAQDialogProps {
    faq: FAQ | null
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: AnswerData) => void
  }


  // Product color mapping
  export const getProductColor = (product: string): string => {
    const colorMap: { [key: string]: string } = {
      'PFE-500 Pressure Fryer': 'bg-blue-50 text-blue-700 border-blue-200',
      'PFG-600 Pressure Fryer': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'FlexFusion Combi Oven': 'bg-green-50 text-green-700 border-green-200',
      'FlexFusion Platinum': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Evolution Elite Fryer': 'bg-purple-50 text-purple-700 border-purple-200',
      'OFE-321 Open Fryer': 'bg-orange-50 text-orange-700 border-orange-200',
      'F5 Open Fryer': 'bg-red-50 text-red-700 border-red-200',
      'Computron 8000': 'bg-teal-50 text-teal-700 border-teal-200',
      'Computron 1000': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'SmartCombi Steamer': 'bg-lime-50 text-lime-700 border-lime-200',
      'SpaceSaver Plus': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Heated Holding Cabinet': 'bg-pink-50 text-pink-700 border-pink-200',
      'Rotisserie Oven': 'bg-amber-50 text-amber-700 border-amber-200'
    }
    return colorMap[product] || 'bg-gray-50 text-gray-700 border-gray-200'
  }
  
  function AnswerFAQDialog({ faq, isOpen, onClose, onSubmit }: AnswerFAQDialogProps) {
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
                <h3 className="font-semibold text-slate-900">
                  {faq?.resolved ? 'View FAQ Answer' : 'Answer FAQ'}
                </h3>
                <p className="text-xs text-slate-600">
                  {faq?.resolved ? 'Review existing answer' : 'Provide a comprehensive answer'}
                </p>
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
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {faq?.frequency} times asked
                </span>
                <span>Last asked {faq?.lastAsked}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getProductColor(faq?.product || '')}`}>
                  {faq?.product}
                </span>
              </div>
              {faq?.resolved && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Resolved - {faq.resolvedCount} successful resolutions</span>
                </div>
              )}
            </div>
  
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={faq?.resolved ? "This question has been resolved. View existing answer or provide updates..." : "Provide a detailed, helpful answer..."}
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
                  {faq?.resolved ? 'Update Answer' : 'Save Answer'}
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

export default AnswerFAQDialog