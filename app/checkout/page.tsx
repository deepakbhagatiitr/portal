// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import Image from "next/image"
// // import { ChevronLeft } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { useCart } from "@/lib/cart-context"
// // import { useAuth } from "@/lib/auth-context"

// // export default function CheckoutPage() {
// //   const router = useRouter()
// //   const { cartItems, getCartTotal, clearCart } = useCart()
// //   const { isAuthenticated, user } = useAuth()

// //   const [formData, setFormData] = useState({
// //     fullName: user?.name || "",
// //     email: user?.email || "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //     paymentMethod: "cod",
// //     notes: "",
// //   })

// //   const [errors, setErrors] = useState<Record<string, string>>({})
// //   const [loading, setLoading] = useState(false)
// //   const [apiError, setApiError] = useState<string | null>(null)

// //   // Redirect to login if not authenticated
// //   if (!isAuthenticated) {
// //     router.push("/auth/login?redirect=/checkout")
// //     return null
// //   }

// //   // Redirect to cart if cart is empty
// //   if (cartItems.length === 0) {
// //     router.push("/cart")
// //     return null
// //   }

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: value }))
// //     // Clear error when user types
// //     if (errors[name]) {
// //       setErrors((prev) => ({ ...prev, [name]: "" }))
// //     }
// //     // Clear API error when user types
// //     if (apiError) {
// //       setApiError(null)
// //     }
// //   }

// //   const handleRadioChange = (value: string) => {
// //     setFormData((prev) => ({ ...prev, paymentMethod: value }))
// //   }

// //   const validateForm = () => {
// //     const newErrors: Record<string, string> = {}

// //     if (!formData.fullName.trim()) {
// //       newErrors.fullName = "Full name is required"
// //     }

// //     if (!formData.email.trim()) {
// //       newErrors.email = "Email is required"
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = "Email is invalid"
// //     }

// //     if (!formData.phone.trim()) {
// //       newErrors.phone = "Phone number is required"
// //     } else if (!/^\d{10}$/.test(formData.phone)) {
// //       newErrors.phone = "Phone number must be 10 digits"
// //     }

// //     if (!formData.address.trim()) {
// //       newErrors.address = "Address is required"
// //     }

// //     if (!formData.city.trim()) {
// //       newErrors.city = "City is required"
// //     }

// //     if (!formData.state.trim()) {
// //       newErrors.state = "State is required"
// //     }

// //     if (!formData.pincode.trim()) {
// //       newErrors.pincode = "Pincode is required"
// //     } else if (!/^\d{6}$/.test(formData.pincode)) {
// //       newErrors.pincode = "Pincode must be 6 digits"
// //     }

// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!validateForm()) return

// //     setLoading(true)

// //     try {
// //       // Create order object
// //       const orderData = {
// //         userId: user?.id,
// //         orderNumber: `ORD${Date.now()}`,
// //         items: cartItems.map((item) => ({
// //           productId: item.product.productid,
// //           name: item.product.Name,
// //           price: item.product.Price,
// //           quantity: item.quantity,
// //           size: item.size,
// //         })),
// //         shippingAddress: {
// //           fullName: formData.fullName,
// //           email: formData.email,
// //           phone: formData.phone,
// //           address: formData.address,
// //           city: formData.city,
// //           state: formData.state,
// //           pincode: formData.pincode,
// //         },
// //         paymentMethod: formData.paymentMethod,
// //         notes: formData.notes,
// //         subtotal: getCartTotal(),
// //         shipping: 99,
// //         total: getCartTotal() + 99,
// //         status: "pending",
// //         createdAt: new Date().toISOString(),
// //       }

// //       // Save order to database
// //       const response = await fetch("/api/orders", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(orderData),
// //       })

// //       const data = await response.json()

// //       if (!response.ok) {
// //         throw new Error(data.message || "Failed to create order")
// //       }

// //       // Clear cart
// //       clearCart()

// //       // Redirect to order confirmation
// //       router.push(`/checkout/confirmation?orderId=${data.order.orderNumber}`)
// //     } catch (error) {
// //       console.error("Checkout error:", error)
// //       setApiError("An error occurred during checkout. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const subtotal = getCartTotal()
// //   const shipping = 99
// //   const total = subtotal + shipping

// //   return (
// //     <div className="container mx-auto px-4 py-12">
// //       <h1 className="mb-8 text-2xl font-medium md:text-3xl">Checkout</h1>

// //       {apiError && (
// //         <Alert className="mb-6 bg-red-50 text-red-800">
// //           <AlertDescription>{apiError}</AlertDescription>
// //         </Alert>
// //       )}

// //       <div className="grid gap-8 lg:grid-cols-3">
// //         <div className="lg:col-span-2">
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Shipping Information */}
// //             <div className="rounded-lg border border-neutral-200 p-6">
// //               <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>

// //               <div className="grid gap-4 md:grid-cols-2">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="fullName">Full Name</Label>
// //                   <Input
// //                     id="fullName"
// //                     name="fullName"
// //                     value={formData.fullName}
// //                     onChange={handleChange}
// //                     className={errors.fullName ? "border-red-500" : ""}
// //                   />
// //                   {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="email">Email</Label>
// //                   <Input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className={errors.email ? "border-red-500" : ""}
// //                   />
// //                   {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="phone">Phone Number</Label>
// //                   <Input
// //                     id="phone"
// //                     name="phone"
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     className={errors.phone ? "border-red-500" : ""}
// //                   />
// //                   {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
// //                 </div>

// //                 <div className="space-y-2 md:col-span-2">
// //                   <Label htmlFor="address">Address</Label>
// //                   <Textarea
// //                     id="address"
// //                     name="address"
// //                     value={formData.address}
// //                     onChange={handleChange}
// //                     className={errors.address ? "border-red-500" : ""}
// //                   />
// //                   {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="city">City</Label>
// //                   <Input
// //                     id="city"
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={handleChange}
// //                     className={errors.city ? "border-red-500" : ""}
// //                   />
// //                   {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="state">State</Label>
// //                   <Input
// //                     id="state"
// //                     name="state"
// //                     value={formData.state}
// //                     onChange={handleChange}
// //                     className={errors.state ? "border-red-500" : ""}
// //                   />
// //                   {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="pincode">Pincode</Label>
// //                   <Input
// //                     id="pincode"
// //                     name="pincode"
// //                     value={formData.pincode}
// //                     onChange={handleChange}
// //                     className={errors.pincode ? "border-red-500" : ""}
// //                   />
// //                   {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Payment Method */}
// //             <div className="rounded-lg border border-neutral-200 p-6">
// //               <h2 className="mb-4 text-lg font-medium">Payment Method</h2>

// //               <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
// //                 <div className="flex items-center space-x-2">
// //                   <RadioGroupItem value="cod" id="cod" />
// //                   <Label htmlFor="cod">Cash on Delivery</Label>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <RadioGroupItem value="online" id="online" />
// //                   <Label htmlFor="online">Online Payment (Credit/Debit Card, UPI)</Label>
// //                 </div>
// //               </RadioGroup>
// //             </div>

// //             {/* Order Notes */}
// //             <div className="rounded-lg border border-neutral-200 p-6">
// //               <h2 className="mb-4 text-lg font-medium">Order Notes (Optional)</h2>

// //               <div className="space-y-2">
// //                 <Label htmlFor="notes">Special instructions for delivery</Label>
// //                 <Textarea
// //                   id="notes"
// //                   name="notes"
// //                   value={formData.notes}
// //                   onChange={handleChange}
// //                   placeholder="Any special instructions for delivery"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <Link href="/cart" className="flex items-center text-sm font-medium text-primary hover:underline">
// //                 <ChevronLeft className="mr-1 h-4 w-4" />
// //                 Return to Cart
// //               </Link>

// //               <Button type="submit" className="gap-2" disabled={loading}>
// //                 {loading ? "Processing..." : "Place Order"}
// //               </Button>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Order Summary */}
// //         <div className="rounded-lg border border-neutral-200">
// //           <div className="p-6">
// //             <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

// //             {/* Order Items */}
// //             <div className="space-y-4 border-b border-neutral-200 pb-4">
// //               {cartItems.map((item) => (
// //                 <div key={`${item.product.productid}-${item.size || "default"}`} className="flex items-start gap-3">
// //                   <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-md">
// //                     <Image
// //                       src={item.product.image || "/placeholder.svg?height=100&width=100"}
// //                       alt={item.product.Name}
// //                       fill
// //                       className="object-cover"
// //                     />
// //                   </div>
// //                   <div className="flex-1">
// //                     <h3 className="text-sm font-medium">{item.product.Name}</h3>
// //                     {item.size && <p className="text-xs text-neutral-500">Size: {item.size}</p>}
// //                     <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
// //                   </div>
// //                   <p className="text-sm font-medium">₹{item.product.Price * item.quantity}</p>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Price Details */}
// //             <div className="space-y-2 border-b border-neutral-200 py-4">
// //               <div className="flex justify-between">
// //                 <span className="text-neutral-600">Subtotal</span>
// //                 <span>₹{subtotal.toFixed(2)}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-neutral-600">Shipping</span>
// //                 <span>₹{shipping.toFixed(2)}</span>
// //               </div>
// //             </div>

// //             {/* Total */}
// //             <div className="flex justify-between py-4 text-lg font-medium">
// //               <span>Total</span>
// //               <span>₹{total.toFixed(2)}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronLeft } from "lucide-react"
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useCart } from "@/lib/cart-context"
// import { useAuth } from "@/lib/auth-context"
// import { PaymentElement } from "@stripe/react-stripe-js"

// if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
//   throw new Error('Missing required Stripe key: NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { cartItems, getCartTotal, clearCart } = useCart()
//   const { isAuthenticated, user } = useAuth()

//   const [formData, setFormData] = useState({
//     fullName: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     paymentMethod: "cod",
//     notes: "",
//   })

//   const [clientSecret, setClientSecret] = useState<string>("")
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [loading, setLoading] = useState(false)
//   const [apiError, setApiError] = useState<string | null>(null)

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     router.push("/auth/login?redirect=/checkout")
//     return null
//   }

//   // Redirect to cart if cart is empty
//   if (cartItems.length === 0) {
//     router.push("/cart")
//     return null
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }))
//     }
//     if (apiError) {
//       setApiError(null)
//     }
//   }

//   const handleRadioChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, paymentMethod: value }))
//     // Reset client secret when switching payment methods
//     if (value === 'cod') {
//       setClientSecret("")
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required"
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits"
//     }
//     if (!formData.address.trim()) newErrors.address = "Address is required"
//     if (!formData.city.trim()) newErrors.city = "City is required"
//     if (!formData.state.trim()) newErrors.state = "State is required"
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = "Pincode is required"
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       newErrors.pincode = "Pincode must be 6 digits"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)

//     try {
//       // Create order object
//       const orderData = {
//         amount: getCartTotal(),
//         items: cartItems,
//         shippingAddress: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode,
//         },
//         paymentMethod: formData.paymentMethod,
//         notes: formData.notes,
//       }

//       // Create order first
//       const orderRes = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       })

//       const orderResult = await orderRes.json()

//       if (!orderRes.ok) {
//         throw new Error(orderResult.message || "Failed to create order")
//       }

//       if (formData.paymentMethod === 'cod') {
//         // For COD, redirect to confirmation immediately
//         clearCart()
//         router.push(`/checkout/confirmation?orderId=${orderResult.id}&payment_method=cod`)
//         return
//       }

//       // For online payment, create payment intent
//       const paymentRes = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: getCartTotal(),
//           orderId: orderResult.id
//         }),
//       })

//       const paymentResult = await paymentRes.json()

//       if (!paymentRes.ok) {
//         throw new Error(paymentResult.message || "Failed to create payment")
//       }

//       setClientSecret(paymentResult.clientSecret)
//     } catch (error: any) {
//       console.error("Checkout error:", error)
//       setApiError("An error occurred during checkout. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="mb-8 text-2xl font-medium md:text-3xl">Checkout</h1>

//       {apiError && (
//         <Alert className="mb-6 bg-red-50 text-red-800">
//           <AlertDescription>{apiError}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-8 lg:grid-cols-3">
//         {/* Form Section */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Shipping Information */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-2" />
//                   {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-2" />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-2" />
//                   {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-2" />
//                   {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-2" />
//                   {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="state">State</Label>
//                   <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-2" />
//                   {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="pincode">Pincode</Label>
//                   <Input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-2" />
//                   {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="notes">Notes (optional)</Label>
//                   <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="mt-2" />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Payment Method</h2>

//               <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cod" id="cod" />
//                   <Label htmlFor="cod">Cash on Delivery</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="online" id="online" />
//                   <Label htmlFor="online">Online Payment</Label>
//                 </div>
//               </RadioGroup>

//               {formData.paymentMethod === 'online' && (
//                 <Alert className="mt-4">
//                   <AlertDescription>
//                     For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC.
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>

//             {/* Stripe Payment Element */}
//             {clientSecret && formData.paymentMethod === 'online' && (
//               <div className="rounded-lg border border-neutral-200 p-6">
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                   <PaymentElement />
//                 </Elements>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <Link href="/cart" className="flex items-center text-sm font-medium text-primary hover:underline">
//                 <ChevronLeft className="mr-1 h-4 w-4" />
//                 Return to Cart
//               </Link>

//               <Button type="submit" className="gap-2" disabled={loading}>
//                 {loading ? "Processing..." : formData.paymentMethod === 'cod' ? "Place Order" : "Pay Now"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="rounded-lg border border-neutral-200">
//           <div className="p-6">
//             <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4">
//                   <div className="relative h-16 w-16">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className="rounded-md object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                   </div>
//                   <p className="font-medium">₹{item.price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Total */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="font-medium">₹{getCartTotal()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronLeft } from "lucide-react"
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useCart } from "@/lib/cart-context"
// import { useAuth } from "@/lib/auth-context"
// import { PaymentElement } from "@stripe/react-stripe-js"

// if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
//   throw new Error('Missing required Stripe key: NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { cartItems, clearCart } = useCart()
//   const { isAuthenticated, user } = useAuth()

//   const [formData, setFormData] = useState({
//     fullName: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     paymentMethod: "cod",
//     notes: "",
//   })

//   const [clientSecret, setClientSecret] = useState<string>("")
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [loading, setLoading] = useState(false)
//   const [apiError, setApiError] = useState<string | null>(null)

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     router.push("/auth/login?redirect=/checkout")
//     return null
//   }

//   // Redirect to cart if cart is empty
//   if (cartItems.length === 0) {
//     router.push("/cart")
//     return null
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }))
//     }
//     if (apiError) {
//       setApiError(null)
//     }
//   }

//   const handleRadioChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, paymentMethod: value }))
//     // Reset client secret when switching payment methods
//     if (value === 'cod') {
//       setClientSecret("")
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required"
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits"
//     }
//     if (!formData.address.trim()) newErrors.address = "Address is required"
//     if (!formData.city.trim()) newErrors.city = "City is required"
//     if (!formData.state.trim()) newErrors.state = "State is required"
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = "Pincode is required"
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       newErrors.pincode = "Pincode must be 6 digits"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)

//     try {
//       // Create order object
//       const orderData = {
//         amount: getCartTotal(),
//         items: cartItems.map(item => ({
//           productId: item.product.productid,
//           name: item.product.Name,
//           price: item.product.Price,
//           quantity: item.quantity,
//           size: item.size,
//         })),
//         shippingAddress: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode,
//         },
//         paymentMethod: formData.paymentMethod,
//         notes: formData.notes,
//       }

//       // Create order first
//       const orderRes = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       })

//       const orderResult = await orderRes.json()

//       if (!orderRes.ok) {
//         throw new Error(orderResult.message || "Failed to create order")
//       }

//       if (formData.paymentMethod === 'cod') {
//         // For COD, redirect to confirmation immediately
//         clearCart()
//         router.push(`/checkout/confirmation?orderId=${orderResult.id}&payment_method=cod`)
//         return
//       }

//       // For online payment, create payment intent
//       const paymentRes = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: getCartTotal(),
//           orderId: orderResult.id
//         }),
//       })

//       const paymentResult = await paymentRes.json()

//       if (!paymentRes.ok) {
//         throw new Error(paymentResult.message || "Failed to create payment")
//       }

//       setClientSecret(paymentResult.clientSecret)
//     } catch (error: any) {
//       console.error("Checkout error:", error)
//       setApiError("An error occurred during checkout. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.product.Price * item.quantity), 0);
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="mb-8 text-2xl font-medium md:text-3xl">Checkout</h1>

//       {apiError && (
//         <Alert className="mb-6 bg-red-50 text-red-800">
//           <AlertDescription>{apiError}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-8 lg:grid-cols-3">
//         {/* Form Section */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Shipping Information */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-2" />
//                   {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-2" />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-2" />
//                   {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-2" />
//                   {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-2" />
//                   {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="state">State</Label>
//                   <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-2" />
//                   {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="pincode">Pincode</Label>
//                   <Input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-2" />
//                   {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="notes">Notes (optional)</Label>
//                   <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="mt-2" />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Payment Method</h2>

//               <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cod" id="cod" />
//                   <Label htmlFor="cod">Cash on Delivery</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="online" id="online" />
//                   <Label htmlFor="online">Online Payment</Label>
//                 </div>
//               </RadioGroup>

//               {formData.paymentMethod === 'online' && (
//                 <Alert className="mt-4">
//                   <AlertDescription>
//                     For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC.
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>

//             {/* Stripe Payment Element */}
//             {clientSecret && formData.paymentMethod === 'online' && (
//               <div className="rounded-lg border border-neutral-200 p-6">
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                   <PaymentElement />
//                 </Elements>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <Link href="/cart" className="flex items-center text-sm font-medium text-primary hover:underline">
//                 <ChevronLeft className="mr-1 h-4 w-4" />
//                 Return to Cart
//               </Link>

//               <Button type="submit" className="gap-2" disabled={loading}>
//                 {loading ? "Processing..." : formData.paymentMethod === 'cod' ? "Place Order" : "Pay Now"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="rounded-lg border border-neutral-200">
//           <div className="p-6">
//             <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={`${item.product.productid}-${item.size || "default"}`} className="flex items-center gap-4">
//                   <div className="relative h-16 w-16">
//                     <Image
//                       src={item.product.image || "/placeholder.svg?height=200&width=200"}
//                       alt={item.product.Name}
//                       fill
//                       className="rounded-md object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium">{item.product.Name}</p>
//                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                     {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
//                   </div>
//                   <p className="font-medium">₹{item.product.Price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Total */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="font-medium">₹{getCartTotal()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronLeft } from "lucide-react"
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useCart } from "@/lib/cart-context"
// import { useAuth } from "@/lib/auth-context"
// import { PaymentElement } from "@stripe/react-stripe-js"

// // Initialize Stripe only on client side and handle missing key gracefully
// const getStripe = () => {
//   if (typeof window === 'undefined') return null;

//   const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
//   if (!key) {
//     console.error('Stripe public key is missing');
//     return null;
//   }

//   return loadStripe(key);
// };

// const stripePromise = getStripe();

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { cartItems, clearCart } = useCart()
//   const { isAuthenticated, user } = useAuth()

//   const [formData, setFormData] = useState({
//     fullName: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     paymentMethod: "cod",
//     notes: "",
//   })

//   const [clientSecret, setClientSecret] = useState<string>("")
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [loading, setLoading] = useState(false)
//   const [apiError, setApiError] = useState<string | null>(null)

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     router.push("/auth/login?redirect=/checkout")
//     return null
//   }

//   // Redirect to cart if cart is empty
//   if (cartItems.length === 0) {
//     router.push("/cart")
//     return null
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }))
//     }
//     if (apiError) {
//       setApiError(null)
//     }
//   }

//   const handleRadioChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, paymentMethod: value }))
//     // Reset client secret when switching payment methods
//     if (value === 'cod') {
//       setClientSecret("")
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required"
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits"
//     }
//     if (!formData.address.trim()) newErrors.address = "Address is required"
//     if (!formData.city.trim()) newErrors.city = "City is required"
//     if (!formData.state.trim()) newErrors.state = "State is required"
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = "Pincode is required"
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       newErrors.pincode = "Pincode must be 6 digits"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)

//     try {
//       // Create order object
//       const orderData = {
//         amount: getCartTotal(),
//         items: cartItems.map(item => ({
//           productId: item.product.productid,
//           name: item.product.Name,
//           price: item.product.Price,
//           quantity: item.quantity,
//           size: item.size,
//         })),
//         shippingAddress: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode,
//         },
//         paymentMethod: formData.paymentMethod,
//         notes: formData.notes,
//       }

//       // Create order first
//       const orderRes = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       })

//       const orderResult = await orderRes.json()

//       if (!orderRes.ok) {
//         throw new Error(orderResult.message || "Failed to create order")
//       }

//       if (formData.paymentMethod === 'cod') {
//         // For COD, redirect to confirmation immediately
//         clearCart()
//         router.push(`/checkout/confirmation?orderId=${orderResult.id}&payment_method=cod`)
//         return
//       }

//       // For online payment, create payment intent
//       const paymentRes = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: getCartTotal(),
//           orderId: orderResult.id
//         }),
//       })

//       const paymentResult = await paymentRes.json()

//       if (!paymentRes.ok) {
//         throw new Error(paymentResult.message || "Failed to create payment")
//       }

//       setClientSecret(paymentResult.clientSecret)
//     } catch (error: any) {
//       console.error("Checkout error:", error)
//       setApiError("An error occurred during checkout. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.product.Price * item.quantity), 0);
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="mb-8 text-2xl font-medium md:text-3xl">Checkout</h1>

//       {apiError && (
//         <Alert className="mb-6 bg-red-50 text-red-800">
//           <AlertDescription>{apiError}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-8 lg:grid-cols-3">
//         {/* Form Section */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Shipping Information */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-2" />
//                   {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-2" />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-2" />
//                   {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-2" />
//                   {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-2" />
//                   {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="state">State</Label>
//                   <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-2" />
//                   {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="pincode">Pincode</Label>
//                   <Input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-2" />
//                   {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
//                 </div>
//                 <div>
//                   <Label htmlFor="notes">Notes (optional)</Label>
//                   <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="mt-2" />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="rounded-lg border border-neutral-200 p-6">
//               <h2 className="mb-4 text-lg font-medium">Payment Method</h2>

//               <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cod" id="cod" />
//                   <Label htmlFor="cod">Cash on Delivery</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="online" id="online" />
//                   <Label htmlFor="online">Online Payment</Label>
//                 </div>
//               </RadioGroup>

//               {formData.paymentMethod === 'online' && (
//                 <Alert className="mt-4">
//                   <AlertDescription>
//                     For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC.
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>

//             {/* Stripe Payment Element */}
//             {clientSecret && formData.paymentMethod === 'online' && stripePromise && (
//               <div className="rounded-lg border border-neutral-200 p-6">
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                   <PaymentElement />
//                 </Elements>
//               </div>
//             )}

//             <div className="flex items-center justify-between">
//               <Link href="/cart" className="flex items-center text-sm font-medium text-primary hover:underline">
//                 <ChevronLeft className="mr-1 h-4 w-4" />
//                 Return to Cart
//               </Link>

//               <Button type="submit" className="gap-2" disabled={loading}>
//                 {loading ? "Processing..." : formData.paymentMethod === 'cod' ? "Place Order" : "Pay Now"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="rounded-lg border border-neutral-200">
//           <div className="p-6">
//             <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={`${item.product.productid}-${item.size || "default"}`} className="flex items-center gap-4">
//                   <div className="relative h-16 w-16">
//                     <Image
//                       src={item.product.image || "/placeholder.svg?height=200&width=200"}
//                       alt={item.product.Name}
//                       fill
//                       className="rounded-md object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium">{item.product.Name}</p>
//                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                     {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
//                   </div>
//                   <p className="font-medium">₹{item.product.Price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Total */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="font-medium">₹{getCartTotal()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { PaymentElement } from "@stripe/react-stripe-js"

// Initialize Stripe only on client side and handle missing key gracefully
const getStripe = () => {
  if (typeof window === "undefined") return null

  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  if (!key) {
    console.error("Stripe public key is missing")
    return null
  }

  return loadStripe(key)
}

const stripePromise = getStripe()

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
    notes: "",
  })

  const [clientSecret, setClientSecret] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/checkout")
    return null
  }

  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (apiError) {
      setApiError(null)
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
    // Reset client secret when switching payment methods
    if (value === "cod") {
      setClientSecret("")
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Create order object
      const orderData = {
        userId: user?.id, // Add user ID to order data
        amount: getCartTotal(),
        items: cartItems.map((item) => ({
          productId: item.product.productid,
          name: item.product.Name,
          price: item.product.Price,
          quantity: item.quantity,
          size: item.size,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      }

      // Create order first
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const orderResult = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderResult.message || "Failed to create order")
      }

      if (formData.paymentMethod === "cod") {
        // For COD, redirect to confirmation immediately
        clearCart()
        router.push(`/checkout/confirmation?orderId=${orderResult.id}&payment_method=cod`)
        return
      }

      // For online payment, create payment intent
      const paymentRes = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getCartTotal(),
          orderId: orderResult.id,
        }),
      })

      const paymentResult = await paymentRes.json()

      if (!paymentRes.ok) {
        throw new Error(paymentResult.message || "Failed to create payment")
      }

      setClientSecret(paymentResult.clientSecret)
    } catch (error: any) {
      console.error("Checkout error:", error)
      setApiError(error.message || "An error occurred during checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.Price * item.quantity, 0)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-2xl font-medium md:text-3xl">Checkout</h1>

      {apiError && (
        <Alert className="mb-6 bg-red-50 text-red-800">
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="rounded-lg border border-neutral-200 p-6">
              <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="mt-2" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border border-neutral-200 p-6">
              <h2 className="mb-4 text-lg font-medium">Payment Method</h2>

              <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
              </RadioGroup>

              {formData.paymentMethod === "online" && (
                <Alert className="mt-4">
                  <AlertDescription>
                    For testing, use card number: 4242 4242 4242 4242, any future date, any 3 digits for CVC.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Stripe Payment Element */}
            {clientSecret && formData.paymentMethod === "online" && stripePromise && (
              <div className="rounded-lg border border-neutral-200 p-6">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentElement />
                </Elements>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link href="/cart" className="flex items-center text-sm font-medium text-primary hover:underline">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Return to Cart
              </Link>

              <Button type="submit" className="gap-2" disabled={loading}>
                {loading ? "Processing..." : formData.paymentMethod === "cod" ? "Place Order" : "Pay Now"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border border-neutral-200">
          <div className="p-6">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.product.productid}-${item.size || "default"}`} className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={item.product.image || "/placeholder.svg?height=200&width=200"}
                      alt={item.product.Name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.Name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  </div>
                  <p className="font-medium">₹{item.product.Price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">₹{getCartTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

