import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const dataDirectory = path.join(process.cwd(), "data")
const ORDERS_FILE = path.join(dataDirectory, "orders.json")

// Initialize orders file if it doesn't exist
const ensureOrdersFile = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true })
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, "[]", "utf-8")
  }
}

export async function POST(req: Request) {
  try {
    ensureOrdersFile()
    const orderData = await req.json()

    // Read existing orders
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"))

    // Create new order
    const newOrder = {
      id: uuidv4(),
      ...orderData,
      status: orderData.paymentMethod === "cod" ? "pending" : "awaiting_payment",
      createdAt: new Date().toISOString(),
    }

    // Add to orders
    orders.push(newOrder)

    // Save orders
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))

    return NextResponse.json(newOrder)
  } catch (error: any) {
    console.error("Order creation error:", error)
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    ensureOrdersFile()
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Read orders
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"))

    // Filter orders by user
    const userOrders = orders.filter((order: any) => order.userId === userId)

    return NextResponse.json(userOrders)
  } catch (error: any) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch orders" }, { status: 500 })
  }
}

