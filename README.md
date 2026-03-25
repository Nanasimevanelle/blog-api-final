# API Blog Node.js

## Description
Cette API permet de gérer un blog simple : créer, lire, modifier, supprimer et rechercher des articles.  
Les articles sont stockés dans une base de données SQLite et l’API est documentée avec Swagger.


## Prérequis

- Node.js >= 14
- npm
- SQLite (le fichier `blog.db` sera généré automatiquement)
- (Optionnel) Postman ou navigateur pour tester les endpoints


## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/ton-utilisateur/nom-du-depot.git
cd nom-du-depot

2. installer les dependances:

``bash
npm install

3. lancer le serveur:

``bash
 node app.js

    .serveur lancé sur :   http://localhost:3000

    .documentation swagger: http://localhost:3000/api-docs

## Endpoints

tous les endpoints sont préfixés pas /api.

1. Créer un article

-URL:/api/articles
-Méthode:POST
-Body(JSON):
{
  "titre": "Mon premier article",
  "contenu": "Contenu de l'article...",
  "auteur": "Alice",
  "date": "2026-03-24",
  "categorie": "Tech",
  "tags": ["nodejs", "api"]
}
REPONSE:
    .201 created: article créé
    .400 bad request:champs obligatoires manquants
    .500 internal server error: erreur serveur

2.Récupérer tous les articles

    .URL:/api/articles
    .Methode: GET

REPONSE
200 ok: retourne la liste des articles

3.Récupérer un article par ID
       .URL:/api/articles/:id
       .Methode: GET

REPONSE
200 ok: retourne l' articles
400 not found: article non trouvé
   
   exemple;
''bash

curl http://localhost:3000/api/articles/1

 4.Rechercher des articles

    .URL:/api/articles/search?query=<texte>
    .Methode: GET
    .parametre:
         -query:texte à rechercher dans le titre ou le contenu

REPONSE
200 ok: articles correspondants
400 bad resquest: paramètre query manquant

  exemple;
''bash

curl http://localhost:3000/api/articles/search?query=nodejs

5.modifier un article

-URL:/api/articles/;id
-Méthode:Put
-Body(JSON):champs à modifier(au moins un)
{
  "titre": "Titre modifié",
  "contenu": "Nouveau contenu",
  "categorie": "Actualités",
  "tags": ["update"]
}

REPONSE
200 ok:article modifié
404 not found:article non trouvé
500 intrnal server error: erreur serveur
  
  exemple:
  curl -X PUT http://localhost:3000/api/articles/1 \
-H "Content-Type: application/json" \
-d '{"titre":"Titre modifié"}'

6.Supprimer un article

    .URL:/api/articles/:id
    .Methode: DELETE

REPONSE
200 ok:article supprimé
404 not found:article non trouvé
500 intrnal server error: erreur serveur

  exemple:
  curl -X DELETE http://localhost:3000/api/articles/1

##Bonnes pratiques appliquées

   -Validation des champs obligatoires (titre, contenu, auteur)

    -Codes HTTP corrects : 200, 201, 400, 404, 500

    -Séparation claire : routes, controllers, modèles

     -Persistance des données via SQLite

      -Documentation avec Swagger accessible à /api-docs

## TESTER L'API

Tu peux utiliser Postman, Insomnia ou curl pour tester tous les endpoints :
# Créer un article
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d '{"titre":"Test","contenu":"Contenu","auteur":"Moi"}'

# Récupérer tous les articles
curl http://localhost:3000/api/articles

# Récupérer un article par ID
curl http://localhost:3000/api/articles/1

# Rechercher des articles
curl http://localhost:3000/api/articles/search?query=Test

# Modifier un article
curl -X PUT http://localhost:3000/api/articles/1 \
-H "Content-Type: application/json" \
-d '{"titre":"Titre mis à jour"}'

# Supprimer un article
curl -X DELETE http://localhost:3000/api/articles/1

Optionnel

Déploiement sur Railway ou Render pour rendre l’API accessible en ligne
Fournir le lien vers Swagger en ligne
Créer une interface web qui consomme ces endpoints