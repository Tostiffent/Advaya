import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Cultural Festival: Balinese Dance Performance",
    image: "/placeholder.svg?height=200&width=400",
    date: "June 15, 2024",
    time: "7:00 PM - 9:00 PM",
    location: "Ubud Cultural Center, Bali",
    price: "Free",
  },
  {
    id: 2,
    title: "Greek Cuisine Workshop with Local Chefs",
    image: "/placeholder.svg?height=200&width=400",
    date: "July 3, 2024",
    time: "5:30 PM - 8:30 PM",
    location: "Santorini Culinary Institute",
    price: "$45",
  },
  {
    id: 3,
    title: "Traditional Tea Ceremony Experience",
    image: "/placeholder.svg?height=200&width=400",
    date: "August 12, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Kyoto Garden, Japan",
    price: "$30",
  },
]

export function UpcomingEvents() {
  return (
    <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Upcoming <span className="text-primary">Events</span>
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Immerse yourself in local cultures with our curated events and experiences
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-2 mb-3">{event.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <span className="font-bold text-primary">{event.price}</span>
              <Button size="sm">Book Event</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg">
          View All Events
        </Button>
      </div>
    </section>
  )
}

