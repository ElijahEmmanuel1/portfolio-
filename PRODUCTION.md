# Guide de Production - AXIOM AI Portal

## 🎯 Checklist Pré-Déploiement

### Infrastructure
- [ ] Cluster Kubernetes configuré et accessible
- [ ] Registry Docker configuré (Docker Hub, GCR, ECR, GHCR)
- [ ] LoadBalancer ou Ingress Controller installé
- [ ] Cert-manager pour SSL/TLS (optionnel mais recommandé)
- [ ] Prometheus/Grafana pour monitoring (recommandé)

### Configuration
- [ ] Variables d'environnement définies dans ConfigMap
- [ ] Secrets créés si nécessaire
- [ ] Domaine configuré et DNS pointant vers le LoadBalancer
- [ ] Certificats SSL/TLS configurés

### Sécurité
- [ ] Images scannées pour vulnérabilités
- [ ] RBAC configuré
- [ ] Network Policies en place
- [ ] Secrets chiffrés
- [ ] Non-root user dans le conteneur ✅
- [ ] Capabilities DROP ALL ✅

## 🚀 Déploiement Step-by-Step

### 1. Préparer l'environnement

```bash
# Cloner le repository
git clone <repo-url>
cd axiom-portal

# Vérifier la connexion au cluster
kubectl cluster-info
kubectl get nodes
```

### 2. Configurer le Registry

```bash
# Option 1: GitHub Container Registry
export REGISTRY=ghcr.io/your-username

# Option 2: Docker Hub
export REGISTRY=docker.io/your-username

# Option 3: Google Container Registry
export REGISTRY=gcr.io/your-project-id

# Se connecter au registry
docker login $REGISTRY
```

### 3. Personnaliser la configuration

```bash
# Éditer le domaine dans ingress.yaml
sed -i 's/axiom-portal.example.com/votre-domaine.com/g' k8s/ingress.yaml

# Mettre à jour l'image dans kustomization.yaml
sed -i "s|your-registry|$REGISTRY|g" k8s/kustomization.yaml
```

### 4. Construire et déployer

#### Méthode A: Avec Make (Recommandé)

```bash
# Voir toutes les commandes disponibles
make help

# Déploiement complet en une commande
make REGISTRY=$REGISTRY full-deploy

# Ou étape par étape
make REGISTRY=$REGISTRY build
make REGISTRY=$REGISTRY push
make deploy
```

#### Méthode B: Avec le script bash

```bash
# Rendre le script exécutable
chmod +x scripts/deploy.sh

# Déployer
DOCKER_REGISTRY=$REGISTRY ./scripts/deploy.sh latest
```

#### Méthode C: Manuellement

```bash
# Build
docker build -t axiom-portal:latest .
docker tag axiom-portal:latest $REGISTRY/axiom-portal:latest
docker push $REGISTRY/axiom-portal:latest

# Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# Attendre
kubectl rollout status deployment/axiom-portal -n axiom-portal
```

### 5. Configurer l'Ingress (optionnel)

```bash
# Installer nginx-ingress-controller si nécessaire
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install nginx-ingress ingress-nginx/ingress-nginx

# Installer cert-manager pour SSL
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Appliquer l'ingress
kubectl apply -f k8s/ingress.yaml
```

### 6. Vérifier le déploiement

```bash
# Statut complet
make status

# Ou manuellement
kubectl get all -n axiom-portal
kubectl get ingress -n axiom-portal
kubectl get hpa -n axiom-portal

# Logs
kubectl logs -f deployment/axiom-portal -n axiom-portal
```

### 7. Tester l'application

```bash
# Option 1: Via LoadBalancer
EXTERNAL_IP=$(kubectl get svc axiom-portal-service -n axiom-portal -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
curl http://$EXTERNAL_IP

# Option 2: Via port-forward
kubectl port-forward -n axiom-portal svc/axiom-portal-service 8080:80
# Ouvrir http://localhost:8080

# Option 3: Via Ingress/Domaine
curl https://votre-domaine.com
```

## 📊 Monitoring et Observabilité

### Logs

```bash
# Logs en temps réel
kubectl logs -f deployment/axiom-portal -n axiom-portal

# Logs d'un pod spécifique
kubectl logs <pod-name> -n axiom-portal

# Logs précédents (si crash)
kubectl logs <pod-name> -n axiom-portal --previous
```

### Métriques

```bash
# CPU et Mémoire des pods
kubectl top pods -n axiom-portal

# Métriques des nodes
kubectl top nodes

# HPA status
kubectl get hpa -n axiom-portal -w
```

### Événements

```bash
# Tous les événements
kubectl get events -n axiom-portal --sort-by='.lastTimestamp'

# Événements d'un pod
kubectl describe pod <pod-name> -n axiom-portal
```

## 🔄 Mises à jour

### Rolling Update

```bash
# Nouvelle version
docker build -t axiom-portal:v2.0.1 .
docker tag axiom-portal:v2.0.1 $REGISTRY/axiom-portal:v2.0.1
docker push $REGISTRY/axiom-portal:v2.0.1

# Mettre à jour
kubectl set image deployment/axiom-portal \
  axiom-portal=$REGISTRY/axiom-portal:v2.0.1 \
  -n axiom-portal

# Surveiller
kubectl rollout status deployment/axiom-portal -n axiom-portal
```

### Rollback

```bash
# Rollback automatique
make rollback

# Ou manuellement
./scripts/rollback.sh

# Ou avec kubectl
kubectl rollout undo deployment/axiom-portal -n axiom-portal
```

## 🔧 Scaling

### Manuel

```bash
# Scale à 5 replicas
kubectl scale deployment/axiom-portal --replicas=5 -n axiom-portal

# Ou avec make
make scale REPLICAS=5
```

### Auto-scaling (HPA)

L'HPA est déjà configuré:
- Min: 3 replicas
- Max: 10 replicas
- CPU: 70%
- Memory: 80%

```bash
# Voir le status
kubectl get hpa -n axiom-portal -w
```

## 🔐 Sécurité en Production

### Network Policies

```yaml
# Exemple de Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: axiom-portal-netpol
  namespace: axiom-portal
spec:
  podSelector:
    matchLabels:
      app: axiom-portal
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
```

### RBAC

```yaml
# Service Account avec permissions limitées
apiVersion: v1
kind: ServiceAccount
metadata:
  name: axiom-portal-sa
  namespace: axiom-portal
```

## 📈 Performance

### Optimisations appliquées

- ✅ Image multi-stage (~150MB)
- ✅ Next.js standalone output
- ✅ Compression activée
- ✅ Resource limits définis
- ✅ Health checks configurés
- ✅ Session affinity activée
- ✅ Auto-scaling configuré

### Recommandations

1. **CDN**: Utiliser CloudFlare/CloudFront pour les assets statiques
2. **Cache**: Configurer Redis pour le cache applicatif
3. **Database**: Utiliser un service managé (RDS, Cloud SQL)
4. **Monitoring**: Prometheus + Grafana
5. **Logs**: ELK Stack ou Loki

## 🆘 Troubleshooting

### Pods ne démarrent pas

```bash
# Vérifier les événements
kubectl describe pod <pod-name> -n axiom-portal

# Problème d'image
kubectl get events -n axiom-portal | grep Failed

# Problème de ressources
kubectl describe nodes
```

### Application inaccessible

```bash
# Vérifier le service
kubectl get svc -n axiom-portal
kubectl describe svc axiom-portal-service -n axiom-portal

# Tester la connectivité
kubectl run test --rm -it --image=busybox -n axiom-portal -- sh
wget -O- http://axiom-portal-service:80
```

### HPA ne scale pas

```bash
# Vérifier metrics-server
kubectl get apiservice v1beta1.metrics.k8s.io -o yaml

# Installer metrics-server si nécessaire
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## 📞 Support

Pour toute question:
1. Vérifier les logs: `kubectl logs -f deployment/axiom-portal -n axiom-portal`
2. Vérifier les événements: `kubectl get events -n axiom-portal`
3. Vérifier le status: `make status`
