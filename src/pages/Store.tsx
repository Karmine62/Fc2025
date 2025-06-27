import { useState } from "react";
import { ArrowLeft, Package, ShoppingCart, Star, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";

const Store = () => {
  const navigate = useNavigate();

  // Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    price: number;
    type: 'credits' | 'pack';
  } | null>(null);

  // Credit packages
  const creditPackages = [
    {
      id: 1,
      name: "Starter Pack",
      credits: 50,
      price: 2.99,
      popular: false,
      features: ["50 AI generations", "All basic scenes", "Standard support"]
    },
    {
      id: 2,
      name: "Pro Pack",
      credits: 150,
      price: 7.99,
      popular: true,
      features: ["150 AI generations", "Premium scenes", "Priority support",]
    },
    {
      id: 3,
      name: "Ultimate Pack",
      credits: 500,
      price: 9.99,
      popular: false,
      features: ["500 AI generations", "All scenes + custom", "VIP support",]
    }
  ];

  // Photo dump packs
  const photoDumpPacks = [
    {
      id: 1,
      name: "Nightlife Collection",
      photoCount: 12,
      price: 4.99,
      description: "for dating apps and social media",
      scenes: ["Club", "Bar", "Rooftop", "Street"]
    },
    {
      id: 2,
      name: "Gym & Fitness",
      photoCount: 8,
      price: 4.99,
      description: "Show off your gains and lifestyle",
      scenes: ["Gym", "Mirror", "Outdoor", "Studio"]
    },
    {
      id: 3,
      name: "Travel Vibes",
      photoCount: 15,
      price: 4.99,
      description: "From beaches to cityscapes",
      scenes: ["Beach", "City", "Mountains", "Cafe"]
    },
    {
      id: 4,
      name: "Business Professional",
      photoCount: 10,
      price: 6.99,
      description: "Perfect for LinkedIn and job profiles",
      scenes: ["Office", "Meeting", "Coffee Shop", "Outdoor"]
    },
    {
      id: 5,
      name: "Lifestyle Mix",
      photoCount: 20,
      price: 6.99,
      description: "Versatile collection for all platforms",
      scenes: ["Studio", "Outdoor", "Indoor", "Social"]
    },
    {
      id: 6,
      name: "Premium Collection",
      photoCount: 25,
      price: 6.99,
      description: "Our most comprehensive pack",
      scenes: ["All scenes included", "Custom requests",]
    }
  ];

  const handleBuyCredits = (packageId: number) => {
    const pkg = creditPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedItem({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        type: 'credits'
      });
      setIsPaymentModalOpen(true);
    }
  };

  const handleBuyPack = (packId: number) => {
    const pack = photoDumpPacks.find(p => p.id === packId);
    if (pack) {
      setSelectedItem({
        id: pack.id,
        name: pack.name,
        price: pack.price,
        type: 'pack'
      });
      setIsPaymentModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedItem) {
      console.log(`Payment confirmed for ${selectedItem.name} (${selectedItem.type})`);
      // Add your payment confirmation logic here
      // This could include updating user credits or adding packs to their account
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
      {/* Header */}
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="p-2 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Store</h1>
                <p className="text-white/80">Buy credits and premium photo dump packs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Flash Sale
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Credits Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Credit Packages</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-visible group hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl relative ${
                  pkg.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0 px-6 py-1.5 rounded-full shadow-lg">
                      <Crown className="w-3.5 h-3.5 mr-1.5" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-3xl font-bold text-white">${pkg.price}</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                      {pkg.credits} Credits
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Buy Button */}
                  <Button
                    onClick={() => handleBuyCredits(pkg.id)}
                    className="w-full rounded-xl h-12 font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Photo Dump Packs Section */}
        <div id="photo-dump-packs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Photo Dump Packs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoDumpPacks.map((pack) => (
              <Card 
                key={pack.id} 
                className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:shadow-xl"
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
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0">
                  <Button
                    onClick={() => handleBuyPack(pack.id)}
                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl h-10 font-medium"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Pack
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedItem && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          planName={selectedItem.name}
          planPrice={selectedItem.price.toString()}
          onConfirmPayment={handleConfirmPayment}
        />
      )}
    </div>
  );
};

export default Store; 