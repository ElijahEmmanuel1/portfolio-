.PHONY: help build push deploy rollback clean logs status

# Variables
REGISTRY ?= your-registry
IMAGE_NAME = axiom-portal
VERSION ?= latest
NAMESPACE = axiom-portal

help: ## Afficher cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Construire l'image Docker
	@echo "🔨 Construction de l'image $(IMAGE_NAME):$(VERSION)..."
	docker build -t $(IMAGE_NAME):$(VERSION) .
	docker tag $(IMAGE_NAME):$(VERSION) $(REGISTRY)/$(IMAGE_NAME):$(VERSION)
	docker tag $(IMAGE_NAME):$(VERSION) $(REGISTRY)/$(IMAGE_NAME):latest
	@echo "✅ Image construite avec succès"

push: ## Pousser l'image vers le registry
	@echo "📤 Push de l'image vers $(REGISTRY)..."
	docker push $(REGISTRY)/$(IMAGE_NAME):$(VERSION)
	docker push $(REGISTRY)/$(IMAGE_NAME):latest
	@echo "✅ Image poussée avec succès"

build-push: build push ## Construire et pousser l'image

deploy: ## Déployer sur Kubernetes
	@echo "🚀 Déploiement sur Kubernetes..."
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/configmap.yaml
	kubectl apply -f k8s/deployment.yaml
	kubectl apply -f k8s/service.yaml
	kubectl apply -f k8s/hpa.yaml
	@echo "⏳ Attente du déploiement..."
	kubectl rollout status deployment/$(IMAGE_NAME) -n $(NAMESPACE) --timeout=5m
	@echo "✅ Déploiement terminé"

deploy-ingress: ## Déployer l'Ingress (optionnel)
	@echo "🌐 Configuration de l'Ingress..."
	kubectl apply -f k8s/ingress.yaml
	@echo "✅ Ingress configuré"

full-deploy: build-push deploy ## Build, push et deploy complet

rollback: ## Rollback vers la version précédente
	@echo "🔙 Rollback en cours..."
	kubectl rollout undo deployment/$(IMAGE_NAME) -n $(NAMESPACE)
	kubectl rollout status deployment/$(IMAGE_NAME) -n $(NAMESPACE)
	@echo "✅ Rollback terminé"

status: ## Afficher le statut du déploiement
	@echo "📊 Statut du déploiement:"
	kubectl get all -n $(NAMESPACE)
	@echo ""
	@echo "📈 HPA Status:"
	kubectl get hpa -n $(NAMESPACE)

logs: ## Afficher les logs
	kubectl logs -f deployment/$(IMAGE_NAME) -n $(NAMESPACE)

pods: ## Lister les pods
	kubectl get pods -n $(NAMESPACE) -o wide

describe: ## Décrire le déploiement
	kubectl describe deployment/$(IMAGE_NAME) -n $(NAMESPACE)

events: ## Voir les événements
	kubectl get events -n $(NAMESPACE) --sort-by='.lastTimestamp'

shell: ## Ouvrir un shell dans un pod
	kubectl exec -it deployment/$(IMAGE_NAME) -n $(NAMESPACE) -- sh

port-forward: ## Port-forward local
	@echo "🔗 Port-forwarding sur http://localhost:8080"
	kubectl port-forward -n $(NAMESPACE) svc/$(IMAGE_NAME)-service 8080:80

clean: ## Supprimer toutes les ressources
	@echo "🗑️  Suppression des ressources..."
	kubectl delete namespace $(NAMESPACE)
	@echo "✅ Ressources supprimées"

restart: ## Redémarrer les pods
	kubectl rollout restart deployment/$(IMAGE_NAME) -n $(NAMESPACE)

scale: ## Scaler le déploiement (usage: make scale REPLICAS=5)
	kubectl scale deployment/$(IMAGE_NAME) --replicas=$(REPLICAS) -n $(NAMESPACE)

test: ## Tester l'application localement avec Docker
	docker run -it --rm -p 3000:3000 $(IMAGE_NAME):$(VERSION)
