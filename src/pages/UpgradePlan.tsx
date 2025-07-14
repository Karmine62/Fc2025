import { useState } from "react";
import { ArrowLeft, Check, Crown, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";

const UpgradePlan = () => {
  const navigate = useNavigate();
  
  // Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);
  
  // Billing cycle state
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Mock current user plan - this should come from your user context/state management
  const currentUserPlan = "feed-fixer"; // lurker, feed-fixer, profile-optimizer, or content-creator

  const plans = [
    {
      id: "lurker",
      name: "Lurker",
      price: billingCycle === 'monthly' ? "Free" : "Free",
      description: "Perfect for getting started",
      features: [
        "2 selfies per month",
        "6 scenes to choose from",
        "Hairstyling",
        "Payment method required"
      ],
      icon: Star
    },
    {
      id: "feed-fixer",
      name: "Feed Fixer",
      price: billingCycle === 'monthly' ? "12.99" : "79.99",
      description: "Most popular for creators",
      features: [
        "15 selfies/month",
        "Lurker + Feed Fixer scenes",
        "2 group photos",
        "Hairstyling, Height and Weight",
        "1 Photo dump per month",
        "Buy Scene Packs with credits"
      ],
      icon: Crown
    },
    {
      id: "profile-optimizer",
      name: "Profile Optimizer",
      price: billingCycle === 'monthly' ? "24.99" : "159.99",
      description: "For serious content creators",
      features: [
        "20 selfies/month",
        "10 Boomerangs",
        "Lower tier scenes + Profile Optimizer scenes",
        "4 group photos",
        "Lower tier styling + Clothing, Cars, Pets",
        "2 Photo dumps per month",
        "Weekly scene packs (e.g., Ibiza, NYFW, Tokyo Nightlife)",
        "Buy Scene Packs with credits"
      ],
      icon: Sparkles
    },
    {
      id: "content-creator",
      name: "Content Creator",
      price: billingCycle === 'monthly' ? "39.99" : "249.99",
      description: "For professional influencers",
      features: [
        "40 selfies/month",
        "20 Boomerangs",
        "All Scenes + AI-Custom Scenes (User-Generated)",
        "15 group photos",
        "Full range styling",
        "2 Photo dumps per month",
        "Weekly scene packs (Full access including seasonal & city-based drops)",
        "Buy Scene Packs with credits"
      ],
      icon: Crown
    }
  ];

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan({
        id: plan.id,
        name: plan.name,
        price: plan.price
      });
      setIsPaymentModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    console.log(`Payment confirmed for ${selectedPlan?.name} plan`);
    // Add your payment confirmation logic here
    // This could include updating user plan in your backend
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
                <h1 className="text-2xl font-bold text-white">Upgrade Plan</h1>
                <p className="text-white/80">Choose the perfect plan for your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-12">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
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
        
        <div className="flex justify-center gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = currentUserPlan === plan.id;
            const isPopular = plan.id === 'lurker';
            
            return (
              <div 
                key={plan.id}
                className={`rounded-2xl p-8 w-[280px] flex flex-col bg-white/5 backdrop-blur-md ${
                  isPopular ? "border-2 border-pink-500" : "border border-white/10"
                } relative transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Your Plan
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="text-3xl font-bold text-white mb-6">
                    {plan.price === "Free" ? "Free" : `$${plan.price}`}
                  </div>
                  <ul className="w-full space-y-3 text-left mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/90 text-sm">
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="whitespace-pre-line">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto w-full">
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90"
                  >
                    {plan.price === "Free" ? "Free" : "Choose"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onConfirmPayment={handleConfirmPayment}
        />
      )}
    </div>
  );
};

export default UpgradePlan; 