import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our University</h1>
      <p className="text-xl text-center mb-8">
        Discover our world-class programs and start your academic journey today.
      </p>
      <div className="flex space-x-4">
        <Link href="/programs">
          <Button size="lg">Explore Programs</Button>
        </Link>
        <Link href="/applications/new">
          <Button size="lg" variant="outline">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

