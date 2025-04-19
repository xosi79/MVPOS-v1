// components/layout.js
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">MVPOS</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/auth" className="hover:underline">Login</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
      </nav>

      <main className="p-8">
        {children}
      </main>
    </div>
  )
}
