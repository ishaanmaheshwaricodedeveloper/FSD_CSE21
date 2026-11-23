// function in js
// syntax: 
// function fname(){
// }
// fname();

function add (num1, num2){
    console.log(num1 + num2); //return
}
add(2,3)

// arrow function : variable in js: container to store data

const add2 = ()=>{
    console.log("arrow function")
}
add2();

const addv = (num1, num2)=>{
    return num1 + num2;
}
console.log(addv(5,6))

// arguments are array like objects

function addNum(){
    console.log(arguments)
}
addNum(10,20,30,10)
// what's the difference between js in server and terminal
