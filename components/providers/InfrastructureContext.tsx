'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface InfrastructureContextType {
    installedModules: string[];
    installModule: (moduleId: string) => void;
    uninstallModule: (moduleId: string) => void;
    isInstalled: (moduleId: string) => boolean;
}

const InfrastructureContext = createContext<InfrastructureContextType | undefined>(undefined);

export function InfrastructureProvider({ children }: { children: React.ReactNode }) {
    const [installedModules, setInstalledModules] = useState<string[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('axiom_installed_modules');
        if (saved) {
            try {
                setInstalledModules(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse installed modules', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('axiom_installed_modules', JSON.stringify(installedModules));
    }, [installedModules]);

    const installModule = (moduleId: string) => {
        if (!installedModules.includes(moduleId)) {
            setInstalledModules(prev => [...prev, moduleId]);
        }
    };

    const uninstallModule = (moduleId: string) => {
        setInstalledModules(prev => prev.filter(id => id !== moduleId));
    };

    const isInstalled = (moduleId: string) => {
        return installedModules.includes(moduleId);
    };

    return (
        <InfrastructureContext.Provider value={{ installedModules, installModule, uninstallModule, isInstalled }}>
            {children}
        </InfrastructureContext.Provider>
    );
}

export function useInfrastructure() {
    const context = useContext(InfrastructureContext);
    if (context === undefined) {
        throw new Error('useInfrastructure must be used within a InfrastructureProvider');
    }
    return context;
}
