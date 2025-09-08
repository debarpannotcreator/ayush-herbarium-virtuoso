import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Search, Brain, Route, Sparkles, Play, Eye } from "lucide-react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LandingPageProps {
  onEnterGarden: () => void;
}

// Animated Counter Hook
const useCounter = (end: number, inView: boolean, duration = 2000) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (val) => Math.round(val));

  useEffect(() => {
    if (inView) {
      const controls = count.set(end);
      return controls;
    }
  }, [count, end, inView]);

  return useSpring(rounded, { duration });
};

export const LandingPage = ({ onEnterGarden }: LandingPageProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTour, setShowTour] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  // Animated counters
  const plantsCount = useCounter(500, statsInView);
  const systemsCount = useCounter(5, statsInView);
  const modelsCount = useCounter(100, statsInView);
  const pathsCount = useCounter(1000, statsInView);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles animation
  const createParticles = () => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  };

  const particles = createParticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950 relative overflow-x-hidden">
      {/* Animated Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute opacity-10 dark:opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            <Leaf 
              className="text-emerald-600 dark:text-emerald-400" 
              size={particle.size} 
            />
          </motion.div>
        ))}
      </div>

      {/* Parallax Mouse Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.1), transparent 70%)`,
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Floating Logo */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-full shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Leaf className="text-white" size={64} />
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Virtual Herbal Garden
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              Discover the profound wisdom of <span className="font-semibold text-emerald-600 dark:text-emerald-400">AYUSH systems</span> through 
              interactive 3D botanical models, medicinal knowledge, and immersive virtual experiences.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.9 }}
            >
              <Button
                size="lg"
                onClick={onEnterGarden}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xl px-12 py-8 h-auto group font-semibold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0"
              >
                Enter the Garden
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowTour(!showTour)}
                className="border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xl px-12 py-8 h-auto font-medium rounded-2xl backdrop-blur-sm transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Show Garden Tour
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Experience Ancient Wisdom
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three pillars of immersive botanical learning that bridge traditional knowledge with modern technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: "Smart Discovery", 
                desc: "AI-powered search across 500+ medicinal plants with intelligent recommendations",
                gradient: "from-blue-500 to-cyan-600"
              },
              { 
                icon: Eye, 
                title: "Deep Learning", 
                desc: "Comprehensive knowledge with traditional + modern insights, cultivation methods",
                gradient: "from-emerald-500 to-teal-600"
              },
              { 
                icon: Route, 
                title: "Immersive Tours", 
                desc: "Curated healing plant journeys through themed wellness collections",
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-full transition-all duration-500 group-hover:shadow-3xl">
                  
                  {/* Animated Icon */}
                  <motion.div
                    className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>

                  {/* Glowing Effect on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                  />

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 px-4 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Explore Boundless Knowledge
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { count: plantsCount, suffix: "+", label: "Medicinal Plants", desc: "Comprehensive database" },
              { count: systemsCount, suffix: "", label: "AYUSH Systems", desc: "Traditional methods" },
              { count: modelsCount, suffix: "", label: "3D Interactive Models", desc: "Immersive experiences" },
              { count: pathsCount, suffix: "+", label: "Learning Paths", desc: "Endless discovery" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div className="text-5xl md:text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  <motion.span>{stat.count}</motion.span>{stat.suffix}
                </motion.div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Step into the future of ancient wisdom
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students, researchers, and wellness enthusiasts exploring the convergence of tradition and innovation.
            </p>
            <Button
              size="lg"
              onClick={onEnterGarden}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xl px-12 py-8 h-auto group font-semibold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0"
            >
              Start Exploring Now
              <Sparkles className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tour Overlay */}
      <AnimatePresence>
        {showTour && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTour(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md text-center shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Garden Tour Coming Soon!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Experience guided tours through curated collections of medicinal plants and healing systems.
              </p>
              <Button
                onClick={() => setShowTour(false)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl"
              >
                Got it!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};