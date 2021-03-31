const dados: number[] = [
    4, 8, 12, 3, 4, 32, 10, 5, 30, 12,
    6, 18, 34, 7, 17, 45, 8, 16, 43, 12,
    10, 21, 34, 1, 18, 21, 9, 15, 10, 8
];

let jump = 0;
let maxNumber = 0;
let minNumber = 0;
let isPar = false;

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
        maxNumber = returnMaxNumber(dados) + jump/ 2;
        minNumber = returnMinNumber(dados) - jump/ 2;
        if(!(maxNumber % 2 === 0)){
            ++maxNumber;
            ++minNumber;
            isPar = true;
        }
    } else {
        if(!(maxNumber % 2 === 0)){
            ++maxNumber;
            ++minNumber;
            isPar = true;
        }
    }
}

async function interval() {
    
    let result = 0;
    let RGeneric = R;
    
    do {  
        result = (RGeneric)/K;
        if(!Number.isInteger(result)) {
            ++jump
            ++RGeneric;
        };

    } while (!Number.isInteger(result));
    
    verifySalt();
    
    return (result);
}

function numberForInterval(start: number, end: number): number {
    
    const length = dados.filter((value) => {
        return (value >= start && value < end);
    }).length;

    return length;
}

async function createTable(min: number) {

    let h = await H;

    let acc = await H;

    const table = new Array(K).fill([], 0, K);


    const newTable = table.map(async (value, index, array) => {
        if(index === 0) {
           
            return [
                `Classe ${++index}`,
                min,
                min + h,
                numberForInterval(min, min + h)
            ]
        } else {
            //console.log(index)
            return [
                `Classe ${++index}`, 
                (acc),  
                (acc = acc + h),
                numberForInterval(acc - h, acc)
            ]
        }
    })
    
    return newTable;
}

async function main() {
    let h = await H;
    console.log(dados.join());
    console.log(`Número Máximo: ${returnMaxNumber(dados)}`);
    console.log(`Número Mínimo: ${returnMinNumber(dados)}`);
    console.log(`Valor R: ${R} `);
    console.log(`Valor K: ${K} `);
    console.log(`Valor H: ${h} `);
    console.log(`Saldo: ${jump}`);   
    if(jump> 0) {
        console.log(`Número Máximo Com Saldo: ${returnMaxNumber(dados)}`);
        console.log(`Número Mínimo Sem Saldo: ${returnMinNumber(dados)}`);
        if(isPar) {
            console.log(`Teve Ajuste Para Par +1 no Máximo e no Mínimo`);
        }
        const table = await createTable(returnMinNumber(dados));
        console.log(table);
        
    } else {
        console.log(`Número Máximo : ${returnMaxNumber(dados)}`);
        console.log(`Número Mínimo : ${returnMinNumber(dados)}`);
        if(isPar) {
            console.log(`Teve Ajuste Para Par +1 no Máximo e no Mínimo`);
        }
        const table = await createTable(returnMinNumber(dados));
        console.log(table);
    }
    
}

main();