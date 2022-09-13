const fs = require("fs");

setImmediate(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
fs.readFile(__filename,() => {
    console.log(4);
    setTimeout(() => console.log(5));
    setImmediate(() => console.log(6));
    process.nextTick(() => console.log(7));
});
console.log(8);


/*
My first Solution:
Phase stacks

 log(8)  log(6)                                 log(7)
 log(4)  log(1)            log(5)               log(3)                log(2)

 POLL    CHECK    CLOSE    TIMERS    PENDING    nextTick_MICROTASK    promise_rej_res_MICROTASK

 Order would be: 8 4 6 1 5 7 3 2 -> this is WRONG!

Book's solution:
loop 1
    POLL phase
        require fs module
        add log(1) CHECK stack
        resolve promise add log(2) to promise_rej_res_MICROTASK stack
        add log(3) nextTick_MICROTASK
        start reading file add callbacks in POLL stack once ready
        8 is printed 

    nextTick_MICROTASK phase
        3 is printed

    promise_rej_res_MICROTASK phase 
        2 is printed

    CHECK phase
        1 is printed

    CLOSE phase
        empty stack
    TIMERS
        empty stack
    PENDING
        empty stack

loop 2
    POLL phase
        4 is printed
        add log(5) TIMERS stack
        add log(6) CHECK stack
        add log(7) nextTick_MICROTASK

    nextTick_MICROTASK phase
        7 is printed

    promise_rej_res_MICROTASK phase 
        empty stack

    CHECK phase
        6 is printed

    CLOSE phase
        empty stack
    TIMERS
        5 is printed
    PENDING
        empty stack



 */