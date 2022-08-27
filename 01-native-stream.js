process.stdin.pipe(process.stdout)
.on('data',function(msg) {
    console.log('data', msg.toString());
    this.end();
})
.on('error', msg => console.log('error', msg))
.on('end', _ => console.log('end'))
.on('close', _ => console.log('close'));

// terminal 1
// node -e "process.stdin.pipe(require('net').createServer(socket => socket.pipe(process.stdout))).listen(1338)"
// process.stdin.pipe(
//     require('net')
//     .createServer(socket => socket.pipe(process.stdout))
// ).listen(1338);

// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"
// process.stdin.pipe(require('net').connect(1338));

// "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
import { createReadStream, readFileSync } from 'fs';

http.createServer((req, res) => {
    // Its a bad practice.

    // const file = readFileSync('big.file');
    // res.write(file);
    // res.end();

    createReadStream('big.file')
    .pipe(res);
}).listen(3000, () => console.log('running'));

// curl localhost:3000 -o output.txt