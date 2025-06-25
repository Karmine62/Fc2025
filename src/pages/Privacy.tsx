import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Lock, Eye, Trash2, Mail, CreditCard } from "lucide-react";
import { useEffect } from "react";

const Privacy = () => {
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
        {/* Privacy Content */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/10 rounded-2xl p-6 flex items-start gap-4">
                <Shield className="w-8 h-8 text-pink-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Privacy Matters</h3>
                  <p className="text-white/80">We're committed to protecting your data and being transparent about how we use it.</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 flex items-start gap-4">
                <Lock className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Secure by Design</h3>
                  <p className="text-white/80">Your data is encrypted and protected using industry-standard security measures.</p>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-400px)] pr-4">
              <div className="space-y-8 text-white/80">
                <div>
                  <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        Your Images
                      </h3>
                      <p className="text-white/70">
                        We only collect the images you upload for AI generation. These images are:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-white/70">
                        <li>Processed solely for generating your requested content</li>
                        <li>Never used for AI training or model improvement</li>
                        <li>Automatically deleted after 30 days</li>
                        <li>Stored with end-to-end encryption</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-400" />
                        Account Information
                      </h3>
                      <p className="text-white/70">
                        We collect minimal account information:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-white/70">
                        <li>Email address for account management</li>
                        <li>User-selected preferences and styles</li>
                        <li>Chosen photo packs and themes</li>
                        <li>Usage statistics to improve your experience</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-400" />
                        Payment Information
                      </h3>
                      <p className="text-white/70">
                        All payments are processed securely through third-party providers:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-white/70">
                        <li>We never store your payment details</li>
                        <li>All transactions are encrypted</li>
                        <li>Compliant with PCI DSS standards</li>
                        <li>Multiple payment options available</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-red-400" />
                        Data Deletion
                      </h3>
                      <p className="text-white/70">
                        You have the right to:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-white/70">
                        <li>Request deletion of your account and all associated data</li>
                        <li>Download your data in a portable format</li>
                        <li>Opt out of marketing communications</li>
                        <li>Request information about your stored data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Compliance</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">GDPR & CCPA Compliance</h3>
                      <p className="text-white/70 mb-4">
                        We comply with major privacy regulations:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-white/70">
                        <li>Right to access and portability</li>
                        <li>Right to erasure ("right to be forgotten")</li>
                        <li>Right to rectification</li>
                        <li>Right to restrict processing</li>
                        <li>Right to data portability</li>
                        <li>Right to object</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">How We Protect Your Data</h3>
                      <ul className="list-disc pl-6 space-y-1 text-white/70">
                        <li>End-to-end encryption for all data transfers</li>
                        <li>Secure cloud storage with regular backups</li>
                        <li>Regular security audits and updates</li>
                        <li>Limited employee access to user data</li>
                        <li>Automatic data deletion after 30 days</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/70 mb-4">
                      For any privacy-related questions or requests:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-white/70">
                      <li>Email: privacy@finstacam.com</li>
                      <li>Data deletion requests: delete@finstacam.com</li>
                      <li>Response time: Within 48 hours</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/70">
                      We may update this privacy policy from time to time. We'll notify you of any significant changes via email or through the platform. Your continued use of FinstaCam after such modifications constitutes your acknowledgment of the modified policy.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
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

export default Privacy; 