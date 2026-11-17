import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Learn', to: '/learn' },
    { label: 'Interactive Examples', to: '/examples' },
    { label: 'Fetch vs Axios', to: '/compare' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div>
              <span className="font-bold text-slate-900 tracking-tight block text-base leading-tight">
                React API Calls
              </span>
              <span className="text-[11px] font-medium text-emerald-600 tracking-wide uppercase">
                Learn by Doing
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/examples"
              className="ml-3 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
            >
              Try Live Demos
            </Link>
          </nav>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/examples"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center mt-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Try Live Demos
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
