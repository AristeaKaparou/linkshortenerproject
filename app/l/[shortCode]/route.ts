import { redirect, notFound } from "next/navigation"
import { getLinkByShortCode } from "@/data/links"

interface RouteParams {
  params: Promise<{ shortCode: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { shortCode } = await params
  const link = await getLinkByShortCode(shortCode)

  if (!link) {
    notFound()
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(link.url)
  } catch {
    notFound()
  }

  if (parsedUrl!.protocol !== "https:" && parsedUrl!.protocol !== "http:") {
    notFound()
  }

  redirect(link.url)
}
