import { getDatabase } from "@/lib/mongodb"
import type { Registration, RegistrationInput } from "@/lib/models/registration"
import { ObjectId } from "mongodb"

const COLLECTION_NAME = "registrations"

export async function createRegistration(data: RegistrationInput): Promise<Registration> {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  const registration: Omit<Registration, "_id"> = {
    ...data,
    dateOfBirth: new Date(data.dateOfBirth),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await collection.insertOne(registration as Registration)

  return {
    ...registration,
    _id: result.insertedId,
  }
}

export async function getAllRegistrations(): Promise<Registration[]> {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function updateRegistrationStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function deleteRegistration(id: string): Promise<boolean> {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  const result = await collection.deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount > 0
}

export async function getRegistrationStats() {
  const db = await getDatabase()
  const collection = db.collection<Registration>(COLLECTION_NAME)

  const [total, pending, approved, rejected] = await Promise.all([
    collection.countDocuments(),
    collection.countDocuments({ status: "pending" }),
    collection.countDocuments({ status: "approved" }),
    collection.countDocuments({ status: "rejected" }),
  ])

  return { total, pending, approved, rejected }
}
