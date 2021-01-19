var $ = require('jquery');

$(function(){
    let db;
    let lsc;
    $('.col').on('click',function(){
        console.log("Cell Clicked");
     
    console.log(this);
     row  = Number($(this).attr("rowid"));
     col =  Number($(this).attr("colid"));
     let address = String.fromCharCode(col+65) +(row+1);
     $('#addr').val(address);
    })

    $('.col').on('blur',function(){
        lsc = this;
        row  = Number($(this).attr("rowid"));
        col =  Number($(this).attr("colid"));
        let cellObject=db[row][col];
        let value = $(this).text();

        if(value && value != cellObject.value){
            cellObject.value = value ;
            console.log(db);
            updatechildrens(cellObject);
        }
    })

    function updatechildrens(cellObject){
        let childrens = cellObject.childrens ;
        for (let index = 0; index < childrens .length; index++) {
            //const element = childrens[index];
           let {rowId ,colId} = getRowIdColIDFromAddress(childrens[index]);
            let childrenCellObject= db[rowId][colId];
              //{name:"B1" , value:"30" , formula:"( A1 + A2 )" , childrens:[]};
            let newValue = solve(childrenCellObject.formula);
            childrenCellObject.value = newValue //db update
            //ui update
            $(`div[rowid=${rowId}][colid=${colId}]`).text(newValue);
            // if childrenCellObject have atleast 1 children
            if(childrenCellObject.childrens.length){
                updatechildrens(childrenCellObject)
            }
            
        }
    }



    $('#formula').on('blur', function(){
      console.log("inside formula");
      let formula = $(this).val();
      row  = Number($(lsc).attr("rowid"));
      col =  Number($(lsc).attr("colid"));
      let cellObject=db[row][col];

      if(formula && cellObject.formula != formula){
        cellObject.formula  = formula;
       let value = solve(formula,cellObject);
       cellObject.value = value //dbupdate
       $(lsc).text(value); //ui update
      }
    })
    function solve (formula,cellObject){
        console.log("inside solve");
        console.log(formula);
        let fcomps = formula.split(" ");
        console.log(fcomps);
        
        for (let i = 0; i < fcomps.length; i++) {
            if(fcomps[i][0] >= 'A' && fcomps[i][0] <= 'Z'){
             let {rowId,colId} = getRowIdColIDFromAddress(fcomps[i]);
             console.log(""+rowId.rowId+','+colId.colId);
             let cellObjectOfComp = db[rowId][colId];
             console.log(cellObjectOfComp.value)
             if(cellObject){
                cellObjectOfComp.childrens.push(cellObject.name);
                cellObject.parents.push(fcomps[i]);
             }
              formula = formula.replace(fcomps[i],cellObjectOfComp.value);
            }
            
            
        }
        console.log(formula);
        let value = eval(formula);
        return value;

    }

function getRowIdColIDFromAddress(address){
    console.log("getRowIdColIdFromAdrdress"+address);
    let rowId = Number(address.substring(1))-1;
    let colId = address.charCodeAt(0) - 65;
    console.log(colId +","+rowId);
    return {
        rowId,
        colId,
    };
}



    function initDB(){
        db = [];
        for (let i = 0; i < 100; i++) {
            let row = [];
            for (let j = 0; j < 26; j++) {
                let name = String.fromCharCode(j+65) +(i+1);
                let cellObject ={ name:name, value:"" ,
                formula: "",
                childrens: [],
                parents: []
            };
                row.push(cellObject); 
                
            }
            
            db.push(row);
        }
        console.log(db);
        console.log(db[5][2]);
    
    }
 initDB();
})
