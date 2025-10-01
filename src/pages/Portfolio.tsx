import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Education from '@/components/portfolio/Education';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Sports from '@/components/portfolio/Sports';
import Hobbies from '@/components/portfolio/Hobbies';
import Goals from '@/components/portfolio/Goals';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

const Portfolio = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Sports />
        <Hobbies />
        <Goals />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
