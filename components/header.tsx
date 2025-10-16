"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Menu, X, Calendar, FileText, Users, Award } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">Мэдээлэл зүйн олимпиадын бүртгэлийн систем</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Олимпиадын хуваарь
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>2025-2026 оны хичээлийн жилийн мэдээлэл зүйн олимпиадуудын хуваарь</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600">БЕГ-аас батлагдаж ирээгүй байна.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Дүрэм
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>2025-2026 оны хичээлийн жилийн мэдээлэл зүйн цуврал олимпиадын дүрэм</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600">Дүрмийн мэдээлэл ороогүй байна.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Ранк
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Олимпиадын хуваарь
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Дүрэм
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Ранк
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
