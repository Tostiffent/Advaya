import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Filter, Search, PlusCircle } from "lucide-react"
import Link from "next/link"

const forumCategories = [
  { id: "all", label: "All Topics" },
  { id: "destinations", label: "Destinations" },
  { id: "tips", label: "Travel Tips" },
  { id: "gear", label: "Travel Gear" },
  { id: "food", label: "Food & Cuisine" },
  { id: "culture", label: "Culture" },
]

const forumPosts = [
  {
    id: 1,
    title: "Best time to visit Bali?",
    category: "destinations",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    replies: 24,
    likes: 18,
    lastActive: "2 hours ago",
    excerpt:
      "I'm planning a trip to Bali and wondering when the best time to visit would be to avoid the rainy season but also not have too many tourists...",
  },
  {
    id: 2,
    title: "Solo travel tips for Europe",
    category: "tips",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    replies: 42,
    likes: 35,
    lastActive: "5 hours ago",
    excerpt:
      "I'm planning my first solo trip to Europe this summer. Looking for advice on safety, meeting other travelers, and must-visit places that aren't too touristy...",
  },
  {
    id: 3,
    title: "Budget-friendly accommodations in Tokyo",
    category: "tips",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
    replies: 16,
    likes: 12,
    lastActive: "1 day ago",
    excerpt:
      "Tokyo is known for being expensive, but I'm trying to plan a trip without breaking the bank. Any recommendations for affordable but clean and safe places to stay?",
  },
  {
    id: 4,
    title: "Must-have travel gear for backpacking",
    category: "gear",
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AT",
    },
    replies: 31,
    likes: 27,
    lastActive: "3 days ago",
    excerpt:
      "I'm preparing for a 3-month backpacking trip across Southeast Asia. What are your essential gear recommendations that balance utility and weight?",
  },
  {
    id: 5,
    title: "Authentic Italian cuisine experiences",
    category: "food",
    author: {
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SG",
    },
    replies: 19,
    likes: 23,
    lastActive: "4 days ago",
    excerpt:
      "Beyond the typical tourist restaurants, where can I find authentic Italian food experiences? Looking for cooking classes, food tours, or local family restaurants.",
  },
]

export default function ForumsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Community Forums</h1>
              <p className="text-muted-foreground">Connect with fellow travelers and share your experiences</p>
            </div>
            <Button className="gap-2" asChild>
              <Link href="/forums/create">
                <PlusCircle className="h-4 w-4" />
                Create New Topic
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Categories</h3>
                <div className="space-y-1">
                  {forumCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={category.id === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search discussions..." className="pl-8" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Tabs defaultValue="latest">
                <TabsList>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
                <TabsContent value="latest" className="space-y-4 mt-6">
                  {forumPosts.map((post) => (
                    <Link href={`/forums/post/${post.id}`} key={post.id} className="block group">
                      <Card className="transition-all group-hover:border-primary/50">
                        <CardHeader>
                          <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{post.author.name}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="ml-auto">Active {post.lastActive}</div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </TabsContent>
                <TabsContent value="popular" className="space-y-4 mt-6">
                  {/* Popular posts would be shown here */}
                  <div className="text-center py-12 text-muted-foreground">Loading popular discussions...</div>
                </TabsContent>
                <TabsContent value="unanswered" className="space-y-4 mt-6">
                  {/* Unanswered posts would be shown here */}
                  <div className="text-center py-12 text-muted-foreground">Loading unanswered discussions...</div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

