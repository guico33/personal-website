import { Button } from '../components/ui/button';
import { BlurFade } from '../components/magicui/blur-fade';
import { heroSkills, personalInfo } from '../data/portfolio';
import profilePic from '../assets/profile-pic.jpg';

export function Hero() {
  return (
    <section className="min-h-screen lg:pt-8 pt-16 bg-gradient-to-br from-white to-amber-50 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 lg:mb-0">
          {/* Content */}
          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-center gap-3 text-sage-400 text-sm tracking-wider">
              <div className="w-8 h-px bg-sage-300"></div>
              <span>{personalInfo.location}</span>
            </div>

            {/* Name */}
            <BlurFade delay={0.25} inView>
              <div>
                <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                  {personalInfo.name}
                </h1>
                <div className="w-16 h-px bg-sage-300 mt-4"></div>
              </div>
            </BlurFade>

            {/* Title & Experience */}
            <div>
              <h2 className="text-2xl font-light text-stone-600 mb-2">{personalInfo.title}</h2>
              <div className="text-sage-400 font-light">6 years building digital experiences</div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div className="text-lg text-gray-700 leading-relaxed font-light max-w-lg">
                Specializing in scalable frontend architectures and high-performance applications
                that deliver measurable business impact.
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-3">
                {heroSkills.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm border border-stone-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="bg-gray-900 hover:bg-gray-700 text-white cursor-pointer transition-all duration-200"
              >
                <a href="#projects">View Work</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 cursor-pointer transition-all duration-200"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 cursor-pointer transition-all duration-200"
              >
                <a
                  href="/resume_Guillaume_Cauchet_SWE.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Guillaume_Cauchet_Resume.pdf"
                >
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-8 text-sm">
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-gray-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-stone-500 hover:text-gray-900 transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-stone-100 rounded-sm">
                <img
                  src={profilePic}
                  alt={`${personalInfo.name} - Professional portrait`}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              {/* Simple accent */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-sage-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Simple bottom navigation - responsive positioning */}
        <div className="lg:absolute lg:bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-8 mb-8 lg:mt-0 lg:mb-0 flex justify-center">
          <nav className="flex gap-8 text-base text-stone-500">
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
        </div>
      </div>
    </section>
  );
}
