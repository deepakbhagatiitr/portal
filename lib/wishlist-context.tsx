"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  useEffect(() => {
    // Load wishlist from localStorage
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist")
      if (storedWishlist) {
        try {
          setWishlistItems(JSON.parse(storedWishlist))
        } catch (error) {
          console.error("Failed to parse stored wishlist:", error)
          localStorage.removeItem("wishlist")
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems])

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      // Check if product already exists in wishlist
      if (prevItems.some((item) => item.productid === product.productid)) {
        return prevItems
      }
      return [...prevItems, product]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.productid !== productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productid === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

