
import { useState } from "react";
import { Camera, ShoppingBag, Image, User, Plus, Sparkles, Crown, TrendingUp, Download, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('generator');

  // Mock data
  const userStats = {
    credits: 45,
    totalPhotos: 128,
    favoritePhotos: 23,
    planType: 'Premium'
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
    { id: 6, url: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg", liked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">AI Selfie Studio</h1>
                <p className="text-sm text-gray-400">Premium Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">{userStats.credits} Credits</span>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Buy Credits
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'generator', label: 'Generator', icon: Camera },
              { id: 'store', label: 'Store', icon: ShoppingBag },
              { id: 'photos', label: 'My Photos', icon: Image },
              { id: 'account', label: 'Account', icon: User }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                    activeSection === item.id
                      ? 'border-purple-400 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Generator Section */}
        {activeSection === 'generator' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Perfect Selfie</h2>
              <p className="text-gray-400">Transform your photos with AI-powered magic</p>
            </div>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Upload Your Photo</label>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white font-medium">Click to upload or drag and drop</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Style Prompt</label>
                    <textarea
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      rows={3}
                      placeholder="Describe the style you want... (e.g., professional headshot, artistic portrait, fantasy character)"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 text-lg font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Selfie (5 Credits)
                  </Button>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Tips</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Use clear, well-lit photos for best results
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Be specific with your style descriptions
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Try different angles and expressions
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Store Section */}
        {activeSection === 'store' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Prompt Store</h2>
              <p className="text-gray-400">Unlock professional styles and creative prompts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptPacks.map((pack) => (
                <Card key={pack.id} className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden hover:scale-105 transition-transform">
                  <div className="relative">
                    <img 
                      src={pack.preview} 
                      alt={pack.name}
                      className="w-full h-48 object-cover"
                    />
                    {pack.popular && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{pack.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-white">${pack.price}</span>
                      <span className="text-sm text-gray-400">{pack.credits} credits</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Purchase Pack
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        {activeSection === 'photos' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">My Photos</h2>
                <p className="text-gray-400">Your AI-generated selfie collection</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentPhotos.map((photo) => (
                <Card key={photo.id} className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden group hover:scale-105 transition-transform">
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt="Generated selfie"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className={`${photo.liked ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white`}>
                        <Heart className={`w-4 h-4 ${photo.liked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Account Section */}
        {activeSection === 'account' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Account Overview</h2>
              <p className="text-gray-400">Manage your subscription and view stats</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Current Plan</p>
                    <p className="text-xl font-semibold text-white">{userStats.planType}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Credits Left</p>
                    <p className="text-xl font-semibold text-white">{userStats.credits}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Photos</p>
                    <p className="text-xl font-semibold text-white">{userStats.totalPhotos}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Favorites</p>
                    <p className="text-xl font-semibold text-white">{userStats.favoritePhotos}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Subscription Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-medium">Premium Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Billing</span>
                    <span className="text-white font-medium">June 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credits Per Month</span>
                    <span className="text-white font-medium">100 Credits</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-4">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Usage This Month</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Credits Used</span>
                      <span className="text-white font-medium">55 / 100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Photos Generated</span>
                      <span className="text-white font-medium">22</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Downloads</span>
                      <span className="text-white font-medium">18</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
