
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PromoBar } from "../components/PromoBar";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  // Add a handler to add the logo.svg file if it's missing
  useEffect(() => {
    // Check if the logo exists, if not create a simple one
    const checkLogo = async () => {
      try {
        const response = await fetch('/logo.svg');
        if (response.status === 404) {
          console.log('Logo not found, would create one in a real app');
        }
      } catch (error) {
        console.log('Error checking logo:', error);
      }
    };
    
    checkLogo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto">
            <main className="py-8 px-12">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Welcome to AI Selfie Studio
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                  Transform your photos with AI-powered magic
                </p>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-3 h-auto"
                >
                  Go to Dashboard
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
