import { useState, useEffect } from 'react'
import axios from 'axios'

export default function InteractiveExamples() {
  const [activeDemo, setActiveDemo] = useState('fetch-users')

  return (
    <section id="examples" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Interactive Live Examples
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            See real API calls in action. Each example demonstrates working React code with real endpoints from JSONPlaceholder.
          </p>
        </div>

        {/* Demo Selector Tabs */}
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

        {/* Active Demo Container */}
        <div>
          {activeDemo === 'fetch-users' && <FetchUsersDemo />}
          {activeDemo === 'axios-posts' && <AxiosPostsDemo />}
          {activeDemo === 'states-simulator' && <StatesSimulatorDemo />}
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   DEMO 1: Fetch API – Users from JSONPlaceholder
   ========================================================================= */
function FetchUsersDemo() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res) {
        throw new Error(`HTTP Error! status: ${res.status}`)
      }
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    async function initialFetch() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error(`HTTP Error! status: ${res.status}`)
        }
        const data = await res.json()
        if (!ignore) {
          setUsers(data)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Failed to fetch users')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    initialFetch()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
        <div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Fetch API Demo: User Directory
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">
            GET https://jsonplaceholder.typicode.com/users
          </p>
        </div>
        <button
          onClick={refetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Fetching...' : 'Re-fetch Users'}
        </button>
      </div>

      {/* Code Breakdown Pill */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-800">Key code in this demo:</span>
        <code className="text-emerald-600 font-mono">const res = await fetch(...)</code>
        <span>&rarr;</span>
        <code className="text-emerald-600 font-mono">if (!res.ok) throw ...</code>
        <span>&rarr;</span>
        <code className="text-emerald-600 font-mono">const data = await res.json()</code>
      </div>

      {/* States Render */}
      {loading && (
        <div className="py-16 text-center">
          <div className="w-9 h-9 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-600">Executing fetch() request...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-center">
          <p className="font-semibold text-sm">Failed to load data: {error}</p>
          <button
            onClick={refetchUsers}
            className="mt-2 text-xs font-semibold text-rose-800 underline hover:text-rose-900"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm truncate">{user.name}</h4>
                  <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                </div>
              </div>
              <div className="text-xs text-slate-600 space-y-1 border-t border-slate-100 pt-2.5">
                <p className="truncate"><span className="text-slate-400">Email:</span> {user.email}</p>
                <p className="truncate"><span className="text-slate-400">Phone:</span> {user.phone}</p>
                <p className="truncate"><span className="text-slate-400">Company:</span> {user.company?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   DEMO 2: Axios – Posts from JSONPlaceholder
   ========================================================================= */
function AxiosPostsDemo() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6')
      setPosts(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    async function initialFetch() {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6')
        if (!ignore) {
          setPosts(res.data)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Failed to fetch posts')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    initialFetch()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
        <div>
         
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Axios Demo: Blog Posts
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">
            GET https://jsonplaceholder.typicode.com/posts?_limit=6
          </p>
        </div>
        <button
          onClick={refetchPosts}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-sm font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Fetching...' : 'Re-fetch Posts'}
        </button>
      </div>

      {/* Code Breakdown Pill */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-800">Key code in this demo:</span>
        <code className="text-purple-600 font-mono">import axios from 'axios'</code>
        <span>&rarr;</span>
        <code className="text-purple-600 font-mono">const res = await axios.get(...)</code>
        <span>&rarr;</span>
        <code className="text-purple-600 font-mono">setPosts(res.data)</code>
      </div>

      {/* States Render */}
      {loading && (
        <div className="py-16 text-center">
          <div className="w-9 h-9 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-600">Executing axios.get() request...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-center">
          <p className="font-semibold text-sm">Failed to load posts: {error}</p>
          <button
            onClick={refetchPosts}
            className="mt-2 text-xs font-semibold text-rose-800 underline hover:text-rose-900"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-purple-300 transition flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 mb-2">
                  Post #{post.id}
                </span>
                <h4 className="font-bold text-slate-900 text-sm capitalize mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.body}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>JSONPlaceholder API</span>
                <span className="text-purple-600 font-medium">Read More &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   DEMO 3: Loading & Error States Simulator
   ========================================================================= */
function StatesSimulatorDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentScenario, setCurrentScenario] = useState('idle')

  // Scenario 1: Successful Fetch
  const handleSuccess = async () => {
    setCurrentScenario('success')
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      setData(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Scenario 2: Simulated Slow Loading (2-second delay)
  const handleSlowLoading = async () => {
    setCurrentScenario('slow-load')
    setLoading(true)
    setError(null)
    setData(null)

    try {
      // Artificially wait 2.5 seconds to clearly observe the loading state
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/2')
      setData(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Scenario 3: Trigger Real 404 Error
  const handleError = async () => {
    setCurrentScenario('error')
    setLoading(true)
    setError(null)
    setData(null)

    try {
      // Requesting an endpoint that doesn't exist triggers an error
      await axios.get('https://jsonplaceholder.typicode.com/invalid-nonexistent-url-404')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed with status code 404')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentScenario('idle')
    setLoading(false)
    setError(null)
    setData(null)
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Demo Header */}
      <div className="pb-6 border-b border-slate-200 mb-6">
       
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Loading & Error States Simulator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Click the test buttons below to trigger each scenario and observe how state variables change in real-time.
        </p>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        <button
          onClick={handleSuccess}
          disabled={loading}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span>Trigger Success</span>
          <span className="text-[11px] font-normal text-emerald-100">Loads normal data</span>
        </button>

        <button
          onClick={handleSlowLoading}
          disabled={loading}
          className="p-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span>Simulate Slow Load</span>
          <span className="text-[11px] font-normal text-amber-100">Adds 2.5s delay</span>
        </button>

        <button
          onClick={handleError}
          disabled={loading}
          className="p-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span>Trigger 404 Error</span>
          <span className="text-[11px] font-normal text-rose-100">Calls broken URL</span>
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="p-3 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span>Reset Simulator</span>
          <span className="text-[11px] font-normal text-slate-500">Clear all states</span>
        </button>
      </div>

      {/* State Inspector & Live UI Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live State Inspector (Debugger) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl p-4 text-white font-mono text-xs border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              Live React State Inspector
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-900/60 text-emerald-300">
              Scenario: {currentScenario}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">loading:</span>
              <span className={loading ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                {String(loading)}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">error:</span>
              <span className={error ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {error ? `"${error}"` : 'null'}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">data:</span>
              <span className={data ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                {data ? 'Object loaded' : 'null'}
              </span>
            </div>
          </div>

          {data && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="text-slate-400 text-[10px] block mb-1">Payload Content:</span>
              <pre className="text-emerald-200 text-[11px] bg-slate-950 p-2 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Rendered User Interface (What the User Sees) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-center min-h-[220px]">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Rendered Component Output:
          </div>

          {currentScenario === 'idle' && (
            <div className="text-center py-6 text-slate-400 text-sm">
              <p>Click any button above to test a state.</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-slate-800">1. Loading State Active</p>
              <p className="text-xs text-slate-500">Showing spinner while waiting for server response...</p>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <span>2. Error State Active</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
              <button
                onClick={handleSuccess}
                className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry with Valid Request
              </button>
            </div>
          )}

          {data && !loading && !error && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="flex items-center gap-2 font-bold text-sm mb-2 text-emerald-800">
                <span> Success State Active</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs space-y-1">
                <p><span className="font-semibold text-slate-700">Todo Item ID:</span> {data.id}</p>
                <p><span className="font-semibold text-slate-700">Title:</span> {data.title}</p>
                <p>
                  <span className="font-semibold text-slate-700">Status: </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {data.completed ? 'Completed' : 'Pending'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
