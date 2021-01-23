let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");
// ctx.fillStyle = "yellow";
// ctx.fillRect(100, 20, 150, 100);
// console.log(ctx);
// object destructuring
let {top:canvastop} = canvas.getBoundingClientRect();
 canvas.height = window.innerHeight - canvastop ;
 canvas.width = window.innerWidth ;
let isMousedown = false;
window.addEventListener("resize",function(e){
     canvas.height = window.innerHeight - canvastop ;
     canvas.width = window.innerWidth ;  
})
// tell canvas we want to start a new line
// ctx.beginPath();

// starting point of line
// ctx.lineTo(10,10);
// // points after the starting point
// ctx.lineTo(200 , 10);
// ctx.stroke();

// ctx.beginPath();

// ctx.lineTo(200 , 100);
// ctx.lineTo(10  , 200);
// // actually draw a line between points
// ctx.stroke();
// let isMousedown = false
canvas.addEventListener("mousedown",function(e){
    console.log(e);
    isMousedown = true;
    let x = e.clientX ;
    let y = e.clientY - canvastop;
    console.log(x,y);
    ctx.beginPath();
    ctx.moveTo(x,y)   // move to position

})
canvas.addEventListener("mousemove",function(e){
    if(isMousedown){
     let x = e.clientX ;
     let y = e.clientY - canvastop;
     console.log(x,y);
     ctx.lineTo(x,y)
     ctx.stroke();
    }

})
window.addEventListener("mouseup",function(e){
    let isMousedown = false;

})


