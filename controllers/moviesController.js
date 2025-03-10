const connection = require("../data/db");

// index
function index(req, res) {
    const moviesSql = "SELECT * FROM movies";

    connection.query(moviesSql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        res.json(result);
    })
}

function show(req, res) {

}

module.exports = { index, show };