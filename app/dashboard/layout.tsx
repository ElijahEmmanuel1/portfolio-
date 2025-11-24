'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    LogOut,
    ChevronDown,
    ChevronRight,
    Cpu,
    Database,
    Server,
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
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { getAllModules, ModuleCategory } from '@/lib/modules';
import { useUser } from '@/components/providers/UserContext';

const IconMap: Record<string, any> = {
    Cpu, Database, Server, Shield, Activity, GitBranch, Globe, Box, Layers,
    HardDrive, Network, Lock, Key, FileCode, Workflow, Terminal
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { userPhoto } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        'Infrastructure': true,
        'Databases': true,
        'Monitoring': true
    });

    const modules = getAllModules();

    // Group modules by category
    const modulesByCategory = modules.reduce((acc, module) => {
        if (!acc[module.category]) {
            acc[module.category] = [];
        }
        acc[module.category].push(module);
        return acc;
    }, {} as Record<ModuleCategory, typeof modules>);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
            {/* Global Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow" />
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/10" />
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto backdrop-blur-xl flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-20 flex items-center px-6 border-b border-border shrink-0">
                    <div className="w-8 h-8 rounded-lg border border-primary/50 bg-primary/10 flex items-center justify-center shadow-neon-cyan mr-3">
                        <span className="text-primary font-bold">A</span>
                    </div>
                    <span className="font-bold text-lg tracking-widest text-foreground">AXIOM</span>
                    <button
                        className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                pathname === '/dashboard'
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-neon-cyan"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground hover:border hover:border-border"
                            )}
                        >
                            <LayoutDashboard className={cn("w-5 h-5 mr-3 transition-colors", pathname === '/dashboard' ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/infrastructure"
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                pathname === '/dashboard/infrastructure'
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-neon-cyan"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground hover:border hover:border-border"
                            )}
                        >
                            <Server className={cn("w-5 h-5 mr-3 transition-colors", pathname === '/dashboard/infrastructure' ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            My Infrastructure
                        </Link>
                    </div>

                    {/* Dynamic Categories */}
                    {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
                        <div key={category} className="space-y-1">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                            >
                                {category}
                                {expandedCategories[category] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            </button>

                            {expandedCategories[category] && (
                                <div className="space-y-1 ml-2 border-l border-border pl-2">
                                    {categoryModules.map((module) => {
                                        const href = `/dashboard/modules/${module.id}`;
                                        const isActive = pathname === href;
                                        const Icon = IconMap[module.iconName] || Box;
                                        return (
                                            <Link
                                                key={module.id}
                                                href={href}
                                                className={cn(
                                                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                                                    isActive
                                                        ? "bg-accent text-foreground border border-border"
                                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                )}
                                            >
                                                <Icon className={cn("w-4 h-4 mr-3 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                                {module.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="space-y-1 pt-4 border-t border-border">
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground hover:border hover:border-border transition-all duration-200 group"
                        >
                            <Settings className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-foreground" />
                            Settings
                        </Link>
                    </div>
                </div>

                <div className="p-4 border-t border-border bg-card/50 shrink-0">
                    <div className="flex items-center p-2 rounded-lg mb-4 bg-accent/50 border border-border">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-lg overflow-hidden relative border border-white/10">
                            {userPhoto ? (
                                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <span>JD</span>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-foreground">John Doe</p>
                            <p className="text-xs text-primary/80">SysAdmin</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => window.location.href = '/login'}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Disconnect
                    </Button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 glass-panel bg-background/50 backdrop-blur-md shrink-0">
                    <button
                        className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1 max-w-xl ml-4 lg:ml-0">
                        <div className="relative group">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="SEARCH SYSTEM..."
                                className="pl-10 bg-accent/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 w-full max-w-md font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#00F0FF]" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
