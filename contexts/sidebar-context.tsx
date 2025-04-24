"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  setIsOpen: (isOpen: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const storedState = localStorage.getItem("sidebarOpen")
    if (storedState !== null) {
      setIsOpen(storedState === "true")
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)
    // Save to localStorage
    localStorage.setItem("sidebarOpen", String(newState))
  }

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, setIsOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
