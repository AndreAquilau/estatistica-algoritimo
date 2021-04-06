`
4, 8, 12, 3, 4, 32, 10, 5, 30, 12,
6, 18, 34, 7, 17, 45, 8, 16, 43, 12,
10, 21, 34, 1, 18, 21, 9, 15, 10, 8
`;
`
60,58,71,62,85,65,83,68,68,66,60,78,80,60,85,69,75,69,60,90,68,73,59,70,90,73,63,77,68,74,62,80
`;
`
10,15,25,21,6,23,15,21,26,32,9,14,19,20,32,18,16,26,24,20,7,18,17,28,35,22,19,39,18,21,15,18,22,20,25,28,30,16,12,20
`;
/*
const entry = window.prompt("Digite os dados separados por vígula.")?.split(',');

const entryConvertionNumber = entry?.map((value) =>{
    return Number(value);
})

const dados: number[] = entryConvertionNumber as number[];
*/

const dados: number[] = [
    4, 8, 12, 3, 4, 32, 10, 5, 30, 12,
    6, 18, 34, 7, 17, 45, 8, 16, 43, 12,
    10, 21, 34, 1, 18, 21, 9, 15, 10, 8
]


let jump = 0;
let maxNumber = 0;
let minNumber = 0;
let isPar = false;
let nF = 0;
let nX1F = 0;
let mediaAgrupada = 0;

const R: number = returnMaxNumber(dados) - returnMinNumber(dados);
const K: number = Math.ceil(Math.sqrt(dados.length));
const H = interval();

function returnMaxNumber(numbers: number[]) {
    const number = Math.max(...numbers);
    return number;
}

function returnMinNumber(numbers: number[]) {
    const number = Math.min(...numbers);
    return number;
}

function verifyPar() {

    if(!(maxNumber % 2 === 0)){
        ++maxNumber;
        ++minNumber;
        isPar = true;
    } 

}

function verifySalt() {
    if(jump > 0) {
        if(!(jump % 2 === 0) ) {
            jump = jump + 1;
            maxNumber = returnMaxNumber(dados) + (jump/ 2);
            minNumber = returnMinNumber(dados) - (jump/ 2);
            verifyPar();
        } else {
            maxNumber = returnMaxNumber(dados) + (jump/ 2);
            minNumber = returnMinNumber(dados) - (jump/ 2);
            verifyPar();
        }

    } else {

        maxNumber = returnMaxNumber(dados);
        minNumber = returnMinNumber(dados);

        verifyPar();
    }
}

async function interval() {
    
    let result = 0;
    let RGeneric = R;
    let isValid = false;
    
    do {  
        result = (RGeneric)/K;
        if(!Number.isInteger(result)) {
            ++jump
            ++RGeneric;
        } else {
            isValid = true;
        };


    } while (!Number.isInteger(result));
    
    isValid && verifySalt();
    
    return (result);
}

function numberForInterval(start: number, end: number): number {
    
    const length = dados.filter((value) => {
        return (value >= start && value < end);
    }).length;

    return length;
}

function percentF(
    min: number, 
    max: number, 
    callback: (start: number, end: number) => number
    ) {
    return ((100/dados.length) * callback(min, max)).toFixed(2);
}

function calculationX1(min: number, max: number): number {
    return ((min + max) / 2);
}

function calculationX1F(
    min: number, 
    max: number, 
    calculationX1: (min: number, max: number) => number,
    numberForInterval: (start: number, end: number) => number
    ): number {
    return calculationX1(min, max) * numberForInterval(min, max);
}

async function createTable(min: number) {
    //console.log(min);

    let h = await H;

    let acc = await H;

    const table = new Array(K).fill([], 0, K);


    const newTable = table.map(async (value, index, array) => {
        if(index === 0) {

            nF = nF + numberForInterval(min, min + h);
            nX1F = nX1F + calculationX1F(min, min + h, calculationX1, numberForInterval);

            return [
                `Classe ${++index}`,
                min,
                acc = min + h,
                numberForInterval(min, min + h),
                percentF(min, min + h, numberForInterval),
                calculationX1(min, min + h),
                calculationX1F(min, min + h, calculationX1, numberForInterval),
            ]

        } else {
            
            acc = acc + h
            nF = nF + numberForInterval(acc - h, acc);
            nX1F = nX1F + calculationX1F(acc - h, acc, calculationX1, numberForInterval);
            acc = acc - h
        
           // console.log(acc)
            return [
                `Classe ${++index}`, 
                acc,  
                acc = acc + h,
                numberForInterval(acc - h, acc),
                percentF(acc - h, acc, numberForInterval),
                calculationX1(acc - h, acc),
                calculationX1F(acc - h, acc, calculationX1, numberForInterval),
            ]

        }
    });

    mediaAgrupada = nX1F/dados.length
    
    return newTable;
}

async function main() {
        console.log(dados.join());
        console.log("Total de Dados: "+ dados.length);
        console.log(`Número Máximo: ${returnMaxNumber(dados)}`);
        console.log(`Número Mínimo: ${returnMinNumber(dados)}`);
        console.log(`Valor R: ${R} `);
        console.log(`Valor K: ${K} `);
        console.log(`Valor H: ${await H} `);
        console.log(`Saldo: ${jump}`);   

    if(jump > 0) {
            console.log(`Número Máximo Com Saldo: ${maxNumber}`);
            console.log(`Número Mínimo Com Saldo: ${minNumber}`);
        if(isPar) {
            console.log(`Teve Ajuste Para Par +1 no Máximo e no Mínimo`);
        }
        const table = await createTable(minNumber);
        table.map(value => {
            value.then(res => {
                console.log(res);
            })
        });
        console.log(`Total NF: ${nF}`);
        console.log(`Total X1 F: ${nX1F}`);
        console.log(`Média Agrupada: ${mediaAgrupada}`);
        
    } else {
        console.log(`Número Máximo : ${maxNumber}`);
        console.log(`Número Mínimo : ${minNumber}`);
        
        if(isPar) {
            console.log(`Teve Ajuste Para Par +1 no Máximo e no Mínimo`);
        }
        const table = await createTable(minNumber);
        table.map(value => {
            value.then(res => {
                console.log(res);
            })
        });
        console.log(`Total NF: ${nF}`);
        console.log(`Total X1 F: ${nX1F}`);
        console.log(`Média Agrupada: ${mediaAgrupada}`);

    }
    
}

main();