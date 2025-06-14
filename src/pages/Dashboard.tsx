
import { useState } from "react";
import { Camera, ShoppingBag, Image, User, Plus, Sparkles, Crown, TrendingUp, Download, Heart, QrCode, Grid3X3, Play, UserTag, MoreHorizontal, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [uploadMethod, setUploadMethod] = useState('manual');
  const [activeTab, setActiveTab] = useState('photos');

  // Mock data
  const userStats = {
    credits: 45,
    totalPhotos: 128,
    favoritePhotos: 23,
    planType: 'Premium',
    followers: 2847,
    following: 312,
    posts: 128
  };

  const promptPacks = [
    {
      id: 1,
      name: "Professional Headshots",
      price: 9.99,
      credits: 50,
      preview: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
      popular: true
    },
    {
      id: 2,
      name: "Artistic Portraits",
      price: 7.99,
      credits: 30,
      preview: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
      popular: false
    },
    {
      id: 3,
      name: "Fantasy Styles",
      price: 12.99,
      credits: 75,
      preview: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
      popular: false
    }
  ];

  const recentPhotos = [
    { id: 1, url: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", liked: true },
    { id: 2, url: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg", liked: false },
    { id: 3, url: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg", liked: true },
    { id: 4, url: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg", liked: false },
    { id: 5, url: "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg", liked: true },
    { id: 6, url: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", liked: false },
    { id: 7, url: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg", liked: true },
    { id: 8, url: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg", liked: false },
    { id: 9, url: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg", liked: true }
  ];

  const handleConnectPhone = () => {
    toast.success("QR code scanned! Phone camera roll connected.", {
      description: "You can now access your photos directly from your device."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-white">AI Studio</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-3 py-1.5 border border-gray-700/50">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">{userStats.credits}</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                <Plus className="w-4 h-4 mr-1" />
                Credits
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'generator', label: 'Create', icon: Camera },
              { id: 'store', label: 'Store', icon: ShoppingBag }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                    activeSection === item.id
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Section */}
        {activeSection === 'profile' && (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24 border-2 border-gray-600">
                <AvatarImage src="/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg" />
                <AvatarFallback className="bg-gray-700 text-white text-2xl font-bold">AI</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-light text-white">ai_selfie_studio</h1>
                  <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                    Edit profile
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-white font-semibold">{userStats.posts}</div>
                    <div className="text-gray-400 text-sm">posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{userStats.followers.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{userStats.following}</div>
                    <div className="text-gray-400 text-sm">following</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-white font-semibold">AI Selfie Studio</div>
                  <div className="text-gray-300 text-sm">✨ Transform your photos with AI magic</div>
                  <div className="text-gray-300 text-sm">🎨 Professional • Artistic • Fantasy</div>
                  <div className="text-purple-400 text-sm font-medium">Premium Member</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-700/50">
              <div className="flex justify-center">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-transparent border-0 h-12 w-full justify-center">
                    <TabsTrigger 
                      value="photos" 
                      className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-t-2 data-[state=active]:border-white text-gray-400 border-t-2 border-transparent rounded-none px-6"
                    >
                      <Grid3X3 className="w-3 h-3 mr-1" />
                      POSTS
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reels" 
                      className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-t-2 data-[state=active]:border-white text-gray-400 border-t-2 border-transparent rounded-none px-6"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      REELS
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tagged" 
                      className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-t-2 data-[state=active]:border-white text-gray-400 border-t-2 border-transparent rounded-none px-6"
                    >
                      <UserTag className="w-3 h-3 mr-1" />
                      TAGGED
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="photos" className="mt-6">
                    <div className="grid grid-cols-3 gap-1">
                      {recentPhotos.map((photo) => (
                        <div key={photo.id} className="aspect-square relative group cursor-pointer">
                          <img 
                            src={photo.url} 
                            alt="AI generated post"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                            <div className="flex items-center text-white">
                              <Heart className="w-5 h-5 mr-1 fill-current" />
                              <span className="font-semibold">24</span>
                            </div>
                            <div className="flex items-center text-white">
                              <Image className="w-5 h-5 mr-1" />
                              <span className="font-semibold">8</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reels" className="mt-6">
                    <div className="grid grid-cols-3 gap-1">
                      {recentPhotos.slice(0, 6).map((photo) => (
                        <div key={photo.id} className="aspect-square relative group cursor-pointer">
                          <img 
                            src={photo.url} 
                            alt="AI generated reel"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Play className="w-4 h-4 text-white fill-current" />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center text-white">
                              <Play className="w-6 h-6 mr-1 fill-current" />
                              <span className="font-semibold">1.2K</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tagged" className="mt-6">
                    <div className="grid grid-cols-3 gap-1">
                      {recentPhotos.slice(0, 3).map((photo) => (
                        <div key={photo.id} className="aspect-square relative group cursor-pointer">
                          <img 
                            src={photo.url} 
                            alt="Tagged photo"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <UserTag className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center text-white">
                              <Heart className="w-5 h-5 mr-1" />
                              <span className="font-semibold">12</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        {/* Generator Section */}
        {activeSection === 'generator' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Perfect Selfie</h2>
              <p className="text-gray-400">Transform your photos with AI-powered magic</p>
            </div>

            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Upload Your Photo</label>
                    
                    {/* Upload Method Tabs */}
                    <Tabs defaultValue="manual" value={uploadMethod} onValueChange={setUploadMethod} className="mb-4">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-700/30 border border-gray-600/50">
                        <TabsTrigger value="manual" className="data-[state=active]:bg-gray-600/50 text-white">
                          <Camera className="w-4 h-4 mr-2" />
                          Manual Upload
                        </TabsTrigger>
                        <TabsTrigger value="qrcode" className="data-[state=active]:bg-gray-600/50 text-white">
                          <QrCode className="w-4 h-4 mr-2" />
                          Connect Phone
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    {/* Manual Upload */}
                    {uploadMethod === "manual" && (
                      <div className="border-2 border-dashed border-gray-600/50 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                        <Camera className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-white font-medium">Click to upload or drag and drop</p>
                        <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    
                    {/* QR Code */}
                    {uploadMethod === "qrcode" && (
                      <div className="border-2 border-gray-600/50 rounded-xl p-6 text-center bg-gray-700/30">
                        <div className="bg-white p-3 rounded-lg mx-auto w-32 h-32 mb-3 relative">
                          {/* Mock QR Code */}
                          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                            {Array(16).fill(0).map((_, i) => (
                              <div 
                                key={i} 
                                className={`bg-black rounded-sm ${
                                  [0, 1, 2, 4, 7, 8, 11, 13, 14, 15].includes(i) ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white font-medium">Scan with your phone</p>
                        <p className="text-gray-400 text-sm mt-1 mb-3">Connect your camera roll</p>
                        <Button 
                          onClick={handleConnectPhone}
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Simulate Scan
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Style Prompt</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      rows={3}
                      placeholder="Describe your style... (e.g., professional headshot, artistic portrait)"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 text-base font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Selfie (5 Credits)
                  </Button>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                  <h3 className="text-base font-semibold text-white mb-3">Quick Tips</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Use clear, well-lit photos for best results
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Be specific with your style descriptions
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Connect your phone for easy access
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Store Section */}
        {activeSection === 'store' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Prompt Store</h2>
              <p className="text-gray-400">Unlock professional styles and creative prompts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promptPacks.map((pack) => (
                <Card key={pack.id} className="bg-gray-800/50 border-gray-700/50 overflow-hidden hover:scale-105 transition-transform">
                  <div className="relative">
                    <img 
                      src={pack.preview} 
                      alt={pack.name}
                      className="w-full h-40 object-cover"
                    />
                    {pack.popular && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white mb-2">{pack.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-white">${pack.price}</span>
                      <span className="text-xs text-gray-400">{pack.credits} credits</span>
                    </div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Purchase Pack
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
