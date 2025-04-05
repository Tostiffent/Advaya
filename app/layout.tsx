"use client"

import React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">Travel Wise</span>
                </Link>
                <MobileNav />
                <MainNav className="mx-6 hidden md:flex" />
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="md:hidden ml-2">
      <button className="p-2 text-muted-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-background border-b border-border/40 p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Booking details
            </Link>
            <Link
              href="/testimonial"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Testimonial
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
            <Link href="/forums" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Forums
            </Link>
            <Link href="/events" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Events
            </Link>
            <Link href="/chatbot" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
              Chatbot
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}



import './globals.css'
