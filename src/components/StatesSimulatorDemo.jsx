import { useState } from 'react'
import axios from 'axios'

export default function StatesSimulatorDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentScenario, setCurrentScenario] = useState('idle')

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

  const handleSlowLoading = async () => {
    setCurrentScenario('slow-load')
    setLoading(true)
    setError(null)
    setData(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/2')
      setData(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleError = async () => {
    setCurrentScenario('error')
    setLoading(true)
    setError(null)
    setData(null)

    try {
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
      <div className="pb-6 border-b border-slate-200 mb-6">
       
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Loading & Error States Simulator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Click the test buttons below to trigger each scenario and observe how state variables change in real-time.
        </p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
