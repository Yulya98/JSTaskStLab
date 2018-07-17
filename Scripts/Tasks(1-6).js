//#region Point_1
var objSearchElemMas = {
    getMaxSubSumOn : function (arr) {
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
    },

    getMaxSubSumSquareOn_2 : function (arr) {
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
    },

    searchMaxMinMediumElemMas : function (arr) {
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
    },



    searchAscendingSequenceMas : function (arr) {
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
    },

    selectFunctionSearch : function () {
        if(!document.getElementById('initialMasForSearch').value.match(/[0-9\s]+/)) {
            document.getElementById('initialMasForSearch').value = "Incorrect Data";
            return false;
        }
        var initialMas = document.getElementById('initialMasForSearch').value.split(' ').map(x => +x);
        var outputMas = [],selectItem = document.getElementById('s3').value;
        if (selectItem == "sumOfElemMasIsMax_O(n)") {
            outputMas = objSearchElemMas.getMaxSubSumOn(initialMas, "Sum");
            objSearchElemMas.outputMas(outputMas, "Sum");
        }
        if (selectItem == "sumOfElemMasIsMax_O(n^2)") {
            outputMas = objSearchElemMas.getMaxSubSumSquareOn_2(initialMas);
            objSearchElemMas.outputMas(outputMas, "Sum");
        }
        if (selectItem == "searchMaxMinMediumElemMas") {
            outputMas = objSearchElemMas.searchMaxMinMediumElemMas(initialMas);
            objSearchElemMas.outputMas(outputMas, "Min, max, medium");
        }
        if (selectItem == "ascendingSequenceMas") {
            outputMas = objSearchElemMas.searchAscendingSequenceMas(initialMas);
            objSearchElemMas.outputMas(outputMas, "Ascending Sequence");
        }
    },

    outputMas :  function (arr, str) {
        document.getElementById('initialMasForSearch').value = str+ ": ";
        for(var i=0;i<arr.length;i++){
            document.getElementById('initialMasForSearch').value +=arr[i] + " ";
        }
    }
};
//#endregion

//#region Point_2
var dateFormatter = {

    selectParseTemplate : function () {
        var selectValue = document.getElementById('s1').value;
        if (selectValue == "simpleStr") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("DDMMYYYY", "YY-MM-DD"));
        }
        if (selectValue == "simpleStrMonthToStr") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("DDMMYYYY", "YYYYMMDD"));
        }
        if (selectValue == "simpleStrToDateObject") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD"));
        }
        if (selectValue == "simpleStrToDateObjectHyphenated") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD", "MM-DD-YYYY"));
        }
        if (selectValue == "fromNow") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("YYYY-MM-DD", "YYYY-MM-DD"));
        }
        if (selectValue == "MStoDate") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("MS"));
        }
        if (selectValue == "DateToMS") {
            dateFormatter.outputDate(dateFormatter.parseFunctionReturnStr("DateToMS"));
        }
    },

    parseFunctionReturnStr : function (inputStr, regExp, regExp_2) {
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
    },
    outputDate : function(date) {
        document.getElementById("date").value ="";
        document.getElementById("date").value = date;
    }
};

//#endregion

//#region Point_3
var changeTextFormatter = function (str,countRows, countCharInStr) {
    if(!countRows.match(/^\d+$/)) {
        document.getElementById('maxRows').value = "Incorrect data";
        if(!countCharInStr.match(/^\d+$/)) {
            document.getElementById('maxColumns').value = "Incorrect data";
        }
        return false;
    }
    if(!countCharInStr.match(/^\d+$/)) {
        document.getElementById('maxColumns').value = "Incorrect data";
        return false
    }
    var textareaObj = document.getElementById("test");
    var selectValue = document.getElementById('s6').value;
    if(selectValue =="charWrap"){
        str = outputText(str.match(/(\w{1})/g).join('\n'));
    }
    if(selectValue =="wordWrap"){
        str = outputText(str.replace(/\s/g, "\n"))
    }
    if(selectValue == "sentenceWrap"){
        str = outputText(str.match(/(\w+.)/g).join('\n'));
    }
    if(selectValue=="withoutWrap"){
        textareaObj.setAttribute('wrap','off');
    }
    if(countRows !=undefined && countRows!=""){
        str = str.split('\n');
        var outputMas = [];
        if(str.length-countRows>0) {
            for (var i = 0; i < countRows; i++) {
                outputMas[i] = str[i];
            }
            str = outputText(outputMas.join('\n'));
        }
        else {
            str = outputText(str.join('\n'));
        }
    }
    if(countCharInStr != undefined && countCharInStr!=""){
        outputText(str.split(/\n/mg).map(function (e) {return  e.substr(0, countCharInStr);}).join('\n'));
    }
}

var outputText = function (str) {
    document.getElementById("test").value ="";
    document.getElementById("test").value = str;
    return str;
}
//#endregion

//#region Point_4
var calculator = {

    selectOperation : function () {
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
            calculator.outputResult(calculator.add(firstNum, secondNum));
        if(selectValue =="minus")
            calculator.outputResult(calculator.minus(firstNum, secondNum))
        if(selectValue =="composition")
            calculator.outputResult(calculator.composition(firstNum, secondNum));
        if(selectValue =="division")
            calculator.outputResult(calculator.division(firstNum, secondNum));
        if(selectValue =="exponentiation")
            calculator.outputResult(calculator.exponentiation(firstNum, secondNum));
    },

    add : function (a,b) {
        return a+b;
    },

    minus : function(a,b){
        return a-b;
    },

    composition: function(a,b){
        return a*b;
    },

    division : function(a,b){
        return a/b;
    },

    exponentiation: function(a,b){
        return Math.pow(a,b);
    },

    outputResult: function (result) {
        document.getElementById("result").value = "";
        document.getElementById("result").value = Math.round(result*10000)/10000;
    }
};
//#endregion

//#region Point_5
var objSortMas = {
    insertionSort : function (arr) {
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
    },

    selectionSort : function (arr) {
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
    },

    bubbleSort : function (arr) {
        var temp
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
    },

    quickSort : function (arr) {
        if (arr.length <= 1) {
            return arr;
        }

        var pivot = arr[0], left = [], right = [];

        for (var i = 1; i < arr.length; i++) {
            arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
        }
        return objSortMas.quickSort(left).concat(pivot, objSortMas.quickSort(right));
    },

    selectFunctionSort : function () {

        if(!document.getElementById('initialMasForSort').value.match(/[0-9\s]+/)) {
            document.getElementById('initialMasForSort').value = "Incorrect Data";
            return false;
        }
        var selectValue=document.getElementById('s2').value;
        var initialMas = document.getElementById("initialMasForSort").value.split(' ').map(function (value) { return +value; });
        var sortMas;
        if(initialMas !=undefined) {
            if (selectValue == "quickSort") {
                sortMas = objSortMas.quickSort(initialMas);
            }
            if (selectValue == "insertSort") {
                sortMas = objSortMas.insertionSort(initialMas);
            }
            if (selectValue == "selectionSort") {
                sortMas = objSortMas.selectionSort(initialMas);
            }
            if (selectValue == "bubbleSort") {
                sortMas = objSortMas.bubbleSort(initialMas);
            }
            objSortMas.outputSortMas(sortMas);
        }
    },

    outputSortMas : function (arr) {
        document.getElementById('initialMasForSort').value = "";
        arr.forEach(function (element) {
            document.getElementById('initialMasForSort').value +=element + " ";
        });
    }
};

//#endregion

//#region Point_6

var binaryOperations = {
    convertToBin: function (num) {
        var out = [], bit = 1;
        while (num >= bit) {
            if(num>0)
                out.push(num & bit ? 1 : 0);
            else
                out.push(~(num & bit ? 1 : 0));
            bit <<= 1;
        }
        return out;
    },

    convertToDec: function (num) {
        var out =0,  bit = 1;
        for(var i=0;i<num.length;i++){
            out+=num[i] == "1" ? bit :0;
            bit<<=1;
        }
        var masValue = [];
        masValue[0] = out;
        return masValue;
    },

    selectOperation : function (num) {
        if(!num.match(/^\d+$/)){
            document.getElementById('numToConvert').value = "Incorrect data";
            return false;
        }
        var selectValue = document.getElementById('s7').value;
        if(selectValue =="convertToBin"){
            binaryOperations.outputMas(binaryOperations.convertToBin(num));
        }
        if(selectValue == "convertToDesc"){
            binaryOperations.outputMas(binaryOperations.convertToDec(num));
        }
    },

    outputMas : function (num) {
        document.getElementById('numToConvert').value = "";
        for(var i in num)
            document.getElementById('numToConvert').value += num[i];
    }
}

//#endregion