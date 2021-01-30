demoImages = document.querySelectorAll("img");
console.log("path:"+'tutu');
localImages = ["./images/elon1.jpg","./images/elon2.jpg","images/elon3.jpg" ,"images/elon4.jpg"];
 
for (let i = 0; i < demoImages.length; i++) {
     let idx = Math.floor(Math.random()*localImages.length);
     let absolutePath = chrome.extension.getURL(localImages[idx]);
     console.log("path:"+absolutePath);
     demoImages[i].src = absolutePath; 
}