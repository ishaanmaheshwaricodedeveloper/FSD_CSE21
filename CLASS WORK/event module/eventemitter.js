// // //EventEmitter is class
// // //emit ("event param"):trigger/create/fire and on("event param",callback):listen/subscribe/handle
// // const EventEmitter = require('events');
// // const event = new EventEmitter();
// // event.on("greet", ()=>{
// // console.log("Helloooo")
// // })
// // event.once("greet", ()=>{
// //     console.log("call event only once")
// // })
// //  event.emit("greet")
// // // event.emit("greet")
// // // event.emit("greet")

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// // Listener for "greet"
// emitter.on("greet", (name) => {
//     console.log(`Hello, ${name}!`);
// });

// // Listener for "exit"
// emitter.on("exit", () => {
//     console.log("Goodbye! Exiting...");
// });

// // Trigger events
// emitter.emit("greet", "Harshit");
// emitter.emit("exit");

// 2. simulate DOM -like event handling in node.js using events
// button: click and mouseover events

const EventEmitter = require("events");

class Button extends EventEmitter {
    click() {
        console.log("Button clicked");
        this.emit("click");
    }

    mouseover() {
        console.log("Mouseover initialized");
        this.emit("mouseover");
    }
}

const button = new Button();

// Register event listeners
button.on("click", () => {
    console.log("Click event handled!");
});

button.on("mouseover", () => {
    console.log("Mouseover event handled!");
});

// Trigger events
button.click();
button.mouseover();