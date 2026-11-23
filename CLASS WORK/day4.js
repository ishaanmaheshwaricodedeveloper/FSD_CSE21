// // create one promises that will display  username and password
// // using resolve and  if data will be rejected its display error message

// const promise = new Promise((resolve, reject) => {
//     console.log("Promise started");

//     let success = true;

//     if (success) {
//         resolve({
//             username: "Harshit",
//             password: "abc123"
//         });
//     } else {
//         reject("Error: Unable to fetch user data");
//     }
// });

// // resolve("Hello World")
// //           │
// //           ▼
// // result = "Hello World"
// //           │
// //           ▼
// // console.log(result)

// promise
//     .then((result) => {
//         console.log("Username:", result.username);
//         console.log("Password:", result.password);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let err = false;

//         if (!err) {
//             resolve("user: CSE21, password: 123");
//         } else {
//             reject("ERROR... Data fetch failed");
//         }
//     }, 2000);  
// })
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// });



// async await
console.log("this is async and await")
async function test(){
console.log(1)
await console.log(2)
// await setTimeout(()=>{
// console.log(3)
// }, 2000)
console.log(3)
console.log(4)
}
test().then().catch()

