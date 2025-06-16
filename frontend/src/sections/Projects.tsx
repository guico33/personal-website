import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BlurFade } from '../components/magicui/blur-fade';
import { projects, projectsData } from '../data/portfolio';
import type { ProjectData } from '../types/portfolio';

export function Projects() {
  // Helper function to find project data by name
  const getProjectData = (projectName: string): ProjectData | undefined => {
    return projectsData.find((data) => data.name === projectName);
  };

  return (
    <section id="projects" className="py-12 sm:py-24 bg-orange-50/40">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Featured Projects
            </h2>
            <div className="w-16 h-px bg-sage-300 mt-4"></div>
            <p className="text-lg text-gray-700 font-light mt-6 max-w-2xl">
              Selected projects demonstrating technical capabilities across different domains.
            </p>
          </div>
        </BlurFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {projects.map((project, index) => {
            const data = getProjectData(project.name);

            return (
              <Card
                key={index}
                className="group border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30 hover:from-white/60 hover:to-blue-50/40 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header with Logo */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {data?.logo && (
                            <img
                              src={data.logo}
                              alt={`${project.name} logo`}
                              className="h-6 w-auto opacity-70"
                            />
                          )}
                          <h3 className="text-xl font-light text-gray-900">{project.name}</h3>
                        </div>
                        {data?.status && (
                          <div className="inline-flex">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                data.status === 'In Development'
                                  ? 'border-blue-200 text-blue-700 bg-blue-50'
                                  : 'border-green-200 text-green-700 bg-green-50'
                              }`}
                            >
                              {data.status}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="text-lg text-gray-700 leading-relaxed">
                      {project.description}
                    </div>

                    {/* Achievements */}
                    {project.achievements && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, aIndex) => (
                            <li
                              key={aIndex}
                              className="flex items-start gap-3 text-sm text-stone-600"
                            >
                              <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-stone-200 text-stone-700 bg-stone-50 text-xs hover:bg-stone-100 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      {project.link ? (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 group-hover:border-sage-300 group-hover:text-sage-700 cursor-pointer transition-all duration-200"
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project on GitHub →
                          </a>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="border-stone-200 text-stone-500 bg-stone-50 cursor-not-allowed transition-all duration-200"
                        >
                          Internal Project
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 font-light">
            Each project represents a unique challenge and technical solution, from clinical
            environments to financial platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
