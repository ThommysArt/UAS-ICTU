import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPrograms, deleteProgram } from "@/app/actions"
import { Button } from "@/components/ui/button"

export async function AdminProgramList() {
  const programs = await getPrograms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {programs.map((program) => (
            <li key={program.id} className="flex justify-between items-center">
              <span>{program.name}</span>
              <div>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <form action={deleteProgram.bind(null, program.id)} className="inline">
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

