const express = require("express");
const app = express();
const db = require("./db.js");

app.use(express.static("./public"));

app.use(express.json()); //this middleware helps us parse json format request bodies;

app.get("/images.json", (req, res) => {
    console.log("We are here");
    db.selectImages()
        .then((images) => {
            res.json(images.rows);
        })
        .catch((err) => {
            console.log("Error in the /", err);
        });
});

///
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.listen(8080, () => console.log(`I'm listening.`));
