const fs = require("fs");
//Js is a Sync language but we can make it async with the help callbacks, promises ,async await,setTimeout

//B                    //A //promisified way to read a file
let pendingPromise1 = fs.promises.readFile('./f1.txt');

let pendingPromise2 = fs.promises.readFile('./f2.txt');
let pendingPromise3 = fs.promises.readFile('./f3.txt');


// then se success callback attach hoga
pendingPromise1.then(function(data){
  
    console.log('data'+data);

})
// catch se failure callback attach hoga
pendingPromise1.catch(function(error){
    console.log('error'+error);

})
pendingPromise2.then(function(data){

    console.log('data'+data);

})
// catch se failure callback attach hoga
pendingPromise2.catch(function(error){
    console.log('error'+error);

})
pendingPromise3.then(function(data){

    console.log('data'+data);

})
// catch se failure callback attach hoga
pendingPromise3.catch(function(error){
    console.log('error'+error);

})
console.log("hello");
