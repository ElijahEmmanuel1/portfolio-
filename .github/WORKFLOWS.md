# Workflows GitHub Actions - Guide

## 🔄 Workflows Configurés

### 1️⃣ CI - Tests et Qualité (`ci.yml`)

**Déclenché sur:** Push et Pull Requests sur `main`, `develop`, `staging`

**Jobs:**
- ✅ **Lint** - Vérification ESLint et TypeScript
- ✅ **Tests** - Tests unitaires
- ✅ **Build** - Test de compilation Next.js
- ✅ **Docker Build** - Test de construction de l'image Docker
- ✅ **Security Scan** - Scan de sécurité (npm audit, Snyk)
- ✅ **Code Quality** - SonarCloud (optionnel)
- ✅ **Lighthouse** - Tests de performance
- ✅ **Kubernetes Validation** - Validation des manifests K8s

### 2️⃣ CD - Deploy to Production (`deploy.yml`)

**Déclenché sur:** Push sur `main` ou manuellement

**Jobs:**
- ✅ **Check CI** - Vérifie que les tests CI sont passés
- ✅ **Build** - Construction de l'image Docker
- ✅ **Deploy** - Déploiement sur Kubernetes
- ✅ **Smoke Tests** - Tests de santé post-déploiement
- ✅ **Notify** - Notification du résultat

### 3️⃣ PR Checks (`pr-checks.yml`)

**Déclenché sur:** Pull Requests

**Jobs:**
- ✅ **Changed Files** - Liste des fichiers modifiés
- ✅ **Quick Tests** - Tests rapides (lint, type-check)
- ✅ **Bundle Size** - Analyse de la taille du bundle
- ✅ **Conventional Commits** - Vérification du format des commits

### 4️⃣ Scheduled Tests (`scheduled-tests.yml`)

**Déclenché:** Tous les jours à 2h du matin

**Jobs:**
- ✅ **Health Check** - Vérification de la disponibilité en prod
- ✅ **Performance Tests** - Tests de charge (k6)
- ✅ **Security Scan** - Scan quotidien de vulnérabilités
- ✅ **Dependency Check** - Vérification des dépendances obsolètes

## 🔐 Secrets Requis

Configurez ces secrets dans GitHub Settings > Secrets and variables > Actions:

### Obligatoires
```bash
KUBE_CONFIG          # Configuration kubectl en base64
```

### Optionnels (pour fonctionnalités avancées)
```bash
SNYK_TOKEN          # Pour le scan de sécurité Snyk
SONAR_TOKEN         # Pour SonarCloud
DOCKER_USERNAME     # Si registry privé
DOCKER_PASSWORD     # Si registry privé
```

## 📝 Configuration des Secrets

### 1. KUBE_CONFIG

```bash
# Sur votre machine locale
cat ~/.kube/config | base64 | pbcopy  # macOS
cat ~/.kube/config | base64 -w 0      # Linux

# Puis collez dans GitHub Secrets
```

### 2. SNYK_TOKEN (optionnel)

```bash
# 1. Créer un compte sur https://snyk.io
# 2. Récupérer le token dans Account Settings
# 3. Ajouter comme secret GitHub
```

### 3. SONAR_TOKEN (optionnel)

```bash
# 1. Créer un compte sur https://sonarcloud.io
# 2. Créer un projet
# 3. Générer un token
# 4. Ajouter comme secret GitHub
```

## 🚀 Utilisation

### Workflow Automatique

```bash
# 1. Push sur une branche
git push origin feature/ma-feature

# 2. Le workflow CI se déclenche automatiquement
# 3. Créer une Pull Request
# 4. Les PR checks s'exécutent
# 5. Merger dans main
# 6. Le workflow de déploiement se lance si CI OK
```

### Déclenchement Manuel

```bash
# Via l'interface GitHub:
# Actions > CD - Deploy to Production > Run workflow
# Ou via API GitHub
```

### Vérifier les Résultats

```bash
# Via l'interface GitHub
Actions > All workflows

# Ou via CLI
gh run list
gh run view <run-id>
```

## 🎯 Règles de Protection

Configurez les règles de branche dans Settings > Branches:

```yaml
Branch protection rules for 'main':
  ✅ Require a pull request before merging
  ✅ Require status checks to pass before merging
     - lint
     - build
     - docker-build
     - validate-k8s
  ✅ Require branches to be up to date before merging
  ✅ Require linear history
  ⚠️ Do not allow bypassing the above settings
```

## 📊 Monitoring

### Voir les Runs

```bash
# Tous les workflows
gh run list

# Workflow spécifique
gh run list --workflow=ci.yml

# Détails d'un run
gh run view 123456789
```

### Logs

```bash
# Télécharger les logs
gh run download 123456789

# Voir les logs en direct
gh run watch
```

## 🔧 Personnalisation

### Modifier les Tests

Éditez `.github/workflows/ci.yml`:

```yaml
# Ajouter un nouveau job
new-job:
  name: Mon Nouveau Test
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: echo "Mon test personnalisé"
```

### Changer l'Environnement

Éditez `.github/workflows/deploy.yml`:

```yaml
environment:
  name: staging  # ou production
  url: https://staging.exemple.com
```

## ⚠️ Notes Importantes

1. **CI doit passer avant le déploiement** - Le workflow de déploiement vérifie que tous les tests CI sont passés
2. **Secrets sensibles** - Ne jamais commit de secrets dans le code
3. **Coûts GitHub Actions** - Les repos publics ont des minutes gratuites illimitées, les privés ont un quota
4. **Cache** - Les dépendances npm et Docker sont cachées pour accélérer les builds

## 🐛 Dépannage

### Workflow qui échoue

```bash
# 1. Vérifier les logs
gh run view <run-id> --log-failed

# 2. Re-run le workflow
gh run rerun <run-id>

# 3. Re-run seulement les jobs échoués
gh run rerun <run-id> --failed
```

### Secrets manquants

```bash
# Lister les secrets (noms seulement)
gh secret list

# Ajouter un secret
gh secret set KUBE_CONFIG < kubeconfig.b64
```

## ✅ Checklist de Démarrage

- [ ] Configurer `KUBE_CONFIG` dans les secrets GitHub
- [ ] (Optionnel) Configurer `SNYK_TOKEN`
- [ ] (Optionnel) Configurer `SONAR_TOKEN`
- [ ] Mettre à jour le domaine dans `deploy.yml` et `ingress.yaml`
- [ ] Activer les branch protection rules sur `main`
- [ ] Tester avec une Pull Request
- [ ] Vérifier que le déploiement fonctionne

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI](https://cli.github.com/)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
