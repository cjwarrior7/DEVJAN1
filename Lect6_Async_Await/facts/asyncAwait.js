// async keyword => async keyword can be used with functions
// await keyword => await keyword can only be used inside async function
const fs = require("fs");
const axios = require("axios"); // axios ne http ke method ko acha way mai likh ke humko de dia hai
// after using async now the function will handle by node api/web api it will not run in stack

//IIFE

// IIFE => Immediately Invoked Function Expressions
(function sayHello(){
    console.log("Hello");
})();
async function sayHi(){
    try{
      let f1KaData = await fs.promises.readFile('./f1.txt');// await save us from writing then and catch
      let f2KaData = await fs.promises.readFile('./f2.txt');
      console.log(f1KaData+" "+','+f2KaData+" ");
      let apiGetData = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      console.log(apiGetData.data);
    }
    catch(error){
     console.log(error);
    }
};


async function sayHiThis(){
    try{
      let f1KaData =  fs.promises.readFile('./f1.txt');
      let f2KaData =  fs.promises.readFile('./f2.txt');
      donoFileKaData = await Promise.all([f1KaData , f2KaData ]);
      console.log(donoFileKaData+" ")
    }
    catch(error){
     console.log(error);
    }
};
sayHi();
sayHiThis();
