import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs"
import { shadcn } from "@clerk/themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Snip — URL Shortener",
  description:
    "Shorten URLs, track clicks, and manage all your links from one dashboard.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <header className="flex h-14 items-center justify-between border-b border-border px-6">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Snip
            </Link>
            <div className="flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
