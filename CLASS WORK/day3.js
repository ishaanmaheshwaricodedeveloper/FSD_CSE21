 const promise = new Promise((resolve, reeject)=>{
    console.log("promise done")
    resolve("ops successful")
    let success = true;
 })
 promise.then((result)=>{
    console.log(result)
 
 }).catch((error)=>{
    console.log(error)
 }) //resolve : reject