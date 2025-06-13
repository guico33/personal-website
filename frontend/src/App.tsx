import { Hero } from './sections/Hero'
import { About } from './sections/About'

function App() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <About />
        {/* More sections will be added here */}
      </main>
    </div>
  )
}

export default App
