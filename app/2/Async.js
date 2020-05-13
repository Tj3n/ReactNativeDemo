console.log('~~~~~ Async.js');

// console.log(Date.now());
// setTimeout(() => {
//     console.log(Date.now()); //Print after 1s async
// }, 1000);

function printThis(val) {
  console.log(val);
}

setTimeout(() => {
  printThis(1);
}, 1000);
setTimeout(() => {
  printThis(2);
}, 0);
printThis(3); //execute first because it got pushed into the stack before the previous line

function asyncWithCallback(callbackFn) {
  setTimeout(() => {
    callbackFn(4);
  }, 2000);
}
asyncWithCallback(console.log);

//Promises, should be used instead of callback
const url = 'http://dummy.restapiexample.com/api/v1/employee/1'; //change to 500 for error

function callApi(onSuccess, onError) {  
  fetch(url)
    .then(res => res.json())
    .then(json => {
        if (json["status"] === "success") {
            onSuccess(json["data"])
        } else {
            throw Error(json["data"])
        }
    })
    .catch(error => onError(error));
}

callApi(json => {
    console.log(json);
}, error => {
    console.log(error);  
})

// Asyncawait with trycatch
async function callApiAsyncAwait(onSuccess, onError) {
    try {
        const res = await fetch(url) //Need await for each async function
        const json = await res.json()
        
        if (json["status"] === "success") {
            onSuccess(json["data"])
        } else {
            throw Error(json["data"])
        }
    } catch (error) {
        onError(error)
    }
}

callApiAsyncAwait(json => {
    console.log(json);
}, error => {
    console.warn(error);
})