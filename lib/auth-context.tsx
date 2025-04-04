"use client"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  email: string
  department: string
  verified: boolean
  subjects: string[]
  tests_created: number
  results_analyzed: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (userData: Omit<User, "verified"> & { password: string }) => Promise<{ success: boolean; message: string }>
  logout: () => void
  verifyAccount: (email: string) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("aptipro-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signup = async (userData: Omit<User, "verified"> & { password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          department: userData.department
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Signup failed'
        }
      }

      return {
        success: true,
        message: data.message || 'Account created successfully. Please verify your email.'
      }
    } catch (error) {
      console.error('Signup error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed'
        }
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        department: data.user.department,
        verified: data.user.verified,
        subjects: data.user.subjects || [],
        tests_created: data.user.tests_created || 0,
        results_analyzed: data.user.results_analyzed || 0
      }

      setUser(userData)
      localStorage.setItem("aptipro-user", JSON.stringify(userData))
      
      return {
        success: true,
        message: data.message || 'Login successful'
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.'
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aptipro-user")
  }

  const verifyAccount = async (email: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Verification failed'
        };
      }

      if (user?.email === email) {
        const updatedUser = { ...user, verified: true };
        setUser(updatedUser);
        localStorage.setItem("aptipro-user", JSON.stringify(updatedUser));
      }
  
      return {
        success: true,
        message: data.message || 'Account verified successfully'
      };
    } catch (error) {
      console.error('Verification error:', error);
      return {
        success: false,
        message: 'Network error during verification'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        verifyAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}