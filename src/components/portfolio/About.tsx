import aboutPhoto from '@/assets/about-photo.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am Muhammad Haseeb, a passionate Software Engineering student from Khanewal, Pakistan. 
              My journey in technology began with a curiosity about how things work, which evolved into 
              a deep passion for software development and problem-solving.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently pursuing my degree at Government College University Faisalabad, I am dedicated to 
              mastering Data Structures, Algorithms, and modern Web Development technologies. I believe in 
              continuous learning and staying updated with the latest industry trends.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond coding, I have a strong passion for sports, particularly cricket, volleyball, and badminton. 
              These activities have taught me teamwork, leadership, and perseverance - qualities I bring to my 
              professional life.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={aboutPhoto}
              alt="Muhammad Haseeb"
              className="rounded-lg shadow-xl object-cover w-full max-w-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
