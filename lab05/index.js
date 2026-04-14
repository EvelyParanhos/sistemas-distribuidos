const express = require ('express');
const fs = require ('fs');
const app = express();
const arquivo = 'jogos.db';

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("Acesse a URL http://localhost:3000");

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

app.get ('/', (req, res)=> res.send('Servidor rodando, tudo ok!'))

app.get ('/jogos', (req,res)=> {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);

    if (req.query.categoria) {
        jogos = jogos.filter (jogos => jogos.categoria.toLowerCase().includes(req.query.categoria.toLowerCase()));
    }
    res.send(jogos);
});

app.get('/jogos/:id', (req, res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let jogo = jogos.find(jogo => jogo.id == req.params.id);
    
    if (jogo)  {
        res.send(jogo);
    } else {
        res.status(404).send("Jogo não encontrado.");
    }
});



app.post ('/jogos', (req,res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let novoJogo = req.body;

    novoJogo.id = jogos.length + 1;

    jogos.push(novoJogo);

    fs.writeFileSync(arquivo, JSON.stringify(jogos));
    res.status(201).send(novoJogo);
});

app.put('/jogos/:id', (req, res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    let novoValor = req.body;

    let jogo = jogo.find(jogo => {
        if (jogo.id == req.params.id) {
            jogo.nome = novoValor.nome;
            jogo.categoria = novoValor.categoria;
            jogo.ano = novoValor.nome;

            fs.writeFileSync(arquivo, JSON.stringify(jogos));
            return jogo;
        }
    });

    if (jogo) {
        res.send(jogo);
    } else {
        res.status(404).send('Jogo não encontrado.');
    }
});

app.delete('/jogos/:id', (req, res) => {
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse (data);

    if (!jogos.find(jogo => jogo.id == req.params.id)) {
        return res.status(404).send('Jogo não encontrado.');
    }

    let jogosAtualizados = jogos.filter (jogo => jogo.id != req.params.id);

    fs.writeFileSync(arquivo, JSON.stringify(jogosAtualizados));
    res.send ("Jogo removido com sucesso.")
});