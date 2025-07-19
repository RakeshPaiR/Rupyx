import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar: FC = () => {
  const location = useLocation()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Rupyx
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className={`hover:text-gray-300 ${
              location.pathname === '/' ? 'text-blue-400' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/auth"
            className={`hover:text-gray-300 ${
              location.pathname === '/auth' ? 'text-blue-400' : ''
            }`}
          >
            Login/Register
          </Link>
          <Link
            to="/dashboard"
            className={`hover:text-gray-300 ${
              location.pathname === '/dashboard' ? 'text-blue-400' : ''
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
