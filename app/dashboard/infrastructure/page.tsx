'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Server,
    ArrowRight,
    Plus,
    CheckCircle2,
    Cpu,
    Database,
    Shield,
    Activity,
    GitBranch,
    Globe,
    Box,
    Layers,
    HardDrive,
    Network,
    Lock,
    Key,
    FileCode,
    Workflow,
    Terminal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useInfrastructure } from '@/components/providers/InfrastructureContext';
import { getAllModules } from '@/lib/modules';

const IconMap: Record<string, any> = {
    Cpu, Database, Server, Shield, Activity, GitBranch, Globe, Box, Layers,
    HardDrive, Network, Lock, Key, FileCode, Workflow, Terminal
};

export default function MyInfrastructurePage() {
    const { installedModules } = useInfrastructure();
    const allModules = getAllModules();

    const myModules = allModules.filter(m => installedModules.includes(m.id));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-2">My Infrastructure</h1>
                    <p className="text-slate-400">Manage your provisioned resources and active services.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm">
                        {myModules.length} ACTIVE SERVICES
                    </div>
                </div>
            </div>

            {/* Content */}
            {myModules.length === 0 ? (
                <Card className="border-dashed border-white/10 bg-white/5">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Server className="w-10 h-10 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Infrastructure Provisioned</h3>
                        <p className="text-slate-400 max-w-md text-center mb-8">
                            You haven't added any modules to your infrastructure yet. Browse the catalog to provision resources.
                        </p>
                        <Link href="/dashboard">
                            <Button className="bg-primary text-black hover:bg-primary/90">
                                <Plus className="w-5 h-5 mr-2" />
                                Browse Modules
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myModules.map((module, index) => {
                        const Icon = IconMap[module.iconName] || Box;

                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/dashboard/modules/${module.id}`}>
                                    <Card className="h-full glass-panel border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group cursor-pointer overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <CardHeader className="flex flex-row items-start justify-between pb-2 relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center backdrop-blur-md">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_10px_#4ade80]" />
                                                ACTIVE
                                            </div>
                                        </CardHeader>

                                        <CardContent className="relative z-10">
                                            <CardTitle className="text-xl mb-2 text-white group-hover:text-primary transition-colors">
                                                {module.title}
                                            </CardTitle>
                                            <p className="text-sm text-slate-300 line-clamp-2 mb-6 font-light">
                                                {module.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                                <div className="text-xs font-mono text-slate-400">
                                                    UPTIME: <span className="text-primary text-glow">{module.metrics.uptime}</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
