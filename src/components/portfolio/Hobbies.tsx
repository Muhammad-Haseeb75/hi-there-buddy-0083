import { BookOpen } from 'lucide-react';
import libraryPhoto from '@/assets/library-hobby.jpg';
import hobby2Photo from '@/assets/hobby2.jpg';

const Hobbies = () => {
  return (
    <section id="hobbies" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Hobbies & Interests
        </h2>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I love to read books and novels. Reading allows me to explore new ideas, expand my knowledge, 
            and immerse myself in different worlds. Whether it's technical books for learning or novels 
            for leisure, I find great joy in the written word.
          </p>
        </div>

        {/* Hobby Photos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={libraryPhoto}
              alt="Muhammad Haseeb reading in library"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={hobby2Photo}
              alt="Muhammad Haseeb"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
