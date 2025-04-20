"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/products"
import type { Product } from "@/types/product"

interface FeaturedProductsProps {
  category?: string
}

export default function FeaturedProducts({ category }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(category)
        setProducts(data.slice(0, 4))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.productid} product={product} />
      ))}
    </div>
  )
}

