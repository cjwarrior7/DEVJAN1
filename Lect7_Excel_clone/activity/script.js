var $ = require('jquery');

$(function(){
    let db;
    $('.col').on('click',function(){
        console.log("Cell Clicked");

    console.log(this);
     row  = Number($(this).attr("rowid"));
     col =  Number($(this).attr("colid"));
     let address = String.fromCharCode(col+65) +(row+1);
     $('#addr').val(address);
    })

    $('.col').on('blur',function(){
        row  = Number($(this).attr("rowid"));
        col =  Number($(this).attr("colid"));
        let cellObject=db[row][col];
        let value = $(this).text();

        if(value && value != cellObject.value){
            cellObject.value = value ;
            console.log(db);
        }
    })
    function initDB(){
        db = [];
        for (let i = 0; i < 100; i++) {
            let row = [];
            for (let j = 0; j < 26; j++) {
                let name = String.fromCharCode(j+65) +(i+1);
                let cellObject ={ name:name, value:""};
                row.push(cellObject); 
                
            }
            
            db.push(row);
        }
        console.log(db);
        console.log(db[5][2]);
    
    }
 initDB();
})
