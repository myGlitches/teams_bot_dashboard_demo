"use client"

import { useState, useEffect, useRef } from "react"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select..." }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Toggle select item in multi-select mode
  const toggleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  // Clear all selected options
  const clearAll = () => onChange([])

  // Format display text with ellipsis
  const getDisplayText = () => {
    if (selected.length === 0) return placeholder
    if (selected.length === 1) {
      const option = options.find(o => o.value === selected[0])
      return option?.label || selected[0]
    }
    return `${selected.length} selected`
  }

  return (
    <div className="relative w-28" ref={ref}>
      <button
        type="button"
        className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-left text-xs shadow-sm hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="block truncate text-slate-700">
          {getDisplayText()}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 z-20 mt-1 max-h-48 w-40 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {selected.length > 0 && (
            <li
              className="cursor-pointer select-none px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 border-b border-slate-100"
              onClick={clearAll}
            >
              Clear All
            </li>
          )}
          {options.map(({ label, value }) => (
            <li
              key={value}
              role="option"
              aria-selected={selected.includes(value)}
              className={`flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-xs transition-colors ${
                selected.includes(value) 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => toggleSelect(value)}
            >
              <input
                type="checkbox"
                checked={selected.includes(value)}
                readOnly
                className="pointer-events-none h-3 w-3 rounded border border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}