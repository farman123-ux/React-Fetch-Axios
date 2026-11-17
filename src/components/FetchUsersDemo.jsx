import { useEffect, useState } from 'react'

export default function FetchUsersDemo() {
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

      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-800">Key code in this demo:</span>
        <code className="text-emerald-600 font-mono">const res = await fetch(...)</code>
        <span>&rarr;</span>
        <code className="text-emerald-600 font-mono">if (!res.ok) throw ...</code>
        <span>&rarr;</span>
        <code className="text-emerald-600 font-mono">const data = await res.json()</code>
      </div>

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

