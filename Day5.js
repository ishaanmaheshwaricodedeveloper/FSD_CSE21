async function test(){
    console.log("this is asyncronomous and we want to use fetch")
    const response = fetch("./student.json")
    console.log((await response).status)
    const student = await response.json();
    console.log("Data fetched")
}
test().then((res)=>{
    console.log(res)
}).catch(()=>{
    console.log(err)
})