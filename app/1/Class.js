
console.log('~~~~~ Class.js');

class Set {
    constructor(arr) {
        this.arr = arr
    }

    add(val) {
        if (!this.has(val)) {
            this.arr.push(val)
        }
    }

    delete(val) {
        this.arr = this.arr.filter( i =>
            i !== val
        )
    }

    has(val) {
        return this.arr.includes(val)
    }

    get size() {
        return this.arr.length
    }
}

const s = new Set([1,2,3,4,5])

s.add(1)
s.add(1)
console.log('should have 5 values:', s.size);
console.log('should contains 5:', s.has(5));

s.add(6)
console.log('should have 6 values:', s.size);

s.delete(6)
console.log('should have 5 values:', s.size);
console.log('shouldnt contains 6:', s.has(6));

//~~~ Subclass
class MySet extends Set {
    constructor(arr) {
        super(arr)
        this.orgArray = [...arr] //Clone the array
    }

    add(val) {
        super.add(val)
        console.log(`added ${val} to the set`);
    }

    toArray() {
        return Array.from(this)
    }

    reset() {
        // return new MySet(this.orgArray) //Needs to assign to new value
        this.arr = this.orgArray
    }
}

const z = new MySet([1,2,3,4,5])
z.add(6)
z.reset()
console.log('should have 5 values:', z.size);


