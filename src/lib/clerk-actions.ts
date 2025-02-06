"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function ensureUserInDatabase() {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    const clerkUser = await currentUser()

    await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${clerkUser!.firstName} ${clerkUser!.lastName}`,
        email: clerkUser!.emailAddresses[0]?.emailAddress!,
        role: "USER",
      },
    })
  }

  return userId
}

export async function isUserAdmin() {
  const { userId } = await auth()
  if (!userId) return false

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  })

  return user?.role === "ADMIN"
}

