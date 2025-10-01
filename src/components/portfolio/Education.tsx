import { GraduationCap } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      level: 'University',
      institution: 'Government College University Faisalabad',
      degree: 'Bachelor of Software Engineering',
      status: 'Current',
    },
    {
      level: 'Intermediate',
      institution: 'Riphah International College Khanewal',
      degree: 'Pre-Engineering',
      status: 'Completed',
    },
    {
      level: 'Matriculation',
      institution: 'Govt. High School Khanewal',
      degree: 'Science',
      status: 'Completed',
    },
    {
      level: 'Early Education',
      institution: 'Village School',
      degree: 'Primary & Middle',
      status: 'Completed',
    },
  ];

  return (
    <section id="education" className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Education
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{edu.level}</h3>
              <p className="text-muted-foreground mb-1 font-medium">{edu.institution}</p>
              <p className="text-sm text-muted-foreground mb-2">{edu.degree}</p>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {edu.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
