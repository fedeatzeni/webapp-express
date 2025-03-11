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

module.exports = { index, show };