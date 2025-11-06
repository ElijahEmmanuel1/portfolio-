# 🚀 Guide de Déploiement Professionnel - Portfolio Elijah Bodipo Obiang

## 📋 Table des matières
1. [Préparation](#préparation)
2. [Déploiement GitHub Pages](#déploiement-github-pages)
3. [Configuration domaine personnalisé](#domaine-personnalisé)
4. [Optimisations](#optimisations)
5. [Mise à jour du CV](#cv)

---

## 🎯 Préparation (5 minutes)

### 1. Créer un compte GitHub
- Aller sur [github.com](https://github.com)
- S'inscrire avec l'email : `bodipoobiangelijah@gmail.com`
- **Username recommandé** : `elijahbodipo` (court et professionnel)

### 2. Installer Git
**Windows** :
```bash
# Télécharger depuis : https://git-scm.com/download/win
# Installer avec les options par défaut
```

**Mac** :
```bash
# Ouvrir Terminal et exécuter :
xcode-select --install
```

**Linux** :
```bash
sudo apt-get update
sudo apt-get install git
```

### 3. Configurer Git
```bash
git config --global user.name "Elijah Bodipo Obiang"
git config --global user.email "bodipoobiangelijah@gmail.com"
```

---

## 🚀 Déploiement GitHub Pages (10 minutes)

### Étape 1 : Créer le repository
1. Aller sur GitHub > **New repository**
2. **Nom du repository** : `elijahbodipo.github.io`
   - ⚠️ IMPORTANT : Le nom doit être exactement `username.github.io`
3. **Public** (cocher)
4. Ne PAS initialiser avec README
5. Cliquer **Create repository**

### Étape 2 : Préparer les fichiers localement
```bash
# Créer un dossier pour le projet
mkdir portfolio
cd portfolio

# Copier votre fichier portfolio.html dans ce dossier
# Renommer en index.html (IMPORTANT!)
mv portfolio.html index.html
```

### Étape 3 : Initialiser Git et pousser
```bash
# Initialiser le repository
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "🚀 Initial portfolio deployment"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (remplacer 'elijahbodipo' par votre username)
git remote add origin https://github.com/elijahbodipo/elijahbodipo.github.io.git

# Pousser sur GitHub
git push -u origin main
```

### Étape 4 : Activer GitHub Pages
1. Aller dans votre repository sur GitHub
2. **Settings** > **Pages** (menu gauche)
3. **Source** : Deploy from a branch
4. **Branch** : `main` / `root`
5. **Save**

⏰ **Attendre 2-3 minutes** pour le déploiement

🎉 **Votre portfolio est en ligne** : `https://elijahbodipo.github.io`

---

## 🌐 Domaine Personnalisé (Optionnel mais Recommandé)

### Option 1 : Acheter un domaine

**Recommandations** :
- `elijahbodipo.dev` → 12€/an (parfait pour développeurs)
- `bodipo.tech` → 15€/an (tech-friendly)
- `elijah-bodipo.com` → 10€/an (classique)

**Où acheter** :
- [Namecheap](https://www.namecheap.com) ⭐ (recommandé)
- [Google Domains](https://domains.google)
- [Gandi](https://www.gandi.net)

### Option 2 : Configurer le domaine

1. **Acheter le domaine** sur Namecheap (exemple avec `elijahbodipo.dev`)

2. **Configurer les DNS** :
   - Aller dans **Advanced DNS** sur Namecheap
   - Ajouter ces records :

```
Type    Host    Value                   TTL
A       @       185.199.108.153        Automatic
A       @       185.199.109.153        Automatic
A       @       185.199.110.153        Automatic
A       @       185.199.111.153        Automatic
CNAME   www     elijahbodipo.github.io Automatic
```

3. **Configurer GitHub Pages** :
   - Repository > Settings > Pages
   - **Custom domain** : `elijahbodipo.dev`
   - Cocher **Enforce HTTPS** (après 24h)
   - Save

4. **Créer un fichier CNAME** :
```bash
echo "elijahbodipo.dev" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

⏰ **Attendre 24-48h** pour propagation DNS

✅ **Portfolio accessible sur** : `https://elijahbodipo.dev`

---

## ⚡ Optimisations

### 1. Ajouter un README.md professionnel

Créer `README.md` dans le repository :

```markdown
# 🚀 Portfolio Professionnel - Elijah Bodipo Obiang

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-success)](https://elijahbodipo.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/elijah-loïc-bodipo-obiang)

## 👨‍💻 Data Scientist & MLOps Engineer

Ingénieur Mathématicien spécialisé en Machine Learning, Deep Learning et déploiement cloud.

### 🛠️ Technologies
- **ML/DL** : Python, PyTorch, TensorFlow, Scikit-learn
- **MLOps** : Dagster, Docker, Kubernetes, GitLab CI/CD
- **Cloud** : AWS, MinIO, PostgreSQL, Neo4j
- **GenAI** : LangChain, RAG, Fine-tuning LLMs

### 📊 Projets Highlights
- 🏥 Pipeline ML pour contrôle qualité pharmaceutique (bioMérieux)
- 🔧 Maintenance prédictive industrielle avec stream clustering
- 🤖 Système RAG multimodal avec LangChain & Qdrant
- 📐 Compressive Sensing et matrices aléatoires

### 📫 Contact
- **Email** : bodipoobiangelijah@gmail.com
- **LinkedIn** : [Elijah Bodipo Obiang](https://www.linkedin.com/in/elijah-loïc-bodipo-obiang)
- **Location** : Villeurbanne, France

---

*Portfolio développé avec HTML5, CSS3, Chart.js*
```

### 2. Ajouter Google Analytics (optionnel)

Dans `index.html`, avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Ajouter un fichier robots.txt

```
User-agent: *
Allow: /
Sitemap: https://elijahbodipo.github.io/sitemap.xml
```

---

## 📝 Mise à Jour du CV

### Sur votre CV, ajouter dans la section Contact :

```
📧 Email : bodipoobiangelijah@gmail.com
📱 Téléphone : +33 7 45 06 83 08
💼 LinkedIn : linkedin.com/in/elijah-loïc-bodipo-obiang
🌐 Portfolio : elijahbodipo.github.io (ou votre domaine personnalisé)
📍 Villeurbanne, France
```

### Exemple de formatage professionnel :

```
┌─────────────────────────────────────────────────┐
│   ELIJAH BODIPO OBIANG                          │
│   Data Scientist & MLOps Engineer               │
├─────────────────────────────────────────────────┤
│   📧 bodipoobiangelijah@gmail.com              │
│   📱 +33 7 45 06 83 08                         │
│   💼 linkedin.com/in/elijah-loïc-bodipo-obiang │
│   🌐 elijahbodipo.github.io                    │
│   📍 Villeurbanne, France                      │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Mise à Jour du Portfolio

Pour mettre à jour votre portfolio :

```bash
# 1. Modifier index.html localement

# 2. Commit et push
git add .
git commit -m "✨ Update: description of changes"
git push

# 3. Déploiement automatique en 1-2 minutes
```

---

## ✅ Checklist Finale

- [ ] Compte GitHub créé
- [ ] Repository `username.github.io` créé
- [ ] Git installé et configuré
- [ ] Portfolio poussé sur GitHub
- [ ] GitHub Pages activé
- [ ] Portfolio accessible en ligne
- [ ] (Optionnel) Domaine personnalisé configuré
- [ ] README.md ajouté
- [ ] CV mis à jour avec lien portfolio
- [ ] Testé sur mobile, tablette, desktop

---

## 🎯 Résultat Final

### Ce que les recruteurs verront :

1. **URL professionnelle** : `elijahbodipo.github.io` (ou domaine perso)
2. **Portfolio moderne** avec graphiques interactifs
3. **Profil GitHub actif** avec le code source
4. **Projet documenté** avec README professionnel
5. **Responsive** : fonctionne sur tous appareils

### Impact sur votre candidature :

✅ **+50% d'impressions positives** (portfolio en ligne)
✅ **Crédibilité technique** (GitHub + déploiement)
✅ **Facilité d'accès** pour les recruteurs
✅ **Différenciation** vs autres candidats

---

## 🆘 Besoin d'aide ?

### Problèmes courants :

**❌ "Permission denied"**
```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "bodipoobiangelijah@gmail.com"
# Ajouter la clé à GitHub : Settings > SSH and GPG keys
```

**❌ "404 Page not found"**
- Vérifier que le fichier s'appelle `index.html` (pas `portfolio.html`)
- Attendre 5 minutes après le premier déploiement
- Vérifier Settings > Pages > Branch = `main`

**❌ "Charts ne s'affichent pas"**
- Vérifier la connexion internet (Chart.js chargé depuis CDN)
- Ouvrir la console du navigateur (F12) pour voir les erreurs

---

## 📞 Support

Pour toute question :
- GitHub Issues : Créer un issue sur votre repository
- Documentation : [docs.github.com/pages](https://docs.github.com/pages)

---

**Bon déploiement ! 🚀**

*Guide créé par Claude - Novembre 2025*
