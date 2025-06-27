import { useState } from "react";
import { Camera, ShoppingBag, Plus, Heart, Search, Bot, Download, QrCode, Store, Trash, Eye, Share, CreditCard, User, Palette, Sparkles, Zap, Crown, Album, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";
import WelcomePopup from "@/components/WelcomePopup";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    email, 
    isOnboardingComplete, 
    userPlan, 
    setUserPlan, 
    showWelcomePopup, 
    setShowWelcomePopup, 
    hasSeenWelcomePopup, 
    setHasSeenWelcomePopup,
    isFreeTrialUser 
  } = useUser();
  const [uploadMethod, setUploadMethod] = useState('manual');
  const [selectedStyle, setSelectedStyle] = useState('Timothée Chalamet');
  const [selectedScene, setSelectedScene] = useState('Studio');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Morning');
  const [username, setUsername] = useState('ai_studio_pro');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('ai_studio_pro');

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStyleSlide, setCurrentStyleSlide] = useState(0);

  // Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<{
    id: number;
    name: string;
    price: number;
  } | null>(null);

  // Check if user just completed onboarding
  const isNewUser = email && isOnboardingComplete;

  // Handle welcome popup close (only for non-free users)
  const handleWelcomePopupClose = () => {
    if (!isFreeTrialUser) {
      setShowWelcomePopup(false);
      setHasSeenWelcomePopup(true);
    }
  };

  // Handle welcome popup upgrade
  const handleWelcomePopupUpgrade = () => {
    setShowWelcomePopup(false);
    setHasSeenWelcomePopup(true);
    // The actual plan upgrade will be handled in the upgrade-plan page
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 9); // 9 total slides (0-8)
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 9) % 9); // Handle negative numbers
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Style carousel navigation functions
  const nextStyleSlide = () => {
    setCurrentStyleSlide((prev) => (prev + 1) % 5); // 5 total slides (0-4)
  };

  const prevStyleSlide = () => {
    setCurrentStyleSlide((prev) => (prev - 1 + 5) % 5); // Handle negative numbers
  };

  const goToStyleSlide = (slideIndex: number) => {
    setCurrentStyleSlide(slideIndex);
  };

  // Mock data
  const userStats = {
    credits: 45,
    generated: 156,
    currentPlan: 'Premium',
    followers: 1247,
    following: 892
  };

  // Style options with enhanced information (20 total styles)
  const styleOptions = [
    // Slide 1 (Styles 1-4)
    {
      name: 'Edgar Cut',
      description: 'Strong, confident, and charismatic',
      bestFor: 'Confidence-building profiles, fitness apps',
      tips: 'Excellent for showcasing strength and determination'
    },
    {
      name: 'Low Taper Fade',
      description: 'Elegant, sophisticated, and magnetic',
      bestFor: 'High-end dating apps, professional networking',
      tips: 'Ideal for creating an elegant and sophisticated presence'
    },
    {
      name: 'Line Up Fade',
      description: 'Youthful, energetic, and approachable',
      bestFor: 'Younger demographics, casual dating apps',
      tips: 'Great for showing your fun and energetic personality'
    },
    {
      name: 'Middle Part',
      description: 'Bold, artistic, and unapologetically unique',
      bestFor: 'Creative platforms, artistic communities',
      tips: 'Perfect for expressing your unique artistic vision'
    },
    // Slide 2 (Styles 5-8)
    {
      name: 'IShowSpeed',
      description: 'Sophisticated, artistic, and effortlessly cool',
      bestFor: 'Creative profiles, artistic dating apps',
      tips: 'Perfect for showcasing your artistic side and intellectual interests'
    },
    {
      name: 'Timothée Chalamet',
      description: 'Confident, stylish, and fashion-forward',
      bestFor: 'Fashion-focused profiles, Instagram',
      tips: 'Great for highlighting your sense of style and confidence'
    },
    {
      name: 'Shohei Ohtani',
      description: 'Classic, charming, and timeless appeal',
      bestFor: 'Traditional dating apps, professional settings',
      tips: 'Ideal for creating a trustworthy and approachable image'
    },
    {
      name: 'Drake',
      description: 'Warm, approachable, and naturally beautiful',
      bestFor: 'Friendly dating apps, social media',
      tips: 'Perfect for creating a warm and inviting first impression'
    },
    // Slide 3 (Styles 9-12)
    {
      name: 'Luka Sabbat',
      description: 'Strong, classic, and gentlemanly',
      bestFor: 'Traditional dating, professional networking',
      tips: 'Ideal for creating a strong, reliable impression'
    },
    {
      name: 'Morgan Wallen',
      description: 'Elegant, mysterious, and captivating',
      bestFor: 'Sophisticated dating apps, high-end platforms',
      tips: 'Great for creating an air of mystery and sophistication'
    },
    {
      name: 'Johnny Depp',
      description: 'Rockstar energy with modern edge',
      bestFor: 'Music scenes, creative dating apps',
      tips: 'Perfect for showcasing your edgy, artistic side'
    },
    {
      name: 'Paul Walker',
      description: 'Confident, bold, and trendsetting',
      bestFor: 'Fashion-forward platforms, Instagram',
      tips: 'Ideal for showing your confidence and style'
    },
    // Slide 4 (Styles 13-16)
    {
      name: 'Chief Keef',
      description: 'Tall, dark, and mysterious',
      bestFor: 'Dramatic profiles, artistic dating apps',
      tips: 'Great for creating an intense, mysterious vibe'
    },
    {
      name: 'Duke Dennis',
      description: 'Gothic, edgy, and alternative',
      bestFor: 'Alternative communities, creative platforms',
      tips: 'Perfect for expressing your unique, alternative style'
    },
    {
      name: 'J Cole',
      description: 'Sensitive, artistic, and emotionally intelligent',
      bestFor: 'Deep connection dating apps, artistic communities',
      tips: 'Ideal for showing emotional depth and sensitivity'
    },
    {
      name: 'Ja Morant',
      description: 'Bold, artistic, and unapologetically unique',
      bestFor: 'Creative platforms, artistic communities',
      tips: 'Perfect for expressing your unique artistic vision'
    },
    // Slide 5 (Styles 17-20)
    {
      name: 'A$AP Rocky',
      description: 'Intense, mysterious, and captivating',
      bestFor: 'Dramatic profiles, artistic dating apps',
      tips: 'Great for creating an intense, mysterious presence'
    },
    {
      name: 'Allen Iverson',
      description: 'Witty, confident, and authentically cool',
      bestFor: 'Comedy scenes, creative dating apps',
      tips: 'Perfect for showing your humor and authenticity'
    },
    {
      name: 'LaMelo Ball',
      description: 'Rugged, authentic, and working-class cool',
      bestFor: 'Authentic dating apps, creative communities',
      tips: 'Ideal for showing your authentic, down-to-earth side'
    },
    {
      name: 'Jalen Hurts',
      description: 'Fresh, optimistic, and full of life',
      bestFor: 'Young dating apps, optimistic communities',
      tips: 'Great for showing your youthful energy and optimism'
    }
  ];

  // Get current style slide options (4 styles per slide)
  const getCurrentStyleSlideOptions = () => {
    const startIndex = currentStyleSlide * 4;
    const endIndex = startIndex + 4;
    return styleOptions.slice(startIndex, endIndex);
  };

  // All scenes data (100 total scenes)
  const allScenes = [
    // Slide 1 (Scenes 1-12)
    { id: 1, name: 'Studio', emoji: '📸', description: 'Professional lighting setup with clean backgrounds' },
    { id: 2, name: 'Gym', emoji: '💪', description: 'Dynamic fitness environment with energy' },
    { id: 3, name: 'Club', emoji: '🕺', description: 'Vibrant nightlife atmosphere with mood lighting' },
    { id: 4, name: 'Beach', emoji: '🏖️', description: 'Natural outdoor lighting with scenic backgrounds' },
    { id: 5, name: 'Office', emoji: '💼', description: 'Professional work environment with natural light' },
    { id: 6, name: 'Coffee Shop', emoji: '☕', description: 'Cozy, intimate setting with warm lighting' },
    { id: 7, name: 'Park', emoji: '🌳', description: 'Natural outdoor setting with greenery' },
    { id: 8, name: 'Rooftop', emoji: '🏢', description: 'Urban sophistication with city views' },
    { id: 9, name: 'Bar', emoji: '🍸', description: 'Sophisticated social atmosphere' },
    { id: 10, name: 'Restaurant', emoji: '🍽️', description: 'Elegant dining environment' },
    { id: 11, name: 'Library', emoji: '📚', description: 'Quiet, intellectual setting' },
    { id: 12, name: 'Museum', emoji: '🏛️', description: 'Cultural and artistic backdrop' },

    // Slide 2 (Scenes 13-24)
    { id: 13, name: 'Airport', emoji: '✈️', description: 'Travel and adventure vibes' },
    { id: 14, name: 'Hotel', emoji: '🏨', description: 'Luxury and comfort setting' },
    { id: 15, name: 'Pool', emoji: '🏊', description: 'Refreshing aquatic environment' },
    { id: 16, name: 'Spa', emoji: '🧖', description: 'Relaxing wellness atmosphere' },
    { id: 17, name: 'Yoga Studio', emoji: '🧘', description: 'Mindful and peaceful setting' },
    { id: 18, name: 'Tennis Court', emoji: '🎾', description: 'Active sports environment' },
    { id: 19, name: 'Golf Course', emoji: '⛳', description: 'Sophisticated outdoor setting' },
    { id: 20, name: 'Basketball Court', emoji: '🏀', description: 'Dynamic sports atmosphere' },
    { id: 21, name: 'Soccer Field', emoji: '⚽', description: 'Team sports environment' },
    { id: 22, name: 'Boxing Ring', emoji: '🥊', description: 'Intense athletic setting' },
    { id: 23, name: 'Rock Climbing', emoji: '🧗', description: 'Adventure and challenge' },
    { id: 24, name: 'Surfing', emoji: '🏄', description: 'Ocean adventure vibes' },

    // Slide 3 (Scenes 25-36)
    { id: 25, name: 'Skiing', emoji: '⛷️', description: 'Winter sports excitement' },
    { id: 26, name: 'Snowboarding', emoji: '🏂', description: 'Cool winter vibes' },
    { id: 27, name: 'Hiking', emoji: '🥾', description: 'Nature exploration' },
    { id: 28, name: 'Camping', emoji: '⛺', description: 'Outdoor adventure setting' },
    { id: 29, name: 'Fishing', emoji: '🎣', description: 'Peaceful outdoor activity' },
    { id: 30, name: 'Boating', emoji: '🚤', description: 'Water adventure vibes' },
    { id: 31, name: 'Sailing', emoji: '⛵', description: 'Nautical sophistication' },
    { id: 32, name: 'Scuba Diving', emoji: '🤿', description: 'Underwater exploration' },
    { id: 33, name: 'Paragliding', emoji: '🪂', description: 'Sky adventure vibes' },
    { id: 34, name: 'Skydiving', emoji: '🪂', description: 'Extreme adventure' },
    { id: 35, name: 'Bungee Jumping', emoji: '🦘', description: 'Thrill-seeking energy' },
    { id: 36, name: 'Zip Lining', emoji: '🦅', description: 'Aerial adventure' },

    // Slide 4 (Scenes 37-48)
    { id: 37, name: 'Motorcycle', emoji: '🏍️', description: 'Rebel and freedom vibes' },
    { id: 38, name: 'Sports Car', emoji: '🏎️', description: 'Luxury and speed' },
    { id: 39, name: 'Luxury Car', emoji: '🚗', description: 'Sophisticated transportation' },
    { id: 40, name: 'Helicopter', emoji: '🚁', description: 'High-flying luxury' },
    { id: 41, name: 'Private Jet', emoji: '✈️', description: 'Ultimate luxury travel' },
    { id: 42, name: 'Yacht', emoji: '🛥️', description: 'Maritime luxury' },
    { id: 43, name: 'Penthouse', emoji: '🏠', description: 'Urban luxury living' },
    { id: 44, name: 'Mansion', emoji: '🏰', description: 'Elegant estate setting' },
    { id: 45, name: 'Castle', emoji: '🏰', description: 'Royal and majestic' },
    { id: 46, name: 'Villa', emoji: '🏡', description: 'Mediterranean luxury' },
    { id: 47, name: 'Cabin', emoji: '🏕️', description: 'Cozy mountain retreat' },
    { id: 48, name: 'Treehouse', emoji: '🌳', description: 'Unique nature dwelling' },

    // Slide 5 (Scenes 49-60)
    { id: 49, name: 'Art Gallery', emoji: '🎨', description: 'Creative and cultural' },
    { id: 50, name: 'Concert Hall', emoji: '🎭', description: 'Musical sophistication' },
    { id: 51, name: 'Theater', emoji: '🎪', description: 'Dramatic performance setting' },
    { id: 52, name: 'Jazz Club', emoji: '🎷', description: 'Smooth musical vibes' },
    { id: 53, name: 'Rock Concert', emoji: '🎸', description: 'High energy music' },
    { id: 54, name: 'Festival', emoji: '🎪', description: 'Celebratory atmosphere' },
    { id: 55, name: 'Wedding', emoji: '💒', description: 'Romantic celebration' },
    { id: 56, name: 'Birthday Party', emoji: '🎂', description: 'Fun celebration vibes' },
    { id: 57, name: 'Graduation', emoji: '🎓', description: 'Academic achievement' },
    { id: 58, name: 'Award Ceremony', emoji: '🏆', description: 'Recognition and success' },
    { id: 59, name: 'Press Conference', emoji: '📰', description: 'Professional media setting' },
    { id: 60, name: 'Interview', emoji: '🎤', description: 'Professional communication' },

    // Slide 6 (Scenes 61-72)
    { id: 61, name: 'Photoshoot', emoji: '📷', description: 'Professional photography' },
    { id: 62, name: 'Fashion Show', emoji: '👗', description: 'Style and runway' },
    { id: 63, name: 'Modeling', emoji: '💃', description: 'Fashion and beauty' },
    { id: 64, name: 'Acting', emoji: '🎬', description: 'Dramatic performance' },
    { id: 65, name: 'Dancing', emoji: '💃', description: 'Rhythmic movement' },
    { id: 66, name: 'Singing', emoji: '🎤', description: 'Musical performance' },
    { id: 67, name: 'Painting', emoji: '🎨', description: 'Creative expression' },
    { id: 68, name: 'Sculpting', emoji: '🗿', description: 'Artistic creation' },
    { id: 69, name: 'Pottery', emoji: '🏺', description: 'Handcrafted art' },
    { id: 70, name: 'Woodworking', emoji: '🪵', description: 'Craftsmanship' },
    { id: 71, name: 'Cooking', emoji: '👨‍🍳', description: 'Culinary arts' },
    { id: 72, name: 'Baking', emoji: '🍰', description: 'Sweet culinary creation' },

    // Slide 7 (Scenes 73-84)
    { id: 73, name: 'Gardening', emoji: '🌱', description: 'Natural growth and care' },
    { id: 74, name: 'Farming', emoji: '🚜', description: 'Agricultural setting' },
    { id: 75, name: 'Vineyard', emoji: '🍇', description: 'Wine country elegance' },
    { id: 76, name: 'Orchard', emoji: '🍎', description: 'Fruit tree setting' },
    { id: 77, name: 'Greenhouse', emoji: '🌿', description: 'Controlled growing environment' },
    { id: 78, name: 'Botanical Garden', emoji: '🌸', description: 'Natural beauty' },
    { id: 79, name: 'Desert', emoji: '🏜️', description: 'Arid landscape' },
    { id: 80, name: 'Mountain', emoji: '⛰️', description: 'High altitude setting' },
    { id: 81, name: 'Volcano', emoji: '🌋', description: 'Dramatic natural setting' },
    { id: 82, name: 'Waterfall', emoji: '🌊', description: 'Flowing water beauty' },
    { id: 83, name: 'Canyon', emoji: '🏞️', description: 'Deep natural formation' },
    { id: 84, name: 'Cave', emoji: '🕳️', description: 'Underground exploration' },

    // Slide 8 (Scenes 85-96)
    { id: 85, name: 'Space', emoji: '🚀', description: 'Cosmic adventure' },
    { id: 86, name: 'Underwater', emoji: '🐠', description: 'Marine exploration' },
    { id: 87, name: 'Jungle', emoji: '🌴', description: 'Tropical wilderness' },
    { id: 88, name: 'Arctic', emoji: '🧊', description: 'Frozen landscape' },
    { id: 89, name: 'Savanna', emoji: '🦁', description: 'Wildlife setting' },
    { id: 90, name: 'Rainforest', emoji: '🌧️', description: 'Lush tropical environment' },
    { id: 91, name: 'Tundra', emoji: '❄️', description: 'Cold open landscape' },
    { id: 92, name: 'Swamp', emoji: '🐸', description: 'Wetland environment' },
    { id: 93, name: 'Reef', emoji: '🐠', description: 'Coral marine setting' },
    { id: 94, name: 'Island', emoji: '🏝️', description: 'Tropical paradise' },
    { id: 95, name: 'Lagoon', emoji: '🏖️', description: 'Peaceful water setting' },
    { id: 96, name: 'Fjord', emoji: '🏔️', description: 'Scenic waterway' },

    // Slide 9 (Scenes 97-100) - Final 4 scenes
    { id: 97, name: 'Aurora', emoji: '🌌', description: 'Northern lights magic' },
    { id: 98, name: 'Meteor Shower', emoji: '☄️', description: 'Celestial event' },
    { id: 99, name: 'Solar Eclipse', emoji: '🌑', description: 'Rare astronomical event' },
    { id: 100, name: 'Rainbow', emoji: '🌈', description: 'Colorful natural wonder' }
  ];

  // Get current slide scenes (12 scenes per slide, except last slide with 4)
  const getCurrentSlideScenes = () => {
    const startIndex = currentSlide * 12;
    const endIndex = currentSlide === 8 ? startIndex + 4 : startIndex + 12; // Last slide has 4 scenes
    return allScenes.slice(startIndex, endIndex);
  };

  // Time of day options with enhanced information
  const timeOfDayOptions = [
    { 
      name: 'Morning', 
      emoji: '🌅',
      description: 'Soft, warm lighting with natural glow',
      bestFor: 'Fresh, optimistic profiles',
      tips: 'Morning light creates a fresh and optimistic mood'
    },
    { 
      name: 'Afternoon', 
      emoji: '☀️',
      description: 'Bright, natural daylight with clarity',
      bestFor: 'Clear, confident profiles',
      tips: 'Afternoon sun provides the most natural and clear lighting'
    },
    { 
      name: 'Evening', 
      emoji: '🌆',
      description: 'Golden hour lighting with warm tones',
      bestFor: 'Romantic, intimate profiles',
      tips: 'Golden hour creates the most flattering and romantic lighting'
    },
    { 
      name: 'Night', 
      emoji: '🌙',
      description: 'Moody, atmospheric lighting with drama',
      bestFor: 'Mysterious, sophisticated profiles',
      tips: 'Night lighting adds drama and sophistication to your photos'
    }
  ];

  // Upload method information
  const uploadMethodInfo = {
    manual: {
      title: 'Manual Upload',
      description: 'Upload photos directly from your device',
      bestFor: 'Quick uploads, existing photos',
      tips: 'Ensure your photo is high quality and well-lit for best results'
    },
    qr: {
      title: 'QR Code Scan',
      description: 'Take photos with your phone and sync instantly',
      bestFor: 'Fresh photos, mobile convenience',
      tips: 'Use your phone camera for better control and immediate results'
    }
  };

  // Helper function to get current selection info
  const getCurrentSelectionInfo = () => {
    const currentStyle = styleOptions.find(style => style.name === selectedStyle);
    const currentScene = getCurrentSlideScenes().find(scene => scene.name === selectedScene);
    const currentTime = timeOfDayOptions.find(time => time.name === selectedTimeOfDay);
    const currentUpload = uploadMethodInfo[uploadMethod as keyof typeof uploadMethodInfo];

    return {
      style: currentStyle,
      scene: currentScene,
      time: currentTime,
      upload: currentUpload
    };
  };

  const currentInfo = getCurrentSelectionInfo();

  // Mock photo data
  const mockPhotos = [
    { id: 1, src: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", liked: true },
    { id: 2, src: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg", liked: false },
    { id: 3, src: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg", liked: true },
    { id: 4, src: "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg", liked: false },
    { id: 5, src: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg", liked: true },
    { id: 6, src: "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg", liked: false },
    { id: 7, src: "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg", liked: true },
    { id: 8, src: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", liked: false },
    { id: 9, src: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg", liked: true },
  ];

  // Store products
  const storeProducts = [
    {
      id: 1,
      name: "Nightlife Collection",
      photoCount: 12,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "for dating apps and social",
      scenes: ["Club", "Bar", "Rooftop", "Street"]
    },
    {
      id: 2,
      name: "Gym & Fitness",
      photoCount: 8,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "Show off your gains and",
      scenes: ["Gym", "Mirror", "Outdoor", "Studio"]
    },
    {
      id: 3,
      name: "Travel Vibes",
      photoCount: 15,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "From beaches to cityscapes",
      scenes: ["Beach", "City", "Mountains", "Cafe"]
    },
    {
      id: 4,
      name: "Business Professional",
      photoCount: 10,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "Perfect for LinkedIn and job",
      scenes: ["Office", "Meeting", "Coffee Shop",]
    },
    {
      id: 5,
      name: "Lifestyle Mix",
      photoCount: 20,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "Versatile collection for all",
      scenes: ["Studio", "Outdoor", "Indoor", "Social"]
    },
    {
      id: 6,
      name: "Premium Collection",
      photoCount: 25,
      price: 5.99,
      originalPrice: null,
      savings: "New",
      description: "Our most comprehensive pack",
      scenes: ["All scenes included", "Custom requests"]
    }
  ];

  const handleBuyPack = (packId: number) => {
    const pack = storeProducts.find(p => p.id === packId);
    if (pack) {
      setSelectedPack({
        id: pack.id,
        name: pack.name,
        price: pack.price
      });
      setIsPaymentModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedPack) {
      console.log(`Payment confirmed for ${selectedPack.name} pack`);
      // Add your payment confirmation logic here
      // This could include adding the pack to user's account
    }
  };

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        backgroundImage: 'url("/Dash-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Premium Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 backdrop-blur-md bg-white/5 border-r border-white/10 z-20 shadow-2xl">
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              FinstaCam
            </h1>
          </div>
          
          {/* Credits Display */}
          <div className="mb-8 p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl h-11 font-medium"
              onClick={() => navigate('/store')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Buy More Credits
            </Button>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-[52px] rounded-xl text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
              onClick={() => navigate('/style-profile')}
            >
              <Palette className="w-5 h-5 mr-3" />
              Style Profile Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-[52px] rounded-xl text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
              onClick={() => navigate('/account-settings')}
            >
              <User className="w-5 h-5 mr-3" />
              Account Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-[52px] rounded-xl text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
              onClick={() => navigate('/photo-dumps')}
            >
              <Album className="w-5 h-5 mr-3" />
              My Photo Dumps
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-[52px] rounded-xl text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
              onClick={() => {
                navigate('/store');
                setTimeout(() => {
                  const section = document.getElementById('photo-dump-packs');
                  if (section) {
                    const offset = 100; // Offset to show the title
                    const elementPosition = section.offsetTop - offset;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Buy Packs
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-[52px] rounded-xl text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
              onClick={() => navigate('/upgrade-plan')}
            >
              <Crown className="w-5 h-5 mr-3" />
              Upgrade Plan
            </Button>
          </div>

          {/* Credit Balance at Bottom */}
          <div className="mt-auto pt-8">
            <div className="text-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-white/70 text-xs">Credit Balance</p>
              <p className="text-white text-lg font-semibold">{userStats.credits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Welcome Message for New Users */}
          {isNewUser && (
            <div className="mb-8 backdrop-blur-md bg-gradient-to-r from-yellow-400/20 via-orange-500/20 via-pink-500/20 to-purple-600/20 border border-white/20 shadow-2xl rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">Welcome to FinstaCam! 🎉</h2>
                  <p className="text-white/80">
                    Your account is all set up! You now have access to generate your first 4 free AI selfies. 
                    Start by uploading a photo and choosing your preferred style and scene.
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/upgrade-plan')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl"
                >
                  Upgrade
                </Button>
              </div>
            </div>
          )}

          {/* Instagram-style Profile Header */}
          <div className="flex items-center space-x-12 mb-12 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <div className="relative group cursor-pointer" onClick={() => console.log('Edit profile picture')}>
              <Avatar className="w-40 h-40 ring-4 ring-white shadow-2xl group-hover:ring-purple-400 transition-all duration-300">
                <AvatarImage src="/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">AI</AvatarFallback>
              </Avatar>
              {/* Edit overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-6 mb-6">
                {isEditingUsername ? (
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setUsername(tempUsername);
                        setIsEditingUsername(false);
                      }
                    }}
                    className="text-3xl font-light text-white bg-transparent border-b-2 border-white/30 focus:outline-none focus:border-white w-auto min-w-0 max-w-none"
                    style={{ width: `${username.length + 2}ch` }}
                    autoFocus
                  />
                ) : (
                  <h1 className="text-3xl font-light text-white">{username}</h1>
                )}
                <Button 
                  onClick={() => {
                    if (isEditingUsername) {
                      setUsername(tempUsername);
                      setIsEditingUsername(false);
                    } else {
                      setTempUsername(username);
                      setIsEditingUsername(true);
                    }
                  }}
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-8"
                >
                  {isEditingUsername ? 'Save' : 'Edit Username'}
                </Button>
                <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-8">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-8"
                  onClick={() => navigate('/store')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Store
                </Button>
              </div>
              
              <div className="flex space-x-12 mb-6">
                <div className="text-center">
                  <span className="text-2xl font-semibold text-white">{userStats.generated}</span>
                  <span className="text-gray-500 ml-2 block text-sm">My Content</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-white">{userStats.followers}</span>
                  <span className="text-gray-500 ml-2 block text-sm">Packs Collected</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-white">{userStats.following}</span>
                  <span className="text-gray-500 ml-2 block text-sm">Credit Balance</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 px-3 py-1">
                  LURKER PLAN
                </Badge>
              </div>
            </div>
          </div>

          {/* Instagram-style Tabs */}
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl h-14 p-2 mb-8 relative z-10">
              <TabsTrigger 
                value="generator" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Bot className="w-5 h-5" />
                <span className="font-medium">GENERATE</span>
              </TabsTrigger>
              <TabsTrigger 
                value="my-photos" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">MY CONTENT</span>
              </TabsTrigger>
              <TabsTrigger 
                value="store" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Store className="w-5 h-5" />
                <span className="font-medium">FOR YOU</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="mt-0">
              {/* Generator Section */}
              <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
                <div className="space-y-6">
                  {/* Scene Presets with Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-white">Scene Preset</label>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={prevSlide}
                            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                          >
                            ←
                          </Button>
                          <div className="flex gap-1">
                            {Array.from({ length: 9 }, (_, i) => (
                              <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  currentSlide === i 
                                    ? 'bg-white' 
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                          <Button
                            onClick={nextSlide}
                            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                          >
                            →
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {getCurrentSlideScenes().map((scene) => (
                          <Button
                            key={scene.name}
                            variant={selectedScene === scene.name ? 'default' : 'outline'}
                            onClick={() => setSelectedScene(scene.name)}
                            className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 relative z-10 ${
                              selectedScene === scene.name 
                                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                            }`}
                          >
                            <span className="text-lg">{scene.emoji}</span>
                            <span>{scene.name}</span>
                          </Button>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs text-white/70">
                        <span>Slide {currentSlide + 1} of 9</span>
                        <span>{getCurrentSlideScenes().length} scenes</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/30 h-fit mt-12">
                      <div className="flex items-center gap-2 mb-1">
                        <img src="/scene-icon.png" alt="Scene" className="w-11 h-11" />
                        <h5 className="font-semibold text-black text-lg">Choose Your Scene</h5>
                      </div>
                      <p className="text-s text-black">Set the scene for your photo. Choose from over 100 unique environments designed to look real and hit on social media.</p>
                    </div>
                  </div>

                  {/* Time of Day with Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-white mb-3">Time of Day</label>
                      <div className="grid grid-cols-4 gap-3">
                        {timeOfDayOptions.map((timeOption) => (
                          <Button
                            key={timeOption.name}
                            variant={selectedTimeOfDay === timeOption.name ? 'default' : 'outline'}
                            onClick={() => setSelectedTimeOfDay(timeOption.name)}
                            className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 relative z-10 ${
                              selectedTimeOfDay === timeOption.name 
                                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                            }`}
                          >
                            <span className="text-lg">{timeOption.emoji}</span>
                            <span>{timeOption.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/30">
                      <div className="flex items-center gap-2 mb-1">
                      <img src="/sun-icon.png" alt="Scene" className="w-11 h-11" />
                      <h5 className="font-semibold text-black text-lg">Choose The Time</h5>
                      </div>
                      <p className="text-s text-black">Pick when your shot takes place. Morning, afternoon, or night lighting changes everything.</p>
                    </div>
                  </div>

                  {/* Style Selector with Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-white">Choose Your Look</label>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={prevStyleSlide}
                            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                          >
                            ←
                          </Button>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <button
                                key={i}
                                onClick={() => goToStyleSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  currentStyleSlide === i 
                                    ? 'bg-white' 
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                          <Button
                            onClick={nextStyleSlide}
                            className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                          >
                            →
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {getCurrentStyleSlideOptions().map((style) => (
                          <Button
                            key={style.name}
                            variant={selectedStyle === style.name ? 'default' : 'outline'}
                            onClick={() => setSelectedStyle(style.name)}
                            className={`h-8 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${
                              selectedStyle === style.name 
                                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                            }`}
                          >
                            {style.name}
                          </Button>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs text-white/70">
                        <span>Slide {currentStyleSlide + 1} of 5</span>
                        <span>{getCurrentStyleSlideOptions().length} styles</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/30">
                      <div className="flex items-center gap-2 mb-1">
                        <img src="/barber-icon.png" alt="Style" className="w-11 h-11" />
                        <h5 className="font-semibold text-black text-lg">What's the Hair Vibe?</h5>
                      </div>
                      <p className="text-s text-black">Select a hairstyle that fits your vibe. We'll generate the same look, no barber needed.</p>
                    </div>
                  </div>

                  {/* Upload Section with Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-white mb-3">Upload Your Face</label>
                      
                      {/* Upload Method Toggle */}
                      <div className="flex space-x-2 mb-4">
                        <Button
                          variant={uploadMethod === 'manual' ? 'default' : 'outline'}
                          onClick={() => setUploadMethod('manual')}
                          className={`flex-1 h-10 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${
                            uploadMethod === 'manual' 
                              ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                              : 'border-gray-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                          }`}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <Button
                          variant={uploadMethod === 'qr' ? 'default' : 'outline'}
                          onClick={() => setUploadMethod('qr')}
                          className={`flex-1 h-10 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${
                            uploadMethod === 'qr' 
                              ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                              : 'border-gray-300 hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                          }`}
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Scan QR
                        </Button>
                      </div>

                      {uploadMethod === 'manual' ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                          <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-700 font-medium">Scan QR code with your phone</p>
                          <p className="text-gray-500 text-sm mt-1">Take a photo and it will sync automatically</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/30">
                      <div className="flex items-center gap-2 mb-1">
                        <img src="/self-icon.png" alt="Upload" className="w-11 h-11" />
                        <h5 className="font-semibold text-black text-l">Upload or Scan Your Face</h5>
                      </div>
                      <p className="text-s text-black">Upload a well-lit, front-facing selfie or scan your face using your phone. <br></br><br></br>For the best results, scan the QR code to use our face scan tool and follow the on-screen instructions carefully.</p>
                    </div>
                  </div>

                  {/* Style Prompt with Instructions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-white mb-3">Customize Your Drip</label>
                      <textarea
                        className="w-full bg-white/80 border border-gray-300 rounded-2xl p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="Describe additional style details..."
                      />
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/30">
                      <div className="flex items-center gap-2 mb-1">
                        <img src="/style-icon.png" alt="Style Prompt" className="w-11 h-11" />
                        <h5 className="font-semibold text-black text-l">Build Your Aesthetic</h5>
                      </div>
                      <p className="text-s text-black">List anything you want in the shot. Outfits, chains, pets, cars, accessories, Add it here.</p>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button className="w-64 mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Magic (5 Credits)
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="my-photos" className="mt-0">
              {/* My Photos Grid - Instagram Reels style */}
              <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
                {mockPhotos.map((photo) => (
                  <div key={photo.id} className="relative aspect-square group overflow-hidden bg-white">
                    <img
                      src={photo.src}
                      alt={`Photo ${photo.id}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Hover overlay with glass effect */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4 z-10">
                      <Button
                        size="icon"
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12 relative z-20"
                        onClick={() => console.log(`View photo ${photo.id}`)}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12 relative z-20"
                        onClick={() => console.log(`Download photo ${photo.id}`)}
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12 relative z-20"
                        onClick={() => console.log(`Delete photo ${photo.id}`)}
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="store" className="mt-0">
              {/* Store Products - Instagram Tagged style */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeProducts.map((pack) => (
                  <Card 
                    key={pack.id} 
                    className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl"
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
                            <p className="text-white/70 text-sm">{pack.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Thumbnail Container */}
                      <div className="mb-4">
                        <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Package className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scenes */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {pack.scenes.slice(0, 3).map((scene, index) => (
                            <Badge key={index} className="bg-white/5 backdrop-blur-md text-white/70 border border-white/10 px-2 py-1 text-xs hover:bg-white/5">
                              {scene}
                            </Badge>
                          ))}
                          {pack.scenes.length > 3 && (
                            <Badge className="bg-white/5 backdrop-blur-md text-white/70 border border-white/10 px-2 py-1 text-xs hover:bg-white/5">
                              +{pack.scenes.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">${pack.price}</span>
                          {pack.originalPrice && (
                            <span className="text-white/50 line-through">${pack.originalPrice}</span>
                          )}
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 text-xs hover:bg-green-500/20">
                          {pack.savings}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0">
                      <Button
                        onClick={() => handleBuyPack(pack.id)}
                        className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl h-10 font-medium"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Pack
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPack && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          planName={selectedPack.name}
          planPrice={selectedPack.price.toString()}
          onConfirmPayment={handleConfirmPayment}
        />
      )}

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <WelcomePopup
          isOpen={showWelcomePopup}
          onClose={handleWelcomePopupClose}
          onUpgrade={handleWelcomePopupUpgrade}
        />
      )}
    </div>
  );
};

export default Dashboard;
