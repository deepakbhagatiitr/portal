"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AccountPage() {
  const router = useRouter()
  const { isAuthenticated, user, signOut } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/account")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-2xl font-medium">My Account</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium">Account Details</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium">Quick Links</h2>
          <div className="space-y-4">
            <Link href="/account/orders">
              <Button variant="outline" className="w-full justify-start">
                My Orders
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={() => {
                signOut()
                router.push("/")
              }}
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

