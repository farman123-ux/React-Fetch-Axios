import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="about" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3 inline-flex">
              
              <span className="font-bold text-white text-base">
                React API Calls
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              An educational, beginner-friendly learning platform designed to teach the fundamentals of API integration, state management, and error handling in React.js.
            </p>
          </div>

          {/* Quick Learning Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  • Home & Curriculum
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-emerald-400 transition">
                  • Learn Fundamentals
                </Link>
              </li>
              <li>
                <Link to="/examples" className="hover:text-emerald-400 transition">
                  • Interactive Live Examples
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-emerald-400 transition">
                  • Fetch API vs Axios
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              About This Project
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p>
                Built using <span className="text-slate-200 font-medium">React 19</span>, <span className="text-slate-200 font-medium">Vite</span>, and <span className="text-slate-200 font-medium">Tailwind CSS</span>.
              </p>
              <p>
                Mock endpoints powered by <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">JSONPlaceholder</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {currentYear} React API Calls – Learn by Doing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
