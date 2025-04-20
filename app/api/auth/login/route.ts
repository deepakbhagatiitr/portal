import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"

// Path to users JSON file
const usersFilePath = path.join(process.cwd(), "data", "users.json")

// Get all users
const getUsers = () => {
  try {
    // Ensure data directory exists
    const dataDirectory = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true })
    }

    // Ensure users.json exists
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]), "utf8")
      return []
    }

    const usersData = fs.readFileSync(usersFilePath, "utf8")
    return JSON.parse(usersData)
  } catch (error) {
    console.error("Error reading users file:", error)
    return []
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Get users
    const users = getUsers()

    // Find user by email
    const user = users.find((u: any) => u.email === email)

    // If user not found or password doesn't match
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

