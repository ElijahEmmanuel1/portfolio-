'use client';

import { motion } from 'framer-motion';
import { Settings, Shield, Bell, User, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-wide flex items-center gap-3">
                        <Settings className="w-8 h-8 text-vision-cyan animate-spin-slow" />
                        SYSTEM SETTINGS
                    </h1>
                    <p className="text-slate-400 mt-1 font-mono text-sm">
                        CONFIGURE GLOBAL PARAMETERS
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <Card className="glass-panel border-white/10 bg-[#0A1026]/60">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-vision-cyan" />
                                Profile Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-slate-400 uppercase">Display Name</label>
                                    <Input placeholder="John Doe" className="bg-black/20 border-white/10 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-slate-400 uppercase">Email Address</label>
                                    <Input placeholder="john@axiom.ai" className="bg-black/20 border-white/10 text-white" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button className="bg-vision-cyan text-black hover:bg-white">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel border-white/10 bg-[#0A1026]/60">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Bell className="w-5 h-5 text-vision-violet" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-sm text-slate-300">System Alerts</span>
                                <div className="w-10 h-5 rounded-full bg-vision-cyan/20 border border-vision-cyan/50 relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-vision-cyan shadow-neon-cyan" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-sm text-slate-300">Security Audits</span>
                                <div className="w-10 h-5 rounded-full bg-vision-cyan/20 border border-vision-cyan/50 relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-vision-cyan shadow-neon-cyan" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <Card className="glass-panel border-white/10 bg-[#0A1026]/60">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Shield className="w-5 h-5 text-emerald-400" />
                                Security Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-400 font-mono text-sm">SYSTEM SECURE</span>
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-slate-300">
                                    <Lock className="w-4 h-4 mr-2" /> Change Password
                                </Button>
                                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-slate-300">
                                    <Shield className="w-4 h-4 mr-2" /> 2FA Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
