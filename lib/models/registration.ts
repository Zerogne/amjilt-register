import type { ObjectId } from "mongodb"

export interface Registration {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: "male" | "female" | "other"
  address: string
  city: string
  country: string
  program: string
  educationLevel: string
  institution: string
  graduationYear: number
  motivation: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

export interface RegistrationInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  address: string
  city: string
  country: string
  program: string
  educationLevel: string
  institution: string
  graduationYear: number
  motivation: string
}
