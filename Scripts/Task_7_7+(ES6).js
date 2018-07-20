"use strict";


class Calculator {

    constructor(cacheValue, cacheFunction){
        this.cacheValue = cacheFunction;
        this.cacheValue = cacheValue;
    }

    static callErrorFunction(){
        if(!document.getElementById("firstNum").value.match(/^\d+$/)){
            document.getElementById("firstNum").value = "Incorrect data";
            if(!document.getElementById("secondNum").value.match(/^\d+$/))
                document.getElementById("secondNum").value = "Incorrect data";
            return false;
        }
        if(!document.getElementById("secondNum").value.match(/^\d+$/)) {
            document.getElementById("secondNum").value = "Incorrect data";
            return false;
        }
        return true;
    }

    selectOperation() {
        if(!Calculator.callErrorFunction()){
            return false;
        }
        let selectValue = document.getElementById('s5').value;
        let obj ={};
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] =+document.getElementById("secondNum").value;
        if(selectValue == "plus") {
            obj[0]="add"
            Calculator.outputResult(Calculator.add(obj));
        }
        if(selectValue =="minus"){
            obj[0] ="minus";
            Calculator.outputResult(Calculator.minus(obj));
        }
        if(selectValue ==="composition") {
            obj[0] ="composition";
            Calculator.outputResult(Calculator.composition(obj));
        }
        if(selectValue =="division") {
            obj[0] ="division";
            Calculator.outputResult(Calculator.division(obj));
        }
        if(selectValue =="exponentiation") {
            obj[0] ="exponentiation";
            Calculator.outputResult(Calculator.exponentiation(obj));
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

    static outputResult(result) {
        document.getElementById("result").value = "";
        document.getElementById("result").value = Math.round(result*10000)/10000;
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

        return function (obj,flag) {
            if (!(obj[0] in this.cacheFunctions)) {
                this.cacheFunctions[obj[0]] = f.call(this, obj,flag);
            }
            return this.cacheFunctions[obj[0]];

        };
    }

    definitionFunction(obj,flag) {
        if(flag == true) {
            Calculator.addNewOption(obj[0]);
        }
        let mas =[obj[1],obj[2],obj[3]];
        return mas.join(' ');
    }

    static addNewOption(str){
        let objSel = document.getElementById("s7");
        objSel.options[objSel.options.length] = new Option(str, str);
    }

    callFunction(str) {
        if(!Calculator.callErrorFunction()){
            return false;
        }
        let mas1 = Singleton.getInstance().definitionFunction(str,false).split(' ');
        let newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = this.makeCachingValue(newFunc,this.cacheValue);
        let obj ={};
        obj[0] = str[0];
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] = +document.getElementById("secondNum").value;
        Calculator.outputResult(newFunc(obj));
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