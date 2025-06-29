// src/components/ui/TypeableStoreFilter.tsx

import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface TypeableStoreFilterProps {
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
}


export const TypeableStoreFilter = ({ 
  selected, 
  onChange, 
  placeholder = "Type store ID...",
  label = "Store"
}: TypeableStoreFilterProps) => {
  const [inputValue, setInputValue] = useState("")
  const [_isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      addStore(inputValue.trim())
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const addStore = (storeId: string) => {
    if (storeId && !selected.includes(storeId)) {
      onChange([...selected, storeId])
      setInputValue("")
      setIsOpen(false)
    }
  }

  const removeStore = (storeId: string) => {
    onChange(selected.filter(s => s !== storeId))
  }



  return (
    <div className="flex flex-col">
      <Label className="mb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
        {label}
      </Label>
      <div className="relative" ref={containerRef}>
        

        {/* Input Field */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selected.length === 0 ? placeholder : "Add another..."}
            className="w-full px-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          
        </div>

        {/* Selected Store IDs */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {selected.map((storeId) => (
              <span
                key={storeId}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md"
              >
                {storeId}
                <button
                  onClick={() => removeStore(storeId)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default TypeableStoreFilter