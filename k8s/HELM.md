# Helm Chart pour AXIOM AI Portal

## 🚀 Installation avec Helm

Si vous préférez utiliser Helm au lieu de kubectl direct:

### 1. Créer le Chart Helm

```bash
# Créer la structure du chart
helm create axiom-portal-chart

# Ou utiliser les manifests existants
mkdir -p helm/axiom-portal/templates
cp k8s/*.yaml helm/axiom-portal/templates/
```

### 2. Fichier values.yaml

```yaml
replicaCount: 3

image:
  repository: your-registry/axiom-portal
  pullPolicy: Always
  tag: "latest"

service:
  type: LoadBalancer
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: axiom-portal.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: axiom-portal-tls
      hosts:
        - axiom-portal.example.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}
```

### 3. Installer le Chart

```bash
# Installer
helm install axiom-portal ./helm/axiom-portal \
  --namespace axiom-portal \
  --create-namespace \
  --values helm/axiom-portal/values.yaml

# Mettre à jour
helm upgrade axiom-portal ./helm/axiom-portal \
  --namespace axiom-portal \
  --values helm/axiom-portal/values.yaml

# Désinstaller
helm uninstall axiom-portal --namespace axiom-portal
```

### 4. Commandes utiles

```bash
# Voir les releases
helm list -n axiom-portal

# Historique
helm history axiom-portal -n axiom-portal

# Rollback
helm rollback axiom-portal 1 -n axiom-portal

# Tester le template
helm template axiom-portal ./helm/axiom-portal
```

## 📊 Monitoring avec Prometheus

Ajouter les annotations pour Prometheus:

```yaml
podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"
  prometheus.io/path: "/api/metrics"
```

## 🔐 Secrets Management

Utiliser sealed-secrets ou external-secrets:

```bash
# Avec sealed-secrets
kubectl create secret generic axiom-portal-secrets \
  --from-literal=api-key=YOUR_KEY \
  --dry-run=client -o yaml | \
  kubeseal -o yaml > k8s/sealed-secret.yaml
```
