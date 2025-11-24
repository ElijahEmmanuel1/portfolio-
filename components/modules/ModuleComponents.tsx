'use client';

import { motion } from 'framer-motion';
import {
    Terminal,
    Play,
    CheckCircle2,
    Activity,
    ArrowRight,
    Plus,
    Cpu,
    Database,
    Server,
    Shield,
    GitBranch,
    Globe,
    Box,
    Layers,
    HardDrive,
    Network,
    Lock,
    Key,
    FileCode,
    Workflow
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ModuleData } from '@/lib/modules';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
    Cpu, Database, Server, Shield, Activity, GitBranch, Globe, Box, Layers,
    HardDrive, Network, Lock, Key, FileCode, Workflow, Terminal
};

export function ModuleHeader({ module }: { module: ModuleData }) {
    const Icon = IconMap[module.iconName] || Box;

    return (
        <div className="relative mb-12 p-8 rounded-3xl overflow-hidden">
            {/* Animated Banner Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid-flow" />

            <div className="relative z-10 flex items-center gap-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                >
                    <Icon className="w-12 h-12 text-white" />
                </motion.div>

                <div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl font-bold text-white tracking-tight mb-2"
                    >
                        {module.title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary/80 font-light"
                    >
                        {module.description}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

export function ModuleOverview({ module }: { module: ModuleData }) {
    return (
        <Card className="glass-panel border-white/10">
            <CardHeader>
                <CardTitle className="text-2xl text-white">What is this service?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                    {module.longDescription}
                </p>
                <div className="p-6 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <Activity className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-slate-400 font-mono">ARCHITECTURE DIAGRAM PLACEHOLDER</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ModuleTerminal({ module }: { module: ModuleData }) {
    return (
        <Card className="glass-panel border-white/10 overflow-hidden">
            <div className="bg-black/40 border-b border-white/10 p-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-400">COMMAND CENTER</span>
            </div>
            <CardContent className="p-0">
                <div className="p-6 space-y-4 font-mono text-sm">
                    {module.commands.map((cmd, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-4 rounded-lg bg-black/20 border border-white/5 hover:border-primary/30 transition-colors"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary transition-colors rounded-l-lg" />
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-primary/70 uppercase tracking-wider">{cmd.category}</span>
                                <Button size="sm" variant="ghost" className="h-6 text-xs hover:bg-primary/20 hover:text-primary">
                                    <Play className="w-3 h-3 mr-1" /> Run
                                </Button>
                            </div>
                            <code className="block text-white group-hover:text-neon-cyan transition-colors">
                                $ {cmd.command}
                            </code>
                            <p className="text-slate-500 text-xs mt-2">{cmd.description}</p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function ModuleWorkflows({ module }: { module: ModuleData }) {
    return (
        <Card className="glass-panel border-white/10">
            <CardHeader>
                <CardTitle className="text-2xl text-white">Usage & Workflows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {module.workflows.map((workflow, i) => (
                    <div key={i} className="space-y-3">
                        <h3 className="text-lg font-medium text-white flex items-center">
                            <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs mr-3 border border-secondary/30">
                                {i + 1}
                            </span>
                            {workflow.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 ml-9">
                            {workflow.steps.map((step, j) => (
                                <div key={j} className="flex items-center">
                                    <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
                                        {step}
                                    </div>
                                    {j < workflow.steps.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-slate-600 mx-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export function ModuleMetrics({ module }: { module: ModuleData }) {
    return (
        <Card className="glass-panel border-white/10">
            <CardHeader>
                <CardTitle className="text-xl text-white">Live Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">CPU Load</span>
                        <span className="text-white font-mono">{module.metrics.cpu}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${module.metrics.cpu}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-primary shadow-[0_0_10px_#00F0FF]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Memory Usage</span>
                        <span className="text-white font-mono">{module.metrics.memory}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${module.metrics.memory}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-secondary shadow-[0_0_10px_#7000FF]"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                        {module.metrics.status}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

import { useInfrastructure } from '@/components/providers/InfrastructureContext';
import { ExternalLink } from 'lucide-react';

export function AddToInfrastructureBtn({ moduleId, moduleTitle }: { moduleId: string, moduleTitle: string }) {
    const { installModule, isInstalled } = useInfrastructure();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'installed'>('idle');

    // Check initial status
    useEffect(() => {
        if (isInstalled(moduleId)) {
            setStatus('installed');
        }
    }, [moduleId, isInstalled]);

    const handleAdd = () => {
        if (status === 'installed') {
            // Simulate launching the app
            window.open(`https://example.com/${moduleId}`, '_blank');
            return;
        }

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            installModule(moduleId);
            setStatus('success');
            // Reset after 3 seconds to installed state
            setTimeout(() => setStatus('installed'), 3000);
        }, 2000);
    };

    return (
        <div className="relative">
            <Button
                onClick={handleAdd}
                disabled={status === 'loading'}
                className={cn(
                    "w-full h-14 font-bold text-lg transition-all duration-500 group relative overflow-hidden",
                    status === 'idle' ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]" : "",
                    status === 'loading' ? "bg-white/10 text-slate-300 cursor-wait" : "",
                    status === 'success' ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(74,222,128,0.3)]" : "",
                    status === 'installed' ? "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.4)]" : ""
                )}
            >
                <span className="relative z-10 flex items-center justify-center">
                    {status === 'idle' && (
                        <>
                            <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform" />
                            ADD TO INFRASTRUCTURE
                        </>
                    )}
                    {status === 'loading' && (
                        <>
                            <Activity className="w-6 h-6 mr-2 animate-spin" />
                            PROVISIONING RESOURCES...
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            <CheckCircle2 className="w-6 h-6 mr-2" />
                            MODULE DEPLOYED
                        </>
                    )}
                    {status === 'installed' && (
                        <>
                            <ExternalLink className="w-6 h-6 mr-2" />
                            GO TO {moduleTitle.toUpperCase()}
                        </>
                    )}
                </span>
                {status === 'idle' && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
            </Button>

            {/* Success Popup / Hologram */}
            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-full left-0 right-0 mt-4 p-4 rounded-xl bg-black/80 border border-green-500/30 backdrop-blur-xl shadow-2xl z-50"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-green-500/20 text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-medium">Deployment Successful</h4>
                            <p className="text-sm text-slate-400 mt-1">
                                The module has been successfully provisioned to your cluster.
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 3, ease: "linear" }}
                            className="h-full bg-green-500"
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
