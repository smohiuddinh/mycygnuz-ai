"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Phone, Calendar, Zap } from "lucide-react"

const demoMessages = [
  { type: "bot", message: "Hello! I'm your AI assistant. How can I help you today?" },
  { type: "user", message: "I need to schedule a meeting for next week" },
  { type: "bot", message: "I'd be happy to help you schedule a meeting. What day next week works best for you?" },
  { type: "user", message: "Tuesday afternoon would be perfect" },
  {
    type: "bot",
    message:
      "Great! I've found several available slots on Tuesday afternoon. Would 2:00 PM or 3:30 PM work better for you?",
  },
]

export default function AIDemo() {
  const [messages, setMessages] = useState<Array<{ type: string; message: string }>>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [demoIndex, setDemoIndex] = useState(0)

  useEffect(() => {
    if (demoIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages((prev) => [...prev, demoMessages[demoIndex]])
          setIsTyping(false)
          setDemoIndex((prev) => prev + 1)
        }, 1000)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [demoIndex])

  const resetDemo = () => {
    setMessages([])
    setDemoIndex(0)
    setIsTyping(false)
  }

  return (
    <section id="projects" className="py-16 px-6 bg-gray-900 relative overflow-hidden">
      {/* ReactBits background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Agent Demo
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience our AI agents in action. Watch how they handle real conversations and automate complex tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative">
            {/* ReactBits glow effect for demo card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-sm" />

            <Card className="relative bg-gray-800/70 backdrop-blur-sm border-gray-700 h-80">
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/50" />

              <CardHeader className="border-b border-gray-700 pb-3">
                <CardTitle className="flex items-center text-cyan-400 text-lg">
                  <Bot className="mr-2 h-5 w-5" />
                  AI Assistant Demo
                  <div className="ml-auto flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-start space-x-2 max-w-xs ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center relative ${
                            msg.type === "user" ? "bg-blue-600" : "bg-cyan-600"
                          }`}
                        >
                          {msg.type === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm opacity-50" />
                        </div>
                        <div
                          className={`p-3 rounded-lg text-sm relative ${
                            msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
                          }`}
                        >
                          {msg.message}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center relative">
                          <Bot className="h-3 w-3" />
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm opacity-50" />
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white text-sm h-9"
                    />
                    <Button size="sm" className="relative bg-cyan-600 hover:bg-cyan-500 h-9 w-9 p-0">
                      <Send className="h-3 w-3" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded blur-sm" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 text-center">
              <Button
                onClick={resetDemo}
                variant="outline"
                size="sm"
                className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent backdrop-blur-sm"
              >
                <span className="relative z-10">Restart Demo</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded blur-sm" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "Voice AI Capabilities",
                items: [
                  "Natural conversation flow",
                  "Multi-language support",
                  "Emotion recognition",
                  "Real-time responses",
                ],
              },
              {
                icon: Calendar,
                title: "Automation Features",
                items: ["Appointment scheduling", "Lead qualification", "Data collection", "Follow-up automation"],
              },
              {
                icon: Zap,
                title: "Performance Metrics",
                metrics: [
                  { label: "Accuracy Rate", value: "95%" },
                  { label: "Availability", value: "24/7" },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-sm" />
                <div className="relative bg-gray-800/70 backdrop-blur-sm p-5 rounded-lg border border-gray-700">
                  {/* Corner accents */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-400/30" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-400/30" />

                  <div className="flex items-center mb-3">
                    <section.icon className="h-5 w-5 text-cyan-400 mr-3" />
                    <h3 className="text-lg font-bold text-white">{section.title}</h3>
                  </div>

                  {section.items && (
                    <ul className="space-y-1.5 text-gray-300 text-sm">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>• {item}</li>
                      ))}
                    </ul>
                  )}

                  {section.metrics && (
                    <div className="grid grid-cols-2 gap-3 text-center">
                      {section.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex}>
                          <div className="text-2xl font-bold text-cyan-400">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button className="w-full relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2.5 rounded-lg font-medium border border-cyan-400/50">
              <span className="relative z-10">Schedule Live Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur-sm" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
