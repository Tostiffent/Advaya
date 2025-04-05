import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    description: "Experience the perfect blend of beaches, culture, and adventure",
    price: "$899",
  },
  {
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=300&width=400",
    description: "Discover the iconic white buildings and breathtaking sunsets",
    price: "$1,299",
  },
  {
    name: "Kyoto, Japan",
    image: "/placeholder.svg?height=300&width=400",
    description: "Immerse yourself in ancient temples and traditional gardens",
    price: "$1,099",
  },
]

export function FeaturedDestinations() {
  return (
    <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Popular <span className="text-primary">Destinations</span>
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our most sought-after destinations and find your next adventure
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {destinations.map((destination) => (
          <Card key={destination.name} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{destination.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{destination.price}</span>
                <Button size="sm">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg">
          View All Destinations
        </Button>
      </div>
    </section>
  )
}

