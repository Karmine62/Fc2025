import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Clock, MessageSquare, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative" style={{ backgroundImage: 'url(/bg-pattern.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none z-0" />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')} 
                className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                FinstaCam
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const section = document.getElementById('testimonials');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                User Reviews
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const section = document.getElementById('results');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                See the Results
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const section = document.getElementById('faq');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const section = document.getElementById('how-it-works');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                How to Use It
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const section = document.getElementById('pricing');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                Plans & Pricing
              </button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                Log in
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-16">
        {/* Contact Content */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 rounded-2xl p-6 flex items-start gap-4">
                <Mail className="w-8 h-8 text-pink-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-white/80">hello@finstacam.ai</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 flex items-start gap-4">
                <Clock className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Response Time</h3>
                  <p className="text-white/80">We typically respond within 3 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="mt-8 text-center text-white/60">
              <p>We're here to help with any questions about:</p>
              <ul className="mt-2 space-y-1">
                <li>• Technical support and troubleshooting</li>
                <li>• Business partnerships and collaborations</li>
                <li>• Feature requests and feedback</li>
                <li>• Account and billing inquiries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 px-4 flex flex-col items-center">
          <div className="max-w-5xl w-full flex flex-wrap justify-between items-end gap-8 text-white/80 text-sm">
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">FinstaCam</span>
            </div>
            <div className="flex gap-6 ml-auto">
              <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button>
              <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
              <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/40">© 2024 PixelPerfect. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Contact; 