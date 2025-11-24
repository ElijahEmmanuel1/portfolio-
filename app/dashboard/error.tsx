'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardError({
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
        <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center p-8 max-w-md glass-panel border-red-500/30 bg-red-900/10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold tracking-widest mb-2 text-white">MODULE ERROR</h2>
                <p className="text-slate-400 font-mono text-xs mb-6 tracking-wider">
                    AN UNEXPECTED EXCEPTION OCCURRED.<br />
                    {error.message || 'UNKNOWN ERROR'}
                </p>

                <Button
                    onClick={() => reset()}
                    className="bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 font-mono tracking-widest text-xs"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    RETRY OPERATION
                </Button>
            </div>
        </div>
    );
}
