import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BlurFade } from '../components/magicui/blur-fade';
import { experience, education, languages } from '../data/portfolio';

export function About() {
  // Enhanced bio with slight adjustments for portfolio context
  const portfolioBio =
    'Fullstack software engineer with 6 years of experience building impactful digital solutions. I specialize in creating scalable frontend architectures and high-performance web applications, focused on building reliable, scalable solutions.';

  return (
    <section id="about" className="py-12 sm:py-24 bg-amber-50/60">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Professional Experience
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-sage-400 to-sage-300 mt-4"></div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column - Overview */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            {/* Bio */}
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">Overview</h3>
              <div className="text-lg text-gray-700 leading-relaxed font-light">{portfolioBio}</div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">Education</h3>
              <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">{education.degree}</h4>
                    <div className="text-stone-600 text-sm">{education.institution}</div>
                    <div className="text-sm text-stone-500">{education.period}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">Languages</h3>
              <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {languages.map((language, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{language.name}</span>
                        <span className="text-sm text-stone-600">{language.level}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-light text-gray-900 mb-6">Experience</h3>

            <div className="relative">
              <div className="space-y-8 lg:space-y-12">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Content */}
                    <div>
                      <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30 hover:from-white/60 hover:to-blue-50/40 transition-all duration-300">
                        <CardContent className="p-4 lg:p-6">
                          <div className="space-y-4 lg:space-y-6">
                            {/* Header */}
                            <div>
                              <h4 className="text-xl font-medium text-gray-900">{exp.role}</h4>
                              <div className="text-lg text-stone-600 mt-1">{exp.company}</div>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500 mt-2">
                                <span>{exp.period}</span>
                                <span>•</span>
                                <span>{exp.location}</span>
                              </div>
                            </div>

                            {/* Company Description */}
                            <div className="text-stone-700 leading-relaxed">{exp.description}</div>

                            {/* Projects */}
                            {exp.projects && (
                              <div className="space-y-4 lg:space-y-6">
                                {exp.projects.map((project, pIndex) => (
                                  <div
                                    key={pIndex}
                                    className="bg-gradient-to-r from-stone-50/80 to-sage-50/40 rounded-lg p-3 lg:p-5 border-l-4 border-sage-300"
                                  >
                                    <div className="space-y-2 lg:space-y-3">
                                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <h5 className="font-medium text-gray-900">
                                          {project.name}
                                        </h5>
                                        <div className="text-xs text-stone-500 bg-white/80 px-2 py-1 rounded">
                                          {project.period}
                                        </div>
                                      </div>

                                      <div className="text-sm text-stone-700">
                                        {project.description}
                                      </div>

                                      {project.achievements && (
                                        <div className="space-y-1 lg:space-y-2">
                                          {project.achievements.map((achievement, aIndex) => (
                                            <div
                                              key={aIndex}
                                              className="flex items-start gap-3 text-sm text-stone-600"
                                            >
                                              <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                                              <span className="leading-relaxed">{achievement}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Tech stack for this project (subtle integration) */}
                                      <div className="flex flex-wrap gap-1 lg:gap-2 pt-1 lg:pt-2">
                                        {pIndex === 0 && ( // SGInnovate project
                                          <>
                                            <Badge
                                              variant="outline"
                                              className="border-accent/30 text-accent-foreground bg-accent/20 text-xs"
                                            >
                                              TypeScript
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-accent/30 text-accent-foreground bg-accent/20 text-xs"
                                            >
                                              React
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-accent/30 text-accent-foreground bg-accent/20 text-xs"
                                            >
                                              Next.js
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-accent/30 text-accent-foreground bg-accent/20 text-xs"
                                            >
                                              NestJS
                                            </Badge>
                                          </>
                                        )}
                                        {pIndex === 1 && ( // Renew UltraLinQ project
                                          <>
                                            <Badge
                                              variant="outline"
                                              className="border-primary/30 text-primary-foreground bg-primary/10 text-xs"
                                            >
                                              TypeScript
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-primary/30 text-primary-foreground bg-primary/10 text-xs"
                                            >
                                              React
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-primary/30 text-primary-foreground bg-primary/10 text-xs"
                                            >
                                              WebSockets
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="border-primary/30 text-primary-foreground bg-primary/10 text-xs"
                                            >
                                              SVG
                                            </Badge>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* StashAway achievements with tech integration */}
                            {exp.achievements && (
                              <div className="space-y-3 lg:space-y-4">
                                <div className="space-y-2 lg:space-y-3">
                                  {exp.achievements.map((achievement, aIndex) => (
                                    <div
                                      key={aIndex}
                                      className="flex items-start gap-3 text-sm text-stone-600"
                                    >
                                      <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="leading-relaxed">{achievement}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Tech stack for StashAway */}
                                <div className="flex flex-wrap gap-1 lg:gap-2 pt-1 lg:pt-2">
                                  <Badge
                                    variant="outline"
                                    className="border-secondary/40 text-secondary-foreground bg-secondary/30 text-xs"
                                  >
                                    React
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-secondary/40 text-secondary-foreground bg-secondary/30 text-xs"
                                  >
                                    Node.js
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-secondary/40 text-secondary-foreground bg-secondary/30 text-xs"
                                  >
                                    Express
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-secondary/40 text-secondary-foreground bg-secondary/30 text-xs"
                                  >
                                    GraphQL
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-secondary/40 text-secondary-foreground bg-secondary/30 text-xs"
                                  >
                                    MongoDB
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
