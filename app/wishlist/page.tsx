"use client"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Trash2, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleRemoveItem = (productId: string) => {
    if (confirm("Are you sure you want to remove this item from your wishlist?")) {
      removeFromWishlist(productId)
    }
  }

  const handleMoveToCart = (productId: string) => {
    const product = wishlistItems.find((item) => item.productid === productId)
    if (product) {
      addToCart(product, 1)
      removeFromWishlist(productId)
      alert("Product moved to cart!")
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-6 text-2xl font-medium md:text-3xl">Your Wishlist</h1>
        <div className="mx-auto max-w-md rounded-lg border border-neutral-200 p-8">
          <p className="mb-6 text-neutral-600">Your wishlist is currently empty.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-2xl font-medium md:text-3xl">Your Wishlist</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((product) => (
          <div key={product.productid} className="group relative overflow-hidden rounded-lg border border-neutral-200">
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Link href={`/product/${product.productid}`}>
                <Image
                  src={product.image || "/placeholder.svg?height=600&width=450"}
                  alt={product.Name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              {product.tags?.includes("sale") && (
                <div className="absolute left-2 top-2 bg-black px-2 py-1 text-xs text-white">SALE</div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-medium">
                <Link href={`/product/${product.productid}`} className="hover:underline">
                  {product.Name}
                </Link>
              </h3>
              <p className="text-sm text-neutral-500">{product.Description?.Collection || "Classic Collection"}</p>
              <p className="mt-1 font-medium">₹{product.Price}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => handleMoveToCart(product.productid)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleRemoveItem(product.productid)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="mt-8">
        <Link href="/" className="flex items-center text-sm font-medium text-primary hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

