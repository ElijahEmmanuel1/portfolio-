import React from 'react';

const ChartViz = () => (
    <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-6 overflow-hidden">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-500 mb-4 uppercase tracking-wider">Détection d'Anomalies (Temps Réel)</div>
        <svg viewBox="0 0 800 200" className="w-full h-auto">
            <line x1="50" y1="180" x2="750" y2="180" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
            <line x1="50" y1="20" x2="50" y2="180" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />

            <rect x="50" y="20" width="700" height="60" fill="#ef4444" fillOpacity="0.1" />
            <line x1="50" y1="80" x2="750" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
            <text x="760" y="85" fill="#ef4444" fontSize="10">Seuil Critique</text>

            <polyline
                points="50,150 100,145 150,155 200,140 250,148 300,135 350,140 400,120 450,130 500,90 550,50 600,40 650,60 700,140 750,135"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
            />

            <circle cx="550" cy="50" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1" />
            <circle cx="600" cy="40" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1" />
            <text x="560" y="35" fill="#ef4444" fontSize="12" fontWeight="bold">Anomalie Détectée</text>
        </svg>
    </div>
);

export default ChartViz;
