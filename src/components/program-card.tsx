import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProgramCardProps {
  program: {
    id: string
    code: string
    name: string
    duration: number
    department: string
  }
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{program.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Code:</strong> {program.code}
        </p>
        <p>
          <strong>Duration:</strong> {program.duration} years
        </p>
        <p>
          <strong>Department:</strong> {program.department}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/programs/${program.id}`}>
          <Button>Learn More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

