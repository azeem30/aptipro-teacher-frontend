"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useTest } from "@/lib/test-context"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  question: z.string().min(2, "Question must be at least 2 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctOption: z.enum(["A", "B", "C", "D"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  subject: z.string().min(1, "Subject is required"),
})

export default function QuestionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addQuestion, getSubjects } = useTest()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "A",
      difficulty: "Medium",
      subject: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const result = await addQuestion(values)

      if (result.success) {
        toast({
          title: "Question added",
          description: result.message,
        })
        form.reset()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 container mx-auto bg-pattern-grid">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">Add Question</h1>
          <p className="text-muted-foreground animate-fade-in">Create a new question for your question bank.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="colorful-card">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-slate-800 rounded-t-lg">
              <CardTitle className="text-gradient-primary">Question Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question ID</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter question ID"
                            {...field}
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your question"
                            {...field}
                            className="min-h-[100px] border-primary/30 focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="optionA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-blue text-white text-xs font-bold">
                              A
                            </span>
                            Option A
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter option A"
                              {...field}
                              className="border-blue-300 focus-visible:ring-blue-500 dark:border-blue-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionB"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-purple text-white text-xs font-bold">
                              B
                            </span>
                            Option B
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter option B"
                              {...field}
                              className="border-purple-300 focus-visible:ring-purple-500 dark:border-purple-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-pink text-white text-xs font-bold">
                              C
                            </span>
                            Option C
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter option C"
                              {...field}
                              className="border-pink-300 focus-visible:ring-pink-500 dark:border-pink-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionD"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-amber text-white text-xs font-bold">
                              D
                            </span>
                            Option D
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter option D"
                              {...field}
                              className="border-amber-300 focus-visible:ring-amber-500 dark:border-amber-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="correctOption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correct Option</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-primary/30 focus-visible:ring-primary">
                                <SelectValue placeholder="Select correct option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A" className="text-blue-500 font-medium">
                                Option A
                              </SelectItem>
                              <SelectItem value="B" className="text-purple-500 font-medium">
                                Option B
                              </SelectItem>
                              <SelectItem value="C" className="text-pink-500 font-medium">
                                Option C
                              </SelectItem>
                              <SelectItem value="D" className="text-amber-500 font-medium">
                                Option D
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-primary/30 focus-visible:ring-primary">
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Easy" className="text-green-500 font-medium">
                                Easy
                              </SelectItem>
                              <SelectItem value="Medium" className="text-yellow-500 font-medium">
                                Medium
                              </SelectItem>
                              <SelectItem value="Hard" className="text-red-500 font-medium">
                                Hard
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-primary/30 focus-visible:ring-primary">
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSubjects().map((subject) => (
                                <SelectItem key={subject} value={subject} className="font-medium">
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-purple hover:opacity-90" disabled={isSubmitting}>
                    {isSubmitting ? "Adding question..." : "Add Question"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

