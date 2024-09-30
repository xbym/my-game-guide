'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Search, Menu, User } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const latestGuides = [
  { id: 1, title: "Elden Ring: Malenia攻略", game: "Elden Ring", image: "/images/placeholder.jpg" },
  { id: 2, title: "塞尔达传说：神庙全攻略", game: "塞尔达传说：王国之泪", image: "/images/placeholder.jpg" },
  { id: 3, title: "赛博朋克2077：武器搭配", game: "赛博朋克2077", image: "/images/placeholder.jpg" },
  { id: 4, title: "博德之门3：法师构建", game: "博德之门3", image: "/images/placeholder.jpg" },
]

const gameCategories = [
  { id: 1, name: "角色扮演", icon: "🎭" },
  { id: 2, name: "动作冒险", icon: "🏹" },
  { id: 3, name: "射击游戏", icon: "🔫" },
  { id: 4, name: "策略", icon: "♟️" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [crawlUrl, setCrawlUrl] = useState('')
  const router = useRouter();

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/crawl-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: crawlUrl }),
      })
      const data = await response.json()
      if (data.success) {
        alert('Guide crawled and saved successfully!')
        setCrawlUrl('')
        // 跳转到新创建的攻略页面
        router.push(`/guides/${data.id}`);
      } else {
        alert('Failed to crawl guide')
      }
    } catch (error) {
      console.error('Error crawling guide:', error)
      alert('Error crawling guide')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 导航栏 */}
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
              <Button variant="outline" className="w-full mt-4 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white transition-colors">登录 / 注册</Button>
            </div>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <main className="pt-16">
        {/* 英雄区域 */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">探索游戏的无限可能</h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">发现秘密，掌握技巧，成为游戏大师</p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="搜索游戏攻略..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 rounded-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400"
                />
                <Button size="icon" className="absolute right-1 top-1 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">搜索</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 最新攻略 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-purple-400">最新攻略</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestGuides.map((guide) => (
                <div key={guide.id} className="group">
                  <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      width={500}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">{guide.title}</h3>
                  <p className="text-sm text-gray-400">{guide.game}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 游戏分类 */}
        <section className="bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-purple-400">游戏分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gameCategories.map((category) => (
                <div key={category.id} className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition-colors duration-300">
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="font-medium text-purple-300">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 注册提示 */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">加入我们的游戏社区</h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">创建账户以保存您喜爱的攻略，参与讨论，并获得个性化推荐。</p>
            <Button className="rounded-full px-8 bg-white text-purple-600 hover:bg-gray-200 transition-colors">开始探索</Button>
          </div>
        </section>

        {/* 爬取新攻略 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-purple-400">爬取新攻略</h2>
            <form onSubmit={handleCrawl} className="max-w-md mx-auto">
              <Input
                type="url"
                placeholder="输入攻略URL"
                value={crawlUrl}
                onChange={(e) => setCrawlUrl(e.target.value)}
                className="mb-4"
                required
              />
              <Button type="submit" className="w-full">爬取攻略</Button>
            </form>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-4">&copy; 2023 GameGuides. 保留所有权利。</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">使用条款</Link>
            <Link href="/contact" className="hover:text-purple-400 transition-colors">联系我们</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}