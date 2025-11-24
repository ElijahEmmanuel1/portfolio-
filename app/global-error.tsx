'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="bg-vision-navy text-white min-h-screen flex items-center justify-center overflow-hidden relative">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#030616] via-[#050A20] to-[#0A1026]" />
                </div>

                <div className="relative z-10 text-center p-8 max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>

                    <h2 className="text-3xl font-bold tracking-widest mb-2 text-red-500">CRITICAL FAILURE</h2>
                    <p className="text-slate-400 font-mono text-sm mb-8 tracking-wider">
                        SYSTEM MALFUNCTION DETECTED.<br />
                        ERROR CODE: {error.digest || 'UNKNOWN'}
                    </p>

                    <Button
                        onClick={() => reset()}
                        className="bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 font-mono tracking-widest"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        REBOOT SYSTEM
                    </Button>
                </div>
            </body>
        </html>
    );
}
