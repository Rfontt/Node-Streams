import { Readable, Writable, Transform } from 'stream';
import { createWriteStream } from 'fs';

const readable = Readable({
    read() {
        for (let index=0; index < 10; index++) {
            const person = { 
                id: Date.now() + index,
                name: `Rfontt-${index}`
            }
            const data = JSON.stringify(person);
        
            this.push(data);
        }

        this.push(null);
    }
});

// data processing.
const mapFields = Transform({
    transform(chunk, enconding, cb) {
        const data = JSON.parse(chunk.toString());
        const result = `${data.id}, ${data.name.toUpperCase()}\n`;

        cb(null, result);
    }
});

const mapHeaders = Transform({
    transform(chunk, enconding, cb) {
        this.counter = this.counter ?? 0;

        if (this.counter) {
            return cb(null, chunk);
        }

        this.counter += 1;

        cb(null, "id, name\n".concat(chunk));
    }
});

const writable = Writable({
    write(chunk, enconding, cb) {
        console.log('msg', chunk.toString());

        cb();
    }
});

const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    // .pipe(writable)
    .pipe(createWriteStream('my.csv'));

pipeline
    .on('end', () => console.log('acabou'));