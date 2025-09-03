import { Button } from "@/components/ui/button";
import { Play, Search, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-garden.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Explore the
            <span className="block bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
              Virtual Herbal Garden
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover the ancient wisdom of AYUSH through interactive 3D models, 
            detailed plant information, and immersive virtual tours of medicinal plants.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6 h-auto"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Plants
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2" />
              Virtual Tour
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm md:text-base">Medicinal Plants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">5</div>
              <div className="text-white/80 text-sm md:text-base">AYUSH Systems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">3D</div>
              <div className="text-white/80 text-sm md:text-base">Interactive Models</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};