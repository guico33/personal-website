import { personalInfo } from '../data/portfolio'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 bg-orange-50">
      <div className="w-full max-w-6xl mx-auto px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">Guillaume Cauchet</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Fullstack Software Engineer specializing in scalable solutions and impactful digital experiences.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Navigation</h4>
            <div className="space-y-2">
              <a 
                href="#about" 
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                Contact
              </a>
              <a 
                href="/resume_Guillaume_Cauchet_SWE.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Guillaume_Cauchet_Resume.pdf"
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Connect</h4>
            <div className="space-y-2">
              <a 
                href={`https://${personalInfo.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                GitHub
              </a>
              <a 
                href={`https://${personalInfo.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                Email
              </a>
              <a 
                href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-stone-600 hover:text-sage-600 transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-stone-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-stone-500 text-sm">
              © {currentYear} Guillaume Cauchet. All rights reserved.
            </div>

            {/* Location & Availability */}
            <div className="flex items-center gap-4 text-stone-500 text-sm">
              <span>Based in France</span>
              <span>•</span>
              <span>Available for opportunities</span>
            </div>
          </div>
        </div>

        {/* Subtle Branding */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="text-center">
            <p className="text-xs text-stone-400 font-light">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}