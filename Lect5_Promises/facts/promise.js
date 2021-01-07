const fs = require("fs");
//Js is a Sync language but we can make it async with the help callbacks, promises ,async await,setTimeout

//B                    //A //promisified way to read a file
let pendingPromise = fs.promises.readFile('./f1.txt');
console.log(pendingPromise);
// then se success callback attach hoga
pendingPromise.then(function(data){
    console.log('inside'+pendingPromise);
    console.log('data'+data);

})
// catch se failure callback attach hoga
pendingPromise.catch(function(error){
    console.log('error'+error);

})
console.log("hello");

