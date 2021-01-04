function getFirstName(fullName){
 fullName = fullName.split(' ');
 return fullName[0];
 
}

function getLastName(fullName){
   fullName = fullName.split(' ');
   return fullName[1];
}
function fun(fullName,fn){
    let name = fn(fullName);
    console.log(name);
    return 20;

}
fun("MS DHONI",getFirstName);
fun("RISABH PANT",getLastName)