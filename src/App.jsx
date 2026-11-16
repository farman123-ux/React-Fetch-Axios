import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LearningSection from './components/LearningSection'
import InteractiveExamples from './components/InteractiveExamples'
import FetchVsAxios from './components/FetchVsAxios'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
     
      <Navbar />

      
      <main className="flex-1">
        <Hero />

        <LearningSection />
      </main>
      <Routes>
        <Route path='/examples' element={<InteractiveExamples />} />
        <Route path='/compare' element={<FetchVsAxios />} />
      </Routes>
      <Footer />
    </div>
  )
}
