"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// return 20 popular movies 
const getHomepage = async (req, res) => {
    const {page} = req.query
    try {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US&page=${page}`, requestOptions)
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
        let movieInfo,castInfo,recommendations, videos;

        movieInfo = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
        movieInfo = await movieInfo.text()
        movieInfo = JSON.parse(movieInfo)

        castInfo = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
        castInfo = await castInfo.text()
        castInfo = JSON.parse(castInfo)

        recommendations = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US&page=1`, requestOptions)
        recommendations = await recommendations.text()
        recommendations = JSON.parse(recommendations)

        videos = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
        videos = await videos.text()
        videos = JSON.parse(videos)
        
            res.status(200).json({ status: 200, message: "success", data: {movieInfo:movieInfo,castInfo:castInfo,recommendations:recommendations,videos:videos} });
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
//-----------------------------------------------------

//get favourite movie list
const getFavMovie = async (req,res) => {
    const user_id = req.params.UserId
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    try{
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Popcorn");
        console.log("connected!");
        const query = {user_id : user_id };
        const {fav_movie} = await db.collection("Record").findOne(query)
        let data = []
        if(fav_movie)
        {
            for (let index = 0; index < fav_movie.length; index++) {
                const movieID = fav_movie[index];
                let movieInfo = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`, requestOptions)
                movieInfo = await movieInfo.text()
                movieInfo = JSON.parse(movieInfo)
        
                data.push(movieInfo)
                
            }
        }
        

        res.status(200).json({ status: 200, message: "success", data: data });
        client.close();
        console.log("disconnected!");
    }  catch (err) {
    res.status(404).json({ status: 404, message: err.stack });
    }
}
//-----------------------------------------------------

//update favourite movie list
const patchFavMovie = async (req,res) => {
    let {movie_id,user_id} = req.body
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Popcorn");
        console.log("connected!");
        const query = {user_id : user_id };
        const {fav_movie} = await db.collection("Record").findOne(query)
        console.log(fav_movie)
        let data = fav_movie.filter(object => {
            return !(object== movie_id);
        });
        const newValues = { $set: { fav_movie : data } }
        await db.collection("Record").updateOne(
            query,
            newValues)
        res.status(200).json({ status: 200, message: "success", data: await db.collection("Record").findOne(query) 
    });
            client.close();
            console.log("disconnected!");
    }  catch (err) {
            res.status(404).json({ status: 404, message: err.stack });
        }
}
//-----------------------------------------------------

//add movie to favourite list 
const postFavMovie = async(req,res) => {
    let {movie_id,user_id} = req.body
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Popcorn");
        console.log("connected!");

        const query = {user_id : user_id };
        const {fav_movie} = await db.collection("Record").findOne(query)
        if(fav_movie ===undefined)
        {
            let pushArr = [movie_id]
            const newValues = { $set: { fav_movie : pushArr } }
            await db.collection("Record").updateOne(
                query,
                newValues)
        }
        else
        {    
            fav_movie.push(movie_id)
            const newValues = { $set: { fav_movie : fav_movie } }
            await db.collection("Record").updateOne(
                query,
                newValues)
            res.status(200).json({ status: 200, message: "success", data: await db.collection("Record").findOne(query) });
        }
            client.close();
            console.log("disconnected!");
    }  catch (err) {
            res.status(404).json({ status: 404, message: err.stack });
        }
}
//-----------------------------------------------------

//updateUsers
const updateUsers = async() =>{
    var axios = require('axios');
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Popcorn");
        // console.log("connected!");
        var config = {
        method: 'get',
        url: 'https://dev-ou8m6tfgkoapsoel.us.auth0.com/api/v2/users?page=0&per_page=10&include_totals=true&sort=field%3A1&include_fields=true&search_engine=v3',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFkVjI1TEFMWGNfb3ZBSjh2NjducCJ9.eyJpc3MiOiJodHRwczovL2Rldi1vdThtNnRmZ2tvYXBzb2VsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ0alFiRDRDNFp0dzUzQWZWZndYQUQ2c251SFloUGF2QUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtb3U4bTZ0Zmdrb2Fwc29lbC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY2OTQyNzc2MCwiZXhwIjoxNjcyMDE5NzYwLCJhenAiOiJ0alFiRDRDNFp0dzUzQWZWZndYQUQ2c251SFloUGF2QSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.slUPQeaWu09vaDXjS1_YiVRDWa16xc0Am_QATw5gNuLbtcfBKJ9InpbMZczDzUo4MRepRcrCXNiwKqtZluuU_jaSq26ydFc4HWY--ntryhYsDHe5MPrvDDpQENdgCwl_2R8zC6R5zZ1vKZiyf-EGIWrM88hd9r5lqIhWhswGuyo7AP2tXV90EOTz0Mm4lySoxrcbeTmWRzTLXkm0XI6NwZyACSgs7GydzpLeRduI6ietBC0KMetfrPtQRtr3PjZEJXf13lVCcZzGBKQqV7GlvqmfaBSbMouy3p7m0ne67EjWy07K0BkeC8vdkpeqFijItR-l660itiFck1r0VnUaVw'
        ,
        'accept-encoding': '*'},
        responseType: 'json', // default

        responseEncoding: 'utf8' // default
        };

        let Auth0Array = await axios(config)
        Auth0Array = Auth0Array.data.users
        Auth0Array = Auth0Array.map(a => a.user_id);

        let localData =  await db.collection("Record").find().toArray()
        localData= localData.map(a => a.user_id)
        
        
        let addedAcc = Auth0Array.filter(x => !(localData.includes(x)));

        for (let index = 0; index < addedAcc.length; index++) {
            await db.collection("Record").insertOne({user_id: addedAcc[index]});        
        }

        
        client.close();
        // console.log("disconnected!");
    } catch (err) {
            console.log(err.stack)
    }
}
//-----------------------------------------------------




module.exports = {
    getHomepage,
    getMovie,
    getCast,
    Search,
    updateUsers,
    postFavMovie,
    getFavMovie,
    patchFavMovie
};