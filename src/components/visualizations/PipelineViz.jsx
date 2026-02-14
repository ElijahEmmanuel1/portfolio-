import React from 'react';

const PipelineViz = () => (
    <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-6 overflow-hidden">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-500 mb-4 uppercase tracking-wider">Flux de Données & Orchestration</div>
        <svg viewBox="0 0 800 200" className="w-full h-auto">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" className="fill-slate-400 dark:fill-slate-500" />
                </marker>
            </defs>

            <path d="M120,100 L240,100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M360,100 L480,100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M600,100 L720,100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="2" markerEnd="url(#arrow)" />

            <circle r="4" fill="#10b981">
                <animateMotion dur="2s" repeatCount="indefinite" path="M120,100 L240,100" />
            </circle>
            <circle r="4" fill="#10b981">
                <animateMotion dur="2s" begin="0.6s" repeatCount="indefinite" path="M360,100 L480,100" />
            </circle>
            <circle r="4" fill="#10b981">
                <animateMotion dur="2s" begin="1.2s" repeatCount="indefinite" path="M600,100 L720,100" />
            </circle>

            <rect x="20" y="60" width="100" height="80" rx="8" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
            <text x="70" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" fontSize="14" fontWeight="bold">SAP / ERP</text>
            <text x="70" y="115" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="10">Source CSV</text>

            <rect x="240" y="60" width="120" height="80" rx="8" className="fill-white dark:fill-slate-800" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <text x="300" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" fontSize="14" fontWeight="bold">AWS S3</text>
            <text x="300" y="115" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="10">Raw Storage</text>

            <rect x="480" y="50" width="120" height="100" rx="8" className="fill-slate-50 dark:fill-slate-900" stroke="#10b981" strokeWidth="3" />
            <text x="540" y="90" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">Dagster</text>
            <text x="540" y="110" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" fontSize="12">Processing</text>
            <text x="540" y="130" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500" fontSize="10">Dockerized</text>

            <path d="M720,60 C720,55 780,55 780,60 L780,140 C780,145 720,145 720,140 Z" className="fill-white dark:fill-slate-800" stroke="#3b82f6" strokeWidth="2" />
            <ellipse cx="750" cy="60" rx="30" ry="5" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <text x="750" y="105" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" fontSize="14" fontWeight="bold">Postgres</text>
            <text x="750" y="125" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="10">Warehouse</text>
        </svg>
    </div>
);

export default PipelineViz;
