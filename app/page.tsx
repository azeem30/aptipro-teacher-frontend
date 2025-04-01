"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home")
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen flex-col bg-pattern-dots">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm z-10">
        <h1 className="text-2xl font-bold text-gradient-rainbow">AptiPro</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button onClick={() => router.push("/signup")} className="bg-gradient-primary hover:opacity-90">
            Sign Up
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-rainbow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Schedule MCQ-based tests to enhance the aptitude of individuals
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            AptiPro is a comprehensive platform designed to help educators, trainers, and organizations create, manage,
            and evaluate multiple-choice tests. Our platform makes it easy to assess knowledge, track progress, and
            identify areas for improvement.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <Button
              size="lg"
              onClick={() => router.push("/signup")}
              className="animate-pulse bg-gradient-primary hover:opacity-90 glow"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="bg-card p-6 rounded-lg shadow-sm border colorful-card animate-fade-in">
            <div className="bg-gradient-blue text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Create Tests</h3>
            <p className="text-muted-foreground">
              Design custom MCQ tests with flexible options for difficulty, timing, and subject matter.
            </p>
          </div>
          <div
            className="bg-card p-6 rounded-lg shadow-sm border colorful-card animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-gradient-purple text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Build Question Banks</h3>
            <p className="text-muted-foreground">
              Develop comprehensive question libraries organized by subject, difficulty, and topic.
            </p>
          </div>
          <div
            className="bg-card p-6 rounded-lg shadow-sm border colorful-card animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-gradient-green text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Analyze Results</h3>
            <p className="text-muted-foreground">
              Get detailed insights into test performance with comprehensive analytics and reporting.
            </p>
          </div>
        </motion.div>
      </main>
      <footer className="border-t py-6 md:py-8 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AptiPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

