import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Camera, Heart, TrendingUp, Palette, Scissors, Flame } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {/* Hero Section */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Digital Confidence, No Filter Needed
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-12">
              We're building the future of digital presence for Gen Z, one AI-generated selfie at a time.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
              At FinstaCam, we believe your online presence shouldn't be limited by your lifestyle or social habits. Whether you're a homebody, introvert, or just done with forced photoshoots, our AI selfie generator helps you build a curated profile without ever leaving your room.
              </p>
              <p className="text-lg text-white/80">
              We're here to make your Instagram photodumps, finsta updates, and dating app photos feel real, look elevated, and hit harder all while keeping you in full control. This is digital confidence, optimized and on your terms.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Gen Z First</h3>
                </div>
                <p className="text-white/80">
                  Built for the digital native generation, our platform understands the nuances of modern social media culture. From finsta aesthetics to dating app strategies, we're constantly evolving with the latest trends and platform algorithms.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                    <Camera className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Authentic Content</h3>
                </div>
                <p className="text-white/80">
                  Our AI technology creates hyper-realistic lifestyle content that looks and feels authentic. From gym selfies to travel photos, club nights to shopping sprees, we help you maintain a consistent, engaging online presence.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                    <Heart className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Dating App Ready</h3>
                </div>
                <p className="text-white/80">
                  Optimized for dating apps and social platforms, our content is designed to increase engagement and matches. We understand what works on each platform and help you create content that stands out.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Culture-Driven</h3>
                </div>
                <p className="text-white/80">
                  Our scene packs are inspired by real-world aesthetics and cultural moments. From streetwear to high fashion, underground scenes to mainstream trends, we help you stay relevant and authentic to your style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="space-y-8">
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Digital Confidence</h3>
                <p className="text-white/80">
                  We believe in empowering users to present their best selves online. Our platform gives you the tools to create content that reflects your personality and aspirations, even if you prefer to stay home.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Authenticity</h3>
                <p className="text-white/80">
                  While our content is AI-generated, we prioritize creating images that feel real and authentic. We understand the importance of maintaining credibility in the digital space.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Privacy & Control</h3>
                <p className="text-white/80">
                  Your privacy is our priority. We give you complete control over your content and ensure your data is protected. You decide what to share and how to present yourself online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of users who are already creating better content and getting more engagement with FinstaCam.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-lg px-8 py-3 shadow-xl"
                onClick={() => {
                  navigate('/');
                  // Use setTimeout to ensure navigation completes before scrolling
                  setTimeout(() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white text-lg px-8 py-3 shadow-xl"
                onClick={() => {
                  navigate('/');
                  // Use setTimeout to ensure navigation completes before scrolling
                  setTimeout(() => {
                    const resultsSection = document.getElementById('results');
                    if (resultsSection) {
                      resultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                See Examples
              </Button>
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

export default About; 