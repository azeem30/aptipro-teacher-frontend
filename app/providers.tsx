"use client"

import type React from "react"

import { AuthProvider } from "@/lib/auth-context"
import { TestProvider } from "@/lib/test-context"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TestProvider>
        <Navbar />
        {children}
        <Toaster />
      </TestProvider>
    </AuthProvider>
  )
}

