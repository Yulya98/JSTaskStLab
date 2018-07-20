"use strict";

const OPERATIONPLUS = "plus";
const OPERATIONMINUS = "minus";
const OPERATIONCOMPOSITION = "composition";
const OPERATIONDIVISION = "division";
const OPERATIONEXPONATION = "exponentiation";

const NAMEFANCTIONADD = "add";
const NAMEFACTIONMINUS = "minus";
const NAMEFANCTIONCOMPOSITION = "composition";
const NAMEFANCTIONDIVISION = "division";
const NAMEFANCTIONEXPONATION = "exponentiation";

class ControlValue {

    static checkValue(firstNum, errorFirstNumElem, secondNum, errorSecondNumElem) {
        if (!firstNum.value.match(/^\d+$/)) {
            errorFirstNumElem.innerHTML = "Incorrect data: ";
            errorFirstNumElem.setAttribute('style', 'display:inline');
            if (!secondNum.value.match(/^\d+$/)) {
                errorSecondNumElem.innerHTML = "Incorrect data: ";
                errorSecondNumElem.setAttribute('style', 'display:inline');
            }
            return false;
        }
        else {
            errorFirstNumElem.setAttribute('style', 'display:none');
        }
        if (!secondNum.value.match(/^\d+$/)) {
            errorSecondNumElem.innerHTML = "Incorrect data";
            errorSecondNumElem.setAttribute('style', 'display:none');
            return false;
        }
        else {
            errorSecondNumElem.setAttribute('style', 'display:none');
        }
        return true;
    }
}

class Calculator {

    constructor(cacheValue, cacheFunction){
        this.cacheValue = cacheFunction;
        this.cacheValue = cacheValue;
    }

    selectOperation(firstNum,secondNum,selectValue,result,errorFirstNum,errorSecondNum) {
        if(!ControlValue.checkValue(firstNum,errorFirstNum,secondNum,errorSecondNum)){
            return false;
        }
        let obj ={};
        obj[1] = +firstNum.value;
        obj[2] = +secondNum.value;
        if(selectValue == OPERATIONPLUS) {
            obj[0] = NAMEFANCTIONADD;
            Calculator.outputResult(Calculator.add(obj),result);
        }
        if(selectValue == OPERATIONMINUS){
            obj[0] = NAMEFACTIONMINUS;
            Calculator.outputResult(Calculator.minus(obj),result);
        }
        if(selectValue == OPERATIONCOMPOSITION) {
            obj[0] = NAMEFANCTIONCOMPOSITION;
            Calculator.outputResult(Calculator.composition(obj),result);
        }
        if(selectValue == OPERATIONDIVISION) {
            obj[0] = NAMEFANCTIONDIVISION;
            Calculator.outputResult(Calculator.division(obj),result);
        }
        if(selectValue == OPERATIONEXPONATION) {
            obj[0] = NAMEFANCTIONEXPONATION;
            Calculator.outputResult(Calculator.exponentiation(obj),result);
        }
    }

    static checkType(obj){
        if(typeof obj[1] == 'number' && typeof  obj[2] == 'number'){
            return true;
        }
        return false;
    }

    static add(obj) {
        try {

            if (!Calculator.checkType(obj))
                throw new Error("Argument should be number");
            return obj[1] + obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    static minus(obj){
        try {
            if (!Calculator.checkType(obj))
                throw new Error("Argument mast be number");
            return obj[1] - obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    static composition(obj){
        try {
            if (!Calculator.checkType(obj))
                throw new Error("Argument should be number");
            return obj[1] * obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    static division(obj){
        try {
            if (!Calculator.checkType(obj))
                throw new Error("Argument should be number");
            return obj[1] / obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    static exponentiation(obj){
        try {
            if (!Calculator.checkType(obj))
                throw new Error("Argument mast be number");
            return Math.pow(obj[1], obj[2]);
        }
        catch {e} {
            alert(e.message);
        }
    }

    static outputResult(result,resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }

    makeCachingValue(f,cache) {
        let cacheValue = cache;

        return function (obj){
            if(!((obj[0]+obj[1]+obj[2] in cacheValue) || (obj[0]+obj[2]+obj[1] in cacheValue) && obj[0] == NAMEFANCTIONEXPONATION)){
                cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
            }
            if(obj[0] == NAMEFANCTIONEXPONATION){
                if(!(obj[0]+obj[1]+obj[2] in this.cacheValue)){
                    cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
                }
            }
            return cacheValue[obj[0]+obj[1]+obj[2]];
        };

    }

    definitionFunctionCache(f,cacheFunctions) {

        this.cacheFunctions = cacheFunctions;

        return function (obj,flag,objSelectElem) {
            if (!(obj[0] in this.cacheFunctions)) {
                this.cacheFunctions[obj[0]] = f.call(this, obj,flag,objSelectElem);
            }
            return this.cacheFunctions[obj[0]];

        };
    }

    definitionFunction(obj,flag,objSelectElem) {
        try {
            if (flag == true) {
                if (objSelectElem != "undefined") {
                    Calculator.addNewOption(obj[0], objSelectElem);
                }
                else
                    throw new TypeError("Incorrect value");
            }
            let mas = [obj[1], obj[2], obj[3]];
            return mas.join(' ');
        }
        catch (e) {
            alert(e.message);
        }
    }

    static addNewOption(str,objSelectElem){
        objSelectElem.options[objSelectElem.options.length] = new Option(str, str);
    }

    callFunction(str,firstNum,secondNum,result,errorFirstNum,errorSecondNum) {
        if(!ControlValue.checkValue(firstNum,errorFirstNum,secondNum,errorSecondNum)){
            return false;
        }
        let mas1 = Singleton.getInstance().definitionFunction(str,false).split(' ');
        let newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = this.makeCachingValue(newFunc,this.cacheValue);
        let obj ={};
        obj[0] = str[0];
        obj[1] = +firstNum.value;
        obj[2] = +secondNum.value;
        Calculator.outputResult(newFunc(obj),result);
    }
};

var Singleton = (function () {
    var instance;

    function createInstance() {
        let cacheFunction = {};
        let cacheValue = {};
        let calculator = new Calculator(cacheValue,cacheFunction);
        calculator.definitionFunction = calculator.definitionFunctionCache(calculator.definitionFunction,cacheFunction);
        Calculator.add = calculator.makeCachingValue(Calculator.add, cacheValue);
        Calculator.minus = calculator.makeCachingValue(Calculator.minus,cacheValue);
        Calculator.composition = calculator.makeCachingValue(Calculator.composition,cacheValue);
        Calculator.division = calculator.makeCachingValue(Calculator.division,cacheValue);
        return calculator;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

//#endregion