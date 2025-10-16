import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { addRegistration, getAllRegistrations } from "@/lib/fileStorage"

export async function POST(request: Request) {
  try {
    const body = await request.json()
  const { name, email, mobile, className } = body

  // Validate required fields
  if (!name || !email || !mobile || !className) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
  }

  // Validate mobile number (basic check)
  if (mobile.length < 8) {
    return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 })
  }

    // Try MongoDB first, fallback to file storage
    try {
      // Connect to MongoDB
      const db = await getDatabase()

      // Check if email already exists
      const existingUser = await db.collection("simple_registrations").findOne({ email })
      if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 })
      }

      // Create registration document
      const registrationData = {
        name,
        email,
        mobile,
        className,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Insert into MongoDB
      const result = await db.collection("simple_registrations").insertOne(registrationData)

      console.log("Registration saved to MongoDB:", result.insertedId)

      return NextResponse.json(
        {
          message: "Registration created successfully",
          id: result.insertedId,
        },
        { status: 201 },
      )
    } catch (mongoError) {
      console.log("MongoDB failed, using file storage:", mongoError)
      
      // Fallback to file storage
      const allRegistrations = getAllRegistrations()
      const existingUser = allRegistrations.find((reg: any) => reg.email === email)
      if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 })
      }

      const registrationData = {
        name,
        email,
        mobile,
        className
      }

      const result = addRegistration(registrationData)

      if (result) {
        console.log("Registration saved to file:", result.id)
        return NextResponse.json(
          {
            message: "Registration created successfully (file storage)",
            id: result.id,
          },
          { status: 201 },
        )
      } else {
        throw new Error("Failed to save registration")
      }
    }
  } catch (error) {
    console.error("Error creating simple registration:", error)
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Try MongoDB first, fallback to file storage
    try {
      const db = await getDatabase()
      const registrations = await db.collection("simple_registrations").find({}).toArray()

      return NextResponse.json({
        registrations,
        count: registrations.length,
      })
    } catch (mongoError) {
      console.log("MongoDB failed, using file storage for GET:", mongoError)
      
      // Fallback to file storage
      const registrations = getAllRegistrations()

      return NextResponse.json({
        registrations,
        count: registrations.length,
      })
    }
  } catch (error) {
    console.error("Error fetching simple registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}