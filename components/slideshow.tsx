"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/images/banners/summer-collection.jpg",
    title: "New Summer Collection",
    subtitle: "Discover our latest designs for the season",
    link: "/collection/summer",
  },
  {
    id: 2,
    image: "/images/banners/festive-wear.jpg",
    title: "Exclusive Festive Wear",
    subtitle: "Celebrate in style with our festive collection",
    link: "/collection/festive",
  },
  {
    id: 3,
    image: "/images/banners/premium-sarees.jpg",
    title: "Premium Sarees",
    subtitle: "Handcrafted with love and tradition",
    link: "/category/saree",
  },
]

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fix hydration issues by ensuring client-side only rendering for animations
  useEffect(() => {
    setIsClient(true)

    // Set up the interval for auto-sliding
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    // Clean up the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const nextSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  const prevSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            // Fallback to placeholder if image fails to load
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/images/banners/placeholder-banner.jpg"
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center text-white">
            <h1
              className={`mb-2 text-3xl font-light tracking-wide md:text-5xl ${
                isClient && index === currentSlide ? "animate-slide-in" : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              {slide.title}
            </h1>
            <p
              className={`mb-6 max-w-md text-sm md:text-base ${
                isClient && index === currentSlide ? "animate-slide-in" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              {slide.subtitle}
            </p>
            <Link
              href={slide.link}
              className={`border border-white bg-primary/80 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-primary hover:text-white ${
                isClient && index === currentSlide ? "animate-slide-in" : ""
              }`}
              style={{ animationDelay: "0.7s" }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/20 text-white backdrop-blur-sm hover:bg-primary/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/20 text-white backdrop-blur-sm hover:bg-primary/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-white/40"}`}
            onClick={() => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current)
              }
              setCurrentSlide(index)
              intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
              }, 5000)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

