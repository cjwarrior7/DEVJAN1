// file System module present in node
const fileSys = require("fs");
// get files of Directory
let folderPath = './testFolder';
console.log('files:' +folderPath);
let files = fileSys.readdirSync(folderPath);
console.log('files:' +files);

files.forEach(element => {
    sortFolder(element)
});

function sortFolder(file){
    let extensions = getExtensionName(file);
    console.log('verfyExtension:'+extensions);
    let folderPathExist = getExtensionFolderPath(extensions)
    console.log('folderExist:'+folderPathExist);
     // // falsy values => null , undefined , 0 , "" , false
    if(folderPathExist){
        moveFile(file,extensions)
    }
    else{
        createExtensionFolder(extensions);
        moveFile(file,extensions)

    }
}
function getExtensionName(file){
   return file.split('.')[1] ;
}

function getExtensionFolderPath(ext){
   if(ext =='docx' || ext =='csv' || ext =='pdf'){
    let  extFolderPath =`${folderPath}/Documents`;
    return fileSys.existsSync(extFolderPath);
   }
   else if(ext == 'jpg'|| ext == 'png' || ext =='jpeg'){
    let  extFolderPath =`${folderPath}/Images`;
    return fileSys.existsSync(extFolderPath);
    
   }
} 

function moveFile(file,ext){
    if(ext == 'docx' || ext == 'pdf' || ext=='csv'){
        // documents folder
        //"./testFolder/Documents"
        let sourceFile = `${folderPath}/${file}`;
        let destinationFile = `${folderPath}/Documents/${file}`; // file is not move from src to destination it is copying its contents.
        fileSys.copyFileSync(sourceFile , destinationFile);
        fileSys.unlinkSync(sourceFile); // delte source file
    }
    else if(ext =='jpg' || ext=='png' || ext == 'jpeg'){
        // images folder
        let sourceFile = `${folderPath}/${file}`;
        let destinationFile = `${folderPath}/Images/${file}`;
        fileSys.copyFileSync(sourceFile , destinationFile);
        fileSys.unlinkSync(sourceFile);
    }
    

}
function createExtensionFolder(ext){
    if(ext =='docx' || ext =='csv' || ext =='pdf'){
        let extFolderPath = `${folderPath}/Documents`;
        fileSys.mkdirSync(extFolderPath);
       
       }
       else if(ext == 'jpg'|| ext == 'png' || ext =='jpeg'){
        let extFolderPath = `${folderPath}/Images`;
        fileSys.mkdirSync(extFolderPath);
      
        
       } 
    }


