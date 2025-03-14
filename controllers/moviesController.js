const connection = require("../data/db");

// index
function index(req, res) {
    const moviesSql = "SELECT * FROM movies";

    connection.query(moviesSql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // res.json(result);

        // img path
        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);
    })
}

function show(req, res) {
    const { id } = req.params;

    // query
    const detailMovie = "SELECT * FROM movies WHERE movies.id = ?"

    connection.query(detailMovie, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: "Film non trovato" });

        // res.json(movieResult[0]);
        const movie = movieResult[0];

        // query
        const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            movie.reviews = reviewsResult

            movie.image = req.imagePath + movie.image

            // result
            res.json(movie);
        })
    })

}

function store(req, res, next) {

    const { title, director, abstract } = req.body;

    // nome del file creato dal middleware
    const imageName = `${req.file.filename}`;

    const query = "INSERT INTO movies (title, director, image, abstract) VALUES (?, ?, ?, ?)";

    connection.query(query, [title, director, imageName, abstract], (err, result) => {
        if (err) {
            console.log(err)
            return next(new Error("Errore interno del server"));
        }

        res.status(201).json({ status: "success", message: "movie Created" })
    });

}

//store review
function storeReview(req, res) {

    const { id } = req.params;

    const { text, name, vote } = req.body;

    const insertReviewSql = "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)"

    connection.query(insertReviewSql, [text, name, vote, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201)
        res.json({ message: 'Review added', id: result.insertId })
    })
}

module.exports = { index, show, store, storeReview };