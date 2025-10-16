import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read registrations from file
export const readRegistrations = () => {
  try {
    ensureDataDir()
    if (!fs.existsSync(DATA_FILE)) {
      return []
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading registrations:', error)
    return []
  }
}

// Write registrations to file
export const writeRegistrations = (registrations: any[]) => {
  try {
    ensureDataDir()
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2))
    return true
  } catch (error) {
    console.error('Error writing registrations:', error)
    return false
  }
}

// Add new registration
export const addRegistration = (registration: any) => {
  const registrations = readRegistrations()
  const newRegistration = {
    ...registration,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  registrations.push(newRegistration)
  
  if (writeRegistrations(registrations)) {
    return newRegistration
  }
  return null
}

// Get all registrations
export const getAllRegistrations = () => {
  return readRegistrations()
}
