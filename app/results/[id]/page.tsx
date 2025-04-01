"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTest, TransformedResult } from "@/lib/test-context"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getResultById } = useTest()
  const [result, setResult] = useState<TransformedResult | null>(null)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const { user } = useAuth() 

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    if (params.id) {
      const resultData = getResultById(params.id as string)
      if (resultData) {
        setResult(resultData)
      } else {
        router.push("/results")
      }
    }
  }, [params.id, getResultById, router])

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

  if (!result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto flex items-center justify-center">
        <p>Loading result details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto bg-pattern-grid">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/results")}
            className="border-primary/30 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">Result Details</h1>
            <p className="text-muted-foreground animate-fade-in">Detailed analysis of test performance.</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="colorful-card">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Test Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <p className="text-sm text-muted-foreground">Test ID</p>
                  <p className="font-medium">{result.testId}</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20">
                  <p className="text-sm text-muted-foreground">Test Name</p>
                  <p className="font-medium">{result.testName}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/20">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="font-medium text-gradient-primary">
                    {result.marksScored}/{result.totalMarks}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-pink-50/50 dark:bg-pink-900/20">
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <Badge className={getDifficultyColor(result.difficulty)}>{result.difficulty}</Badge>
                </div>
                <div className="p-3 rounded-lg bg-violet-50/50 dark:bg-violet-900/20">
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium">{result.subject}</p>
                </div>
              </div>

              <div className="border-t my-6 pt-6">
                <h3 className="text-lg font-medium mb-4 text-gradient-primary">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-medium">{result.studentId}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-900/20">
                    <p className="text-sm text-muted-foreground">Student Name</p>
                    <p className="font-medium">{result.studentName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-50/50 dark:bg-cyan-900/20">
                    <p className="text-sm text-muted-foreground">Student Email</p>
                    <p className="font-medium">{result.studentEmail}</p>
                  </div>
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
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Question Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {result.answers.map((answer, index) => (
                  <Button
                    key={answer.id}
                    variant={activeQuestion === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveQuestion(index)}
                    className={
                      answer.selected_option === answer.correct_option
                        ? "border-green-500 hover:border-green-600"
                        : "border-red-500 hover:border-red-600"
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>

              {result.answers.length > 0 && (
                <div className="border rounded-lg p-6 animate-fade-in colorful-border">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-gradient-primary">Question {activeQuestion + 1}</h3>
                      <p className="text-muted-foreground">{result.answers[activeQuestion].question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-3 rounded-lg border ${
                          result.answers[activeQuestion].correct_option === "A"
                            ? "border-green-500 bg-green-500/10"
                            : result.answers[activeQuestion].selected_option === "A"
                              ? "border-red-500 bg-red-500/10"
                              : "border-muted"
                        }`}
                      >
                        <p className="font-medium">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-blue text-white text-xs font-bold mr-2">
                            A
                          </span>
                          {result.answers[activeQuestion].optionA}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg border ${
                          result.answers[activeQuestion].correct_option === "B"
                            ? "border-green-500 bg-green-500/10"
                            : result.answers[activeQuestion].selected_option === "B"
                              ? "border-red-500 bg-red-500/10"
                              : "border-muted"
                        }`}
                      >
                        <p className="font-medium">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-purple text-white text-xs font-bold mr-2">
                            B
                          </span>
                          {result.answers[activeQuestion].optionB}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg border ${
                          result.answers[activeQuestion].correct_option === "C"
                            ? "border-green-500 bg-green-500/10"
                            : result.answers[activeQuestion].selected_option === "C"
                              ? "border-red-500 bg-red-500/10"
                              : "border-muted"
                        }`}
                      >
                        <p className="font-medium">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-pink text-white text-xs font-bold mr-2">
                            C
                          </span>
                          {result.answers[activeQuestion].optionC}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg border ${
                          result.answers[activeQuestion].correct_option === "D"
                            ? "border-green-500 bg-green-500/10"
                            : result.answers[activeQuestion].selected_option === "D"
                              ? "border-red-500 bg-red-500/10"
                              : "border-muted"
                        }`}
                      >
                        <p className="font-medium">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-amber text-white text-xs font-bold mr-2">
                            D
                          </span>
                          {result.answers[activeQuestion].optionD}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">Selected: </p>
                        <Badge variant="outline" className="font-medium border-primary/30">
                          Option {result.answers[activeQuestion].selected_option}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">Correct: </p>
                        <Badge variant="outline" className="font-medium border-primary/30">
                          Option {result.answers[activeQuestion].correct_option}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">Result: </p>
                        {result.answers[activeQuestion].selected_option === result.answers[activeQuestion].correct_option ? (
                          <Badge className="bg-gradient-green">
                            <Check className="h-3 w-3 mr-1" /> Correct
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-danger">
                            <X className="h-3 w-3 mr-1" /> Incorrect
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}