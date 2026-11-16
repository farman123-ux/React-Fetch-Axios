export default function Hero() {
  return (
    <section id="home" className="pt-12 pb-16 sm:pt-16 sm:pb-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
          React API Calls <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Learn by Doing
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
          Master how to fetch real-world data in React using the native <span className="font-semibold text-slate-800">Fetch API</span> and <span className="font-semibold text-slate-800">Axios</span>. Learn loading states, error handling, and component rendering with clear explanations and live demos.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#learn"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Start Learning &darr;
          </a>
          <a
            href="#examples"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold shadow-xs hover:bg-slate-50 hover:text-slate-900 transition"
          >
            Try Live Examples &rarr;
          </a>
        </div>

        {/* Quick Highlights Pill Row */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold uppercase text-indigo-600">Step 1</div>
            <div className="font-semibold text-slate-900 text-sm mt-0.5">useEffect Hook</div>
            <div className="text-xs text-slate-500 mt-0.5">Runs fetch on mount</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold uppercase text-indigo-600">Step 2</div>
            <div className="font-semibold text-slate-900 text-sm mt-0.5">Fetch or Axios</div>
            <div className="text-xs text-slate-500 mt-0.5">Sends HTTP GET request</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold uppercase text-indigo-600">Step 3</div>
            <div className="font-semibold text-slate-900 text-sm mt-0.5">useState States</div>
            <div className="text-xs text-slate-500 mt-0.5">Data, loading & error</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold uppercase text-indigo-600">Step 4</div>
            <div className="font-semibold text-slate-900 text-sm mt-0.5">Render UI</div>
            <div className="text-xs text-slate-500 mt-0.5">Maps data with keys</div>
          </div>
        </div>
      </div>
    </section>
  )
}
