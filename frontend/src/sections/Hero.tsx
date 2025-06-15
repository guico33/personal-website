import { Button } from '../components/ui/button';
import { BlurFade } from '../components/magicui/blur-fade';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Navigation } from '../components/Navigation';
import { useNavigationContext } from '../contexts/NavigationContext';
import { heroSkills, personalInfo } from '../data/portfolio';
import profilePicMobileWebP from '../assets/profile-pic-mobile.webp';
import profilePicMobileJpg from '../assets/profile-pic-mobile.jpg';
import profilePicTabletWebP from '../assets/profile-pic-tablet.webp';
import profilePicTabletJpg from '../assets/profile-pic-tablet.jpg';
import profilePicDesktopWebP from '../assets/profile-pic-desktop.webp';
import profilePicDesktopJpg from '../assets/profile-pic-desktop.jpg';
import awsCertificationBadge from '../assets/aws-certified-solutions-architect-associate.png';

export function Hero() {
  const { heroNavRef } = useNavigationContext();

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
            <BlurFade delay={0.05} inView>
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

              {/* AWS Certification */}
              <div className="flex items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-3 px-4 py-2 bg-white border border-stone-200 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 hover:border-stone-300 transition-all duration-200">
                      <div className="relative overflow-visible">
                        <img
                          src={awsCertificationBadge}
                          alt="AWS Certified Solutions Architect Associate badge"
                          className="w-11 h-11 object-contain"
                        />
                      </div>
                      <div className="text-sm">
                        <div className="text-stone-700 font-medium">AWS Certified</div>
                        <div className="text-stone-500">Solutions Architect Associate</div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-6 bg-white">
                    <div className="flex flex-col items-center space-y-4 pt-4">
                      <img
                        src={awsCertificationBadge}
                        alt="AWS Certified Solutions Architect Associate badge"
                        className="w-48 h-48 object-contain"
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">
                          AWS Certified Solutions Architect Associate
                        </h3>
                        <p className="text-sm text-stone-600 mb-2">
                          Validates expertise in designing distributed systems on AWS
                        </p>
                        <p className="text-xs text-stone-500 font-mono">
                          Verification: eb52b793741540938ab122769182d814
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet={`${profilePicMobileWebP} 1x`}
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 640px)"
                    srcSet={`${profilePicMobileJpg} 1x`}
                    type="image/jpeg"
                  />
                  <source
                    media="(max-width: 1024px)"
                    srcSet={`${profilePicTabletWebP} 1x`}
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 1024px)"
                    srcSet={`${profilePicTabletJpg} 1x`}
                    type="image/jpeg"
                  />
                  <source srcSet={`${profilePicDesktopWebP} 1x`} type="image/webp" />
                  <img
                    src={profilePicDesktopJpg}
                    alt={`${personalInfo.name} - Professional portrait`}
                    className="w-full h-full object-cover rounded-sm saturate-85"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="320"
                    height="384"
                  />
                </picture>
              </div>
              {/* Simple accent */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-sage-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Simple bottom navigation - responsive positioning */}
        <div
          ref={heroNavRef}
          className="lg:absolute lg:bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-8 mb-8 lg:mt-0 lg:mb-0 flex justify-center"
        >
          <Navigation />
        </div>
      </div>
    </section>
  );
}
