## Part A — Knowledge Check

### 1. What was the C10k problem, and why was it difficult for traditional web servers?

The C10k problem is when a server has to serve 10,000 clients at the same time. Servers like Apache open a separate thread for every client. These threads are blocking: when one is reading a file, it stops and waits until the file has been read, so new threads are needed for the other clients. 10,000 threads consume a lot of memory and slow the system down, even though most of them are just waiting.

### 2. Who is Ryan Dahl, and what problem inspired him to create Node.js?

Node.js was created by the American programmer Ryan Dahl in 2009. He noticed the progress bar on Flickr: the browser had to keep asking the server how much of the file had been uploaded, because the server couldn't report the progress by itself. This made him realize that servers should work in a non-blocking and event-driven way, without waiting and by reacting to events.

### 3. Why did Ryan Dahl choose Google's V8 engine?

Node.js uses Google's V8 engine, which was created for Chrome in 2008. Dahl chose it because V8 was very fast and open source, so Dahl didn't need to write his own JavaScript engine.

### 4. What is npm, and when was it introduced?

npm (Node Package Manager) is the package manager of Node.js, created in 2010. It lets you install ready-made packages by other developers with a single command and use them without writing everything from scratch.

### 5. How did Node.js change the relationship between frontend and backend development?

Before Node.js, frontend and backend were two separate worlds: the frontend was written in JavaScript and ran in the browser, while the backend was written in other languages. Node.js brought JavaScript to the server, so now both sides can be written in the same language. Thanks to this, the role of the full-stack JavaScript developer appeared.

### 6. What is the purpose of the `lib/` directory in the Node.js repository?

The `lib/` directory is the JavaScript layer of Node.js. It contains the modules we use directly, for example `fs.js`, `http.js`, `net.js`, `stream.js`, `events.js`, `crypto.js` and `path.js`. For example, `lib/fs.js` receives the passed data, performs the necessary checks, and then calls the C++ code in `src/` through `internalBinding`. This directory is mainly written in JavaScript.

### 7. What is the purpose of the `src/` directory?

The `src/` directory is the core engine of Node.js, written in C++. When `node` is launched, this very code runs. It implements the bindings, which act as a bridge to the JavaScript in `lib/`, and connects V8 and libuv. For example, `src/node_file.cc` is the C++ code behind the `fs` module: when `lib/fs.js` calls `internalBinding('fs')`, this file does the actual work.

### 8. What is the purpose of the `deps/` directory?

The `deps/` directory contains the third-party libraries that Node.js is built on and that it didn't write itself. For example, V8 for executing JavaScript, libuv for the event loop and non-blocking I/O, and OpenSSL for cryptography. They are mostly written in C and C++.

### 9. What is libuv, and what does it do?

libuv is a library written in C, located in `deps/`, and is considered the heart of Node.js. It provides the event loop, non-blocking I/O and file system operations, as well as the thread pool for operations that cannot be asynchronous.

### 10. Describe the simplified execution path of `fs.readFile()` in Node.js. What are Deno and non-blocking I/O?

When I call `fs.readFile('text.txt')`, `lib/fs.js` first validates the arguments, then passes them to the C++ code (`src/`) via `internalBinding('fs')`. From there it goes to libuv, which hands the file-reading job to one of the threads in the thread pool so that the main thread doesn't get blocked.

Deno was created by the same Ryan Dahl, because he regretted many things about Node.js, for example security: Node has access to files and the network without permission. In Deno there are permissions for that.

Non-blocking I/O means that the program doesn't wait for a long operation to finish, but moves on to other work, and the result comes later. For example, in a café you place an order, sit down, and when the coffee is ready, they call you.

## B1 — Environment Setup

- Node.js: v26.13.1
- npm: 11.20.0
- nvm: v26.13.1 (active)
- V8: 14.6.202.34-node.40

Screenshot: `setup.png`

## B2 — Node.js Global Objects

| Global Value | Node.js (`typeof`) | Browser (`typeof`) |
|---|---|---|
| `globalThis` | object | object |
| `window` | undefined | object |
| `document` | undefined | object |
| `process` | object | undefined |
| `console` | object | object |
| `setTimeout` | function | function |

## B3 — Environment Report

| Parameter | Output |
|---|---|
| Node.js Version | v26.13.1 |
| V8 Version | 14.6.202.34-node.40 |
| libuv Version | 1.52.1 |
| OpenSSL Version | 3.5.9 |
| llhttp Version | 9.4.4 |
| zlib Version | 1.3.2.1-motley-456ae73 |
| Platform | darwin |
| Architecture | arm64 |
| PID | 78759 |
| CWD | /Users/erikpiliposyan/Desktop/lesson-1-1-erik |
| Uptime | 0.075609792 seconds |
| Heap Used | 4.83 MB |

### Dependencies Location (`deps/`)

Source: [Node.js GitHub — deps directory](https://github.com/nodejs/node/tree/main/deps)

| Library | Directory |
|---|---|
| V8 | `deps/v8/` |
| libuv | `deps/uv/` |
| OpenSSL | `deps/openssl/` |
| llhttp | `deps/llhttp/` |
| zlib | `deps/zlib/` |

## B4 — Node.js GitHub Repository Exploration

### 1. `internalBinding('fs')` in the `lib/fs.js` file

`internalBinding('fs')` is an internal Node.js mechanism that allows JavaScript code to access internal file-system functionality. It connects the JavaScript implementation in `lib/fs.js` with Node.js's internal native (C++) implementations.

### 2. The role of the `src/node_file.cc` file

`src/node_file.cc` is a file written in C++ in Node.js that contains the native implementations related to the File System. It provides the link between the JavaScript APIs and the capabilities of the operating system and file system.

### 3. The 5 subdirectories of `deps/` and their purpose

The `deps/` directory contains the external libraries and dependencies used by Node.js.

| Directory | Purpose |
|---|---|
| `deps/v8/` | The JavaScript engine that executes JavaScript code. |
| `deps/uv/` | The libuv library, which manages asynchronous I/O operations and the Event Loop. |
| `deps/openssl/` | Provides encryption and TLS/SSL functionality. |
| `deps/llhttp/` | Used for parsing HTTP messages. |
| `deps/zlib/` | Provides data compression and decompression capabilities. |

### 4. 5 JavaScript modules in the `lib/` directory

The `lib/` directory contains the internal JavaScript modules of Node.js, which provide various functionalities.

| Module | Purpose |
|---|---|
| `fs.js` | Working with files and directories. |
| `path.js` | Handling file and directory paths. |
| `http.js` | Working with HTTP servers and requests. |
| `os.js` | Getting information about the operating system. |
| `crypto.js` | Cryptographic operations: hashing and encryption. |

## Part C — Event Loop

### C1 — Predict the Output

1. `console.log('A')` — synchronous, printed immediately.
2. `setTimeout(..., 0)` — the callback is handed to the timer, and later enters the timer queue.
3. `Promise.resolve().then(...)` — the callback enters the microtask queue.
4. `console.log('D')` — synchronous, printed immediately.
5. After the call stack is empty, the microtask is executed: `C` is printed.
6. Finally, the timer callback is executed: `B` is printed.

0 ms means "as soon as possible", not "right now".

### C2 — Blocking the Event Loop

**Output:**

```
Busy loop finished
Timer fired after 2000 ms (I asked for 100 ms)
```

The timer fires not after 100 ms, but after about 2000 ms, when the busy loop finishes. Node.js executes JavaScript code on a single main thread. While the synchronous loop is running, the call stack is busy, and the event loop cannot move on to the timer queue. The 100 ms is only the minimum wait, not a guaranteed time: the callback will run only when the thread becomes free. If a server has a blocking operation that lasts 2 seconds, during that time the server cannot serve any other client; all their requests wait in the queue. This is exactly why Node.js is built on non-blocking I/O: when it needs to read a file or wait for a database, it hands that job to libuv and moves on to the next one, so that a single thread can serve many users at the same time. That's why long operations in Node.js must be asynchronous (non-blocking).

## Bonus — Ryan Dahl's Regrets

1. **Promises were not kept.** Dahl added Promises in 2009 but removed them, and he himself called that a stupid decision. As a result, Node's asynchronous APIs stayed on callbacks, while Promises are required for async/await. In his opinion, if Promises had been used consistently, the standardization of async/await might have happened faster.
2. **Security.** A Node.js program can read files, write them and use the network without any permission. For example, your linter shouldn't have full access to your computer and network.
3. **`node_modules`.** When we write `require('express')`, Node doesn't know the exact path and has to search the `node_modules` folders, going up one by one until it finds it. This complicates the module resolution algorithm. In the browser and in Deno, an import specifies the path or URL directly, so no such search is needed.

### My opinion: about security

I agree with Dahl that this is a serious problem. When you install an npm package, you trust not only its author, but also all the packages it depends on. If one of them is malicious, it can read your files or send data over the internet, and Node.js won't stop it. Deno solves this problem with a permissions system: a program gets access to files or the network only when you explicitly allow it. In my opinion this is a better approach, although it is less convenient, because you have to specify permissions every time.
