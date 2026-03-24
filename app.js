const express = require('express');
const app = express();

const swaggerUi= require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Middleware pour lire JSON
app.use(express.json());
const options ={
  definition : {
  openapi :"3.0.0",
info :{
  title:"API Blog",
  version:"1.0.0",
  description:"API pour gerer les articles"
},
servers:[{
  url:"http://localhost:3000"
}
]
},
apis:["./app.js"],
};
const specs =swaggerJsdoc(options);

// Route test
app.get('/', (req, res) => {
  res.send("Mon API fonctionne !");
});
//tableau vide pour stocker les articles
const articles = [];
/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - contenu
 *               - auteur
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               date:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 */
// Endpoint pour creer les articles (POST/api/articles)
app.post('/api/articles',(req, res) => {
  const { titre,contenu,auteur,date, categorie, tags}=req.body;
  if(!titre || !contenu || !auteur ){ 
    return res.status(400).json({ message :"titre, contenu et auteur sont obligatoires"});
  }
  const id= articles.length > 0 ? articles[articles.length- 1].id +1:1;
  const nouvelarticle ={ id, titre ,contenu ,auteur ,date ,categorie , tags };
  articles.push(nouvelarticle);
  res.status(201).json({ message : "article créé avec succes", article:nouvelarticle});
  });
  /**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste des articles
 */
// Endpoint pour lire et affiché les articles (GET/api/articles)
app.get('/api/articles', (req, res) => {
  res.json(articles);
});
/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article modifié avec succès
 *       404:
 *         description: Article non trouvé
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 */

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans les articles
 *     responses:
 *       200:
 *         description: Liste des articles correspondants
 */
// Endpoint pour lire un unique article (GET/api/articles{id})
app.get('/api/articles/:id',(req, res) =>{
  console.log("route ID appelé");
  const id=Number(req.params.id);
  const article =articles.find( a=> a.id === id);
  if (article === undefined) {
    return res.status(404).json({ message :"Article non trouvé"});
  }
  return res.json(article);
});
app.use('/api-docs' , swaggerUi.serve,swaggerUi.setup(specs));
//rechercer un article(GET/api/articles/search?query=texte)
app.get('/api/articles/search', (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: "Paramètre 'query' requis" });
  }

  const resultats = articles.filter(a =>
    a.titre.toLowerCase().includes(query.toLowerCase()) ||
    a.contenu.toLowerCase().includes(query.toLowerCase())
  );

  return res.json(resultats);
});
// modifier un article(PUT/api/articles)

app.put('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }

  // Mise à jour des champs
  const { titre, contenu, categorie, tags } = req.body;

  if (titre !== undefined) article.titre = titre;
  if (contenu !== undefined) article.contenu = contenu;
  if (categorie !== undefined) article.categorie = categorie;
  if (tags !== undefined) article.tags = tags;

  return res.json({ message: "Article modifié", article });
});
//supprimer un article(DELETE/api/articles)
app.delete('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Article non trouvé" });
  }

  // Supprimer l'article
  articles.splice(index, 1);

  return res.json({ message: "Article supprimé avec succès" });
});

// Lancer serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});