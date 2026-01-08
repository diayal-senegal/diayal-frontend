// Google Analytics utility functions
export const GA_TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track purchases
export const purchase = ({ transaction_id, value, currency = 'XOF', items }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id,
      value,
      currency,
      items
    })
  }
}

// Track add to cart
export const addToCart = ({ currency = 'XOF', value, items }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency,
      value,
      items
    })
  }
}