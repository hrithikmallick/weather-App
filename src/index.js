const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const requests = require("requests");
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(static_path);
app.use(express.static(static_path));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=827788fcf1df41ec70e9c1d2faaf39cf`
  )
    .on("data", (chunk) => {
      let objChunk = JSON.parse(chunk);
      let arrobj = [objChunk];
      // console.log(
      //   `city name is${arrobj[0].name} and temp is ${arrobj[0].main.temp}`
      // );
      res.write(
        `City name : ${arrobj[0].name} and temp is : ${arrobj[0].main.temp}`
      );
    })

    .on("end", (err) => {
      if (err) return console.log("connection closed due to errors", err);
      res.end();
    });
  // res.render("index");
});

app.get("*", (req, res) => {
  res.render("404page", {
    errorMsg: "Opps! page not found, Click Here to go",
  });
});

app.listen(port, () => {
  console.log(`listening to at http://localhost:${port}`);
});
