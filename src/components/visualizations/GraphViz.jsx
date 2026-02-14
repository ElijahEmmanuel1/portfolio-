import React from 'react';

const GraphViz = () => (
    <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-6 overflow-hidden">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-500 mb-4 uppercase tracking-wider">Modélisation Graphe (Neo4j)</div>
        <svg viewBox="0 0 800 250" className="w-full h-auto">
            <line x1="100" y1="125" x2="300" y2="75" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
            <line x1="100" y1="125" x2="300" y2="175" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
            <line x1="300" y1="75" x2="500" y2="125" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
            <line x1="300" y1="175" x2="500" y2="125" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
            <line x1="500" y1="125" x2="700" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" />

            <circle cx="100" cy="125" r="30" className="fill-white dark:fill-slate-800" stroke="#eab308" strokeWidth="2" />
            <text x="100" y="130" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10" fontWeight="bold">Matière</text>

            <circle cx="300" cy="75" r="25" className="fill-white dark:fill-slate-800" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="80" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10">Lot A</text>

            <circle cx="300" cy="175" r="25" className="fill-white dark:fill-slate-800" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="180" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10">Lot B</text>

            <circle cx="500" cy="125" r="35" className="fill-white dark:fill-slate-800" stroke="#10b981" strokeWidth="2" />
            <text x="500" y="130" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10" fontWeight="bold">Ordre #502</text>

            <circle cx="700" cy="125" r="25" className="fill-red-50 dark:fill-red-950" stroke="#ef4444" strokeWidth="2" />
            <text x="700" y="130" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Défaut</text>

            <text x="200" y="90" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500" fontSize="10" transform="rotate(-15 200,90)">USED_IN</text>
            <text x="600" y="115" textAnchor="middle" fill="#ef4444" fontSize="10">HAS_DEFECT</text>
        </svg>
    </div>
);

export default GraphViz;
