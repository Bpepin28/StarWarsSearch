# Star Wars Search

Moteur de recherche utilisant l'API https://swapi.dev.

## Installation

1. Clonez le projet sur votre machine.
2. Naviguez jusqu'au dossier racine du projet.
3. Installez les dépendances en exécutant la commande `npm install`.

## Utilisation

1. Démarrez le serveur en exécutant la commande `npm run dev`.
2. Accédez au site en ouvrant votre navigateur et en accédant à `http://localhost:3000`.

## Fonctionnalités

- Listing des vaisseaux de Star Wars
- Quelques détails sur les vaisseaux
- Champs recherche pour filtrer les vaisseaux par leur nom ou leur modèle

## Remarques

- Je n'ai pas utilisé l'API https://swapi.co/ mais https://swapi.dev/ car le service n'est plus maintenu comme expliqué ici https://swapi.dev/about.
- Parfois l'API met plusieurs secondes à répondre.

## Difficultés rencontrés

- Je n'ai pas mis en place de filtre sur les différents champs autre que la recherche. Je n'ai pas trouvé de moyen pour filtrer directement en appelant l'API et je voyais pas comment les faire en JS de mon côté à cause du fait de récupérer les vaisseaux page par page. ( j'ai pensé à récupérer toute la liste des vaisseaux au chargement puis gérer la pagination et les filtres moi même mais je n'étais pas convaicu que ce sois la bonne pratique )
- Redécouverte de l'environnement React après 3 ans en y touchant que très peu. De la docuement et des exemples ont aidés pour reprendre la main.
