"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/products"
import { getCartRecommendations } from "@/lib/recommendation"
import type { Product } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export default function ProductRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { cartItems, addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cartItems.length === 0) {
        setRecommendations([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // Get all products
        const allProducts = await getProducts()

        // Get cart products
        const cartProducts = cartItems.map((item) => item.product)

        // Get recommendations
        const recommendedProducts = getCartRecommendations(cartProducts, allProducts, 5)
        setRecommendations(recommendedProducts)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [cartItems])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product)
  }

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-medium">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[3/4] bg-neutral-200" />
              <div className="mt-2 h-4 w-3/4 bg-neutral-200" />
              <div className="mt-1 h-4 w-1/2 bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="mt-8 border-t border-neutral-200 pt-8">
      <h2 className="mb-4 text-xl font-medium">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {recommendations.map((product) => (
          <div key={product.productid} className="group relative">
            {product.tags?.includes("sale") && (
              <div className="absolute left-2 top-2 z-10 bg-red-600 px-2 py-1 text-xs text-white">SALE</div>
            )}
            {product.tags?.includes("new") && (
              <div className="absolute left-2 top-10 z-10 bg-green-600 px-2 py-1 text-xs text-white">NEW</div>
            )}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Link href={`/product/${product.productid}`}>
                <Image
                  src={product.image || "/placeholder.svg?height=600&width=450"}
                  alt={product.Name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${
                    isInWishlist(product.productid)
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
                  }`}
                  onClick={() => handleAddToWishlist(product)}
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4" fill={isInWishlist(product.productid) ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
                  onClick={() => handleAddToCart(product)}
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <h3 className="text-sm font-medium">{product.Name}</h3>
              <p className="text-xs text-neutral-500">{product.Description?.Collection || "Classic Collection"}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">₹{product.Price}</p>
                {product.originalPrice && (
                  <p className="text-xs text-neutral-500 line-through">₹{product.originalPrice}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

