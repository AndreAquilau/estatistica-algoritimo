"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
"\n4, 8, 12, 3, 4, 32, 10, 5, 30, 12,\n6, 18, 34, 7, 17, 45, 8, 16, 43, 12,\n10, 21, 34, 1, 18, 21, 9, 15, 10, 8\n";
"\n60,58,71,62,85,65,83,68,68,66,60,78,80,60,85,69,75,69,60,90,68,73,59,70,90,73,63,77,68,74,62,80\n";
"\n10,15,25,21,6,23,15,21,26,32,9,14,19,20,32,18,16,26,24,20,7,18,17,28,35,22,19,39,18,21,15,18,22,20,25,28,30,16,12,20\n";
var entry = (_a = window.prompt("Digite os dados separados por vígula.")) === null || _a === void 0 ? void 0 : _a.split(',');
var entryConvertionNumber = entry === null || entry === void 0 ? void 0 : entry.map(function (value) {
    return Number(value);
});
var dados = entryConvertionNumber;
// const dados: number[] = [10,15,25,21,6,23,15,21,26,32,9,14,19,20,32,18,16,26,24,20,7,18,17,28,35,22,19,39,18,21,15,18,22,20,25,28,30,16,12,20]
var jump = 0;
var maxNumber = 0;
var minNumber = 0;
var isPar = false;
var nF = 0;
var nX1F = 0;
var mediaAgrupada = 0;
var R = returnMaxNumber(dados) - returnMinNumber(dados);
var K = Math.ceil(Math.sqrt(dados.length));
var H = interval();
function returnMaxNumber(numbers) {
    var number = Math.max.apply(Math, numbers);
    return number;
}
function returnMinNumber(numbers) {
    var number = Math.min.apply(Math, numbers);
    return number;
}
function verifyPar() {
    if (!(maxNumber % 2 === 0)) {
        ++maxNumber;
        ++minNumber;
        isPar = true;
    }
}
function verifySalt() {
    if (jump > 0) {
        maxNumber = returnMaxNumber(dados) + (jump / 2);
        minNumber = returnMinNumber(dados) - (jump / 2);
        verifyPar();
    }
    else {
        maxNumber = returnMaxNumber(dados);
        minNumber = returnMinNumber(dados);
        verifyPar();
    }
}
function interval() {
    return __awaiter(this, void 0, void 0, function () {
        var result, RGeneric;
        return __generator(this, function (_a) {
            result = 0;
            RGeneric = R;
            do {
                result = (RGeneric) / K;
                if (!Number.isInteger(result)) {
                    ++jump;
                    ++RGeneric;
                }
                ;
            } while (!Number.isInteger(result));
            verifySalt();
            return [2 /*return*/, (result)];
        });
    });
}
function numberForInterval(start, end) {
    var length = dados.filter(function (value) {
        return (value >= start && value < end);
    }).length;
    return length;
}
function percentF(min, max, callback) {
    return ((100 / dados.length) * callback(min, max)).toFixed(2);
}
function calculationX1(min, max) {
    return ((min + max) / 2);
}
function calculationX1F(min, max, calculationX1, numberForInterval) {
    return calculationX1(min, max) * numberForInterval(min, max);
}
function createTable(min) {
    return __awaiter(this, void 0, void 0, function () {
        var h, acc, table, newTable;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, H];
                case 1:
                    h = _a.sent();
                    return [4 /*yield*/, H];
                case 2:
                    acc = _a.sent();
                    table = new Array(K).fill([], 0, K);
                    newTable = table.map(function (value, index, array) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (index === 0) {
                                nF = nF + numberForInterval(min, min + h);
                                nX1F = nX1F + calculationX1F(min, min + h, calculationX1, numberForInterval);
                                return [2 /*return*/, [
                                        "Classe " + ++index,
                                        min,
                                        acc = min + h,
                                        numberForInterval(min, min + h),
                                        percentF(min, min + h, numberForInterval),
                                        calculationX1(min, min + h),
                                        calculationX1F(min, min + h, calculationX1, numberForInterval),
                                    ]];
                            }
                            else {
                                acc = acc + h;
                                nF = nF + numberForInterval(acc - h, acc);
                                nX1F = nX1F + calculationX1F(acc - h, acc, calculationX1, numberForInterval);
                                acc = acc - h;
                                // console.log(acc)
                                return [2 /*return*/, [
                                        "Classe " + ++index,
                                        acc,
                                        acc = acc + h,
                                        numberForInterval(acc - h, acc),
                                        percentF(acc - h, acc, numberForInterval),
                                        calculationX1(acc - h, acc),
                                        calculationX1F(acc - h, acc, calculationX1, numberForInterval),
                                    ]];
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    mediaAgrupada = nX1F / dados.length;
                    return [2 /*return*/, newTable];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, table, table;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log(dados.join());
                    console.log("N\u00FAmero M\u00E1ximo: " + returnMaxNumber(dados));
                    console.log("N\u00FAmero M\u00EDnimo: " + returnMinNumber(dados));
                    console.log("Valor R: " + R + " ");
                    console.log("Valor K: " + K + " ");
                    _b = (_a = console).log;
                    _c = "Valor H: ";
                    return [4 /*yield*/, H];
                case 1:
                    _b.apply(_a, [_c + (_d.sent()) + " "]);
                    console.log("Saldo: " + jump);
                    if (!(jump > 0)) return [3 /*break*/, 3];
                    console.log("N\u00FAmero M\u00E1ximo Com Saldo: " + maxNumber);
                    console.log("N\u00FAmero M\u00EDnimo Com Saldo: " + minNumber);
                    if (isPar) {
                        console.log("Teve Ajuste Para Par +1 no M\u00E1ximo e no M\u00EDnimo");
                    }
                    return [4 /*yield*/, createTable(minNumber)];
                case 2:
                    table = _d.sent();
                    table.map(function (value) {
                        value.then(function (res) {
                            console.log(res);
                        });
                    });
                    console.log("Total NF: " + nF);
                    console.log("Total NF: " + nF);
                    console.log("Total X1 F: " + nX1F);
                    console.log("M\u00E9dia Agrupada: " + mediaAgrupada);
                    return [3 /*break*/, 5];
                case 3:
                    console.log("N\u00FAmero M\u00E1ximo : " + maxNumber);
                    console.log("N\u00FAmero M\u00EDnimo : " + minNumber);
                    if (isPar) {
                        console.log("Teve Ajuste Para Par +1 no M\u00E1ximo e no M\u00EDnimo");
                    }
                    return [4 /*yield*/, createTable(minNumber)];
                case 4:
                    table = _d.sent();
                    table.map(function (value) {
                        value.then(function (res) {
                            console.log(res);
                        });
                    });
                    console.log("Total NF: " + nF);
                    console.log("Total NF: " + nF);
                    console.log("Total X1 F: " + nX1F);
                    console.log("M\u00E9dia Agrupada: " + mediaAgrupada);
                    _d.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=index.js.map