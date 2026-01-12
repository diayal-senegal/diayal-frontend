// ============================================
// CONFIGURATION CENTRALISÉE DES FRAIS DE LIVRAISON
// ============================================
// Modifiez ces valeurs pour ajuster les tarifs de livraison

export const SHIPPING_CONFIG = {
  // Prix de base pour Dakar (en FCFA)
  BASE_DAKAR: 2200,

  // Surcharges par région (en FCFA)
  REGION_SURCHARGE: {
    'Thiès': 1500,
    'Diourbel': 2000,
    'Fatick': 2000,
    'Kaolack': 2000,
    'Saint-Louis': 2000,
  },

  // Surcharge par défaut pour les régions non listées (en FCFA)
  DEFAULT_SURCHARGE: 2500,

  // Liste des régions disponibles
  REGIONS: [
    'Dakar',
    'Thiès',
    'Saint-Louis',
    'Diourbel',
    'Louga',
    'Tambacounda',
    'Kaolack',
    'Ziguinchor',
    'Fatick',
    'Kolda',
    'Matam',
    'Kaffrine',
    'Kédougou',
    'Sédhiou'
  ]
};

/**
 * Calcule le coût de livraison pour une région donnée
 * @param {string} region - Nom de la région
 * @returns {number} Coût de livraison en FCFA
 */
export const calculateShippingCost = (region) => {
  if (region === 'Dakar') {
    return SHIPPING_CONFIG.BASE_DAKAR;
  }
  
  const surcharge = SHIPPING_CONFIG.REGION_SURCHARGE[region] ?? SHIPPING_CONFIG.DEFAULT_SURCHARGE;
  return SHIPPING_CONFIG.BASE_DAKAR + surcharge;
};

/**
 * Obtient le détail des frais de livraison
 * @param {string} region - Nom de la région
 * @returns {object} Détail des frais
 */
export const getShippingDetails = (region) => {
  const base = SHIPPING_CONFIG.BASE_DAKAR;
  const surcharge = region === 'Dakar' ? 0 : (SHIPPING_CONFIG.REGION_SURCHARGE[region] ?? SHIPPING_CONFIG.DEFAULT_SURCHARGE);
  const total = base + surcharge;

  return {
    base,
    surcharge,
    total,
    region
  };
};
