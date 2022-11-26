import {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { FiStar, FiHeart, FiBookmark, FiEye } from "react-icons/fi";

const sendRequest= (link, movie_id, user_id,request) =>{

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
"movie_id": movie_id,
"user_id": user_id
});

var requestOptions = {
method: request,
headers: myHeaders,
body: raw,
redirect: 'follow'
};
    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const MoviePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [like, setLike] = useState (null)
    const [bookmark, setBookMark] = useState (null)
    const [watchlist, setWatchList] = useState (null)
    const [rate, setRate] = useState (null)

    const movie_id = useParams().MovieId
    const [movie,setMovie] = useState (null);
    const navigate = useNavigate()
    useEffect (() => {
    fetch(`/Movie/${movie_id}`)
        .then(res => res.json())    
        .then((data) => {setMovie(data);})    
        .catch((error) => {console.log(error)})    
    },[movie_id]);
    useEffect (() => {
        fetch(`/get-fav-movie/${user?.sub}`)
            .then(res => res.json())    
            .then((data) => {
                let result = data.data.filter(movie => movie.id==movie_id);
                if(result.length==1)
                setLike(true)
                else
                setLike(false)
            })    
            .catch((error) => {console.log(error)})    
        },[user?.sub,like]);
    return (
        <Wrapper> 
            {
                !movie
                ? <></>
                : 
                <>
                <img src={"https://image.tmdb.org/t/p/original"+movie.data.movieInfo.backdrop_path}/>
                <p> {movie.data.movieInfo.original_title}</p>
                {movie?.data?.movieInfo?.genres?.map(element => {
                    return(
                        <p> {element.name}</p>
                    )
                })}
                <p> User score: {movie.data.movieInfo.vote_average*10} </p>
                <FiHeart className={like ? "likedHeart" : ""} onClick={()=>{
                    if(like)
                    {
                        sendRequest("/update-fav-movie",movie_id,user?.sub,"PATCH")
                        setLike(false)
                    }
                    else
                    {
                        sendRequest("/add-fav-movie",movie_id,user?.sub,"POST")
                        setLike(true)
                    }
                }}/>
                <FiBookmark className={bookmark ? "saved" : ""}/>
                <FiEye className={watchlist ? "watchlist" : ""}/>
                <FiStar className={rate ? "rate" : ""}/>
                <p> {movie.data.movieInfo.runtime/60} </p>
                <p> {movie.data.movieInfo.tagline} </p>
                <p> Overview: {movie.data.movieInfo.overview} </p>
                </>
            }
        </Wrapper>
    )


}
export default MoviePage;

const Wrapper = styled.div`
img{
    width: 50%;
}
.likedHeart{
    fill: pink;
    color: pink;
}
.saved{
    fill: red;
    color: red;
}
.watchlist{
    fill: blue;
    color: blue;
}
.rate{
    fill: yellow;
    color: yellow;
}

`;