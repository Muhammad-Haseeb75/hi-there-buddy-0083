import { Award, Trophy } from 'lucide-react';
import laptopAward from '@/assets/laptop-award.jpg';

const Achievements = () => {
  const achievements = [
    {
      title: 'Honehar Scholarship Awardee',
      description: 'Recognized for academic excellence and awarded the prestigious Honehar Scholarship for outstanding performance in studies.',
      icon: Award,
    },
    {
      title: 'Chief Minister Laptop Scheme',
      description: 'Received a laptop under the Chief Minister Laptop Scheme for merit-based academic achievement.',
      icon: Trophy,
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Achievements & Awards
        </h2>

        {/* Achievement Cards */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            );
          })}
        </div>

        {/* Laptop Award Photo */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={laptopAward}
              alt="Muhammad Haseeb - Chief Minister Laptop Award"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
