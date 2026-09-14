// create one promise that will display user name and password
// using resolve and if data will be rejected display its error using reject

new Promise((resolve, reject) => {
    setTimeout(() => {
        let err = true;

        if(!err){
            resolve("user:CSE21, password:12345");
        } else {
            reject("Error: User not found");
        }
    }, 2000);
})

.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});