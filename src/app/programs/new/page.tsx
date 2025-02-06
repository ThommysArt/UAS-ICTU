"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createProgram } from "@/app/actions"

export default function NewProgramPage() {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [department, setDepartment] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("code", code)
    formData.append("name", name)
    formData.append("duration", duration)
    formData.append("department", department)

    try {
      await createProgram(formData)
      toast({
        title: "Success",
        description: "Program created successfully.",
      })
      router.push("/programs")
    } catch (error) {
      console.error("Program creation error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Program</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code">Program Code</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="name">Program Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="duration">Duration (years)</Label>
          <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
        <Button type="submit">Create Program</Button>
      </form>
    </div>
  )
}

