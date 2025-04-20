// // "use client"

// // import { useEffect, useState } from "react"
// // import { useSearchParams, useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { CheckCircle } from "lucide-react"

// // import { Button } from "@/components/ui/button"

// // export default function OrderConfirmationPage() {
// //   const searchParams = useSearchParams()
// //   const router = useRouter()
// //   const orderId = searchParams.get("orderId")
// //   const [countdown, setCountdown] = useState(5)

// //   // Redirect to home if no order ID is present
// //   useEffect(() => {
// //     if (!orderId) {
// //       router.push("/")
// //     }
// //   }, [orderId, router])

// //   // Countdown to redirect to home
// //   useEffect(() => {
// //     if (countdown > 0) {
// //       const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
// //       return () => clearTimeout(timer)
// //     } else {
// //       router.push("/")
// //     }
// //   }, [countdown, router])

// //   if (!orderId) return null

// //   return (
// //     <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12 text-center">
// //       <div className="mx-auto max-w-md rounded-lg border border-neutral-200 p-8">
// //         <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />

// //         <h1 className="mb-2 text-2xl font-medium">Order Confirmed!</h1>
// //         <p className="mb-6 text-neutral-600">Thank you for your purchase. Your order has been placed successfully.</p>

// //         <div className="mb-6 rounded-lg bg-neutral-50 p-4">
// //           <p className="text-sm text-neutral-600">Order ID</p>
// //           <p className="font-medium">{orderId}</p>
// //         </div>

// //         <p className="mb-6 text-sm text-neutral-600">
// //           We have sent an order confirmation email with details of your order.
// //         </p>

// //         <div className="flex flex-col gap-3 sm:flex-row">
// //           <Link href="/account/orders">
// //             <Button variant="outline" className="w-full">
// //               View Orders
// //             </Button>
// //           </Link>
// //           <Link href="/">
// //             <Button className="w-full">Continue Shopping</Button>
// //           </Link>
// //         </div>

// //         <p className="mt-6 text-sm text-neutral-500">Redirecting to home page in {countdown} seconds...</p>
// //       </div>
// //     </div>
// //   )
// // }

// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import Link from "next/link"
// import { CheckCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function OrderConfirmationPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const orderId = searchParams.get("orderId")
//   const paymentMethod = searchParams.get("payment_method")
//   const paymentIntent = searchParams.get("payment_intent")
//   const [countdown, setCountdown] = useState(5)
//   const [status, setStatus] = useState<"success" | "error" | "loading">("loading")

//   // Redirect to home if no order ID is present
//   useEffect(() => {
//     if (!orderId) {
//       router.push("/")
//       return
//     }

//     // Confirm order based on payment method
//     const confirmOrder = async () => {
//       try {
//         const response = await fetch(`/api/orders/${orderId}/confirm`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             paymentMethod,
//             paymentIntentId: paymentIntent
//           })
//         })

//         if (!response.ok) {
//           throw new Error("Failed to confirm order")
//         }

//         setStatus("success")
//       } catch (error) {
//         console.error("Order confirmation error:", error)
//         setStatus("error")
//       }
//     }

//     confirmOrder()
//   }, [orderId, paymentMethod, paymentIntent, router])

//   // Countdown to redirect to home
//   useEffect(() => {
//     if (countdown > 0 && status === "success") {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (countdown === 0) {
//       router.push("/")
//     }
//   }, [countdown, router, status])

//   if (!orderId) return null

//   return (
//     <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12 text-center">
//       <div className="mx-auto max-w-md rounded-lg border border-neutral-200 p-8">
//         {status === "loading" && (
//           <>
//             <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//             <p>Processing your order...</p>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
//             <h1 className="mb-2 text-2xl font-medium">Order Confirmed!</h1>
//             <p className="mb-6 text-neutral-600">
//               Thank you for your purchase. Your order has been placed successfully.
//             </p>

//             <div className="mb-6 rounded-lg bg-neutral-50 p-4">
//               <p className="text-sm text-neutral-600">Order ID</p>
//               <p className="font-medium">{orderId}</p>
//             </div>

//             <p className="mb-6 text-sm text-neutral-600">
//               We have sent an order confirmation email with details of your order.
//             </p>

//             <div className="flex flex-col gap-3 sm:flex-row">
//               <Link href="/account/orders">
//                 <Button variant="outline" className="w-full">
//                   View Orders
//                 </Button>
//               </Link>
//               <Link href="/">
//                 <Button className="w-full">Continue Shopping</Button>
//               </Link>
//             </div>

//             <p className="mt-6 text-sm text-neutral-500">
//               Redirecting to home page in {countdown} seconds...
//             </p>
//           </>
//         )}

//         {status === "error" && (
//           <>
//             <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-4 text-red-600">
//               <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h1 className="mb-2 text-2xl font-medium">Order Failed</h1>
//             <p className="mb-6 text-neutral-600">
//               There was an error processing your order. Please try again.
//             </p>
//             <Link href="/checkout">
//               <Button className="w-full">Try Again</Button>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const paymentMethod = searchParams.get("payment_method")
  const paymentIntent = searchParams.get("payment_intent")
  const [countdown, setCountdown] = useState(5)
  const [status, setStatus] = useState<"success" | "error" | "loading">("loading")

  // Redirect to home if no order ID is present
  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    // Confirm order based on payment method
    const confirmOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod,
            paymentIntentId: paymentIntent,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to confirm order")
        }

        setStatus("success")
      } catch (error) {
        console.error("Order confirmation error:", error)
        setStatus("error")
      }
    }

    confirmOrder()
  }, [orderId, paymentMethod, paymentIntent, router])

  // Countdown to redirect to home
  useEffect(() => {
    if (countdown > 0 && status === "success") {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      router.push("/")
    }
  }, [countdown, router, status])

  if (!orderId) return null

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mx-auto max-w-md rounded-lg border border-neutral-200 p-8">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p>Processing your order...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="mb-2 text-2xl font-medium">Order Confirmed!</h1>
            <p className="mb-6 text-neutral-600">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            <div className="mb-6 rounded-lg bg-neutral-50 p-4">
              <p className="text-sm text-neutral-600">Order ID</p>
              <p className="font-medium">{orderId}</p>
            </div>

            <p className="mb-6 text-sm text-neutral-600">
              We have sent an order confirmation email with details of your order.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full">
                  View Orders
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-neutral-500">Redirecting to home page in {countdown} seconds...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-4 text-red-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-medium">Order Failed</h1>
            <p className="mb-6 text-neutral-600">There was an error processing your order. Please try again.</p>
            <Link href="/checkout">
              <Button className="w-full">Try Again</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

