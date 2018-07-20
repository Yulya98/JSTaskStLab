

var errorControl = (function () {
    var checkValue = function (firstNum,errorFirstNumElem,flagCountValue,secondNum,errorSecondNumElem) {
        if(flagCountValue == true){
            if(!firstNum.value.match(/^\d+$/)){
                errorFirstNumElem.innerHTML = "Incorrect data: ";
                errorFirstNumElem.setAttribute('style','display:inline');
                if(!secondNum.value.match(/^\d+$/)) {
                    errorSecondNumElem.innerHTML = "Incorrect data: ";
                    errorSecondNumElem.setAttribute('style','display:inline');
                }
                return false;
            }
            else{
                errorFirstNumElem.setAttribute('style','display:none');
            }
            if(!secondNum.value.match(/^\d+$/)){
                errorSecondNumElem.innerHTML = "Incorrect data";
                errorSecondNumElem.setAttribute('style','display:none');
                return false;
            }
            else {
                errorSecondNumElem.setAttribute('style','display:none');
            }
        }
        else {
            debugger;
            if(!firstNum.value.match(/[0-9\s]+/)){
                errorFirstNumElem.innerHTML = "Incorrect data: ";
                errorFirstNumElem.setAttribute('style', 'display:inline');
                return false;
            }
            else{
                errorFirstNumElem.setAttribute('style', 'display:none');
            }
        }
        return true;
    }
    return{
        checkValue:checkValue
    }
}());

//#region Point_1
var objSearchElemMas = (function() {

    var SELECTSUMELEM = "sumOfElemMasIsMax_O(n)";
    var SELECTSUMELEM_2 = "sumOfElemMasIsMax_O(n^2)";
    var SELECTSERCELEM = "searchMaxMinMediumElemMas";
    var SELECTSEQUANCEMAS = "ascendingSequenceMas";

    var getMaxSubSumOn = function (arr) {
        try {
            if(!Array.isArray(arr))
                throw TypeError("Incorrect value");
            var outArr = [], sum = 0, maxSum = 0;
            for (var r = 0; r < arr.length; ++r) {
                sum += +arr[r];
                if (sum > maxSum)
                    maxSum = sum;
                if (sum < 0)
                    sum = 0;
            }
            outArr[0] = maxSum;
            return outArr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var getMaxSubSumSquareOn_2 = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            var outArr = [], maxSum = 0;
            for (var i = 0; i < arr.length; i++) {
                var sum = 0;
                for (var j = i; j < arr.length; j++) {
                    sum += +arr[j];
                    if (sum > maxSum)
                        maxSum = sum;
                }
            }
            outArr[0] = maxSum;
            return outArr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var searchMaxMinMediumElemMas = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            var masMinMaxMediumElemMas = [], minEl, maxEl, mediumEl;
            arr = objSortMas.quickSort(arr);
            minEl = arr[0];
            maxEl = arr[arr.length - 1];
            if (arr.length % 2 == 0) {
                mediumEl = (arr[arr.length / 2] + arr[(arr.length / 2) + 1]) / 2
            }
            else {
                mediumEl = arr[(arr.length + 1) / 2]
            }
            masMinMaxMediumElemMas[0] = minEl;
            masMinMaxMediumElemMas[1] = maxEl;
            masMinMaxMediumElemMas[2] = mediumEl;
            return masMinMaxMediumElemMas;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var searchAscendingSequenceMas = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            var outputMas = [], count, countArr = [];
            for (var i = 0; i < arr.length; i++) {
                count = 0;
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[j - 1] < arr[j]) {
                        count++;
                        if (arr[j] == arr.length - 1) {
                            countArr.push(count);
                            break;
                        }
                    }
                    else {
                        countArr.push(count);
                        break;
                    }
                }
            }
            var maxValue = Math.max.apply(null, countArr), index = countArr.indexOf(maxValue);
            for (var i = index, j = 0; i <= index + maxValue; i++, j++) {
                outputMas[j] = arr[i];
            }
            return outputMas;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var selectFunctionSearch = function selectFunctionSearch (initialMasElem, selectValue,errorMassageElem,resultElem) {
        if(!errorControl.checkValue(initialMasElem,errorMassageElem,false)){
            return false;
        }
        var initialMas  = initialMasElem.value.split(' ').map(x => +x);
        var outputMas = [];
        if (selectValue == SELECTSUMELEM) {
            outputMas = getMaxSubSumOn(initialMas, "Sum");
            outputMasToInputElem(outputMas, "Sum",resultElem);
        }
        if (selectValue == SELECTSUMELEM_2) {
            outputMas = getMaxSubSumSquareOn_2(initialMas);
            outputMasToInputElem(outputMas, "Sum",resultElem);
        }
        if (selectValue == SELECTSERCELEM) {
            outputMas = searchMaxMinMediumElemMas(initialMas);
            outputMasToInputElem(outputMas, "Min, max, medium",resultElem);
        }
        if (selectValue == SELECTSEQUANCEMAS) {
            outputMas = searchAscendingSequenceMas(initialMas);
            outputMasToInputElem(outputMas, "Ascending Sequence",resultElem);
        }
    }

    var outputMasToInputElem =  function (arr, str,resultElem) {
        resultElem.value = str+ ": ";
        for(var i=0;i<arr.length;i++){
            resultElem.value += arr[i] + " ";
        }
    }
    return{
        selectFunctionSearch: selectFunctionSearch
    }
}());
//#endregion

//#region Point_2
var dateFormatter = (function(){

    var PARSETOSIMPLESTR = "simpleStr";
    var PARSETOSTRMONTH = "simpleStrMonthToStr";
    var PARSETODATEOBJECT = "simpleStrToDateObject";
    var PARSETODATEOBJECTHYPHENATED = "simpleStrToDateObjectHyphenated";
    var FROMNOW = "fromNow";
    var MSTODATE = "MStoDate";
    var DATETOMS = "DateToMS";

    var selectParseTemplate = function (initialDateElem, selectValue) {
        if (selectValue == PARSETOSIMPLESTR) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_1, "YY-MM-DD",initialDateElem),initialDateElem);
        }
        if (selectValue == PARSETOSTRMONTH) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_1, SELECTFORMAT_2, initialDateElem),initialDateElem);
        }
        if (selectValue == PARSETODATEOBJECT) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_2, SELECTFORMAT_2,initialDateElem),initialDateElem);
        }
        if (selectValue == PARSETODATEOBJECTHYPHENATED) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_2, SELECTFORMAT_2,initialDateElem, SELECTFORMAT_4),initialDateElem);
        }
        if (selectValue == FROMNOW) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_3,  SELECTFORMAT_3,initialDateElem),initialDateElem);
        }
        if (selectValue == MSTODATE) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_6,"",initialDateElem),initialDateElem);
        }
        if (selectValue == DATETOMS) {
            outputDate(parseFunctionReturnStr(SELECTFORMAT_7,"",initialDateElem),initialDateElem);
        }
    }

    var SELECTFORMAT_1 = "DDMMYYYY";
    var SELECTFORMAT_2 = "YYYYMMDD";
    var SELECTFORMAT_3 = "YYYY-MM-DD";
    var SELECTFORMAT_4 = "MM-DD-YYYY";
    var SELECTFORMAT_5 = "MM-DD-YYYY";
    var SELECTFORMAT_6 = "MS";
    var SELECTFORMAT_7 = "DateToMS";


    var parseFunctionReturnStr = function (inputStrFormat, regExp,initialDateElem, regExp_2) {
        var date ,masValueForBuildDate = [];
        var locale = "en-us";
        if (inputStrFormat == SELECTFORMAT_1 && regExp == "YY-MM-DD" && typeof regExp_2 == "undefined") {
            debugger;
            return initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1-$2-$3');
        }
        if (inputStrFormat == SELECTFORMAT_1 && regExp == SELECTFORMAT_2 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[2], masValueForBuildDate[1] - 1, masValueForBuildDate[0]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStrFormat == SELECTFORMAT_2 && regExp == SELECTFORMAT_2 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStrFormat == SELECTFORMAT_2 && regExp == SELECTFORMAT_2 && regExp_2 == SELECTFORMAT_5) {
            return initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1');
        }
        if (inputStrFormat == SELECTFORMAT_3 && regExp == SELECTFORMAT_3 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            var b = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            var diff = Math.floor(Date.now() - b);
            return Math.floor(diff / (1000 * 60 * 60 * 24) / 31 / 12) + " years ago";
        }
        if (inputStrFormat == SELECTFORMAT_6) {
            date = new Date(+initialDateElem.value);
            return date;
        }
        if (inputStrFormat == SELECTFORMAT_7) {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            return date;
        }
    }

    var outputDate = function(date,initialDateElem) {
        initialDateElem.value = "";
        initialDateElem.value = date;
    }

    return{
        selectParseTemplate:selectParseTemplate
    }
}());

//#endregion

//#region Point_3
var textFormatter = (function() {

    var SELECTTEXTFORMATCHARWRAP = "charWrap";
    var SELECTTEXTFORMATWORDWRAP = "wordWrap";
    var SELECTTEXTFORMATSENTENCEWRAP = "sentenceWrap";
    var WITHOUTWRAP = "withoutWrap";

    var changeTextFormatter = function (inputTextElem, countRowsElem, countCharInStrElem,selectValue,errorRows,errorColumn,resultText) {
        if(!errorControl.checkValue(countRowsElem,errorRows,true,countCharInStrElem, errorColumn)){
            return false;
        }
        else{
            errorColumn.setAttribute('style','display:none');
        }
        var str;
        if (selectValue == SELECTTEXTFORMATCHARWRAP) {
            str = outputText(inputTextElem.value.match(/(\w{1})/g).join('\n'),resultText);
        }
        if (selectValue == SELECTTEXTFORMATWORDWRAP) {
            str = outputText(inputTextElem.value.replace(/\s/g, "\n"),resultText)
        }
        if (selectValue == SELECTTEXTFORMATSENTENCEWRAP) {
            str = outputText(inputTextElem.value.match(/(\w+.)/g).join('\n'),resultText);
        }
        if (selectValue == WITHOUTWRAP) {
            resultText.setAttribute('wrap', 'off');
        }
        if (countRowsElem.value != undefined && countRowsElem.value !=  "") {
            str = resultText.value.split('\n');
            var outputMas = [];
            if (str.length - countRowsElem.value > 0) {
                for (var i = 0; i < +countRowsElem.value; i++) {
                    outputMas[i] = str[i];
                }
                str = outputText(outputMas.join('\n'),resultText);
            }
            else {
                str = outputText(str.join('\n'),resultText);
            }
        }
        if (countCharInStrElem.value != undefined && countCharInStrElem.value != "") {
            outputText(str.split(/\n/mg).map(function (e) {
                return e.substr(0, +countCharInStrElem.value);
            }).join('\n'),resultText);
        }
    }

    var outputText = function (str,resultText) {
        resultText.value = "";
        resultText.value = str;
        return str;
    }

    return{
        changeTextFormatter:changeTextFormatter
    }
}());
//#endregion

//#region Point_4
var calculator =(function(){

    var OPERATIONPLUS = "plus";
    var OPERATIONMINUS = "minus";
    var OPERATIONCOMPOSITION = "composition";
    var OPERATIONDIVISION = "division";
    var OPERATIONEXPONATION = "exponentiation";

    var selectOperation = function (firstNumElem,secondNumElem,selectValue,resultElem,errorFirstNum,errorSecondNum) {
        if(!errorControl.checkValue(firstNumElem,errorFirstNum,true,secondNumElem,errorSecondNum)){
            return false;
        }
        firstNumElem =+firstNumElem.value;
        secondNumElem =+secondNumElem.value;
        if(selectValue == OPERATIONPLUS)
            outputResult(add(firstNumElem, secondNumElem),resultElem);
        if(selectValue == OPERATIONMINUS)
            outputResult(minus(firstNumElem, secondNumElem),resultElem);
        if(selectValue == OPERATIONCOMPOSITION)
            outputResult(composition(firstNumElem, secondNumElem),resultElem);
        if(selectValue == OPERATIONDIVISION)
            outputResult(division(firstNumElem, secondNumElem),resultElem);
        if(selectValue == OPERATIONEXPONATION)
            outputResult(exponentiation(firstNumElem, secondNumElem),resultElem);
    }

    var checkType = function(a,b){
        if(typeof a == 'number' && typeof  b == 'number'){
            return true;
        }
        return false;
    }

    var add = function (a,b) {
        try {
            if (!checkType(a, b)) {
                throw  new TypeError("Argument should be number");
            }
            return a + b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var minus = function(a,b){
        try {
            if (!checkType(a, b)) {
                throw  new TypeError("Argument should be number");
            }
            return a - b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var composition = function(a,b){
        try {
            if (!checkType(a, b)) {
                throw  new TypeError("Argument should be number");
            }
            return a * b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var division = function(a,b){
        try {
            if (!checkType(a, b)) {
                throw  new TypeError("Argument should be number");
            }
            return a / b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var exponentiation = function(a,b){
        return Math.pow(a,b);
    }

    var outputResult = function (result,resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }

    return{
        selectOperation:selectOperation
    }
}());
//#endregion

//#region Point_5
var objSortMas = (function(){

    var SELECTQUICKSORT = "quickSort";
    var SELECTINSERTSORT = "insertSort";
    var SELECTSELECTIONSORT = "selectionSort";
    var BUBBLESORT = "bubbleSort";

    var insertionSort = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            for (var i = 0; i < arr.length; i++) {
                var v = arr[i], j = i - 1;
                while (j >= 0 && arr[j] > v) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = v;
            }
            return arr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var selectionSort = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            for (var i = 0; i < arr.length; i++) {
                var iMin = i;
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[j] < arr[iMin])
                        iMin = j;
                }
                if (iMin != i) {
                    var c = arr[iMin];
                    arr[iMin] = arr[i];
                    arr[i] = c;
                }
            }
            return arr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var bubbleSort = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            var temp;
            for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        catch (e) {
            alert(e.message)
        }
    }

    var quickSort = function (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect value");
            if (arr.length <= 1) {
                return arr;
            }

            var pivot = arr[0], left = [], right = [];

            for (var i = 1; i < arr.length; i++) {
                arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
            }
            return quickSort(left).concat(pivot, quickSort(right));
        }
        catch (e) {
            alert(e.message);
        }
    }

    var selectFunctionSort = function (initialMasElem,selectValue, errorInitialMas,resultMasSort) {
        if(!errorControl.checkValue(initialMasElem,errorInitialMas,false)){
            return false;
        }

        var initialMas = initialMasElem.value.split(' ').map(function (value) { return +value; });
        var sortMas;

        if(initialMas != undefined) {
            if (selectValue == SELECTQUICKSORT) {
                sortMas = quickSort(initialMas);
            }
            if (selectValue == SELECTINSERTSORT) {
                sortMas = insertionSort(initialMas);
            }
            if (selectValue == SELECTSELECTIONSORT) {
                sortMas = selectionSort(initialMas);
            }
            if (selectValue == BUBBLESORT) {
                sortMas = bubbleSort(initialMas);
            }
            outputSortMas(sortMas,resultMasSort);
        }
    }

    var outputSortMas = function (arr,resultMasSort) {
        resultMasSort.value = "";
        arr.forEach(function (element) {
            resultMasSort.value +=element + " ";
        });
    }

    return{
        selectFunctionSort: selectFunctionSort
    }
}());

//#endregion

//#region Point_6

var binaryOperations = (function() {

    var SELECTCONVERTTOBIN = "convertToBin";
    var SELECTCONVERTTODESC = "convertToDesc";

    var convertToBin = function (num) {
        try {
            if (num == "undefined")
                throw TypeError("Incorrect date");
            var out = [], bit = 1;
            while (num >= bit) {
                if (num > 0)
                    out.push(num & bit ? 1 : 0);
                else
                    out.push(~(num & bit ? 1 : 0));
                bit <<= 1;
            }
            return out;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var convertToDec = function (num) {
        try {
            if (num == "undefined")
                throw TypeError("Incorrect date");
            var out = 0, bit = 1;
            for (var i = 0; i < num.length; i++) {
                out += num[i] == "1" ? bit : 0;
                bit <<= 1;
            }
            var masValue = [];
            masValue[0] = out;
            return masValue;
        }
        catch (e) {
            alert(e.message);
        }
    }

    var selectOperation = function (numElem,selectValue,errorNumToConvert,resultConvert) {
        if(!errorControl.checkValue(numElem,errorNumToConvert,false)){
            return false;
        }
        if(selectValue == SELECTCONVERTTOBIN){
            outputMas(convertToBin(numElem.value),resultConvert);
        }
        if(selectValue == SELECTCONVERTTODESC){
            outputMas(convertToDec(numElem.value),resultConvert);
        }
    }

    var outputMas = function (num,resultConvert) {
        resultConvert.value = "";
        for(var i in num)
            resultConvert.value += num[i];
    }

    return{
        selectOperation:selectOperation
    }
}());

//#endregion