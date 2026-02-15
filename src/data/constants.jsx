import { Server, Layers, Activity, Brain, Rocket, Bot, BarChart3 as BarChartIcon, Search, Crosshair, Wrench, FlaskConical, Container, Radio, Shield, Sparkles, GitBranch } from 'lucide-react';
import { PipelineViz, GraphViz, ChartViz, RagViz } from '../components/visualizations';

export const profileBio = `Ingénieur Data Scientist & MLOps junior, je me spécialise dans l'industrialisation de modèles IA et l'architecture de données haute performance. Jeune diplômé doté d'une solide base mathématique, je maîtrise l'intégralité du cycle de vie des modèles, de la modélisation statistique à la mise en production (CI/CD, Kubernetes, Dagster). Expert dans le déploiement de solutions GenAI (RAG) et l'automatisation de pipelines MLOps, j'ai pour objectif de transformer des POCs complexes en systèmes robustes, scalables et monitorés pour des environnements industriels.`;

export const projects = [
    {
        id: 1,
        title: "Industrial Data Orchestrator",
        category: "MLOps & Data Engineering",
        description: "Pipeline ETL résilient orchestré pour la consolidation de données critiques (SAP vers PostgreSQL).",
        shortDescription: "Remplacement de scripts fragiles par une architecture monitorée avec Dagster.",
        stack: ["Dagster", "Docker", "PostgreSQL", "AWS S3"],
        metrics: ["-80% temps de consolidation", "Zéro perte de données", "Monitoring temps réel"],
        icon: <Server className="w-6 h-6" />,
        visual: <PipelineViz />,
        details: {
            problem: "Les consolidations manuelles de données SAP prenaient 4h/jour aux équipes, avec des scripts Python dispersés sans gestion d'erreurs ni logs centralisés.",
            solution: "Déploiement d'un orchestrateur Dagster conteneurisé. Chaque étape (Extraction, Transformation, Load) est un 'Asset' typé et testable. Implémentation de politiques de 'Retry' automatiques.",
            architecture: [
                "Ingestion : Connecteurs custom pour extraire les CSVs SAP déposés sur S3.",
                "Validation : Pydantic pour garantir le schéma des données avant insertion.",
                "Stockage : PostgreSQL optimisé (Partitionnement par date) pour les requêtes analytiques.",
                "Orchestration : Dagster Daemon tournant sous Docker Compose."
            ],
            challenges: "Gérer les changements de schémas soudains dans les exports SAP sans casser tout le pipeline (Solution: Schema Evolution Warning)."
        }
    },
    {
        id: 2,
        title: "Supply Chain Graph Analytics",
        category: "Graph Data Science",
        description: "Système de traçabilité avancé modélisant les relations Lots ↔ Ordres ↔ Défauts.",
        shortDescription: "Utilisation de Neo4j pour résoudre des problèmes de traçabilité impossibles en SQL.",
        stack: ["Neo4j", "Python", "NetworkX", "Cypher", "Streamlit"],
        metrics: ["-70% temps d'investigation", "Traçabilité multi-niveaux", "Visualisation interactive"],
        icon: <Layers className="w-6 h-6" />,
        visual: <GraphViz />,
        details: {
            problem: "Lors d'un défaut qualité, retrouver l'origine (quel lot de matière première ?) nécessitait 15+ jointures SQL récursives, prenant plusieurs minutes voire timeout.",
            solution: "Modélisation en Graphe. Les entités (Lot, Produit, Machine) deviennent des Noeuds, les actions (Utilisé_Dans, Transformé_Par) des Relations.",
            architecture: [
                "Data Loading : Scripts Python (Driver Neo4j) pour transformer les logs SQL en structure Graphe.",
                "Algorithmes : Utilisation de 'Shortest Path' pour trouver la cause racine instantanément.",
                "Frontend : Interface Streamlit permettant aux qualité-managers de visualiser le sous-graphe impacté."
            ],
            challenges: "Optimiser les requêtes Cypher pour des graphes de >10M de noeuds."
        }
    },
    {
        id: 3,
        title: "Predictive Maintenance Stream",
        category: "IoT & Time Series",
        description: "Détection d'anomalies en temps réel sur flux de capteurs industriels.",
        shortDescription: "Algorithmes de clustering pour prévenir les pannes machines avant l'arrêt critique.",
        stack: ["Scikit-learn", "Isolation Forest", "FastAPI", "Shiny"],
        metrics: ["90%+ détection anomalies", "-40% faux positifs", "Inférence < 50ms"],
        icon: <Activity className="w-6 h-6" />,
        visual: <ChartViz />,
        details: {
            problem: "La maintenance préventive (changer les pièces à date fixe) était trop coûteuse, et les pannes imprévues arrêtaient la ligne de production.",
            solution: "Approche prédictive non-supervisée (Isolation Forest) pour détecter les déviations subtiles des capteurs (vibrations, température) par rapport à la norme.",
            architecture: [
                "Stream : Simulation de flux de capteurs via API REST.",
                "Preprocessing : Calcul de fenêtres glissantes (Rolling Mean/Std) en temps réel.",
                "Model : Isolation Forest ré-entraîné hebdomadairement sur les nouvelles données saines.",
                "Alerting : Webhook vers Teams si Score d'Anomalie > Seuil Critique."
            ],
            challenges: "Réduire les faux positifs causés par les arrêts/démarrages normaux de la machine (Filtrage contextuel)."
        }
    },
    {
        id: 4,
        title: "Enterprise RAG Assistant",
        category: "Generative AI",
        description: "Architecture Retrieval-Augmented Generation pour la documentation technique.",
        shortDescription: "Chatbot technique capable de citer ses sources dans des milliers de PDFs.",
        stack: ["LangChain", "ChromaDB", "Ollama", "Streamlit"],
        metrics: ["Accès instantané à la doc", "Ingestion vectorielle auto", "Support multi-lingue"],
        icon: <Brain className="w-6 h-6" />,
        visual: <RagViz />,
        details: {
            problem: "Les techniciens perdaient 30% de leur temps à chercher des procédures dans des milliers de PDFs techniques non indexés.",
            solution: "Moteur de recherche sémantique couplé à un LLM. L'utilisateur pose une question, le système retrouve les paragraphes pertinents et génère une réponse.",
            architecture: [
                "Ingestion : Parsing PDF + Chunking (découpage intelligent).",
                "Embedding : Vectorisation des textes (Model: all-MiniLM-L6-v2) et stockage dans ChromaDB.",
                "Retrieval : Recherche de similarité cosinus.",
                "Generation : Prompt engineering pour forcer le LLM à répondre uniquement basé sur le contexte fourni."
            ],
            challenges: "Gérer les tableaux et schémas techniques dans les PDFs (Utilisation de descriptions textuelles)."
        }
    }
];

export const experiences = [
    {
        company: "bioMérieux",
        role: "MLOps Engineer & Data Scientist",
        period: "Mars 2025 - Sept 2025",
        location: "Lyon",
        type: "Biotechnologie & Diagnostic in vitro",
        details: [
            "Industrialisation de pipelines de données complexes (SAP vers PostgreSQL) via Dagster : réduction de 80% du temps de consolidation.",
            "Développement et déploiement de modèles de classification (Random Forest, XGBoost) : précision de 85% atteinte en production.",
            "Optimisation structurelle des bases PostgreSQL par indexation avancée : réduction de 60% du temps d'exécution des requêtes.",
            "Modélisation de la traçabilité produit sous Neo4j (Graph Database) : diminution de 70% du temps d'investigation qualité.",
            "Mise en place d'une architecture CI/CD sous GitLab et Kubernetes avec conteneurisation Docker assurant le monitoring en temps réel de 50+ jobs quotidiens."
        ]
    },
    {
        company: "SEW-USOCOME",
        role: "Data Scientist (Monitoring IoT & Industrie 4.0)",
        period: "Mars 2024 - Août 2024",
        location: "Haguenau",
        type: "Secteur Industriel",
        details: [
            "Monitoring d'usines et analyse de données IoT : implémentation d'algorithmes de stream clustering détectant 90%+ des anomalies avant défaillance.",
            "Optimisation des modèles via fine-tuning des hyperparamètres, réduction du taux de faux positifs de 40%.",
            "Conception et déploiement d'un dashboard interactif d'aide à la décision sous Shiny pour les équipes opérationnelles en usine."
        ]
    },
    {
        company: "Takasago",
        role: "Data Analyst R&D (Neurosciences)",
        period: "Été 2023",
        location: "Paris",
        type: "Recherche Sensorielle",
        details: [
            "Automatisation des chaînes de pré-traitement de signaux EEG sous MATLAB : workflow global accéléré par un facteur 3.",
            "Développement d'une interface utilisateur (GUI) sur mesure : réduction de 50% de la charge manuelle des ingénieurs R&D."
        ]
    }
];

export const education = [
    {
        degree: "Master Ingénierie Mathématiques & Data Science",
        school: "Université de Haute-Alsace",
        year: "2025",
        location: "Mulhouse",
        specialization: "Machine Learning, Cloud Architecture, Statistiques"
    },
    {
        degree: "Licence Mathématiques",
        school: "Université Bourgogne Franche-Comté",
        year: "2023",
        location: "Besançon",
        specialization: null
    }
];

export const languages = [
    { name: "Français", level: "Maternel", percent: 100 },
    { name: "Anglais", level: "Professionnel", percent: 85 }
];

export const skills = {
    "MLOps & Cloud": ["Docker", "Kubernetes", "AWS (S3)", "GitLab CI/CD", "Dagster", "MLflow"],
    "Data Engineering": ["SQL", "PostgreSQL", "Neo4j (Graph)", "FastAPI", "InfluxDB"],
    "Data Science": ["Python", "Pandas", "Scikit-learn", "Deep Learning (PyTorch)", "Time Series"],
    "GenAI": ["LangChain", "RAG", "LLMs", "Vector Stores (ChromaDB)"],
    "Visualisation": ["Streamlit", "Grafana", "Shiny (R)"]
};

export const articles = [
    {
        id: 1,
        title: "MLOps : Du POC au Pipeline de Production",
        summary: "La majorité des projets ML échouent au passage en production. Dans cet article, je détaille les patterns architecturaux (Feature Store, Model Registry, CI/CD for ML) qui permettent de transformer un notebook Jupyter en service fiable et monitoré. Retour d'expérience sur l'industrialisation avec Dagster, Docker et GitLab CI.",
        tags: ["MLOps", "CI/CD", "Dagster", "Docker"],
        date: "Janvier 2025",
        readTime: "8 min",
        icon: <Rocket className="w-6 h-6" />
    },
    {
        id: 2,
        title: "RAG vs Fine-Tuning : Quand utiliser quoi ?",
        summary: "Face à un cas d'usage GenAI, faut-il enrichir le contexte du LLM (RAG) ou adapter ses poids (Fine-Tuning) ? Comparaison systémique : coût, latence, fraîcheur des données, hallucinations. Mon verdict : le RAG couvre 80% des cas industriels, le Fine-Tuning excelle sur les domaines très spécialisés.",
        tags: ["GenAI", "LLM", "RAG", "LangChain"],
        date: "Décembre 2024",
        readTime: "6 min",
        icon: <Bot className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Monitoring de Modèles ML en Production",
        summary: "Déployer un modèle n'est que le début. Comment détecter le Data Drift, le Concept Drift, et les dégradations silencieuses de performance ? Tour d'horizon des outils (MLflow, Evidently, Grafana) et des stratégies de retraining automatique que j'ai mises en place chez bioMérieux.",
        tags: ["MLflow", "Monitoring", "Drift", "Alerting"],
        date: "Novembre 2024",
        readTime: "7 min",
        icon: <BarChartIcon className="w-6 h-6" />
    },
    {
        id: 4,
        title: "Data Quality : Le maillon faible des projets IA",
        summary: "Garbage In, Garbage Out. Avant de choisir un modèle, il faut valider la qualité des données. Je présente mon approche : Great Expectations pour les tests automatisés, Pydantic pour la validation de schéma, et des patterns de Data Contracts entre équipes. Exemples concrets issus de mes projets industriels.",
        tags: ["Data Engineering", "Testing", "Pydantic", "Qualité"],
        date: "Octobre 2024",
        readTime: "5 min",
        icon: <Search className="w-6 h-6" />
    }
];

export const methodology = [
    {
        step: 1,
        title: "Cadrage",
        description: "Définition du problème métier, des KPIs cibles et du périmètre de données disponibles.",
        icon: <Crosshair className="w-7 h-7" />
    },
    {
        step: 2,
        title: "Data Engineering",
        description: "Pipelines ETL robustes, validation de schéma, tests de qualité automatisés.",
        icon: <Wrench className="w-7 h-7" />
    },
    {
        step: 3,
        title: "Modélisation",
        description: "Expérimentations ML trackées (MLflow), feature engineering, optimisation hyperparamètres.",
        icon: <FlaskConical className="w-7 h-7" />
    },
    {
        step: 4,
        title: "Industrialisation",
        description: "Conteneurisation Docker, CI/CD, déploiement API (FastAPI) et orchestration.",
        icon: <Container className="w-7 h-7" />
    },
    {
        step: 5,
        title: "Monitoring",
        description: "Surveillance du drift, alerting automatique, retraining pipeline récurrent.",
        icon: <Radio className="w-7 h-7" />
    }
];

export const futureProjects = [
    {
        id: 1,
        title: "BioTraceAI",
        subtitle: "Intelligent Graph-Based Risk Detection & Explanation for Biomedical Manufacturing",
        description: "Plateforme IA de détection de risques dans la chaîne de production biomédicale. Modélisation en graphe des relations entre lots, équipements et défauts pour identifier automatiquement les causes racines et générer des explications intelligibles pour les équipes qualité.",
        stack: ["Neo4j", "GNN (Graph Neural Networks)", "Python", "FastAPI", "LangChain", "Docker"],
        status: "En développement",
        progress: 35,
        goals: [
            "Détection automatique d'anomalies dans les graphes de traçabilité",
            "Explication en langage naturel des risques détectés (XAI)",
            "Dashboard temps réel pour les responsables qualité",
            "Intégration CI/CD pour déploiement continu du modèle"
        ],
        icon: <Shield className="w-6 h-6" />
    }
];
