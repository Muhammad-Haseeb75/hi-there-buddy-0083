import { Code2, Database, Palette, Smartphone, Terminal, BrainCircuit } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'HTML', icon: Code2, level: 90 },
    { name: 'CSS', icon: Palette, level: 85 },
    { name: 'JavaScript', icon: Terminal, level: 80 },
    { name: 'C++', icon: Code2, level: 85 },
    { name: 'Flutter', icon: Smartphone, level: 75 },
    { name: 'Data Structures & Algorithms', icon: BrainCircuit, level: 80 },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Skills
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-right">{skill.level}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
