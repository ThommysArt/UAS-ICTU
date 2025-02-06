"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createApplication, getPrograms } from "@/app/actions"
import { useUser } from "@clerk/nextjs"

interface Program {
  id: string
  code: string
  name: string
  duration: number
  department: string
}

export default function NewApplicationPage() {
  const [programId, setProgramId] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const [programs, setPrograms] = useState<Program[]>([])
  const user = useUser()
  const pathname = usePathname()

  if (!user) router.push(`/sign-up?callbackUrl=${encodeURIComponent(pathname)}`)

  useEffect(() => {
    getPrograms().then(setPrograms)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("programId", programId)

    try {
      await createApplication(formData)
      toast({
        title: "Success",
        description: "Application submitted successfully.",
      })
      router.push("/applications")
    } catch (error) {
      console.error("Application submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit New Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="program">Select Program</label>
            <Select onValueChange={(value) => setProgramId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={!programId}>
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

