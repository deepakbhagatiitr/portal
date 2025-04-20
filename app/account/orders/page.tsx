"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { formatDistance } from "date-fns"

interface Order {
  id: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    size?: string
  }>
  amount: number
  status: string
  paymentMethod: string
  createdAt: string
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/account/orders")
      return
    }

    fetchOrders()
  }, [isAuthenticated, user?.id])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?userId=${user?.id}`)
      if (!response.ok) throw new Error("Failed to fetch orders")
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-2xl font-medium">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 p-8 text-center">
          <p className="text-neutral-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-neutral-200">
              <div className="border-b border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-neutral-500">
                      Placed {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
                      <div className="relative h-16 w-16">
                        <Image
                          src={`/placeholder.svg?height=200&width=200`}
                          alt={item.name}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-neutral-500">
                          Quantity: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                        </p>
                      </div>
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">₹{order.amount}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Paid via {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

