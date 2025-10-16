import { NextResponse } from "next/server"
import { createRegistration, getAllRegistrations } from "@/lib/db/registrations"
import type { RegistrationInput } from "@/lib/models/registration"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "address",
      "city",
      "country",
      "program",
      "educationLevel",
      "institution",
      "graduationYear",
      "motivation",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate motivation length
    if (body.motivation.length < 100) {
      return NextResponse.json({ error: "Motivation must be at least 100 characters" }, { status: 400 })
    }

    const registrationData: RegistrationInput = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      address: body.address,
      city: body.city,
      country: body.country,
      program: body.program,
      educationLevel: body.educationLevel,
      institution: body.institution,
      graduationYear: Number.parseInt(body.graduationYear),
      motivation: body.motivation,
    }

    const registration = await createRegistration(registrationData)

    return NextResponse.json(
      {
        message: "Registration created successfully",
        registration,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating registration:", error)
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const registrations = await getAllRegistrations()

    return NextResponse.json({
      registrations,
      count: registrations.length,
    })
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
