import sports1 from '@/assets/sports1.jpg';
import sports2 from '@/assets/sports2.jpg';
import { Trophy, Award } from 'lucide-react';

const Sports = () => {
  const achievements = [
    {
      sport: 'Cricket',
      role: 'Leg Spinner',
      description: 'Passionate cricket player specializing in leg spin bowling. Love the strategic aspects of the game.',
      icon: Trophy,
    },
    {
      sport: 'Volleyball',
      role: 'College Team Captain',
      description: 'Led the college volleyball team as captain, demonstrating leadership and teamwork skills.',
      icon: Award,
    },
    {
      sport: 'Badminton',
      role: 'College Team Player',
      description: 'Active member of the college badminton team, competing in inter-college tournaments.',
      icon: Trophy,
    },
  ];

  return (
    <section id="sports" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Sports Activities
        </h2>

        {/* Sports Photos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={sports1}
              alt="Muhammad Haseeb - Sports"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={sports2}
              alt="Muhammad Haseeb - Sports"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Sports Activities */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-bold mb-2 text-foreground">{achievement.sport}</h3>
                <p className="text-primary font-medium mb-2">{achievement.role}</p>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            );
          })}
        </div>

        {/* Current Studies */}
        <div className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Current Studies</h3>
          <p className="text-lg text-muted-foreground">
            Currently learning Data Structures and Algorithms, exploring machine-related computing 
            and advanced algorithms. Continuously expanding my knowledge in software engineering 
            principles and modern development practices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sports;
