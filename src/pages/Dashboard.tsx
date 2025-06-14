import { useState } from "react";
import { Camera, ShoppingBag, Plus, Heart, Search, Bot, Download, QrCode, Store, Trash, Eye, Share, CreditCard, User, Palette, Sparkles, Zap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [uploadMethod, setUploadMethod] = useState('manual');
  const [selectedStyle, setSelectedStyle] = useState('Timothée Chalamet');
  const [selectedScene, setSelectedScene] = useState('Studio');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Morning');

  // Mock data
  const userStats = {
    credits: 45,
    generated: 156,
    currentPlan: 'Premium',
    followers: 1247,
    following: 892
  };

  // Style options
  const styleOptions = [
    'Timothée Chalamet',
    'Zendaya',
    'Ryan Gosling',
    'Emma Stone',
    'Michael B. Jordan',
    'Margot Robbie'
  ];

  // Scene presets
  const scenePresets = [
    { name: 'Studio', emoji: '📸' },
    { name: 'Gym', emoji: '💪' },
    { name: 'Club', emoji: '🕺' },
    { name: 'Beach', emoji: '🏖️' },
    { name: 'Office', emoji: '💼' },
    { name: 'Coffee Shop', emoji: '☕' },
    { name: 'Park', emoji: '🌳' },
    { name: 'Rooftop', emoji: '🏢' }
  ];

  // Time of day options
  const timeOfDayOptions = [
    { name: 'Morning', emoji: '🌅' },
    { name: 'Afternoon', emoji: '☀️' },
    { name: 'Evening', emoji: '🌆' },
    { name: 'Night', emoji: '🌙' }
  ];

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
      title: "Glamour Collection",
      description: "Professional glamour shots with studio lighting",
      price: "$19.99",
      photoCount: 36,
      images: ["/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg"]
    },
    {
      id: 2,
      title: "Corporate Elite",
      description: "Executive-level professional headshots",
      price: "$24.99",
      photoCount: 24,
      images: ["/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg", "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg"]
    },
    {
      id: 3,
      title: "Artistic Vision",
      description: "Creative portraits with dramatic aesthetics",
      price: "$22.99",
      photoCount: 30,
      images: ["/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg", "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg"]
    },
    {
      id: 4,
      title: "Street Style",
      description: "Urban fashion with metropolitan energy",
      price: "$18.99",
      photoCount: 28,
      images: ["/lovable-uploads/photo-1721322800607-8c38375eef04.jpg", "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"]
    },
    {
      id: 5,
      title: "Vintage Dreams",
      description: "Timeless retro-inspired portraits",
      price: "$21.99",
      photoCount: 32,
      images: ["/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg", "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg"]
    },
    {
      id: 6,
      title: "Natural Beauty",
      description: "Outdoor portraits with golden hour lighting",
      price: "$20.99",
      photoCount: 26,
      images: ["/lovable-uploads/photo-1531297484001-80022131f5a1.jpg", "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Premium Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-20 shadow-2xl">
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Studio
            </h1>
          </div>
          
          {/* Credits Display */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Credits</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
                {userStats.credits}
              </Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl h-11 font-medium">
              <CreditCard className="w-4 h-4 mr-2" />
              Buy More Credits
            </Button>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl hover:bg-gray-100/50 text-gray-700">
              <Palette className="w-5 h-5 mr-3" />
              Style Profile Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl hover:bg-gray-100/50 text-gray-700">
              <User className="w-5 h-5 mr-3" />
              Account Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl hover:bg-gray-100/50 text-gray-700">
              <ShoppingBag className="w-5 h-5 mr-3" />
              Store
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl hover:bg-gray-100/50 text-gray-700">
              <Crown className="w-5 h-5 mr-3" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Instagram-style Profile Header */}
          <div className="flex items-center space-x-12 mb-12">
            <div className="relative">
              <Avatar className="w-40 h-40 ring-4 ring-white shadow-2xl">
                <AvatarImage src="/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">AI</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-6 mb-6">
                <h1 className="text-3xl font-light text-gray-900">ai_studio_pro</h1>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl px-8">
                  Edit Profile
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl px-8">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <div className="flex space-x-12 mb-6">
                <div className="text-center">
                  <span className="text-2xl font-semibold text-gray-900">{userStats.generated}</span>
                  <span className="text-gray-500 ml-2 block text-sm">generated</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-gray-900">{userStats.followers}</span>
                  <span className="text-gray-500 ml-2 block text-sm">followers</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-semibold text-gray-900">{userStats.following}</span>
                  <span className="text-gray-500 ml-2 block text-sm">following</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1">
                  {userStats.currentPlan}
                </Badge>
                <span className="text-gray-600 text-sm">Plan</span>
              </div>
            </div>
          </div>

          {/* Instagram-style Tabs */}
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl h-14 p-2 mb-8 relative z-10">
              <TabsTrigger 
                value="generator" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Bot className="w-5 h-5" />
                <span className="font-medium">GENERATE</span>
              </TabsTrigger>
              <TabsTrigger 
                value="my-photos" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">MY CONTENT</span>
              </TabsTrigger>
              <TabsTrigger 
                value="store" 
                className="flex items-center space-x-3 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 relative z-10"
              >
                <Store className="w-5 h-5" />
                <span className="font-medium">FOR YOU</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="mt-0">
              {/* Generator Section */}
              <Card className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Scene Presets - First */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Scene Preset</label>
                      <div className="grid grid-cols-4 gap-3">
                        {scenePresets.map((scene) => (
                          <Button
                            key={scene.name}
                            variant={selectedScene === scene.name ? 'default' : 'outline'}
                            onClick={() => setSelectedScene(scene.name)}
                            className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 relative z-10 ${
                              selectedScene === scene.name 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            <span className="text-lg">{scene.emoji}</span>
                            <span>{scene.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time of Day - Second */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Time of Day</label>
                      <div className="grid grid-cols-4 gap-3">
                        {timeOfDayOptions.map((timeOption) => (
                          <Button
                            key={timeOption.name}
                            variant={selectedTimeOfDay === timeOption.name ? 'default' : 'outline'}
                            onClick={() => setSelectedTimeOfDay(timeOption.name)}
                            className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 relative z-10 ${
                              selectedTimeOfDay === timeOption.name 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            <span className="text-lg">{timeOption.emoji}</span>
                            <span>{timeOption.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Style Selector - Third */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Your Style</label>
                      <div className="grid grid-cols-2 gap-3">
                        {styleOptions.map((style) => (
                          <Button
                            key={style}
                            variant={selectedStyle === style ? 'default' : 'outline'}
                            onClick={() => setSelectedStyle(style)}
                            className={`h-12 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${
                              selectedStyle === style 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg' 
                                : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            {style}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Upload Section */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Your Face</label>
                      
                      {/* Upload Method Toggle */}
                      <div className="flex space-x-2 mb-4">
                        <Button
                          variant={uploadMethod === 'manual' ? 'default' : 'outline'}
                          onClick={() => setUploadMethod('manual')}
                          className={`flex-1 h-10 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${
                            uploadMethod === 'manual' 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0' 
                              : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
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
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0' 
                              : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
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
                          <div className="flex flex-col items-center">
                            {/* Mock QR Code */}
                            <div className="w-32 h-32 bg-white rounded-xl shadow-lg p-4 mb-4 border border-gray-200">
                              <div className="w-full h-full bg-gray-900 rounded-lg relative overflow-hidden">
                                {/* QR Code Pattern */}
                                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-1">
                                  {Array.from({ length: 64 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`${
                                        Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'
                                      } rounded-sm`}
                                    />
                                  ))}
                                </div>
                                {/* Corner squares */}
                                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded border border-gray-900"></div>
                                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded border border-gray-900"></div>
                                <div className="absolute bottom-1 left-1 w-6 h-6 bg-white rounded border border-gray-900"></div>
                              </div>
                            </div>
                            <QrCode className="w-8 h-8 text-gray-400 mb-3" />
                            <p className="text-gray-700 font-medium">Scan QR code with your phone</p>
                            <p className="text-gray-500 text-sm mt-1">Take a photo and it will sync automatically</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Prompt Input */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Style Prompt</label>
                      <textarea
                        className="w-full bg-white/80 border border-gray-300 rounded-2xl p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="Describe additional style details..."
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10">
                      <Sparkles className="w-5 h-5 mr-3" />
                      Generate Magic (5 Credits)
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-200/30">
                    <h4 className="font-semibold mb-4 text-gray-800">✨ Pro Tips</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Use high-quality, well-lit photos for best results
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Face should be clearly visible and centered
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Experiment with different celebrity styles
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="my-photos" className="mt-0">
              {/* My Photos Grid - Instagram Reels style */}
              <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
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
              <div className="grid grid-cols-2 gap-8">
                {storeProducts.map((product) => (
                  <Card key={product.id} className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    {/* Product Images */}
                    <div className="relative aspect-square overflow-hidden">
                      <div className="grid grid-cols-2 h-full gap-px">
                        <img
                          src={product.images[0]}
                          alt={`${product.title} 1`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <img
                          src={product.images[1]}
                          alt={`${product.title} 2`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Floating badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border-0 px-3 py-1 rounded-full shadow-lg">
                          {product.photoCount} photos
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {product.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative z-10">
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
    </div>
  );
};

export default Dashboard;
