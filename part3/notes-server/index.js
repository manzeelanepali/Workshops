const { response } = require("express");
const express = require("express");
const { request } = require("http");
const App = express();

App.get("/", (request, response) => {
  response.send(<h1>Hello woorld</h1>);
});

App.listen("3001", () => {
  console.log("server listening on 3001");
});
