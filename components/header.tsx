"use client"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, User, Menu, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()

  const handleSignOut = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 pt-10">
                <div className="space-y-2">
                  <p className="text-lg font-light tracking-wide">Collection</p>
                  <div className="flex flex-col gap-2 pl-4">
                    <Link href="/collection/all" className="text-base font-light tracking-wide hover:text-neutral-500">
                      All Collections
                    </Link>
                    <Link
                      href="/collection/summer"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Summer Collection
                    </Link>
                    <Link
                      href="/collection/festive"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Festive Collection
                    </Link>
                    <Link
                      href="/collection/wedding"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Wedding Collection
                    </Link>
                    <Link
                      href="/collection/party"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Party Collection
                    </Link>
                    <Link
                      href="/collection/casual"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Casual Collection
                    </Link>
                    <Link
                      href="/collection/evening"
                      className="text-base font-light tracking-wide hover:text-neutral-500"
                    >
                      Evening Collection
                    </Link>
                  </div>
                </div>
                <Link href="/sale" className="text-lg font-light tracking-wide hover:text-neutral-500">
                  Sale
                </Link>

                {/* Categories in mobile menu */}
                <div className="border-t border-neutral-200 pt-4">
                  <p className="mb-2 text-sm font-medium uppercase">Shop by Category</p>
                  <div className="flex flex-col gap-3 pl-2">
                    <Link href="/category/saree" className="text-lg font-light tracking-wide hover:text-neutral-500">
                      Sarees
                    </Link>
                    <Link href="/category/kurti" className="text-lg font-light tracking-wide hover:text-neutral-500">
                      Kurtis
                    </Link>
                    <Link
                      href="/category/plus-size-kurti"
                      className="text-lg font-light tracking-wide hover:text-neutral-500"
                    >
                      Plus Size Kurtis
                    </Link>
                    <Link href="/category/gowns" className="text-lg font-light tracking-wide hover:text-neutral-500">
                      Gowns
                    </Link>
                    <Link
                      href="/category/kurta-set"
                      className="text-lg font-light tracking-wide hover:text-neutral-500"
                    >
                      Kurta Sets
                    </Link>
                  </div>
                </div>

                <Link
                  href="/category/last-in-stock"
                  className="text-lg font-light tracking-wide hover:text-neutral-500"
                >
                  Last In Stock
                </Link>
                <Link href="/blog" className="text-lg font-light tracking-wide hover:text-neutral-500">
                  Blog
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 md:flex-none">
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <Image
                src="https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=40&width=160"
                alt="Elegance"
                width={160}
                height={40}
                className="h-8 w-auto md:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-8">
            {/* Collection Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-light uppercase tracking-wide hover:text-neutral-500">
                  Collection <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/collection/all" className="w-full cursor-pointer">
                    All Collections
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/summer" className="w-full cursor-pointer">
                    Summer Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/festive" className="w-full cursor-pointer">
                    Festive Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/wedding" className="w-full cursor-pointer">
                    Wedding Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/party" className="w-full cursor-pointer">
                    Party Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/casual" className="w-full cursor-pointer">
                    Casual Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collection/evening" className="w-full cursor-pointer">
                    Evening Collection
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sale Link */}
            <Link href="/sale" className="text-sm font-light uppercase tracking-wide hover:text-neutral-500">
              Sale
            </Link>

            {/* Shop by Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-light uppercase tracking-wide hover:text-neutral-500">
                  Shop by Category <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/category/saree" className="w-full cursor-pointer">
                    Sarees
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/kurti" className="w-full cursor-pointer">
                    Kurtis
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/plus-size-kurti" className="w-full cursor-pointer">
                    Plus Size Kurtis
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/gowns" className="w-full cursor-pointer">
                    Gowns
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/kurta-set" className="w-full cursor-pointer">
                    Kurta Sets
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/category/last-in-stock"
              className="text-sm font-light uppercase tracking-wide hover:text-neutral-500"
            >
              Last In Stock
            </Link>
            <Link href="/blog" className="text-sm font-light uppercase tracking-wide hover:text-neutral-500">
              Blog
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* User Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account" className="text-primary hover:bg-primary/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">Hello, {user?.name || "User"}</div>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="w-full cursor-pointer">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="w-full cursor-pointer">
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button className="w-full cursor-pointer text-left" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login" className="w-full cursor-pointer">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup" className="w-full cursor-pointer">
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Wishlist"
                className="relative text-primary hover:bg-primary/10"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cart"
                className="relative text-primary hover:bg-primary/10"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

