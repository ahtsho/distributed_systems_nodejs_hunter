#!/usr/bin/env node

const fs = require("fs");

fs.readFile("/etc/passwd",(err,data) => {
    if(err) throw err;
    console.log(data);
});

setImmediate(()=>{
    console.log("This runs while file is being read");
});

/*
Run:
This runs while file is being read
<Buffer 23 23 0a 23 20 55 73 65 72 20 44 61 74 61 62 ... 7818 more bytes>
*/