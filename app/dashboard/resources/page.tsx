'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Server, HardDrive, Cpu, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ResourcesPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-[200vh]">
            {/* Holographic Header Line */}
            <div className="relative mb-12">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-white mt-6 tracking-widest font-mono"
                >
                    RESOURCE ALLOCATION
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-primary/60 font-mono text-sm mt-2"
                >
                    CLUSTER STATUS: NOMINAL
                </motion.p>
            </div>

            {/* Parallax Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar - Icons Only */}
                <div className="hidden lg:flex flex-col gap-8 sticky top-32 h-fit">
                    {[Server, HardDrive, Cpu, Activity].map((Icon, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-neon-cyan hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Icon className="w-6 h-6" />
                        </motion.div>
                    ))}
                </div>

                {/* Main Content - Liquid Glass Panels */}
                <div className="lg:col-span-2 space-y-8">
                    {[1, 2, 3].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                        >
                            <Card className="glass-panel p-8 border-white/10 hover:border-primary/30 transition-colors duration-500 group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 group-hover:shadow-neon-cyan transition-shadow duration-500">
                                            <Server className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl text-white mb-1">Node Cluster Alpha-{item}</CardTitle>
                                            <p className="text-slate-400 font-mono text-sm">ID: 8X-92-{item}9</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                                        RUNNING
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>CPU Usage</span>
                                            <span className="text-white">42%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "42%" }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-primary shadow-[0_0_10px_#00F0FF]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Memory Allocation</span>
                                            <span className="text-white">68%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "68%" }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                                className="h-full bg-secondary shadow-[0_0_10px_#7000FF]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
