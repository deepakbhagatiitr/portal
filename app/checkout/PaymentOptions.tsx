// 'use client';

// import { useRouter } from 'next/navigation';
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

// export default function PaymentOptions() {
//   const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleCashOnDelivery = async () => {
//     try {
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           // This should come from your form data
//           amount: 4998,
//           paymentMethod: 'cod'
//         }),
//       });

//       const order = await response.json();
//       router.push(`/checkout/${order.id}/confirmation?payment_method=cod`);
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="font-semibold text-lg">Payment Method</h2>

//       <RadioGroup
//         defaultValue="cod"
//         onValueChange={(value) => setPaymentMethod(value as 'cod' | 'online')}
//         className="flex flex-col space-y-2"
//       >
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="cod" id="cod" />
//           <Label htmlFor="cod">Cash on Delivery</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="online" id="online" />
//           <Label htmlFor="online">Online Payment</Label>
//         </div>
//       </RadioGroup>

//       {paymentMethod === 'cod' && (
//         <Button
//           onClick={handleCashOnDelivery}
//           className="w-full"
//         >
//           Place Order
//         </Button>
//       )}
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")
  const router = useRouter()
  const { toast } = useToast()

  const handleCashOnDelivery = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // This should come from your form data
          amount: 4998,
          paymentMethod: "cod",
        }),
      })

      const order = await response.json()
      router.push(`/checkout/confirmation?orderId=${order.id}&payment_method=cod`)
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Payment Method</h2>

      <RadioGroup
        defaultValue="cod"
        onValueChange={(value) => setPaymentMethod(value as "cod" | "online")}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Cash on Delivery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="online" id="online" />
          <Label htmlFor="online">Online Payment</Label>
        </div>
      </RadioGroup>

      {paymentMethod === "cod" && (
        <Button onClick={handleCashOnDelivery} className="w-full">
          Place Order
        </Button>
      )}
    </div>
  )
}

