/* npm Modules */
const express = require("express");
const app = express();
const request = require("request");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const httpServer = http.Server(app);
const socketIo = require("socket.io");
const io = socketIo(httpServer);
const ytdl = require("ytdl-core");

// module.exports = run;

// function run() {
let socket = null;
var port = 3333;
var hostname = "localhost";

io.on("connection", (s) => {
  console.log("a user connected");
  socket = s;
});

/* Start the server */
httpServer.listen(port);

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "../client")));

app.post("/download", async (req, res) => {
  const { body } = req;
  const { url, projectPath } = body;
  const projectPathFolder = path.dirname(projectPath);
  const info = await ytdl.getInfo(url, {
    quality: "highest",
    filter: "audioandvideo",
  });
  console.log("info.formats", info);
  socket.emit("info", info.videoDetails);
  const dl = ytdl.downloadFromInfo(info);
  let videoLocation = __dirname + "/video.mp4";
  let videoId = "video";

  dl.on("info", ({ videoDetails }) => {
    console.log(videoDetails.videoId);
    videoId = videoDetails.videoId;
  });
  dl.on("progress", (chunk, downloaded, total) => {
    // console.log("progress", a, b, c);
    // console.log("#1");
    if (socket) {
      // console.log("#2");
      socket.emit("progress", {
        chunk,
        downloaded,
        total,
      });
    }
  });

  dl.on("end", () => {
    const sourcePath = `${__dirname}/video.mp4`;
    const destPath = `${projectPathFolder}/yt_${videoId}.mp4`;
    fs.rename(sourcePath, destPath, () => {
      res.json({
        result: "end",
        projectPathFolder,
        body,
        message: "File saved",
        __dirname: __dirname,
        videoLocation: destPath,
        videoId,
        url,
      });
    });
  });
  dl.on("close", () => {
    res.json({
      result: "close",
      body,
      message: "File saved",
      __dirname: __dirname,
      projectPathFolder,
      videoLocation: `${__dirname}/video.mp4`,
      videoId,
      url,
    });
  });
  dl.on("error", () => {
    res.json({
      result: "error",
      body,
      message: "File saved",
      __dirname: __dirname,
      projectPathFolder,
      videoLocation: `${__dirname}/video.mp4`,
      videoId,

      url,
    });
  });

  dl.pipe(fs.createWriteStream(videoLocation));
});

/* /import route that can be hit from the client side */
app.get("/import", (req, res, next) => {
  /* Get the directory path from the header and name the file */
  var path = req.headers["directory"] + "/placeholder.png";

  /* This is an example URL */
  var uri = "http://via.placeholder.com/350x150";

  /* write a helper function to download the image and save it */
  var saveImage = function (uri, filepath, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filepath)).on("close", callback);
    });
  };

  saveImage(uri, path, function () {
    /* Send the path back to the client side */
    res.status(200).send(path);
  });
});
// }
