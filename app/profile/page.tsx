"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if(!user){
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto bg-pattern-grid">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">Your Profile</h1>
          <p className="text-muted-foreground animate-fade-in">View and manage your account information.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="colorful-card">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                  <p className="text-lg">{user.id}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/20">
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-pink-50/50 dark:bg-pink-900/20">
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20">
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p className="text-lg">{user.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="colorful-card">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Activity Summary</CardTitle>
              <CardDescription>Your activity on the platform</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <div className="bg-gradient-blue/10 p-4 rounded-lg text-center border border-blue-200 dark:border-blue-900 w-full">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Tests Created</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.tests_created}</p>
                </div>
                <div className="bg-gradient-green/10 p-4 rounded-lg text-center border border-green-200 dark:border-green-900 w-full">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Results Analyzed</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{user.results_analyzed}</p>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

