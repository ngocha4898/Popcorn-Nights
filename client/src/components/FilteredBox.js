import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const moment = require('moment');

const FilteredBox = () => {
    const navigate = useNavigate()
    const [state,setState] = useState (null); 
    const [genreID,setGenreID] = useState (null); 
    const [movie, setMovie] = useState(null)
    const [genres,setGenres] = useState (null); 
    
    useEffect (() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=b2f7fd90221fb42dc91643e47e29b782&language=en-US`)
            .then(res => res.json())    
            .then((data) => setState(data.genres))    
            .catch((error) => {console.log(error)})    
    },[]);
    
    useEffect (() => {
        fetch(`/filter/${genreID}`)
            .then(res => res.json())    
            .then((data) => setMovie(data.data))    
            .catch((error) => {console.log(error)})    
    },[genreID]);

    return (
        <Style>
        <div className="filtered-box">
        {!state
        ? <h1> Loading</h1>
        : 
        <>
                <p className="heading">Can't choose a movie? Choose a genre below and let the fate take the wheel</p>
                <div className="grid">
                    {state?.map(element => {
                        return <p className={genres===element.name?"pointer bold":"pointer"} onClick={()=>{
                            setGenreID(element.id)
                            setGenres (element.name)
                        }}>{element.name}</p>
                    })}
                </div>
        </>
        }
        <div>
            <div>
                {!movie
                ? <></> 
                : 
                <div className="result pointer" onClick={()=> navigate(`/Movie/${movie.id}`)}>
                <img src={"https://image.tmdb.org/t/p/original"+ movie.backdrop_path}/>
                <p className="movie-title" > {movie.original_title}</p>
                <p> {moment(movie.release_date).format('YYYY')}</p>
                {
                    movie?.genre_ids.map(element=>{
                        let result = state.find(genre=>genre.id==element)
                        return (
                            <p className="genres">{result.name}</p>
                        )
                    })
                }
                <p className="overview">Overview: {(movie.overview.length>250)?movie.overview.slice(0,250)+"...":movie.overview}</p>
                </div>   
            }
            </div>
        </div>
        </div>
        </Style>
    )
}
export default FilteredBox;
const Style = styled.div`
color: white;
margin-left: 12%;
height: 600px;
.filtered-box{
    background-color:rgba(255,255,255,.8);
    border-radius:.25em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    position: relative;
    left: -7%;
    top: -2%;
    height: 580px;
    padding: 1% 0% 0% 5%;
}
.heading{
    font-size: 20px;
}
img{
    width: 30%;
    border-radius: 10px;
}
.overview{
    width: 30%;
}
.genres{
    display: inline-block;
    padding-right: 1%;
    font-weight: bolder;
}
.movie-title{
    font-size: 20px;
    text-decoration: underline;
}
.result{
    position: relative;
    left: 55%;
    bottom: 300px;
}
.grid{
    display:grid; 
    grid-template-columns:1fr 1fr 1fr 1fr ;
    width: 50%;
}
.pointer{
    cursor: pointer;
}
.bold{
    font-weight:bolder;
    color: orange;
}
.pointer:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease;
}

`;