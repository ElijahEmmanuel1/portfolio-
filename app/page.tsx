'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Cpu, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useUser } from '@/components/providers/UserContext';

export default function HomePage() {
  const router = useRouter();
  const { userPhoto, userName } = useUser();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Extended splash time for effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-vision-navy text-foreground relative overflow-hidden selection:bg-vision-cyan selection:text-vision-navy">
      {/* Global VisionOS Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030616] via-[#050A20] to-[#0A1026]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow" />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-vision-cyan rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          >
            {/* Central Liquid Glass Panel */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative p-12 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-bloom flex flex-col items-center max-w-lg w-full mx-4"
            >
              {/* User Photo / Avatar */}
              <div className="relative w-32 h-32 mb-8 rounded-full p-1 bg-gradient-to-br from-vision-cyan to-vision-violet shadow-neon-cyan">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  {userPhoto ? (
                    <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-vision-navy">
                      <User className="w-12 h-12 text-vision-cyan" />
                    </div>
                  )}
                  {/* Scan Line Animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vision-cyan/50 to-transparent h-1/3 w-full animate-scan-line opacity-50" />
                </div>
              </div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white tracking-wide text-center mb-2"
              >
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-vision-cyan to-vision-violet">{userName}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-vision-cyan/60 font-mono text-sm tracking-widest"
              >
                RESTORING SESSION STATE...
              </motion.p>

              {/* Loading Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 2.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-vision-cyan to-vision-violet mt-8 rounded-full w-full shadow-neon-cyan"
              />
            </motion.div>

            {/* Footer Icon */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="absolute bottom-12 flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 mb-2">
                {userPhoto ? (
                  <img src={userPhoto} alt="User" className="w-full h-full object-cover opacity-50" />
                ) : (
                  <div className="w-full h-full bg-white/10" />
                )}
              </div>
              <span className="text-[10px] text-white/30 tracking-[0.5em]">AXIOM SECURE</span>
            </motion.div>

          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Navigation */}
            <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#030616]/80 backdrop-blur-xl">
              <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-vision-cyan/50 bg-vision-cyan/10 flex items-center justify-center shadow-neon-cyan">
                    <span className="text-vision-cyan font-bold text-xl">A</span>
                  </div>
                  <span className="font-bold text-xl tracking-widest text-white">AXIOM</span>
                </div>
                <div className="flex items-center gap-6">
                  <Button
                    onClick={() => router.push('/login')}
                    className="bg-vision-cyan/10 border border-vision-cyan/50 text-vision-cyan hover:bg-vision-cyan/20 hover:shadow-neon-cyan transition-all duration-300 rounded-full px-8"
                  >
                    ENTER PORTAL
                  </Button>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
              <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-5xl mx-auto space-y-8"
                >
                  <div className="inline-flex items-center rounded-full border border-vision-cyan/30 bg-vision-cyan/5 px-4 py-1.5 text-sm text-vision-cyan shadow-neon-cyan backdrop-blur-md">
                    <span className="flex h-2 w-2 rounded-full bg-vision-cyan mr-3 animate-pulse"></span>
                    VISION OS 2.0 ONLINE
                  </div>

                  <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-tight drop-shadow-2xl">
                    INFRASTRUCTURE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-vision-cyan via-white to-vision-violet animate-pulse-slow">
                      REIMAGINED
                    </span>
                  </h1>

                  <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                    Experience the future of digital management.
                    <span className="text-vision-cyan"> Neural monitoring</span>,
                    <span className="text-vision-violet"> quantum security</span>, and
                    <span className="text-white"> liquid interfaces</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                    <Button
                      size="lg"
                      className="h-16 px-12 text-lg bg-vision-cyan text-[#030616] hover:bg-white hover:shadow-neon-cyan transition-all duration-300 font-bold tracking-widest rounded-full"
                      onClick={() => router.push('/login')}
                    >
                      INITIALIZE SYSTEM <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-vision-cyan/10 rounded-full blur-[150px] -z-10 animate-pulse-slow" />
            </section>

            {/* Features Grid */}
            <section className="py-32 relative">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: Cpu, title: "Neural Compute", desc: "AI-driven resource allocation." },
                    { icon: Shield, title: "Quantum Security", desc: "Post-quantum encryption standards." },
                    { icon: Zap, title: "Flash Scaling", desc: "Microsecond latency adjustments." }
                  ].map((feature, i) => (
                    <Card key={i} className="glass-panel glass-panel-hover border-white/5 bg-[#0A1026]/40 rounded-3xl overflow-hidden group">
                      <CardHeader className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vision-cyan/20 to-vision-violet/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <feature.icon className="w-8 h-8 text-vision-cyan group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="text-2xl text-white font-light tracking-wide">{feature.title}</CardTitle>
                        <CardDescription className="text-slate-400 text-base mt-2">
                          {feature.desc}
                        </CardDescription>
                      </CardHeader>
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-vision-cyan/5 to-vision-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
