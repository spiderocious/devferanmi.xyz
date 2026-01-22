"use client"

import { useState, useEffect } from 'react'
import { ExternalLinkIcon, Loader2 } from 'lucide-react'

interface OGData {
  title?: string
  description?: string
  image?: string
  siteName?: string
  url?: string
}

interface LinkPreviewProps {
  url: string
  children: React.ReactNode
  showPreview?: boolean
  className?: string
  /** Pass static OG data to skip fetching */
  data?: OGData
}

type PreviewState = 'idle' | 'loading' | 'success' | 'error'

export function LinkPreview({ 
  url, 
  children, 
  showPreview = false, 
  className = "",
  data
}: LinkPreviewProps) {
  const [ogData, setOgData] = useState<OGData | null>(data || null)
  const [state, setState] = useState<PreviewState>(data ? 'success' : 'idle')
  const [isHovered, setIsHovered] = useState(false)

  // If static data is provided, use it directly
  const hasStaticData = !!data

  useEffect(() => {
    if (data) {
      setOgData(data)
      setState('success')
    }
  }, [data])

  useEffect(() => {
    if (showPreview && !hasStaticData && state === 'idle') {
      fetchOGData()
    }
  }, [showPreview, hasStaticData, state])

  const fetchOGData = async () => {
    if (hasStaticData) return
    
    setState('loading')
    try {
      const response = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
      
      const fetchedData = await response.json()
      setOgData(fetchedData)
      setState('success')
    } catch (err) {
      console.error('Error fetching OG data:', err)
      setState('error')
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasStaticData && state === 'idle') {
      fetchOGData()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const shouldShowPreview = isHovered || showPreview

  const getDomain = (urlString: string): string => {
    try {
      return new URL(urlString).hostname.replace('www.', '')
    } catch {
      return urlString
    }
  }

  return (
    <div className="relative inline-block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} ${isHovered ? 'bg-zinc-100 dark:bg-zinc-800' : ''} transition-colors`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>

      {shouldShowPreview && (
        <div className="absolute z-50 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl p-4 mt-2 -left-4">
          {/* Loading State */}
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
              <span className="text-xs text-zinc-500">Loading preview...</span>
            </div>
          )}

          {/* Error State - Shows URL only */}
          {state === 'error' && (
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                  {url}
                </p>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {getDomain(url)}
                </span>
              </div>
              <ExternalLinkIcon className="h-4 w-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
            </div>
          )}

          {/* Success State - Shows OG Data */}
          {state === 'success' && ogData && (
            <>
              {ogData.image && (
                <div className="w-full h-40 mb-3 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={ogData.image}
                    alt={ogData.title || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.parentElement!.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                {ogData.title && (
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {ogData.title}
                  </h4>
                )}
                
                {ogData.description && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {ogData.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    {ogData.siteName || getDomain(url)}
                  </span>
                  <ExternalLinkIcon className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
                </div>
              </div>
            </>
          )}

          {/* Idle State (shouldn't normally be visible, but just in case) */}
          {state === 'idle' && (
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                  {url}
                </p>
              </div>
              <ExternalLinkIcon className="h-4 w-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}