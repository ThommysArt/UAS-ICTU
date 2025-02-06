import Link from "next/link"
import { ProgramCard } from "@/components/program-card"
import { ProgramSearch } from "@/components/program-search"
import { getPrograms } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { isUserAdmin } from "@/lib/clerk-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default async function ProgramsPage() {
  const programs = await getPrograms()
  const isAdmin = await isUserAdmin()

  if (!isAdmin) return (
    <Card>
      <CardHeader>
        <CardTitle>Access Denied</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">You are not authorized to view this page.</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Programs</h1>
        <Link href="/programs/new">
          <Button>Create New Program</Button>
        </Link>
      </div>
      <ProgramSearch />
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.code} program={program} />
        ))}
      </div>
    </div>
  )
}

