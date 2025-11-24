#!/bin/bash

# Script de rollback pour Kubernetes
# Usage: ./scripts/rollback.sh [revision]

set -e

REVISION=${1:-0}  # 0 = version précédente
NAMESPACE="axiom-portal"
DEPLOYMENT="axiom-portal"

echo "🔙 Rollback AXIOM AI Portal"
echo "================================================"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Afficher l'historique
echo "📜 Historique des déploiements:"
kubectl rollout history deployment/${DEPLOYMENT} -n ${NAMESPACE}
echo ""

# Confirmer le rollback
if [ "$REVISION" -eq 0 ]; then
    log_warn "Rollback vers la version précédente..."
else
    log_warn "Rollback vers la révision ${REVISION}..."
fi

read -p "Continuer? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "Rollback annulé"
    exit 0
fi

# Effectuer le rollback
if [ "$REVISION" -eq 0 ]; then
    kubectl rollout undo deployment/${DEPLOYMENT} -n ${NAMESPACE}
else
    kubectl rollout undo deployment/${DEPLOYMENT} --to-revision=${REVISION} -n ${NAMESPACE}
fi

# Attendre la fin du rollback
log_info "Attente du rollback..."
kubectl rollout status deployment/${DEPLOYMENT} -n ${NAMESPACE}

echo ""
log_info "Rollback terminé avec succès!"
echo ""
kubectl get pods -n ${NAMESPACE}
