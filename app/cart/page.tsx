"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import ProductRecommendations from "@/components/product-recommendations"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      removeFromCart(productId)
    }
  }

  const handleApplyCoupon = () => {
    // In a real app, this would validate the coupon code with an API
    if (couponCode.toLowerCase() === "discount10") {
      const discountAmount = getCartTotal() * 0.1
      setDiscount(discountAmount)
      setCouponApplied(true)
      alert("Coupon applied successfully!")
    } else {
      alert("Invalid coupon code")
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 0 ? 99 : 0
  const total = subtotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-6 text-2xl font-medium md:text-3xl">Your Cart</h1>
        <div className="mx-auto max-w-md rounded-lg border border-neutral-200 p-8">
          <p className="mb-6 text-neutral-600">Your cart is currently empty.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-2xl font-medium md:text-3xl">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="rounded-lg border border-neutral-200">
            <div className="p-4 md:p-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.productid}-${item.size || "default"}`}
                  className="flex flex-col border-b border-neutral-200 py-4 md:flex-row md:items-center md:gap-4"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.image || "/placeholder.svg?height=200&width=200"}
                      alt={item.product.Name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 flex-1 md:mt-0">
                    <h3 className="font-medium">{item.product.Name}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.product.Description?.Collection || "Classic Collection"}
                    </p>
                    {item.size && <p className="text-sm text-neutral-500">Size: {item.size}</p>}
                    <p className="mt-1 font-medium">₹{item.product.Price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="mt-4 flex items-center md:mt-0">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100"
                      onClick={() => handleQuantityChange(item.product.productid, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100"
                      onClick={() => handleQuantityChange(item.product.productid, item.quantity + 1)}
                      disabled={item.quantity >= item.product.Quantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 flex items-center justify-between md:mt-0 md:w-24 md:justify-end">
                    <span className="font-medium md:hidden">Subtotal:</span>
                    <span className="font-medium">₹{item.product.Price * item.quantity}</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="mt-4 text-red-500 hover:text-red-700 md:ml-4 md:mt-0"
                    onClick={() => handleRemoveItem(item.product.productid)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="border-t border-neutral-200 p-4 md:p-6">
              <Link href="/" className="flex items-center text-sm font-medium text-primary hover:underline">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border border-neutral-200">
          <div className="p-4 md:p-6">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

            {/* Coupon Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <Button variant="outline" size="sm" onClick={handleApplyCoupon} disabled={couponApplied || !couponCode}>
                  Apply
                </Button>
              </div>
              {couponApplied && <p className="mt-2 text-xs text-green-600">Coupon applied successfully!</p>}
            </div>

            {/* Price Details */}
            <div className="space-y-2 border-b border-neutral-200 pb-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between py-4 text-lg font-medium">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button className="mt-4 w-full gap-2">
                Proceed to Checkout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Product Recommendations */}
      {cartItems.length > 0 && (
        <div className="mt-8 lg:col-span-3">
          <ProductRecommendations />
        </div>
      )}
    </div>
  )
}

