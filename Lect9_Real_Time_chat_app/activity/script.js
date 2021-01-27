let send = document.querySelector("#send");
let chatMessage = document.querySelector("#send-chat");
let chatlist = document.querySelector(".chat-list");
chatMessage.addEventListener("keyup",function(e){
console.log('Hi'+e.keyCode );
if(e.keyCode == 13){
        send.click();

   }

})

send.addEventListener("click",function(){

    if(chatMessage.value){
        let chatdiv = document.createElement('div');
        chatdiv.classList.add('chat');
        chatdiv.classList.add('right');
        chatdiv.innerHTML=chatMessage.value;
        chatlist.append(chatdiv);
        chatMessage.value = '';
        chatlist.scrollTop =  chatlist.scrollHeight ;
        console.log(chatlist.scrollTop)

   }

})