//#region Point_7

var calculator =(function() {

    var OPERATIONPLUS = "plus";
    var OPERATIONMINUS = "minus";
    var OPERATIONCOMPOSITION = "composition";
    var OPERATIONDIVISION = "division";
    var OPERATIONEXPONATION = "exponentiation";

    var NAMEFANCTIONADD = "add";
    var NAMEFACTIONMINUS = "minus";
    var NAMEFANCTIONCOMPOSITION = "composition";
    var NAMEFANCTIONDIVISION = "division";
    var NAMEFANCTIONEXPONATION = "exponentiation";

    var cacheValue = {};

    var cacheFunction ={};

    var callErrorFunction = function(firstNumElem,secondNumElem,errorFirstNum,errorSecondNum){
        if(!firstNumElem.value.match(/^\d+$/)){
            errorFirstNum.innerHTML = "Incorrect data: ";
            errorFirstNum.setAttribute('style','display:inline');
            if(!secondNumElem.value.match(/^\d+$/)) {
                errorSecondNum.innerHTML = "Incorrect data: ";
                errorSecondNum.setAttribute('style','display:inline');
            }
            return false;
        }
        else{
            errorFirstNum.setAttribute('style','display:none');
        }
        if(!secondNumElem.value.match(/^\d+$/)){
            errorSecondNum.innerHTML = "Incorrect data";
            errorSecondNum.setAttribute('style','display:none');
            return false;
        }
        else {
            errorSecondNum.setAttribute('style','display:none');
        }
        return true;
    }

    var selectOperation = function (firstNumElem,secondNumElem,selectValue,resultElem,errorFirstElem,errorSecondElem) {
        if(!callErrorFunction(firstNumElem,secondNumElem,errorFirstElem,errorSecondElem)){
            return false;
        }
        var obj ={};
        obj[1] = +firstNumElem.value;
        obj[2] = +secondNumElem.value;
        if(selectValue == OPERATIONPLUS) {
            obj[0] = NAMEFANCTIONADD;
            outputResult(add(obj),resultElem);
        }
        if(selectValue == OPERATIONMINUS){
            obj[0] = NAMEFACTIONMINUS;
            outputResult(minus(obj),resultElem);
        }
        if(selectValue == OPERATIONCOMPOSITION) {
            obj[0] = NAMEFANCTIONCOMPOSITION;
            outputResult(composition(obj),resultElem);
        }
        if(selectValue == OPERATIONDIVISION) {
            obj[0] = NAMEFANCTIONDIVISION;
            outputResult(division(obj),resultElem);
        }
        if(selectValue == OPERATIONEXPONATION) {
            obj[0] =NAMEFANCTIONEXPONATION;
            outputResult(exponentiation(obj),resultElem);
        }
    }

    var checkType = function(obj){
        if(typeof obj[1] == 'number' && typeof  obj[2] == 'number'){
            return true;
        }
        return false;
    }

    var add = function (obj) {
        try {
            if (!checkType(obj)) {
                throw  new TypeError("Argument should be number");
            }
            return obj[1] + obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    var minus = function(obj){
        try {
            if (!checkType(obj)) {
                throw  new TypeError("Argument should be number");
            }
            return obj[1] - obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    var composition = function(obj){
        try {
            if (!checkType(obj)) {
                throw  new TypeError("Argument should be number");
            }
            return obj[1] * obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    var division = function(obj){
        try {
            if (!checkType(obj)) {
                throw  new TypeError("Argument should be number");
            }
            return obj[1] / obj[2];
        }
        catch (e) {
            alert(e.message);
        }
    }

    var exponentiation = function(obj){
        try {
            if (!checkType(obj)) {
                throw  new TypeError("Argument should be number");
            }
            return Math.pow(obj[1],obj[2]);
        }
        catch (e) {
            alert(e.message);
        }
    }

    var outputResult = function (result, resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }

    var makeCachingValue = function (f,cache) {
        this.cacheValue = cache;

        return function (obj){
            if(!((obj[0]+obj[1]+obj[2] in this.cacheValue) || (obj[0]+obj[2]+obj[1] in this.cacheValue) && obj[0] == NAMEFANCTIONEXPONATION)){
                this.cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
            }
            if(obj[0] == NAMEFANCTIONEXPONATION){
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
        if(flag == true) {
            addNewOption(obj[0],objSelectElem);
        }
        var mas = [obj[1],obj[2],obj[3]];
        return mas.join(' ');
    }

    var f = function (obj,flag,objSelectElem) {
        definitionFunction(obj,flag,objSelectElem);
    }

    var addNewOption = function(str,objSelectElem){
        objSelectElem.options[objSelectElem.options.length] = new Option(str, str);
    }

    var callFunction = function (nameOfFunction,firstNumElem,secondNumElem,resultElem,errorFirstElem,errorSecondElem) {
        if(!callErrorFunction(firstNumElem,secondNumElem,errorFirstElem,errorSecondElem)){
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