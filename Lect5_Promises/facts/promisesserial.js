const fs = require("fs");

let pendingPromise1 = fs.promises.readFile('./f1.txt');


pendingPromise1.then(function(data){
    console.log(data+"");
    let pendingPromise2 = fs.promises.readFile('./f2.txt');
    pendingPromise2.then(function(data){
          console.log(data+"");
        let pendingPromise3 = fs.promises.readFile('./f3.txt');
        pendingPromise3.then(function(data){
           console.log(data+"");
        })
        pendingPromise3.catch(function(error){
   

        })
    })
    pendingPromise2.catch(function(error){
   

    })

})

pendingPromise1.catch(function(error){
   

})
