const request = require("request");
const ch = require("cheerio");
function getAllMatches(data){
    parseData(data);
}

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
    allaTags = cheer('data-hover["Scorecard]').attr('href');
    console.log(allaTags.length);
    //let completelink = `https://www.espncricinfo.com/${link}`;
    //console.log(''+completelink);

}
module.exports = getAllMatches ;