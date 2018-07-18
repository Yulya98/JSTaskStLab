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

    var selectFunctionSearch = function selectFunctionSearch () {
        if(!document.getElementById('initialMasForSearch').value.match(/[0-9\s]+/)) {
            document.getElementById('initialMasForSearch').value = "Incorrect Data";
            return false;
        }
        var initialMas = document.getElementById('initialMasForSearch').value.split(' ').map(x => +x);
        var outputMas = [],selectItem = document.getElementById('s3').value;
        if (selectItem == "sumOfElemMasIsMax_O(n)") {
            outputMas = getMaxSubSumOn(initialMas, "Sum");
            outputMasToInputElem(outputMas, "Sum");
        }
        if (selectItem == "sumOfElemMasIsMax_O(n^2)") {
            outputMas = getMaxSubSumSquareOn_2(initialMas);
            outputMasToInputElem(outputMas, "Sum");
        }
        if (selectItem == "searchMaxMinMediumElemMas") {
            outputMas = searchMaxMinMediumElemMas(initialMas);
            outputMasToInputElem(outputMas, "Min, max, medium");
        }
        if (selectItem == "ascendingSequenceMas") {
            outputMas = searchAscendingSequenceMas(initialMas);
            outputMasToInputElem(outputMas, "Ascending Sequence");
        }
    }

    var outputMasToInputElem =  function (arr, str) {
        document.getElementById('initialMasForSearch').value = str+ ": ";
        for(var i=0;i<arr.length;i++){
            document.getElementById('initialMasForSearch').value +=arr[i] + " ";
        }
    }
    return{
        selectFunctionSearch: selectFunctionSearch
    }
}());
//#endregion

//#region Point_2
var dateFormatter = (function(){

    var selectParseTemplate = function () {
        var selectValue = document.getElementById('s1').value;
        if (selectValue == "simpleStr") {
            outputDate(parseFunctionReturnStr("DDMMYYYY", "YY-MM-DD"));
        }
        if (selectValue == "simpleStrMonthToStr") {
            outputDate(parseFunctionReturnStr("DDMMYYYY", "YYYYMMDD"));
        }
        if (selectValue == "simpleStrToDateObject") {
            outputDate(parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD"));
        }
        if (selectValue == "simpleStrToDateObjectHyphenated") {
            outputDate(parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD", "MM-DD-YYYY"));
        }
        if (selectValue == "fromNow") {
            outputDate(parseFunctionReturnStr("YYYY-MM-DD", "YYYY-MM-DD"));
        }
        if (selectValue == "MStoDate") {
            outputDate(parseFunctionReturnStr("MS"));
        }
        if (selectValue == "DateToMS") {
            outputDate(parseFunctionReturnStr("DateToMS"));
        }
    }

   var parseFunctionReturnStr = function (inputStr, regExp, regExp_2) {
        var date , initialDate = document.getElementById("date").value,masValueForBuildDate = [];
        var locale = "en-us";
        if (inputStr == "DDMMYYYY" && regExp == "YY-MM-DD" && typeof regExp_2 == "undefined") {
            return initialDate.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1-$2-$3');
        }
        if (inputStr == "DDMMYYYY" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDate.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[2], masValueForBuildDate[1] - 1, masValueForBuildDate[0]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == "YYYYMMDD" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDate.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == "YYYYMMDD" && regExp == "YYYYMMDD" && regExp_2 == "MM-DD-YYYY") {
            return initialDate.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1');
        }
        if (inputStr == "YYYY-MM-DD" && regExp == "YYYY-MM-DD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = initialDate.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            var b = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            var diff = Math.floor(Date.now() - b);
            return Math.floor(diff / (1000 * 60 * 60 * 24) / 31 / 12) + " years ago";
        }
        if (inputStr == "MS") {
            date = new Date(+initialDate);
            return date;
        }
        if (inputStr == "DateToMS") {
            masValueForBuildDate = initialDate.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            return date;
        }
    }

    var outputDate = function(date) {
        document.getElementById("date").value ="";
        document.getElementById("date").value = date;
    }

    return{
        selectParseTemplate:selectParseTemplate
    }
}());

//#endregion

//#region Point_3
var textFormatter = (function() {

    var changeTextFormatter = function (str, countRows, countCharInStr) {
        if (!countRows.match(/^\d+$/)) {
            document.getElementById('maxRows').value = "Incorrect data";
            if (!countCharInStr.match(/^\d+$/)) {
                document.getElementById('maxColumns').value = "Incorrect data";
            }
            return false;
        }
        if (!countCharInStr.match(/^\d+$/)) {
            document.getElementById('maxColumns').value = "Incorrect data";
            return false
        }

        var textareaObj = document.getElementById("test");
        var selectValue = document.getElementById('s6').value;
        if (selectValue == "charWrap") {
            str = outputText(str.match(/(\w{1})/g).join('\n'));
        }
        if (selectValue == "wordWrap") {
            str = outputText(str.replace(/\s/g, "\n"))
        }
        if (selectValue == "sentenceWrap") {
            str = outputText(str.match(/(\w+.)/g).join('\n'));
        }
        if (selectValue == "withoutWrap") {
            textareaObj.setAttribute('wrap', 'off');
        }
        if (countRows != undefined && countRows != "") {
            str = str.split('\n');
            var outputMas = [];
            if (str.length - countRows > 0) {
                for (var i = 0; i < countRows; i++) {
                    outputMas[i] = str[i];
                }
                str = outputText(outputMas.join('\n'));
            }
            else {
                str = outputText(str.join('\n'));
            }
        }
        if (countCharInStr != undefined && countCharInStr != "") {
            outputText(str.split(/\n/mg).map(function (e) {
                return e.substr(0, countCharInStr);
            }).join('\n'));
        }
    }

    var outputText = function (str) {
        document.getElementById("test").value = "";
        document.getElementById("test").value = str;
        return str;
    }

    return{
        changeTextFormatter:changeTextFormatter
    }
}());
//#endregion

//#region Point_4
var calculator =(function(){

    var selectOperation = function () {
        var firstNum =document.getElementById("firstNum").value;
        var secondNum =document.getElementById("secondNum").value;
        if(!firstNum.match(/^\d+$/)){
            document.getElementById("firstNum").value = "Incorrect data";
            if(!secondNum.match(/^\d+$/)) {
                document.getElementById("secondNum").value = "Incorrect data";
            }
            return false;
        }
        if(!secondNum.match(/^\d+$/)){
            document.getElementById("secondNum").value = "Incorrect data";
            return false;
        }
        firstNum =+document.getElementById("firstNum").value;
        secondNum =document.getElementById("secondNum").value;
        var selectValue = document.getElementById('s5').value;
        if(selectValue == "plus")
            outputResult(add(firstNum, secondNum));
        if(selectValue =="minus")
            outputResult(minus(firstNum, secondNum))
        if(selectValue =="composition")
            outputResult(composition(firstNum, secondNum));
        if(selectValue =="division")
            outputResult(division(firstNum, secondNum));
        if(selectValue =="exponentiation")
            outputResult(exponentiation(firstNum, secondNum));
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

    var outputResult = function (result) {
        document.getElementById("result").value = "";
        document.getElementById("result").value = Math.round(result*10000)/10000;
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

    var selectFunctionSort = function () {

        if(!document.getElementById('initialMasForSort').value.match(/[0-9\s]+/)) {
            document.getElementById('initialMasForSort').value = "Incorrect Data";
            return false;
        }

        var selectValue=document.getElementById('s2').value;
        var initialMas = document.getElementById("initialMasForSort").value.split(' ').map(function (value) { return +value; });
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
            outputSortMas(sortMas);
        }
    }

    var outputSortMas = function (arr) {
        document.getElementById('initialMasForSort').value = "";
        arr.forEach(function (element) {
            document.getElementById('initialMasForSort').value +=element + " ";
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

    var selectOperation = function (num) {
        if(!num.match(/^\d+$/)){
            document.getElementById('numToConvert').value = "Incorrect data";
            return false;
        }
        var selectValue = document.getElementById('s7').value;
        if(selectValue =="convertToBin"){
            outputMas(convertToBin(num));
        }
        if(selectValue == "convertToDesc"){
            outputMas(convertToDec(num));
        }
    }

    var outputMas = function (num) {
        document.getElementById('numToConvert').value = "";
        for(var i in num)
            document.getElementById('numToConvert').value += num[i];
    }

    return{
        selectOperation:selectOperation
    }
}());

//#endregion