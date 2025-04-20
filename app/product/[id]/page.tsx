"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import type { Product } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(params.id)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    // For products that require size selection
    if (product.Cateogory !== "saree" && !selectedSize) {
      alert("Please select a size")
      return
    }

    addToCart(product, quantity, selectedSize || undefined)
    alert("Product added to cart!")
  }

  const handleAddToWishlist = () => {
    if (!product) return
    addToWishlist(product)
    alert("Product added to wishlist!")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse bg-neutral-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse bg-neutral-200" />
            <div className="h-6 w-1/4 animate-pulse bg-neutral-200" />
            <div className="h-4 w-full animate-pulse bg-neutral-200" />
            <div className="h-4 w-full animate-pulse bg-neutral-200" />
            <div className="h-4 w-3/4 animate-pulse bg-neutral-200" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block text-primary hover:underline">
          Return to home page
        </Link>
      </div>
    )
  }

  const sizes = ["XS", "S", "M", "L", "XL"]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${product.Cateogory}`} className="hover:text-black">
          {product.Cateogory.charAt(0).toUpperCase() + product.Cateogory.slice(1)}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-neutral-900">{product.Name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200">
          <Image
            src={product.image || "/placeholder.svg?height=800&width=800"}
            alt={product.Name}
            fill
            className="object-cover"
          />
          {product.tags?.includes("sale") && (
            <div className="absolute left-4 top-4 bg-red-600 px-3 py-1 text-sm text-white">SALE</div>
          )}
          {product.tags?.includes("new") && (
            <div className="absolute left-4 top-14 bg-green-600 px-3 py-1 text-sm text-white">NEW</div>
          )}
          {product.tags?.includes("last in stock") && (
            <div className="absolute left-4 top-4 bg-orange-600 px-3 py-1 text-sm text-white">LAST IN STOCK</div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium md:text-3xl">{product.Name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-xl font-medium">₹{product.Price}</p>
              {product.originalPrice && (
                <p className="text-lg text-neutral-500 line-through">₹{product.originalPrice}</p>
              )}
            </div>
          </div>

          {/* Collection */}
          {product.Description?.Collection && (
            <p className="text-neutral-600">
              Collection: <span className="font-medium">{product.Description.Collection}</span>
            </p>
          )}

          {/* Size Selection */}
          {product.Cateogory !== "saree" && (
            <div className="space-y-3">
              <p className="font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 w-10 rounded-full border ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 hover:border-neutral-900"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <p className="font-medium">Quantity</p>
            <div className="flex h-10 w-32 items-center">
              <button
                className="flex h-full w-10 items-center justify-center border border-r-0 border-neutral-300 hover:bg-neutral-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="flex h-full w-12 items-center justify-center border-y border-neutral-300">{quantity}</div>
              <button
                className="flex h-full w-10 items-center justify-center border border-l-0 border-neutral-300 hover:bg-neutral-100"
                onClick={() => setQuantity(Math.min(product.Quantity, quantity + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Wishlist */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className={`flex-1 gap-2 ${isInWishlist(product.productid) ? "bg-primary/10" : ""}`}
              onClick={handleAddToWishlist}
            >
              <Heart className="h-5 w-5" fill={isInWishlist(product.productid) ? "currentColor" : "none"} />
              {isInWishlist(product.productid) ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Product Description */}
          <div className="space-y-4 border-t border-neutral-200 pt-6">
            <h2 className="text-lg font-medium">Product Details</h2>
            <div className="grid gap-2 text-sm">
              {product.Description?.Color && (
                <div className="flex">
                  <span className="w-32 font-medium">Color:</span>
                  <span>{product.Description.Color}</span>
                </div>
              )}
              {product.Description?.Material && (
                <div className="flex">
                  <span className="w-32 font-medium">Material:</span>
                  <span>{product.Description.Material}</span>
                </div>
              )}
              {product.Description?.Work && (
                <div className="flex">
                  <span className="w-32 font-medium">Work:</span>
                  <span>{product.Description.Work}</span>
                </div>
              )}
              {product.Description?.Occasion && (
                <div className="flex">
                  <span className="w-32 font-medium">Occasion:</span>
                  <span>{product.Description.Occasion.join(", ")}</span>
                </div>
              )}
              {product.Description?.Wash_care && (
                <div className="flex">
                  <span className="w-32 font-medium">Wash Care:</span>
                  <span>{product.Description.Wash_care}</span>
                </div>
              )}
              {product.Description?.Length && (
                <div className="flex">
                  <span className="w-32 font-medium">Length:</span>
                  <span>{product.Description.Length} meters</span>
                </div>
              )}
              {product.Description?.Blouse && product.Description.Blouse > 0 && (
                <div className="flex">
                  <span className="w-32 font-medium">Blouse:</span>
                  <span>{product.Description.Blouse} meters</span>
                </div>
              )}
              {product.Description?.Pattern && (
                <div className="flex">
                  <span className="w-32 font-medium">Pattern:</span>
                  <span>{product.Description.Pattern}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

