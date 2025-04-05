import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "AJ",
  },
  {
    name: "Maria Rodriguez",
    role: "Travel Experience Director",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "MR",
  },
  {
    name: "David Kim",
    role: "Cultural Expert",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "DK",
  },
]

export function TeamMembers() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {team.map((member) => (
        <div key={member.name} className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 font-medium">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  )
}

