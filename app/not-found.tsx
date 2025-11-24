'use client';

import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-vision-navy relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#030616] via-[#050A20] to-[#0A1026]" />
            </div>

            <div className="relative z-10 text-center p-8 max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-vision-cyan/10 border border-vision-cyan/30 flex items-center justify-center shadow-neon-cyan">
                    <FileQuestion className="w-12 h-12 text-vision-cyan" />
                </div>

                <h2 className="text-4xl font-bold tracking-widest mb-2 text-white">404</h2>
                <p className="text-vision-cyan font-mono text-sm mb-2 tracking-[0.2em] uppercase">Signal Lost</p>
                <p className="text-slate-400 text-sm mb-8">
                    The requested resource could not be located in the current sector.
                </p>

                <Link href="/dashboard">
                    <Button
                        className="bg-vision-cyan text-black hover:bg-white hover:shadow-neon-cyan transition-all duration-300 font-mono tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        RETURN TO DASHBOARD
                    </Button>
                </Link>
            </div>
        </div>
    );
}
