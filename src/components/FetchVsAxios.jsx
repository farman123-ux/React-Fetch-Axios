import { Link } from "react-router-dom"

export default function FetchVsAxios() {
  const comparisonData = [
    {
      feature: 'Installation',
      fetch: 'Built into modern browsers (0 bytes install)',
      axios: 'Requires external library (npm i axios)',
      winner: 'Fetch (Zero setup)',
    },
    {
      feature: 'JSON Parsing',
      fetch: 'Manual 2nd step: await res.json()',
      axios: 'Automatic: data is at res.data',
      winner: 'Axios (Cleaner)',
    },
    {
      feature: 'HTTP Error Handling (404, 500)',
      fetch: 'Does NOT throw. You must check if (!res.ok)',
      axios: 'Automatically throws error to catch()',
      winner: 'Axios (Safer)',
    },
    {
      feature: 'Syntax & Boilerplate',
      fetch: 'Requires more lines of code',
      axios: 'Compact, clean syntax',
      winner: 'Axios',
    },
    {
      feature: 'Interceptors & Defaults',
      fetch: 'Not built-in (must write custom wrapper)',
      axios: 'Built-in request/response interceptors',
      winner: 'Axios (For large apps)',
    },
    {
      feature: 'Browser Support',
      fetch: 'Supported in all modern browsers',
      axios: 'Wide cross-browser support + Node.js',
      winner: 'Tie',
    },
  ]

  return (
    <section id="compare" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Fetch API vs Axios
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Both tools can perform GET requests, but they have key differences in developer ergonomics and error handling.
          </p>
        </div>

        {/* Side-by-Side Code Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Fetch Box */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-emerald-300">1. Using Native Fetch</span>
              </div>
              <span className="text-[11px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Native JS
              </span>
            </div>
            <pre className="font-mono text-xs text-emerald-100 overflow-x-auto leading-relaxed flex-1">
              <code>{`// 1. Send request
const res = await fetch(url)

// 2. MUST manually check for errors
if (!res.ok) {
  throw new Error('HTTP error ' + res.status)
}

// 3. MUST manually parse JSON
const data = await res.json()
setData(data)`}</code>
            </pre>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Pros:</strong> No package to install.<br />
              <strong className="text-slate-200">Cons:</strong> Forgetting <code className="text-emerald-300">res.ok</code> is the #1 beginner mistake.
            </div>
          </div>

          {/* Axios Box */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="font-bold text-sm text-purple-300">2. Using Axios</span>
              </div>
              <span className="text-[11px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                npm i axios
              </span>
            </div>
            <pre className="font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed flex-1">
              <code>{`import axios from 'axios'

// 1. One clean call
// (Automatic JSON parsing + auto error throw)
const res = await axios.get(url)

// 2. Data is ready directly at res.data
setData(res.data)`}</code>
            </pre>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Pros:</strong> Automatically parses JSON & catches 4xx/5xx.<br />
              <strong className="text-slate-200">Cons:</strong> Adds ~11kB to bundle size.
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Feature</th>
                  <th className="py-3.5 px-4 sm:px-6">Fetch API</th>
                  <th className="py-3.5 px-4 sm:px-6">Axios</th>
                  <th className="py-3.5 px-4 sm:px-6">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-700">
                      {row.fetch}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-700">
                      {row.axios}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {row.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Recommendation Summary Banner */}
          <div className="p-5 sm:p-6 bg-emerald-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Which one should a beginner choose?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Start with <span className="font-semibold text-purple-700">Axios</span> for simpler syntax and automatic error handling. Once you understand the basics, practice with native <span className="font-semibold text-emerald-700">Fetch</span> so you understand vanilla JavaScript APIs.
              </p>
            </div>
             <Link
              to="/examples"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-lg shrink-0 transition"
            >
               Test Both in Demos &uarr;
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  )
}
