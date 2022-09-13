// given the following code 
// what is the order in which the logs will be printed
// how long does each message take to be printed
setTimeout(()=> console.log("A",0));
console.log("B");
setTimeout(()=> console.log("C",100));
setTimeout(()=> console.log("D",0));

let i = 0;
while(i<1_000_000_000){ // Assume it takes about 500ms
    let sqrt = Math.sqrt(i);
    i++;
}
console.log("E");

// Book's Answer
//          B   E   A   D   C
// time     1   501 502 502 502

// run B E A C D


