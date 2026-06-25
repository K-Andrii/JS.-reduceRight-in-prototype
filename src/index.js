"use strict";

function MyArray(...args) {
    this.length = args.length;

    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
}

//--- Реалізація методів---
function myForEach(callback, thisArg){
    for(let i = 0; i < this.length; i++){
        callback.call(thisArg ,this[i], i, this)
    }
}

function myPush(...args){
    for(let i = 0; i < args.length; i++){
        this[this.length] = args[i];
        this.length++
    }
    return this.length
}

function myPop(){
    if(this.length === 0) return undefined;
    let deletedElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return deletedElement;
}

function myShift(){
    let deletedElement = this[0];
    for(let i = 0; i < this.length - 1; i++){
        this[i] = this[i+1];
    }
    delete this[this.length - 1];
    this.length--;
    return deletedElement;
}

function myUnshift(...args) {
    for(let i = this.length - 1; i >= 0; i--){
        this[i + args.length] = this[i]
    }
    for(let i = 0; i < args.length; i++){
        this[i] = args[i];
    }
    return this.length += args.length;
}

function myConcat(...args) {
    let result = new MyArray(...this);
    args.forEach((element) => {
        if(Array.isArray(element)){
            result.push(element)
        } else {
            element.forEach((subElement) => {
                result.push(subElement)
            })
        }
    })
    return result;
}

function mySlice(begin = 0, end = this.length){
    let result = new MyArray();
    if(begin < 0 ) begin += this.length
    if(end < 0 ) end += this.length
    if(begin < 0) begin = 0;
    if(end < 0) end = 0;
    if(end > this.length) end = this.length
    for(let i = begin; i < end; i++){
        result.push(this[i])
    }
    return result;
}

function mySplice(){

}

function myFlat(){

}

function mySort(){

}

function myMap(){

}

function myFilter(){

}

function myReduce(){

}

function myReduceRight() {

}

//---Додавання в прототип---
MyArray.prototype.reduceRight = myReduceRight;
MyArray.prototype.forEach = myForEach;
MyArray.prototype.pop = myPop;
MyArray.prototype.push = myPush;
MyArray.prototype.shift = myShift;
MyArray.prototype.unshift = myUnshift;
MyArray.prototype.concat = myConcat;
MyArray.prototype.flat = myFlat;
MyArray.prototype.slice = mySlice;
MyArray.prototype.splice = mySplice;
MyArray.prototype.sort = mySort;
MyArray.prototype.map = myMap;
MyArray.prototype.filter = myFilter;
MyArray.prototype.reduce = myReduce;
MyArray.prototype.reduceRight = myReduceRight;

//---Тестування---
