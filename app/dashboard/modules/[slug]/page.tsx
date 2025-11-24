import { notFound } from 'next/navigation';
import { getModuleBySlug, getAllModules } from '@/lib/modules';
import {
    ModuleHeader,
    ModuleOverview,
    ModuleTerminal,
    ModuleWorkflows,
    ModuleMetrics,
    AddToInfrastructureBtn
} from '@/components/modules/ModuleComponents';

export async function generateStaticParams() {
    const modules = getAllModules();
    return modules.map((module) => ({
        slug: module.id,
    }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
    const module = getModuleBySlug(params.slug);

    if (!module) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            <ModuleHeader module={module} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Overview & Workflows */}
                <div className="lg:col-span-2 space-y-8">
                    <ModuleOverview module={module} />
                    <ModuleWorkflows module={module} />
                    <ModuleTerminal module={module} />
                </div>

                {/* Right Column: Metrics & Actions */}
                <div className="space-y-8">
                    <AddToInfrastructureBtn moduleId={module.id} moduleTitle={module.title} />
                    <ModuleMetrics module={module} />

                    {/* Additional Info Card */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-medium mb-4">Documentation</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="hover:text-primary cursor-pointer transition-colors">• Official Documentation</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">• API Reference</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">• Community Forums</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
