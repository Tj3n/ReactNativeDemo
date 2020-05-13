
console.log("~~~~~ Function.js");

//Closure
function makeHello() {
    const msg = 'message'
    function say() {
        console.log(msg);
    }
    return say
}
makeHello() //Nothing, need to assign to variable and call
const sayHello = makeHello()
// console.log('typeof message: ', typeof msg); //undefined, coz not created yet
// console.log(sayHello.toString()); 
sayHello() //only created here, call this start execute the function say() inside makeHello()

function makeFunctions() {
    const arr = []
    for (let i = 0; i  < 5; i++) { //if use "var" all print will be 5, since var is global, it run through the forloop then only return the array
        arr.push( function() { console.log(i); })
    }
    return arr
}
const aClosure = makeFunctions()
aClosure[2]()

//Immediately Invoked Function Expression: immediate executed closure
const sayHelloz = (function () {
    const msg = 'helloz'
    function say() {
        console.log(msg);
    }
    return say
})()
sayHelloz()

//Return object which has function
const counter = function () {
    let count = 0
    return {
        inc: function() { count++ },
        get: function() { console.log(count); },
    }
}()

counter.get()
counter.inc()
counter.get()

//fixed if using var
function makeFunctionsWithIIFE() {
    const arr = []
    for (var i = 0; i  < 5; i++) {
        arr.push( function (x) { //immediately invoke function with current "i" so change global dont affect
            return function() { console.log(x); } 
        }(i) )
    }
    return arr
}
const bClosure = makeFunctionsWithIIFE()
bClosure[3]()

//High order function
const values = [1,2,3]
const mapped = values.map( function (num) { return num + 1 } ) //function that accept function as variable
console.log(mapped);

function isGreaterThan1(num) { return num > 1 }
const filtered = values.filter(isGreaterThan1)
console.log(filtered);

const reduced = values.reduce( (x,y) => { return x+y } ) //Almost similar to swift
console.log(reduced);

values.forEach(e => { console.log(e); })

//Create hof example
function mapz(arr, fn) {
    const newArr = []
    arr.forEach(element => {
        newArr.push( fn(element) )
    });
    return newArr
}
function addOne(num) { return num + 1 }
console.log(mapz(values, addOne));
