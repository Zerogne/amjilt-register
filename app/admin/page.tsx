import { AdminDashboard } from "@/components/admin-dashboard"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Admin Dashboard - Student Registration System",
  description: "Manage student registrations and applications",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-primary-foreground/90">Manage and review student registration applications</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminDashboard />
      </div>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Student Registration System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
