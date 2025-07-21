import { useState, useEffect } from "react";
import { Camera, ShoppingBag, Plus, Heart, Search, Bot, Download, QrCode, Store, Trash, Eye, Share, CreditCard, User, Palette, Sparkles, Zap, Crown, Album, Package, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";
import WelcomePopup from "@/components/WelcomePopup";
import { useUser } from "@/contexts/UserContext";
import QRCode from 'react-qr-code';
import { io, Socket } from 'socket.io-client';

// Use production URLs for HTTPS camera access
const MOBILE_URL = 'https://fc2025.onrender.com/mobile';
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'https://fc2025.onrender.com';

// Option to disable socket connection for debugging
const DISABLE_SOCKET = false; // Set to true to disable socket connection

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

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

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

  // QR code & socket state
  const [qrConnectionStatus, setQrConnectionStatus] = useState<'disconnected' | 'connected' | 'connecting'>('connecting');
  const [qrImages, setQrImages] = useState<Array<{ id: string; imageData: string; timestamp: string }>>([]);
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  // Image generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{ id: string; imageUrl: string; sceneName: string; timestamp: string }>>([]);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [hasNewContent, setHasNewContent] = useState(false);

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

  // File upload handlers
  const handleFileUpload = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleContainerClick = () => {
    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedFile(null);
    setUploadedImageUrl(null);
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
    { id: 1, name: 'Library', emoji: '📚', description: 'A2,D2 on google sheet/LURKER' },
    { id: 2, name: 'Gym', emoji: '💪', description: 'A3,D3 on google sheet/LURKER' },
    { id: 3, name: 'Bar Bathroom', emoji: '🚹', description: 'A4,D4 on google sheet/LURKER' },
    { id: 4, name: 'College Dorm', emoji: '🏫', description: 'A5,D5 on google sheet/LURKER' },
    { id: 5, name: 'Shopping Mall', emoji: '🛍️', description: 'A6,D6 on google sheet/LURKER' },
    { id: 6, name: 'Bedroom', emoji: '🛏️', description: 'A7,D7 on google sheet/LURKER' },
    { id: 7, name: 'Carnival', emoji: '🎡', description: 'A8,D8 on google sheet/FF' },
    { id: 8, name: 'Frat Party', emoji: '🍻', description: 'A9,D9 on google sheet/FF' },
    { id: 9, name: 'Gas Station', emoji: '⛽', description: 'A10,D10 on google sheet/FF' },
    { id: 10, name: 'Inside Car', emoji: '🚗', description: 'A11,D11 on google sheet/FF' },
    { id: 11, name: 'Nightclub', emoji: '🕺', description: 'A12,D12 on google sheet/FF' },
    { id: 12, name: 'Hiking Trail', emoji: '🏔️', description: 'A13,D13 on google sheet/FF' },

    // Slide 2 (Scenes 13-24)
    { id: 13, name: 'Off Roading', emoji: '🏍️', description: 'A14,D14 on google sheet/FF' },
    { id: 14, name: 'Working Out', emoji: '🏋️', description: 'A15,D15 on google sheet/FF' },
    { id: 15, name: 'Condo Balcony', emoji: '🏢', description: 'A16,D16 on google sheet/FF' },
    { id: 16, name: 'Vacation Airbnb', emoji: '🏰', description: 'A17,D17 on google sheet/FF' },
    { id: 17, name: 'Dog Park', emoji: '🐕', description: 'A18,D18 on google sheet/FF' },
    { id: 18, name: 'Ski Resort', emoji: '⛷️', description: 'A19,D19 on google sheet/FF' },
    { id: 19, name: 'Firework Show', emoji: '🎆', description: 'A20,D20 on google sheet/FF' },
    { id: 20, name: 'Airbnb Party', emoji: '✈️', description: 'A21,D21 on google sheet/FF' },
    { id: 21, name: 'NYC Corner Store', emoji: '🏪', description: 'A22,D22 on google sheet/FF' }, 
    { id: 22, name: 'Airport Terminal', emoji: '✈️', description: 'A23,D23 on google sheet/FF' },
    { id: 23, name: 'Beach Bonfire', emoji: '🔥', description: 'A24,D24 on google sheet/FF' },
    { id: 24, name: 'Sneaker Store', emoji: '👟', description: 'A25,D25 on google sheet/FF' },

    // Slide 3 (Scenes 25-36)
    { id: 25, name: 'City Walk', emoji: '🚶', description: 'A26,D26 on google sheet/FF' },
    { id: 26, name: 'Group Brunch', emoji: '🍳', description: 'A27,D27 on google sheet/FF' },
    { id: 27, name: 'Rooftop  Pool', emoji: '🏊', description: 'A28,D28 on google sheet/FF' },
    { id: 28, name: 'Highrise Condo', emoji: '🏙️', description: 'A29,D29 on google sheet/FF' },
    { id: 29, name: 'Equinox Gym', emoji: '🏋️‍♂️', description: 'A30,D30 on google sheet/FF' },
    { id: 30, name: 'Rooftop Dinner', emoji: '🍽️', description: 'A31,D31 on google sheet/FF' },
    { id: 31, name: 'Beach Selfie', emoji: '🏖️', description: 'A32,D32 on google sheet/FF' },
    { id: 32, name: 'Smoking at Party', emoji: '🚬', description: 'A33,D33 on google sheet/FF' },
    { id: 33, name: 'Coffee Shop', emoji: '☕', description: 'A34,D34 on google sheet/FF' },
    { id: 34, name: 'Sports Bar', emoji: '🏈', description: 'A35,D35 on google sheet/FF' },
    { id: 35, name: 'Mall Food Court', emoji: '🌭', description: 'A36,D36 on google sheet/FF' },
    { id: 36, name: 'Concert Venue', emoji: '🎵', description: 'A37,D37 on google sheet/FF' },

    // Slide 4 (Scenes 37-48)
    { id: 37, name: 'City Patio', emoji: '🌆', description: 'A38,D38 on google sheet/PO' },
    { id: 38, name: 'On a Yacht', emoji: '🛥️', description: 'A39,D39 on google sheet/PO' },
    { id: 39, name: 'Europe Scenery', emoji: '⛲', description: 'A40,D40 on google sheet/PO' },
    { id: 40, name: 'Wonder Of The World', emoji: '🗽', description: 'A41,D41 on google sheet/PO' },
    { id: 41, name: 'With The Boys', emoji: '👥', description: 'A42,D42 on google sheet/PO' },
    { id: 42, name: 'Central Park', emoji: '🌳', description: 'A43,D43 on google sheet/PO' },
    { id: 43, name: 'Hotel Balcony', emoji: '🏨', description: 'A44,D44 on google sheet/PO' },
    { id: 44, name: 'Designer District', emoji: '👔', description: 'A45,D45 on google sheet/PO' },
    { id: 45, name: 'BBQ Cook Out', emoji: '🍖', description: 'A46,D46 on google sheet/PO' },
    { id: 46, name: 'Fitting Room', emoji: '👕', description: 'A47,D47 on google sheet/PO' },
    { id: 47, name: 'Food Festival', emoji: '🍧', description: 'A48,D48 on google sheet/PO' },
    { id: 48, name: 'Airport Bathroom', emoji: '🚽', description: 'A49,D49 on google sheet/PO' },

    // Slide 5 (Scenes 49-60)
    { id: 49, name: 'Condo Mirror Selfie', emoji: '🪞', description: 'A50,D50 on google sheet/CC' },
    { id: 50, name: 'Luxury Resturant', emoji: '🍷', description: 'A51,D51 on google sheet/CC' },
    { id: 51, name: 'Soccer Training', emoji: '⚽', description: 'A52,D52 on google sheet/CC' },
    { id: 52, name: 'Basketball Training', emoji: '🏀', description: 'A53,D53 on google sheet/CC' },
    { id: 53, name: 'Strip Club', emoji: '💃', description: 'A54,D54 on google sheet/CC' },
    { id: 54, name: 'Private Jet', emoji: '🛫', description: 'A55,D55 on google sheet/CC' },
    { id: 55, name: 'Golf Course', emoji: '⛳', description: 'A56,D56 on google sheet/CC' },
    { id: 56, name: 'On Jetski', emoji: '🚤', description: 'A57,D57 on google sheet/CC' },
    { id: 57, name: 'Art Gallery', emoji: '🖼️', description: 'A58,D58 on google sheet/PO' },
    { id: 58, name: 'Museum', emoji: '🏛️', description: 'A59,D59 on google sheet/PO' },
    { id: 59, name: 'Delta Flight', emoji: '💺', description: 'A60,D60 on google sheet/PO' },
    { id: 60, name: 'xxxx', emoji: '🎤', description: 'A61,D61 on google sheet/PO' },

    // Slide 6 (Scenes 61-72)
    { id: 61, name: 'Movie Theater', emoji: '🎬', description: 'A62,D62 on google sheet/PO' },
    { id: 62, name: 'Lecture Hall', emoji: '👨‍🏫', description: 'A63,D63 on google sheet/PO' },
    { id: 63, name: 'Clothing Store', emoji: '🛒', description: 'A64,D64 on google sheet/PO' },
    { id: 64, name: 'Parking lot ', emoji: '🅿️', description: 'A65,D65 on google sheet/PO' },
    { id: 65, name: 'Street Art Mural', emoji: '🎨', description: 'A66,D66 on google sheet/PO' },
    { id: 66, name: 'Fast Food Store', emoji: '🍔', description: 'A67,D67 on google sheet/PO' },
    { id: 67, name: 'Riding in Uber', emoji: '🚕', description: 'A68,D68 on google sheet/PO' },
    { id: 68, name: 'Apartment Kitchen', emoji: '🧑‍🍳', description: 'A69,D69 on google sheet/PO' },
    { id: 69, name: 'Gym Progress', emoji: '🧍‍♂️', description: 'A70,D70 on google sheet/PO' },
    { id: 70, name: 'Luxury Hotel', emoji: '🏩', description: 'A71,D71 on google sheet/CC' },
    { id: 71, name: 'Cliff Side View', emoji: '⛰️', description: 'A72,D72 on google sheet/CC' },
    { id: 72, name: 'Helicopter Ride', emoji: '🚁', description: 'A73,D73 on google sheet/CC' },

    // Slide 7 (Scenes 73-84)
    { id: 73, name: 'Inside Luxury SUV', emoji: '🚙', description: 'A74,D74 on google sheet/CC' },
    { id: 74, name: 'Hotel Bathroom', emoji: '🛁', description: 'A75,D75 on google sheet/CC' },
    { id: 75, name: 'Ski Lodge Cabin', emoji: '🏠', description: 'A76,D76 on google sheet/PO' },
    { id: 76, name: 'Vegas Casino', emoji: '🎰', description: 'A77,D77 on google sheet/CC' },
    { id: 77, name: 'At Barbershop', emoji: '💈', description: 'A78,D78 on google sheet/PO' },
    { id: 78, name: 'Home Gym', emoji: '🏋️‍♀️', description: 'A79,D79 on google sheet/PO' },
    { id: 79, name: 'MMA Gym', emoji: '🥊', description: 'A80,D80 on google sheet/CC' },
    { id: 80, name: 'On a Cruise', emoji: '🛳️', description: 'A81,D81 on google sheet/CC' },
    { id: 81, name: 'Amusement Park', emoji: '🎢', description: 'A82,D82 on google sheet/PO' },
    { id: 82, name: 'Hiking Peak', emoji: '🗻', description: 'A83,D83 on google sheet/CC' },
    { id: 83, name: 'At Mosque', emoji: '🕌', description: 'A84,D84 on google sheet/PO' },
    { id: 84, name: 'Office Job', emoji: '💻', description: 'A85,D85 on google sheet/PO' },

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

  // Image generation functions
  // Get the backend URL from environment or use default
  const getBackendUrl = () => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  };

  const getPromptFromSheet = async (sceneName: string, sceneDescription: string) => {
    try {
      const response = await fetch(`${getBackendUrl()}/api/get-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sceneName,
          sceneDescription
        })
      });

      const data = await response.json();
      if (data.success) {
        return data.prompt;
      } else {
        throw new Error(data.error || 'Failed to fetch prompt');
      }
    } catch (error) {
      console.error('Error fetching prompt:', error);
      throw error;
    }
  };

  const generateImage = async (prompt: string, userImageData: string, sceneName: string) => {
    try {
      const response = await fetch(`${getBackendUrl()}/api/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          userImageData,
          sceneName,
          sceneDescription: getCurrentSlideScenes().find(scene => scene.name === sceneName)?.description
        })
      });

      const data = await response.json();
      if (data.success) {
        // Return the face-swapped URL from the new API response
        return data.faceSwappedUrl || data.imageUrl; // Fallback to imageUrl for backward compatibility
      } else {
        throw new Error(data.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  };

  const handleGenerateImage = async () => {
    // Check if we have the required data
    if (!selectedScene) {
      alert('Please select a scene first');
      return;
    }

    // Set loading state
    setIsGenerating(true);
    setGenerationError(null);

    console.log('Starting image generation flow...');
    console.log('Selected scene:', selectedScene);

    try {
      // Step 1: Get the scene description with coordinates
      const currentScenes = getCurrentSlideScenes();
      const selectedSceneData = currentScenes.find(scene => scene.name === selectedScene);
      
      if (!selectedSceneData) {
        alert('Selected scene not found. Please try selecting a different scene.');
        return;
      }

      console.log('Scene description:', selectedSceneData.description);

      // Step 2: Fetch prompt from Google Sheets using the coordinates
      console.log('Fetching prompt from Google Sheets...');
      const prompt = await getPromptFromSheet(selectedScene, selectedSceneData.description);
      console.log('Retrieved prompt from sheet:', prompt);

      if (!prompt) {
        alert('No prompt found for this scene. Please try a different scene.');
        return;
      }

      // Step 3: Generate image with GPT-IMAGE-1 and perform face swap
      console.log('Generating image with GPT-IMAGE-1 and performing face swap...');
      
      // Check if user has uploaded an image
      if (!uploadedImageUrl) {
        alert('Please upload a photo first before generating an image.');
        return;
      }
      
      // Convert uploaded image to base64 for the API
      const userImageData = uploadedImageUrl; // This should already be a data URL
      const imageUrl = await generateImage(prompt, userImageData, selectedScene);
      console.log('Generated image URL:', imageUrl);

      // Step 4: Add to generated images
      const newImage = {
        id: Date.now().toString(),
        imageUrl,
        sceneName: selectedScene,
        timestamp: new Date().toISOString()
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setHasNewContent(true);
      
      console.log('Image generation completed successfully!');
      setShowSuccessPopup(true);
      
      // Auto-hide success popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error in image generation:', error);
      setGenerationError(error.message);
      alert(`Error generating image: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Setup socket connection for QR tab
  useEffect(() => {
    if (uploadMethod !== 'qr') return;
    
    // Skip socket connection if disabled
    if (DISABLE_SOCKET) {
      console.log('Socket connection disabled for debugging');
      setQrConnectionStatus('disconnected');
      return;
    }
    
    setQrConnectionStatus('connecting');
    
    // Create socket with better error handling and fallback options
    const socket = io(SOCKET_URL, { 
      transports: ['websocket', 'polling'], // Allow fallback to polling
      timeout: 10000, // 10 second timeout
      forceNew: true, // Force new connection
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Try 5 times
      reconnectionDelay: 1000, // Wait 1 second between attempts
    });
    
    setSocketInstance(socket);
    
    // Connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected successfully');
      setQrConnectionStatus('connected');
      socket.emit('desktop-connect');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setQrConnectionStatus('disconnected');
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setQrConnectionStatus('disconnected');
    });
    
    socket.on('reconnect', (attemptNumber) => {
      console.log('Socket reconnected after', attemptNumber, 'attempts');
      setQrConnectionStatus('connected');
      socket.emit('desktop-connect');
    });
    
    socket.on('reconnect_error', (error) => {
      console.error('Socket reconnection error:', error);
      setQrConnectionStatus('disconnected');
    });
    
    // Custom event handlers
    socket.on('connection-status', (data) => {
      setQrConnectionStatus(data.mobileConnected ? 'connected' : 'disconnected');
    });
    
    socket.on('mobile-connected', () => {
      console.log('Mobile device connected');
      setQrConnectionStatus('connected');
    });
    
    socket.on('mobile-disconnected', () => {
      console.log('Mobile device disconnected');
      setQrConnectionStatus('disconnected');
    });
    
    socket.on('new-selfie', (data) => {
      console.log('Received new selfie from mobile');
      setQrImages((prev) => [
        { id: data.id, imageData: data.imageData.imageData, timestamp: data.timestamp },
        ...prev
      ]);
    });
    
    // Cleanup function
    return () => {
      console.log('Cleaning up socket connection');
      if (socket) {
        socket.disconnect();
        setSocketInstance(null);
      }
    };
  }, [uploadMethod]);

  const [expandedImage, setExpandedImage] = useState<null | { imageUrl: string; sceneName: string }>(null);

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
      {/* Top-Right Loading Popup */}
      {isGenerating && (
        <div className="fixed top-8 right-8 z-50 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
            <div>
              <h3 className="text-white font-semibold">Generating Image</h3>
              <p className="text-white/70 text-sm">Please wait while we create your AI masterpiece...</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-8 right-8 z-50 backdrop-blur-md bg-green-500/20 border border-green-400/30 shadow-2xl rounded-2xl p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Image Generated!</h3>
              <p className="text-white/70 text-sm">Your AI masterpiece is ready. Check the "My Content" tab!</p>
            </div>
          </div>
        </div>
      )}
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
                    Your account is all set up! You now have access to generate your first 2 free AI selfies. 
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
                onClick={() => setHasNewContent(false)}
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">MY CONTENT</span>
                {hasNewContent && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                )}
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

                      {/* Hidden file input */}
                      <input
                        id="file-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />

                      {uploadMethod === 'manual' ? (
                        <div 
                          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer bg-gradient-to-br from-purple-50/50 to-pink-50/50 ${
                            isDragOver 
                              ? 'border-purple-400 bg-purple-50/70' 
                              : uploadedImageUrl 
                                ? 'border-gray-300' 
                                : 'border-gray-300 hover:border-purple-400'
                          }`}
                          onClick={handleContainerClick}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {uploadedImageUrl ? (
                            <div className="relative">
                              <img 
                                src={uploadedImageUrl} 
                                alt="Uploaded preview" 
                                className="w-full h-48 object-cover rounded-xl mb-4"
                              />
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveImage();
                                }}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 p-0"
                              >
                                ×
                              </Button>
                              <p className="text-gray-700 font-medium">Click to change photo</p>
                              <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                            </div>
                          ) : (
                            <>
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50/50 to-pink-50/50 flex flex-col items-center justify-center">
                          {/* Connection Status Indicator */}
                          <div className="mb-4 flex items-center justify-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              qrConnectionStatus === 'connected' ? 'bg-green-500' : 
                              qrConnectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                              'bg-red-500'
                            }`}></div>
                            <span className={`text-sm font-medium ${
                              qrConnectionStatus === 'connected' ? 'text-green-600' : 
                              qrConnectionStatus === 'connecting' ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {qrConnectionStatus === 'connected' ? 'Connected' : 
                               qrConnectionStatus === 'connecting' ? 'Connecting...' : 
                               'Disconnected'}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <QRCode value={MOBILE_URL} size={70} />
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold text-lg text-gray-800">Scan with your phone</span>
                          </div>
                          {/* Single image preview */}
                          {qrImages.length > 0 && (
                            <div className="mt-4 w-full">
                              <div className="font-semibold text-sm text-gray-700 mb-2">Received Image</div>
                              <div className="flex justify-center">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                  <img src={qrImages[0].imageData} alt="Selfie" className="w-full h-full object-cover" />
                                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">{new Date(qrImages[0].timestamp).toLocaleTimeString()}</span>
                                </div>
                              </div>
                            </div>
                          )}
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
                      <div className="relative w-full inline-block align-top overflow-hidden rounded-2xl h-32">
                        <textarea
                          className="w-full h-32 bg-white/80 border border-gray-300 rounded-2xl p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                          placeholder="Describe additional style details..."
                          disabled
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-2xl z-10 pointer-events-auto">
                          <div className="flex flex-col items-center w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-white mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 11V7a5 5 0 00-10 0v4M5 11h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" /></svg>
                            <div className="mt-2 text-lg font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                              Upgrade Plan to Gain Access
                            </div>
                          </div>
                        </div>
                      </div>
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
                  <Button 
                    onClick={handleGenerateImage}
                    disabled={isGenerating}
                    className="w-64 mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Magic (5 Credits)
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="my-photos" className="mt-0">
              {generatedImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedImages.map((image) => (
                    <Card 
                      key={image.id} 
                      className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative aspect-square w-full overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={`Generated ${image.sceneName}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Scene name badge */}
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {image.sceneName}
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex items-center justify-between gap-2 p-4">
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-10 h-10"
                          onClick={() => setExpandedImage({ imageUrl: image.imageUrl, sceneName: image.sceneName })}
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-10 h-10"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = image.imageUrl;
                            link.download = `finstacam-${image.sceneName}-${image.id}.jpg`;
                            link.click();
                          }}
                        >
                          <Download className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full w-10 h-10"
                          onClick={() => {
                            setGeneratedImages(prev => prev.filter(img => img.id !== image.id));
                          }}
                        >
                          <Trash className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-white/70">
                  <Sparkles className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Generated Images Yet</h3>
                  <p className="text-center max-w-md">
                    Upload a photo, select a scene, and click "Generate Magic" to create your first AI-generated image!
                  </p>
                </div>
              )}
              {/* Expanded Image Modal */}
              {expandedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg" onClick={() => setExpandedImage(null)}>
                  <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
                    <img
                      src={expandedImage.imageUrl}
                      alt={`Expanded ${expandedImage.sceneName}`}
                      className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/90 transition"
                      onClick={() => setExpandedImage(null)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
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
