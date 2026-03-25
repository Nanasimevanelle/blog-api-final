const Article = require('../models/articlemodel'); // ton fichier avec les fonctions CRUD SQLite

// CREATE
exports.createArticle = (req, res) => {
  Article.createArticle(req.body, (err, article) => {
    if(err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Article créé avec succès", article });
  });
};

// GET ALL
exports.getAllArticles = (req, res) => {
  Article.getAllArticles((err, articles) => {
    if(err) return res.status(500).json({ message: err.message });
    res.json(articles);
  });
};

// GET ONE
exports.getArticleById = (req, res) => {
  const id = Number(req.params.id);
  Article.getArticleById(id, (err, article) => {
    if(err) return res.status(500).json({ message: err.message });
    if(!article) return res.status(404).json({ message: "Article non trouvé" });
    res.json(article);
  });
};

// UPDATE
exports.updateArticle = (req, res) => {
  const id = Number(req.params.id);
  Article.updateArticle(id, req.body, (err) => {
    if(err) return res.status(500).json({ message: err.message });
    res.json({ message: "Article modifié avec succès" });
  });
};

// DELETE
exports.deleteArticle = (req, res) => {
  const id = Number(req.params.id);
  Article.deleteArticle(id, (err) => {
    if(err) return res.status(500).json({ message: err.message });
    res.json({ message: "Article supprimé avec succès" });
  });
};

// SEARCH (simule recherche SQL côté serveur)
exports.searchArticles = (req, res) => {
  const query = req.query.query;
  if(!query) return res.status(400).json({ message: "Paramètre 'query' requis" });

  Article.getAllArticles((err, articles) => {
    if(err) return res.status(500).json({ message: err.message });
    const resultats = articles.filter(a =>
      a.titre.toLowerCase().includes(query.toLowerCase()) ||
      a.contenu.toLowerCase().includes(query.toLowerCase())
    );
    res.json(resultats);
  });
};