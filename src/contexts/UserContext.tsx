import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  onboardingStep: 'email' | 'style-profile' | 'account-settings' | 'dashboard';
  setOnboardingStep: (step: 'email' | 'style-profile' | 'account-settings' | 'dashboard') => void;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
  userPlan: 'free' | 'feed-fixer' | 'profile-optimizer' | 'content-creator';
  setUserPlan: (plan: 'free' | 'feed-fixer' | 'profile-optimizer' | 'content-creator') => void;
  hasSeenWelcomePopup: boolean;
  setHasSeenWelcomePopup: (seen: boolean) => void;
  showWelcomePopup: boolean;
  setShowWelcomePopup: (show: boolean) => void;
  isFreeTrialUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('');
  const [onboardingStep, setOnboardingStep] = useState<'email' | 'style-profile' | 'account-settings' | 'dashboard'>('email');
  const [userPlan, setUserPlan] = useState<'free' | 'feed-fixer' | 'profile-optimizer' | 'content-creator'>('free');
  const [hasSeenWelcomePopup, setHasSeenWelcomePopup] = useState<boolean>(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedStep = localStorage.getItem('onboardingStep') as 'email' | 'style-profile' | 'account-settings' | 'dashboard';
    const savedPlan = localStorage.getItem('userPlan') as 'free' | 'feed-fixer' | 'profile-optimizer' | 'content-creator';
    const savedHasSeenWelcomePopup = localStorage.getItem('hasSeenWelcomePopup') === 'true';
    
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedStep) {
      setOnboardingStep(savedStep);
    }
    if (savedPlan) {
      setUserPlan(savedPlan);
    }
    if (savedHasSeenWelcomePopup) {
      setHasSeenWelcomePopup(savedHasSeenWelcomePopup);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    localStorage.setItem('onboardingStep', onboardingStep);
    localStorage.setItem('userPlan', userPlan);
    localStorage.setItem('hasSeenWelcomePopup', hasSeenWelcomePopup.toString());
  }, [email, onboardingStep, userPlan, hasSeenWelcomePopup]);

  const isOnboardingComplete = onboardingStep === 'dashboard';
  const isFreeTrialUser = userPlan === 'free';

  const completeOnboarding = () => {
    setOnboardingStep('dashboard');
    
    // Show welcome popup for free trial users who haven't seen it yet
    if (userPlan === 'free' && !hasSeenWelcomePopup) {
      setShowWelcomePopup(true);
    }
  };

  const value: UserContextType = {
    email,
    setEmail,
    onboardingStep,
    setOnboardingStep,
    isOnboardingComplete,
    completeOnboarding,
    userPlan,
    setUserPlan,
    hasSeenWelcomePopup,
    setHasSeenWelcomePopup,
    showWelcomePopup,
    setShowWelcomePopup,
    isFreeTrialUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 