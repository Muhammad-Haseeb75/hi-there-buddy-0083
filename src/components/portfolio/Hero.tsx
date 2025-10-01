import profileImage from '@/assets/profile.png';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6 order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Muhammad Haseeb
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-semibold">
              Software Engineering Student | Aspiring Web Developer
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Focused on Data Structures, Algorithms, and Web Development. 
              Passionate about building innovative solutions and continuously learning new technologies.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border border-input bg-background rounded-lg font-medium hover:bg-accent transition-all hover:scale-105"
              >
                View Projects
              </button>
            </div>
          </div>

          {/* Right Side - Profile Picture */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur-lg opacity-75"></div>
              <img
                src={profileImage}
                alt="Muhammad Haseeb"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-background"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
