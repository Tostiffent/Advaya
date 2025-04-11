"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Paperclip, Send, ImageIcon, FileText, X, Mic, MessageSquare, 
  Wifi, WifiOff, CheckCircle2, XCircle, DollarSign, ArrowDown, Phone
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Room, RoomEvent } from "livekit-client"
import { BarVisualizer, DisconnectButton, RoomAudioRenderer, RoomContext, VoiceAssistantControlBar, useVoiceAssistant } from "@livekit/components-react"
import { useKrispNoiseFilter } from "@livekit/components-react/krisp"
import TranscriptionView from "@/components/TranscriptionView"
import { NoAgentNotification } from "@/components/NoAgentNotification"
import io from "socket.io-client"

// Add Dialog imports for the modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type MessageType = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  attachments?: {
    type: "image" | "document"
    url: string
    name: string
  }[]
}

type TripItem = {
  id: string
  text: string
  finalized: boolean
}

export default function ChatbotPage() {
  // State for chat mode
  const [chatMode, setChatMode] = useState<"text" | "voice">("text")
  const [room] = useState(new Room())
  
  // Socket.IO connection state
  const [socket, setSocket] = useState<any>(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")

  // Modal state
  const [showCallModal, setShowCallModal] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isCallLoading, setIsCallLoading] = useState(false)

  // Text chat state
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "👋 Hello! I'm your Journey+ travel assistant. How can I help you plan your next adventure?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [userHasScrolled, setUserHasScrolled] = useState(false)

  // Trip tracker state
  const [pendingItems, setPendingItems] = useState<TripItem[]>([])
  const [finalizedItems, setFinalizedItems] = useState<TripItem[]>([])
  const [initialBudget, setInitialBudget] = useState(0)
  const [remainingBudget, setRemainingBudget] = useState(0)
  const [showBudgetAnimation, setShowBudgetAnimation] = useState(false)

  // Initialize Socket.IO connection
  useEffect(() => {
    // Connect to the Socket.IO server
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "https://expert-funicular-q5474xjg4p9f69r5-5000.app.github.dev/"
    const newSocket = io(socketUrl)
    setSocket(newSocket)
    setConnectionStatus("connecting")

    // Socket connection event handlers
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server")
      setSocketConnected(true)
      setConnectionStatus("connected")
    })

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server")
      setSocketConnected(false)
      setConnectionStatus("disconnected")
    })

    newSocket.on("connect_error", (error: any) => {
      console.error("Connection error:", error)
      setSocketConnected(false)
      setConnectionStatus("disconnected")
    })

    // Event handler for receiving messages from the server
    newSocket.on("response", (data: any) => {
      setIsLoading(false)
      
      // Create a bot message from the response
      const botMessage: MessageType = {
        id: Date.now().toString(),
        content: data.message,
        sender: "bot",
        timestamp: new Date(),
        // You can add attachments here if your backend sends them
      }
      
      setMessages((prev) => [...prev, botMessage])
      
      // Handle trip tracker updates if included in the response
      if (data.trip_status) {
        if (data.trip_status.pending_items) {
          setPendingItems(data.trip_status.pending_items)
        }
        if (data.trip_status.finalized_items) {
          setFinalizedItems(data.trip_status.finalized_items)
        }
        if (data.trip_status.initial_budget != undefined) {
          // Trigger budget animation
          setShowBudgetAnimation(true)
          setTimeout(() => {
            setInitialBudget(data.trip_status.initial_budget)
            setTimeout(() => {
              setShowBudgetAnimation(false)
            }, 1000)
          }, 500)
        }
        if (data.trip_status.current_budget !== undefined) {
          // Trigger budget animation
          setShowBudgetAnimation(true)
          setTimeout(() => {
            setRemainingBudget(data.trip_status.current_budget)
            setTimeout(() => {
              setShowBudgetAnimation(false)
            }, 1000)
          }, 500)
        }
      }
    })

    // Status updates
    newSocket.on("status", (data: any) => {
      console.log("Status update:", data.status)
      // You could set a temporary message or loading state based on this
    })

    // Error handling
    newSocket.on("error", (data: any) => {
      console.error("Error from server:", data.error)
      setIsLoading(false)
      
      // Optionally display error message to user
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        content: `Sorry, there was an error processing your request: ${data.error}`,
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    })

    // Clean up on unmount
    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!userHasScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, userHasScrolled])

  // Voice chat setup
  const onConnectVoice = useCallback(async () => {
    try {
      const url = new URL(
        process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? "/api/connection-details",
        window.location.origin
      )
      const response = await fetch(url.toString())
      const connectionDetailsData = await response.json()

      await room.connect(connectionDetailsData.serverUrl, connectionDetailsData.participantToken)
      await room.localParticipant.setMicrophoneEnabled(true)
    } catch (error) {
      console.error("Failed to connect to voice chat:", error)
    }
  }, [room])

  useEffect(() => {
    const handleMediaDevicesError = (error: Error) => {
      console.error(error)
      alert(
        "Error acquiring microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
      )
    }
  
    room.on(RoomEvent.MediaDevicesError, handleMediaDevicesError)
  
    return () => {
      room.off(RoomEvent.MediaDevicesError, handleMediaDevicesError)
    }
  }, [room])

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return

    setUserHasScrolled(false)

    // Create a new user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      attachments: attachments.map((file) => ({
        type: file.type.startsWith("image/") ? "image" : "document",
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachments([])
    setIsLoading(true)

    // If connected to Socket.IO, send the message to the server
    if (socket && socketConnected) {
      socket.emit("message", input)
    } else {
      // Fallback to simulated response if Socket.IO is not connected
      simulateBotResponse()
    }
  }

  // Simulate bot response for fallback/demo purposes
  const simulateBotResponse = () => {
    setTimeout(() => {
      const botResponses = [
        {
          content:
            "I'd recommend visiting Bali during the dry season from April to October. The weather is perfect for exploring the beaches and cultural sites!",
          attachments: [
            {
              type: "image" as const,
              url: "/placeholder.svg?height=300&width=500",
              name: "bali-beaches.jpg",
            },
          ],
        },
        {
          content:
            "Here are some budget-friendly accommodations in Tokyo:\n\n- **Sakura Hostel Asakusa** - Great location, from $25/night\n- **Book and Bed Tokyo** - Unique bookstore concept, from $40/night\n- **Unplan Kagurazaka** - Modern facilities, from $35/night\n\nAll of these are well-connected by public transport!",
          attachments: [],
        },
        {
          content:
            "For solo travel in Europe, I suggest starting in Portugal or Spain where it's affordable and traveler-friendly. Make sure to stay in hostels to meet other travelers!\n\n### Safety Tips:\n- Keep digital copies of important documents\n- Share your itinerary with someone at home\n- Get travel insurance that covers medical emergencies",
          attachments: [],
        },
        {
          content: "That sounds like an amazing trip! Based on your interests, here's a 7-day itinerary for Greece:",
          attachments: [],
        },
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: MessageType = {
        id: Date.now().toString(),
        content: randomResponse.content,
        sender: "bot",
        timestamp: new Date(),
        attachments: randomResponse.attachments,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
      
      // Simulate trip tracker updates for demo
      const randomChange = Math.random() > 0.5;
      if (randomChange && pendingItems.length > 0) {
        // Simulate an item being finalized
        const itemIndex = Math.floor(Math.random() * pendingItems.length);
        const item = pendingItems[itemIndex];
        
        // Move item from pending to finalized
        setPendingItems(prev => prev.filter((_, idx) => idx !== itemIndex));
        setFinalizedItems(prev => [...prev, {...item, finalized: true}]);
        
        // Update remaining budget
        const expenseAmount = Math.floor(Math.random() * 300) + 100;
        setShowBudgetAnimation(true);
        setTimeout(() => {
          setRemainingBudget(prev => prev - expenseAmount);
          setTimeout(() => {
            setShowBudgetAnimation(false);
          }, 1000);
        }, 500);
      }
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 50
      
      // Only set userHasScrolled to true if we're not near the bottom
      setUserHasScrolled(!isScrolledToBottom)
      
      // Auto-scroll is active only when we're near the bottom
      setAutoScroll(isScrolledToBottom)
    }
  }

  const toggleChatMode = () => {
    setShowCallModal(true);
  }

  const handleCallSubmit = async () => {
    // Validate the phone number (basic validation)
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    setIsCallLoading(true);
    
    try {
      // Send GET request to the call endpoint with the phone number as a parameter
      const response = await fetch(`https://expert-funicular-q5474xjg4p9f69r5-5000.app.github.dev/call/${phoneNumber}`);
      console.log(response)
      
      if (!response.ok) {
        throw new Error(`Failed to initiate call: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Call initiated:", data);
      
      // Add a bot message to indicate call status
      const botMessage: MessageType = {
        id: Date.now().toString(),
        content: `📞 Call initiated to ${phoneNumber}. You'll receive a call shortly.`,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setShowCallModal(false);
      
    } catch (error) {
      console.error("Error initiating call:", error);
      
      // Add an error message
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        content: `Sorry, there was an error initiating your call. Please try again later.`,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsCallLoading(false);
    setPhoneNumber("");
  }

  async function downloadSummary() {
    try {
      // Construct the URL with the given sessionId
      const response = await fetch(`https://expert-funicular-q5474xjg4p9f69r5-5000.app.github.dev/download/summary/default`);
      
      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      // Retrieve the PDF as a Blob
      const blob = await response.blob();
      
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      
      // Extract the filename from the content-disposition header if available or fallback to a default name
      const disposition = response.headers.get("content-disposition");
      let filename = 'downloaded.pdf';
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      a.download = filename;
      
      // Append the anchor to the body, trigger click to start download, and then clean up
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Release the object URL after download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download the PDF:", error);
    }
  }

  // Connection status indicator component
  const ConnectionIndicator = () => {
    return (
      <div className="flex items-center gap-2 p-2">
        {connectionStatus === "connected" ? (
          <>
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500">Server Connected</span>
          </>
        ) : connectionStatus === "connecting" ? (
          <>
            <div className="animate-pulse">
              <Wifi className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-xs text-amber-500">Connecting...</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-red-500" />
            <span className="text-xs text-red-500">Server Disconnected</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen max-h-screen w-full p-4">
      {/* Phone Call Modal */}
      <Dialog open={showCallModal} onOpenChange={setShowCallModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start a Phone Call</DialogTitle>
            <DialogDescription>
              Enter your phone number to receive a call from our travel assistant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel" 
                placeholder="+91 1234567890"
                className="col-span-3"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCallModal(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCallSubmit}
              disabled={isCallLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isCallLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  <span>Calling...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Start Call</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4 h-full" style={{height:"90%"}}>
        <Card className="border-primary/30 border-2 flex-1 overflow-hidden shadow-[0_0_15px_rgba(0,192,139,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,192,139,0.3)] flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex justify-between p-2 border-b border-border/40 bg-card/60">
              <ConnectionIndicator />
              <div style={{display:"flex", flexDirection:"row"}}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadSummary}
                  className="flex items-center gap-2 hover:bg-primary/10 transition-colors mr-2"
                >
                  <>
                    <MessageSquare className="h-4 w-4" />
                    <span>Download Summary</span>
                  </>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleChatMode}
                  className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <>
                    <Phone className="h-4 w-4" />
                    <span>Request Call</span>
                  </>
                </Button>
              </div>
            </div>
            
            {chatMode === "text" ? (
              // Text chat UI
              <div className="flex flex-col h-full flex-grow overflow-hidden">
                {/* Fixed height ScrollArea - this is the key fix */}
                <ScrollArea 
  className="flex-1 p-4 overflow-auto" 
  style={{ flex: "1 1 auto", minHeight: 0 }}
  onScroll={handleScroll}
  ref={messagesContainerRef}
>
                  <div className="space-y-4 pb-2">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                          <Avatar
                            className={`${message.sender === "user" ? "bg-primary" : "bg-secondary"} h-8 w-8 shadow-md flex-shrink-0`}
                          >
                            <AvatarFallback className="text-sm">{message.sender === "user" ? "U" : "J+"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "bg-muted shadow-md"
                              }`}
                            >
                              <ReactMarkdown
                                components={{
                                  h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-2" {...props} />,
                                  ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                                    {attachment.type === "image" ? (
                                      <div className="relative h-40 w-full">
                                        <Image
                                          src={attachment.url || "/placeholder.svg"}
                                          alt={attachment.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                        <FileText className="h-4 w-4 text-primary" />
                                        <span className="text-xs truncate">{attachment.name}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex gap-3">
                          <Avatar className="bg-secondary h-8 w-8 shadow-md flex-shrink-0">
                            <AvatarFallback className="text-sm">J+</AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-3 bg-muted flex items-center shadow-md">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                            </div>
                            <span className="ml-2 text-xs">Typing...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="p-3 border-t border-border/40 bg-card/60 flex-shrink-0">
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {attachments.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 bg-muted rounded-full pl-3 pr-1 py-1 shadow-sm"
                        >
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="h-3 w-3 text-primary" />
                          ) : (
                            <FileText className="h-3 w-3 text-primary" />
                          )}
                          <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full hover:bg-destructive/20 transition-colors"
                            onClick={() => removeAttachment(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 h-10 w-10 hover:bg-primary/10 transition-colors"
                      onClick={handleAttachmentClick}
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about travel..."
                      className="min-h-10 h-10 flex-1 resize-none text-sm py-2 px-3 focus-visible:ring-primary"
                      rows={1}
                    />
                    <Button
                      className="shrink-0 h-10 w-10 bg-primary hover:bg-[#007B59] transition-colors"
                      onClick={handleSend}
                      disabled={(!input.trim() && attachments.length === 0) || isLoading}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Voice chat UI with theme matched to text chat
              <RoomContext.Provider value={room}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 p-4 flex flex-col items-center justify-center">
                    <VoiceUI />
                  </div>
                </div>
              </RoomContext.Provider>
            )}
          </CardContent>
        </Card>
        
        {/* Trip Tracker Sidebar */}
        <Card className="w-80 h-full border-primary/30 border-2 overflow-hidden shadow-[0_0_15px_rgba(0,192,139,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,192,139,0.3)] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/40 px-4 py-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Trip Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex-1 overflow-auto px-4 py-3">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Pending Items
                </h3>
                <AnimatePresence>
                  {pendingItems.length > 0 ? (
                    <ul className="space-y-2">
                      {pendingItems.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-2 bg-muted/50 p-2 rounded-lg"
                        >
                          <XCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground italic px-2"
                    >
                      No pending items
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  Finalized Items
                </h3>
                <AnimatePresence>
                  {finalizedItems.length > 0 ? (
                    <ul className="space-y-2">
                      {finalizedItems.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-2 bg-green-500/5 p-2 rounded-lg"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground italic px-2"
                    >
                      No finalized items
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="mt-auto border-t border-border/40 p-4 bg-gradient-to-b from-transparent to-primary/5">
              <div className="rounded-lg bg-card p-4 shadow-md border border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-primary mr-2" />
                  Trip Budget
                </h3>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Initial:</span>
                  <span className="text-xl font-bold text-primary">${initialBudget}</span>
                </div>
                
                <div className="h-1 w-full bg-muted mb-4 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: `${(remainingBudget / initialBudget) * 100}%` }}
                    animate={{ width: `${(remainingBudget / initialBudget) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining:</span>
                  <div className="relative">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      ${remainingBudget}
                    </span>
                    
                    {/* Money animation */}
                    <AnimatePresence>
                      {showBudgetAnimation && (
                          <motion.div 
                          className="absolute -right-1 -bottom-6 text-green-500 font-bold flex items-center"
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: -10 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.7 }}
                        >
                          <ArrowDown className="h-4 w-4 transform rotate-180" />
                          <span className="text-xs">
                            -{Math.abs(initialBudget - remainingBudget)}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <motion.div 
                    className="text-xs text-muted-foreground"
                    animate={{ 
                      scale: showBudgetAnimation ? [1, 1.05, 1] : 1 
                    }}
                    transition={{ duration: 0.5, repeat: showBudgetAnimation ? 2 : 0 }}
                  >
                    {(remainingBudget / initialBudget) * 100 < 30 
                      ? "Budget is running low!" 
                      : (remainingBudget / initialBudget) * 100 < 60 
                        ? "Budget on track" 
                        : "Budget looks healthy!"}
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Voice chat UI component
function VoiceUI() {
  const { state: agentState, audioTrack } = useVoiceAssistant()
  const krisp = useKrispNoiseFilter()
  
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true)
  }, [krisp])

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <RoomAudioRenderer />
      <NoAgentNotification state={agentState} />
      
      <div className="flex-1 flex items-center justify-center mb-8">
        <AnimatePresence>
          {agentState === "disconnected" && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-md hover:bg-[#007B59] transition-colors"
            >
              Start a conversation
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="w-full lg:w-3/4 mx-auto px-4 overflow-y-auto max-h-[50vh]">
        <TranscriptionView />
      </div>
      
      <div className="h-24 w-full mt-4">
        <AnimatePresence>
          {agentState !== "disconnected" && agentState !== "connecting" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex justify-between items-center px-8 sm:px-4 h-full"
            >
              <BarVisualizer
                state={agentState}
                barCount={5}
                trackRef={audioTrack}
                className="agent-visualizer w-24 gap-2"
                options={{ minHeight: 12 }}
              />
              <div className="flex items-center gap-2">
                <VoiceAssistantControlBar controls={{ leave: false }} />
                <DisconnectButton className="bg-red-500/10 hover:bg-red-500/20 p-2 rounded-full transition-colors">
                  <X className="h-5 w-5 text-red-500" />
                </DisconnectButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}