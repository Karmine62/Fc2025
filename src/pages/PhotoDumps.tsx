import { useState } from "react";
import { ArrowLeft, Package, Eye, Download, Share, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const PhotoDumps = () => {
  const navigate = useNavigate();

  // Mock photo dump data
  const photoDumps = [
    {
      id: 1,
      name: "Nightlife NYC",
      photoCount: 8,
      date: "2024-01-15",
      thumbnail: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
      images: [
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
        "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg",
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"
      ],
      likes: 24,
      downloads: 12
    },
    {
      id: 2,
      name: "Gym Mirror Pack",
      photoCount: 6,
      date: "2024-01-12",
      thumbnail: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
      images: [
        "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg"
      ],
      likes: 18,
      downloads: 8
    },
    {
      id: 3,
      name: "Beach Vibes",
      photoCount: 10,
      date: "2024-01-08",
      thumbnail: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
      images: [
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg",
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
        "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg"
      ],
      likes: 32,
      downloads: 15
    },
    {
      id: 4,
      name: "Coffee Aesthetic",
      photoCount: 5,
      date: "2024-01-05",
      thumbnail: "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
      images: [
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg",
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"
      ],
      likes: 15,
      downloads: 6
    },
    {
      id: 5,
      name: "Studio Glamour Set",
      photoCount: 7,
      date: "2024-01-02",
      thumbnail: "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
      images: [
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg",
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
        "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg"
      ],
      likes: 28,
      downloads: 11
    },
    {
      id: 6,
      name: "Urban Street Style",
      photoCount: 9,
      date: "2023-12-28",
      thumbnail: "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
      images: [
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg",
        "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg",
        "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
        "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
        "/lovable-uploads/photo-1531297484001-80022131f5a1.jpg",
        "/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
        "/lovable-uploads/photo-1582562124811-c09040d0a901.jpg",
        "/lovable-uploads/photo-1721322800607-8c38375eef04.jpg"
      ],
      likes: 22,
      downloads: 9
    }
  ];

  const handleViewDump = (dumpId: number) => {
    console.log(`Viewing dump ${dumpId}`);
    // Add your view logic here
  };

  const handleDownloadDump = (dumpId: number) => {
    console.log(`Downloading dump ${dumpId}`);
    // Add your download logic here
  };

  const handleShareDump = (dumpId: number) => {
    console.log(`Sharing dump ${dumpId}`);
    // Add your share logic here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                <h1 className="text-2xl font-bold text-white">My Photo Dumps</h1>
                <p className="text-white/80">Your collection of FinstaCam photodumps</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1">
                {photoDumps.length} Collections
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {photoDumps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoDumps.map((dump) => (
              <Card 
                key={dump.id} 
                className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl"
              >
                {/* Header with Icon and Stats */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{dump.name}</h3>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Calendar className="w-3 h-3" />
                          {formatDate(dump.date)}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-2 py-1 text-xs">
                      {dump.photoCount} photos
                    </Badge>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="mb-4">
                    <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white/70 text-sm font-medium">
                          {dump.photoCount} photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewDump(dump.id)}
                      className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl h-10 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Dump
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadDump(dump.id)}
                      className="border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30 rounded-xl h-10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShareDump(dump.id)}
                      className="border-white/20 text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30 rounded-xl h-10"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Photo Dumps Yet</h3>
            <p className="text-white/70 mb-6">Buy photo dumps from our store and they will be displayed here</p>
            <Button
              onClick={() => navigate('/store')}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6 py-3"
            >
              Buy Photo Dumps
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDumps; 