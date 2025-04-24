"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useSidebar } from "@/contexts/sidebar-context"

type ChatHeaderProps = {
  user: any
  onLoginClick: () => void
  onRegisterClick: () => void
  selectedMood: string | null
}

export function ChatHeader({ user, onLoginClick, onRegisterClick, selectedMood }: ChatHeaderProps) {
  const { logout } = useAuth()
  const { isOpen } = useSidebar()

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className={`flex items-center ${!isOpen ? "ml-12" : ""}`}>
        <h1 className="text-xl font-bold text-blue-600">CalmBot</h1>
        <p className="ml-2 text-sm text-gray-500">always here to listen</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Current Mood:</span>
          <Button variant="outline" size="sm" className="text-sm h-8 px-3">
            {selectedMood || "Neutral"} <ChevronDown size={14} className="ml-1" />
          </Button>
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a href="/profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onLoginClick} className="text-blue-600 hover:bg-blue-50">
              Login
            </Button>
            <Button size="sm" onClick={onRegisterClick} className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
