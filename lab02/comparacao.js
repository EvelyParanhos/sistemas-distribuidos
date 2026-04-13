console.log("Testando valores Truthy e Falsy");
console.log(false, `e "${Boolean(false)}".`);
console.log(0, `e "${Boolean(0)}".`);
console.log("", `e "${Boolean("")}".`);
console.log(null, `e "${Boolean(null)}".`);
console.log(undefined, `e "${Boolean(undefined)}".`);
console.log(NaN, `e "${Boolean(NaN)}".`);
console.log(true, `e "${Boolean(true)}".`);
console.log(1, `e "${Boolean(1)}".`);
console.log("Olá", `e "${Boolean("Olá")}".`);
console.log([], `e "${Boolean([])}".`);
console.log({}, `e "${Boolean({})}".`);

console.log("Testando comparações")
console.log(1==1);
console.log(1 == '1');
console.log(1===1);
console.log(1 === "1");
console.log (true == 1);
console.log(1 == [1]);
console.log (null == null);
console.log(null == undefined);
console.log ([] == false);
console.log([] == []); 

console.log("Testando operadores de comparações");
let num1 = 10;
let num2 = 5;

if (num1 > num2) {
    console.log(`${num1} é maior que ${num2}.`);
} else if (num1 < num2) { 
    console.log(`${num1} é menor que ${num2}.`);
} else {
    console.log(`${num1} é igual a ${num2}`)
}

console.log("Testando operador lógico AND (&&)");
let idade = 25;
let possuiCNH = true;

if (idade>=18 && possuiCNH) {
    console.log ("Pode dirigir");
} else {
    console.log("Não pode dirigir");
}

console.log ("Testando operador lógico OR (||)")
let temDinheiro = false;
let temCartaoCredito = true;

if (temDinheiro || temCartaoCredito) {
    console.log("Você pode fazer compra.");
} else {
    console.log ("Você não pode fazer uma compra.");
}

console.log("Testando a combinação dos operadores lógicos AND e OR");
let estaChovendo = true;
let temGuardaChuva = false;
let temCapaChuva = false;

if ((estaChovendo && (temCapaChuva || temCapaChuva)) || !estaChovendo) {
    console.log("Pode sair de casa!")
} else {
    console.log ("Não pode sair de casa!")
}

//Vetores

const numeros = [1,2,3,4,5];

console.log ("Primeiro elemento: ", numeros[0]);
console.log("Terceiro elemento: ", numeros[2]);

numeros.push(6);
console.log("Vetor após adicionar um elemento: ", numeros);

const ultimoElemento = numeros.pop();

console.log("Elemento removido: ", ultimoElemento);
console.log("Vetor após remover o último elemento: ", numeros);

console.log ("Iterando sobre os elementos do vetor: ");
numeros.forEach ((numero, index) => {
    console.log(`Elemento no índice ${index}: ${numero}`);
});

const filmes = ['Interestelar', 'A pequena Sereia', 'Lorax', 'Matrix'];

filmes.unshift('O poderoso chefão');
console.log("Vetor de filmes após adicionar um elemento: ", filmes);

const indice = filmes.indexOf("Cinderela");
console.log("Índice do filme Cinderela: ", indice);

const temCinderela = filmes.includes('Cinderela');
console.log("O vetor de filmes contém Cinderela: ", temCinderela);

console.log("Iterando sobre os elementos do vetor...");
filmes.forEach((filme, index) => {
    console.log(`Elemento do índice ${index}: ${filme}`);
});