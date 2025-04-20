"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProductsByCollection, getCollectionBySlug } from "@/lib/products"
import type { Product, Collection } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const collectionData = await getCollectionBySlug(slug)
        setCollection(collectionData)

        const productsData = await getProductsByCollection(slug)
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product)
  }

  // Format collection name for display
  const formatCollectionName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const collectionName = collection?.name || formatCollectionName(slug)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-3xl font-light tracking-wide md:text-4xl">{collectionName}</h1>
      {collection?.description && <p className="mb-8 text-neutral-600">{collection.description}</p>}

      {loading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[3/4] bg-neutral-200" />
              <div className="mt-2 h-4 w-3/4 bg-neutral-200" />
              <div className="mt-1 h-4 w-1/2 bg-neutral-200" />
              <div className="mt-1 h-4 w-1/4 bg-neutral-200" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-neutral-600">No products found in this collection.</p>
          <Link href="/collection/all" className="mt-4 inline-block text-primary hover:underline">
            View all collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.productid} className="group relative">
              {product.tags?.includes("sale") && (
                <div className="absolute left-2 top-2 z-10 bg-red-600 px-2 py-1 text-xs text-white">SALE</div>
              )}
              {product.tags?.includes("new") && (
                <div className="absolute left-2 top-10 z-10 bg-green-600 px-2 py-1 text-xs text-white">NEW</div>
              )}
              {product.tags?.includes("last in stock") && (
                <div className="absolute left-2 top-2 z-10 bg-orange-600 px-2 py-1 text-xs text-white">
                  LAST IN STOCK
                </div>
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
                    className={`h-9 w-9 rounded-full ${
                      isInWishlist(product.productid)
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
                    }`}
                    onClick={() => handleAddToWishlist(product)}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-5 w-5" fill={isInWishlist(product.productid) ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="font-medium">
                  <Link href={`/product/${product.productid}`} className="hover:underline">
                    {product.Name}
                  </Link>
                </h3>
                <p className="text-sm text-neutral-500">{product.Description?.Collection || "Classic Collection"}</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">₹{product.Price}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-neutral-500 line-through">₹{product.originalPrice}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

