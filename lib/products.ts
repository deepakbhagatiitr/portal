import type { Product, Collection } from "@/types/product"

// Import the JSON data
// We're using require instead of import for JSON to avoid TypeScript issues
// with importing JSON files directly
const productsData = require("../data/products.json")

// Update image paths to use the new images folder
const updateImagePaths = (products: Product[]): Product[] => {
  return products.map((product) => {
    // If the product already has a proper image path, keep it
    if (product.image && product.image.startsWith("/images/")) {
      return product
    }

    // Otherwise, create a path based on the category
    const category = product.Cateogory.toLowerCase().replace(/\s+/g, "-")
    return {
      ...product,
      image: `/images/products/${category}/${product.productid}.jpg`,
    }
  })
}

// Get all products
export async function getProducts(category?: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let products = productsData.products

  if (category) {
    if (category === "new-arrivals") {
      products = products.filter((product) => product.tags?.includes("new"))
    } else if (category === "best-sellers") {
      products = products.filter((product) => product.tags?.includes("best-seller"))
    } else if (category === "last-in-stock") {
      products = products.filter((product) => product.tags?.includes("last in stock"))
    } else if (category === "sale") {
      products = products.filter((product) => product.tags?.includes("sale"))
    } else {
      products = products.filter((product) => product.Cateogory === category)
    }
  }

  // Update image paths
  return updateImagePaths(products)
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = productsData.products.find((p) => p.productid === id)

  if (!product) return null

  // Update image path
  const updatedProduct = updateImagePaths([product])[0]
  return updatedProduct
}

// Get all collections
export async function getCollections(): Promise<Collection[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Update collection image paths
  return productsData.collections.map((collection) => ({
    ...collection,
    image: `/images/collections/${collection.slug}.jpg`,
  }))
}

// Get collection by slug
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const collection = productsData.collections.find((c) => c.slug === slug)

  if (!collection) return null

  // Update image path
  return {
    ...collection,
    image: `/images/collections/${collection.slug}.jpg`,
  }
}

// Get products by collection
export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Find the collection
  const collection = productsData.collections.find((c) => c.slug === collectionSlug)

  if (!collection) return []

  // Return products that belong to this collection
  const products = productsData.products.filter(
    (product) => product.Description?.Collection?.toLowerCase() === collection.name.toLowerCase(),
  )

  // Update image paths
  return updateImagePaths(products)
}

