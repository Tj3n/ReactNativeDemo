
console.log("~~~~~ ObjectMutation.js");

const o = {
	a: "a",
	b: "b",
	obj: {
		key: "key"
	},
}

const o2 = o //same reference
o.a = "c"
console.log(o2.a);

const o3 = Object.assign(
	{},
	o
)
o3.obj.key = 'new'
o.a = 'e'
console.log(o.a); //different reference
console.log(o.obj.key); //shallow copy

//deep copy
function deepCopy(obj) {
    //check if vals are objects
    const keys = Object.keys(obj)

    const newObject = {}
    keys.forEach(element => {
        const key = element
        if (typeof obj[key] === 'object') {
            newObject[key] = deepCopy(obj[key])
        } else {
            newObject[key] = obj[key]
        }       
    });

    return newObject
}
const o4 = deepCopy(o)
o.obj.key = 'new key 2'
console.log(o4.obj.key); //still old value = correct
