
const fs = require("fs");

// facts =>
// promisified function se we always get a pending promise !
// then is called immediately on pending Promise and callback which is passed inside then is known as
// success callback
// catch is called immediately on pending promise and callback passed inside catch is known as
// failure callback
// initially state of promise is <pending>
// then and catch can only be called on pending promise

// then also gives a pending promise called generally as then ka promise

let pendingPromise = fs.promises.readFile('./f1.txt');
console.log(pendingPromise);
// then se success callback attach hoga
pendingPromise.then(function(data){

    console.log('first'+data+"");
    let pendingPromise1 = fs.promises.readFile('./f2.txt');
    return pendingPromise1 ;

}).then(function(data){
    console.log("second"+data+"");
})
// catch se failure callback attach hoga
pendingPromise.catch(function(error){
    console.log('error'+error);

})