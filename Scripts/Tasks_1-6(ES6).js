
"use strict";

//#region Point_1
class SearchElemMas {

    constructor(arr){
        this.arrElem = arr;
    }


    static getMaxSubSumOn(arr) {
        let outArr= [];
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

    static getMaxSubSumSquareOn_2(arr) {
        let outArr= [];
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
        return outArr
    }

    static searchMaxMinMediumElemMas (arr) {
        let masMinMaxMediumElemMas = [], minEl,maxEl,mediumEl;
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



    static searchAscendingSequenceMas(arr) {
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
        for (let i = index, j=0; i <= index + maxValue; i++,j++) {
            outputMas[j] = arr[i];
        }
        return outputMas;
    }

    selectFunctionSearch(selectValue) {
        if(!this.arrElem.value.match(/[0-9\s]+/)) {
            this.arrElem.value = "Incorrect Data";
            return false;
        }
        let masFromArr = this.arrElem.value.split(' ').map(x => +x);
        let outputMas = [];
        if (selectValue == "sumOfElemMasIsMax_O(n)") {
            outputMas = SearchElemMas.getMaxSubSumOn(masFromArr, "Sum");
            this.outputMas(outputMas, "Sum");
        }
        if (selectValue == "sumOfElemMasIsMax_O(n^2)") {
            outputMas = SearchElemMas.getMaxSubSumSquareOn_2(masFromArr);
            this.outputMas(outputMas, "Sum");
        }
        if (selectValue == "searchMaxMinMediumElemMas") {
            outputMas = SearchElemMas.searchMaxMinMediumElemMas(masFromArr);
            this.outputMas(outputMas, "Min, max, medium");
        }
        if (selectValue == "ascendingSequenceMas") {
            outputMas = SearchElemMas.searchAscendingSequenceMas(masFromArr);
            this.outputMas(outputMas, "Ascending Sequence");
        }
    }

    outputMas(arr, str) {
        this.arrElem.value = str+ ": ";
        for(let value of arr){
            this.arrElem.value +=value + " ";
        }
    }
};
//#endregion

//#region Point_2
class DateFormatter {

    constructor(initialDateElem,selectValue){
        this.initialDateElem = initialDateElem;
        this.selectValue = selectValue; //временно
        // this.formatDate =formatDate; //для того чтобы потом пофиксить магические строки
    }

    selectParseTemplate() {
        if (this.selectValue == "simpleStr") {
            this.outputDate(this.parseFunctionReturnStr("DDMMYYYY", "YY-MM-DD"));
        }
        if (this.selectValue == "simpleStrMonthToStr") {
            this.outputDate(this.parseFunctionReturnStr("DDMMYYYY", "YYYYMMDD"));
        }
        if (this.selectValue == "simpleStrToDateObject") {
            this.outputDate(this.parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD"));
        }
        if (this.selectValue == "simpleStrToDateObjectHyphenated") {
            this.outputDate(this.parseFunctionReturnStr("YYYYMMDD", "YYYYMMDD", "MM-DD-YYYY"));
        }
        if (this.selectValue == "fromNow") {
            this.outputDate(this.parseFunctionReturnStr("YYYY-MM-DD", "YYYY-MM-DD"));
        }
        if (this.selectValue == "MStoDate") {
            this.outputDate(this.parseFunctionReturnStr("MS"));
        }
        if (this.selectValue == "DateToMS") {
            this.outputDate(this.parseFunctionReturnStr("DateToMS"));
        }
    }

    parseFunctionReturnStr(inputStr, regExp, regExp_2) {
        let date, masValueForBuildDate = [];
        const locale = "en-us";
        if (inputStr == "DDMMYYYY" && regExp == "YY-MM-DD" && typeof regExp_2 == "undefined") {
            return this.initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1-$2-$3');
        }
        if (inputStr == "DDMMYYYY" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[2], masValueForBuildDate[1] - 1, masValueForBuildDate[0]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == "YYYYMMDD" && regExp == "YYYYMMDD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]);
            return date.getDate() + " " + date.toLocaleString(locale, {month: "long"}) + " " + date.getFullYear();
        }
        if (inputStr == "YYYYMMDD" && regExp == "YYYYMMDD" && regExp_2 == "MM-DD-YYYY") {
            return this.initialDateElem.value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1');
        }
        if (inputStr == "YYYY-MM-DD" && regExp == "YYYY-MM-DD" && typeof regExp_2 == "undefined") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            let initialDate = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            let diff = Math.floor(Date.now() - initialDate);
            return Math.floor(diff / (1000 * 60 * 60 * 24) / 31 / 12) + " years ago";
        }
        if (inputStr == "MS") {
            date = new Date(+this.initialDateElem.value);
            return date;
        }
        if (inputStr == "DateToMS") {
            masValueForBuildDate = this.initialDateElem.value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1,$2,$3').split(',').map(x => +x);
            date = new Date(masValueForBuildDate[0], masValueForBuildDate[1] - 1, masValueForBuildDate[2]).getTime();
            return date;
        }
    }

    outputDate(date) {
        this.initialDateElem.value ="";
        this.initialDateElem.value = date;
    }
};

//#endregion

//#region Point_3

class TextFormatter{

    constructor(maxRows,maxColumns,text,selectValue){
        this.maxRows = maxRows;
        this.maxColumns = maxColumns;
        this.text = text;
        this.selectValue = selectValue;
    }

    changeTextFormatter () {
        if(!this.maxRows.value.match(/^\d+$/)) {
            this.maxRows.value = "Incorrect data";
            if(!this.maxColumns.value.match(/^\d+$/)) {
                this.maxColumns.value = "Incorrect data";
            }
            return false;
        }
        if(!this.maxColumns.value.match(/^\d+$/)) {
            this.maxColumns.value = "Incorrect data";
            return false
        }
        if(this.selectValue =="charWrap"){
            this.text.value = this.outputText(this.text.value.match(/(\w{1})/g).join('\n'));
        }
        if(this.selectValue =="wordWrap"){
            this.text.value = this.outputText(this.text.value.replace(/\s/g, "\n"))
        }
        if(this.selectValue == "sentenceWrap"){
            this.text.value = this.outputText(this.text.value.match(/(\w+.)/g).join('\n'));
        }
        if(this.selectValue == "withoutWrap"){
            this.text.setAttribute('wrap','off');
        }
        let str;
        if(this.maxRows.value !=undefined && this.maxRows.value!=""){
            str = this.text.value.split('\n');
            let outputMas = [];
            if(str.length-(+this.maxRows.value)>0) {
                for (let i = 0; i < (+this.maxRows.value); i++) {
                    outputMas[i] =str[i];
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
        this.text.value ="";
        this.text.value = str;
        return str;
    }

};
//#endregion

//#region Point_4
class Calculator  {

    static selectOperation(a,b,selectValue,resultElem) {
        if(!a.match(/^\d+$/)){
            a = "Incorrect data";
            if(!b.match(/^\d+$/)) {
                b = "Incorrect data";
            }
            return false;
        }
        if(!b.match(/^\d+$/)){
            b = "Incorrect data";
            return false;
        }
        a=+a;
        b=+b;
        if(selectValue == "plus")
            Calculator.outputResult(Calculator.add(a, b),resultElem);
        if(selectValue =="minus")
            Calculator.outputResult(Calculator.minus(a, b),resultElem)
        if(selectValue =="composition")
            Calculator.outputResult(Calculator.composition(a, b),resultElem);
        if(selectValue =="division")
            Calculator.outputResult(Calculator.division(a, b),resultElem);
        if(selectValue =="exponentiation")
            Calculator.outputResult(Calculator.exponentiation(a, b),resultElem);
    }

    static add (a,b) {
        return a+b;
    }

    static minus (a,b){
        return a-b;
    }

    static composition(a,b){
        return a*b;
    }

    static division(a,b){
        return a/b;
    }

    static exponentiation(a,b){
        return Math.pow(a,b);
    }

    static outputResult(result,resultElem ) {
        resultElem.value = "";
        resultElem.value = Math.round(result*10000)/10000;
    }
};
//#endregion

//#region Point_5
class SortMas  {

    constructor(arr, selectValue){
        this.selectValue = selectValue;
        this.arr = arr;
    }

    insertionSort(arr) {
        for (let i = 0; i <arr.length; i++)
        {
            let v = arr[ i ], j = i-1;
            while (j >= 0 && arr[j] > v)
            {
                arr[j+1] = arr[j]; j--;
            }
            arr[j+1] = v;
        }
        return arr;
    }

    selectionSort(arr) {
        let temp;
        for(let i=0;i<arr.length;i++)
        {
            let iMin = i;

            for(let j = i+1;j<arr.length;j++)
            {
                if(arr[j]<arr[iMin])
                    iMin = j;
            }
            if(iMin != i)
            {
                temp = arr[iMin];
                arr[iMin] = arr[i];
                arr[i] = temp;
            }
        }
        return arr;
    }

    bubbleSort(arr) {
        for(let i =0;i<arr.length;i++){
            for(let j = i+1;j<arr.length;j++){
                if(arr[i] > arr[j]){
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        let pivot = arr[0], left = [], right = [];

        for (let i = 1; i < arr.length; i++) {
            arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
        }
        return this.quickSort(left).concat(pivot, this.quickSort(right));
    }

    selectFunctionSort() {

        if(!this.arr.value.match(/[0-9\s]+/)) {
            this.arr = "Incorrect Data";
            return false;
        }
        let initialMas = this.arr.value.split(' ').map(x=>+x),sortMas;
        if(initialMas !=undefined) {
            if (this.selectValue == "quickSort") {
                sortMas = this.quickSort(initialMas);
            }
            if (this.selectValue == "insertSort") {
                sortMas =  this.insertionSort(initialMas);
            }
            if (this.selectValue == "selectionSort") {
                sortMas = this.selectionSort(initialMas);
            }
            if (this.selectValue == "bubbleSort") {
                sortMas = this.bubbleSort(initialMas);
            }
            this.outputSortMas(sortMas);
        }
    }

    outputSortMas(arr) {
        this.arr.value = "";
        for(let value of arr) {
            this.arr.value +=value + " ";
        }
    }
};

//#endregion

//#region Point_6

class BinaryOperations {

    constructor(num, selectValue){
        this.num = num;
        this.selectValue = selectValue;
    }

    convertToBin(num) {
        let out = [], bit = 1;
        while (num >= bit) {
            if(num>0)
                out.push(num & bit ? 1 : 0);
            else
                out.push(~(num & bit ? 1 : 0));
            bit <<= 1;
        }
        return out;
    }

    convertToDec(num) {
        let out =0,  bit = 1;
        for(let value of num){
            out+=value == "1" ? bit :0;
            bit<<=1;
        }
        let masValue = [];
        masValue[0] = out;
        return masValue;
    }

    selectOperation() {
        if(!this.num.value.match(/^\d+$/)){
            this.num.value = "Incorrect data";
            return false;
        }
        if(this.selectValue =="convertToBin"){
            this.outputMas(this.convertToBin(this.num.value));
        }
        if(this.selectValue == "convertToDesc"){
            this.outputMas(this.convertToDec(this.num.value));
        }
    }

    outputMas(arr) {
        this.num.value = "";
        for(let value of arr)
            this.num.value += value;
    }
}

//#endregion