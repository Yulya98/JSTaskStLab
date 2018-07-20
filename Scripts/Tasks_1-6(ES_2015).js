//#region Point_1
var objSearchElemMas = (function() {
    var getMaxSubSumOn = function (arr) {
        var outArr= [], sum = 0, maxSum = 0;
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

    var getMaxSubSumSquareOn_2 = function (arr) {
        var outArr= [], maxSum = 0;
        for (var i = 0; i < arr.length; i++) {
            var sum = 0;
            for (var j = i; j < arr.length; j++) {
                sum += +arr[j];
                if (sum > maxSum)
                    maxSum = sum;
            }
        }
        outArr[0] = maxSum;
        return outArr
    }

    var searchMaxMinMediumElemMas = function (arr) {
        var masMinMaxMediumElemMas = [], minEl,maxEl,mediumEl;
        arr = objSortMas.quickSort(arr);
        minEl = arr[0];
        maxEl = arr[arr.length-1];
        if(arr.length%2 ==0){
            mediumEl =(arr[arr.length/2] + arr[(arr.length/2) +1])/2
        }
        else {
            mediumEl = arr[(arr.length+1)/2]
        }
        masMinMaxMediumElemMas[0] = minEl;
        masMinMaxMediumElemMas[1] = maxEl;
        masMinMaxMediumElemMas[2] = mediumEl;
        return masMinMaxMediumElemMas;
    }

    var searchAscendingSequenceMas = function (arr) {
        var outputMas = [], count,countArr = [];
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
        for (var i = index, j=0; i <= index + maxValue; i++,j++) {
            outputMas[j] = arr[i];
        }
        return outputMas;
    }

    var selectFunctionSearch = function selectFunctionSearch (initialMasElem, selectValue) {
        if(!initialMasElem.value.match(/[0-9\s]+/)) {
            initialMasElem.value = "Incorrect Data";
            return false;
        }
        var initialMas  = initialMasElem.value.split(' ').map(x => +x);
        var outputMas = [];
        if (selectValue == "sumOfElemMasIsMax_O(n)") {
            outputMas = getMaxSubSumOn(initialMas, "Sum");
            outputMasToInputElem(outputMas, "Sum",initialMasElem);
        }
        if (selectValue == "sumOfElemMasIsMax_O(n^2)") {
            outputMas = getMaxSubSumSquareOn_2(initialMas);
            outputMasToInputElem(outputMas, "Sum",initialMasElem);
        }
        if (selectValue == "searchMaxMinMediumElemMas") {
            outputMas = searchMaxMinMediumElemMas(initialMas);
            outputMasToInputElem(outputMas, "Min, max, medium",initialMasElem);
        }
        if (selectValue == "ascendingSequenceMas") {
            outputMas = searchAscendingSequenceMas(initialMas);
            outputMasToInputElem(outputMas, "Ascending Sequence",initialMasElem);
        }
    }

    var outputMasToInputElem =  function (arr, str,initialMasEl) {
        initialMasEl.value = str+ ": ";
        for(var i=0;i<arr.length;i++){
            initialMasEl.value +=arr[i] + " ";
        }
    }
    return{
        selectFunctionSearch: selectFunctionSearch
    }
}());
//#endregion

//#region Point_2
var dateFormatter = (function(){

    var selectParseTemplate = function (initialDateElem, selectValue) {
        if (selectValue == "simpleStr") {
            outputDate(parseFunctionReturnStr("DDMMYYYY", "YY-MM-DD",initialDateElem),initialDateElem);
        }
        if (selectValue == "simpleStrMonthToStr") {
            outputDate(parseFunctionReturnStr("DDMMYYYY", "YYYYMMDD", initialDateElem),initialDateElem);
        }
        if (selectValue == "simpleStrToDateObject") {
            outputDate(parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD",initialDateElem),initialDateElem);
        }
        if (selectValue == "simpleStrToDateObjectHyphenated") {
            outputDate(parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD",initialDateElem, "MM-DD-YYYY"),initialDateElem);
        }
        if (selectValue == "fromNow") {
            outputDate(parseFunctionReturnStr("YYYY-MM-DD", "YYYY-MM-DD",initialDateElem),initialDateElem);
        }
        if (selectValue == "MStoDate") {
            outputDate(parseFunctionReturnStr("MS","",initialDateElem),initialDateElem);
        }
        if (selectValue == "DateToMS") {
            outputDate(parseFunctionReturnStr("DateToMS","",initialDateElem),initialDateElem);
        }
    }

    var parseFunctionReturnStr = function (inputStrFormat, regExp,initialDateElem, regExp_2) {
        var date ,masValueForBuildDate = [];
        var locale = "en-us";
        if (inputStrFormat == "DDMMYYYY" && regExp == "YY-MM-DD" && typeof regExp_2 == "undefined") {
            return initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1-$2-$3');
        }
        if (inputStrFormat == "DDMMYYYY" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[2], masValueForBuildDate[1] - 1, masValueForBuildDate[0]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStrFormat == "YYYYMMDD" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStrFormat == "YYYYMMDD" && regExp == "YYYYMMDD" && regExp_2 == "MM-DD-YYYY") {
            return initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1');
        }
        if (inputStrFormat == "YYYY-MM-DD" && regExp == "YYYY-MM-DD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            var b = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            var diff = Math.floor(Date.now() - b);
            return Math.floor(diff / (1000 * 60 * 60 * 24) / 31 / 12) + " years ago";
        }
        if (inputStrFormat == "MS") {
            date = new Date(+initialDateElem.value);
            return date;
        }
        if (inputStrFormat == "DateToMS") {
            masValueForBuildDate = initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            return date;
        }
    }

    var outputDate = function(date,initialDateElem) {
        initialDateElem.value ="";
        initialDateElem.value = date;
    }

    return{
        selectParseTemplate:selectParseTemplate
    }
}());

//#endregion

//#region Point_3
var textFormatter = (function() {

    var changeTextFormatter = function (inputTextElem, countRowsElem, countCharInStrElem,selectValue) {
        if (!countRowsElem.value.match(/^\d+$/)) {
            countRowsElem.value = "Incorrect data";
            if (!countCharInStrElem.value.match(/^\d+$/)) {
                countCharInStrElem.value = "Incorrect data";
            }
            return false;
        }
        if (!countCharInStrElem.value.match(/^\d+$/)) {
            countCharInStrElem.value = "Incorrect data";
            return false
        }
        if (selectValue == "charWrap") {
            inputTextElem.value = outputText(inputTextElem.value.match(/(\w{1})/g).join('\n'),inputTextElem);
        }
        if (selectValue == "wordWrap") {
            inputTextElem.value = outputText(inputTextElem.value.replace(/\s/g, "\n"),inputTextElem)
        }
        if (selectValue == "sentenceWrap") {
            inputTextElem.value = outputText(inputTextElem.value.match(/(\w+.)/g).join('\n'),inputTextElem);
        }
        if (selectValue == "withoutWrap") {
            inputTextElem.setAttribute('wrap', 'off');
        }
        var str;
        if (countRowsElem.value != undefined && countRowsElem.value != "") {
            str = inputTextElem.value.split('\n');
            var outputMas = [];
            if (str.length - countRowsElem.value > 0) {
                for (var i = 0; i < +countRowsElem.value; i++) {
                    outputMas[i] = str[i];
                }
                str = outputText(outputMas.join('\n'),inputTextElem);
            }
            else {
                str = outputText(str.join('\n'),inputTextElem);
            }
        }
        if (countCharInStrElem.value != undefined && countCharInStrElem.value != "") {
            outputText(str.split(/\n/mg).map(function (e) {
                return e.substr(0, +countCharInStrElem.value);
            }).join('\n'),inputTextElem);
        }
    }

    var outputText = function (str,inputTextElem) {
        inputTextElem.value = "";
        inputTextElem.value = str;
        return str;
    }

    return{
        changeTextFormatter:changeTextFormatter
    }
}());
//#endregion

//#region Point_4
var calculator =(function(){

    var selectOperation = function (firstNumElem,secondNumElem,selectValue,resultElem) {
        if(!firstNumElem.value.match(/^\d+$/)){
            firstNumElem.value = "Incorrect data";
            if(!secondNumElem.value.match(/^\d+$/)) {
                secondNumElem.value = "Incorrect data";
            }
            return false;
        }
        if(!secondNumElem.value.match(/^\d+$/)){
            secondNumElem.value = "Incorrect data";
            return false;
        }
        firstNumElem =+firstNumElem.value;
        secondNumElem =+secondNumElem.value;
        if(selectValue == "plus")
            outputResult(add(firstNumElem, secondNumElem),resultElem);
        if(selectValue =="minus")
            outputResult(minus(firstNumElem, secondNumElem),resultElem);
        if(selectValue =="composition")
            outputResult(composition(firstNumElem, secondNumElem,resultElem));
        if(selectValue =="division")
            outputResult(division(firstNumElem, secondNumElem,resultElem));
        if(selectValue =="exponentiation")
            outputResult(exponentiation(firstNumElem, secondNumElem,resultElem));
    }

    var add = function (a,b) {
        return a+b;
    }

    var minus = function(a,b){
        return a-b;
    }

    var composition = function(a,b){
        return a*b;
    }

    var division = function(a,b){
        return a/b;
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

    var insertionSort = function (arr) {

        for (var i = 0; i < arr.length; i++)
        {
            var v = arr[ i ], j = i-1;
            while (j >= 0 && arr[j] > v)
            {
                arr[j+1] = arr[j]; j--;
            }
            arr[j+1] = v;
        }
        return arr;
    }

    var selectionSort = function (arr) {

        for(var i=0;i<arr.length;i++)
        {
            var iMin = i;
            for(var j = i+1;j<arr.length;j++)
            {
                if(arr[j]<arr[iMin])
                    iMin = j;
            }
            if(iMin != i)
            {
                var c = arr[iMin];
                arr[iMin] = arr[i];
                arr[i] = c;
            }
        }
        return arr;
    }

    var bubbleSort = function (arr) {
        var temp;
        for(var i =0;i<arr.length;i++){
            for(var j = i+1;j<arr.length;j++){
                if(arr[i]> arr[j]){
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    var quickSort = function (arr) {
        if (arr.length <= 1) {
            return arr;
        }

        var pivot = arr[0], left = [], right = [];

        for (var i = 1; i < arr.length; i++) {
            arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
        }
        return quickSort(left).concat(pivot, quickSort(right));
    }

    var selectFunctionSort = function (initialMasElem,selectValue) {

        if(!initialMasElem.value.match(/[0-9\s]+/)) {
            initialMasElem.value = "Incorrect Data";
            return false;
        }

        var initialMas = initialMasElem.value.split(' ').map(function (value) { return +value; });
        var sortMas;

        if(initialMas !=undefined) {
            if (selectValue == "quickSort") {
                sortMas = quickSort(initialMas);
            }
            if (selectValue == "insertSort") {
                sortMas = insertionSort(initialMas);
            }
            if (selectValue == "selectionSort") {
                sortMas = selectionSort(initialMas);
            }
            if (selectValue == "bubbleSort") {
                sortMas = bubbleSort(initialMas);
            }
            outputSortMas(sortMas,initialMasElem);
        }
    }

    var outputSortMas = function (arr,initialMasElem) {
        initialMasElem.value = "";
        arr.forEach(function (element) {
            initialMasElem.value +=element + " ";
        });
    }

    return{
        selectFunctionSort: selectFunctionSort
    }
}());

//#endregion

//#region Point_6

var binaryOperations = (function() {

    var convertToBin = function (num) {
        var out = [], bit = 1;
        while (num >= bit) {
            if(num>0)
                out.push(num & bit ? 1 : 0);
            else
                out.push(~(num & bit ? 1 : 0));
            bit <<= 1;
        }
        return out;
    }

    var convertToDec = function (num) {
        var out =0,  bit = 1;
        for(var i=0;i<num.length;i++){
            out+=num[i] == "1" ? bit :0;
            bit<<=1;
        }
        var masValue = [];
        masValue[0] = out;
        return masValue;
    }

    var selectOperation = function (numElem,selectValue) {
        if(!numElem.value.match(/^\d+$/)){
            numElem.value = "Incorrect data";
            return false;
        }
        if(selectValue =="convertToBin"){
            outputMas(convertToBin(numElem.value),numElem);
        }
        if(selectValue == "convertToDesc"){
            outputMas(convertToDec(numElem.value),numElem);
        }
    }

    var outputMas = function (num,numElem) {
        numElem.value = "";
        for(var i in num)
            numElem.value += num[i];
    }

    return{
        selectOperation:selectOperation
    }
}());

//#endregion