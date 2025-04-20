"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { getCollections } from "@/lib/products"
import type { Collection } from "@/types/product"

export default function AllCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true)
      try {
        const data = await getCollections()
        setCollections(data)
      } catch (error) {
        console.error("Error fetching collections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-light tracking-wide md:text-4xl">All Collections</h1>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[16/9] bg-neutral-200" />
              <div className="mt-4 h-6 w-1/2 bg-neutral-200" />
              <div className="mt-2 h-4 w-3/4 bg-neutral-200" />
            </div>
          ))}
        </div>
      ) : collections.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-neutral-600">No collections found.</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            Return to home page
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collection/${collection.slug}`}
              className="group block overflow-hidden rounded-lg border border-neutral-200"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg?height=450&width=800"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <h2 className="mb-2 text-2xl font-light">{collection.name}</h2>
                  <p className="max-w-xs text-sm">{collection.description}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-neutral-500">{collection.productCount} Products</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

