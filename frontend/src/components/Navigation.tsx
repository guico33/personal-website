interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav className={`flex gap-8 text-base text-stone-500 ${className}`}>
      <a href="#about" className="hover:text-gray-900 transition-colors cursor-pointer">
        Experience
      </a>
      <a href="#projects" className="hover:text-gray-900 transition-colors cursor-pointer">
        Projects
      </a>
      <a href="#contact" className="hover:text-gray-900 transition-colors cursor-pointer">
        Contact
      </a>
    </nav>
  );
}