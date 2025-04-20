"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/products"
import type { Product } from "@/types/product"

interface ProductGridProps {
  category?: string
  limit?: number
}

export default function ProductGrid({ category, limit = 8 }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(category)
        setProducts(data.slice(0, limit))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, limit])

  if (loading) {
    console.log("Limit:", limit); // Log the value before using it (now outside JSX)

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: Math.max(0, Math.min(Number(limit) || 8, 100)) }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[3/4] bg-neutral-200" />
            <div className="mt-2 h-4 w-3/4 bg-neutral-200" />
            <div className="mt-1 h-4 w-1/2 bg-neutral-200" />
            <div className="mt-1 h-4 w-1/4 bg-neutral-200" />
          </div>
        ))}

      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.productid} product={product} />
      ))}
    </div>
  )
}
