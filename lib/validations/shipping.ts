import { z } from "zod"

export const shippingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "online"]),
})

export type ShippingInfo = z.infer<typeof shippingSchema>

