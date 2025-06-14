
import { useState } from "react";
import { Camera, ShoppingBag, Image, User, Plus, Heart, Search, Settings, Grid3X3, Film, UserTag, Download, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [uploadMethod, setUploadMethod] = useState('manual');

  // Mock data
  const userStats = {
    credits: 45,
    totalPhotos: 128,
    favoritePhotos: 23,
    followers: 1247,
    following: 892,
    planType: 'Premium'
  };

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-black border-r border-gray-800 z-10">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-8">AI Selfie Studio</h1>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <Camera className="w-6 h-6" />
              <span>Generate</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              <span>Store</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <Heart className="w-6 h-6" />
              <span>Favorites</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <Settings className="w-6 h-6" />
              <span>Settings</span>
            </a>
          </nav>

          {/* Credits Display */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Credits</span>
              <Badge className="bg-blue-600 hover:bg-blue-700">{userStats.credits}</Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-8 mb-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-light">ai_selfie_studio</h1>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Edit profile
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 text-white hover:bg-gray-800">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex space-x-8 mb-4">
                <div className="text-center">
                  <span className="font-semibold">{userStats.totalPhotos}</span>
                  <span className="text-gray-400 ml-1">photos</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold">{userStats.followers}</span>
                  <span className="text-gray-400 ml-1">followers</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold">{userStats.following}</span>
                  <span className="text-gray-400 ml-1">following</span>
                </div>
              </div>
              
              <div>
                <h2 className="font-semibold">AI Selfie Studio</h2>
                <p className="text-gray-400">Create stunning AI-generated selfies</p>
                <p className="text-gray-400">✨ {userStats.planType} member</p>
              </div>
            </div>
          </div>

          {/* Generator Section */}
          <Card className="bg-gray-800 border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Create New Selfie</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Method</label>
                  <div className="flex space-x-4 mb-4">
                    <Button
                      variant={uploadMethod === 'manual' ? 'default' : 'outline'}
                      onClick={() => setUploadMethod('manual')}
                      className={uploadMethod === 'manual' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-white hover:bg-gray-700'}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Manual Upload
                    </Button>
                    <Button
                      variant={uploadMethod === 'qr' ? 'default' : 'outline'}
                      onClick={() => setUploadMethod('qr')}
                      className={uploadMethod === 'qr' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-white hover:bg-gray-700'}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                </div>

                {uploadMethod === 'manual' ? (
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </div>
                ) : (
                  <div className="border-2 border-gray-600 rounded-lg p-8 text-center">
                    <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                      <div className="text-black text-xs">QR CODE</div>
                    </div>
                    <p className="text-white font-medium mb-2">Scan with your phone</p>
                    <p className="text-gray-400 text-sm mb-4">Connect your camera roll instantly</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Simulate QR Scan
                    </Button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Style Prompt</label>
                  <textarea
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe the style you want... (e.g., professional headshot, artistic portrait)"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg font-semibold">
                  <Camera className="w-5 h-5 mr-2" />
                  Generate Selfie (5 Credits)
                </Button>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-3">Quick Tips</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Use clear, well-lit photos for best results
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Be specific with your style descriptions
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Try different angles and expressions
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Instagram-style Tabs */}
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-700 rounded-none h-auto p-0">
              <TabsTrigger value="photos" className="flex items-center space-x-2 py-3 border-b-2 border-transparent data-[state=active]:border-white bg-transparent">
                <Grid3X3 className="w-4 h-4" />
                <span>PHOTOS</span>
              </TabsTrigger>
              <TabsTrigger value="reels" className="flex items-center space-x-2 py-3 border-b-2 border-transparent data-[state=active]:border-white bg-transparent">
                <Film className="w-4 h-4" />
                <span>REELS</span>
              </TabsTrigger>
              <TabsTrigger value="tagged" className="flex items-center space-x-2 py-3 border-b-2 border-transparent data-[state=active]:border-white bg-transparent">
                <UserTag className="w-4 h-4" />
                <span>TAGGED</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="mt-8">
              <div className="grid grid-cols-3 gap-1">
                {recentPhotos.map((photo) => (
                  <div key={photo.id} className="relative aspect-square group cursor-pointer">
                    <img 
                      src={photo.url} 
                      alt="Generated selfie"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-1 text-white">
                        <Heart className={`w-5 h-5 ${photo.liked ? 'fill-current text-red-500' : ''}`} />
                        <span className="text-sm">42</span>
                      </div>
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reels" className="mt-8">
              <div className="text-center py-12">
                <Film className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No reels yet</p>
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-8">
              <div className="text-center py-12">
                <UserTag className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No tagged photos yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
