import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Kaustuv Roy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "KR",
    rating: 5,
    text: "Amazing journey, loved the tour. I will come again here.",
    location: "Visited Bali",
  },
  {
    name: "Jessica Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JT",
    rating: 5,
    text: "The cultural experience was incredible. Our guide was knowledgeable and friendly.",
    location: "Visited Greece",
  },
  {
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DC",
    rating: 4,
    text: "Well organized tour with great attention to detail. Would recommend to friends.",
    location: "Visited Japan",
  },
]

export function Testimonials() {
  return (
    <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          What Our <span className="text-primary">Travelers</span> Say
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Read about the experiences of travelers who have explored with us
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                    />
                  ))}
              </div>
              <p className="mb-6 text-muted-foreground">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

