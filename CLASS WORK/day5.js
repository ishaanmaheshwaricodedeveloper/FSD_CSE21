// understand the concept of fetch in console 
async function test() {
    console.log("this is asynchronous and we want to use fetch");

    const response = await fetch("./student.json");

    console.log(response.status);

    const student = await response.json();
    console.log(student);
    console.log("finally data fetched");
}

test()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
});