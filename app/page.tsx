"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Алдаа гарлаа",
        description: "Нууц үг тохирохгүй байна.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/simple-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit registration")
      }

      setIsSuccess(true)
      toast({
        title: "Хүсэлт амжилттай илгээгдлээ!",
        description: "Таны хүсэлтийг амжилттай хүлээн авлаа.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Purple Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 text-center">
          <h1 className="text-lg font-bold uppercase drop-shadow-sm">ОЛИМПИАДЫН БҮРТГЭЛИЙН СИСТЕМ</h1>
          </div>

        {/* Light Blue Information Section */}
        <div className="bg-blue-50 p-4">
          <p className="text-gray-800 text-xs mb-3 text-center leading-tight">
            2025-2026 Оны Хичээлийн Жилд Явагдах Мэдээлэл Зүйн Олимпиадуудын Мэдээлэл
          </p>
          
          {/* Buttons Row 1 */}
          <div className="flex gap-1 mb-1">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-2 py-1 flex-1 h-8 shadow-md">
              Олимпиадуудын хуваарь
            </Button>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-xs px-2 py-1 flex-1 h-8 shadow-md">
              Онлайн олимпиадын хуваарь
            </Button>
          </div>

          {/* Buttons Row 2 */}
          <div className="space-y-1 mb-3">
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs px-2 py-1 w-full h-8 shadow-md">
              Онлайн олимпиадын дүрэм
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-2 py-1 w-full h-8 shadow-md">
              ІОІ 2026-д оролцох баг сонгох журам
            </Button>
          </div>

          {/* Instructions Link */}
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-blue-600 text-xs p-0">
                  ЗААВАР ХАРАХ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>ЗААВАР ХАРАХ</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Төлбөр төлөх</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 mb-2">Оролцох хураамж: <span className="font-bold text-green-600">10,000₮</span></p>
                        <p className="text-gray-700 mb-2">Данс: ХААН банк: <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">5700247991</span></p>
                        <p className="text-gray-700 mb-2">IBAN: <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">10000500</span></p>
                        <p className="text-xs text-gray-600">Хураамжаа төлөхдөө <span className="font-semibold">Гүйлгээний утга</span> дээр <span className="font-semibold text-blue-600">Утасны дугаар</span>аа бичнэ үү.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Хүсэлт явуулах</h3>
                      <p className="text-gray-700 text-sm mb-4">Хүсэлтийг 1 удаа явуулах боломжтой бөгөөд Төлбөр төлөхдөө гүйлгээ хийсэн банкны нэр, гүйлгээний утга дээр бичсэн утасны дугаарыг бичиж, хүсэлтээ бүртгүүлнэ.</p>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <p className="text-xs text-yellow-800 font-semibold">Төлөв: БАТАЛГААЖААГҮЙ БАЙНА!</p>
                        <p className="text-xs text-yellow-700">Олимпиад болох огнооноос хамаарч 1,5-8 цагийн хугацаатай хуулга авдаг.</p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs text-green-800 font-semibold">Төлөв: БАТАЛГААЖСАН БАЙНА</p>
                        <p className="text-xs text-green-700">5-10 минутын өмнө ОНЛАЙН ШҮҮЛТИЙН СИСТЕМ рүү нэвтрэх ID, нууц үг нээгдэнэ.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Онлайн олимпиадад оролцох, бодлого бодох</h3>
                      <p className="text-gray-700 text-sm mb-4">Contest Management System нэвтэрч бодлогоо бодно.</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* White Form Section */}
        <div className="bg-white p-4">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Хүсэлт амжилттай илгээгдлээ!</h3>
              <p className="text-gray-600 mb-6">
                Таны хүсэлтийг хүлээн авлаа. Бид шалгаж, удахгүй хариу өгөх болно.
              </p>
              <Button 
                onClick={() => setIsSuccess(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Өөр хүсэлт илгээх
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="text-center mb-4">
                <h2 className="text-sm font-bold text-gray-800">Бүртгүүлэх</h2>
                <p className="text-xs text-gray-600">Хүсэлтээ бүртгүүлэхийн тулд доорх маягтыг бөглөнө үү</p>
              </div>

              {/* Name Field */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs text-gray-700">Нэр</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Нэрээ оруулна уу"
                  className="h-8 text-sm"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs text-gray-700">Имэйл хаяг</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="pr-8 h-8 text-sm"
                    required
                  />
                  <Mail className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs text-gray-700">Нууц үг</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Нууц үгээ оруулна уу"
                    className="pr-8 h-8 text-sm"
                    required
                  />
                  <Lock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-xs text-gray-700">Нууц үг баталгаажуулах</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Нууц үгээ дахин оруулна уу"
                    className="pr-8 h-8 text-sm"
                    required
                  />
                  <Lock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Register Button */}
              <div className="text-center pt-1">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-1 h-8 text-sm shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Илгээж байна...
                    </>
                  ) : (
                    <>
                      БҮРТГҮҮЛЭХ
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Instructions Section */}
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-4">
          <h2 className="text-sm font-bold text-center mb-4 border-b-2 border-pink-300 pb-2 text-gray-800">ЗААВАР ХАРАХ</h2>
          
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-gray-300 mt-2"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-900 mb-1">АЛХАМ 1. Төлбөр төлөх</h3>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>Оролцох хураамж: <span className="font-bold text-green-600">10,000₮</span></p>
                  <p>Данс: ХААН банк: <span className="font-mono bg-gray-200 px-1 py-0.5 rounded text-xs">5700247991</span></p>
                  <p className="text-red-600">(Эзэмшигч Ц.Баттогтох, хорооны нарийн бичиг)</p>
                  <p>IBAN: <span className="font-mono bg-gray-200 px-1 py-0.5 rounded text-xs">10000500</span></p>
                  <p>Хураамжаа төлөхдөө <span className="font-bold">Гүйлгээний утга</span> дээр <span className="font-bold">Утасны дугаараа</span> бичнэ үү.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-green-700 font-bold text-xs">A</span>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-gray-300 mt-2"></div>
          </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-900 mb-1">АЛХАМ 2. Хүсэлт явуулах</h3>
                <p className="text-xs text-gray-700">Хүсэлтийг 1 удаа явуулах боломжтой бөгөөд Төлбөр төлөхдөө гүйлгээ хийсэн банкны нэр, гүйлгээний утга дээр бичсэн утасны дугаарыг бичиж, хүсэлтээ бүртгүүлнэ.</p>
              </div>
            </div>

            {/* Status: Not Confirmed */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-yellow-700 rounded-full"></div>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-gray-300 mt-2"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-900 mb-1">Төлөв: БАТАЛГААЖААГҮЙ БАЙНА!</h3>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>🕐 Олимпиад болох огнооноос хамаарч 1,5-8 цагийн хугацаатай хуулга авдаг.</p>
                  <p>Оролцох хүсэлт явуулахад "БАТАЛГААЖААГҮЙ БАЙНА!" гэсэн төлөвт шилжинэ. Комисс нь банкны хуулга, вебийн хүсэлт хоёрыг харьцуулж <span className="font-bold">БАТАЛГААЖУУЛДАГ</span> учир энэ үйл ажиллагаа тодорхой хугацааны давтамжтайгаар хянаж, баталгаажуулдаг болно.</p>
          </div>
        </div>
      </div>

            {/* Status: Confirmed */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-gray-300 mt-2"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-900 mb-1">Төлөв: БАТАЛГААЖСАН БАЙНА</h3>
                <p className="text-xs text-gray-700">5-10 минутын өмнө <span className="font-bold">ОНЛАЙН ШҮҮЛТИЙН СИСТЕМ</span> рүү нэвтрэх ID, нууц үг нээгдэнэ.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-900 mb-1">АЛХАМ 3. Онлайн олимпиадад оролцох, бодлого бодох</h3>
                <p className="text-xs text-gray-700 mb-2">Contest Management System нэвтэрч бодлогоо бодно.</p>
                
                <div className="grid grid-cols-2 gap-1">
                  <Button variant="link" className="text-blue-600 text-xs p-0 h-auto text-left justify-start">
                    Ахлах ангилалын систем рүү орох
                  </Button>
                  <Button variant="link" className="text-blue-600 text-xs p-0 h-auto text-left justify-start">
                    Багш болон дунд ангилалын систем рүү орох
                  </Button>
                  <Button variant="link" className="text-blue-600 text-xs p-0 h-auto text-left justify-start">
                    Ахлах ангилалын ранк харах
                  </Button>
                  <Button variant="link" className="text-blue-600 text-xs p-0 h-auto text-left justify-start">
                    Багш болон дунд ангилалын ранк орох
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
