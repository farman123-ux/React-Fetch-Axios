import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LearningSection from './components/LearningSection'
import InteractiveExamples from './components/InteractiveExamples'
import FetchVsAxios from './components/FetchVsAxios'
import Footer from './components/Footer'

/**
 * React API Calls – Learn by Doing
 * Main Educational Application
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <main className="flex-1">
        <Hero />

        {/* 3. Learning Topics Section */}
        <LearningSection />

        {/* 4. Interactive Live Examples Section */}
        <InteractiveExamples />

        {/* 5. Fetch vs Axios Comparison Section */}
        <FetchVsAxios />
      </main>

      {/* 6. Footer & About Section */}
      <Footer />
    </div>
  )
}
