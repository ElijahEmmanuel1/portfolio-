import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Terminal,
    Database,
    Cpu,
    Brain,
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Activity,
    MapPin,
    Phone,
    X,
    Code,
    CheckCircle2,
    ArrowRight,
    Sun,
    Moon,
    Download,
    GraduationCap,
    Globe,
    BarChart3,
    Menu,
    Briefcase,
    TrendingUp,
    Zap,
    Send,
    BookOpen,
    Clock,
    FileText,
    User,
    MessageSquare,
} from 'lucide-react';
import { projects, experiences, skills, education, languages, profileBio, articles, methodology, futureProjects } from '../data/constants';
import { useTheme } from '../hooks/useTheme';

/* ───────────────────────────────────────
   Custom Hook: Scroll Reveal
   ─────────────────────────────────────── */
const useScrollReveal = () => {
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        revealElements.forEach((el) => observer.observe(el));
        return () => revealElements.forEach((el) => observer.unobserve(el));
    }, []);
};

/* ───────────────────────────────────────
   Custom Hook: Active Section Detection
   ─────────────────────────────────────── */
const useActiveSection = (sectionIds) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeSection;
};

/* ───────────────────────────────────────
   Custom Hook: Animated Counter
   ─────────────────────────────────────── */
const useCountUp = (end, duration = 2000, startOnView = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!startOnView) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [hasStarted, end, duration]);

    return { count, ref };
};

/* ───────────────────────────────────────
   AnimatedStat Component
   ─────────────────────────────────────── */
const AnimatedStat = ({ value, suffix = '', label }) => {
    const { count, ref } = useCountUp(value, 1500);

    return (
        <div ref={ref}>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {count}<span className="text-emerald-600 dark:text-emerald-500">{suffix}</span>
            </div>
            <div className="text-sm text-slate-400 dark:text-slate-500 mt-1">{label}</div>
        </div>
    );
};

/* ───────────────────────────────────────
   Card Glow Mouse Tracker
   ─────────────────────────────────────── */
const useCardGlow = (ref) => {
    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }, [ref]);

    return { onMouseMove: handleMouseMove };
};

/* ───────────────────────────────────────
   Project Card Component
   ─────────────────────────────────────── */
const ProjectCard = ({ project, onClick, delay }) => {
    const cardRef = useRef(null);
    const { onMouseMove } = useCardGlow(cardRef);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={onMouseMove}
            style={{ transitionDelay: `${delay}ms` }}
            className="card-glow group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 hover:border-emerald-400/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 dark:hover:shadow-2xl dark:hover:shadow-emerald-900/10 cursor-pointer flex flex-col h-full"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:scale-110 transition-transform">
                        {project.icon}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        {project.category}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                    {project.shortDescription}
                </p>

                <div className="mb-6 space-y-2">
                    {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            {metric}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100 dark:border-slate-900">
                    {project.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs rounded-full border border-slate-200 dark:border-slate-800 font-mono">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Voir détails <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────
   Company Logos Data
   ─────────────────────────────────────── */
const companyLogos = [
    { name: 'bioMérieux', src: '/logos/biomerieux.png', url: 'https://www.biomerieux.com', size: 'h-16 md:h-20' },
    { name: 'SEW-USOCOME', src: '/logos/sew-usocome.png', url: 'https://www.sew-eurodrive.fr', size: 'h-16 md:h-20' },
    { name: 'Takasago', src: '/logos/takasago.png', url: 'https://www.takasago.com', size: 'h-12 md:h-16' },
];

/* ───────────────────────────────────────
   Page Loader Component
   ─────────────────────────────────────── */
const PageLoader = ({ onFinish }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 1200);
        const removeTimer = setTimeout(() => onFinish(), 1700);
        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, [onFinish]);

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950 ${fadeOut ? 'loader-fadeout' : ''}`}>
            <div className="loader-pulse flex items-center gap-3 mb-8">
                <Terminal className="w-10 h-10 text-emerald-600 dark:text-emerald-500" />
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Elijah<span className="text-emerald-600 dark:text-emerald-500">_</span>
                </span>
            </div>
            <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full progress-bar"></div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────
   Main Portfolio Component
   ─────────────────────────────────────── */
const Portfolio = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent, error
    const { isDark, toggleTheme } = useTheme();

    const navSections = ['about', 'projets', 'lab', 'approche', 'expérience', 'articles', 'formation', 'compétences', 'contact'];
    const activeSection = useActiveSection(navSections);
    useScrollReveal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.target);
        try {
            const res = await fetch('https://formspree.io/f/xpwzgkby', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                setFormStatus('sent');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 4000);
            } else {
                setFormStatus('error');
            }
        } catch {
            setFormStatus('error');
        }
    };

    const navLabels = {
        'about': 'About',
        'projets': 'Projets',
        'lab': 'R&D Lab',
        'approche': 'Approche',
        'expérience': 'Expérience',
        'articles': 'Articles',
        'formation': 'Formation',
        'compétences': 'Compétences',
        'contact': 'Contact'
    };

    return (
        <>
            {/* Page Loader */}
            {isLoading && <PageLoader onFinish={() => setIsLoading(false)} />}

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-sans selection:bg-emerald-500 selection:text-white relative">

                {/* ── Navigation ── */}
                <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4' : 'bg-transparent py-6'}`}>
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-slate-900 dark:text-slate-200">
                            <Terminal className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
                            <span>Elijah Bodipo Obiang<span className="text-emerald-600 dark:text-emerald-500 typing-cursor"></span></span>
                        </div>

                        {/* Desktop nav */}
                        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                            {navSections.map((id) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`nav-link hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${activeSection === id ? 'active' : ''}`}
                                >
                                    {navLabels[id]}
                                </button>
                            ))}
                        </div>

                        {/* Desktop actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110"
                                aria-label="Basculer le thème"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            <a
                                href="/cv_Bodipo_Obiang.pdf"
                                download
                                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all text-sm font-medium hover:scale-105"
                            >
                                <Download className="w-4 h-4" />
                                CV
                            </a>
                            <a
                                href="mailto:bodipoobiangelijah@gmail.com"
                                className="flex items-center gap-2 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-600/20 hover:bg-emerald-600 hover:text-white transition-all text-sm font-medium hover:scale-105"
                            >
                                <Mail className="w-4 h-4" />
                                Me Contacter
                            </a>
                        </div>

                        {/* Mobile controls */}
                        <div className="md:hidden flex items-center gap-2">
                            <a
                                href="/cv_Bodipo_Obiang.pdf"
                                download
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                aria-label="Télécharger CV"
                            >
                                <Download className="w-5 h-5" />
                            </a>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                aria-label="Basculer le thème"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mobile-menu-enter bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
                            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                                {navSections.map((id) => (
                                    <button
                                        key={id}
                                        onClick={() => scrollToSection(id)}
                                        className={`py-3 px-4 text-left text-base font-medium rounded-lg transition-all ${activeSection === id
                                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                                            }`}
                                    >
                                        {navLabels[id]}
                                    </button>
                                ))}
                                <a
                                    href="mailto:bodipoobiangelijah@gmail.com"
                                    className="mt-2 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-500 transition-all"
                                >
                                    <Mail className="w-4 h-4" />
                                    Me Contacter
                                </a>
                            </div>
                        </div>
                    )}
                </nav>

                {/* ── Hero / About ── */}
                <section id="about" className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 relative overflow-hidden">
                    {/* Animated orbs */}
                    <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 orb-1"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 orb-2"></div>
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10 orb-3"></div>

                    <div className="max-w-3xl">
                        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Disponible pour missions & CDI
                        </div>
                        <h1 className="reveal text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                            Je transforme les <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-600 dark:from-emerald-400 dark:to-cyan-500">POCs</span> en solutions industrielles.
                        </h1>
                        <p className="reveal text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
                            {profileBio}
                        </p>

                        <div className="reveal flex flex-col sm:flex-row gap-4">
                            <a href="#projets" onClick={(e) => { e.preventDefault(); scrollToSection('projets'); }} className="flex items-center justify-center gap-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-8 py-3 rounded-lg font-bold hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                                Voir mes projets
                                <ChevronDown className="w-4 h-4" />
                            </a>
                            <a
                                href="/cv_Bodipo_Obiang.pdf"
                                download
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 dark:from-emerald-500/10 dark:to-cyan-500/10 text-emerald-700 dark:text-emerald-400 px-8 py-3 rounded-lg font-bold border border-emerald-200/50 dark:border-emerald-800/50 hover:from-emerald-600/20 hover:to-cyan-600/20 transition-all hover:scale-105"
                            >
                                <Download className="w-5 h-5" />
                                Télécharger mon CV
                            </a>
                            <a href="https://github.com/elijah-bodipo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 hover:scale-105">
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                            <a href="https://linkedin.com/in/elijah-bodipo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 hover:scale-105">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Animated Stats Counters */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                        <AnimatedStat value={3} suffix="+" label="Expériences Industrie" />
                        <AnimatedStat value={4} suffix="" label="Projets Industriels" />
                        <AnimatedStat value={85} suffix="%" label="Précision Modèles" />
                        <AnimatedStat value={50} suffix="+" label="Jobs Monitorés/jour" />
                    </div>
                </section>

                {/* ── Ils m'ont fait confiance ── */}
                <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
                    <div className="container mx-auto px-6">
                        <div className="reveal text-center mb-8">
                            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Ils m'ont fait confiance
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                            {companyLogos.map((company) => (
                                <a
                                    key={company.name}
                                    href={company.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="reveal-scale group"
                                    title={company.name}
                                >
                                    <img
                                        src={company.src}
                                        alt={`Logo ${company.name}`}
                                        className={`${company.size} w-auto object-contain logo-grayscale`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Projets ── */}
                <section id="projets" className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Projets Techniques</h2>
                                <p className="text-slate-500 dark:text-slate-400">Réalisations concrètes axées sur l'impact industriel.</p>
                            </div>
                            <a href="https://github.com/elijah-bodipo" className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline mt-4 md:mt-0">
                                Voir tout le portfolio <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 stagger-children">
                            {projects.map((project, idx) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                    delay={idx * 100}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Expérience ── */}
                <section id="expérience" className="py-20 container mx-auto px-6">
                    <h2 className="reveal text-3xl font-bold text-slate-900 dark:text-white mb-12">Expérience Professionnelle</h2>
                    <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-12">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="reveal relative pl-8 md:pl-12">
                                <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-emerald-500 border-4 border-slate-50 dark:border-slate-950"></div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                    <span className="text-slate-400 dark:text-slate-500 font-mono text-sm">{exp.period}</span>
                                </div>

                                <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-1 flex items-center gap-2">
                                    {exp.company}
                                    <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-normal flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {exp.location}
                                    </span>
                                </div>
                                {exp.type && (
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mb-4 italic">{exp.type}</div>
                                )}

                                <ul className="space-y-2">
                                    {exp.details.map((detail, i) => (
                                        <li key={i} className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Formation ── */}
                <section id="formation" className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                        <h2 className="reveal text-3xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
                            Formation
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 stagger-children">
                            {education.map((edu, idx) => (
                                <div
                                    key={idx}
                                    className="card-glow group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 hover:border-emerald-400/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                                                <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-3xl font-black text-emerald-600/20 dark:text-emerald-500/20 font-mono">{edu.year}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">{edu.school}</p>
                                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-sm mb-4">
                                            <MapPin className="w-3 h-3" />
                                            {edu.location}
                                        </div>

                                        {edu.specialization && (
                                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                                                <div className="flex flex-wrap gap-2">
                                                    {edu.specialization.split(', ').map((spec) => (
                                                        <span key={spec} className="px-3 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs rounded-full border border-slate-200 dark:border-slate-800 font-mono">
                                                            {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── Langues ── */}
                        <div className="mt-16 reveal">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                                Langues
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
                                {languages.map((lang, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center hover:border-emerald-400/50 dark:hover:border-emerald-500/50 transition-all hover:shadow-lg"
                                    >
                                        <div className="relative w-20 h-20 mx-auto mb-4">
                                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-100 dark:text-slate-800" />
                                                <circle
                                                    cx="40" cy="40" r="34"
                                                    stroke="currentColor" strokeWidth="6" fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 34}`}
                                                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - lang.percent / 100)}`}
                                                    strokeLinecap="round"
                                                    className="text-emerald-500 transition-all duration-1000"
                                                />
                                            </svg>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
                                                {lang.percent}%
                                            </span>
                                        </div>
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">{lang.name}</div>
                                        <div className="text-sm text-slate-400 dark:text-slate-500">{lang.level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Compétences ── */}
                <section id="compétences" className="py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="reveal text-3xl font-bold text-slate-900 dark:text-white mb-12">Stack Technique</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
                            {Object.entries(skills).map(([category, items]) => (
                                <div key={category} className="card-glow bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-emerald-400/30 dark:hover:border-emerald-500/30 transition-all hover:shadow-lg">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            {category === "MLOps & Cloud" && <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />}
                                            {category === "Data Engineering" && <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />}
                                            {category === "Data Science" && <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />}
                                            {category === "GenAI" && <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />}
                                            {category === "Visualisation" && <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />}
                                            {category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((skill) => (
                                                <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm rounded-lg border border-slate-200/50 dark:border-slate-800/50 font-mono hover:border-emerald-400/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Projets en Cours / Future Projects ── */}
                <section id="lab" className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                        <div className="reveal text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                                <Zap className="w-7 h-7 text-amber-500" />
                                R&D Lab
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Projets en cours de développement et projets de recherche.</p>
                        </div>

                        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto stagger-children">
                            {futureProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="card-glow group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 relative overflow-hidden"
                                >
                                    {/* Status badge */}
                                    <div className="absolute top-6 right-6">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-200/50 dark:border-amber-800/50">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                            {project.status}
                                        </span>
                                    </div>

                                    <div className="relative z-10">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-600 dark:text-emerald-500">
                                                {project.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                                                <p className="text-emerald-600 dark:text-emerald-500 text-sm font-medium mt-0.5">{project.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

                                        {/* Progress bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                                                <span className="font-medium">Progression</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-500">{project.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Goals */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Objectifs clés</h4>
                                            <ul className="space-y-2">
                                                {project.goals.map((goal, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        {goal}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.stack.map((tech) => (
                                                <span key={tech} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs rounded-lg font-mono border border-slate-200 dark:border-slate-800">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Mon Approche / Méthodologie ── */}
                <section id="approche" className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                        <div className="reveal text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Mon Approche End-to-End</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">De la compréhension du problème métier jusqu'au monitoring en production.</p>
                        </div>

                        <div className="relative">
                            {/* Desktop: horizontal pipeline */}
                            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20"></div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 stagger-children">
                                {methodology.map((step) => (
                                    <div key={step.step} className="relative text-center group">
                                        <div className="relative z-10 mx-auto w-24 h-24 flex items-center justify-center bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-emerald-600 dark:text-emerald-500 mb-4 group-hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all group-hover:scale-110">
                                            {step.icon}
                                        </div>
                                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-500 mb-1 uppercase tracking-wider">Étape {step.step}</div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Articles & Veille Technique ── */}
                <section id="articles" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                                    <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
                                    Articles & Veille Technique
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">Réflexions et retours d'expérience sur le ML en production.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 stagger-children">
                            {articles.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => setSelectedArticle(article)}
                                    className="card-glow group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 cursor-pointer hover:border-emerald-400/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-emerald-600 dark:text-emerald-500">{article.icon}</div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                                                <Clock className="w-3 h-3" />
                                                {article.readTime}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {article.summary}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {article.tags.map((tag) => (
                                                    <span key={tag} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs rounded-full border border-slate-200 dark:border-slate-800 font-mono">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">{article.date}</span>
                                        </div>
                                        <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            Lire l'article <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Contact avec Formulaire ── */}
                <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-900">
                    <div className="container mx-auto px-6">
                        <div className="reveal text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Prêt à collaborer ?</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                                Consultant Data Scientist & MLOps Engineer — discutons de vos challenges industriels.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {/* Left: Form */}
                            <div className="reveal">
                                <form onSubmit={handleFormSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">Nom</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="Votre nom"
                                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    placeholder="votre@email.com"
                                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">Sujet</label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                placeholder="Sujet de votre message"
                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 block">Message</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                            <textarea
                                                name="message"
                                                required
                                                rows="5"
                                                placeholder="Décrivez votre projet ou besoin..."
                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'sending'}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all text-sm ${formStatus === 'sent'
                                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                            : formStatus === 'error'
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                                : 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25'
                                            }`}
                                    >
                                        {formStatus === 'sending' && <span className="animate-spin">⏳</span>}
                                        {formStatus === 'sent' && <><CheckCircle2 className="w-5 h-5" /> Message envoyé !</>}
                                        {formStatus === 'error' && <><X className="w-5 h-5" /> Erreur, réessayez</>}
                                        {formStatus === 'idle' && <><Send className="w-5 h-5" /> Envoyer le message</>}
                                    </button>
                                </form>
                            </div>

                            {/* Right: Direct info */}
                            <div className="reveal space-y-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Coordonnées directes</h3>
                                    <div className="space-y-4">
                                        <a href="mailto:bodipoobiangelijah@gmail.com" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm">bodipoobiangelijah@gmail.com</span>
                                        </a>
                                        <a href="tel:+33652704867" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm">06 52 70 48 67</span>
                                        </a>
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm">Lyon, France</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Retrouvez-moi</h3>
                                    <div className="flex gap-3">
                                        <a href="https://github.com/elijah-bodipo" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm font-medium">
                                            <Github className="w-5 h-5" />
                                            GitHub
                                        </a>
                                        <a href="https://linkedin.com/in/elijah-bodipo" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm font-medium">
                                            <Linkedin className="w-5 h-5" />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>

                                <a
                                    href="/cv_Bodipo_Obiang.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 dark:from-emerald-500/10 dark:to-cyan-500/10 text-emerald-700 dark:text-emerald-400 py-3 rounded-xl font-bold border border-emerald-200/50 dark:border-emerald-800/50 hover:from-emerald-600/20 hover:to-cyan-600/20 transition-all hover:scale-[1.02] text-sm"
                                >
                                    <Download className="w-5 h-5" />
                                    Télécharger mon CV
                                </a>
                            </div>
                        </div>

                        <div className="mt-16 text-center text-sm text-slate-400 dark:text-slate-600">
                            © 2025 Elijah BODIPO OBIANG.
                        </div>
                    </div>
                </section>

                {/* ── Back to Top Button ── */}
                {showBackToTop && (
                    <button
                        onClick={scrollToTop}
                        className="back-to-top-enter fixed bottom-8 right-8 z-50 p-3 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-full shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-110 transition-all"
                        aria-label="Retour en haut"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </button>
                )}

                {/* ── Project Detail Modal ── */}

                {/* ── Article Detail Modal ── */}
                {selectedArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-2xl shadow-2xl relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all z-10 hover:scale-110 hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-600 dark:text-emerald-500">{selectedArticle.icon}</div>
                                    <div>
                                        <div className="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500 mb-1">
                                            <span>{selectedArticle.date}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedArticle.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedArticle.title}</h3>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                    {selectedArticle.summary}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    {selectedArticle.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-mono border border-emerald-200/50 dark:border-emerald-800/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all z-10 hover:scale-110 hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-emerald-600 dark:text-emerald-500">
                                        {selectedProject.icon}
                                    </div>
                                    <div>
                                        <div className="text-emerald-600 dark:text-emerald-500 text-sm font-bold tracking-wider uppercase mb-1">{selectedProject.category}</div>
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h3>
                                    </div>
                                </div>

                                {selectedProject.visual && (
                                    <div className="animate-fade-in-up">
                                        {selectedProject.visual}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-3">
                                                <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                                Le Problème
                                            </h4>
                                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {selectedProject.details.problem}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-3">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                                La Solution
                                            </h4>
                                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {selectedProject.details.solution}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-3">
                                                <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                                                Architecture Technique
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedProject.details.architecture.map((step, idx) => (
                                                    <li key={idx} className="flex gap-3 text-slate-500 dark:text-slate-400 text-sm">
                                                        <span className="font-mono text-emerald-500/50">{idx + 1}.</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Impact & Métriques</h4>
                                            <div className="space-y-4">
                                                {selectedProject.metrics.map((metric, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{metric}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold mb-3">Stack Complète</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.stack.map((tech) => (
                                                    <span key={tech} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 text-emerald-700 dark:text-emerald-400 text-sm rounded border border-slate-200 dark:border-slate-800 font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedProject.details.challenges && (
                                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-lg border border-emerald-200/50 dark:border-emerald-900/20">
                                                <h4 className="text-emerald-700 dark:text-emerald-400 font-bold mb-2 text-sm uppercase">Challenge Principal</h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm italic">
                                                    "{selectedProject.details.challenges}"
                                                </p>
                                            </div>
                                        )}

                                        <a href="#" className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                                            <Github className="w-5 h-5" />
                                            Voir le Code sur GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Portfolio;
