import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/placeholder.svg?height=40&width=160"
                alt="Elegance"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-neutral-600">
              Elegance is a premium ladies wear brand offering exquisite designs that blend tradition with contemporary
              style.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" aria-label="Facebook" className="text-primary hover:bg-primary/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram" className="text-primary hover:bg-primary/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter" className="text-primary hover:bg-primary/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collection/all" className="text-neutral-600 hover:text-primary">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/category/saree" className="text-neutral-600 hover:text-primary">
                  Sarees
                </Link>
              </li>
              <li>
                <Link href="/category/kurti" className="text-neutral-600 hover:text-primary">
                  Kurtis
                </Link>
              </li>
              <li>
                <Link href="/category/kurta-set" className="text-neutral-600 hover:text-primary">
                  Kurta Sets
                </Link>
              </li>
              <li>
                <Link href="/category/gown" className="text-neutral-600 hover:text-primary">
                  Gowns
                </Link>
              </li>
              <li>
                <Link href="/category/plus-size" className="text-neutral-600 hover:text-primary">
                  Plus Size
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-neutral-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-600 hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-neutral-600 hover:text-primary">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-neutral-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-600 hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Newsletter</h3>
            <p className="mb-4 text-sm text-neutral-600">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col gap-2">
              <Input type="email" placeholder="Enter your email" className="border-neutral-300" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Vanshika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

