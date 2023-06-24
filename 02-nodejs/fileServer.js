/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

function readFileSync(req, res) {
  const folderPath = "C:/Assignments/Week2/Week-2-Assignments/02-nodejs/files";
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      var answerObject = {
        values: files,
      };

      res.send(answerObject);
    }
  });
}
app.get("/files", readFileSync);

function readFileContent(req, res) {
  const fileName = req.params.filename;
  const filePath =
    "C:/Assignments/Week2/Week-2-Assignments/02-nodejs/files/" + fileName;
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
     
        res.status(404).send('File not found');
      
      
    } else {
      console.log(fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      console.log(filePath);
      res.send(fileContents);
    }
  });
}
app.get("/file/:filename", readFileContent);

app.get('/files/invalid', (req, res) => {
  res.status(404).send('Route not found');
});

// Handle all other undefined routes
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});


module.exports = app;
