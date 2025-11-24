'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, ShieldCheck, Upload, User, Scan } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUser } from '@/components/providers/UserContext';

export default function LoginPage() {
    const router = useRouter();
    const { userPhoto, setUserPhoto } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-vision-navy relative overflow-hidden selection:bg-vision-cyan selection:text-vision-navy">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#030616] via-[#050A20] to-[#0A1026]" />

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-vision-cyan rounded-full blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1.2, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8"
            >
                {/* Login Panel */}
                <div className="glass-panel rounded-3xl p-10 relative overflow-hidden group border-white/10 bg-[#0A1026]/60 backdrop-blur-2xl shadow-glass">

                    {/* User Photo Preview (Top Left) */}
                    <AnimatePresence>
                        {userPhoto && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute top-6 left-6 z-20"
                            >
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-vision-cyan/30 shadow-neon-cyan group-hover:scale-105 transition-transform duration-300">
                                    <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-vision-navy/80 to-transparent" />
                                    <Scan className="absolute bottom-1 right-1 w-4 h-4 text-vision-cyan animate-pulse" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vertical Animated Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-vision-cyan to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500" />

                    <div className="text-center mb-10 relative">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-vision-cyan/10 to-vision-violet/10 border border-white/10 flex items-center justify-center shadow-bloom relative group/icon">
                            <ShieldCheck className="w-10 h-10 text-vision-cyan group-hover/icon:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 rounded-2xl border border-vision-cyan/20 animate-pulse-slow" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-widest mb-2">AXIOM PORTAL</h1>
                        <p className="text-vision-cyan/60 text-xs font-mono tracking-[0.2em] uppercase">Secure Access Terminal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Photo Selection Button */}
                        <div className="flex justify-center mb-6">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoSelect}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-vision-cyan hover:border-vision-cyan/30 transition-all duration-300 text-xs font-mono"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {userPhoto ? 'UPDATE BIOMETRIC ID' : 'UPLOAD BIOMETRIC ID'}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-vision-cyan/80 uppercase tracking-widest ml-1">Identity</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within/input:text-vision-cyan transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="USER@AXIOM.AI"
                                    className="pl-12 h-12 bg-[#030616]/50 border-white/10 text-white placeholder:text-slate-600 focus:border-vision-cyan/50 focus:ring-vision-cyan/20 transition-all rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-mono text-vision-cyan/80 uppercase tracking-widest ml-1">Passcode</label>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within/input:text-vision-cyan transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-12 bg-[#030616]/50 border-white/10 text-white placeholder:text-slate-600 focus:border-vision-cyan/50 focus:ring-vision-cyan/20 transition-all rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-vision-cyan text-[#030616] hover:bg-white hover:shadow-neon-cyan font-bold tracking-widest transition-all duration-300 mt-6 rounded-xl text-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center font-mono">
                                    <span className="animate-pulse mr-2">AUTHENTICATING...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    INITIALIZE SESSION <ArrowRight className="ml-2 h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-slate-600 font-mono tracking-widest">
                        ENCRYPTED CONNECTION ESTABLISHED <span className="text-emerald-500 animate-pulse">●</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
