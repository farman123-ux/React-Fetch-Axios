import { useState } from 'react'
import FetchUsersDemo from './FetchUsersDemo'
import AxiosPostsDemo from './AxiosPostsDemo'
import StatesSimulatorDemo from './StatesSimulatorDemo'

export default function InteractiveExamples() {
  const [activeDemo, setActiveDemo] = useState('fetch-users')

  return (
    <section id="examples" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Interactive Live Examples
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            See real API calls in action. Each example demonstrates working React code with real endpoints from JSONPlaceholder.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveDemo('fetch-users')}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeDemo === 'fetch-users'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
           
            <span>1. Fetch API (Users)</span>
          </button>
          <button
            onClick={() => setActiveDemo('axios-posts')}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeDemo === 'axios-posts'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
           
            <span>2. Axios (Posts)</span>
          </button>
          <button
            onClick={() => setActiveDemo('states-simulator')}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeDemo === 'states-simulator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
          
            <span>3. States & Error Simulator</span>
          </button>
        </div>

        <div>
          {activeDemo === 'fetch-users' && <FetchUsersDemo />}
          {activeDemo === 'axios-posts' && <AxiosPostsDemo />}
          {activeDemo === 'states-simulator' && <StatesSimulatorDemo />}
        </div>
      </div>
    </section>
  )
}
