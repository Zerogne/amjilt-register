import { NextResponse } from "next/server"
import { getRegistrationStats } from "@/lib/db/registrations"

export async function GET() {
  try {
    const stats = await getRegistrationStats()

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching registration stats:", error)
    return NextResponse.json({ error: "Failed to fetch registration stats" }, { status: 500 })
  }
}
