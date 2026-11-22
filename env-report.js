console.log("Node.js Version:", process.version);
console.log("V8 Version:", process.versions.v8);
console.log("Libuv version", process.versions.uv);
console.log("OpenSSL Version:", process.versions.openssl);
console.log("llhttp Version:", process.versions.llhttp);
console.log("zlib Version:", process.versions.zlib);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("PID:", process.pid);
console.log("CWD:", process.cwd());
console.log("Uptime:", process.uptime());

console.log("Heap Used (MB):",
  (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)
);    