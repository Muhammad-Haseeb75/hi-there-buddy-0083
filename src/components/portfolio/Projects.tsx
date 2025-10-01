import { ExternalLink, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Website',
      description: 'A fully responsive e-commerce platform with shopping cart, product search, and checkout functionality.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing daily tasks with priority levels, deadlines, and progress tracking.',
      tech: ['Flutter', 'Firebase', 'Dart'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    },
    {
      title: 'Algorithm Visualizer',
      description: 'Interactive visualization tool for common sorting and searching algorithms to help students learn DSA.',
      tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing projects, skills, and achievements with modern design and animations.',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
