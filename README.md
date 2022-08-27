# Streams

Streams is used to handle files on demand. This process helps us with downloading, compression, etc.

- Buffer => Split files into small pieces of data.
- Chucks => It's the pieces of data.
- Readable => It's the data source. Example: database, file, etc.
- Tranform => It clean and map the data(get just the necessary).
- Writable => It contains the final product.