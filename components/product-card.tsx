"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToWishlist(product)
  }

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {product.tags?.includes("sale") && (
        <div className="absolute left-2 top-2 z-10 bg-destructive px-2 py-1 text-xs text-white">SALE</div>
      )}
      {product.tags?.includes("new") && (
        <div className="absolute left-2 top-10 z-10 bg-accent px-2 py-1 text-xs text-accent-foreground font-medium">
          NEW
        </div>
      )}
      {product.tags?.includes("last in stock") && (
        <div className="absolute left-2 top-2 z-10 bg-amber-600 px-2 py-1 text-xs text-white">LAST IN STOCK</div>
      )}
      <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
        <Link href={`/product/${product.productid}`}>
          <Image
            src={product.image || "/images/products/placeholder.jpg"}
            alt={product.Name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div
          className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            variant="secondary"
            size="icon"
            className={`h-9 w-9 rounded-full ${
              isInWishlist(product.productid)
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
            }`}
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" fill={isInWishlist(product.productid) ? "currentColor" : "none"} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
            onClick={handleAddToCart}
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
          <p className="font-medium text-primary">₹{product.Price}</p>
          {product.originalPrice && <p className="text-sm text-neutral-500 line-through">₹{product.originalPrice}</p>}
        </div>
      </div>
    </div>
  )
}

