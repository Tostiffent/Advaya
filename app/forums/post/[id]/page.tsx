import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Share, Flag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data for forum posts
const forumPosts = [
  {
    id: "1",
    title: "Best time to visit Bali?",
    category: "destinations",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      joinDate: "Member since Jan 2022",
      posts: 42,
    },
    content: `
I'm planning a trip to Bali and wondering when the best time to visit would be to avoid the rainy season but also not have too many tourists.

I've heard that May-June and September-October are good times to visit, but I'm concerned about the weather. Has anyone been during these months? What was your experience like?

Also, I'm interested in both beach activities and exploring the cultural sites. Are there any specific areas you'd recommend staying in to have easy access to both?

Thanks in advance for your help!
    `,
    replies: [
      {
        id: "r1",
        author: {
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "MC",
          joinDate: "Member since Mar 2021",
          posts: 156,
        },
        content:
          "I visited Bali last September and it was perfect! The weather was great - sunny most days with occasional short showers in the late afternoon. The beaches weren't crowded at all, and I could enjoy Ubud's cultural sites without the usual tourist crowds.\n\nI'd recommend staying in Seminyak if you want a good balance between beach access and culture. It's not as party-focused as Kuta but still has great restaurants and is a good base for day trips.",
        timestamp: "3 days ago",
        likes: 8,
      },
      {
        id: "r2",
        author: {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "EW",
          joinDate: "Member since Aug 2022",
          posts: 27,
        },
        content:
          "May-June is definitely my favorite time to visit! The weather is dry but not too hot, and prices are lower than during the July-August peak season.\n\nFor accommodations, I'd suggest Ubud for culture and then moving to Uluwatu or Nusa Dua for beaches. Splitting your stay gives you the best of both worlds!",
        timestamp: "2 days ago",
        likes: 5,
      },
    ],
    createdAt: "5 days ago",
    views: 124,
    likes: 18,
  },
  {
    id: "2",
    title: "Solo travel tips for Europe",
    category: "tips",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
      joinDate: "Member since Mar 2021",
      posts: 156,
    },
    content: `
I'm planning my first solo trip to Europe this summer. Looking for advice on safety, meeting other travelers, and must-visit places that aren't too touristy.

I'll have about 3 weeks and am thinking of visiting Portugal, Spain, and maybe Italy. Is this too ambitious? Should I focus on fewer countries?

Also interested in budget accommodation recommendations and tips for solo dining (I get a bit anxious eating alone at restaurants).

Any advice from experienced solo travelers would be greatly appreciated!
    `,
    replies: [
      {
        id: "r1",
        author: {
          name: "Alex Thompson",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "AT",
          joinDate: "Member since Feb 2020",
          posts: 89,
        },
        content:
          "For a 3-week trip, I'd recommend focusing on just 2 countries - maybe Portugal and Spain since they're connected. Trying to add Italy might make things too rushed.\n\nFor accommodations, hostels are great for solo travelers! Look for ones with common areas or bars where it's easy to meet people. I particularly liked Yes! Hostels in Portugal and Cat's Hostels in Spain.\n\nFor solo dining, look for places with bar seating where you can chat with bartenders, or try food markets where it's normal to eat alone. Apps like EatWith are also great for finding social dining experiences!",
        timestamp: "4 days ago",
        likes: 12,
      },
    ],
    createdAt: "1 week ago",
    views: 203,
    likes: 35,
  },
  {
    id: "3",
    title: "Budget-friendly accommodations in Tokyo",
    category: "tips",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      joinDate: "Member since Aug 2022",
      posts: 27,
    },
    content: `
Tokyo is known for being expensive, but I'm trying to plan a trip without breaking the bank. Any recommendations for affordable but clean and safe places to stay?

I'm open to hostels, capsule hotels, or budget business hotels. Location is important - I'd like to be near public transportation.

Also, any tips on saving money on food and activities in Tokyo would be helpful!
    `,
    replies: [],
    createdAt: "3 days ago",
    views: 87,
    likes: 12,
  },
]

export default function ForumPostPage({ params }: { params: { id: string } }) {
  const post = forumPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/forums" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Forums
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Posted {post.createdAt}</span>
          <span>•</span>
          <span>{post.views} views</span>
          <span>•</span>
          <span>Category: {post.category}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium">{post.author.name}</h3>
            <div className="text-xs text-muted-foreground space-y-1 mt-1">
              <p>{post.author.joinDate}</p>
              <p>{post.author.posts} posts</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none">
                {post.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/40 py-3">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like ({post.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Replies ({post.replies.length})</h2>
              <Button variant="outline" size="sm">
                Newest First
              </Button>
            </div>

            {post.replies.length > 0 ? (
              <div className="space-y-4">
                {post.replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{reply.author.name}</div>
                          <div className="text-xs text-muted-foreground">{reply.timestamp}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="prose prose-invert max-w-none">
                        {reply.content.split("\n\n").map((paragraph, i) => (
                          <p key={i} className="mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-border/40 py-3">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Like ({reply.likes})</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-muted-foreground">
                <p>No replies yet. Be the first to respond!</p>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h3 className="font-medium">Post a Reply</h3>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Write your reply here..." className="min-h-[150px]" />
              </CardContent>
              <CardFooter className="flex justify-end border-t border-border/40">
                <Button>Submit Reply</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

