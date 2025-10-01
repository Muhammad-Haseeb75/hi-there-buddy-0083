import { ExternalLink, Code2, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
}

const Projects = () => {
  const [githubRepo, setGithubRepo] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/Muhammad-Haseeb75/LeetCode-solutions')
      .then(response => response.json())
      .then(data => {
        setGithubRepo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching GitHub repo:', error);
        setLoading(false);
      });
  }, []);

  const staticProjects = [
    {
      title: 'E-Commerce Website',
      description: 'A fully responsive e-commerce platform with shopping cart, product search, and checkout functionality.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      link: '#',
      github: '#',
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing daily tasks with priority levels, deadlines, and progress tracking.',
      tech: ['Flutter', 'Firebase', 'Dart'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      link: '#',
      github: '#',
    },
    {
      title: 'Algorithm Visualizer',
      description: 'Interactive visualization tool for common sorting and searching algorithms to help students learn DSA.',
      tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      link: '#',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Projects
        </h2>

        {/* GitHub Featured Project */}
        {!loading && githubRepo && (
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="bg-card border-2 border-primary/30 rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-primary/10 px-6 py-3 flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Featured GitHub Repository</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{githubRepo.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {githubRepo.description || 'A collection of LeetCode problem solutions demonstrating problem-solving skills and algorithmic thinking.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {githubRepo.topics && githubRepo.topics.length > 0 ? (
                    githubRepo.topics.map((topic: string) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        C++
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Algorithms
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Data Structures
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(githubRepo.html_url, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Repository
                  </Button>
                  {githubRepo.stargazers_count > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent rounded-md">
                      <span className="text-sm text-muted-foreground">⭐ {githubRepo.stargazers_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticProjects.map((project, index) => (
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
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
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
                  <Button size="sm" className="flex-1" onClick={() => window.open(project.link, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(project.github, '_blank')}>
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
