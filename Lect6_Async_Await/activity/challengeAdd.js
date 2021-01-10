const puppeteer = require('puppeteer');
const challenges = require('./challenge');
var email = 'fakowa6828@vss6.com';
var password = '123456789';
let tab;
(async function openBowser(){
    try{
   let browser = await puppeteer.launch({headless : false ,
        args : ["--start-maximized"] ,
        defaultViewport : null 
   });
   let page = await browser.newPage();
   let pageResponse = await page.goto('https://www.hackerrank.com/auth/login');
   await page.type('#input-1',email)
   await page.type('#input-2',password)
   await page.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
   await Promise.all([ page.waitForNavigation({waitUntil: 'networkidle2'}),page.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled')]);
   //let data1 =await page.click('dropdown.dropdown.dropdown-auth.profile-menu.cursor.theme-m-content.open');
   let data = await page.click('div[data-analytics="NavBarProfileDropDown"]');
   //console.log('executed:'+data);
      // load => when client gets the data
     // domcontentloaded => when data in loaded on the dom on the client side
    // networkidle0 => first 500ms jaha pe client se at max 0 request
   // networkidle2 => first 500ms jaha pe apke client se at max 2 request 
   await Promise.all([ page.waitForNavigation({waitUntil: 'networkidle2'}),page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
   let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
   //await page.click('.active .backbone');
   let myChallengesLi = bothLis[1];
   await Promise.all([ page.waitForNavigation({waitUntil:"networkidle2"}) , myChallengesLi.click()]); // navigation
    let addChallengeButton = await page.waitForSelector('.btn.btn-green.backbone.pull-right'); 
    console.log('cb'+addChallengeButton);
    let addChallengeLink = await page.evaluate(function(element){ 
       return element.getAttribute("href");

   }, addChallengeButton);
   completedLink = `https://www.hackerrank.com${addChallengeLink}`;
   console.log(''+completedLink);
   for (let i = 0; i < challenges.length; i++) {
       let newTab = await browser.newPage();
       addchallenge(completedLink,newTab,challenges[i]);
       
   }


}
catch(error){
console.log(error);

}


})()
async function addchallenge(link,newTab,challenge){
    // "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    // "Description": "Question 1",
    // "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    // "Input Format": "Integer",
    // "Constraints": "n <= 10 ^ 9",
    // "Output Format": "String",
    // "Tags": "Basics"
   
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemstatement = challenge["Problem Statement"];
    let inputformat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputformat = challenge["Output Format"];
    let tags = challenge["Tags"];

     await newTab.goto(link);
     await newTab.waitForSelector('#name');
     await newTab.type('#name',challengeName );
     await newTab.type('#preview',description);
     await newTab.waitForSelector('#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea');
     await newTab.type('#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea',problemstatement);
     await newTab.type('#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea',inputformat);
     await newTab.type(' #constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea',constraints);
     await newTab.type('#output_format-container  .CodeMirror.cm-s-default.CodeMirror-wrap textarea',outputformat);
     await newTab.type('#tags_tag ',tags);
     await newTab.keyboard.press('Enter');
     await newTab.click('.save-challenge.btn.btn-green');
     await newTab.close();
     console.log("All challenges submitted");


     //newTab.type(,problemstatement)


}