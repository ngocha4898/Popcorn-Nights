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
    patchFavMovie

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
    .get("/get-fav-movie/:UserId",getFavMovie)
    .post ("/add-fav-movie",postFavMovie)
    .patch ("/update-fav-movie",patchFavMovie)
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
    
    
    