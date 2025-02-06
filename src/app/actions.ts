"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { ensureUserInDatabase } from "@/lib/clerk-actions"
import { isUserAdmin } from "@/lib/clerk-actions"

// Fake data
const fakePrograms = [
  { id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", code: "CS101", name: "Computer Science", duration: 4, department: "Engineering" },
  { id: "b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7", code: "BUS201", name: "Business Administration", duration: 3, department: "Business" },
  { id: "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8", code: "ENG301", name: "English Literature", duration: 4, department: "Arts" },
  { id: "d4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9", code: "BIO401", name: "Biology", duration: 4, department: "Science" },
  { id: "e5f6g7h8-i9j0-1k2l-3m4n-o5p6q7r8s9t0", code: "MATH501", name: "Mathematics", duration: 3, department: "Science" },
  { id: "f6g7h8i9-j0k1-2l3m-4n5o-p6q7r8s9t0u1", code: "HIST601", name: "History", duration: 3, department: "Arts" },
  { id: "g7h8i9j0-k1l2-3m4n-5o6p-q7r8s9t0u1v2", code: "PSYCH701", name: "Psychology", duration: 4, department: "Social Sciences" },
  { id: "h8i9j0k1-l2m3-4n5o-6p7q-r8s9t0u1v2w3", code: "ECON801", name: "Economics", duration: 3, department: "Business" },
  { id: "i9j0k1l2-m3n4-5o6p-7q8r-s9t0u1v2w3x4", code: "PHYS901", name: "Physics", duration: 4, department: "Science" },
  { id: "j0k1l2m3-n4o5-6p7q-8r9s-t0u1v2w3x4y5", code: "ART1001", name: "Fine Arts", duration: 4, department: "Arts" },
]

const fakeApplicationStatuses = ["PENDING", "ACCEPTED", "REJECTED"]

const fakeNotifications = [
  "Your application for Computer Science has been received.",
  "Reminder: Complete your profile for better chances of acceptance.",
  "New program alert: Data Science is now available for applications.",
  "Your application for Business Administration has been accepted!",
  "Important: Deadline for scholarship applications is approaching.",
  "Campus tour dates have been announced. Check your email for details.",
  "Your application for English Literature is under review.",
  "Congratulations! You've been shortlisted for an interview.",
  "New student orientation details have been sent to your email.",
  "Your financial aid application has been processed.",
]

// User actions
export async function getUser() {
  const userId = await ensureUserInDatabase()
  return await prisma.user.findUnique({
    where: { clerkId: userId },
  })
}



export async function updateUserProfile(formData: FormData) {
  const userId = await ensureUserInDatabase()
  const name = formData.get("name") as string

  const updatedUser = await prisma.user.update({
    where: { clerkId: userId },
    data: { name },
  })

  if (updatedUser) {
    revalidatePath("/profile")
  }
}

// Program actions
export async function getPrograms() {
  const realPrograms = await prisma.program.findMany()
  return [...fakePrograms, ...realPrograms]
}

export async function getProgram(programId: string) {
  return await prisma.program.findUnique({
    where: { id: programId },
  })
}

export async function createProgram(formData: FormData) {
  const code = formData.get("code") as string
  const name = formData.get("name") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const department = formData.get("department") as string

  const program = await prisma.program.create({
    data: {
      code,
      name,
      duration,
      department,
    },
  })

  if (program) {
    revalidatePath("/programs")
  }
}

export async function updateProgram(programId: string, formData: FormData) {
  const code = formData.get("code") as string
  const name = formData.get("name") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const department = formData.get("department") as string

  const program = await prisma.program.update({
    where: { id: programId },
    data: {
      code,
      name,
      duration,
      department,
    },
  })

  if (program) {
    revalidatePath("/programs")
  }
}

export async function deleteProgram(programId: string) {
  await prisma.program.delete({
    where: { id: programId },
  })

  revalidatePath("/programs")
}

// Application actions
export async function getApplications() {
  const userId = await ensureUserInDatabase()
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  if (!user) throw new Error("User not found")

  const isAdmin = await isUserAdmin()

  let applications
  if (isAdmin) {
    applications = await prisma.application.findMany({
      include: { program: true, user: true },
    })
  } else {
    applications = await prisma.application.findMany({
      where: { userId: user.id },
      include: { program: true },
    })
  }

  return applications
}

export async function getAllApplications() {
  return await prisma.application.findMany({
    include: { user: true, program: true },
  })
}

export async function createApplication(formData: FormData) {
  const userId = await ensureUserInDatabase()
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  if (!user) throw new Error("User not found")

  const programId = formData.get("programId") as string

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      programId,
      status: "PENDING",
    },
    include: { program: true },
  })

  if (application) {
    await createNotification(user.id, `Your application for ${application.program.name} has been submitted.`)
    revalidatePath("/applications")
  }
}

export async function updateApplicationStatus(applicationId: string, formData: FormData) {
  const isAdmin = await isUserAdmin()
  if (!isAdmin) throw new Error("Unauthorized")

  const status = formData.get("status") as "PENDING" | "ACCEPTED" | "REJECTED"

  const application = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
    include: { user: true, program: true },
  })

  if (application) {
    await createNotification(
      application.userId,
      `Your application for ${application.program.name} has been ${status.toLowerCase()}.`,
    )
    revalidatePath("/applications")
  }
}

// Notification actions
export async function getNotifications() {
  const userId = await ensureUserInDatabase()
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  if (!user) throw new Error("User not found")

  const realNotifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

  const others = fakeNotifications.map((message, index) => ({
    id: `fake-${index}`,
    userId: user.id,
    message,
    isRead: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 10000000000),
    updatedAt: new Date(),
  }))

  return [...others, ...realNotifications]
}

export async function createNotification(userId: string, message: string) {
  const notification = await prisma.notification.create({
    data: {
      userId,
      message,
    },
  })

  if (notification) {
    revalidatePath("/notifications")
  }
}

export async function markNotificationAsRead(notificationId: string) {
  const notification = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  })

  if (notification) {
    revalidatePath("/notifications")
  }
}
