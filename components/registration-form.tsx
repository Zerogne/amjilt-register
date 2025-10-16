"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"

export function RegistrationForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    program: "",
    educationLevel: "",
    institution: "",
    graduationYear: new Date().getFullYear(),
    motivation: "",
    bankName: "",
    transactionId: "",
    paymentAmount: "10000",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit registration")
      }

      setIsSuccess(true)
      toast({
        title: "Хүсэлт амжилттай илгээгдлээ!",
        description: "Таны хүсэлтийг амжилттай хүлээн авлаа.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        country: "",
        program: "",
        educationLevel: "",
        institution: "",
        graduationYear: new Date().getFullYear(),
        motivation: "",
        bankName: "",
        transactionId: "",
        paymentAmount: "10000",
      })
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Хүсэлт амжилттай илгээгдлээ!</h3>
        <p className="text-gray-600 mb-6">
          Таны хүсэлтийг хүлээн авлаа. Бид шалгаж, удахгүй хариу өгөх болно.
        </p>
        <Button onClick={() => setIsSuccess(false)} className="bg-blue-600 hover:bg-blue-700">
          Өөр хүсэлт илгээх
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Хувийн мэдээлэл</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Нэр *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Нэрээ оруулна уу"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Овог *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Овгоо оруулна уу"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Имэйл хаяг *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Утасны дугаар *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+976 99 99 99 99"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Төрсөн огноо *</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Хүйс *</Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Хүйсээ сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Эрэгтэй</SelectItem>
                <SelectItem value="female">Эмэгтэй</SelectItem>
                <SelectItem value="other">Бусад</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Хаягийн мэдээлэл</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Гэрийн хаяг *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Гэрийн хаягаа оруулна уу"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Хот/Аймаг *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Хот/аймгаа оруулна уу"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Улс *</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Улсаа оруулна уу"
            />
          </div>
        </div>
      </div>

      {/* Education Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Боловсролын мэдээлэл</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="program">Сонгосон ангилал *</Label>
            <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Ангилалаа сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="senior">Ахлах ангилал</SelectItem>
                <SelectItem value="middle">Дунд ангилал</SelectItem>
                <SelectItem value="teacher">Багш</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="educationLevel">Боловсролын зэрэг *</Label>
            <Select
              value={formData.educationLevel}
              onValueChange={(value) => handleSelectChange("educationLevel", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Боловсролын зэргээ сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">Ахлах сургууль</SelectItem>
                <SelectItem value="associate">Дунд мэргэжлийн</SelectItem>
                <SelectItem value="bachelor">Бакалавр</SelectItem>
                <SelectItem value="master">Магистр</SelectItem>
                <SelectItem value="doctorate">Доктор</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Одоогийн/Өмнөх сургууль *</Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="Сургуулийн нэрийг оруулна уу"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="graduationYear">Төгсөх жил *</Label>
            <Input
              id="graduationYear"
              name="graduationYear"
              type="number"
              min="1950"
              max="2030"
              value={formData.graduationYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Төлбөрийн мэдээлэл</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Банкны нэр *</Label>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              placeholder="Жишээ: ХААН банк"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionId">Гүйлгээний утга *</Label>
            <Input
              id="transactionId"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              placeholder="Гүйлгээний утга (утасны дугаар)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentAmount">Төлсөн дүн *</Label>
            <Input
              id="paymentAmount"
              name="paymentAmount"
              value={formData.paymentAmount}
              onChange={handleChange}
              required
              placeholder="10000"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Санамж:</strong> Төлбөр төлөхдөө гүйлгээний утга дээр утасны дугаараа бичсэн байх ёстой.
          </p>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Оролцох шалтгаан</h3>
        <div className="space-y-2">
          <Label htmlFor="motivation">Яагаад энэ олимпиадд оролцохыг хүсэж байна вэ? *</Label>
          <Textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
            placeholder="Таны зорилго, хүсэл эрмэлзлийн талаар бичнэ үү..."
            rows={6}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">Хамгийн багадаа 100 тэмдэгт бичих шаардлагатай</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-48 bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Илгээж байна...
            </>
          ) : (
            "Хүсэлт илгээх"
          )}
        </Button>
      </div>
    </form>
  )
}
