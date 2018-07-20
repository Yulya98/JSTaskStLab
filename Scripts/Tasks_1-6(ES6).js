
"use strict";

const SELECTSUMELEM = "sumOfElemMasIsMax_O(n)";
const SELECTSUMELEM_2 ="sumOfElemMasIsMax_O(n^2)";
const SELECTSERCELEM = "searchMaxMinMediumElemMas";
const SELECTSEQUANCEMAS = "ascendingSequenceMas";

const PARSETOSIMPLESTR = "simpleStr";
const PARSETOSTRMONTH = "simpleStrMonthToStr";
const PARSETODATEOBJECT = "simpleStrToDateObject";
const PARSETODATEOBJECTHYPHENATED = "simpleStrToDateObjectHyphenated";
const FROMNOW = "fromNow";
const MSTODATE = "MStoDate";
const DATETOMS = "DateToMS";

const SELECTFORMAT_1 = "DDMMYYYY";
const SELECTFORMAT_2 = "YYYYMMDD";
const SELECTFORMAT_3 = "YYYY-MM-DD";
const SELECTFORMAT_4 = "MM-DD-YYYY";
const SELECTFORMAT_5 = "MM-DD-YYYY";
const SELECTFORMAT_6 = "MS";
const SELECTFORMAT_7 = "DateToMS";

const SELECTTEXTFORMATCHARWRAP = "charWrap";
const SELECTTEXTFORMATWORDWRAP = "wordWrap";
const SELECTTEXTFORMATSENTENCEWRAP = "sentenceWrap";
const WITHOUTWRAP = "withoutWrap";

const OPERATIONPLUS = "plus";
const OPERATIONMINUS = "minus";
const OPERATIONCOMPOSITION = "composition";
const OPERATIONDIVISION = "division";
const OPERATIONEXPONATION = "exponentiation";

const SELECTQUICKSORT = "quickSort";
const SELECTINSERTSORT = "insertSort";
const SELECTSELECTIONSORT = "selectionSort";
const BUBBLESORT = "bubbleSort";

const SELECTCONVERTTOBIN = "convertToBin";
const SELECTCONVERTTODESC = "convertToDesc";

class ControlValue{

    static checkValue(firstNum,errorFirstNumElem,flagCountValue,secondNum,errorSecondNumElem) {
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
}

//#region Point_1
class SearchElemMas {

    constructor(arr,selectValue,errorElem,resultElem){
        this.arrElem = arr;
        this.selectValue = selectValue;
        this.errorElem = errorElem;
        this.resultElem = resultElem;
    }


    static getMaxSubSumOn(arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect type")
            let outArr = [];
            let sum = 0, maxSum = 0;
            for (let value of arr) {
                sum += +value;
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

    static getMaxSubSumSquareOn_2(arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect type")
            let outArr = [];
            let maxSum = 0;
            for (let i = 0; i < arr.length; i++) {
                let sum = 0;
                for (let j = i; j < arr.length; j++) {
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

    static searchMaxMinMediumElemMas (arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect type")
            let masMinMaxMediumElemMas = [], minEl, maxEl, mediumEl;
            arr = new SortMas().quickSort(arr);
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



    static searchAscendingSequenceMas(arr) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect type")
            let outputMas = [];
            let count;
            let countArr = [];
            for (let i = 0; i < arr.length; i++) {
                count = 0;
                for (let j = i + 1; j < arr.length; j++) {
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
            const maxValue = Math.max.apply(null, countArr);
            const index = countArr.indexOf(maxValue);
            for (let i = index, j = 0; i <= index + maxValue; i++, j++) {
                outputMas[j] = arr[i];
            }
            return outputMas;
        }
        catch (e) {
            alert(e.message);
        }
    }

    selectFunctionSearch() {
        if(!ControlValue.checkValue(this.arrElem,this.errorElem,false)){
            return false;
        }
        let masFromArr = this.arrElem.value.split(' ').map(x => +x);
        let outputMas = [];
        if (this.selectValue == SELECTSUMELEM) {
            outputMas = SearchElemMas.getMaxSubSumOn(masFromArr, "Sum");
            this.outputMas(outputMas, "Sum");
        }
        if (this.selectValue == SELECTSUMELEM_2) {
            outputMas = SearchElemMas.getMaxSubSumSquareOn_2(masFromArr);
            this.outputMas(outputMas, "Sum");
        }
        if (this.selectValue == SELECTSERCELEM) {
            outputMas = SearchElemMas.searchMaxMinMediumElemMas(masFromArr);
            this.outputMas(outputMas, "Min, max, medium");
        }
        if (this.selectValue == SELECTSEQUANCEMAS) {
            outputMas = SearchElemMas.searchAscendingSequenceMas(masFromArr);
            this.outputMas(outputMas, "Ascending Sequence");
        }
    }

    outputMas(arr, str) {
        try {
            if (!Array.isArray(arr))
                throw TypeError("Incorrect type")
            this.resultElem.value = str + ": ";
            for (let value of arr) {
                this.resultElem.value += value + " ";
            }
        }
        catch (e) {
            alert(e.message);
        }
    }
};
//#endregion

//#region Point_2
class DateFormatter {

    constructor(initialDateElem,selectValue){
        this.initialDateElem = initialDateElem;
        this.selectValue = selectValue;
    }

    selectParseTemplate() {
        if (this.selectValue == PARSETOSIMPLESTR) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_1, "YY-MM-DD"));
        }
        if (this.selectValue == PARSETOSTRMONTH) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_1, SELECTFORMAT_2));
        }
        if (this.selectValue == PARSETODATEOBJECT) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_2, SELECTFORMAT_2));
        }
        if (this.selectValue == PARSETODATEOBJECTHYPHENATED) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_2, SELECTFORMAT_2, SELECTFORMAT_4));
        }
        if (this.selectValue == FROMNOW) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_3,  SELECTFORMAT_3));
        }
        if (this.selectValue == MSTODATE) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_6));
        }
        if (this.selectValue == DATETOMS) {
            this.outputDate(this.parseFunctionReturnStr(SELECTFORMAT_7));
        }
    }

    parseFunctionReturnStr(inputStr, regExp, regExp_2) {
        let date, masValueForBuildDate = [];
        const locale = "en-us";
        if (inputStr == SELECTFORMAT_1 && regExp == "YY-MM-DD" && typeof regExp_2 == "undefined") {
            return this.initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1-$2-$3');
        }
        if (inputStr == SELECTFORMAT_1 && regExp == SELECTFORMAT_2 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[2], masValueForBuildDate[1] - 1, masValueForBuildDate[0]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == SELECTFORMAT_2 && regExp == SELECTFORMAT_2 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == SELECTFORMAT_2 && regExp == SELECTFORMAT_2 && regExp_2 == SELECTFORMAT_5) {
            return this.initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1');
        }
        if (inputStr == SELECTFORMAT_3 && regExp == SELECTFORMAT_3 && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            let initialDate = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            let diff = Math.floor(Date.now() - initialDate);
            return Math.floor(diff / (1000 * 60 * 60 * 24) / 31 / 12) + " years ago";
        }
        if (inputStr == SELECTFORMAT_6) {
            date = new Date(+this.initialDateElem.value);
            return date;
        }
        if (inputStr == SELECTFORMAT_7) {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            return date;
        }
    }

    outputDate(date) {
        this.initialDateElem.value = "";
        this.initialDateElem.value = date;
    }
};

//#endregion

//#region Point_3

class TextFormatter{

    constructor(maxRows,maxColumns,text,selectValue,errorRowsCount,errorColumnsCount,textResult){
        this.maxRows = maxRows;
        this.maxColumns = maxColumns;
        this.text = text;
        this.selectValue = selectValue;
        this.errorRowsCount = errorRowsCount;
        this.errorColumnsCount = errorColumnsCount;
        this.textResult = textResult;
    }

    changeTextFormatter () {
        if(!ControlValue.checkValue(this.maxRows,this.errorRowsCount,true,this.maxColumns,this.errorColumnsCount)){
            return false;
        }
        if(this.selectValue == SELECTTEXTFORMATCHARWRAP){
            this.text.value = this.outputText(this.text.value.match(/(\w{1})/g).join('\n'));
        }
        if(this.selectValue == SELECTTEXTFORMATWORDWRAP){
            this.text.value = this.outputText(this.text.value.replace(/\s/g, "\n"))
        }
        if(this.selectValue == SELECTTEXTFORMATSENTENCEWRAP){
            this.text.value = this.outputText(this.text.value.match(/(\w+.)/g).join('\n'));
        }
        if(this.selectValue == WITHOUTWRAP){
            this.text.setAttribute('wrap','off');
        }
        let str;
        if(this.maxRows.value != undefined && this.maxRows.value != ""){
            str = this.text.value.split('\n');
            let outputMas = [];
            if(str.length-(+this.maxRows.value)>0) {
                for (let i = 0; i < (+this.maxRows.value); i++) {
                    outputMas[i] = str[i];
                }
                str = this.outputText(outputMas.join('\n'));
            }
            else {
                str = this.outputText(str.join('\n'));
            }
        }
        if(this.maxColumns.value != undefined && this.maxColumns.value!=""){
            this.outputText(str.split(/\n/mg).map(x => x.substr(0, (+this.maxColumns.value))).join('\n'));
        }
    }

    outputText(str) {
        try {
            if (typeof  str != "string")
                throw TypeError("Incorrect type")
            this.textResult.value = "";
            this.textResult.value = str;
            return str;
        }
        catch (e) {
            alert(e.message);
        }
    }
};

//#endregion

//#region Point_4
class Calculator  {

    static selectOperation(a,b,selectValue,resultElem,errorFirstNum,errorSecondNum) {
        if(!ControlValue.checkValue(a,errorFirstNum,true,b,errorSecondNum)){
            return false;
        }
        a = +a.value;
        b = +b.value;
        if(selectValue == OPERATIONPLUS)
            Calculator.outputResult(Calculator.add(a, b),resultElem);
        if(selectValue == OPERATIONMINUS)
            Calculator.outputResult(Calculator.minus(a, b),resultElem)
        if(selectValue == OPERATIONCOMPOSITION)
            Calculator.outputResult(Calculator.composition(a, b),resultElem);
        if(selectValue == OPERATIONDIVISION)
            Calculator.outputResult(Calculator.division(a, b),resultElem);
        if(selectValue == OPERATIONEXPONATION)
            Calculator.outputResult(Calculator.exponentiation(a, b),resultElem);
    }

    static checkType(a,b){
        if(typeof a == 'number' && typeof  b == 'number'){
            return true;
        }
        return false;
    }

    static add (a,b) {
        try {
            if (!Calculator.checkType(a,b)) {
                throw  new TypeError("Argument should be number");
            }
            return a + b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    static minus (a,b){
        try {
            if (!Calculator.checkType(a,b)) {
                throw  new TypeError("Argument should be number");
            }
            return a-b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    static composition(a,b){
        try {
            if (!Calculator.checkType(a,b)) {
                throw  new TypeError("Argument should be number");
            }
            return a*b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    static division(a,b){
        try {
            if (!Calculator.checkType(a,b)) {
                throw  new TypeError("Argument should be number");
            }
            return a/b;
        }
        catch (e) {
            alert(e.message);
        }
    }

    static exponentiation(a,b){
        try {
            if (!Calculator.checkType(a, b))
                throw  new TypeError("Argument should be number");
            return Math.pow(a, b);
        }
        catch (e) {
            alert(e.message);
        }
    }

    static outputResult(result,resultElem) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }
};
//#endregion

//#region Point_5
class SortMas  {

    constructor(arr, selectValue,errorElem,resultElem){
        this.selectValue = selectValue;
        this.arr = arr;
        this.errorElem = errorElem;
        this.resultElem = resultElem;
    }

    insertionSort(arr) {
        try {
            if (!Array.isArray(arr))
                throw  new TypeError("Argument should be array");
            for (let i = 0; i < arr.length; i++) {
                let v = arr[i], j = i - 1;
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

    selectionSort(arr) {
        try {
            if (!Array.isArray(arr))
                throw  new TypeError("Argument should be array");
            let temp;
            for (let i = 0; i < arr.length; i++) {
                let iMin = i;

                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[j] < arr[iMin])
                        iMin = j;
                }
                if (iMin != i) {
                    temp = arr[iMin];
                    arr[iMin] = arr[i];
                    arr[i] = temp;
                }
            }
            return arr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    bubbleSort(arr) {
        try {
            if (!Array.isArray(arr))
                throw  new TypeError("Argument should be array");
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        catch (e) {
            alert(e.message);
        }
    }

    quickSort(arr) {
        try {
            if (!Array.isArray(arr))
                throw  new TypeError("Argument should be array");
            if (arr.length <= 1) {
                return arr;
            }

            let pivot = arr[0], left = [], right = [];

            for (let i = 1; i < arr.length; i++) {
                arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
            }
            return this.quickSort(left).concat(pivot, this.quickSort(right));
        }
        catch (e) {
            alert(e.message);
        }
    }

    selectFunctionSort() {
        if(!ControlValue.checkValue(this.arr,this.errorElem,false)){
            return false;
        }

        let initialMas = this.arr.value.split(' ').map(x=>+x),sortMas;
        if(initialMas !=undefined) {
            if (this.selectValue == SELECTQUICKSORT) {
                sortMas = this.quickSort(initialMas);
            }
            if (this.selectValue == SELECTINSERTSORT) {
                sortMas =  this.insertionSort(initialMas);
            }
            if (this.selectValue == SELECTSELECTIONSORT) {
                sortMas = this.selectionSort(initialMas);
            }
            if (this.selectValue == BUBBLESORT) {
                sortMas = this.bubbleSort(initialMas);
            }
            this.outputSortMas(sortMas);
        }
    }

    outputSortMas(arr) {
        this.resultElem.value = "";
        for(let value of arr) {
            this.resultElem.value +=value + " ";
        }
    }
};

//#endregion

//#region Point_6

class BinaryOperations {

    constructor(num, selectValue,errorElem,resulElem){
        this.num = num;
        this.selectValue = selectValue;
        this.errorElem = errorElem;
        this.resulElem = resulElem;
    }

    convertToBin(num) {
        try {
            if(num == "undefined")
                throw TypeError("Incorrect date");
            let out = [], bit = 1;
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

    convertToDec(num) {
        try {
            if (num == "undefined")
                throw TypeError("Incorrect date");
            let out = 0, bit = 1;
            for (let value of num) {
                out += value == "1" ? bit : 0;
                bit <<= 1;
            }
            let masValue = [];
            masValue[0] = out;
            return masValue;
        }
        catch (e) {
            alert(e.message);
        }
    }

    selectOperation() {
        if(!ControlValue.checkValue(this.num,this.errorElem,false)){
            return false;
        }
        if(this.selectValue == SELECTCONVERTTOBIN){
            this.outputMas(this.convertToBin(this.num.value));
        }
        if(this.selectValue == SELECTCONVERTTODESC){
            this.outputMas(this.convertToDec(this.num.value));
        }
    }

    outputMas(arr) {
        this.resulElem.value = "";
        for(let value of arr)
            this.resulElem.value += value;
    }
}

//#endregion