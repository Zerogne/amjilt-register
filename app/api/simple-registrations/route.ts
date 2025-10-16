import { NextResponse } from "next/server"

// Temporary in-memory storage for testing
let registrations: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = registrations.find(reg => reg.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Create registration document
    const registrationData = {
      id: Date.now().toString(),
      name,
      email,
      password, // Note: In production, you should hash this password
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add to in-memory storage
    registrations.push(registrationData)

    console.log("Registration saved:", registrationData)
    console.log("Total registrations:", registrations.length)

    return NextResponse.json(
      {
        message: "Registration created successfully",
        id: registrationData.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating simple registration:", error)
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      registrations,
      count: registrations.length,
    })
  } catch (error) {
    console.error("Error fetching simple registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}