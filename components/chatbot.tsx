"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Send, X, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProducts } from "@/lib/products"
import type { Product } from "@/types/product"

// Predefined questions and their keywords for matching
const predefinedQuestions = {
  "show me sarees for weddings": "wedding",
  "what silk sarees do you have": "silk",
  "do you have sarees under ₹3000": "3000",
  "show me party wear sarees": "party wear",
  "what are the latest saree collections": "new",
  "do you have casual sarees": "casual",
  "show me cotton sarees": "cotton",
  "do you have floral pattern sarees": "floral",
  "which sarees are good for summer": "lightweight",
  "show me zari work sarees": "zari",
  "what are the best-selling sarees": "bestseller",
  "do you have ready-to-wear sarees": "ready to wear",
  "show me sarees in blue color": "blue",
  "do you have sarees with blouse included": "blouse",
  "show me budget-friendly sarees": "budget",
  "do you have sarees with traditional patterns": "traditional",
  "which sarees are best for festivals": "festive",
  "show me machine-washable sarees": "machine wash",
  "what kurtis do you have": "kurti",
  "show me gowns for parties": "gown party",
  "do you have plus size options": "plus size",
  "what are your best selling products": "best-seller",
  "show me your new arrivals": "new",
  "what's on sale right now": "sale",
  "do you have kurta sets": "kurta set",
  "what's your return policy": "return policy",
  "how do I track my order": "track order",
  "do you offer cash on delivery": "cash on delivery",
  "what payment methods do you accept": "payment methods",
}

// Additional responses for non-product queries
const generalResponses = {
  "return policy":
    "We offer a 7-day return policy for all products. Please visit our Return Policy page for more details.",
  "track order":
    "You can track your order in the My Orders section of your account. If you have any issues, please contact our customer support.",
  "cash on delivery": "Yes, we offer Cash on Delivery for orders within India. This option is available at checkout.",
  "payment methods": "We accept Credit/Debit cards, UPI, Net Banking, and Cash on Delivery as payment methods.",
  shipping: "We offer free shipping on orders above ₹999. Standard delivery takes 3-5 business days.",
  contact: "You can reach our customer support at support@elegance.com or call us at +91-9876543210.",
  "size guide": "Please check our Size Guide page for detailed measurements for all our products.",
  discount: "We regularly offer discounts and promotions. Use code WELCOME10 for 10% off on your first order!",
  hello:
    "Hello! How can I help you today? I can assist with finding products, answering questions about orders, or providing information about our policies.",
  hi: "Hi there! How can I assist you today with your shopping?",
  help: "I'm here to help! You can ask me about our products, shipping, returns, or any other questions you might have.",
}

// NLP utilities
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
}

function calculateSimilarity(query: string, reference: string): number {
  const queryTokens = tokenize(query)
  const referenceTokens = tokenize(reference)

  let matches = 0
  for (const queryToken of queryTokens) {
    if (referenceTokens.some((refToken) => refToken.includes(queryToken) || queryToken.includes(refToken))) {
      matches++
    }
  }

  return matches / Math.max(queryTokens.length, 1)
}

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  products?: Product[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your shopping assistant. How can I help you today?",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastContext, setLastContext] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Process the user's message
    await processUserMessage(userMessage.text)

    setIsLoading(false)
  }

  const processUserMessage = async (userText: string) => {
    const userTextLower = userText.toLowerCase()

    // Check for general responses first
    for (const [key, response] of Object.entries(generalResponses)) {
      if (userTextLower.includes(key)) {
        addBotMessage(response)
        return
      }
    }

    // Check for context-aware follow-up questions
    if (
      lastContext &&
      (userTextLower.includes("show me more") ||
        userTextLower.includes("more options") ||
        userTextLower.includes("anything else"))
    ) {
      await findAndDisplayProducts(lastContext)
      return
    }

    // Find the best matching predefined question using fuzzy matching
    let bestMatch = ""
    let highestSimilarity = 0.3 // Threshold for matching

    for (const question of Object.keys(predefinedQuestions)) {
      const similarity = calculateSimilarity(userTextLower, question)
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity
        bestMatch = question
      }
    }

    if (bestMatch) {
      const keyword = predefinedQuestions[bestMatch as keyof typeof predefinedQuestions]
      await findAndDisplayProducts(keyword)
      setLastContext(keyword)
    } else {
      // No match found, try to extract keywords directly
      const keywords = extractKeywords(userTextLower)
      if (keywords.length > 0) {
        await findAndDisplayProducts(keywords.join(" "))
        setLastContext(keywords.join(" "))
      } else {
        addBotMessage(
          "I'm not sure I understand. Could you please rephrase your question? You can ask about specific products, materials, or occasions.",
        )
      }
    }
  }

  const extractKeywords = (text: string): string[] => {
    const keywords = []
    const productTypes = ["saree", "kurti", "gown", "kurta", "dress"]
    const materials = ["silk", "cotton", "georgette", "chiffon", "linen"]
    const occasions = ["wedding", "party", "casual", "festive", "formal"]
    const colors = ["red", "blue", "green", "yellow", "pink", "black", "white"]

    const tokens = tokenize(text)

    for (const token of tokens) {
      if (productTypes.some((type) => token.includes(type))) {
        keywords.push(token)
      }
      if (materials.some((material) => token.includes(material))) {
        keywords.push(token)
      }
      if (occasions.some((occasion) => token.includes(occasion))) {
        keywords.push(token)
      }
      if (colors.some((color) => token.includes(color))) {
        keywords.push(token)
      }
      // Check for price mentions
      if (token.includes("₹") || token.includes("rs") || /\d{3,}/.test(token)) {
        keywords.push(token)
      }
    }

    return keywords
  }

  const findAndDisplayProducts = async (keyword: string) => {
    try {
      const allProducts = await getProducts()

      // Filter products based on the keyword
      const filteredProducts = allProducts.filter((product) => {
        const productName = product.Name.toLowerCase()
        const category = product.Cateogory.toLowerCase()
        const collection = product.Description?.Collection?.toLowerCase() || ""
        const material = product.Description?.Material?.toLowerCase() || ""
        const occasions = product.Description?.Occasion?.map((o) => o.toLowerCase()) || []
        const tags = product.tags?.map((t) => t.toLowerCase()) || []

        // Check if the product matches the price constraint
        if (keyword.includes("3000") && product.Price > 3000) {
          return false
        }

        if (keyword === "budget" && product.Price > 2000) {
          return false
        }

        // Check for bestseller tag
        if ((keyword === "bestseller" || keyword === "best-seller") && !tags.includes("best-seller")) {
          return false
        }

        // Check for new tag
        if (keyword === "new" && !tags.includes("new")) {
          return false
        }

        // Check for sale tag
        if (keyword === "sale" && !tags.includes("sale")) {
          return false
        }

        // Check other attributes
        return (
          productName.includes(keyword) ||
          category.includes(keyword) ||
          collection.includes(keyword) ||
          material.includes(keyword) ||
          occasions.some((o) => o.includes(keyword)) ||
          tags.some((t) => t.includes(keyword))
        )
      })

      if (filteredProducts.length > 0) {
        // Display up to 3 products
        const productsToShow = filteredProducts.slice(0, 3)

        addBotMessage(`Here are some products that match your request:`, productsToShow)

        if (filteredProducts.length > 3) {
          addBotMessage("Would you like to see more options? Just ask for 'more options'.")
        }
      } else {
        addBotMessage(
          "I couldn't find any products matching your request. Would you like to see our featured products instead?",
        )
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      addBotMessage("Sorry, I encountered an error while searching for products. Please try again later.")
    }
  }

  const addBotMessage = (text: string, products?: Product[]) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      products,
    }

    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chatbot window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 md:w-96 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between bg-primary p-4 text-white">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <h3 className="font-medium">Shopping Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 max-w-[85%] rounded-lg p-3 ${
                message.sender === "user" ? "ml-auto bg-primary text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{message.text}</p>

              {/* Product recommendations */}
              {message.products && message.products.length > 0 && (
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {message.products.map((product) => (
                    <Link
                      href={`/product/${product.productid}`}
                      key={product.productid}
                      className="flex items-center gap-2 rounded bg-white p-2 text-black no-underline hover:bg-gray-50"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={product.image || "/placeholder.svg?height=100&width=100"}
                          alt={product.Name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate text-sm font-medium">{product.Name}</h4>
                        <p className="text-sm font-bold">₹{product.Price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="border-t border-gray-200 p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <div className="mt-2 text-xs text-gray-500">Try asking: "Show me silk sarees" or "What's on sale?"</div>
        </div>
      </div>
    </>
  )
}

