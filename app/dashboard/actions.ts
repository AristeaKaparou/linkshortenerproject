"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import {
  createLinkInDB,
  isShortCodeAvailable,
  updateLinkInDB,
  deleteLinkFromDB,
} from "@/data/links"

type ActionResult = { success: true } | { success: false; error: string }

interface CreateLinkData {
  url: string
  shortCode?: string
}

function generateShortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function createLink(data: CreateLinkData): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, error: "User not authenticated" }
  }

  const trimmedUrl = data.url.trim()
  if (!trimmedUrl) {
    return { success: false, error: "URL is required" }
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(trimmedUrl)
  } catch {
    return { success: false, error: "Please enter a valid URL" }
  }
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    return { success: false, error: "Only http and https URLs are allowed" }
  }

  let shortCode: string

  if (data.shortCode?.trim()) {
    shortCode = data.shortCode.trim().toLowerCase()
    if (!/^[a-z0-9-]+$/.test(shortCode)) {
      return {
        success: false,
        error: "Short code may only contain letters, numbers, and hyphens",
      }
    }
    const available = await isShortCodeAvailable(shortCode)
    if (!available) {
      return { success: false, error: "That short code is already taken" }
    }
  } else {
    let generated = false
    for (let i = 0; i < 5; i++) {
      const candidate = generateShortCode()
      const available = await isShortCodeAvailable(candidate)
      if (available) {
        shortCode = candidate
        generated = true
        break
      }
    }
    if (!generated) {
      return {
        success: false,
        error: "Could not generate a unique short code. Please try again.",
      }
    }
  }

  try {
    await createLinkInDB({ url: trimmedUrl, shortCode: shortCode!, userId })
  } catch (err) {
    console.error("[createLink] DB error:", err)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
  revalidatePath("/dashboard")
  return { success: true }
}

interface UpdateLinkData {
  id: number
  url: string
  shortCode: string
}

export async function updateLink(data: UpdateLinkData): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, error: "User not authenticated" }
  }

  const trimmedUrl = data.url.trim()
  if (!trimmedUrl) {
    return { success: false, error: "URL is required" }
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(trimmedUrl)
  } catch {
    return { success: false, error: "Please enter a valid URL" }
  }
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    return { success: false, error: "Only http and https URLs are allowed" }
  }

  const trimmedCode = data.shortCode.trim().toLowerCase()
  if (!trimmedCode) {
    return { success: false, error: "Short code is required" }
  }
  if (!/^[a-z0-9-]+$/.test(trimmedCode)) {
    return {
      success: false,
      error: "Short code may only contain letters, numbers, and hyphens",
    }
  }

  let updated: Awaited<ReturnType<typeof updateLinkInDB>> | undefined
  try {
    updated = await updateLinkInDB(data.id, userId, {
      url: trimmedUrl,
      shortCode: trimmedCode,
    })
  } catch (err) {
    console.error("[updateLink] DB error:", err)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }

  if (!updated) {
    return {
      success: false,
      error: "Link not found or you do not have permission to edit it",
    }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteLink(id: number): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, error: "User not authenticated" }
  }

  try {
    await deleteLinkFromDB(id, userId)
  } catch (err) {
    console.error("[deleteLink] DB error:", err)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
  revalidatePath("/dashboard")
  return { success: true }
}
