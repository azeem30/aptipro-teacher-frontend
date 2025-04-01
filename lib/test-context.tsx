"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context" 

type Test = {
  id: string
  name: string
  marks: number
  totalQuestions: number
  duration: number
  difficulty: "Easy" | "Medium" | "Hard"
  subject: string
  scheduleDate: string
  createdBy: string
}

interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct_option: string;
  selected_option: string | null;
  subject: string;
  difficulty: string;
}

export interface TransformedResult {
  id: number;
  testId: number;
  testName: string;
  marksScored: number;
  totalMarks: number;
  difficulty: string;
  subject: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  answers: Question[];
  teacherEmail: string;
  department: string;
}

type TestContextType = {
  questions: Question[]
  tests: Test[]
  results: TransformedResult[]
  addQuestion: (question: Omit<Question, "id">) => Promise<{ success: boolean; message: string }>
  addTest: (test: Omit<Test, "id" | "createdBy">) => Promise<{ success: boolean; message: string }>
  getSubjects: () => string[]
  getTestById: (id: string) => Test | undefined
  getResultById: (id: string) => TransformedResult | undefined
  fetchResults: () => Promise<void>
}

const TestContext = createContext<TestContextType | undefined>(undefined)

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [tests, setTests] = useState<Test[]>([])
  const [results, setResults] = useState<TransformedResult[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const storedQuestions = localStorage.getItem("aptipro-questions")
    const storedTests = localStorage.getItem("aptipro-tests")
    const storedResults = localStorage.getItem("aptipro-results")
    if (storedQuestions) setQuestions(JSON.parse(storedQuestions))
    if (storedTests) setTests(JSON.parse(storedTests))
    if (storedResults) setResults(JSON.parse(storedResults))
  }, [])

  const fetchResults = async () => {
    try {
      if (!user?.email) return;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results?email=${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        const transformedResults = data.results.map((result: any) => {
          const answers = JSON.parse(result.data) as Question[];
          return {
            id: result.id,
            testId: result.test_id,
            testName: result.name,
            marksScored: result.marks,
            totalMarks: result.total_marks,
            difficulty: result.difficulty,
            subject: result.subject,
            studentId: result["students.id"],
            studentName: result["students.name"],
            studentEmail: result.student_email,
            teacherEmail: result.teacher_email,
            department: result.dept_name,
            answers
          };
        });
        setResults(transformedResults);
        localStorage.setItem("aptipro-results", JSON.stringify(transformedResults));
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const addQuestion = async (questionData: Omit<Question, "id">) => {
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...questionData
        })
      })
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        return { success: false, message: errorData.message || 'Failed to add question' }
      }
  
      const newQuestion = await response.json()
      setQuestions(prev => [...prev, newQuestion])
      return { success: true, message: "Question added successfully" }
    } catch (error) {
      console.error('Error adding question:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred while adding the question' 
      }
    }
  }

  const addTest = async (testData: Omit<Test, "id" | "createdBy">) => {
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testData,
          createdBy: user.email || "unknown",
          dept_name: user.department
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        return { success: false, message: errorData.message || 'Failed to create test' }
      }
      return { success: true, message: "Test created successfully" }
    } catch (error) {
      console.error('Error creating test:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred while creating the test' 
      }
    }
  }

  const getSubjects = () => {
    return user?.subjects || []
  }

  const getTestById = (id: string) => {
    return tests.find((test) => test.id === id)
  }

  const getResultById = (id: string) => {
    return results.find((result) => result.id.toString() === id)
  }

  return (
    <TestContext.Provider
      value={{
        questions,
        tests,
        results,
        addQuestion,
        addTest,
        getSubjects,
        getTestById,
        getResultById,
        fetchResults,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

export function useTest() {
  const context = useContext(TestContext)
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider")
  }
  return context
}