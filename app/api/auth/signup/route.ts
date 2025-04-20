import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

// Path to users JSON file
const dataDirectory = path.join(process.cwd(), "data")
const usersFilePath = path.join(dataDirectory, "users.json")

// Ensure data directory exists
const ensureDirectoryExists = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true })
  }

  // Create users.json if it doesn't exist
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]), "utf8")
  }
}

// Get all users
const getUsers = () => {
  ensureDirectoryExists()
  try {
    const usersData = fs.readFileSync(usersFilePath, "utf8")
    return JSON.parse(usersData)
  } catch (error) {
    console.error("Error reading users file:", error)
    return []
  }
}

// Save users
const saveUsers = (users: any[]) => {
  ensureDirectoryExists()
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8")
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Ensure data directory exists
    ensureDirectoryExists()

    // Get existing users
    const users = getUsers()

    // Check if user already exists
    if (users.some((user: any) => user.email === email)) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }

    // Add user to array and save
    users.push(newUser)
    saveUsers(users)

    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

