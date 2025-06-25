import { useState } from "react";
import { X, Crown, Sparkles, Camera, Heart, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const WelcomePopup = ({ isOpen, onClose, onUpgrade }: WelcomePopupProps) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const plans = [
    {
      id: "feed-fixer",
      name: "Feed Fixer",
      price: "$12.99",
      originalPrice: "$19.99",
      savings: "35% OFF",
      features: [
        "15 selfies/month",
        "Lurker + Feed Fixer scenes",
        "2 group photos",
        "Hairstyling, Height and Weight",
        "1 Photo dump per month",
        "Buy Scene Packs with credits"
      ],
      popular: true
    },
    {
      id: "profile-optimizer",
      name: "Profile Optimizer",
      price: "$24.99",
      originalPrice: "$39.99",
      savings: "38% OFF",
      features: [
        "20 selfies/month",
        "10 Boomerangs",
        "All scenes + Profile Optimizer scenes",
        "4 group photos",
        "Full styling + Clothing, Cars, Pets",
        "2 Photo dumps per month",
        "Weekly scene packs"
      ]
    },
    {
      id: "content-creator",
      name: "Content Creator",
      price: "$39.99",
      originalPrice: "$59.99",
      savings: "33% OFF",
      features: [
        "40 selfies/month",
        "20 Boomerangs",
        "All Scenes + AI-Custom Scenes",
        "15 group photos",
        "Full range styling",
        "Unlimited Photo dumps",
        "Weekly scene packs + seasonal drops"
      ]
    }
  ];

  const handleUpgrade = () => {
    if (selectedPlan) {
      onUpgrade();
      navigate('/upgrade-plan', { state: { selectedPlan } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="backdrop-blur-md bg-white/95 border border-white/20 shadow-2xl rounded-3xl p-8 relative">
          {/* Close button - only visible for non-free users */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-200 flex items-center justify-center z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to FinstaCam! 🎉
            </h1>
            <p className="text-gray-600 text-lg">
              Your free trial is ready! Upgrade now to unlock unlimited AI-powered photos and dominate your dating apps.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">55%</div>
              <p className="text-blue-700 text-sm">More engagement</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">3x</div>
              <p className="text-pink-700 text-sm">More matches</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">80%</div>
              <p className="text-green-700 text-sm">AI content online</p>
            </div>
          </div>

          {/* Plans Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Choose Your Upgrade Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 line-through">{plan.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {plan.savings}
                    </Badge>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button
              onClick={handleUpgrade}
              disabled={!selectedPlan}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:from-yellow-300 hover:to-purple-700 text-white border-0 rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {selectedPlan ? `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name}` : 'Select a Plan'}
            </Button>
            
            <p className="text-gray-500 text-sm mt-4">
              🔒 Secure payment • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePopup; 