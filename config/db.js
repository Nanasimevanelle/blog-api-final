const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database('./blog.db',(err)=>{
    if(err){
        console.error("Erreur connexion:err.message");
    }else{
        console.log("connecte à SQLite");
    }
});
db.run('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT NOT NULL, contenu TEXT NOT NULL, auteur TEXT NOT NULL, date TEXT , categorie TEXT, tags TEXT)');

module.exports = db;