import type { Product } from "@/types/product"

// Function to extract features from a product
function extractFeatures(product: Product): Record<string, number> {
  const features: Record<string, number> = {}

  // Add category as a feature
  const category = `category_${product.Cateogory.toLowerCase()}`
  features[category] = 1

  // Add collection as a feature
  if (product.Description?.Collection) {
    const collection = `collection_${product.Description.Collection.toLowerCase().replace(/\s+/g, "_")}`
    features[collection] = 1
  }

  // Add material as a feature
  if (product.Description?.Material) {
    const material = `material_${product.Description.Material.toLowerCase().replace(/\s+/g, "_")}`
    features[material] = 1
  }

  // Add occasions as features
  if (product.Description?.Occasion) {
    product.Description.Occasion.forEach((occasion) => {
      const occasionKey = `occasion_${occasion.toLowerCase().replace(/\s+/g, "_")}`
      features[occasionKey] = 1
    })
  }

  // Add price range as a feature
  if (product.Price < 1000) {
    features["price_range_low"] = 1
  } else if (product.Price < 3000) {
    features["price_range_medium"] = 1
  } else {
    features["price_range_high"] = 1
  }

  return features
}

// Function to calculate cosine similarity between two feature vectors
function calculateCosineSimilarity(features1: Record<string, number>, features2: Record<string, number>): number {
  // Get all unique keys from both feature vectors
  const allKeys = new Set([...Object.keys(features1), ...Object.keys(features2)])

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  // Calculate dot product and magnitudes
  allKeys.forEach((key) => {
    const value1 = features1[key] || 0
    const value2 = features2[key] || 0

    dotProduct += value1 * value2
    magnitude1 += value1 * value1
    magnitude2 += value2 * value2
  })

  magnitude1 = Math.sqrt(magnitude1)
  magnitude2 = Math.sqrt(magnitude2)

  // Avoid division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0
  }

  return dotProduct / (magnitude1 * magnitude2)
}

// Function to get product recommendations based on a target product
export function getProductRecommendations(targetProduct: Product, allProducts: Product[], count = 5): Product[] {
  // Extract features from the target product
  const targetFeatures = extractFeatures(targetProduct)

  // Calculate similarity scores for all products
  const productsWithScores = allProducts
    .filter((product) => product.productid !== targetProduct.productid) // Exclude the target product
    .map((product) => {
      const features = extractFeatures(product)
      const similarity = calculateCosineSimilarity(targetFeatures, features)
      return { product, similarity }
    })

  // Sort by similarity score (descending)
  productsWithScores.sort((a, b) => b.similarity - a.similarity)

  // Return the top N products
  return productsWithScores.slice(0, count).map((item) => item.product)
}

// Function to get recommendations based on multiple products (e.g., cart items)
export function getCartRecommendations(cartProducts: Product[], allProducts: Product[], count = 5): Product[] {
  if (cartProducts.length === 0) {
    return []
  }

  // Get all product IDs in the cart to exclude them from recommendations
  const cartProductIds = new Set(cartProducts.map((product) => product.productid))

  // Filter out products that are already in the cart
  const availableProducts = allProducts.filter((product) => !cartProductIds.has(product.productid))

  if (cartProducts.length === 1) {
    // If there's only one product in the cart, use the simple recommendation function
    return getProductRecommendations(cartProducts[0], availableProducts, count)
  }

  // For multiple products, calculate the average similarity
  const productsWithScores = availableProducts.map((product) => {
    const productFeatures = extractFeatures(product)

    // Calculate average similarity with all cart products
    const totalSimilarity = cartProducts.reduce((sum, cartProduct) => {
      const cartProductFeatures = extractFeatures(cartProduct)
      return sum + calculateCosineSimilarity(productFeatures, cartProductFeatures)
    }, 0)

    const averageSimilarity = totalSimilarity / cartProducts.length
    return { product, similarity: averageSimilarity }
  })

  // Sort by similarity score (descending)
  productsWithScores.sort((a, b) => b.similarity - a.similarity)

  // Return the top N products
  return productsWithScores.slice(0, count).map((item) => item.product)
}

