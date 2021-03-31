import { table } from "node:console";

const dados: number[] = [
    4, 8, 12, 3, 4, 32, 10, 5, 30, 12,
    6, 18, 34, 7, 17, 45, 8, 16, 43, 12,
    10, 21, 34, 1, 18, 21, 9, 15, 10, 8
];


const maxNumber = (numbers: number[]) => Math.max(...numbers);
const minNumber = (numbers: number[]) => Math.min(...numbers);


const R: number = maxNumber(dados) - minNumber(dados);
const K: number = Math.ceil(Math.sqrt(dados.length));



let saldo = 0;
let maxNumberWithSalt = 0;
let minNumberWithSalt = 0;
let ajusteParaPar = false; 



const H: () => Promise<number> = async () => {
    let result = 0;
    let RGeneric = R;
    
    do {  
        result = (RGeneric)/K;
        if(!Number.isInteger(result)) {
            ++saldo
            ++RGeneric;
        };
        //console.log(RGeneric);
    } while (!Number.isInteger(result));
    
    //console.log(result, saldo);      
    //console.log(Number.isInteger(result));
    ajusteSaldo();
    
    return (result);
}

function ajusteSaldo() {
    if(saldo > 0) {
        maxNumberWithSalt = maxNumber(dados) + saldo/ 2;
        minNumberWithSalt = minNumber(dados) - saldo/ 2;
        if(!(maxNumberWithSalt % 2 === 0)){
            ++maxNumberWithSalt;
            ++minNumberWithSalt;
            ajusteParaPar = true;
        }
    }
}

function numeroPorIntervalo(start: number, end: number): number {
    //console.log(start, end);
    const res = dados.filter((value) => {
        return (value >= start && value < end);
    })
    return res.length;
}

async function createTable(min: number) {

    let h = await H();

    const table = new Array(K).fill([], 0, K);

    let acc = h;

    const newTable = await table.map(async (value, index, array) => {
        if(index === 0) {
            //console.log(index)
            return [
                `Classe ${++index}`,
                min,
                min + h,
                numeroPorIntervalo(min, min + h)
            ]
        } else {
            //console.log(index)
            return [
                `Classe ${++index}`, 
                (acc),  
                (acc = acc + h),
                numeroPorIntervalo(acc - h, acc)
            ]
        }
    })
    
    return newTable;
}

async function main() {
    let h = await H();
    console.log(dados.join());
    console.log(`Número Máximo: ${maxNumber(dados)}`);
    console.log(`Número Mínimo: ${minNumber(dados)}`);
    console.log(`Valor R: ${R} `);
    console.log(`Valor K: ${K} `);
    console.log(`Valor H: ${h} `);
    console.log(`Saldo: ${saldo}`);   
    if(saldo > 0) {
        console.log(`Número Máximo Com Saldo: ${maxNumberWithSalt}`);
        console.log(`Número Mínimo Sem Saldo: ${minNumberWithSalt}`);
        if(ajusteParaPar) {
            console.log(`Teve Ajuste Para Par +1 no Máximo e no Mínimo`);
        }
        const table = await createTable(minNumberWithSalt);
        console.log(table);
        
    }
    
}

main();