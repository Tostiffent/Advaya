"use client"

import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/forums", label: "Forums" },
  { href: "/gallery", label: "Gallery" },
]

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

