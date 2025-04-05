import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPin, Clock, Heart, Share2, CalendarPlus2Icon as CalendarIcon2, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample events data
const events = [
  {
    id: "festival-bali",
    name: "Balinese Cultural Festival",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Experience traditional Balinese dance, music, and art at this annual cultural celebration in the heart of Ubud.",
    longDescription:
      "The Balinese Cultural Festival is an annual celebration that showcases the rich cultural heritage of Bali through traditional dance, music, art, and culinary experiences. This vibrant festival takes place in the cultural heart of Ubud, bringing together local artists, performers, and craftspeople to share their talents with visitors from around the world.\n\nDuring the festival, you'll have the opportunity to witness spectacular performances of traditional Balinese dances such as the Legong, Barong, and Kecak fire dance. These performances are not just entertainment but also a way to preserve and share the island's ancient stories and traditions.\n\nIn addition to performances, the festival features art exhibitions, craft demonstrations, and workshops where you can learn traditional skills like batik making, wood carving, and gamelan playing. Food stalls offer a variety of authentic Balinese dishes, giving you a taste of the island's unique culinary traditions.\n\nThe festival creates a magical atmosphere where you can immerse yourself in Balinese culture and connect with local people who are passionate about sharing their heritage.",
    price: "$45",
    date: "June 15-18, 2024",
    time: "10:00 AM - 10:00 PM",
    location: "Ubud Palace, Bali, Indonesia",
    category: "cultural",
    organizer: "Bali Cultural Foundation",
    highlights: [
      "Traditional Balinese dance performances",
      "Live gamelan music concerts",
      "Art and craft exhibitions",
      "Cultural workshops and demonstrations",
      "Authentic Balinese cuisine",
    ],
    schedule: [
      {
        day: "Day 1 (June 15)",
        events: [
          {
            time: "10:00 AM - 12:00 PM",
            title: "Opening Ceremony",
            description: "Traditional blessing ceremony and welcome speeches",
          },
          {
            time: "1:00 PM - 3:00 PM",
            title: "Legong Dance Performance",
            description: "Classical Balinese dance performed by local dancers",
          },
          {
            time: "4:00 PM - 6:00 PM",
            title: "Batik Making Workshop",
            description: "Learn the traditional art of batik fabric dyeing",
          },
          {
            time: "7:00 PM - 9:00 PM",
            title: "Gamelan Concert",
            description: "Traditional Balinese orchestra performance",
          },
        ],
      },
      {
        day: "Day 2 (June 16)",
        events: [
          {
            time: "10:00 AM - 12:00 PM",
            title: "Wood Carving Demonstration",
            description: "Master carvers showcase their skills",
          },
          {
            time: "1:00 PM - 3:00 PM",
            title: "Balinese Cooking Class",
            description: "Learn to prepare traditional Balinese dishes",
          },
          {
            time: "4:00 PM - 6:00 PM",
            title: "Barong Dance",
            description: "Mythological dance depicting the fight between good and evil",
          },
          {
            time: "7:00 PM - 9:00 PM",
            title: "Traditional Puppet Show",
            description: "Wayang kulit shadow puppet performance",
          },
        ],
      },
    ],
  },
  {
    id: "wine-tour",
    name: "Mediterranean Wine Tour",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: "Sample the finest wines of the Mediterranean region with expert guides and gourmet food pairings.",
    longDescription:
      "Embark on a journey through the Mediterranean's most renowned wine regions, where ancient traditions meet modern winemaking techniques. This exclusive wine tour offers a unique opportunity to explore picturesque vineyards, meet passionate winemakers, and taste exceptional wines paired with regional cuisine.\n\nLed by expert sommeliers and local guides, you'll discover the secrets behind the Mediterranean's distinctive wine styles and learn about the influence of terroir, climate, and traditional methods on the character of each wine. From robust reds to crisp whites and delicate rosés, you'll experience a diverse range of wines that reflect the rich cultural heritage of the region.\n\nThe tour includes visits to family-owned wineries and prestigious estates, where you'll enjoy private tastings and behind-the-scenes access to production facilities. Each wine tasting is complemented by carefully selected gourmet food pairings featuring local specialties, allowing you to experience the perfect harmony between Mediterranean cuisine and wine.\n\nBeyond the tastings, you'll have opportunities to explore charming villages, historic sites, and stunning landscapes that make the Mediterranean wine regions so special. This tour combines oenological discovery with cultural immersion for an unforgettable experience.",
    price: "$120",
    date: "July 8-10, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Various locations, Mediterranean Coast",
    category: "food",
    organizer: "Mediterranean Wine Explorers",
    highlights: [
      "Guided tastings at premium wineries",
      "Gourmet food and wine pairings",
      "Meet local winemakers and experts",
      "Explore picturesque vineyards",
      "Learn about traditional and modern winemaking",
    ],
    schedule: [
      {
        day: "Day 1 (July 8)",
        events: [
          {
            time: "9:00 AM - 10:30 AM",
            title: "Welcome Breakfast",
            description: "Introduction to Mediterranean wines and tour overview",
          },
          {
            time: "11:00 AM - 1:00 PM",
            title: "Coastal Vineyard Visit",
            description: "Tour and tasting at a seaside winery specializing in white wines",
          },
          {
            time: "1:30 PM - 3:00 PM",
            title: "Lunch at Local Restaurant",
            description: "Traditional Mediterranean cuisine paired with regional wines",
          },
          {
            time: "3:30 PM - 5:30 PM",
            title: "Artisanal Winery Tour",
            description: "Visit to a small family-owned winery with unique production methods",
          },
        ],
      },
    ],
  },
  {
    id: "safari-adventure",
    name: "African Safari Adventure",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: "Join our guided safari tour to witness Africa's magnificent wildlife in their natural habitat.",
    longDescription:
      "Embark on an unforgettable journey through the African wilderness on our guided safari adventure. This immersive experience takes you deep into some of Africa's most renowned national parks and reserves, where you'll have the opportunity to observe the continent's iconic wildlife in their natural habitats.\n\nLed by experienced guides with extensive knowledge of the local ecosystem, you'll track the Big Five (lion, leopard, elephant, buffalo, and rhinoceros) and encounter a diverse array of other species, from graceful giraffes and zebras to playful primates and colorful birds. Each game drive offers new and exciting wildlife sightings, with opportunities for photography and learning about animal behavior and conservation efforts.\n\nAccommodations during the safari include comfortable lodges and luxury tented camps strategically located for optimal wildlife viewing. These accommodations blend seamlessly with the natural environment while providing modern amenities and authentic African hospitality. Evening meals around the campfire provide a perfect setting for sharing the day's adventures and listening to fascinating stories from your guides.\n\nBeyond wildlife viewing, the safari includes cultural interactions with local communities, offering insights into traditional ways of life and the relationship between people and wildlife in these regions. You'll gain a deeper understanding of the challenges and successes of conservation initiatives that aim to protect Africa's precious natural heritage for future generations.",
    price: "$250",
    date: "August 5-12, 2024",
    time: "Various times",
    location: "Multiple National Parks, East Africa",
    category: "adventure",
    organizer: "African Wildlife Expeditions",
    highlights: [
      "Game drives to spot the Big Five",
      "Expert guides with extensive wildlife knowledge",
      "Luxury safari accommodations",
      "Sunrise and sunset wildlife viewing",
      "Cultural visits to local communities",
    ],
    schedule: [
      {
        day: "Day 1 (August 5)",
        events: [
          {
            time: "Arrival Day",
            title: "Welcome to Africa",
            description: "Airport pickup and transfer to your safari lodge",
          },
        ],
      },
      {
        day: "Day 2 (August 6)",
        events: [
          {
            time: "5:30 AM - 9:30 AM",
            title: "Morning Game Drive",
            description: "Early morning wildlife viewing when animals are most active",
          },
          {
            time: "12:00 PM - 2:00 PM",
            title: "Lunch at the Lodge",
            description: "Relaxation time during the heat of the day",
          },
          {
            time: "3:30 PM - 7:00 PM",
            title: "Afternoon Game Drive",
            description: "Continue wildlife spotting as the day cools down",
          },
          {
            time: "8:00 PM",
            title: "Dinner and Campfire",
            description: "Share experiences and learn about tomorrow's adventures",
          },
        ],
      },
    ],
  },
]

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link href="/booking" className="text-primary hover:underline mb-2 inline-block">
          ← Back to all events
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold">{event.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <CalendarIcon2 className="h-4 w-4 text-primary" />
            <span className="text-sm">{event.date}</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-6">
            <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {event.gallery.map((img, i) => (
              <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${event.name} gallery ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">About this event</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <CalendarIcon2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">{event.date}</h3>
                <p className="text-xs text-muted-foreground">Event Date</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">{event.time}</h3>
                <p className="text-xs text-muted-foreground">Event Time</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Ticket className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">{event.price}</h3>
                <p className="text-xs text-muted-foreground">Ticket Price</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="text-muted-foreground space-y-4">
                {event.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.highlights.map((highlight, i) => (
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
              <h2 className="text-xl font-semibold mb-3">Organizer</h2>
              <p className="text-muted-foreground">{event.organizer}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Event Schedule</h2>
            <div className="space-y-6">
              {event.schedule.map((day) => (
                <div key={day.day}>
                  <h3 className="font-medium text-lg mb-3">{day.day}</h3>
                  <div className="space-y-4">
                    {day.events.map((item, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="bg-primary p-4 sm:p-6 flex items-center justify-center sm:w-36">
                            <div className="text-center">
                              <span className="block text-sm font-medium text-primary-foreground">{item.time}</span>
                            </div>
                          </div>
                          <CardContent className="p-4 sm:p-6 flex-1">
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary">{event.price}</span>
                  <span className="text-muted-foreground ml-1">/ person</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{event.date}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Number of Tickets</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of tickets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Ticket</SelectItem>
                      <SelectItem value="2">2 Tickets</SelectItem>
                      <SelectItem value="3">3 Tickets</SelectItem>
                      <SelectItem value="4">4 Tickets</SelectItem>
                      <SelectItem value="5">5+ Tickets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ticket Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Admission</SelectItem>
                      <SelectItem value="vip">VIP Experience</SelectItem>
                      <SelectItem value="group">Group Package</SelectItem>
                      <SelectItem value="family">Family Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Button className="w-full" size="lg">
                  Book Tickets
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Organizer
                </Button>
              </div>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>Free cancellation up to 7 days before the event</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

