const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="about" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                ⚛
              </span>
              <span className="font-bold text-white text-base">
                React API Calls
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An educational, beginner-friendly learning platform designed to teach the fundamentals of API integration, state management, and error handling in React.js.
            </p>
          </div>

          {/* Quick Learning Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Core Topics
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#learn" className="hover:text-indigo-400 transition">
                  • What are API Calls in React?
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-indigo-400 transition">
                  • Fetch API vs Axios
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-indigo-400 transition">
                  • Loading States with useState
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-indigo-400 transition">
                  • Error Handling with try...catch
                </a>
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
                Mock endpoints powered by <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">JSONPlaceholder</a>.
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                  100% Beginner-Friendly Code
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {currentYear} React API Calls – Learn by Doing. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#home" className="hover:text-slate-300 transition">Back to Top &uarr;</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
