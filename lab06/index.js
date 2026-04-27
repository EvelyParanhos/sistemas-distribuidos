const express = require ('express');
const db = require('./db').db;
const fs = require ('fs');
const app = express();
const arquivo = 'jogos.db';
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`API de jogos em execução na porta ${APP_PORT}`);
    console.log(`Acesse a URL http://localhost:${APP_PORT}`);

    fs.access(arquivo, fs.constants.F_ok, (err) => {
        if (err) {
            console.log(`${arquivo} não existe. Criando arquivo...`);
            let jogosIniciais = [
                {id: 1, nome: "The Legend of Zelda: Ocarina of Time", ano: 1998, categoria: "RPG"},
                {id: 2, nome: "Super Mario World", ano: 1990, categoria: "Plataforma"},
                {id: 3, nome: "Age of Empires II", ano: 1999, categoria: "Estratégia"},
                {id: 4, nome: "Dark Souls III", ano: 2016, categoria: "RPG"},
                {id: 5, nome: "The Witcher 3", ano: 2015, categoria: "RPG"}
            ];
            fs.writeFileSync(arquivo, JSON.stringify(jogosIniciais));
        }
    })
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