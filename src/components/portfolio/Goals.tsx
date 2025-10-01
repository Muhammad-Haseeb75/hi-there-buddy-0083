import { Target, Rocket, Zap } from 'lucide-react';

const Goals = () => {
  return (
    <section id="goals" className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Goals & Aspirations
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Main Goal */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full flex-shrink-0">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Primary Goal</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My goal is to become a professional Web Developer and work in top companies like Google, 
                  Microsoft, or Amazon. I aspire to create innovative solutions that impact millions of users 
                  and contribute to cutting-edge technologies.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Goals */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Technical Excellence</h4>
              </div>
              <p className="text-muted-foreground">
                Master advanced algorithms, system design, and modern web frameworks to become an expert 
                in full-stack development.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Continuous Learning</h4>
              </div>
              <p className="text-muted-foreground">
                Stay updated with latest technologies, contribute to open-source projects, and build a 
                strong professional network in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
