"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { FileText, PlusCircle, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
  if (!user) {
    router.push("/login")
  }
}, [user, router])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto bg-pattern-dots">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Manage your tests, questions, and results from this dashboard.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card
              className="h-full cursor-pointer hover:shadow-md transition-all colorful-card"
              onClick={() => router.push("/tests")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Create Tests</CardTitle>
                <div className="bg-gradient-blue text-white p-2 rounded-full">
                  <FileText className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Create and schedule new tests for your students.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card
              className="h-full cursor-pointer hover:shadow-md transition-all colorful-card"
              onClick={() => router.push("/questions")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Add Questions</CardTitle>
                <div className="bg-gradient-purple text-white p-2 rounded-full">
                  <PlusCircle className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  Create and manage your question bank.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card
              className="h-full cursor-pointer hover:shadow-md transition-all colorful-card"
              onClick={() => router.push("/results")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Check Results</CardTitle>
                <div className="bg-gradient-green text-white p-2 rounded-full">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  View and analyze test results.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="colorful-border">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                No recent activity to display. Start by creating a test or adding questions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

