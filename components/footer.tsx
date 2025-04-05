import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Journey+</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover amazing destinations, immerse yourself in local cultures, and create unforgettable memories with
              our curated travel experiences.
            </p>
            <div className="mt-4 flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-muted-foreground hover:text-primary">
                  Tours & Packages
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primary">
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/forums" className="text-muted-foreground hover:text-primary">
                  Community Forums
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-primary">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Journey+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

