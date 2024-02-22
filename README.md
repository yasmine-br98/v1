# Teamy

L'objectif principal de ce projet est de créer une plateforme conviviale et intuitive, permettant aux fournisseurs d'événements de présenter leurs offres de manière attrayante, et aux entreprises de trouver rapidement et facilement des événements team building adaptés à leurs besoins. Nous aspirons à simplifier le processus de recherche, de sélection, et de réservation d'événements tout en intégrant des fonctionnalités novatrices telles que la notation post-événement et le partage sur les réseaux sociaux

## Architecture du Projet

Ce projet est composé d'un backend Node.js TypeScript avec PostgreSQL et Prisma pour la gestion des données, et d'un frontend Next.js pour l'interface utilisateur. Voici comment les différentes parties de l'application interagissent :

### Backend (Node.js TypeScript)

Le backend de l'application est développé en Node.js avec TypeScript. Il utilise Express.js comme framework web pour gérer les routes et les requêtes HTTP. Prisma est utilisé comme ORM (Object-Relational Mapping) pour interagir avec la base de données PostgreSQL. Le backend expose une API RESTful pour permettre au frontend de communiquer avec l'application.

### Frontend (Next.js)

Le frontend de l'application est développé en Next.js, un framework React populaire pour le rendu côté client. Next.js offre des fonctionnalités avancées telles que le rendu côté serveur (SSR), la génération de pages statiques et le routage automatique, ce qui en fait un excellent choix pour les applications web modernes. Le frontend communique avec le backend via des requêtes HTTP pour récupérer et afficher les données nécessaires à l'utilisateur.

### Communication entre le Frontend et le Backend

Pour permettre la communication entre le frontend et le backend, l'application utilise des requêtes HTTP. Le frontend envoie des requêtes au backend pour récupérer des données (par exemple, lors du chargement d'une page ou de l'interaction de l'utilisateur avec l'interface) et pour effectuer des actions telles que la création, la mise à jour ou la suppression de données. Le backend traite ces requêtes, effectue les opérations nécessaires sur la base de données, puis renvoie une réponse au frontend pour informer de l'état de l'opération.

## Installation et Configuration
Clonez le dépôt : `git clone https://gitlab........
2. Installez les dépendances pour le backend : `cd backend && npm install`
3. Installez les dépendances pour le frontend : `cd frontend && npm install`

## Utilisation

1. Pour démarrer le serveur de développement du backend, exécutez la commande suivante dans le dossier `backend` :
   ```bash
   npm run dev

2.Pour démarrer le serveur de développement du frontend, exécutez la commande suivante dans le dossier frontend :
npm run dev