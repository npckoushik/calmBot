"use client"
import Link from "next/link"
import {
  MessageSquare,
  BookOpen,
  Wind,
  Music,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

type SidebarProps = {
  isOpen: boolean
  onToggle: () => void
  user: any
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogoutClick: () => void
}

export function Sidebar({ isOpen, onToggle, user, onLoginClick, onRegisterClick, onLogoutClick }: SidebarProps) {
  const router = useRouter()

  return (
    <>
      {/* Collapsed sidebar button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="Open sidebar"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 ${!isOpen && "md:w-0 md:overflow-hidden"}`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-blue-600">CalmBot</h2>
          <div className="flex items-center gap-2">
            <button onClick={onToggle} className="text-gray-500 hover:text-gray-700" aria-label="Close sidebar">
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
        <div className="px-4 text-sm text-blue-600">Mental Health Support</div>

        <Separator className="bg-blue-100 my-4" />

        <div className="px-4 py-2 text-sm font-medium text-gray-500">Navigation</div>
        <nav className="px-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/chat-history"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <MessageSquare size={18} />
                <span>Chat History</span>
              </Link>
            </li>
          </ul>
        </nav>

        <Separator className="bg-blue-100 my-4" />

        <div className="px-4 py-2 text-sm font-medium text-gray-500">Resources</div>
        <nav className="px-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/resources"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <BookOpen size={18} />
                <span>Mental Health Articles</span>
              </Link>
            </li>
            <li>
              <Link
                href="/breathing"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <Wind size={18} />
                <span>Breathing Exercises</span>
              </Link>
            </li>
            <li>
              <Link
                href="/meditation"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <Music size={18} />
                <span>Guided Meditation</span>
              </Link>
            </li>
            <li>
              <Link
                href="/youtube-resources"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 text-gray-700 transition-colors"
              >
                <Youtube size={18} />
                <span>YouTube Resources</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 text-gray-700">
                <User size={18} />
                <span>{user.name}</span>
              </div>
              <Button
                variant="outline"
                className="w-full text-gray-700 border-gray-300 hover:bg-blue-100"
                onClick={onLogoutClick}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={onLoginClick}
              >
                Log In
              </Button>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={onRegisterClick}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
