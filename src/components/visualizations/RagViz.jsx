import React from 'react';

const RagViz = () => (
    <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-6 overflow-hidden">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-500 mb-4 uppercase tracking-wider">Architecture RAG (Retrieval-Augmented Gen)</div>
        <svg viewBox="0 0 800 200" className="w-full h-auto">
            <defs>
                <marker id="arrow-rag" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" className="fill-slate-400 dark:fill-slate-500" />
                </marker>
            </defs>

            <rect x="50" y="75" width="80" height="50" rx="4" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-500" />
            <text x="90" y="105" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="12">PDFs</text>

            <rect x="200" y="75" width="100" height="50" rx="4" className="fill-white dark:fill-slate-800" stroke="#a855f7" />
            <text x="250" y="105" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="12">Embedding</text>

            <path d="M350,60 L350,140 L450,140 L450,60 Z" className="fill-white dark:fill-slate-800" stroke="#eab308" />
            <text x="400" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="12" fontWeight="bold">ChromaDB</text>
            <text x="400" y="115" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="10">Vector Store</text>

            <rect x="550" y="50" width="100" height="100" rx="8" className="fill-slate-50 dark:fill-slate-900" stroke="#10b981" strokeWidth="2" />
            <text x="600" y="95" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">LLM</text>
            <text x="600" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10">Ollama / GPT</text>

            <circle cx="750" cy="100" r="25" className="fill-slate-200 dark:fill-slate-700" />
            <text x="750" y="105" textAnchor="middle" className="fill-slate-800 dark:fill-white" fontSize="10">User</text>

            <line x1="130" y1="100" x2="190" y2="100" className="stroke-slate-400 dark:stroke-slate-500" markerEnd="url(#arrow-rag)" />
            <line x1="300" y1="100" x2="340" y2="100" className="stroke-slate-400 dark:stroke-slate-500" markerEnd="url(#arrow-rag)" />
            <line x1="450" y1="100" x2="540" y2="100" className="stroke-slate-400 dark:stroke-slate-500" markerEnd="url(#arrow-rag)" />
            <line x1="650" y1="100" x2="715" y2="100" className="stroke-slate-400 dark:stroke-slate-500" markerEnd="url(#arrow-rag)" />
        </svg>
    </div>
);

export default RagViz;
