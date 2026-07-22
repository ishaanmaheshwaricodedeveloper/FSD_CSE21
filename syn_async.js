// Synchronus and Asynchronus Programming
// Synchronous programming is a programming paradigm where tasks are executed one after another, and each task must complete before the next one begins. In synchronous programming, the program flow is blocked until a task is finished, which can lead to delays if a task takes a long time to complete.
// Asynchronous programming, on the other hand, allows tasks to be executed independently of the main program flow. In asynchronous programming, tasks can be initiated and then continue executing in the background while the program continues to run. This allows for more efficient use of resources and can improve the responsiveness of applications, especially in scenarios where tasks involve I/O operations or network requests.

// Example of Synchronous Programming
console.log("Java Script")
function hello(){
    console.log("Hello, World!")
}

hello()
console.log("Synchronus Programming")

// Example of Asynchronous Programming
const hellow = () => {
    setTimeout(() => {
        console.log("Hello, World!")
    }, 2000);
}
hellow()
console.log("Asynchronus Programming")
// asyncronomous programming, we use callback, promises, async/await, and event loop to handle asynchronous operations in JavaScript. These techniques allow us to write non-blocking code that can handle multiple tasks concurrently, improving the performance and responsiveness of our applications.

function add(n1,n2, callback){
    console.log(n1+n2);
    callback();
}
let a  = 10
let b = 20
add(a,b,sayhi);

function sayhi(){
    console.log("hiii")
}

//create a function display which takes a callback function display(callback) and prints welcome to abes and another function which displays fsd21

function display(callback){
    console.log("Welcome to ABES");
    callback();
}

function displayfsd(){
    console.log("FSD21")
}

display(displayfsd);

