"use client"

import { TrendingUp, Users, Clock, DollarSign } from "lucide-react"
import CircularGallery from "@/components/circular-gallery"

const caseStudies = [
  {
    id: "ecommerce",
    title: "E-commerce Automation",
    content: (
      <div id="services" className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">E-commerce Automation</h3>
        <p className="text-cyan-400 mb-3 text-sm">TechStore Inc.</p>
        <p className="text-gray-300 text-sm mb-4">
          Implemented AI chatbot handling 80% of customer inquiries, reducing response time by 95%.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded">
            <TrendingUp className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">95%</div>
            <div className="text-gray-400">Faster</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <Users className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">4.8/5</div>
            <div className="text-gray-400">Rating</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <DollarSign className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">60%</div>
            <div className="text-gray-400">Savings</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "healthcare",
    title: "Healthcare Appointment System",
    content: (
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Healthcare System</h3>
        <p className="text-cyan-400 mb-3 text-sm">MedCenter Group</p>
        <p className="text-gray-300 text-sm mb-4">
          AI-powered calling agent for appointment management, reducing booking time by 70%.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded">
            <Clock className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">70%</div>
            <div className="text-gray-400">Reduction</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <Users className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">40%</div>
            <div className="text-gray-400">Less No-shows</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <TrendingUp className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">3x</div>
            <div className="text-gray-400">Efficiency</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "finance",
    title: "Financial Services Automation",
    content: (
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Financial Services</h3>
        <p className="text-cyan-400 mb-3 text-sm">FinanceFlow Ltd.</p>
        <p className="text-gray-300 text-sm mb-4">
          Automated workflow with AI decision-making system, processing loans 85% faster.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded">
            <Clock className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">85%</div>
            <div className="text-gray-400">Faster</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <TrendingUp className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">25%</div>
            <div className="text-gray-400">More Approvals</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <DollarSign className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">40%</div>
            <div className="text-gray-400">Revenue Boost</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "retail",
    title: "Retail Optimization",
    content: (
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Retail Optimization</h3>
        <p className="text-cyan-400 mb-3 text-sm">ShopSmart Chain</p>
        <p className="text-gray-300 text-sm mb-4">
          Inventory management AI reducing waste by 45% and improving stock accuracy.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded">
            <TrendingUp className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">45%</div>
            <div className="text-gray-400">Less Waste</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <Users className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">98%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <DollarSign className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">30%</div>
            <div className="text-gray-400">Profit Up</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "manufacturing",
    title: "Manufacturing Intelligence",
    content: (
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Manufacturing AI</h3>
        <p className="text-cyan-400 mb-3 text-sm">TechFactory Pro</p>
        <p className="text-gray-300 text-sm mb-4">
          Predictive maintenance AI preventing 90% of equipment failures and downtime.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded">
            <Clock className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">90%</div>
            <div className="text-gray-400">Prevention</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <TrendingUp className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">50%</div>
            <div className="text-gray-400">Efficiency</div>
          </div>
          <div className="bg-gray-700/50 p-2 rounded">
            <DollarSign className="h-3 w-3 text-cyan-400 mx-auto mb-1" />
            <div className="text-cyan-400 font-bold">35%</div>
            <div className="text-gray-400">Cost Cut</div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Portfolio() {
  return (
    <section className="py-16 px-6 bg-black relative overflow-hidden">
      {/* ReactBits background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(45deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(128, 0, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Discover how we've transformed businesses across industries with our AI automation solutions.
          </p>
        </div>

        <div className="flex justify-center">
          <CircularGallery items={caseStudies} radius={180} />
        </div>
      </div>
    </section>
  )
}
