"use strict";
// return 20 popular movies 
const getHomepage = async (req, res) => {
    try {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US&page=1", requestOptions)
            .then(response => response.text())
            .then(result => {
                res.status(200).json({ status: 200, message: "success", data: JSON.parse(result) });
            })
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.stack });
            console.log(err.stack);
    }    
}
//-----------------------------------------------------

//return single movie
const getMovie = async (req,res) => {
    const movie_id = req.params.MovieId
    try {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let movieInfo,castInfo;

        movieInfo = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
        movieInfo = await movieInfo.text()
        movieInfo = JSON.parse(movieInfo)

        

        castInfo = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
        castInfo = await castInfo.text()
        castInfo = JSON.parse(castInfo)
        
            res.status(200).json({ status: 200, message: "success", data: {movieInfo:movieInfo,castInfo:castInfo} });
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.stack });
            console.log(err.stack);
    }  
}
//-----------------------------------------------------
//return single cast
const getCast = async (req, res) => {
    const person_id = req.params.CastId
    try {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(`https://api.themoviedb.org/3/person/${person_id}?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
            .then(response => response.text())
            .then(result => {
                res.status(200).json({ status: 200, message: "success", data: JSON.parse(result) });
            })
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.stack });
            console.log(err.stack);
    }
}
//-----------------------------------------------------
//return movies based on search bar 
const Search = async (req, res) => {
    const text = req.query.text
    const page = req.query.page
    try {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US&query=${text}&page=${page}&include_adult=false`, requestOptions)
            .then(response => response.text())
            .then(result => {
                res.status(200).json({ status: 200, message: "success", data: JSON.parse(result) });
            })
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.stack });
            console.log(err.stack);
    }
}


module.exports = {
    getHomepage,
    getMovie,
    getCast,
    Search,
    
};