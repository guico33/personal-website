interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav className={`flex gap-8 text-base text-stone-500 ${className}`} role="navigation" aria-label="Main navigation">
      <a href="#about" className="hover:text-gray-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400 focus:rounded-sm">
        Experience
      </a>
      <a href="#projects" className="hover:text-gray-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400 focus:rounded-sm">
        Projects
      </a>
      <a href="#contact" className="hover:text-gray-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400 focus:rounded-sm">
        Contact
      </a>
    </nav>
  );
}