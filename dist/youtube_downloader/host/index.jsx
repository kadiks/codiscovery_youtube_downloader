function importFiles() {
  var filterString = "";
  if (Folder.fs === "Windows") {
    filterString = "All files:*.*";
  }
  if (app.project) {
    var fileOrFilesToImport = File.openDialog(
      "Choose files to import", // title
      filterString, // filter available files?
      true
    ); // allow multiple?
    if (fileOrFilesToImport) {
      // We have an array of File objects; importFiles() takes an array of paths.
      var importThese = [];
      if (importThese) {
        for (var i = 0; i < fileOrFilesToImport.length; i++) {
          importThese[i] = fileOrFilesToImport[i].fsName;
        }
        app.project.importFiles(
          importThese,
          true, // suppress warnings
          app.project.getInsertionBin(),
          false
        ); // import as numbered stills
      }
    } else {
      // TODO: manage error display
      console.log("No files to import.");
      //   $._PPP_.updateEventPanel("No files to import.");
    }
  }
}

function getProjectPath() {
  return app.project.path;
}

function importFile(fileLocation) {
  if (app.project) {
    // We have an array of File objects; importFiles() takes an array of paths.
    app.project.importFiles(
      [fileLocation],
      true, // suppress warnings
      app.project.getInsertionBin(),
      false
    ); // import as numbered stills
  }
}

function openDocument(location) {
  var fileRef = new File(location);
  var docRef = app.open(fileRef);
}

function openDocument(location) {
  var fileRef = new File(location);
  var docRef = app.open(fileRef);
}
