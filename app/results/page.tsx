"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTest } from "@/lib/test-context"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Eye, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ResultsPage() {
  const router = useRouter()
  const { results, fetchResults } = useTest()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    fetchResults()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-gradient-green text-white"
      case "Medium":
        return "bg-gradient-amber text-white"
      case "Hard":
        return "bg-gradient-danger text-white"
      default:
        return "bg-gradient-primary text-white"
    }
  }

  const subjects = ["all", ...new Set(results.map(result => result.subject))]
  const difficulties = ["all", "Easy", "Medium", "Hard"]

  const filteredResults = results.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || result.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "all" || result.difficulty === selectedDifficulty
    
    return matchesSearch && matchesSubject && matchesDifficulty
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto bg-pattern-dots">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">Test Results</h1>
          <p className="text-muted-foreground animate-fade-in">View and analyze test results.</p>
        </div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === "all" ? "All Difficulties" : difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="colorful-card">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-gradient-primary">All Results</CardTitle>
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Showing {filteredResults.length} of {results.length} results
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {filteredResults.length === 0 ? (
                <p className="text-muted-foreground">No results match your filters.</p>
              ) : (
                <div className="space-y-4">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-all colorful-border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{result.testName}</h3>
                            <Badge className={getDifficultyColor(result.difficulty)}>{result.difficulty}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Test ID: {result.testId} | Subject: {result.subject}
                          </p>
                          <p className="text-sm">
                            Student: {result.studentName} ({result.studentEmail})
                          </p>
                          <p className="font-medium">
                            Score:{" "}
                            <span className="text-gradient-primary">
                              {result.marksScored}/{result.totalMarks}
                            </span>
                          </p>
                        </div>
                        <Button
                          onClick={() => router.push(`/results/${result.id}`)}
                          className="flex items-center gap-2 bg-gradient-blue hover:opacity-90"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}