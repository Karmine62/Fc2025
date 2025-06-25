import { useState } from "react";
import { ArrowLeft, Save, Eye, EyeOff, CreditCard, Mail, Bell, AlertTriangle, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { email, setOnboardingStep, completeOnboarding } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: email || 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cvv: '',
    cardholderName: 'John Doe',
    notifications: {
      updates: true,
      promotions: false,
      security: true,
      newFeatures: true
    }
  });

  // Check if user is in onboarding flow
  const isOnboarding = !!email;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNotification = (key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving account settings:', formData);
    // Add your save logic here
  };

  const handleCancelPlan = () => {
    console.log('Cancelling plan...');
    // Add your cancellation logic here
  };

  const handleCompleteSetup = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  const handleBackToStyleProfile = () => {
    navigate('/style-profile');
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
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={isOnboarding ? handleBackToStyleProfile : () => navigate('/dashboard')}
                className="p-2 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Account Settings</h1>
                <p className="text-white/80">
                  {isOnboarding 
                    ? "Step 2: Set up your account preferences and security" 
                    : "Manage your account preferences and security"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="space-y-8">
          {/* Email & Password Section */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Email & Password</h2>
            </div>
            
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => updateFormData('currentPassword', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => updateFormData('newPassword', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Information Section */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Payment Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => updateFormData('cardNumber', e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="**** **** **** ****"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => updateFormData('expiryDate', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="MM/YY"
                  />
                </div>

                {/* CVV */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">CVV</label>
                  <input
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => updateFormData('cvv', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="123"
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => updateFormData('cardholderName', e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Email Notifications Section */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Email Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="font-semibold text-white">Product Updates</h3>
                  <p className="text-white/70 text-sm">Get notified about new features and improvements</p>
                </div>
                <Button
                  variant={formData.notifications.updates ? 'default' : 'outline'}
                  onClick={() => updateNotification('updates', !formData.notifications.updates)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    formData.notifications.updates 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                      : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                  }`}
                >
                  {formData.notifications.updates ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="font-semibold text-white">Promotional Emails</h3>
                  <p className="text-white/70 text-sm">Receive special offers and discounts</p>
                </div>
                <Button
                  variant={formData.notifications.promotions ? 'default' : 'outline'}
                  onClick={() => updateNotification('promotions', !formData.notifications.promotions)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    formData.notifications.promotions 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                      : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                  }`}
                >
                  {formData.notifications.promotions ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="font-semibold text-white">Security Alerts</h3>
                  <p className="text-white/70 text-sm">Important security notifications</p>
                </div>
                <Button
                  variant={formData.notifications.security ? 'default' : 'outline'}
                  onClick={() => updateNotification('security', !formData.notifications.security)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    formData.notifications.security 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                      : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                  }`}
                >
                  {formData.notifications.security ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="font-semibold text-white">New Features</h3>
                  <p className="text-white/70 text-sm">Learn about new AI features and capabilities</p>
                </div>
                <Button
                  variant={formData.notifications.newFeatures ? 'default' : 'outline'}
                  onClick={() => updateNotification('newFeatures', !formData.notifications.newFeatures)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    formData.notifications.newFeatures 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-0' 
                      : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                  }`}
                >
                  {formData.notifications.newFeatures ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Cancel Plan Section */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Cancel Plan</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-2">Warning</h3>
                <p className="text-white/80 text-sm mb-4">
                  Cancelling your plan will immediately stop all premium features. You'll lose access to:
                </p>
                <ul className="text-white/70 text-sm space-y-1 mb-4">
                  <li>• Unlimited AI photo generation</li>
                  <li>• Premium scene packs</li>
                  <li>• Priority support</li>
                  <li>• Advanced styling options</li>
                </ul>
                <p className="text-white/80 text-sm">
                  Your remaining credits will be available until the end of your billing period.
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={handleCancelPlan}
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500/70"
              >
                Cancel My Plan
              </Button>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            {isOnboarding ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleBackToStyleProfile}
                  className="px-6 py-3 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCompleteSetup}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-lg"
                >
                  Complete Setup
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 