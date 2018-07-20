"use strict";


class Calculator {

    constructor(cacheValue, cacheFunction){
        this.cacheValue = cacheFunction;
        this.cacheValue = cacheValue;
    }

    static callErrorFunction(firstNumElem,SecondNumElem){
        if(!firstNumElem.value.match(/^\d+$/)){
            firstNumElem.value = "Incorrect data";
            if(!SecondNumElem.value.match(/^\d+$/))
                SecondNumElem.value = "Incorrect data";
            return false;
        }
        if(!SecondNumElem.value.match(/^\d+$/)) {
            SecondNumElem.value = "Incorrect data";
            return false;
        }
        return true;
    }

    selectOperation(firstNum,secondNum,selectValue,resultElem) {
        if(!Calculator.callErrorFunction(firstNum,secondNum)){
            return false;
        }
        let obj ={};
        obj[1] = +firstNum.value;
        obj[2] =+secondNum.value;
        if(selectValue == "plus") {
            obj[0]="add"
            Calculator.outputResult(Calculator.add(obj),resultElem);
        }
        if(selectValue =="minus"){
            obj[0] ="minus";
            Calculator.outputResult(Calculator.minus(obj),resultElem);
        }
        if(selectValue ==="composition") {
            obj[0] ="composition";
            Calculator.outputResult(Calculator.composition(obj),resultElem);
        }
        if(selectValue =="division") {
            obj[0] ="division";
            Calculator.outputResult(Calculator.division(obj),resultElem);
        }
        if(selectValue =="exponentiation") {
            obj[0] ="exponentiation";
            Calculator.outputResult(Calculator.exponentiation(obj),resultElem);
        }
    }

    static add(obj) {
        return obj[1]+obj[2];
    }

    static minus(obj){
        return obj[1]-obj[2];
    }

    static composition(obj){
        return obj[1]*obj[2];
    }

    static division(obj){
        return obj[1]/obj[2];
    }

    static exponentiation(obj){
        return Math.pow(obj[1],obj[2]);
    }

    static outputResult(result,resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }

    makeCachingValue(f,cache) {
        let cacheValue = cache;

        return function (obj){
            if(!((obj[0]+obj[1]+obj[2] in cacheValue) || (obj[0]+obj[2]+obj[1] in cacheValue) && obj[0]=="exponentiation")){
                cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
            }
            if(obj[0] == "exponentiation"){
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
        if(flag == true) {
            Calculator.addNewOption(obj[0],objSelectElem);
        }
        let mas =[obj[1],obj[2],obj[3]];
        return mas.join(' ');
    }

    static addNewOption(str,objSelectElem){
        objSelectElem.options[objSelectElem.options.length] = new Option(str, str);
    }

    callFunction(str,firstNumElem,secondNumElem,resultElem) {
        if(!Calculator.callErrorFunction(firstNumElem,secondNumElem)){
            return false;
        }
        let mas1 = Singleton.getInstance().definitionFunction(str,false).split(' ');
        let newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = this.makeCachingValue(newFunc,this.cacheValue);
        let obj ={};
        obj[0] = str[0];
        obj[1] = +firstNumElem.value;
        obj[2] = +secondNumElem.value;
        Calculator.outputResult(newFunc(obj),resultElem);
    }
};

var Singleton = (function () {
    var instance;

    function createInstance() {
        let cacheFunction ={};
        let cacheValue ={};
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