"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ProgramSearch() {
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", search)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input type="text" placeholder="Search programs..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button type="submit">Search</Button>
    </form>
  )
}

