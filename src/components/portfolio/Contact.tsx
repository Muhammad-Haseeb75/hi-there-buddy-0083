import { useState } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Simulate form submission
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I will get back to you soon!',
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, url: 'mailto:haseeb@example.com' },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Connect With Me</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in hearing about new opportunities, collaborations, or just 
              connecting with fellow developers. Feel free to reach out through any of these channels!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{link.name}</h4>
                      <p className="text-sm text-muted-foreground">Connect on {link.name}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-foreground">Privacy Notice</h4>
              <p className="text-sm text-muted-foreground">
                For privacy reasons, detailed personal information like phone number, CNIC, and full 
                address are not displayed. Please use the contact form or social links to get in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
