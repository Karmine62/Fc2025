import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

const Terms = () => {
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
        {/* Terms Content */}
        <section className="w-full py-16 px-4 flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Terms & Conditions
              </span>
            </h1>
            
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-8 text-white/80">
                <div>
                  <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    Welcome to FinstaCam. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
                  </p>
                  <p>
                    FinstaCam provides AI-generated lifestyle selfies and themed photo packs through a credit-based system. Our platform is designed for entertainment and social media use only.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">2. User Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must be at least 18 years old to use FinstaCam</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>You must not share your account credentials with others</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">3. Content Guidelines</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>No NSFW (Not Safe For Work) content is allowed</li>
                    <li>No hate speech, harassment, or discriminatory content</li>
                    <li>No impersonation of public figures or celebrities</li>
                    <li>No content that promotes illegal activities</li>
                    <li>No content that infringes on intellectual property rights</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">4. Image License and Usage</h2>
                  <p className="mb-4">
                    By uploading images to FinstaCam, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and process your images for the purpose of generating AI-enhanced content.
                  </p>
                  <p>
                    You retain ownership of your original uploaded images. However, the AI-generated variations are provided under a limited license for personal, non-commercial use only.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">5. Credits and Refunds</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Credits are non-refundable once used</li>
                    <li>Unused credits expire after 12 months</li>
                    <li>Credit packs are non-transferable</li>
                    <li>Refunds for unused credit packs may be requested within 7 days of purchase</li>
                    <li>Subscription cancellations will take effect at the end of the current billing period</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">6. Subscription Terms</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Subscriptions automatically renew unless cancelled</li>
                    <li>You can cancel your subscription at any time</li>
                    <li>No refunds for partial subscription periods</li>
                    <li>We reserve the right to modify subscription prices with 30 days notice</li>
                    <li>Free trial periods are limited to one per user</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">7. Account Suspension</h2>
                  <p className="mb-4">
                    We reserve the right to suspend or terminate accounts for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violation of these Terms and Conditions</li>
                    <li>Misuse of the platform or services</li>
                    <li>Fraudulent activity</li>
                    <li>Abuse of the credit system</li>
                    <li>Creating multiple accounts to abuse free trials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">8. Disclaimer</h2>
                  <p className="mb-4">
                    All AI-generated images created through FinstaCam are fictional and intended for entertainment or social media use only. These images:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Are not real photographs</li>
                    <li>Should not be used for official documentation</li>
                    <li>Are not guaranteed to be historically accurate</li>
                    <li>May not reflect real-world locations or events</li>
                    <li>Should be used responsibly and ethically</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms and Conditions at any time. Users will be notified of significant changes via email or platform notification. Continued use of the service after changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
                  <p>
                    For questions about these Terms and Conditions, please contact us at support@finstacam.com
                  </p>
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

export default Terms; 