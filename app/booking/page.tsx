import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample destination data
const destinations = [
  {
    id: "caribbean",
    name: "Caribbean Holidays",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town.",
    price: "$899",
    rating: 4.8,
    category: "beach",
  },
  {
    id: "mauritius",
    name: "Mauritius",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town.",
    price: "$1,299",
    rating: 4.9,
    category: "beach",
  },
  {
    id: "serengeti",
    name: "Serengeti National Park",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town.",
    price: "$1,499",
    rating: 4.7,
    category: "safari",
  },
  {
    id: "bali",
    name: "Bali Adventure",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Explore the lush landscapes and vibrant culture of Bali with our guided tour package including temple visits and beach relaxation.",
    price: "$1,099",
    rating: 4.8,
    category: "adventure",
  },
  {
    id: "kyoto",
    name: "Kyoto Cultural Tour",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Immerse yourself in Japanese tradition with guided tours of ancient temples, tea ceremonies, and authentic cuisine experiences.",
    price: "$1,299",
    rating: 4.9,
    category: "cultural",
  },
  {
    id: "santorini",
    name: "Santorini Getaway",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Experience the iconic white buildings and breathtaking sunsets of Santorini with our premium accommodation and guided tours.",
    price: "$1,599",
    rating: 4.9,
    category: "beach",
  },
]

// Sample events data
const events = [
  {
    id: "festival-bali",
    name: "Balinese Cultural Festival",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Experience traditional Balinese dance, music, and art at this annual cultural celebration in the heart of Ubud.",
    price: "$45",
    date: "June 15-18, 2024",
    category: "cultural",
  },
  {
    id: "wine-tour",
    name: "Mediterranean Wine Tour",
    image: "/placeholder.svg?height=300&width=500",
    description: "Sample the finest wines of the Mediterranean region with expert guides and gourmet food pairings.",
    price: "$120",
    date: "July 8-10, 2024",
    category: "food",
  },
  {
    id: "safari-adventure",
    name: "African Safari Adventure",
    image: "/placeholder.svg?height=300&width=500",
    description: "Join our guided safari tour to witness Africa's magnificent wildlife in their natural habitat.",
    price: "$250",
    date: "August 5-12, 2024",
    category: "adventure",
  },
]

export default function BookingPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discover & Book</h1>
        <p className="text-muted-foreground">Find and book your perfect travel experience</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <div className="my-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search destinations..." className="pl-10" />
            </div>
          </div>

          <TabsContent value="destinations" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <Link href={`/booking/destination/${destination.id}`} key={destination.id} className="group">
                  <Card className="overflow-hidden border-border/40 transition-all hover:border-primary/50">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{destination.name}</h3>
                          <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                            {destination.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{destination.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(destination.rating) ? "text-primary fill-primary" : "text-muted fill-none"}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                          </div>
                          <span className="ml-1 text-xs text-muted-foreground">{destination.rating}</span>
                        </div>
                        <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs">
                          {destination.category}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link href={`/booking/event/${event.id}`} key={event.id} className="group">
                  <Card className="overflow-hidden border-border/40 transition-all hover:border-primary/50">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{event.name}</h3>
                          <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                            {event.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary font-medium">{event.date}</span>
                        <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs">{event.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

