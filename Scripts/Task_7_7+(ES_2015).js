//#region Point_7

var calculator =(function() {

    var cacheValue = {};

    var cacheFunction ={};

    var callErrorFunction = function(){
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

    var selectOperation = function () {
        if(!callErrorFunction()){
            return false;
        }
        var selectValue = document.getElementById('s5').value;
        var obj ={};
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] =+document.getElementById("secondNum").value;
        if(selectValue == "plus") {
            obj[0]="add"
            outputResult(add(obj));
        }
        if(selectValue =="minus"){
            obj[0] ="minus";
            outputResult(minus(obj));
        }
        if(selectValue ==="composition") {
            obj[0] ="composition";
            outputResult(composition(obj));
        }
        if(selectValue =="division") {
            obj[0] ="division";
            outputResult(division(obj));
        }
        if(selectValue =="exponentiation") {
            obj[0] ="exponentiation";
            outputResult(exponentiation(obj));
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

    var outputResult = function (result) {
        document.getElementById("result").value = "";
        document.getElementById("result").value = Math.round(result*10000)/10000;
    }

    var makeCachingValue = function (f,cache) {
        debugger;
        this.cacheValue = cache;

        return function (obj){
            debugger;
            if(!((obj[0]+obj[1]+obj[2] in this.cacheValue) || (obj[0]+obj[2]+obj[1] in this.cacheValue) && obj[0]=="exponentiation")){
                this.cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
            }
            if(obj[0] == "exponentiation"){
                debugger;
                if(!(obj[0]+obj[1]+obj[2] in this.cacheValue)){
                    this.cacheValue[obj[0]+obj[1]+obj[2]] = f.call(this,obj);
                }
            }
            return this.cacheValue[obj[0]+obj[1]+obj[2]];
        };

    }

    var definitionFunctionCache = function (f,cacheFunctions) {
        debugger;

        this.cacheFunctions = cacheFunctions;

        return function (obj,flag) {
            debugger;
            if (!(obj[0] in this.cacheFunctions)) {
                this.cacheFunctions[obj[0]] = f.call(this, obj,flag);
            }
            return this.cacheFunctions[obj[0]];

        };
    }

    var definitionFunction = function (obj,flag) {
        if(flag == true) {
            addNewOption(obj[0]);
        }
        var mas =[obj[1],obj[2],obj[3]];
        return mas.join(' ');
    }

    var f = function (obj,flag) {
        definitionFunction(obj,flag);
    }

    var addNewOption = function(str){
        var objSel = document.getElementById("s7");
        objSel.options[objSel.options.length] = new Option(str, str);
    }

    var callFunction = function (str) {
        if(!callErrorFunction()){
            return false;
        }
        var mas1 = definitionFunction(str,false).split(' ');
        var newFunc = new Function(mas1[0],mas1[1]+" "+mas1[2]);
        newFunc = makeCachingValue(newFunc,cacheValue);
        var obj ={};
        obj[0] = str[0];
        obj[1] = +document.getElementById("firstNum").value;
        obj[2] = +document.getElementById("secondNum").value;
        outputResult(newFunc(obj));
    }

    return{
        callFunction:callFunction,
        init:init,
        selectOperation:selectOperation,
        f:f
    }

    function init() {
        // debugger;
        // var cacheFunction ={};
        add = makeCachingValue(add, cacheValue);
        minus = makeCachingValue(minus,cacheValue);
        composition = makeCachingValue(composition,cacheValue);
        division = makeCachingValue(division,cacheValue);
        definitionFunction = definitionFunctionCache(definitionFunction,cacheFunction);
    }

}());


//#endregion