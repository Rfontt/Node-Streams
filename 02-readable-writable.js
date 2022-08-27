import { Readable, Writable } from 'stream';

// Data souce
const readable = Readable({
    read() {
        this.push('Hello world 1');
        this.push('Hello world 2');
        this.push('Hello world 3');
        this.push('Hello world 4');

        // It Informs that the data has run out.
        this.push(null);
    }
});

const writable = Writable({
    write(chunk, enconding, cb) {
        console.log('msg', chunk.toString());

        cb();
    }
});

readable
    // The writable is always the output.
    .pipe(writable);