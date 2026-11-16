import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LearningSection from './components/LearningSection'
import InteractiveExamples from './components/InteractiveExamples'
import FetchVsAxios from './components/FetchVsAxios'
import Footer from './components/Footer'



function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <LearningSection />
              </>
            }
          />
          <Route path="/learn" element={<LearningSection />} />
          <Route path="/examples" element={<InteractiveExamples />} />
          <Route path="/compare" element={<FetchVsAxios />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
