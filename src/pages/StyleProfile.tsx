import { useState } from "react";
import { ArrowLeft, Save, RotateCcw, Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const StyleProfile = () => {
  const navigate = useNavigate();
  const { email, setOnboardingStep } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Physical Attributes
    height: { feet: 5, inches: 8, unit: 'ft' },
    ethnicity: '',
    weightBuild: '',
    skinTone: '',
    eyeColor: '',
    
    // Hair & Facial Features
    hairType: '',
    hairLength: '',
    hairColor: '',
    facialHair: '',
    
    // Style Preferences
    clothingBrands: [],
    styleKeywords: [],
    accessories: [],
    
    // Lifestyle & Location
    primaryCity: '',
    hobbies: [],
    drinkOrSmoke: ''
  });

  // Check if user has email (onboarding flow)
  const isOnboarding = !!email;

  const handleContinueToAccountSettings = () => {
    setOnboardingStep('account-settings');
    navigate('/account-settings');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Options data
  const weightBuildOptions = [
    { id: 'light', label: 'Light', icon: '🏃', description: 'Slim build' },
    { id: 'average', label: 'Average', icon: '👤', description: 'Standard build' },
    { id: 'muscular', label: 'Muscular', icon: '💪', description: 'Athletic build' },
    { id: 'plus-size', label: 'Plus Size', icon: '🤗', description: 'Larger build' }
  ];

  const skinToneOptions = [
    { id: 'light', label: 'Light', color: '#FFDBB4' },
    { id: 'medium', label: 'Medium', color: '#EDB98A' },
    { id: 'tan', label: 'Tan', color: '#D08B5B' },
    { id: 'brown', label: 'Brown', color: '#AE5D29' },
    { id: 'dark', label: 'Dark', color: '#8D4A43' }
  ];

  const eyeColorOptions = [
    { id: 'brown', label: 'Brown', color: '#8B4513' },
    { id: 'blue', label: 'Blue', color: '#4169E1' },
    { id: 'green', label: 'Green', color: '#228B22' },
    { id: 'hazel', label: 'Hazel', color: '#D2691E' },
    { id: 'gray', label: 'Gray', color: '#808080' }
  ];

  const hairTypeOptions = [
    { id: 'straight', label: 'Straight', icon: '📏' },
    { id: 'wavy', label: 'Wavy', icon: '🌊' },
    { id: 'curly', label: 'Curly', icon: '🌀' },
    { id: 'coily', label: 'Coily', icon: '🌪️' }
  ];

  const hairLengthOptions = [
    { id: 'buzz', label: 'Buzz Cut', icon: '✂️' },
    { id: 'short', label: 'Short', icon: '💇' },
    { id: 'medium', label: 'Medium', icon: '💇‍♀️' },
    { id: 'long', label: 'Long', icon: '💇‍♂️' }
  ];

  const hairColorOptions = [
    { id: 'brown', label: 'Brown', color: '#8B4513' },
    { id: 'black', label: 'Black', color: '#000000' },
    { id: 'blonde', label: 'Blonde', color: '#F4D03F' },
    { id: 'red', label: 'Red', color: '#E74C3C' },
    { id: 'dyed', label: 'Dyed', color: '#9B59B6' }
  ];

  const facialHairOptions = [
    { id: 'clean-shaven', label: 'Clean Shaven', icon: '🧔‍♂️' },
    { id: 'beard', label: 'Beard', icon: '🧔' },
    { id: 'mustache', label: 'Mustache', icon: '👨‍🦰' },
    { id: 'stubble', label: 'Stubble', icon: '🧔‍♂️' },
    { id: 'none', label: 'None', icon: '👶' }
  ];

  const styleKeywordOptions = [
    'Streetwear', 'Old Money', 'Minimalist', 'Vintage', 'Athleisure',
    'Business Casual', 'Tech Bro', 'Finance Bro', 'Frat Bro', 'Opium',
    'Fashion Bro', 'Sports Fan', 'Skater', 'European', 'Country'
  ];

  const accessoryOptions = [
    { id: 'watches', label: 'Watches', icon: '⌚' },
    { id: 'jewelry', label: 'Jewelry', icon: '💍' },
    { id: 'hats', label: 'Hats', icon: '🎩' },
    { id: 'sunglasses', label: 'Glasses', icon: '👓' },
    { id: 'bags', label: 'Bags', icon: '👜' },
    { id: 'scarves', label: 'Scarves', icon: '🧣' },
    { id: 'belts', label: 'Belts', icon: '👔' },
    { id: 'none', label: 'None', icon: '❌' }
  ];

  const popularBrands = [
    'Nike', 'Adidas', 'Supreme', 'Palace', 'Off-White', 'Balenciaga',
    'Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Versace', 'Tom Ford',
    'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein', 'Levi\'s'
  ];

  const popularHobbies = [
    'Gym', 'Photography', 'Travel', 'Cooking', 'Gaming', 'Reading',
    'Music', 'Art', 'Sports', 'Dancing', 'Hiking', 'Swimming',
    'Cycling', 'Yoga', 'Meditation', 'Fashion'
  ];

  // Helper functions
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (field: string, value: string) => {
    if (value.trim() && !formData[field as keyof typeof formData].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof formData] as string[]), value.trim()]
      }));
    }
  };

  const removeTag = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof formData] as string[]).filter((_, i) => i !== index)
    }));
  };

  const toggleMultiSelect = (field: string, value: string) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    if (currentValues.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentValues.filter(v => v !== value)
      }));
    } else {
      // Add limit check for styleKeywords
      if (field === 'styleKeywords' && currentValues.length >= 3) {
        return; // Don't add if already at limit
      }
      setFormData(prev => ({
        ...prev,
        [field]: [...currentValues, value]
      }));
    }
  };

  const calculateProgress = () => {
    const totalFields = 13;
    let completedFields = 0;
    
    if (formData.ethnicity) completedFields++;
    if (formData.weightBuild) completedFields++;
    if (formData.skinTone) completedFields++;
    if (formData.eyeColor) completedFields++;
    if (formData.hairType) completedFields++;
    if (formData.hairLength) completedFields++;
    if (formData.hairColor) completedFields++;
    if (formData.facialHair) completedFields++;
    if (formData.clothingBrands.length > 0) completedFields++;
    if (formData.styleKeywords.length > 0) completedFields++;
    if (formData.accessories.length > 0) completedFields++;
    if (formData.primaryCity) completedFields++;
    if (formData.drinkOrSmoke) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const progress = calculateProgress();

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
                onClick={isOnboarding ? handleBackToHome : () => navigate('/dashboard')}
                className="p-2 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Style Profile Settings</h1>
                <p className="text-white/80">
                  {isOnboarding 
                    ? "Help us understand your style to generate better AI photos" 
                    : "Help us understand your style to generate better AI photos"
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/80">{progress}% Complete</span>
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="space-y-8">
          {/* Section 1: Physical Attributes */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">Physical Attributes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Height</label>
                <div className="flex gap-3">
                  <select
                    value={formData.height.feet}
                    onChange={(e) => updateFormData('height', { ...formData.height, feet: parseInt(e.target.value) })}
                    className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(feet => (
                      <option key={feet} value={feet} className="bg-gray-800">{feet} ft</option>
                    ))}
                  </select>
                  <select
                    value={formData.height.inches}
                    onChange={(e) => updateFormData('height', { ...formData.height, inches: parseInt(e.target.value) })}
                    className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => i).map(inches => (
                      <option key={inches} value={inches} className="bg-gray-800">{inches} in</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ethnicity */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Ethnicity</label>
                <select
                  value={formData.ethnicity}
                  onChange={(e) => updateFormData('ethnicity', e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="bg-gray-800">Select ethnicity</option>
                  <option value="white" className="bg-gray-800">White/Caucasian</option>
                  <option value="black" className="bg-gray-800">Black/African American</option>
                  <option value="hispanic" className="bg-gray-800">Hispanic/Latino</option>
                  <option value="south-asian" className="bg-gray-800">South Asian</option>
                  <option value="southeast-asian" className="bg-gray-800">Southeast Asian</option>
                  <option value="east-asian" className="bg-gray-800">East Asian</option>
                  <option value="middle-eastern" className="bg-gray-800">Middle Eastern</option>
                  <option value="pacific-islander" className="bg-gray-800">Pacific Islander</option>
                  <option value="mixed" className="bg-gray-800">Mixed Race</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>

              {/* Weight/Build */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-3">Weight/Build</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {weightBuildOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.weightBuild === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('weightBuild', option.id)}
                      className={`h-20 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 ${
                        formData.weightBuild === option.id 
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Skin Tone</label>
                <div className="grid grid-cols-5 gap-2">
                  {skinToneOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.skinTone === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('skinTone', option.id)}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
                        formData.skinTone === option.id 
                          ? 'bg-white/10 border-2 border-white/50 hover:bg-white/10' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-white/30"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-xs mt-1">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Eye Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {eyeColorOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.eyeColor === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('eyeColor', option.id)}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
                        formData.eyeColor === option.id 
                          ? 'bg-white/10 border-2 border-white/50 hover:bg-white/10' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-white/30"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-xs mt-1">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Hair & Facial Features */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">Hair & Facial Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hair Type */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Hair Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {hairTypeOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.hairType === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('hairType', option.id)}
                      className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 ${
                        formData.hairType === option.id 
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Hair Length */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Hair Length</label>
                <div className="grid grid-cols-2 gap-3">
                  {hairLengthOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.hairLength === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('hairLength', option.id)}
                      className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 ${
                        formData.hairLength === option.id 
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Hair Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {hairColorOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.hairColor === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('hairColor', option.id)}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
                        formData.hairColor === option.id 
                          ? 'bg-white/10 border-2 border-white/50 hover:bg-white/10' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-white/30"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-xs mt-1">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Facial Hair */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Facial Hair</label>
                <div className="grid grid-cols-3 gap-3">
                  {facialHairOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={formData.facialHair === option.id ? 'default' : 'outline'}
                      onClick={() => updateFormData('facialHair', option.id)}
                      className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 ${
                        formData.facialHair === option.id 
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Style Preferences */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">Style Preferences</h2>
            
            <div className="space-y-6">
              {/* Favorite Clothing Brands */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Favorite Clothing Brands</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.clothingBrands.map((brand, index) => (
                      <Badge key={index} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full">
                        {brand}
                        <button
                          onClick={() => removeTag('clothingBrands', index)}
                          className="ml-2 hover:text-purple-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a brand..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTag('clothingBrands', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addTag('clothingBrands', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularBrands.slice(0, 8).map((brand) => (
                      <Button
                        key={brand}
                        variant="ghost"
                        size="sm"
                        onClick={() => addTag('clothingBrands', brand)}
                        className="text-xs bg-white/10 backdrop-blur-md hover:bg-white/20 text-white hover:text-white border border-white/20"
                      >
                        {brand}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style Keywords */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Style Keywords</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {styleKeywordOptions.map((keyword) => (
                    <Button
                      key={keyword}
                      variant={formData.styleKeywords.includes(keyword) ? 'default' : 'outline'}
                      onClick={() => toggleMultiSelect('styleKeywords', keyword)}
                      className={`h-12 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.styleKeywords.includes(keyword)
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg'
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Preferred Accessories */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Preferred Accessories</label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {accessoryOptions.map((accessory) => (
                    <Button
                      key={accessory.id}
                      variant={formData.accessories.includes(accessory.id) ? 'default' : 'outline'}
                      onClick={() => toggleMultiSelect('accessories', accessory.id)}
                      className={`h-16 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-all duration-200 ${
                        formData.accessories.includes(accessory.id)
                          ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg'
                          : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                      }`}
                    >
                      <span className="text-lg">{accessory.icon}</span>
                      <span>{accessory.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 4: Lifestyle & Location */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">Lifestyle & Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary City */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Primary City/Location</label>
                <input
                  type="text"
                  value={formData.primaryCity}
                  onChange={(e) => updateFormData('primaryCity', e.target.value)}
                  placeholder="Enter your city..."
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Drink or Smoke */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Drink or Smoke</label>
                <div className="flex gap-3">
                  <Button
                    variant={formData.drinkOrSmoke === 'yes' ? 'default' : 'outline'}
                    onClick={() => updateFormData('drinkOrSmoke', 'yes')}
                    className={`flex-1 h-12 rounded-xl font-medium transition-all duration-200 ${
                      formData.drinkOrSmoke === 'yes'
                        ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg'
                        : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={formData.drinkOrSmoke === 'no' ? 'default' : 'outline'}
                    onClick={() => updateFormData('drinkOrSmoke', 'no')}
                    className={`flex-1 h-12 rounded-xl font-medium transition-all duration-200 ${
                      formData.drinkOrSmoke === 'no'
                        ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white border-0 shadow-lg'
                        : 'border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Hobbies */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-3">Hobbies</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.hobbies.map((hobby, index) => (
                      <Badge key={index} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full">
                        {hobby}
                        <button
                          onClick={() => removeTag('hobbies', index)}
                          className="ml-2 hover:text-purple-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a hobby..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTag('hobbies', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addTag('hobbies', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularHobbies.slice(0, 8).map((hobby) => (
                      <Button
                        key={hobby}
                        variant="ghost"
                        size="sm"
                        onClick={() => addTag('hobbies', hobby)}
                        className="text-xs bg-white/10 backdrop-blur-md hover:bg-white/20 text-white hover:text-white border border-white/20"
                      >
                        {hobby}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            {!isOnboarding && (
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({
                    height: { feet: 5, inches: 8, unit: 'ft' },
                    ethnicity: '',
                    weightBuild: '',
                    skinTone: '',
                    eyeColor: '',
                    hairType: '',
                    hairLength: '',
                    hairColor: '',
                    facialHair: '',
                    clothingBrands: [],
                    styleKeywords: [],
                    accessories: [],
                    primaryCity: '',
                    hobbies: [],
                    drinkOrSmoke: ''
                  });
                }}
                className="px-6 py-3 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Form
              </Button>
            )}
            
            <div className="flex gap-3 ml-auto">
              {isOnboarding ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleBackToHome}
                    className="px-6 py-3 border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleContinueToAccountSettings}
                    className="px-8 py-3 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white border-0 shadow-lg"
                  >
                    Continue to Account Settings
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
                    onClick={() => {
                      // Save form data
                      console.log('Saving form data:', formData);
                      navigate('/dashboard');
                    }}
                    className="px-8 py-3 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white border-0 shadow-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleProfile; 