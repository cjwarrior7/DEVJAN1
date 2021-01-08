const puppeteer = require('puppeteer');
//refer pptr.dev
// launch browser
// all functions of puppeteer are promisified => pending promise
var email = 'fakowa6828@vss6.com';
var password = '123456789';
let tab;

const browserPromise = puppeteer.launch({headless : false ,
     args : ["--start-maximized"] ,
     defaultViewport : null 
});
browserPromise.then(function(browser){
console.log('browser opened');
let pagePromise = browser.newPage();
return pagePromise;
})
.then(function (page){
    tab = page ;
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise

}).then(function(){
    let idTypePromise = tab.type('#input-1',email);
    return idTypePromise ;
}).then(function(){
    let idPasswordPromise = tab.type('#input-2',password);
    return idPasswordPromise ;
}).then(function(){
    let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise ;
}).then(function(){
    console.log("Logged in");
})
