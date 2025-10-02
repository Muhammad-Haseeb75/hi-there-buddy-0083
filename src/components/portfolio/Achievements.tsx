import { Award, Trophy } from 'lucide-react';
import laptopAward from '@/assets/laptop-award.jpg';

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Achievements & Awards
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Achievements List */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Honehar Scholarship Awardee
                </h3>
                <p className="text-muted-foreground">
                  Awarded the prestigious Honehar Scholarship in recognition of academic excellence 
                  and outstanding performance in Software Engineering studies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full shrink-0">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Chief Minister Laptop Scheme
                </h3>
                <p className="text-muted-foreground">
                  Received a laptop through the Chief Minister Laptop Scheme for academic merit, 
                  enabling enhanced learning and development opportunities in technology.
                </p>
              </div>
            </div>
          </div>

          {/* Award Photo */}
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={laptopAward}
              alt="Muhammad Haseeb receiving laptop award"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

