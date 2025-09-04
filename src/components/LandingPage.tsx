import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Search, Map, BookOpen, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingPageProps {
  onEnterGarden: () => void;
}

export const LandingPage = ({ onEnterGarden }: LandingPageProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const tips = [
    { icon: Search, text: "Use the search to find specific medicinal plants", position: { top: "20%", left: "50%" } },
    { icon: BookOpen, text: "Click on any plant to learn detailed information", position: { top: "60%", left: "20%" } },
    { icon: Map, text: "Take virtual tours organized by health benefits", position: { top: "40%", left: "80%" } },
    { icon: Leaf, text: "Filter plants by AYUSH system or medicinal use", position: { top: "80%", left: "60%" } }
  ];

  useEffect(() => {
    if (showTips) {
      const timer = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [showTips, tips.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface dark:bg-gradient-hero relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
            }}
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            <Leaf 
              className="text-primary/20 dark:text-primary-glow/20" 
              size={40 + (i * 10)} 
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="bg-gradient-primary p-6 rounded-3xl shadow-premium"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Leaf className="text-primary-foreground" size={56} />
              </motion.div>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary-light/50 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AYUSH Digital Initiative
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h1 className="font-display text-7xl md:text-9xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-[0.9] tracking-tight">
              Virtual
              <span className="block italic">Herbal Garden</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-light">
              Discover the profound wisdom of <span className="font-semibold text-primary">AYUSH systems</span> through 
              interactive 3D botanical models, comprehensive medicinal knowledge, 
              and immersive virtual experiences that bridge ancient healing traditions with modern technology.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Search, title: "Smart Discovery", desc: "AI-powered search across 500+ medicinal plants with advanced filtering by therapeutic properties" },
              { icon: BookOpen, title: "Deep Learning", desc: "Comprehensive botanical knowledge with cultivation methods, traditional uses, and modern research" },
              { icon: Map, title: "Immersive Tours", desc: "Curated virtual journeys through themed collections of healing plants and wellness systems" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 text-center space-y-6 shadow-soft hover:shadow-botanical transition-all duration-300"
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                  <feature.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                onClick={onEnterGarden}
                className="bg-gradient-primary hover:shadow-premium text-primary-foreground shadow-glow text-xl px-12 py-8 h-auto group font-semibold rounded-2xl border-0"
              >
                Enter the Garden
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-all duration-300" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowTips(!showTips)}
                className="border-2 border-primary/30 bg-primary-light/30 text-primary hover:bg-primary-light/50 hover:border-primary/50 text-xl px-12 py-8 h-auto font-medium rounded-2xl backdrop-blur-sm"
              >
                {showTips ? "Hide" : "Show"} Garden Tour
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
              {[
                { number: "500+", label: "Medicinal Plants", desc: "Comprehensive database" },
                { number: "5", label: "AYUSH Systems", desc: "Traditional healing methods" },
                { number: "3D", label: "Interactive Models", desc: "Immersive experiences" },
                { number: "∞", label: "Learning Paths", desc: "Endless discovery" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.2 + (index * 0.15), duration: 0.6 }}
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-foreground text-lg mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Tips */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            className="fixed inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tips.map((tip, index) => (
              <AnimatePresence key={index}>
                {currentTip === index && (
                  <motion.div
                    className="absolute pointer-events-auto"
                    style={tip.position}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 shadow-premium max-w-sm">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-gradient-primary p-2 rounded-lg">
                          <tip.icon className="text-primary-foreground" size={18} />
                        </div>
                        <span className="font-display font-semibold text-primary">Discovery Tip {index + 1}</span>
                      </div>
                      <p className="text-foreground/80 leading-relaxed">{tip.text}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};