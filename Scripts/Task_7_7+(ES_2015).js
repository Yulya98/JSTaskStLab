//#region Point_7

var calculator =(function() {

    var cacheValue = {};

    var cacheFunction ={};

    var callErrorFunction = function(firstNumElem,secondNumElem){
        if(!firstNumElem.value.match(/^\d+$/)){
            firstNumElem.value = "Incorrect data";
            if(!secondNumElem.value.match(/^\d+$/))
                secondNumElem.value = "Incorrect data";
            return false;
        }
        if(!secondNumElem.value.match(/^\d+$/)) {
            secondNumElem.value = "Incorrect data";
            return false;
        }
        return true;
    }

    var selectOperation = function (firstNumElem,secondNumElem,selectValue,resultElem) {
        if(!callErrorFunction(firstNumElem,secondNumElem)){
            return false;
        }
        var obj ={};
        obj[1] = +firstNumElem.value;
        obj[2] =+secondNumElem.value;
        if(selectValue == "plus") {
            obj[0]="add"
            outputResult(add(obj),resultElem);
        }
        if(selectValue =="minus"){
            obj[0] ="minus";
            outputResult(minus(obj),resultElem);
        }
        if(selectValue ==="composition") {
            obj[0] ="composition";
            outputResult(composition(obj),resultElem);
        }
        if(selectValue =="division") {
            obj[0] ="division";
            outputResult(division(obj),resultElem);
        }
        if(selectValue =="exponentiation") {
            obj[0] ="exponentiation";
            outputResult(exponentiation(obj),resultElem);
        }
    }

    var add = function (obj) {
        return obj[1]+obj[2];
    }

    var minus = function(obj){
        return obj[1]-obj[2];
    }

    var composition = function(obj){
        return obj[1]*obj[2];
    }

    var division = function(obj){
        return obj[1]/obj[2];
    }

    var exponentiation = function(obj){
        return Math.pow(obj[1],obj[2]);
    }

    var outputResult = function (result, resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }

    var makeCachingValue = function (f,cache) {
        this.cacheValue = cache;

        return function (obj){
            if(!((obj[0]+obj[1]+obj[2] in this.cacheValue) || (obj[0]+obj[2]+obj[1] in this.cacheValue) && obj[0]=="exponentiation")){
                this.cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
            }
            if(obj[0] == "exponentiation"){
                if(!(obj[0]+obj[1]+obj[2] in this.cacheValue)){
                    this.cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
                }
            }
            return this.cacheValue[obj[0]+obj[1]+obj[2]];
        };

    }

    var definitionFunctionCache = function (f,cacheFunctions) {

        this.cacheFunctions = cacheFunctions;

        return function (obj,flag,objSelectElem) {
            if (!(obj[0] in this.cacheFunctions)) {
                this.cacheFunctions[obj[0]] = f.call(this, obj,flag,objSelectElem);
            }
            return this.cacheFunctions[obj[0]];

        };
    }

    var definitionFunction = function (obj,flag,objSelectElem) {
        debugger;
        if(flag == true) {
            addNewOption(obj[0],objSelectElem);
        }
        var mas =[obj[1],obj[2],obj[3]];
        return mas.join(' ');
    }

    var f = function (obj,flag,objSelectElem) {
        debugger;
        definitionFunction(obj,flag,objSelectElem);
    }

    var addNewOption = function(str,objSelectElem){
        objSelectElem.options[objSelectElem.options.length] = new Option(str, str);
    }

    var callFunction = function (nameOfFunction,firstNumElem,secondNumElem,resultElem) {
        if(!callErrorFunction(firstNumElem,secondNumElem)){
            return false;
        }
        var mas1 = definitionFunction(nameOfFunction,false).split(' ');
        var newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = makeCachingValue(newFunc,cacheValue);
        var obj ={};
        obj[0] = nameOfFunction[0];
        obj[1] = +firstNumElem.value;
        obj[2] = +secondNumElem.value;
        outputResult(newFunc(obj),resultElem);
    }

    return{
        callFunction:callFunction,
        init:init,
        selectOperation:selectOperation,
        f:f
    }

    function init() {
        add = makeCachingValue(add, cacheValue);
        minus = makeCachingValue(minus,cacheValue);
        composition = makeCachingValue(composition,cacheValue);
        division = makeCachingValue(division,cacheValue);
        definitionFunction = definitionFunctionCache(definitionFunction,cacheFunction);
    }

}());


//#endregion