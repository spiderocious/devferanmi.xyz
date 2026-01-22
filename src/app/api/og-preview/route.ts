import { NextRequest, NextResponse } from 'next/server'
import { JSDOM } from 'jsdom'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract Open Graph metadata
    const getMetaContent = (property: string) => {
      const element = document.querySelector(`meta[property="${property}"]`) ||
                     document.querySelector(`meta[name="${property}"]`)
      return element?.getAttribute('content') || ''
    }

    const title = getMetaContent('og:title') || 
                  document.querySelector('title')?.textContent || 
                  ''

    const description = getMetaContent('og:description') || 
                       getMetaContent('description') || 
                       ''

    const image = getMetaContent('og:image') || ''
    const siteName = getMetaContent('og:site_name') || ''

    // Make image URL absolute if it's relative
    let absoluteImage = image
    if (image && !image.startsWith('http')) {
      const baseUrl = new URL(url)
      absoluteImage = new URL(image, baseUrl.origin).href
    }

    return NextResponse.json({
      title: title.trim(),
      description: description.trim(),
      image: absoluteImage,
      siteName: siteName.trim(),
      url
    })

  } catch (error) {
    console.error('Error fetching OG data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch URL metadata' }, 
      { status: 500 }
    )
  }
} 