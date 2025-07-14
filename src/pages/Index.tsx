import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Camera, Heart, TrendingUp, Palette, Scissors, Flame } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { validateEmail } from "@/utils/emailValidation";
import LandingPaymentModal from "@/components/LandingPaymentModal";

// Different placeholder images for before/after states
const beforeImage1 = "/images/peel-1/peel-blue.webp";
const afterImage1 = "/images/peel-1/peel-purple.jpg";
const beforeImage2 = "/images/peel-1/peel-pink.jpg";
const afterImage2 = "/images/peel-1/peel-green.jpg";

// Images for When AI Enters the Chat section
const chatBeforeImage1 = "/images/peel-2/peel-1b4.webp";
const chatAfterImage1 = "/images/peel-2/peel-1af.webp";
const chatBeforeImage2 = "/images/peel-2/peel-2b4.jpg";
const chatAfterImage2 = "/images/peel-2/peel-2af.jpg";
const chatBeforeImage3 = "/images/peel-2/peel-3b4.jpg";
const chatAfterImage3 = "/images/peel-2/peel-3af.jpg";
const chatBeforeImage4 = "/images/peel-2/peel-4b4.jpg";
const chatAfterImage4 = "/images/peel-2/peel-4af.jpg";

// Custom hook for image comparison functionality
const useImageComparison = () => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    updatePosition(e.touches[0]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    updatePosition(e);
  };

  const handleMouseMoveOver = (e: React.MouseEvent) => {
    if (!isDragging) {
      updatePosition(e);
    }
  };

  const updatePosition = (e: MouseEvent | Touch | React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPosition(Math.min(Math.max(percentage, 0), 100));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return {
    position,
    containerRef,
    handleMouseDown,
    handleTouchStart,
    handleMouseEnter,
    handleMouseMoveOver,
    isDragging,
  };
};

// Add this new hook for tilt effect
const useTiltEffect = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 4; // Reduced from /2 to /4
    const rotateY = (centerX - x) / 4; // Reduced from /2 to /4
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    rotation,
  };
};

// Add this new hook for counter animation
const useCounter = (target: number) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const increment = target / 50; // 50 steps for smooth animation
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return { count, ref };
};

const Index = () => {
  const navigate = useNavigate();
  const { setEmail, setOnboardingStep } = useUser();
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  
  const comparison1 = useImageComparison();
  const comparison2 = useImageComparison();
  const comparison3 = useImageComparison();
  const comparison4 = useImageComparison();
  const comparison5 = useImageComparison();
  const comparison6 = useImageComparison();
  const tilt1 = useTiltEffect();
  const tilt2 = useTiltEffect();
  const tilt3 = useTiltEffect();
  const engagementCounter = useCounter(55);
  const aiContentCounter = useCounter(80);
  const datingAICounter = useCounter(333);

  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleEmailSubmit = async () => {
    setEmailError('');
    
    if (!emailInput.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(emailInput)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setEmail(emailInput);
      setOnboardingStep('style-profile');
      navigate('/style-profile');
      setIsSubmitting(false);
    }, 1000);
  };

  const handlePlanSelect = (planName: string, planPrice: string) => {
    if (planName === "Free") {
      // Handle free plan - redirect to onboarding
      setEmail('');
      setOnboardingStep('style-profile');
      navigate('/style-profile');
    } else {
      // Handle paid plans - open payment modal
      setSelectedPlan({ name: planName, price: planPrice });
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentConfirm = (email: string) => {
    // Set the email and redirect to onboarding
    setEmail(email);
    setOnboardingStep('style-profile');
    navigate('/style-profile');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
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
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  FinstaCam
                </button>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => scrollToSection('testimonials')} className="text-white/80 hover:text-white transition-colors">
                  User Reviews
                </button>
                <button onClick={() => scrollToSection('results')} className="text-white/80 hover:text-white transition-colors">
                  See the Results
                </button>
                <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-white/80 hover:text-white transition-colors">
                  How to Use It
                </button>
                <button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-white transition-colors">
                  Plans & Pricing
                </button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10" onClick={() => navigate('/dashboard')}>
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Add padding to account for fixed navbar */}
        <div className="pt-16">
          {/* Hero Section */}
          <section id="hero" className="w-full py-0 flex flex-col items-center relative min-h-[550px]">
            <div className="absolute left-0 right-0 top-0 mx-auto z-0 w-full h-[600px] flex justify-center items-center">
              <div className="grid grid-cols-6 grid-rows-4 gap-2 w-full h-full">
                <img src="/images/hero/bento-1.webp" alt="Bento 1" className="rounded-xl object-cover w-full h-full col-span-2 row-span-2" />
                <img src="/images/hero/bento-2.webp" alt="Bento 2" className="rounded-xl object-cover w-full h-full col-span-1 row-span-2" />
                <img src="/images/hero/bento-3.webp" alt="Bento 3" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1" />
                <img src="/images/hero/bento-4.webp" alt="Bento 4" className="rounded-xl object-cover w-full h-full col-span-2 row-span-1" />
                <img src="/images/hero/bento-5.webp" alt="Bento 5" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1" />
                <img src="/images/hero/bento-6.webp" alt="Bento 6" className="rounded-xl object-cover w-full h-full col-span-2 row-span-2" />
                <img src="/images/hero/bento-7.webp" alt="Bento 7" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1" />
                <img src="/images/hero/bento-8.webp" alt="Bento 8" className="rounded-xl object-cover w-full h-full col-span-1 row-span-2" />
                <img src="/images/hero/bento-9.webp" alt="Bento 9" className="rounded-xl object-cover w-full h-full col-span-2 row-span-1" />
                <img src="/images/hero/bento-10.webp" alt="Bento 10" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1" />
                <img src="/images/hero/bento-11.webp" alt="Bento 11" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1" />
                <img src="/images/hero/bento-12.webp" alt="Bento 12" className="rounded-xl object-cover w-full h-full col-span-2 row-span-1" />
                <img src="/images/hero/bento-13.webp" alt="Bento 13" className="rounded-xl object-cover w-full h-full col-span-1 row-span-1 col-start-6 row-start-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30 pointer-events-none" />
            </div>
            <div className="relative z-10 flex flex-row items-center justify-center min-h-[320px] w-full max-w-6xl mx-auto gap-12">
              {/* Left: Hero Text */}
              <div className="flex-1 flex flex-col items-start justify-center">
                <div className="rounded-xl px-8 py-12 flex flex-col items-center max-w-2xl w-full">
                  <h1 className="text-5xl font-bold mb-6 drop-shadow-xl text-center leading-tight">
                    <span className="block">She Has a Ring Light. </span>
                    <span className="block mt-2">
                      <span className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 px-2 py-1 rounded text-white whitespace-nowrap">You Have AI.</span>
                    </span>
                  </h1>
                  <div className="space-y-4 mb-8">
                    <p className="text-lg drop-shadow-lg text-center"><span className="font-bold underline">FinstaCam is as real as it gets.</span> We are the #1 way to drop hyper-realistic AI-generated selfies that hit on <span className="font-bold underline">Instagram</span>, <span className="font-bold underline">Hinge</span> and other dating apps. Theres nothing like shooting your shot when your profile looks like you've got options. <span className="font-bold underline">We make sure you do.</span></p>
                    <ul className="text-lg space-y-2 text-white/90">
                      <li className="flex items-center gap-2">
                        <span className="text-pink-400">👨‍🍳</span>
                        Cook up lifestyle content curated to your aesthetic
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-400">📸</span>
                        Fit checks, thirst traps, post-workout we got your vibe
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-pink-400">❤️</span>
                        Stack your profile with pics that turn scrolls into saves
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-lg px-8 py-3 shadow-xl" onClick={() => scrollToSection('pricing')}>Try It Now</Button>
                  </div>
                </div>
              </div>
              {/* Right: CTA Box */}
              <div className="flex-1 flex justify-center items-center relative">
                <div className="rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center relative backdrop-blur-md bg-black/10 border border-white/10">
                  <h3 className="text-2xl font-bold mb-2 text-center text-white underline">Your First 2 Selfies Are Free</h3>
                  <p className="text-white/80 text-center mb-6"> Apply pressure with these on your preferred apps, then circle back for the real thing</p>
                  
                  {/* Email input with glow effect */}
                  <div className="w-full relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <input 
                      type="email" 
                      placeholder="Enter your email to get started..." 
                      className={`relative w-full border-2 rounded-lg px-4 py-3 text-white bg-black/20 placeholder-gray-400 text-lg focus:outline-none transition duration-200 ${
                        emailError ? 'border-red-500' : 'border-white/20 focus:border-pink-500'
                      }`}
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Error message */}
                  {emailError && (
                    <div className="w-full mt-2 text-red-400 text-sm text-center">
                      {emailError}
                    </div>
                  )}

                  {/* Submit button with glow */}
                  <div className="w-full mt-4 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <button 
                      className={`relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:from-yellow-300 hover:to-purple-700 text-white font-semibold rounded-lg py-3 text-lg transition duration-200 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleEmailSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        'Get Free Photos'
                      )}
                    </button>
                  </div>

                  <div className="relative w-full mt-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black/10 text-white/60">or</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white font-semibold rounded-lg py-3 text-lg transition duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.711-1.594-3.922-2.57-6.656-2.57-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.633z" fill="#4285F4"/>
                    </svg>
                    Continue with Google
                  </button>

                  <div className="text-sm text-white/60 mt-2 text-center">
                    If you already have an account, we'll log you in
                  </div>

                  {/* Works With Section - absolutely positioned at the bottom center of the CTA box */}
                  <div className="absolute left-1/2 -translate-x-[55%] bottom-[-80px] z-20 flex justify-center w-full">
                    <div className="flex items-center gap-8 rounded-xl px-6 py-3">
                      <span className="text-white text-xl font-bold">Works with</span>
                      {/* Tinder */}
                      <img 
                        src="/images/hero/tinder-logo.png" 
                        alt="Tinder" 
                        className="h-12 w-auto object-contain"
                      />
                      {/* Instagram */}
                      <img 
                        src="/images/hero/instagram-logo.webp" 
                        alt="Instagram" 
                        className="h-10 w-auto object-contain"
                      />
                      {/* Hinge */}
                      <img 
                        src="/images/hero/Hinge-logo.png" 
                        alt="Hinge" 
                        className="h-10 w-auto object-contain"
                      />
                      {/* Snapchat */}
                      <img 
                        src="/images/hero/Snap-logo.png" 
                        alt="Snapchat" 
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transformation Section */}
          <section className="w-full py-16 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Build a Curated Profile That Cracks the Algorithm</h2>
            <p className="mb-8 text-lg text-white/80 max-w-xl text-center">FinstaCam transforms mid selfies into social media content designed to look real, feel lived-in, and <span className="font-bold underline">increase your shot-making percentage online</span>.</p>
            <div className="flex flex-wrap gap-8 justify-center">
              {/* First Before/After Container */}
              <div className="bg-white/10 rounded-2xl p-6 w-[400px] flex flex-col items-center">
                <div 
                  ref={comparison1.containerRef}
                  className="relative w-[400px] h-[400px] rounded-xl overflow-hidden cursor-ew-resize group"
                  onMouseDown={comparison1.handleMouseDown}
                  onTouchStart={comparison1.handleTouchStart}
                  onMouseEnter={comparison1.handleMouseEnter}
                  onMouseMove={comparison1.handleMouseMoveOver}
                >
                  {/* Before Image (Bottom Layer) */}
                  <img 
                    src={beforeImage1} 
                    alt="Before" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* After Image (Top Layer) */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - comparison1.position}% 0 0)` }}
                  >
                    <img 
                      src={afterImage1} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                    {/* Divider Container */}
                    <div 
                      className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                      style={{ left: `${comparison1.position}%` }}
                    >
                      {/* Divider Line */}
                      <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                        comparison1.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                      }`} />
                      {/* Handle */}
                      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                        comparison1.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                      }`}>
                        <div className="w-6 h-6 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 mt-4">From camera roll to a roster full of options we make sure your selfies impossible to ignore.</p>
              </div>

              {/* Second Before/After Container */}
              <div className="bg-white/10 rounded-2xl p-6 w-[400px] flex flex-col items-center">
                <div 
                  ref={comparison2.containerRef}
                  className="relative w-[400px] h-[400px] rounded-xl overflow-hidden cursor-ew-resize group"
                  onMouseDown={comparison2.handleMouseDown}
                  onTouchStart={comparison2.handleTouchStart}
                  onMouseEnter={comparison2.handleMouseEnter}
                  onMouseMove={comparison2.handleMouseMoveOver}
                >
                  {/* Before Image (Bottom Layer) */}
                  <img 
                    src={beforeImage2} 
                    alt="Before" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* After Image (Top Layer) */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - comparison2.position}% 0 0)` }}
                  >
                    <img 
                      src={afterImage2} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                    {/* Divider Container */}
                    <div 
                      className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                      style={{ left: `${comparison2.position}%` }}
                    >
                      {/* Divider Line */}
                      <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                        comparison2.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                      }`} />
                      {/* Handle */}
                      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                        comparison2.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                      }`}>
                        <div className="w-6 h-6 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 mt-4">The outside life, generated inside. Your Instagram feed just got an AI upgrade.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="w-full py-16 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">What Happens After You Post? This.</h2>
            <p className="mb-12 text-lg text-white/80 max-w-xl text-center">These users tried FinstaCam and saw real motion in their DMs, real life, and dating apps.</p>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { name: "Ryan", text: "I got called a 'walking green flag' and I haven't left my bed all week.😭" },
                { name: "Jay", text: "Bro I didn't even match like this when I was in shape 😂" },
                { name: "Zehan", text: "This app got me in a situationship in under 72 hours... WTF 💀" },
              ].map((t, i) => {
                const tilt = [tilt1, tilt2, tilt3][i];
                return (
                  <div 
                    key={i} 
                    ref={tilt.cardRef}
                    onMouseMove={tilt.handleMouseMove}
                    onMouseLeave={tilt.handleMouseLeave}
                    className="group relative bg-white/10 rounded-2xl p-6 w-72 flex flex-col items-start transition-all duration-200 ease-out hover:scale-[1.02]"
                    style={{
                      transform: `perspective(800px) rotateX(${tilt.rotation.x}deg) rotateY(${tilt.rotation.y}deg)`,
                      transformStyle: 'preserve-3d',
                      transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                  >
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    
                    {/* Content with Hover Effects */}
                    <div className="flex items-center gap-3 mb-2 transition-transform duration-500 group-hover:translate-x-1">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-transform duration-500 group-hover:scale-110">{t.name[0]}</span>
                      <span className="font-semibold transition-colors duration-500 group-hover:text-pink-400">{t.name}</span>
                    </div>
                    <p className="transition-all duration-500 group-hover:text-white/90 group-hover:translate-x-1">{t.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI-Powered Magic Section */}
          <section id="results" className="w-full py-16 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Your Next Instagram Photo Dump? Powered by AI</h2>
            <p className="mb-12 text-lg text-white/80 max-w-xl text-center">Why risk it? AI-curated selfies hit harder and get seen more... it's called feed optimization.</p>
            <div className="max-w-5xl w-full grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white/10 rounded-2xl p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-pink-400" />
                  <h3 className="text-2xl font-bold">When AI Enters the Chat</h3>
                </div>
                <p className="mb-6 text-white/80">FinstaCam doesn't just enhance your photos it transforms them into high-performing thirst traps. They won't know, and you won't have to explain.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    ref={comparison3.containerRef}
                    className="relative w-full h-56 rounded-xl overflow-hidden cursor-ew-resize group"
                    onMouseDown={comparison3.handleMouseDown}
                    onTouchStart={comparison3.handleTouchStart}
                    onMouseEnter={comparison3.handleMouseEnter}
                    onMouseMove={comparison3.handleMouseMoveOver}
                  >
                    <img 
                      src={chatAfterImage1} 
                      alt="Before" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - comparison3.position}% 0 0)` }}
                    >
                      <img 
                        src={chatBeforeImage1} 
                        alt="After" 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                        style={{ left: `${comparison3.position}%` }}
                      >
                        <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                          comparison3.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                        }`} />
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                          comparison3.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                        }`}>
                          <div className="w-6 h-6 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    ref={comparison4.containerRef}
                    className="relative w-full h-56 rounded-xl overflow-hidden cursor-ew-resize group"
                    onMouseDown={comparison4.handleMouseDown}
                    onTouchStart={comparison4.handleTouchStart}
                    onMouseEnter={comparison4.handleMouseEnter}
                    onMouseMove={comparison4.handleMouseMoveOver}
                  >
                    <img 
                      src={chatAfterImage2} 
                      alt="Before" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - comparison4.position}% 0 0)` }}
                    >
                      <img 
                        src={chatBeforeImage2} 
                        alt="After" 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                        style={{ left: `${comparison4.position}%` }}
                      >
                        <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                          comparison4.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                        }`} />
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                          comparison4.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                        }`}>
                          <div className="w-6 h-6 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    ref={comparison5.containerRef}
                    className="relative w-full h-56 rounded-xl overflow-hidden cursor-ew-resize group"
                    onMouseDown={comparison5.handleMouseDown}
                    onTouchStart={comparison5.handleTouchStart}
                    onMouseEnter={comparison5.handleMouseEnter}
                    onMouseMove={comparison5.handleMouseMoveOver}
                  >
                    <img 
                      src={chatAfterImage3} 
                      alt="Before" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - comparison5.position}% 0 0)` }}
                    >
                      <img 
                        src={chatBeforeImage3} 
                        alt="After" 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                        style={{ left: `${comparison5.position}%` }}
                      >
                        <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                          comparison5.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                        }`} />
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                          comparison5.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                        }`}>
                          <div className="w-6 h-6 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    ref={comparison6.containerRef}
                    className="relative w-full h-56 rounded-xl overflow-hidden cursor-ew-resize group"
                    onMouseDown={comparison6.handleMouseDown}
                    onTouchStart={comparison6.handleTouchStart}
                    onMouseEnter={comparison6.handleMouseEnter}
                    onMouseMove={comparison6.handleMouseMoveOver}
                  >
                    <img 
                      src={chatAfterImage4} 
                      alt="Before" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - comparison6.position}% 0 0)` }}
                    >
                      <img 
                        src={chatBeforeImage4} 
                        alt="After" 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
                        style={{ left: `${comparison6.position}%` }}
                      >
                        <div className={`absolute top-0 bottom-0 w-1 bg-white/50 transition-all duration-75 ${
                          comparison6.isDragging ? 'bg-white/80' : 'group-hover:bg-white/70'
                        }`} />
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center transition-all duration-75 ${
                          comparison6.isDragging ? 'scale-110 bg-white' : 'group-hover:scale-105'
                        }`}>
                          <div className="w-6 h-6 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-start">
                  <Camera className="mb-2 text-blue-400" />
                  <h4 className="font-semibold mb-1">Built to Get Engagement</h4>
                  <p className="text-white/80 text-sm mb-2">AI-generated visuals get up to 55% more matches, likes, and saves than regular pics.</p>
                  <div ref={engagementCounter.ref} className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    +{engagementCounter.count}%
                  </div>
                  <p className="text-white/60 text-xs mt-1">More engagement on your posts</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-start">
                  <Heart className="mb-2 text-pink-400" />
                  <h4 className="font-semibold mb-1">Pushed by the Feed</h4>
                  <p className="text-white/80 text-sm mb-2">AI decides what gets seen. Optimized photos show up more.</p>
                  <div ref={aiContentCounter.ref} className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                    {aiContentCounter.count}%
                  </div>
                  <p className="text-white/60 text-xs mt-1">of what you see online is lowkey AI-generated.</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 flex flex-col items-start">
                  <TrendingUp className="mb-2 text-green-400" />
                  <h4 className="font-semibold mb-1">Everyone's Letting AI Cook</h4>
                  <p className="text-white/80 text-sm mb-2">26% of singles already use AI, making it a weapon for dating success everywhere.</p>
                  <div ref={datingAICounter.ref} className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    +{datingAICounter.count}%
                  </div>
                  <p className="text-white/60 text-xs mt-1">Increase in AI usage for dating since 2024</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="w-full py-8 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">The FinstaCam Formula</h2>
            <p className="mb-12 text-lg text-white/80 max-w-xl text-center">Low effort. High impact. Built for feeds, stories, and matches.</p>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="bg-white/10 rounded-2xl p-6 w-80 flex flex-col items-center group hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="text-white" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">1. Pick the Vibe</h4>
                <p className="text-white/80 text-sm text-center">Choose from curated scenes like the gym, club, vacation, or shopping district. Decide when and where you want to be seen, and we'll generate hyperrealistic AI selfies that place you right there.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 w-80 flex flex-col items-center group hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="text-white" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">2. Lock in Your Style</h4>
                <p className="text-white/80 text-sm text-center">Upload your selfie and select a hairstyle inspo from our library. We will generate a custom AI look that eats on every platform.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 w-80 flex flex-col items-center group hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Flame className="text-white" size={24} />
                </div>
                <h4 className="font-semibold mb-2 text-lg">3. Drop the Heat</h4>
                <p className="text-white/80 text-sm text-center">Download, post, repeat. From Instagram to Hinge, your FinstaCam photos will do numbers while you do nothing.</p>
              </div>
            </div>
          </section>

          {/* Add spacing between Formula and Comparison Title section */}
          <div className="h-8 md:h-12" />

          {/* Comparison Title Section */}
          <div className="w-full flex flex-col items-center mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">FinstaCam</span> vs Everyone Else
            </h2>
            <p className="text-lg text-white/80 text-center max-w-2xl">See how FinstaCam's ultra-real selfies outmatch basic AI tools and deliver believable content for dating apps, DMs, and your roster.</p>
          </div>

          {/* Comparison Section */}
          <section className="w-full py-16 px-4 flex flex-col items-center mt-0">
            <div className="max-w-6xl w-full flex flex-col items-center">
              <div className="flex flex-row w-full gap-8 mb-8">
                {/* FinstaCam Column */}
                <div className="flex-1 bg-green-500/30 rounded-2xl p-6 flex flex-col items-center border-2 border-green-400">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">FinstaCam</h3>
                  <div className="flex gap-4 mb-4 group">
                    <img src="/images/comp-imgs/us-1.webp" alt="FinstaCam 1" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                    <img src="/images/comp-imgs/us-2.webp" alt="FinstaCam 2" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                    <img src="/images/comp-imgs/us-3.jpg" alt="FinstaCam 3" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                  </div>
                  <ul className="w-full mt-4 space-y-3">
                    <li className="flex items-center gap-2 text-white"><span className="text-purple-400 text-xl">✔️</span> Realistic imperfections  skin texture, glare, clutter</li>
                    <li className="flex items-center gap-2 text-white"><span className="text-purple-400 text-xl">✔️</span> Awkward believable framing, posing, and angles</li>
                    <li className="flex items-center gap-2 text-white"><span className="text-purple-400 text-xl">✔️</span> Style profiles for accurate appearance & style matching
                    </li>
                    <li className="flex items-center gap-2 text-white"><span className="text-purple-400 text-xl">✔️</span> Geo-location based scenes available</li>
                    <li className="flex items-center gap-2 text-white"><span className="text-purple-400 text-xl">✔️</span> Looks like you took the pic on your actual phone</li>
                  </ul>
                </div>
                {/* Alternatives Column */}
                <div className="flex-1 bg-red-500/30 rounded-2xl p-6 flex flex-col items-center border-2 border-red-400">
                  <h3 className="text-2xl font-bold mb-4 text-white/80">Alternatives</h3>
                  <div className="flex gap-4 mb-4 group">
                    <img src="/images/comp-imgs/them-1.jpg" alt="Alt 1" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                    <img src="/images/comp-imgs/them-2.jpg" alt="Alt 2" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                    <img src="/images/comp-imgs/them-3.jpg" alt="Alt 3" className="rounded-xl w-40 h-52 object-cover hover:scale-105 hover:shadow-lg transition-all duration-300" />
                  </div>
                  <ul className="w-full mt-4 space-y-3">
                    <li className="flex items-center gap-2 text-white/80"><span className="text-red-400 text-xl">✖️</span> Overly smooth, airbrushed, obviously fake results</li>
                    <li className="flex items-center gap-2 text-white/80"><span className="text-red-400 text-xl">✖️</span> 	Generic backgrounds, few customization options</li>
                    <li className="flex items-center gap-2 text-white/80"><span className="text-yellow-400 text-xl">⚠️</span> One-size-fits-all generations</li>
                    <li className="flex items-center gap-2 text-white/80"><span className="text-red-400 text-xl">✖️</span> No sense of social context or cultural references</li>
                    <li className="flex items-center gap-2 text-white/80"><span className="text-orange-400 text-xl">😕</span> Not optimized for dating app or IG performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="w-full py-8 px-4 flex flex-col items-center mt-0">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="mb-12 text-lg text-white/80 max-w-xl text-center">Everything you need to know about FinstaCam and how it works</p>
            <div className="max-w-5xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      How does FinstaCam work?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      FinstaCam uses advanced AI technology to transform your selfies into stunning lifestyle photos. Simply upload your photo, choose your desired scene and style, and our AI will generate photorealistic images that look completely natural.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-2" className="border-white/10">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      Will people know my photos are AI-generated?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      Our AI technology is designed to create hyper-realistic images that are virtually indistinguishable from real photos. The generated images maintain your natural features while enhancing the overall quality and composition.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-3" className="border-white/10">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      What types of scenes can I generate?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      We offer a wide range of scenes including gym, club, vacation spots, shopping districts, and more. Each plan comes with different scene options, and you can purchase additional scene packs to expand your collection.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-4" className="border-white/10">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      Can I use these photos on dating apps?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      Yes! Our photos are specifically designed to work well on dating apps and social media platforms. They're optimized for engagement and designed to help you stand out in your dating profile.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="w-full py-16 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
            <p className="mb-8 text-lg text-white/80 max-w-xl text-center">Transform your photos with our flexible pricing options</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center gap-4 mb-8 ml-16">
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-white/60'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-white/60'}`}>Yearly</span>
              <div className="w-20 h-8 flex items-center justify-center">
                {billingCycle === 'yearly' && (
                  <span className="bg-green-500/20 text-green-400 px-2 py-3 rounded-full text-xs font-medium border border-green-400/30">
                    Save 50%
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center">
              {[
                { title: "Lurker", price: billingCycle === 'monthly' ? "Free" : "Free", features: ["2 free selfies", "6 scenes to choose from", "Hairstyling", "Payment method required"], cta: "Free", highlight: false },
                { title: "Feed Fixer", price: billingCycle === 'monthly' ? "$12.99" : "$79.99", features: ["15 selfies/month", "Lurker + Feed Fixer scenes", "2 group photos", "Hairstyling, Height and Weight", "1 Photo dump per month", "Buy Scene Packs with credits"], cta: "Choose", highlight: true },
                { title: "Profile Optimizer", price: billingCycle === 'monthly' ? "$24.99" : "$159.99", features: [
                  "20 selfies/month", 
                  "10 Boomerangs", 
                  "Lower tier scenes +\nProfile Optimizer scenes",
                  "4 group photos", 
                  "Lower tier styling +\nClothing, Cars, Pets", 
                  "2 Photo dumps per month", 
                  "Weekly scene packs\n(e.g., Ibiza, NYFW, Tokyo Nightlife)",
                  "Buy Scene Packs with credits"
                ], cta: "Choose", highlight: false },
                { title: "Content Creator", price: billingCycle === 'monthly' ? "$39.99" : "$249.99", features: [
                  "40 selfies/month", 
                  "20 Boomerangs", 
                  "All Scenes +\nAI-Custom Scenes (User-Generated)",
                  "15 group photos", 
                  "Full range styling", 
                  "2 Photo dumps per month", 
                  "Weekly scene packs\n(Full access including seasonal & Location-based drops)",
                  "Buy Scene Packs with credits"
                ], cta: "Choose", highlight: false },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl p-8 w-72 flex flex-col items-center bg-white/10 ${plan.highlight ? "border-2 border-pink-400" : ""} h-[550px] relative transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl`}>
                  <div className="flex flex-col items-center">
                    {plan.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-3xl font-bold mb-4">{plan.price}</div>
                    <ul className="space-y-2 text-white/80 text-sm">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1">✅</span>
                          <span className="whitespace-pre-line">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600"
                      onClick={() => handlePlanSelect(plan.title, plan.price)}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
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

      {/* Landing Payment Modal */}
      {selectedPlan && (
        <LandingPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onConfirmPayment={handlePaymentConfirm}
        />
      )}
    </div>
  );
};

export default Index;
