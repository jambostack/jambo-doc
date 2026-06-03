---
title: Templates de projet
description: Utiliser les templates pour échafauder rapidement des structures de contenu courantes dans Jambo.
---

Les templates de projet sont des schémas pré-construits que vous pouvez appliquer lors de la création d'un nouveau projet. Ils vous fournissent une structure de collections prête à l'emploi.

## Templates disponibles

### Blog

- **Articles** — titre, slug, corps richtext, extrait, image à la une, auteur (relation → end_users), publié_le
- **Catégories** — nom, slug, description
- **Tags** — nom, slug

### Catalogue e-commerce

- **Produits** — nom, slug, description, prix, images, catégorie (relation), stock, statut
- **Catégories** — nom, slug, image, parent (relation → catégories)
- **Avis** — note, commentaire, produit (relation), auteur (relation → end_users)

### Portfolio

- **Projets** — titre, slug, description, image de couverture, galerie, tags, année, client
- **Services** — titre, description, icône, fourchette de prix
- **Témoignages** — nom de l'auteur, entreprise, citation, avatar

### Page d'atterrissage

- **Hero** _(singleton)_ — titre, sous-titre, texte CTA, lien CTA, image de fond
- **Fonctionnalités** — titre, description, icône, ordre
- **FAQ** — question, réponse, catégorie
- **Membres de l'équipe** — nom, rôle, bio, avatar, linkedin_url

## Appliquer un template

1. Cliquez sur **+ Nouveau projet**
2. Sélectionnez **Démarrer depuis un template**
3. Choisissez un template
4. Personnalisez le nom et le slug
5. Cliquez sur **Créer**

## Schémas générés par IA

Pour les structures personnalisées non couvertes par les templates, utilisez le [Studio IA](/fr/studio/schema-builder/) pour décrire vos besoins en langage naturel et générer un schéma sur mesure en quelques secondes.
