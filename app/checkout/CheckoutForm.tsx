"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { shippingSchema } from "@/lib/validations/shipping"
import type { ShippingInfo } from "@/lib/validations/shipping"
// import { useRouter } from 'next/router';

export default function CheckoutForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
  })

  const onSubmit = async (data: ShippingInfo) => {
    if (!stripe || !elements) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          amount: 4998, // This should come from your cart
          paymentMethod: "online",
        }),
      })

      const order = await response.json()

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/${order.id}/confirmation`,
        },
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Add other form fields */}

        <PaymentElement />

        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Form>
  )
}

