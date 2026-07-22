function add(a, b) {
    console.log(a + b);
}

add(10, 20);

const add1 = (num1,num2) => {
    return num1 + num2;
}
console.log(add1(10, 20));   

function addNum(){
    console.log(arguments);
}
addNum(10, 20, 30);