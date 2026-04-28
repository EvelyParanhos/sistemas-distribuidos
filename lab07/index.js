const express = require ('express');
const db = require('./db').db;
const JogoDAO = require('./daos/JogoDAO');
const EmpresaDAO = require('./daos/EmpresaDAO');
const fs = require ('fs');
const app = express();
const arquivo = 'jogos.db';
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`API de jogos em execução na porta ${APP_PORT}`);
    console.log(`Acesse a URL http://localhost:${APP_PORT}`);
});

app.get ('/', (req, res)=> res.send('API Version 1.1.0 online!'))

app.get ('/jogos', (req,res)=> {
    let query = "SELECT * FROM jogos";

    if (req.query.categoria) {
        query += "WHERE categoria LIKE '%" + req.query.categoria + "%'";
    }
    db.all (query, [], (err, jogos) => {
        if (err) return res.status(500).json({error: err.message});
        res.send(jogos);
    });
});

app.get('/jogos/:id', (req, res) => {
    let query =  "SELECT * FROM jogos WHERE id = ?"
    db.get(query,[req.params.id], (err, jogo) => {
        if (err) return res.status(500).json({error: err.message});
            
        if (jogo) {res.send(jogos);}
        else {res.status(404).send('Jogo não encontrado!');}
    });
});



app.post ('/jogos', (req,res) => {
    const { nome, categoria, ano} = req.body;
    if (!nome && !categoria && !ano) {
        return res.status(400).json ({ error: "Campos nome, categoria e ano são obrigatórios! "});
    }

    db.run ("INSERT INTO jogos (nome, categoria, ano) VALUES (?, ?, ?) ",
    [nome, categoria, ano], function (err) {
        if (err) return res.status(500).json ({error: err.message});
        res.status(201).send({id: this.lastID, nome});
    });
});

app.put('/jogos/:id', (req, res) => {
    const { nome, categoria, ano } = req.body;
    const id = req.params.id;

    let query = "SELECT * FROM jogos WHERE id = ?";

    db.get(query, [id], (err, jogo) => {
        if (err) return res.status(500).json({error: err.message});
        if (jogo) {
            db.run("UPDATE jogos SET nome = ?, categoria = ?, ano = ? WHERE id = ?",
                [nome, categoria, ano, id], function (err) {
                    if(err) return res.status(500).json({ error: err.message });
                    res.send(jogo);
                });
        } else {
            res.status(404).send("Jogo não encontrado!")
        }
    })
});

app.delete('/jogos/:id', (req, res) => {
    const id = req.params.id;

    db.run ("DELETE FROM jogos WHERE if = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message});
    });
});