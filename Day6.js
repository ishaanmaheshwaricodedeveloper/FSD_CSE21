// //EventEmitter is class
// //emit ("event param"):trigger/create/fire and on("event param",callback):listen/subscribe/handle
// const EventEmitter = require('events');
// const event = new EventEmitter();
// event.once("greet", ()=>{
//     console.log("Helloooo")
// })
// event.emit("greet")
// event.emit("greet")
// event.emit("greet")

const EventEmitter = require("events");

const emitter = new EventEmitter();

// Listener for "greet"
emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

// Listener for "exit"
emitter.on("exit", () => {
    console.log("Goodbye! Exiting...");
});

// Trigger events
emitter.emit("greet", "Ishaan");
emitter.emit("exit");