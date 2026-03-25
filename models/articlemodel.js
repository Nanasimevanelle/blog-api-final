const db = require('../config/db');

// CREATE
exports.createArticle = (article, callback) => {
  const { titre, contenu, auteur, date, categorie, tags } = article;

  db.run(
    `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titre, contenu, auteur, date, categorie, JSON.stringify(tags)],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...article });
    }
  );
};

// READ ALL
exports.getAllArticles = (callback) => {
  db.all(`SELECT * FROM articles`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// READ ONE
exports.getArticleById = (id, callback) => {
  db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

// UPDATE
exports.updateArticle = (id, data, callback) => {
  const { titre, contenu, categorie, tags } = data;

  db.run(
    `UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?`,
    [titre, contenu, categorie, JSON.stringify(tags), id],
    function (err) {
      if (err) return callback(err);
      callback(null);
    }
  );
};

// DELETE
exports.deleteArticle = (id, callback) => {
  db.run(`DELETE FROM articles WHERE id=?`, [id], function (err) {
    if (err) return callback(err);
    callback(null);
  });
};