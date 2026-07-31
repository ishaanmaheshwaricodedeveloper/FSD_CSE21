const promiseOne = new Promise((resolve, reject) => {
    console.log("Promise Started");

    let success = false;

    if (success) {
        resolve("Promise Resolved");
    } else {
        reject("Promise Rejected");
    }
});

promiseOne
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });