#!/bin/bash

# Script de déploiement automatisé pour Kubernetes
# Usage: ./scripts/deploy.sh [version]

set -e

VERSION=${1:-latest}
REGISTRY=${DOCKER_REGISTRY:-"your-registry"}
IMAGE_NAME="axiom-portal"
NAMESPACE="axiom-portal"

echo "🚀 Déploiement AXIOM AI Portal v${VERSION}"
echo "================================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier que kubectl est installé
if ! command -v kubectl &> /dev/null; then
    log_error "kubectl n'est pas installé"
    exit 1
fi

# Vérifier que docker est installé
if ! command -v docker &> /dev/null; then
    log_error "docker n'est pas installé"
    exit 1
fi

# 1. Construire l'image Docker
log_info "Construction de l'image Docker..."
docker build -t ${IMAGE_NAME}:${VERSION} .

# 2. Tagger l'image
log_info "Tag de l'image..."
docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}
docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:latest

# 3. Pousser vers le registry
log_info "Push vers le registry..."
docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}
docker push ${REGISTRY}/${IMAGE_NAME}:latest

# 4. Créer le namespace si nécessaire
if kubectl get namespace ${NAMESPACE} &> /dev/null; then
    log_info "Namespace ${NAMESPACE} existe déjà"
else
    log_info "Création du namespace ${NAMESPACE}..."
    kubectl apply -f k8s/namespace.yaml
fi

# 5. Appliquer la configuration
log_info "Application de la ConfigMap..."
kubectl apply -f k8s/configmap.yaml

# 6. Déployer l'application
log_info "Déploiement de l'application..."
kubectl apply -f k8s/deployment.yaml

# 7. Créer le service
log_info "Création du service..."
kubectl apply -f k8s/service.yaml

# 8. Configurer l'ingress (optionnel)
if [ -f "k8s/ingress.yaml" ]; then
    log_warn "Configuration de l'Ingress (vérifiez le domaine)..."
    kubectl apply -f k8s/ingress.yaml
fi

# 9. Activer l'autoscaling
log_info "Configuration de l'autoscaling..."
kubectl apply -f k8s/hpa.yaml

# 10. Attendre que le déploiement soit prêt
log_info "Attente du déploiement..."
kubectl rollout status deployment/${IMAGE_NAME} -n ${NAMESPACE} --timeout=5m

# 11. Afficher le statut
echo ""
echo "================================================"
log_info "Déploiement terminé avec succès!"
echo ""
echo "📊 Statut des pods:"
kubectl get pods -n ${NAMESPACE}
echo ""
echo "🌐 Services:"
kubectl get svc -n ${NAMESPACE}
echo ""
echo "🔗 Pour accéder à l'application:"
echo "   kubectl port-forward -n ${NAMESPACE} svc/${IMAGE_NAME}-service 8080:80"
echo "   Puis ouvrez: http://localhost:8080"
echo ""
log_info "Pour voir les logs: kubectl logs -f deployment/${IMAGE_NAME} -n ${NAMESPACE}"
