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
   addModerators(browser,page); 
   
}
catch(error){
console.log(error);
}
})();
async function addModerators(browser,page){
//data-tab = "moderators"
await page.waitForSelector('.backbone.block-center',{visible:true});
addLinks = await page.$$('.backbone.block-center');
console.log(addLinks);
addModeratorLinks = [];
for (let i = 0; i < addLinks.length; i++) {
    let addModeratorLink = await page.evaluate(function(element){ 
        return element.getAttribute("href");
    
    }, addLinks[i]);
    //const element = array[index];
    addModeratorLinks.push(`https://www.hackerrank.com${addModeratorLink}`);
    
}
console.log(addModeratorLinks);
let moderatorAllPromises = [];
 for (let i = 0; i < addModeratorLinks.length; i++) {
       let newTab = await browser.newPage();
       console.log('inside loop'+addModeratorLinks[i])
       let moderator = addModeratorsToSingleQuestion(addModeratorLinks[i],newTab);
       moderatorAllPromises.push(moderator);
}
 await Promise.all(moderatorAllPromises);
 console.log('moderator to all question on one page added');

}


async function addModeratorsToSingleQuestion(addModeratorLink,newTab){
    await newTab.goto(addModeratorLink);
    await handleConfirmButton(newTab);
    await newTab.waitForSelector('li[data-tab="moderators"]' , {visible:true});
    await newTab.click('li[data-tab="moderators"]');
    console.log('click moderator');
    await newTab.waitFor(5000);
    await newTab.waitForSelector('#moderator', {visible:true});
    await newTab.type('#moderator',"CJ");
    console.log('type ho gya');
    await newTab.waitFor(5000);
    await newTab.waitForSelector('.btn.moderator-save',{visible:true});
    await newTab.click('.btn.moderator-save');
    await newTab.waitForSelector('.save-challenge.btn.btn-green',{visible:true});
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();


    }


    async function handleConfirmButton(newTab){
  try{
    await newTab.waitForSelector('confirm-modal',{visible:true,timeout:5000});
    await newTab.click('#confirmBtn');
    console.log('confirm modal clicked');
    
  }
  catch(error){
    console.log('confirm modal not clicked');
    return ;
  }
}

