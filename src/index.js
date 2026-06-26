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

//алгоритм цього методу реалізував разом з ші (розібрався для себе)
function mySplice(start, deleteCount, ...items){
    let deleted = new MyArray();

    if (start < 0) {
        start += this.length;
        if (start < 0) start = 0;
    }
    if (start > this.length) start = this.length;
    if(arguments.length === 1) deleteCount = this.length - start;
    if(deleteCount < 0) deleteCount = 0;
    if(deleteCount + start > this.length) deleteCount = this.length - start;

    for(let i = start; i < start + deleteCount; i++){
        deleted.push(this[i]);
    }

    let temp = new MyArray();

    for (let i = 0; i < start; i++) {
        temp.push(this[i])
    }
    items.forEach((subElement) => temp.push(subElement));
    for (let i = start + deleteCount; i < this.length; i++) {
        temp.push(this[i]);
    }

    for (let i = 0; i < this.length; i++) {
        delete this[i];
    }
    this.length = 0;
    for (let i = 0; i < temp.length; i++) {
        this.push(temp[i]);
    }

    return deleted
}

function mySort(callback){
    function stringComparator(a, b){
        let strA = String(a);
        let strB = String(b);
        if (strA > strB) return 1;
        if (strA < strB) return -1;
        return 0;
    }
    if(!callback) callback = stringComparator;
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < this.length - 1 - i; j++){
            let a = this[j];
            let b = this[j + 1];
            if(callback.call(a, b) > 0) [this[j], this[j+1]] = [this[j+1], this[j]];
        }
    }

    return this
}

function myMap(callback, thisArg){
    let result = new MyArray();
    for (let i = 0; i < this.length; i++) {
        result.push(callback.call(thisArg, this[i], i, this));
    }
    return result;
}

function myFilter(callback, thisArg){
    let result = new MyArray();
    for (let i = 0; i < this.length; i++) {
        if(callback.call(thisArg, this[i], i, this)) result.push(this[i])
    }
    return result;
}

function myFlat(depth = 1){
    let result = new MyArray();
    this.forEach(element => {
        if(element instanceof MyArray && depth > 0){
            result = result.concat(element.flat(depth - 1))
        } else {
            result.push(element)
        }
    })
    return result
}

function myReduce(callback, initialValue){
    let acc;
    let startIndex = 0;
    if(arguments.length >= 2) {
        acc = initialValue;
    } else {
        if(this.length === 0) throw TypeError('Reduce of empty array with no initial value')
        acc = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
        acc = callback(acc, this[i], i, this)
    }

    return acc;
}

function myReduceRight(callback, initialValue){
    let acc;
    let startIndex = this.length - 1;
    if(arguments.length >= 2) {
        acc = initialValue;
    } else {
        if(this.length === 0) throw TypeError('Reduce of empty array with no initial value')
        acc = this[startIndex];
        startIndex--;
    }
    for (let i = startIndex; i >= 0; i--) {
        acc = callback(acc, this[i], i, this)
    }

    return acc;
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

//---Тестування (написано через ші)---
let inv = new MyArray("Медуза", "Кров каменю", "Слимак", "Кристал");
let ammo = new MyArray(120, 30, 5, 60);

console.log("=== ТЕСТ: push та pop ===");
console.log("push(Компас): повертає нову довжину ->", inv.push("Компас"));
console.log("Стан після push:", inv);
console.log("pop(): повертає видалене ->", inv.pop());
console.log("Стан після pop:", inv);

console.log("\n=== ТЕСТ: unshift та shift ===");
console.log("unshift(Сварог, Велес): повертає довжину ->", inv.unshift("Сварог", "Велес"));
console.log("shift(): повертає видалене ->", inv.shift());

console.log("\n=== ТЕСТ: map та filter ===");
console.log("map(довжина слів):", inv.map(item => item.length));
console.log("filter(більше 6 літер):", inv.filter(item => item.length > 6));

console.log("\n=== ТЕСТ: reduce та reduceRight ===");
console.log("reduce(сума набоїв, старт 0):", ammo.reduce((acc, val) => acc + val, 0)); // 215
console.log("reduceRight(склейка):", inv.reduceRight((acc, val) => acc + " -> " + val));

console.log("\n=== ТЕСТ: slice ===");
console.log("slice(1, 3):", inv.slice(1, 3));
console.log("slice(-2) (відлік з кінця):", inv.slice(-2));

console.log("\n=== ТЕСТ: concat ===");
let meds = new MyArray("Аптечка", "Бинт");
console.log("concat(масив meds, рядок 'Енергетик'):", inv.concat(meds, "Енергетик"));

console.log("\n=== ТЕСТ: flat ===");
let deepInv = new MyArray("АК-74", new MyArray("Глушник", new MyArray("Приціл")));
console.log("flat(1):", deepInv.flat(1));
console.log("flat(2):", deepInv.flat(2));

console.log("\n=== ТЕСТ: splice ===");
let mutants = new MyArray("Сліпий пес", "Кровосос", "Бюрер", "Контролер");
console.log("splice(1, 2, 'Химера'): видаляє і повертає ->", mutants.splice(1, 2, "Химера"));
console.log("Стан після splice:", mutants); // має бути ["Сліпий пес", "Химера", "Контролер"]

console.log("\n=== ТЕСТ: sort ===");
console.log("sort() без колбека (за алфавітом):", inv.sort());
console.log("sort(спадання чисел):", ammo.sort((a, b) => b - a));