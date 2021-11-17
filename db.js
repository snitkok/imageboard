const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "postgres";
const database = "imageboard";
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);
console.log("[db] Connecting to:", database);

module.exports.selectImages = () => {
    const q = `SELECT *
    FROM images
    ORDER BY images.id DESC;`;
    const params = [];
    return db.query(q, params);
};

//Our images are no longer stored in the uploads folder, but the information about them should be still stored in the images table in order to access them. For this reason we first add files to the folder and then delete them.

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT INTO images 
    (url, username, title, description)
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

// The RETURNING clause allows you to retrieve values of columns that were modified by an insert, delete or update. Without RETURNING, you would have to run a SELECT statement after the DML statement is completed, in order to obtain the values of the changed columns. So, RETURNING helps avoid another roundtrip to the database.

//Selecting all image information by id

module.exports.selectModalImage = (id) => {
    const q = `SELECT *
    FROM images
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};
