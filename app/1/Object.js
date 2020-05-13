
console.log("~~~~~ Object.js");

//~~~ In js no need to declare type
const z = "something"

const x = 42
console.log(typeof(x)); //number

const y = null
console.log(typeof(y)); //object

//42.toString() //Erros
//x.toString() //Works, wrapper around primitive value become object

//~~~ typecasting
const explicit = String(x) // "42"
const implicit = x+""; // "42"

//~~~ Array can contains different stuff, even function
const arr = [
    'string',
    42,
    function () { console.log("hi"); },
]
arr[2]() //execute function
arr.push('value') //add value to array
arr.forEach(element => {
   console.log(element);
});

//~~~ different way to create object
const o = new Object()
o.a = 'test'

const o2 = {}
o2['a'] = 'test'

const o3 = {
    a: "test",
    b: {
        c: "obj inside obj"
    }
}

//~~~ lexical
const aConst = 50 //const is equal to let in Swift
// aConst = 51 //Error
// aConst++ //Error

let aLet = 50 //let is equal to var in Swift
aLet = 51 //OK
aLet++ //OK
// let aLet = 52 //Error

console.log(aVar);// undefined, not assigned
var aVar = 50 //Var is Global reference to object
aVar = 51
var aVar = 'new' //OK

hoisted() //Can call before declared
function hoisted() {
    console.log("declared at the bottom");
}

//notHoisted() //Error
const notHoisted = function () {
    console.log('cant be hoisted');
}
notHoisted()

//~~~ This - self in swift
const person = {
    name: 'test',
    greet: function() { console.log('hello,', this.name); }
}
person.greet()

const friend = {
    name: 'friend',
}
friend.greet = person.greet
friend.greet()

const greet = person.greet
// greet() // Error undefined
const bound = person.greet.bind({ name: 'bound object'} )
person.greet.call({ name: 'bound object' })
person.greet.apply({ name: 'bound object' })
bound()
