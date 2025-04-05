import { Heart, MapPin, MessageCircle, Map, Gift, Globe } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Why Choose <span className="text-primary">TravelWise</span>
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Our platform offers unique tools and experiences designed to make your travel planning seamless and adventures unforgettable.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Personalized Recommendations</h3>
            <p className="text-muted-foreground">
              Our AI algorithm analyzes your preferences and travel history to suggest destinations tailored specifically to your interests.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Interactive 3D Destinations</h3>
            <p className="text-muted-foreground">
              Explore destinations in immersive 3D before you travel, allowing you to visualize landmarks and plan your itinerary effectively.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Community Forums</h3>
            <p className="text-muted-foreground">
              Connect with fellow travelers, share experiences, and get insider tips from our vibrant global community.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Real Traveler Stories</h3>
            <p className="text-muted-foreground">
              Read authentic experiences and journeys from our users to inspire your next adventure and get practical insights.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Custom Itinerary Builder</h3>
            <p className="text-muted-foreground">
              Create detailed day-by-day travel plans with our drag-and-drop itinerary builder, complete with time estimates and local tips.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-xl">Exclusive Deals</h3>
            <p className="text-muted-foreground">
              Access member-only discounts on accommodations, tours, and experiences through our extensive partner network.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}