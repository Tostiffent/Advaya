"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Paperclip, ImageIcon, FileText, X } from "lucide-react"
import Link from "next/link"

const categories = [
  { value: "destinations", label: "Destinations" },
  { value: "tips", label: "Travel Tips" },
  { value: "gear", label: "Travel Gear" },
  { value: "food", label: "Food & Cuisine" },
  { value: "culture", label: "Culture" },
]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // In a real app, you would redirect to the new post
      window.location.href = "/forums"
    }, 1500)
  }

  return (
    <div className="container py-8 max-w-3xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/forums" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Forums
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">Create New Topic</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Topic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, questions, or experiences..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">You can use markdown formatting for your post.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="gap-2"
                >
                  <Paperclip className="h-4 w-4" />
                  Add Files
                </Button>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <p className="text-xs text-muted-foreground">Supported formats: Images, PDF, DOC, TXT (Max 5MB each)</p>
              </div>

              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-2 pr-3">
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="h-4 w-4 text-primary" />
                        ) : (
                          <FileText className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border/40">
            <Button type="button" variant="outline" asChild>
              <Link href="/forums">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Topic"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

