'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  BarChart3,
  Shield,
  GitBranch,
  Database,
  ArrowUpRight,
  Activity,
  Zap,
  Server,
  Globe,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useUser } from '@/components/providers/UserContext';

const dashboardCards = [
  {
    title: "Compute Cluster",
    icon: Cpu,
    description: "Neural scaling active. 98% efficiency.",
    status: "OPTIMAL",
    color: "text-vision-cyan",
    gradient: "from-vision-cyan/20 to-transparent",
    href: "/dashboard/modules/kubernetes"
  },
  {
    title: "Quantum Storage",
    icon: HardDrive,
    description: "Immutable shards. Zero-knowledge encryption.",
    status: "SECURE",
    color: "text-vision-violet",
    gradient: "from-vision-violet/20 to-transparent",
    href: "/dashboard/modules/minio"
  },
  {
    title: "Global Telemetry",
    icon: Activity,
    description: "Real-time latency monitoring across regions.",
    status: "LIVE",
    color: "text-emerald-400",
    gradient: "from-emerald-400/20 to-transparent",
    href: "/dashboard/modules/prometheus"
  },
  {
    title: "Threat Defense",
    icon: Shield,
    description: "AI-driven anomaly detection engaged.",
    status: "ARMED",
    color: "text-rose-400",
    gradient: "from-rose-400/20 to-transparent",
    href: "/dashboard/modules/vault"
  },
  {
    title: "Pipeline Flow",
    icon: GitBranch,
    description: "Continuous deployment streams active.",
    status: "FLOWING",
    color: "text-amber-400",
    gradient: "from-amber-400/20 to-transparent",
    href: "/dashboard/modules/gitlab"
  },
  {
    title: "Data Nexus",
    icon: Database,
    description: "Distributed graph nodes synchronized.",
    status: "SYNCED",
    color: "text-blue-400",
    gradient: "from-blue-400/20 to-transparent",
    href: "/dashboard/modules/postgresql"
  }
];

export default function DashboardPage() {
  const { userPhoto } = useUser();

  return (
    <div className="space-y-8 relative min-h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center justify-between relative z-10 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-widest flex items-center gap-4">
            <div className="p-2 rounded-lg bg-vision-cyan/10 border border-vision-cyan/50 shadow-neon-cyan">
              <Activity className="w-6 h-6 text-vision-cyan animate-pulse" />
            </div>
            AXIOM PORTAL
          </h1>
          <p className="text-vision-cyan/60 mt-2 font-mono text-sm tracking-[0.3em] uppercase pl-1">
            System Status: Nominal
          </p>
        </div>

        {/* Top Right Status Indicator */}
        <div className="hidden md:flex items-center gap-4">
          <div className="px-6 py-2 rounded-full bg-[#0A1026]/80 border border-vision-cyan/30 text-vision-cyan text-xs font-mono flex items-center shadow-bloom backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-vision-cyan mr-3 animate-pulse" />
            NETWORK ONLINE
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-24">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={card.href}>
              <Card className="group glass-panel border-white/5 hover:border-vision-cyan/30 bg-[#0A1026]/40 hover:bg-[#0A1026]/60 transition-all duration-500 overflow-hidden relative h-full cursor-pointer">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${card.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-white mt-4 font-light tracking-wide group-hover:text-vision-cyan transition-colors">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {card.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status</span>
                    <span className={`text-[10px] font-mono ${card.color} flex items-center tracking-widest`}>
                      {card.status}
                      <span className="w-1 h-1 rounded-full bg-current ml-2 animate-pulse" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Right Avatar Capsule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center gap-4"
      >
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 border-vision-cyan/30 shadow-neon-cyan bg-[#030616]/80 backdrop-blur-xl">
          <div className="text-right">
            <div className="text-[10px] text-vision-cyan font-mono tracking-widest uppercase">Session Active</div>
            <div className="text-xs text-white font-bold">00:42:15</div>
          </div>
          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-vision-cyan to-vision-violet relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-vision-navy flex items-center justify-center">
                  <Activity className="w-6 h-6 text-vision-cyan" />
                </div>
              )}
            </div>
            {/* Ping Animation */}
            <div className="absolute -inset-1 rounded-full border border-vision-cyan/50 animate-ping opacity-20" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
