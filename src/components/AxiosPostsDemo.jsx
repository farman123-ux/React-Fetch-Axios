import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AxiosPostsDemo() {
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

      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-800">Key code in this demo:</span>
        <code className="text-purple-600 font-mono">import axios from 'axios'</code>
        <span>&rarr;</span>
        <code className="text-purple-600 font-mono">const res = await axios.get(...)</code>
        <span>&rarr;</span>
        <code className="text-purple-600 font-mono">setPosts(res.data)</code>
      </div>

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

