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

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT INTO images 
    (url, username, title, description)
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
