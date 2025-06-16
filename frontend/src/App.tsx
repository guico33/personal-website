import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { ScrollProgress } from './components/magicui/scroll-progress';
import { StickyNavigation } from './components/StickyNavigation';
import { NavigationProvider } from './contexts/NavigationContext';

function App() {
  return (
    <NavigationProvider>
      <div>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <StickyNavigation />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;
