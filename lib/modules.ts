export type ModuleCategory = 'Infrastructure' | 'Databases' | 'ML/Data' | 'Monitoring' | 'CI/CD' | 'Security' | 'Networking';

export interface ModuleCommand {
    category: string;
    command: string;
    description: string;
}

export interface ModuleWorkflow {
    title: string;
    steps: string[];
}

export interface ModuleData {
    id: string;
    title: string;
    iconName: string;
    category: ModuleCategory;
    description: string;
    longDescription: string;
    commands: ModuleCommand[];
    workflows: ModuleWorkflow[];
    metrics: {
        cpu: number;
        memory: number;
        status: 'Operational' | 'Degraded' | 'Down' | 'Maintenance';
        uptime: string;
    };
}

export const modules: ModuleData[] = [
    // Infrastructure
    {
        id: 'kubernetes',
        title: 'Kubernetes Cluster',
        iconName: 'Box',
        category: 'Infrastructure',
        description: 'Production-grade container orchestration.',
        longDescription: 'Automate deployment, scaling, and management of containerized applications. Kubeadm-managed cluster with high availability control plane.',
        commands: [
            { category: 'Status', command: 'kubectl get nodes -o wide', description: 'List all nodes with IP and status' },
            { category: 'Pods', command: 'kubectl get pods -A --sort-by=.status.startTime', description: 'List all pods sorted by start time' },
            { category: 'Resources', command: 'kubectl top nodes', description: 'Show CPU/Memory usage per node' },
            { category: 'Debug', command: 'kubectl describe pod <pod_name> -n <namespace>', description: 'Detailed pod inspection' },
            { category: 'Logs', command: 'kubectl logs -f <pod_name> --tail=100', description: 'Stream last 100 log lines' },
            { category: 'Access', command: 'kubectl port-forward svc/<service> 8080:80', description: 'Forward local port to service' },
        ],
        workflows: [
            { title: 'Deploy Application', steps: ['Create Deployment YAML', 'Apply Configuration', 'Verify Pod Status', 'Expose Service'] },
            { title: 'Scale Cluster', steps: ['Provision New Node', 'Join Cluster', 'Label Node', 'Verify Capacity'] },
            { title: 'Troubleshoot Pod', steps: ['Check Status', 'View Logs', 'Describe Pod', 'Exec into Shell'] },
        ],
        metrics: { cpu: 45, memory: 62, status: 'Operational', uptime: '99.99%' }
    },
    {
        id: 'docker',
        title: 'Docker Engine',
        iconName: 'Box',
        category: 'Infrastructure',
        description: 'Container runtime and image management.',
        longDescription: 'The industry standard for building and running applications in isolated containers.',
        commands: [
            { category: 'Containers', command: 'docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}"', description: 'List containers with custom format' },
            { category: 'Stats', command: 'docker stats --no-stream', description: 'Live resource usage statistics' },
            { category: 'Clean', command: 'docker system prune -a --volumes', description: 'Remove unused data (Caution)' },
            { category: 'Inspect', command: 'docker inspect <container_id> | grep IPAddress', description: 'Find container IP address' },
            { category: 'Logs', command: 'docker logs --since 30m <container_id>', description: 'Logs from last 30 minutes' },
        ],
        workflows: [
            { title: 'Build Image', steps: ['Write Dockerfile', 'Run Build Command', 'Tag Image', 'Push to Registry'] },
            { title: 'Debug Container', steps: ['Check Logs', 'Inspect Config', 'Exec /bin/bash', 'Check Network'] },
        ],
        metrics: { cpu: 12, memory: 30, status: 'Operational', uptime: '100%' }
    },
    {
        id: 'helm',
        title: 'Helm',
        iconName: 'Layers',
        category: 'Infrastructure',
        description: 'The package manager for Kubernetes.',
        longDescription: 'Manage Kubernetes applications with Helm Charts. Define, install, and upgrade complex Kubernetes applications.',
        commands: [
            { category: 'Releases', command: 'helm list -A --date', description: 'List releases sorted by date' },
            { category: 'Install', command: 'helm upgrade --install <name> <chart> -f values.yaml', description: 'Install or upgrade chart' },
            { category: 'History', command: 'helm history <release_name>', description: 'View revision history' },
            { category: 'Rollback', command: 'helm rollback <release_name> <revision>', description: 'Rollback to previous version' },
            { category: 'Repo', command: 'helm repo update', description: 'Update chart repositories' },
        ],
        workflows: [
            { title: 'Upgrade Release', steps: ['Update Values', 'Run Helm Upgrade', 'Verify Revision'] },
            { title: 'Rollback', steps: ['Check History', 'Identify Stable Revision', 'Run Rollback', 'Verify Status'] },
        ],
        metrics: { cpu: 5, memory: 10, status: 'Operational', uptime: 'N/A' }
    },
    {
        id: 'rancher',
        title: 'Rancher',
        iconName: 'Box',
        category: 'Infrastructure',
        description: 'Complete container management platform.',
        longDescription: 'Run Kubernetes everywhere. Rancher manages Kubernetes clusters across any infrastructure.',
        commands: [
            { category: 'Agent', command: 'docker run -d --privileged --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher', description: 'Start Rancher Server' },
            { category: 'Cleanup', command: 'docker rm -f $(docker ps -qa)', description: 'Force remove all containers (Reset)' },
        ],
        workflows: [{ title: 'Import Cluster', steps: ['Create Cluster', 'Select Import', 'Run Command', 'Verify Agent'] }],
        metrics: { cpu: 25, memory: 40, status: 'Operational', uptime: '99.9%' }
    },
    {
        id: 'portainer',
        title: 'Portainer',
        iconName: 'Box',
        category: 'Infrastructure',
        description: 'Container management made easy.',
        longDescription: 'Accelerate container adoption with a powerful, easy-to-use management platform.',
        commands: [
            { category: 'Deploy', command: 'docker volume create portainer_data', description: 'Create persistent volume' },
            { category: 'Start', command: 'docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer-ce', description: 'Run Portainer container' },
        ],
        workflows: [{ title: 'Add Environment', steps: ['Select Type', 'Enter IP', 'Connect', 'Browse Containers'] }],
        metrics: { cpu: 5, memory: 10, status: 'Operational', uptime: '100%' }
    },
    // Databases
    {
        id: 'postgresql',
        title: 'PostgreSQL',
        iconName: 'Database',
        category: 'Databases',
        description: 'Advanced open source relational database.',
        longDescription: 'Powerful, open source object-relational database system with over 35 years of active development.',
        commands: [
            { category: 'Connect', command: 'psql -U postgres -h localhost -d <dbname>', description: 'Connect to specific database' },
            { category: 'Backup', command: 'pg_dump -Fc -v -f backup.dump <dbname>', description: 'Verbose custom format backup' },
            { category: 'Restore', command: 'pg_restore -v -d <dbname> backup.dump', description: 'Restore from custom dump' },
            { category: 'Analyze', command: 'VACUUM (VERBOSE, ANALYZE)', description: 'Optimize database performance' },
            { category: 'Sessions', command: "SELECT * FROM pg_stat_activity WHERE state = 'active';", description: 'View active queries' },
        ],
        workflows: [
            { title: 'Restore Backup', steps: ['Stop Connections', 'Drop Database', 'Create Database', 'Import Dump'] },
            { title: 'Optimize', steps: ['Check Bloat', 'Run VACUUM', 'Reindex Tables', 'Analyze Stats'] },
        ],
        metrics: { cpu: 28, memory: 45, status: 'Operational', uptime: '99.95%' }
    },
    {
        id: 'redis',
        title: 'Redis',
        iconName: 'Database',
        category: 'Databases',
        description: 'In-memory data structure store.',
        longDescription: 'Used as a database, cache, and message broker. Supports data structures such as strings, hashes, lists, sets.',
        commands: [
            { category: 'CLI', command: 'redis-cli -h <host> -p <port>', description: 'Connect to remote Redis' },
            { category: 'Monitor', command: 'redis-cli monitor', description: 'Stream every command processed' },
            { category: 'Info', command: 'redis-cli info memory', description: 'Check memory usage details' },
            { category: 'Latency', command: 'redis-cli --latency', description: 'Measure server latency' },
        ],
        workflows: [
            { title: 'Flush Cache', steps: ['Connect CLI', 'Run FLUSHALL', 'Verify Keys'] },
            { title: 'Cluster Rebalance', steps: ['Check Slots', 'Reshard', 'Verify Balance', 'Check Health'] },
        ],
        metrics: { cpu: 15, memory: 80, status: 'Operational', uptime: '99.99%' }
    },
    {
        id: 'supabase',
        title: 'Supabase',
        iconName: 'Database',
        category: 'Databases',
        description: 'The open source Firebase alternative.',
        longDescription: 'Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.',
        commands: [
            { category: 'Start', command: 'supabase start', description: 'Start local development stack' },
            { category: 'Migration', command: 'supabase db diff -f <name>', description: 'Generate migration from changes' },
            { category: 'Push', command: 'supabase db push', description: 'Push migrations to remote' },
            { category: 'Edge', command: 'supabase functions serve <name>', description: 'Serve edge function locally' },
        ],
        workflows: [{ title: 'Create Project', steps: ['Init Config', 'Link Project', 'Push Schema', 'Seed Data'] }],
        metrics: { cpu: 40, memory: 60, status: 'Operational', uptime: '99.9%' }
    },
    {
        id: 'minio',
        title: 'MinIO',
        iconName: 'HardDrive',
        category: 'Databases',
        description: 'High Performance Object Storage.',
        longDescription: 'Kubernetes Native, S3 Compatible Object Storage for AI/ML and Data Lake workloads.',
        commands: [
            { category: 'Alias', command: 'mc alias set myminio http://minio:9000 user pass', description: 'Configure client alias' },
            { category: 'Mirror', command: 'mc mirror --watch local/ minio/bucket', description: 'Continuously sync files' },
            { category: 'Admin', command: 'mc admin info myminio', description: 'Server status and info' },
        ],
        workflows: [{ title: 'Create Bucket', steps: ['Run mc mb', 'Set Policy', 'Upload File', 'Verify URL'] }],
        metrics: { cpu: 15, memory: 30, status: 'Operational', uptime: '100%' }
    },
    // Monitoring
    {
        id: 'prometheus',
        title: 'Prometheus',
        iconName: 'Activity',
        category: 'Monitoring',
        description: 'Systems monitoring and alerting toolkit.',
        longDescription: 'Collects and stores its metrics as time series data. Powerful queries and visualization.',
        commands: [
            { category: 'Query', command: 'promql --query "up" --time <timestamp>', description: 'Execute instant query' },
            { category: 'Reload', command: 'curl -X POST http://localhost:9090/-/reload', description: 'Hot reload configuration' },
            { category: 'Check', command: 'promtool check config prometheus.yml', description: 'Validate config file' },
        ],
        workflows: [
            { title: 'Add Target', steps: ['Edit Config', 'Add Scrape Job', 'Reload Prometheus', 'Verify Target Up'] },
        ],
        metrics: { cpu: 35, memory: 55, status: 'Operational', uptime: '100%' }
    },
    {
        id: 'grafana',
        title: 'Grafana',
        iconName: 'Activity',
        category: 'Monitoring',
        description: 'Operational dashboards for your data.',
        longDescription: 'Query, visualize, alert on, and understand your metrics no matter where they are stored.',
        commands: [
            { category: 'Service', command: 'systemctl status grafana-server', description: 'Check service status' },
            { category: 'Plugins', command: 'grafana-cli plugins list-remote', description: 'List available plugins' },
            { category: 'Admin', command: 'grafana-cli admin reset-admin-password <newpass>', description: 'Reset admin password' },
        ],
        workflows: [
            { title: 'Create Dashboard', steps: ['Add Data Source', 'Create Panel', 'Write Query', 'Save Dashboard'] },
        ],
        metrics: { cpu: 10, memory: 25, status: 'Operational', uptime: '99.9%' }
    },
    // Security
    {
        id: 'vault',
        title: 'HashiCorp Vault',
        iconName: 'Lock',
        category: 'Security',
        description: 'Manage secrets and protect sensitive data.',
        longDescription: 'Secure, store and tightly control access to tokens, passwords, certificates, and encryption keys.',
        commands: [
            { category: 'Status', command: 'vault status', description: 'Check seal status and HA mode' },
            { category: 'Unseal', command: 'vault operator unseal <key_share>', description: 'Provide unseal key share' },
            { category: 'Login', command: 'vault login <token>', description: 'Authenticate with Vault' },
            { category: 'Secrets', command: 'vault kv put secret/hello foo=world', description: 'Write secret data' },
        ],
        workflows: [
            { title: 'Rotate Secrets', steps: ['Generate New Root', 'Revoke Old Keys', 'Distribute New Keys'] },
            { title: 'Enable Engine', steps: ['Enable KV', 'Configure Path', 'Write Policy', 'Test Access'] },
        ],
        metrics: { cpu: 8, memory: 15, status: 'Operational', uptime: '100%' }
    },
    {
        id: 'keycloak',
        title: 'Keycloak',
        iconName: 'Key',
        category: 'Security',
        description: 'Open Source Identity and Access Management.',
        longDescription: 'Add authentication to applications and secure services with minimum fuss.',
        commands: [
            { category: 'Admin', command: './kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin', description: 'Login to Admin CLI' },
            { category: 'Users', command: './kcadm.sh get users -r <realm>', description: 'List users in realm' },
        ],
        workflows: [{ title: 'Create Realm', steps: ['Add Realm', 'Create Client', 'Create User', 'Test Login'] }],
        metrics: { cpu: 30, memory: 45, status: 'Operational', uptime: '99.99%' }
    },
    {
        id: 'cloudflare-zero-trust',
        title: 'Cloudflare Zero Trust',
        iconName: 'Shield',
        category: 'Security',
        description: 'Secure access to all your applications.',
        longDescription: 'Stop data loss, malware, and phishing with the most performant Zero Trust application access platform.',
        commands: [
            { category: 'Tunnel', command: 'cloudflared tunnel run <tunnel_name>', description: 'Start specific tunnel' },
            { category: 'Login', command: 'cloudflared tunnel login', description: 'Authenticate CLI' },
        ],
        workflows: [{ title: 'Add Application', steps: ['Create Tunnel', 'Define Route', 'Set Policy', 'Verify Access'] }],
        metrics: { cpu: 5, memory: 5, status: 'Operational', uptime: '100%' }
    },
    // CI/CD
    {
        id: 'gitlab',
        title: 'GitLab CE',
        iconName: 'GitBranch',
        category: 'CI/CD',
        description: 'DevOps platform for the entire lifecycle.',
        longDescription: 'Source code management, CI/CD, security, and more in a single application.',
        commands: [
            { category: 'Runner', command: 'gitlab-runner status', description: 'Check runner service status' },
            { category: 'Reconfigure', command: 'gitlab-ctl reconfigure', description: 'Apply configuration changes' },
            { category: 'Backup', command: 'gitlab-rake gitlab:backup:create', description: 'Create full system backup' },
            { category: 'Logs', command: 'gitlab-ctl tail', description: 'Tail all GitLab logs' },
        ],
        workflows: [
            { title: 'Register Runner', steps: ['Get Token', 'Run Register Command', 'Select Executor', 'Verify Online'] },
        ],
        metrics: { cpu: 60, memory: 70, status: 'Operational', uptime: '99.5%' }
    },
    // Networking
    {
        id: 'traefik',
        title: 'Traefik',
        iconName: 'Network',
        category: 'Networking',
        description: 'Modern HTTP reverse proxy and load balancer.',
        longDescription: 'Makes deploying microservices easy. Integrates with your existing infrastructure components.',
        commands: [
            { category: 'Logs', command: 'docker logs traefik --tail 50', description: 'View recent access logs' },
            { category: 'API', command: 'curl http://localhost:8080/api/rawdata', description: 'Dump raw configuration' },
        ],
        workflows: [
            { title: 'Add Route', steps: ['Define IngressRoute', 'Apply YAML', 'Check Dashboard', 'Test Endpoint'] },
        ],
        metrics: { cpu: 20, memory: 15, status: 'Operational', uptime: '100%' }
    },
    // ML/Data
    {
        id: 'jupyterhub',
        title: 'JupyterHub',
        iconName: 'FileCode',
        category: 'ML/Data',
        description: 'Multi-user version of the notebook.',
        longDescription: 'Serves a pre-configured data science environment to any user in the world.',
        commands: [
            { category: 'Upgrade', command: 'helm upgrade jupyterhub jupyterhub/jupyterhub --version=2.0.0', description: 'Upgrade Hub version' },
            { category: 'Purge', command: 'kubectl delete ns jupyterhub', description: 'Remove entire installation' },
        ],
        workflows: [{ title: 'Spawn Server', steps: ['Login', 'Select Image', 'Start Server', 'Open Notebook'] }],
        metrics: { cpu: 65, memory: 80, status: 'Operational', uptime: '99.5%' }
    },
    {
        id: 'mlflow',
        title: 'MLFlow',
        iconName: 'Activity',
        category: 'ML/Data',
        description: 'Lifecycle management for ML.',
        longDescription: 'Manage the ML lifecycle, including experimentation, reproducibility, deployment, and a central model registry.',
        commands: [
            { category: 'Run', command: 'mlflow ui --host 0.0.0.0', description: 'Start UI accessible externally' },
            { category: 'GC', command: 'mlflow gc --backend-store-uri ...', description: 'Garbage collect deleted runs' },
        ],
        workflows: [{ title: 'Track Run', steps: ['Import MLflow', 'Start Run', 'Log Metrics', 'Save Model'] }],
        metrics: { cpu: 20, memory: 35, status: 'Operational', uptime: '100%' }
    }
];

// Helper to get all modules
export function getAllModules() {
    return modules;
}

// Helper to get module by slug
export function getModuleBySlug(slug: string) {
    return modules.find(m => m.id === slug);
}
