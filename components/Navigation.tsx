import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, User } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="bg-gray-800 bg-opacity-90 backdrop-blur-md fixed w-full z-10 top-0 left-0">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-purple-400">GameGuides</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/guides" className="hover:text-purple-400 transition-colors">攻略</Link>
            <Link href="/games" className="hover:text-purple-400 transition-colors">游戏</Link>
            <Link href="/about" className="hover:text-purple-400 transition-colors">关于我们</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-white hover:text-purple-400 transition-colors">
              <User className="h-5 w-5" />
              <span className="sr-only">用户</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">菜单</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-gray-900 bg-opacity-95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="mt-8 space-y-4">
              <Link href="/guides" className="block text-lg hover:text-purple-400 transition-colors">攻略</Link>
              <Link href="/games" className="block text-lg hover:text-purple-400 transition-colors">游戏</Link>
              <Link href="/about" className="block text-lg hover:text-purple-400 transition-colors">关于我们</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}