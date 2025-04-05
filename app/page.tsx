import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { ForumPreview } from "@/components/forum-preview"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Testimonials } from "@/components/testimonials"
import { TeamMembers } from "@/components/team-members"
import { FeatureSection } from "@/components/features-section"

export default function Home() {
  return (
    <>
      <section className="container py-10 md:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Experience the World <span className="text-primary">Your Way!</span>
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Discover diverse destinations, plan your journey with personalized recommendations, and connect with travelers through our community forums. Visualize adventures with 3D models and real stories!
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary hover:bg-[#007B59]">
                Book Now
              </Button>
              <Link href="/chatbot" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    <Button size="lg" variant="outline" className="relative border-primary text-white hover:bg-primary/10 shadow-[0_0_10px_rgba(0,200,150,0.5)] transition-all hover:shadow-[0_0_15px_rgba(0,200,150,0.8)]">
                Get AI Recomendations
              </Button>
                  </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-background">
              <div className="absolute inset-0 rounded-xl ">
                <Image
                  src="https://cdn.discordapp.com/attachments/979277341723332638/1357727532199182468/ChatGPT_Image_Apr_4__2025__08_11_04_PM__1_-removebg-preview.png?ex=67f141cd&is=67eff04d&hm=51b1b031318426ab3fe5e78adb1736b7a444428cf48efe17861d69bc9902e856&"
                  width={500}
                  height={500}
                  alt="Tourist with backpack"
                  className="mx-auto h-full w-auto object-contain"
                />
              </div>
              <div className="absolute bottom-4 right-4 rounded-lg bg-background/90 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                  <span className="text-xs font-medium">Excellent (4.9)</span>
                </div>
                <p className="mt-1 text-xs">"Amazing journey, loved the tour. I will come again here."</p>
              </div>
            </div>
            <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-primary/30 blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-secondary/30 blur-3xl"></div>
          </div>
        </div>
      </section>

      <FeatureSection/>

      <FeaturedDestinations />

      <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Join Our <span className="text-primary">Community</span>
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Connect with fellow travelers, share experiences, and get insider tips from our vibrant community forums.
          </p>
        </div>

        <ForumPreview />

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/forums">View All Discussions</Link>
          </Button>
        </div>
      </section>

      <UpcomingEvents />

      <Testimonials />

      <section className="container py-10 md:py-16 lg:py-20 border-t border-border/40">
        <div className="mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
            <h2 className="mt-4 font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              We Always <span className="text-primary">Committed</span> For Our Service
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Our team of experienced travel enthusiasts is dedicated to providing exceptional service and creating
              unforgettable experiences for every traveler.
            </p>
            <Button className="mt-6" variant="outline">
              Learn More About Us
            </Button>
          </div>
          <TeamMembers />
        </div>
      </section>
    </>
  )
}

