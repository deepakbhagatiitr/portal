import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="mb-6 flex items-center text-sm font-medium text-primary hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-medium md:text-4xl">Return & Refund Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            At Elegance, we want you to be completely satisfied with your purchase. We understand that sometimes you may
            need to return an item, and we've made our return process as simple and convenient as possible.
          </p>

          <h2>Return Eligibility</h2>
          <p>You may return merchandise purchased from Elegance within 7 days of delivery, provided that:</p>
          <ul>
            <li>The item is unworn, unwashed, and undamaged</li>
            <li>Original tags are attached</li>
            <li>The item is in its original packaging</li>
            <li>You have the original receipt or proof of purchase</li>
          </ul>

          <h2>Non-Returnable Items</h2>
          <p>The following items cannot be returned:</p>
          <ul>
            <li>Customized or personalized products</li>
            <li>Intimate wear for hygiene reasons</li>
            <li>Sale items marked as "Final Sale"</li>
            <li>Gift cards</li>
            <li>Items damaged due to customer misuse</li>
          </ul>

          <h2>Return Process</h2>
          <ol>
            <li>
              <strong>Initiate a Return:</strong> Log in to your account and go to "My Orders." Select the order
              containing the item(s) you wish to return and click on "Return Items." Alternatively, you can contact our
              customer service team at returns@elegance.com.
            </li>
            <li>
              <strong>Return Authorization:</strong> Once your return request is submitted, you will receive a Return
              Authorization (RA) number and return shipping instructions via email within 24-48 hours.
            </li>
            <li>
              <strong>Package Your Return:</strong> Pack the item(s) securely in appropriate packaging. Include the RA
              number and original packing slip in the package.
            </li>
            <li>
              <strong>Ship Your Return:</strong> Ship the package to the address provided in the return instructions. We
              recommend using a trackable shipping method.
            </li>
            <li>
              <strong>Return Processing:</strong> Once we receive your return, our team will inspect the item(s) and
              process your return within 3-5 business days.
            </li>
          </ol>

          <h2>Refund Options</h2>
          <p>You can choose from the following refund options:</p>
          <ul>
            <li>
              <strong>Original Payment Method:</strong> Refund to the original payment method used for the purchase
            </li>
            <li>
              <strong>Store Credit:</strong> Receive store credit for the full amount of your purchase (including
              shipping charges)
            </li>
            <li>
              <strong>Exchange:</strong> Exchange for another item of equal or greater value (you will be charged the
              difference if selecting an item of greater value)
            </li>
          </ul>

          <h2>Refund Timeline</h2>
          <p>
            Refunds will be processed within 7-10 business days after we receive and inspect your return. Please note
            that it may take additional time for the refund to appear on your account, depending on your payment
            provider.
          </p>

          <h2>Return Shipping Costs</h2>
          <p>Return shipping costs are the responsibility of the customer, except in the following cases:</p>
          <ul>
            <li>The item received was defective or damaged</li>
            <li>You received an incorrect item</li>
            <li>The item significantly differs from its description on our website</li>
          </ul>

          <h2>Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact our customer service team within 48 hours of
            delivery. Please provide photographs of the damaged item and packaging. We will arrange for a replacement or
            refund at no additional cost to you.
          </p>

          <h2>Exchanges</h2>
          <p>
            If you wish to exchange an item for a different size or color, please follow the return process and indicate
            your preference for an exchange. Once we receive your return, we will process the exchange if the requested
            item is in stock. If the item is not available, we will issue a refund.
          </p>

          <h2>Late or Missing Refunds</h2>
          <p>
            If you haven't received your refund within the specified timeframe, please check your bank account again and
            then contact your credit card company or bank, as it may take some time for the refund to be officially
            posted. If you've done this and still haven't received your refund, please contact our customer service
            team.
          </p>

          <h2>Special Circumstances</h2>
          <p>
            We understand that special circumstances may arise. If you have a return request that falls outside of our
            standard policy, please contact our customer service team, and we will do our best to assist you.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about our return policy, please contact us at:</p>
          <ul>
            <li>Email: returns@elegance.com</li>
            <li>Phone: +91-9876543210 (Monday to Saturday, 10:00 AM to 6:00 PM IST)</li>
            <li>Address: Elegance Customer Service, 123 Fashion Street, Mumbai, Maharashtra 400001, India</li>
          </ul>

          <p>
            <em>
              This return policy was last updated on January 1, 2023, and is subject to change without prior notice.
            </em>
          </p>
        </div>
      </div>
    </div>
  )
}

