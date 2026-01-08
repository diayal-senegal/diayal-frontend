import { Helmet } from 'react-helmet-async'

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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:url" content={fullUrl} />
    </Helmet>
  )
}

export default SEO