let csInterface = null;
let projectPath = "";
let bar = null;
let languageCode = "en";
let videoTitleEl = null;
const host = "http://localhost:3333";

const init = async () => {
  csInterface = new CSInterface();

  csInterface.requestOpenExtension("com.easy-youtube-download.server", "");

  languageCode = csInterface.getHostEnvironment().appUILocale.substr(0, 2);

  // console.log({ languageCode });

  await pingConnection();
  await loadI18n(languageCode);
  console.log(i18next.t("name"));
  setTimeout(start, 100);
};

const start = async () => {
  window.reload = "";
  videoTitleEl = document.querySelector(".download h2");
  bar = getProgressBar(
    document.querySelector("#progress"),
    document.querySelector("#progress-text")
  );

  showPanel("main");

  projectPath = await getProjectPath();

  // console.log({ projectPath });

  const importBtn = document.querySelector("#import-button");
  const inputEl = document.querySelector("input");
  importBtn.addEventListener("click", async () => {
    // startVideoDownload({ url: inputEl.value, projectPath }).then((json) => {
    //   console.log({ json });
    //   openFileImporter(json, csInterface);
    // });
    const url = inputEl.value;

    if (!isValidLink(url)) {
      showError("Link is not a valid YouTube URL");
      return;
    }
    showPanel("download");
    const json = await startVideoDownload({ url, projectPath });
    await openFileImporter(json);
    showPanel("main");
    // openFileImporter();
  });

  const socket = io(host);

  socket.on("connect", () => {
    console.log("connected to server");
  });
  socket.on("progress", (progress) => {
    // console.log({ progress });
    bar.animate(Math.round(progress.downloaded / progress.total));
  });

  socket.on("info", (info) => {
    videoTitleEl.textContent = info.title;
  });
};

const pingConnection = () => {
  return fetch(host)
    .then((res) => res.text())
    .catch(pingConnection);
};

const getProjectPath = () =>
  new Promise((resolve) => {
    csInterface.evalScript("getProjectPath()", resolve);
  });

const showPanel = (panelName) => {
  document.querySelectorAll(".panel").forEach((el) => el.classList.add("hide"));

  const panelEl = document.querySelector(`.${panelName}`);

  switch (panelName) {
    case "main":
      panelEl.querySelector("input").value = "";
      break;
    case "download":
      bar.set(0);
      videoTitleEl.textContent = "";
      break;
  }

  panelEl.classList.remove("hide");
};

const showError = (message) => {
  const errorEl = document.querySelector(".error");

  errorEl.textContent = message;
  errorEl.classList.add("fade-in");

  setTimeout(() => {
    errorEl.classList.remove("fade-in");
  }, 4000);
};

const startVideoDownload = ({ url, projectPath }) => {
  // console.log("projectPath", projectPath);
  return fetch(`${host}/download`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, projectPath }),
  }).then((res) => res.json());
};

const isValidLink = (link) => {
  const ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i;
  return link.match(ytRegex) !== null;
};

const getProgressBar = (barEl, textEl) => {
  const bar = new ProgressBar.Line(barEl, {
    strokeWidth: 4,
    easing: "easeInOut",
    duration: 1400,
    color: "#FFEA82",
    trailColor: "#eee",
    trailWidth: 1,
    svgStyle: { width: "100%", height: "100%" },
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: "#999",
        position: "absolute",
        right: "0",
        top: "30px",
        padding: 0,
        margin: 0,
        transform: null,
      },
      autoStyleContainer: false,
    },
    from: { color: "#FFEA82" },
    to: { color: "#ED6A5A" },
    step: (state, bar) => {
      const content = Math.round(bar.value() * 100) + " %";
      textEl.textContent = content;
    },
  });
  return bar;
};

const openFileImporter = ({ videoLocation }) =>
  new Promise((resolve) => {
    const extendedScriptCommand = `importFile("${videoLocation}")`;
    // console.log({ extendedScriptCommand });
    csInterface.evalScript(extendedScriptCommand, resolve);
  });

window.addEventListener("load", setTimeout(init, 1000));
