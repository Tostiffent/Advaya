import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPin, Star, Clock, Users, Plane, Hotel, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample destination data
const destinations = [
  {
    id: "caribbean",
    name: "Caribbean Holidays",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town. The Caribbean offers a perfect blend of relaxation and adventure, with pristine beaches, crystal-clear waters, and vibrant local culture.",
    longDescription:
      "The Caribbean is a region of the Americas that consists of the Caribbean Sea, its islands, and the surrounding coasts. The region is southeast of the Gulf of Mexico and the North American mainland, east of Central America, and north of South America.\n\nThe Caribbean islands are renowned for their year-round warm weather, beautiful beaches, and diverse cultures. From the reggae rhythms of Jamaica to the French-Creole flavors of Martinique, each island offers its own unique experience.\n\nOur Caribbean holiday package includes visits to multiple islands, allowing you to experience the best the region has to offer. You'll have opportunities for snorkeling in coral reefs, hiking through lush rainforests, and immersing yourself in the vibrant local cultures.",
    price: "$899",
    rating: 4.8,
    reviews: 245,
    duration: "7 days",
    category: "beach",
    location: "Multiple Islands, Caribbean",
    included: [
      "Round-trip flights",
      "Hotel accommodation",
      "Daily breakfast",
      "Island hopping tours",
      "Airport transfers",
      "Local guide",
    ],
    highlights: [
      "Explore pristine white sand beaches",
      "Snorkel in crystal-clear waters with tropical fish",
      "Experience authentic Caribbean cuisine",
      "Visit historical colonial sites",
      "Enjoy sunset sailing excursions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description:
          "Arrive at the airport and transfer to your beachfront hotel. Enjoy a welcome dinner with Caribbean flavors.",
      },
      {
        day: 2,
        title: "Beach & Snorkeling",
        description:
          "Spend the day at a pristine beach and join a guided snorkeling tour to explore vibrant coral reefs.",
      },
      {
        day: 3,
        title: "Island Culture Tour",
        description: "Visit local villages, historical sites, and markets to experience authentic Caribbean culture.",
      },
      {
        day: 4,
        title: "Rainforest Adventure",
        description: "Hike through lush rainforests, discover hidden waterfalls, and spot exotic wildlife.",
      },
      {
        day: 5,
        title: "Island Hopping",
        description: "Take a boat tour to nearby islands, each with its own unique character and attractions.",
      },
      {
        day: 6,
        title: "Leisure Day",
        description:
          "Enjoy a free day to relax on the beach or choose from optional activities like diving or sailing.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Final breakfast at the hotel before transferring to the airport for your departure flight.",
      },
    ],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town.",
    longDescription:
      "Mauritius, an Indian Ocean island nation, is known for its beaches, lagoons and reefs. The mountainous interior includes Black River Gorges National Park, with rainforests, waterfalls, hiking trails and wildlife like the flying fox. Capital Port Louis has sites such as the Champs de Mars horse track, Eureka plantation house and 18th-century Sir Seewoosagur Ramgoolam Botanical Gardens.\n\nThe island of Mauritius was uninhabited until the Dutch Republic established a colony in 1638, with the Dutch naming the island after Prince Maurice van Nassau. The Dutch colony was abandoned in 1710, and five years later, the island became a French colony and was renamed Isle de France. Due to its strategic position, Mauritius was known as the 'Star and Key of the Indian Ocean'.",
    price: "$1,299",
    rating: 4.9,
    reviews: 189,
    duration: "10 days",
    category: "beach",
    location: "Mauritius, Indian Ocean",
    included: [
      "Round-trip flights",
      "Luxury resort accommodation",
      "All-inclusive meal plan",
      "Island tours",
      "Airport transfers",
      "Water sports activities",
    ],
    highlights: [
      "Relax on pristine white sand beaches",
      "Explore the underwater world with snorkeling and diving",
      "Visit the Seven Colored Earths geological formation",
      "Experience the unique blend of cultures and cuisines",
      "Hike in Black River Gorges National Park",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise",
        description:
          "Arrive at Sir Seewoosagur Ramgoolam International Airport and transfer to your luxury beach resort.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy a full day of relaxation on the pristine beaches of your resort with complimentary water sports.",
      },
      {
        day: 3,
        title: "South Island Tour",
        description: "Visit the Seven Colored Earths, Chamarel Waterfall, and the sacred lake of Grand Bassin.",
      },
    ],
  },
  {
    id: "serengeti",
    name: "Serengeti National Park",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Connect with the culture of two countries as you travel from the north to south to encounter rich cultural legacy of mankind and the cosmopolitan spirit of Cape town.",
    longDescription:
      "The Serengeti ecosystem is a geographical region in Africa, spanning northern Tanzania. The protected area within the region includes approximately 30,000 km² of land, including the Serengeti National Park and several game reserves.\n\nThe Serengeti hosts the second largest terrestrial mammal migration in the world, which helps secure it as one of the Seven Natural Wonders of Africa and one of the ten natural travel wonders of the world. The region contains the Serengeti National Park in Tanzania and several game reserves.\n\nThe Serengeti is also renowned for its large lion population and is one of the best places to observe prides in their natural environment. Approximately 70 large mammal and 500 bird species are found there. This high diversity is a function of diverse habitats, including riverine forests, swamps, kopjes, grasslands, and woodlands.",
    price: "$1,499",
    rating: 4.7,
    reviews: 156,
    duration: "8 days",
    category: "safari",
    location: "Tanzania, East Africa",
    included: [
      "Round-trip flights",
      "Safari lodge accommodation",
      "Full board meal plan",
      "Game drives",
      "Park entrance fees",
      "Professional safari guide",
    ],
    highlights: [
      "Witness the Great Migration of wildebeest and zebra",
      "Spot the Big Five (lion, leopard, elephant, buffalo, rhino)",
      "Experience authentic Maasai culture",
      "Enjoy breathtaking African sunsets",
      "Stay in luxury safari lodges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport and transfer to your hotel in Arusha.",
      },
      {
        day: 2,
        title: "Journey to Serengeti",
        description:
          "Drive to Serengeti National Park with game viewing en route. Arrive at your safari lodge for dinner.",
      },
      {
        day: 3,
        title: "Serengeti Game Drives",
        description: "Full day of game drives in the Serengeti, searching for the Big Five and other wildlife.",
      },
    ],
  },
]

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id)

  if (!destination) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link href="/booking" className="text-primary hover:underline mb-2 inline-block">
          ← Back to all destinations
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold">{destination.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(destination.rating) ? "text-primary fill-primary" : "text-muted fill-none"}`}
                />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {destination.rating} ({destination.reviews} reviews)
          </span>
          <span className="mx-2">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">{destination.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-6">
            <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {destination.gallery.map((img, i) => (
              <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${destination.name} gallery ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">About this destination</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">{destination.duration}</h3>
                <p className="text-xs text-muted-foreground">Duration</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">All Ages</h3>
                <p className="text-xs text-muted-foreground">Perfect for families</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Plane className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Flights Included</h3>
                <p className="text-xs text-muted-foreground">Round-trip</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Hotel className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">4-5 Star Hotels</h3>
                <p className="text-xs text-muted-foreground">Luxury stays</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="text-muted-foreground space-y-4">
                {destination.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {destination.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">What's included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {destination.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-4">
              {destination.itinerary.map((day) => (
                <Card key={day.day} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="bg-primary p-4 sm:p-6 flex items-center justify-center sm:w-24">
                      <div className="text-center">
                        <span className="block text-xs text-primary-foreground font-medium">DAY</span>
                        <span className="block text-2xl font-bold text-primary-foreground">{day.day}</span>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6 flex-1">
                      <h3 className="font-semibold mb-2">{day.title}</h3>
                      <p className="text-sm text-muted-foreground">{day.description}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary">{destination.price}</span>
                  <span className="text-muted-foreground ml-1">/ person</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
              </div>

              <Tabs defaultValue="dates">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dates">Dates</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                </TabsList>
                <TabsContent value="dates" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Travelers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Traveler</SelectItem>
                        <SelectItem value="2">2 Travelers</SelectItem>
                        <SelectItem value="3">3 Travelers</SelectItem>
                        <SelectItem value="4">4 Travelers</SelectItem>
                        <SelectItem value="5">5+ Travelers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="options" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="villa">Private Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Meal Plan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast Only</SelectItem>
                        <SelectItem value="half-board">Half Board</SelectItem>
                        <SelectItem value="full-board">Full Board</SelectItem>
                        <SelectItem value="all-inclusive">All Inclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <Button className="w-full" size="lg">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full">
                  Inquire More
                </Button>
              </div>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>Free cancellation up to 30 days before departure</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

