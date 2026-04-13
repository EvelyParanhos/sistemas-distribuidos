function saudacao () {
    console.log ("Função simples que exibe mensagem no console.")
}

saudacao ();

function somar (a, b) {
    console.log("A soma é: ", a+b);
}

somar()

function somarRetorno (a,b) {
    return a+b
}

let resultado = somarRetorno (5,3);
console.log ("O retorno da soma é ", resultado);

let somarAnonimo = function (a,b) {
    console.log("A soma da função anônima: ", a+b);
};

somarAnonimo(5,3);

let somarArrow = (a,b) => a+b;
resultado = somarArrow (5,3);
console.log("O retorno da arrow function da soma é ", resultado);

let vetor = [10,20,30,40,50,60]

function exibirElemento (elemento, indice) {
    console.log(`Elemento no indice: ${indice}: ${elemento}`);
}

function processarCallback (v, callback) {
    console.log ("Processando callback dentro da função forEach.");
}

processarCallback(vetor, exibirElemento)

vetor.forEach((elemento,indice) => {
console.log(`Arrow function exibindo elemento no indice ${indice}: ${elemento}`)
});

let pessoa = {
    nome: "Evely Paranhos",
    idade: 20,
    altura: 1.60,
    cidade: "Salvador",
    hobbies :["dormir", "assistir"]
}

console.log('Nome: ', pessoa.nome);
console.log("Idade: ", pessoa.idade);
console.log("Altura (m): ", pessoa.altura);