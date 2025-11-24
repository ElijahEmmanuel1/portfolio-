# Déploiement Kubernetes - AXIOM AI Portal

## 📋 Prérequis

- Cluster Kubernetes (v1.24+)
- `kubectl` configuré
- Docker pour construire l'image
- (Optionnel) Helm pour nginx-ingress-controller
- (Optionnel) cert-manager pour SSL/TLS

## 🚀 Déploiement Rapide

### 1. Construire l'image Docker

```bash
# Construire l'image
docker build -t axiom-portal:latest .

# Tagger pour votre registry
docker tag axiom-portal:latest your-registry/axiom-portal:latest

# Pousser vers le registry
docker push your-registry/axiom-portal:latest
```

### 2. Déployer sur Kubernetes

#### Option A: Avec Kustomize (Recommandé)

```bash
# Éditer kustomization.yaml pour mettre à jour le nom de l'image
# Puis appliquer
kubectl apply -k k8s/
```

#### Option B: Manuellement

```bash
# Créer le namespace
kubectl apply -f k8s/namespace.yaml

# Appliquer la configuration
kubectl apply -f k8s/configmap.yaml

# Déployer l'application
kubectl apply -f k8s/deployment.yaml

# Créer le service
kubectl apply -f k8s/service.yaml

# (Optionnel) Configurer l'ingress
kubectl apply -f k8s/ingress.yaml

# (Optionnel) Activer l'autoscaling
kubectl apply -f k8s/hpa.yaml
```

### 3. Vérifier le déploiement

```bash
# Vérifier les pods
kubectl get pods -n axiom-portal

# Vérifier le service
kubectl get svc -n axiom-portal

# Vérifier les logs
kubectl logs -f deployment/axiom-portal -n axiom-portal

# Obtenir l'URL du LoadBalancer
kubectl get svc axiom-portal-service -n axiom-portal
```

## 🔧 Configuration

### Variables d'environnement

Modifiez `k8s/configmap.yaml` pour ajuster:
- `NEXT_PUBLIC_APP_NAME`: Nom de l'application
- `NEXT_PUBLIC_APP_VERSION`: Version
- `NEXT_PUBLIC_ENVIRONMENT`: Environnement (production/staging)

### Ingress

Éditez `k8s/ingress.yaml` pour:
- Changer le domaine: `axiom-portal.example.com`
- Configurer le certificat TLS

### Autoscaling

Ajustez `k8s/hpa.yaml` pour:
- `minReplicas`: Nombre minimum de pods (défaut: 3)
- `maxReplicas`: Nombre maximum de pods (défaut: 10)
- Seuils CPU/Mémoire

## 📊 Monitoring

```bash
# Surveiller les métriques HPA
kubectl get hpa -n axiom-portal -w

# Voir les événements
kubectl get events -n axiom-portal --sort-by='.lastTimestamp'

# Description complète du déploiement
kubectl describe deployment axiom-portal -n axiom-portal
```

## 🔄 Mise à jour

```bash
# Reconstruire l'image avec un nouveau tag
docker build -t axiom-portal:v2.0.1 .
docker push your-registry/axiom-portal:v2.0.1

# Mettre à jour le déploiement
kubectl set image deployment/axiom-portal \
  axiom-portal=your-registry/axiom-portal:v2.0.1 \
  -n axiom-portal

# Surveiller le rollout
kubectl rollout status deployment/axiom-portal -n axiom-portal
```

## 🔙 Rollback

```bash
# Revenir à la version précédente
kubectl rollout undo deployment/axiom-portal -n axiom-portal

# Voir l'historique
kubectl rollout history deployment/axiom-portal -n axiom-portal
```

## 🗑️ Nettoyage

```bash
# Supprimer toutes les ressources
kubectl delete namespace axiom-portal

# Ou avec kustomize
kubectl delete -k k8s/
```

## 🔐 Sécurité

L'application est configurée avec:
- ✅ Utilisateur non-root (UID 1001)
- ✅ Capabilities DROP ALL
- ✅ Read-only root filesystem
- ✅ Resource limits
- ✅ Liveness et Readiness probes
- ✅ SSL/TLS via Ingress

## 📈 Performance

- **3 réplicas** minimum pour haute disponibilité
- **Rolling updates** sans downtime
- **Auto-scaling** basé sur CPU/Mémoire
- **Session affinity** pour les connexions persistantes
- **Image multi-stage** optimisée (~150MB)

## 🆘 Dépannage

```bash
# Pod ne démarre pas
kubectl describe pod <pod-name> -n axiom-portal

# Problème de réseau
kubectl exec -it <pod-name> -n axiom-portal -- sh
wget http://localhost:3000

# Logs détaillés
kubectl logs <pod-name> -n axiom-portal --previous
```

## 📞 Support

Pour toute question, vérifiez:
1. Les logs des pods
2. Les événements du namespace
3. La configuration du service
4. Les règles d'ingress
