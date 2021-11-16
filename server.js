const express = require("express");
const app = express();
const db = require("./db.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3.js"); //added
const amazonUrl = "https://s3.amazonaws.com/spicedling/";

app.use(express.static("./public"));

app.use(express.json()); //this middleware helps us parse json format request bodies;

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.post(
    "/upload.json",
    uploader.single("file"),
    s3.upload,
    function (req, res) {
        console.log("req.body-------------", req.body);
        console.log("Post/ upload");
        const { title, description, username } = req.body;
        const { filename } = req.file;
        const url = `${amazonUrl}${filename}`;

        db.uploadImages(url, username, title, description)
            .then((val) => {
                res.json(val.rows[0]);
            })
            .catch((err) => {
                console.log("Error in the post /upload  db.uploadImages", err);
            });
    }
);

//------------------------------------

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

///must stay at the end
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.listen(8080, () => console.log(`I'm listening.`));
