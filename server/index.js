"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const helmet = require('helmet');

const port = 8000;



const {
    getHomepage,
    getMovie,
    getCast, 
    Search,
    updateUsers,
    postFavMovie,
    getFavMovie,
    patchFavMovie,
    getBookmarkMovie,
    postBookmarkMovie,
    patchBookmarkMovie,
    getWatchedMovie,
    postWatchedMovie,
    patchWatchedMovie,
    getFilteredMovie,
    getRate,
    postRate,
    patchRate,
    deleteRate
} = require("./handlers");


express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------
    .use(helmet())

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // Endpoints
    // ---------------------------------
    
    .get("/api/", getHomepage)
    .get ("/Movie/:MovieId", getMovie)
    .get ("/Cast/:CastId", getCast)
    .get ("/search", Search)
    .get("/filter/:genres", getFilteredMovie )
    //get list of fav movies, user can edit (like/unlike) and update their list
    .get("/get-fav-movie/:UserId",getFavMovie)
    .post ("/add-fav-movie",postFavMovie)
    .patch ("/update-fav-movie",patchFavMovie)

    //get list of bookmark movies, user can edit (save/unsave) and update their list
    .get("/get-bookmark-movie/:UserId",getBookmarkMovie)
    .post ("/add-bookmark-movie",postBookmarkMovie)
    .patch ("/update-bookmark-movie",patchBookmarkMovie)

    //get list of watched movies, user can add or remove movies to their watched list
    .get("/get-watched-movie/:UserId",getWatchedMovie)
    .post ("/add-watched-movie",postWatchedMovie)
    .patch ("/update-watched-movie",patchWatchedMovie)
    // ---------------------------------

    //get rate, user can edit/ update their rate
    .get("/get-rate",getRate)
    .post ("/add-rate",postRate)
    .patch ("/update-rate",patchRate)
    .delete("/delete-rate",deleteRate)
    // ---------------------------------

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "error page",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    setInterval(updateUsers, 1000);
    
    
    