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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950 relative overflow-hidden">
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
              className="text-emerald-200/30 dark:text-emerald-700/30" 
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
                className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-glow"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Leaf className="text-white" size={48} />
              </motion.div>
            </div>
            <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">
              <Sparkles className="w-3 h-3 mr-1" />
              AYUSH Digital Initiative
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              Virtual
              <span className="block">Herbal Garden</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the ancient wisdom of traditional healing through interactive 3D models, 
              comprehensive plant information, and immersive virtual experiences.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Search, title: "Interactive Search", desc: "Find plants by name, use, or system" },
              { icon: BookOpen, title: "Detailed Learning", desc: "Comprehensive botanical information" },
              { icon: Map, title: "Virtual Tours", desc: "Guided exploration experiences" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center space-y-4"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={onEnterGarden}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-glow text-lg px-8 py-6 h-auto group"
              >
                Enter the Garden
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowTips(!showTips)}
                className="border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-lg px-8 py-6 h-auto"
              >
                {showTips ? "Hide" : "Show"} Garden Tour
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-8">
              {[
                { number: "500+", label: "Medicinal Plants" },
                { number: "5", label: "AYUSH Systems" },
                { number: "3D", label: "Interactive Models" },
                { number: "∞", label: "Learning Opportunities" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                    <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 shadow-lg max-w-xs">
                      <div className="flex items-center space-x-2 mb-2">
                        <tip.icon className="text-emerald-600 dark:text-emerald-400" size={16} />
                        <span className="text-sm font-medium text-foreground">Tip {index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.text}</p>
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