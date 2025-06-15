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
        <ScrollProgress />
        <StickyNavigation />
        <main>
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
