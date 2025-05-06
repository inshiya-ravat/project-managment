export function generateID(){
    let id=-1;
    return function(){
        console.log("hi")
        id=id+1
        return id;
    }
}