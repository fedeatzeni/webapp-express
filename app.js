const express = require("express")
const app = express()
const port = process.env.PORT

//router 
const moviesRouter = require("./routers/movies")

//middlewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")
const imagePath = require("./middlewares/imagePath")

// static files
app.use(express.static("public"));

// imgs path
app.use(imagePath);

// home route
app.get("/api", (req, res)=> {
    res.send("Rotta home dei film")
})

// index route
app.use("/api/movies", moviesRouter)

// errors
app.use(errorsHandler)

app.use(notFound)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})