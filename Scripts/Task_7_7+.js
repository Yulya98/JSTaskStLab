"use strict";

//#region Point_7
let cacheValue ={};

let calculator = {

    callErrorFunction(){
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
    },

    selectOperation() {
        if(!calculator.callErrorFunction()){
            return false;
        }
        let selectValue = document.getElementById('s5').value;
        let obj ={};
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] =+document.getElementById("secondNum").value;
        if(selectValue == "plus") {
            obj[0]="add"
            calculator.outputResult(calculator.add(obj));
        }
        if(selectValue =="minus"){
            obj[0] ="minus";
            calculator.outputResult(calculator.minus(obj));
        }
        if(selectValue ==="composition") {
            obj[0] ="composition";
            calculator.outputResult(calculator.composition(obj));
        }
        if(selectValue =="division") {
            obj[0] ="division";
            calculator.outputResult(calculator.division(obj));
        }
        if(selectValue =="exponentiation") {
            obj[0] ="exponentiation";
            calculator.outputResult(calculator.exponentiation(obj));
        }
    },

    add(obj) {
        return obj[1]+obj[2];
    },

    minus(obj){
        return obj[1]-obj[2];
    },

    composition(obj){
        return obj[1]*obj[2];
    },

    division(obj){
        return obj[1]/obj[2];
    },

    exponentiation(obj){
        return Math.pow(obj[1],obj[2]);
    },

    outputResult(result) {
        document.getElementById("result").value = "";
        document.getElementById("result").value = Math.round(result*10000)/10000;
    },

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

    },

    definitionFunctionCache(f,cacheFunctions) {

        this.cacheFunctions = cacheFunctions;

        return function (obj,flag) {
            if (!(obj[0] in this.cacheFunctions)) {
                this.cacheFunctions[obj[0]] = f.call(this, obj,flag);
            }
            return this.cacheFunctions[obj[0]];

        };
    },

    definitionFunction(obj,flag) {
        if(flag == true) {
            calculator.addNewOption(obj[0]);
        }
        let mas =[obj[1],obj[2],obj[3]];
        return mas.join(' ');
    },

    addNewOption(str){
        let objSel = document.getElementById("s7");
        objSel.options[objSel.options.length] = new Option(str, str);
    },

    callFunction(str) {
        if(!calculator.callErrorFunction()){
            return false;
        }
        let mas1 = calculator.definitionFunction(str,false).split(' ');
        let newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = calculator.makeCachingValue(newFunc,cacheValue);
        let obj ={};
        obj[0] = str[0];
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] = +document.getElementById("secondNum").value;
        calculator.outputResult(newFunc(obj));
    }
};

function init() {
    let cacheFunction ={};
    calculator.definitionFunction = calculator.definitionFunctionCache(calculator.definitionFunction,cacheFunction);
    calculator.add = calculator.makeCachingValue(calculator.add, cacheValue);
    calculator.minus = calculator.makeCachingValue(calculator.minus,cacheValue);
    calculator.composition = calculator.makeCachingValue(calculator.composition,cacheValue);
    calculator.division = calculator.makeCachingValue(calculator.division,cacheValue);
}

//#endregion