import { useEffect } from 'react'

const SEO = ({ 
  title = 'Diayal - Marketplace Sénégalaise',
  description = 'La marketplace sénégalaise pour acheter et vendre en ligne. Découvrez des milliers de produits locaux au Sénégal.',
  keywords = 'marketplace Sénégal, e-commerce Sénégal, acheter en ligne Sénégal, vendre en ligne, Diayal',
  image = '/images/logo_diayal.svg',
  url = '',
  type = 'website'
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://diayal.sn'
  const fullUrl = `${siteUrl}${url}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  useEffect(() => {
    // Title
    document.title = title
    
    // Meta tags
    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }
    
    // Basic meta tags
    updateMeta('description', description)
    updateMeta('keywords', keywords)
    
    // Open Graph
    updateMeta('og:title', title, true)
    updateMeta('og:description', description, true)
    updateMeta('og:image', fullImage, true)
    updateMeta('og:url', fullUrl, true)
    updateMeta('og:type', type, true)
    
    // Twitter
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', fullImage)
    updateMeta('twitter:url', fullUrl)
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)
    
  }, [title, description, keywords, fullImage, fullUrl, type])

  return null
}

export default SEO