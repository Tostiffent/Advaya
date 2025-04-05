import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"

const forumPosts = [
  {
    id: 1,
    title: "Best time to visit Bali?",
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
]

export function ForumPreview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
      {forumPosts.map((post) => (
        <Link href={`/forums/post/${post.id}`} key={post.id} className="group">
          <Card className="h-full transition-all group-hover:border-primary/50">
            <CardHeader>
              <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{post.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.initials}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{post.author.name}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
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
    </div>
  )
}

