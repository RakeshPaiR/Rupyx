import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types/auth.types'

const Dashboard: FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        })

        if (!response.ok) {
          navigate('/auth')
          return
        }

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Auth check error:', error)
        navigate('/auth')
      }
    }

    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      navigate('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
