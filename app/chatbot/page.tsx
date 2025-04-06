"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, ImageIcon, FileText, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/CloseIcon";
import { NoAgentNotification } from "@/components/NoAgentNotification";
import TranscriptionView from "@/components/TranscriptionView";
import {
  BarVisualizer,
  DisconnectButton,
  RoomAudioRenderer,
  RoomContext,
  VoiceAssistantControlBar,
  useVoiceAssistant,
} from "@livekit/components-react";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import { Room, RoomEvent } from "livekit-client";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: {
    type: "image" | "document";
    url: string;
    name: string;
  }[];
};

/* ------------------------- Text Chatbot Component ------------------------- */

function TextChatbot() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content:
        "👋 Hello! I'm your Journey+ travel assistant. How can I help you plan your next adventure?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, autoScroll]);

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    // Simulate bot response after a delay
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
          content:
            "That sounds like an amazing trip! Based on your interests, here's a 7-day itinerary for Greece:",
          attachments: [],
        },
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: MessageType = {
        id: Date.now().toString(),
        content: randomResponse.content,
        sender: "bot",
        timestamp: new Date(),
        attachments: randomResponse.attachments,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
      // If user scrolls up, disable auto-scroll
      if (scrollHeight - scrollTop - clientHeight > 100) {
        setAutoScroll(false);
      } else {
        setAutoScroll(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen w-full p-4">
      <Card className="border-primary/30 border-2 flex-1 overflow-hidden shadow-[0_0_15px_rgba(0,192,139,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,192,139,0.3)] flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <ScrollArea
              className="flex-1 p-4 overflow-auto min-h-0 max-h-[calc(100vh-180px)]"
              onScroll={handleScroll}
            >
              <div className="space-y-4 pb-2">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        className={`${
                          message.sender === "user"
                            ? "bg-primary"
                            : "bg-secondary"
                        } h-8 w-8 shadow-md flex-shrink-0`}
                      >
                        <AvatarFallback className="text-sm">
                          {message.sender === "user" ? "U" : "J+"}
                        </AvatarFallback>
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
                              h3: ({ node, ...props }) => (
                                <h3
                                  className="text-base font-bold mb-2"
                                  {...props}
                                />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul
                                  className="list-disc pl-4 space-y-1"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                              ),
                              p: ({ node, ...props }) => (
                                <p className="mb-2 last:mb-0" {...props} />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-bold" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg overflow-hidden shadow-md"
                                >
                                  {attachment.type === "image" ? (
                                    <div className="relative h-40 w-full">
                                      <Image
                                        src={
                                          attachment.url || "/placeholder.svg"
                                        }
                                        alt={attachment.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                      <FileText className="h-4 w-4 text-primary" />
                                      <span className="text-xs truncate">
                                        {attachment.name}
                                      </span>
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
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
                      <span className="text-xs truncate max-w-[120px]">
                        {file.name}
                      </span>
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
                  disabled={
                    (!input.trim() && attachments.length === 0) || isLoading
                  }
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------- Voice Chatbot Component ------------------------- */

function VoiceChatbot() {
  const [room] = useState(new Room());

  const onConnectButtonClicked = useCallback(async () => {
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
        "/api/connection-details",
      window.location.origin
    );
    const response = await fetch(url.toString());
    const connectionDetailsData = await response.json();
    await room.connect(
      connectionDetailsData.serverUrl,
      connectionDetailsData.participantToken
    );
    await room.localParticipant.setMicrophoneEnabled(true);
  }, [room]);

  useEffect(() => {
    room.on(RoomEvent.MediaDevicesError, onDeviceFailure);

    return () => {
      room.off(RoomEvent.MediaDevicesError, onDeviceFailure);
    };
  }, [room]);

  return (
    // Adjust the container styling to match the text chatbot theme.
    <div className="flex flex-col h-screen max-h-screen w-full p-4">
      <Card className="border-primary/30 border-2 flex-1 overflow-hidden shadow-[0_0_15px_rgba(0,192,139,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,192,139,0.3)] flex flex-col">
        <RoomContext.Provider value={room}>
          <SimpleVoiceAssistant
            onConnectButtonClicked={onConnectButtonClicked}
          />
        </RoomContext.Provider>
      </Card>
    </div>
  );
}

function SimpleVoiceAssistant(props: { onConnectButtonClicked: () => void }) {
  const { state: agentState, audioTrack } = useVoiceAssistant();
  const krisp = useKrispNoiseFilter();
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true);
  }, [krisp]);

  return (
    <>
      <AnimatePresence>
        {agentState === "disconnected" && (
          <motion.button
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="uppercase absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-md"
            onClick={() => props.onConnectButtonClicked()}
          >
            Start a conversation
          </motion.button>
        )}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3/4 lg:w-1/2">
            <TranscriptionView />
          </div>
        </div>
      </AnimatePresence>

      <RoomAudioRenderer />
      <NoAgentNotification state={agentState} />
      <div className="fixed bottom-0 w-full px-4 py-2">
        <ControlBar />
      </div>
    </>
  );
}

function ControlBar() {
  const krisp = useKrispNoiseFilter();
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true);
  }, [krisp]);

  const { state: agentState, audioTrack } = useVoiceAssistant();

  return (
    <div className="relative h-[100px]">
      <AnimatePresence>
        {agentState !== "disconnected" && agentState !== "connecting" && (
          <motion.div
            initial={{ opacity: 0, top: "10px" }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="flex absolute w-full h-full justify-between px-8 sm:px-4"
          >
            <BarVisualizer
              state={agentState}
              barCount={5}
              trackRef={audioTrack}
              className="agent-visualizer w-24 gap-2"
              options={{ minHeight: 12 }}
            />
            <div className="flex items-center">
              <VoiceAssistantControlBar controls={{ leave: false }} />
              <DisconnectButton>
                <CloseIcon />
              </DisconnectButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function onDeviceFailure(error: Error) {
  console.error(error);
  alert(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
  );
}

/* ------------------------- Parent Component with Toggle ------------------------- */

export default function ChatbotContainer() {
  const [mode, setMode] = useState<"text" | "voice">("text");

  return (
    <div className="relative">
      {/* Toggle button placed on top of the chat container */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          onClick={() => setMode(mode === "text" ? "voice" : "text")}
        >
          {mode === "text" ? "Switch to Voice" : "Switch to Text"}
        </Button>
      </div>
      {mode === "text" ? <TextChatbot /> : <VoiceChatbot />}
    </div>
  );
}
