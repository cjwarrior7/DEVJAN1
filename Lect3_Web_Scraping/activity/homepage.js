const request = require("request");
const ch = require("cheerio");
//request is hof
//web async => callbacks
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb) 

function cb(error , response , data){ // request ne bta rakha ki mai cb ko yeh 3 parameter bhejunga
    console.log('response:'+response);
    if(error == null){
        parseData(data);
    }
    else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
     console.log("error");
    }
  
}

function parseData(data){
   // console.log('Data:'+data)
    let cheer = ch.load(data);
    link = cheer('.widget-items.cta-link a').attr('href');
    let completelink = `https://www.espncricinfo.com/${link}`;
    console.log(''+completelink);

}
getAllMatches(parseData)