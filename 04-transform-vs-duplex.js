import { Duplex } from 'stream';

let count = 0;

const server = Duplex({
    objectMode: true, // You dont need to work with buffer whit it, but it uses more memory  
    enconding: 'utf-8',

    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Rfontt ${count}`);

                return;
            }

            clearInterval(intervalContext);

            this.push(null);
        }

        setInterval(function() {
            everySecond(this);
        })
    },

    // It is a writable too, but contains a different communication channel.
    write(chuck, enconding, cb) {
        console.log(`[whitable] saving`, chuck);

        cb();
    }
});

// To prove that they are different communication channels.
// Write method triggers writable Duplex.
server.write(`[duplex] hey this is a writable \n`);

// on data show what happens in the push.
server.on('data', msg => console.log(`[readable] ${msg}`))

// server
//     .pipe(process.stdout);