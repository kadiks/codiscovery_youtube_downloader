const fs = require("fs");
const ytdl = require("ytdl-core");
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const dl = ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ");
dl.on("progress", (a, b, c) => {
  console.log("progress", a, b, c);
});
dl.pipe(fs.createWriteStream("video.mp4"));
