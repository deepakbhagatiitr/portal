import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import FeaturedProducts from "@/components/featured-products"
import ProductGrid from "@/components/product-grid"
import Slideshow from "@/components/slideshow"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Slideshow */}
      <Slideshow />

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">New Arrivals</h2>
          <Link
            href="/collection/new-arrivals"
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <FeaturedProducts category="new-arrivals" />
      </section>

      {/* Featured Collection */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-light tracking-wide md:text-3xl">Summer Collection</h2>
            <Link
              href="/collection/summer"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              View Collection <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/soft-banarasi-raw-silk-saree-5085-381.jpg?height=900&width=600"
                alt="Summer Collection"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-6 text-center text-white">
                <h3 className="mb-2 text-3xl font-light">Elegant Sarees</h3>
                <p className="mb-6 max-w-xs">Discover our handcrafted collection of premium sarees</p>
                <Link
                  href="/category/saree"
                  className="border border-white bg-primary/40 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://anayadesignerstudio.com/cdn/shop/files/Deepika-Padukone-Kanchipuram-Silk-Saree-For-Wedding-2.webp?v=1714611734?height=900&width=600"
                alt="Summer Collection"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-6 text-center text-white">
                <h3 className="mb-2 text-3xl font-light">Designer Kurtis</h3>
                <p className="mb-6 max-w-xs">Elevate your everyday style with our contemporary designs</p>
                <Link
                  href="/category/kurti"
                  className="border border-white bg-primary/40 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">Best Sellers</h2>
          <Link
            href="/collection/best-sellers"
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProductGrid category="best-sellers" limit={8} />
      </section>

      {/* Last In Stock */}
      <section className="bg-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-light tracking-wide md:text-3xl">Last In Stock</h2>
            <Link
              href="/category/last-in-stock"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid category="last-in-stock" limit={4} />
        </div>
      </section>
    </main>
  )
}

