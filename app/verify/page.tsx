"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { verifyAccount } = useAuth()
  const [email, setEmail] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleVerify = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required for verification",
      })
      return
    }

    setIsVerifying(true)

    try {
      const result = await verifyAccount(email)

      if (result.success) {
        toast({
          title: "Account verified",
          description: "Your account has been verified successfully. You can now login.",
        })
        router.push("/login")
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "We couldn't verify your account. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 bg-pattern-grid">
      <motion.div
        className="w-full max-w-md space-y-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-rainbow">Verify Your Account</h1>
          <p className="text-muted-foreground">
            Please verify your account to continue. In a real application, you would receive an email with a
            verification link.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md border colorful-card animate-fade-in">
          <p className="mb-4">
            Email: <span className="font-medium text-primary">{email}</span>
          </p>

          <Button onClick={handleVerify} className="w-full bg-gradient-green hover:opacity-90" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Account"}
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">
            For this demo, clicking the button will simulate email verification.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

