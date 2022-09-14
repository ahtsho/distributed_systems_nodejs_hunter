#!/usr/bin/env node

const zlib = require("zlib");
const http = require("http");
const fs = require("fs");

http.createServer((request,response)=>{
    const raw = fs.createReadStream(__dirname + "/index.html");
    const acceptEncoding = request.headers["accept-encoding"]||"";
    response.setHeader("Content-Type", "text/plain");
    console.log(acceptEncoding);

    if(acceptEncoding.includes("gzip")){
        console.log("Encoding with gzip");
        response.setHeader("Content-Encoding", "gzip");
        raw.pipe(zlib.createGzip()).pipe(response);
    } else {
        constole.log("No encoding");
        raw.pipe(response);
    }
}).listen(process.env.PORT|| 1337);