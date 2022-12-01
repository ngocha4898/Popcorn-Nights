import {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import { FiHeart, FiBookmark, FiEye } from "react-icons/fi";
import Star from "./star";

const sendRequest= (link, movie_id, user_id,request) =>{

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
"movie_id": movie_id,
"user_id": user_id
});

let requestOptions = {
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
    const { user } = useAuth0();
    const [like, setLike] = useState (null)
    const [bookmark, setBookMark] = useState (null)
    const [watchlist, setWatchList] = useState (null)
    const movie_id = useParams().MovieId
    const [movie,setMovie] = useState (null);
    const navigate = useNavigate()
    

    //get Movie
    useEffect (() => {
    fetch(`/Movie/${movie_id}`)
        .then(res => res.json())    
        .then((data) => {setMovie(data);})    
        .catch((error) => {console.log(error)})    
    },[movie_id]);
    //-----------------------------------------------------

    //check if user already like a movie
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
    //-----------------------------------------------------

    //check if user already bookmark a movie
    useEffect (() => {
        fetch(`/get-bookmark-movie/${user?.sub}`)
            .then(res => res.json())    
            .then((data) => {
                let result = data.data.filter(movie => movie.id==movie_id);
                if(result.length==1)
                setBookMark(true)
                else
                setBookMark(false)
            })    
            .catch((error) => {console.log(error)})    
        },[user?.sub,bookmark]);
    //-----------------------------------------------------

    //check if user already watch a movie
    useEffect (() => {
        fetch(`/get-watched-movie/${user?.sub}`)
            .then(res => res.json())    
            .then((data) => {
                let result = data.data.filter(movie => movie.id==movie_id);
                if(result.length==1)
                setWatchList(true)
                else
                setWatchList(false)
            })    
            .catch((error) => {console.log(error)})    
        },[user?.sub,watchlist]);
    //-----------------------------------------------------

    
    return (
        <Wrapper> 
            {
                !movie
                ? <></>
                : 
                <>
                {/* Movie's information */}
                <div className="movie-box">
                    <img className="poster-path" src={"https://image.tmdb.org/t/p/original"+movie.data.movieInfo.poster_path}/>
                    <div className="right">
                        <h1> {movie.data.movieInfo.original_title}</h1>
                        {movie?.data?.movieInfo?.genres?.map(element => {
                            return(
                                <p className="genres">  {element.name}  </p>
                            )
                        })}
                        <div className="function">
                            {/* Like Function */}
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
                            {/* ///////////////////////////////////////// */}

                            {/* Bookmark Function */}
                            <FiBookmark className={bookmark ? "saved" : ""} onClick={()=> {
                                if (bookmark)
                                {
                                    sendRequest("/update-bookmark-movie",movie_id,user?.sub,"PATCH")
                                    setBookMark(false)
                                }
                                else 
                                {
                                    sendRequest("/add-bookmark-movie",movie_id,user?.sub,"POST")
                                    setBookMark(true)
                                }
                            }}/>
                            {/* ///////////////////////////////////////// */}

                            {/* Watchlist Function */}
                            <FiEye className={watchlist ? "watchlist" : ""} onClick={()=> {
                                if (watchlist)
                                {
                                    sendRequest("/update-watched-movie",movie_id,user?.sub,"PATCH")
                                    setWatchList(false)
                                }
                                else 
                                {
                                    sendRequest("/add-watched-movie",movie_id,user?.sub,"POST")
                                    setWatchList(true)
                                }
                            }}/>
                            {/* ///////////////////////////////////////// */}

                            {/* Rate Function */}                   
                                {
                                    watchlist
                                    ?<Star movie_id={movie_id}/>
                                    : ""
                                    
                                }
                            {/* ///////////////////////////////////////// */}
                        </div>
                        <p className="tagline"> {movie.data.movieInfo.tagline} </p>
                        <p className="width"> Overview: {movie.data.movieInfo.overview} </p>
                    </div>
                </div>
                <div className="cast-box">
                    {/* cast information */}
                    <h3> Casts </h3>
                    {
                        (movie?.data?.castInfo?.cast.length>0)
                        ? <>
                        {movie?.data?.castInfo?.cast?.map(element=>{
                            return (
                                <div className="casts" onClick={()=> navigate(`/Cast/${element.id}`)}>
                                {element.profile_path
                                ? <img className="cast-img pointer" src={"https://image.tmdb.org/t/p/original"+element.profile_path}/>
                                :<img className="cast-img alt-img pointer" src='https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'/>
                                }
                                </div>
                            )
                        })}
                        </>
                        :<p className="no-result">Oops! We don't have any cast added to this movie ☹️. </p>
                    }   
                </div>    
                {/* Movie's video */}
                <h3 className="left"> Videos </h3>
                    <iframe src={"https://www.youtube.com/embed/"+movie.data.videos.results[0].key} />
                
                {/* Movie's recommendations */}
                <h3 className="left"> Recommendations </h3>
                <div className="single-rec">
                {
                    movie?.data?.recommendations?.results?.map(element=>{
                        return(
                            <div className="recc" onClick={()=> navigate(`/Movie/${element.id}`)} >
                                <img className="recommendations" src={"https://image.tmdb.org/t/p/original"+element.poster_path}/>
                                <p className="rec-title"> {element.original_title}</p>
                            </div>
                        )
                    })
                }
                </div>
                </>
            }
        </Wrapper>
    )


}
export default MoviePage;

const Wrapper = styled.div`
iframe{
    position: relative;
    left: 27%;
    border-style: none;
    height: 500px;
    width: 800px;
}
.no-result{
    position: relative;
    left: 13%;
}
.left{
    position: relative;
    left: 10.5%;
}
.cast-box{
    width: 80%;
}
.movie-box{
    background-color:rgba(255,255,255,.8);
    border-radius:1em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    width: 80%;
    position: relative;
    left: 10%;
    height: 538px;
}
.tagline{
    font-style: italic;
}
.function {
    margin-top: 2%;
}
.genres{
    display: inline;
    padding-right: 2%;
}
.width{
    width:50%;
    font-kerning: 10px;
}
.right{
    display: inline-block;
    position: absolute;
    left: 50%;
}
.casts{
    display: inline;
    position: relative;
    left: 16%;
}
.poster-path{
    width: 25%;
    display: inline;
    position: relative;
    left: 15%;
    top: 2px;
}
.alt-img {
    height: 170px;
    width: 8%;
}
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
.cast-img{
    width: 8%;
    padding-right: 0.5%;
    padding-bottom: 0.2%;
    border-radius: 20px;

}
.recommendations{
    width:90%;
    height: 300px;
    border-radius: 20px;

}
.rec-title{
    max-width: 60%;
}
.single-rec{
    display: grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    height: 120px;
    left: 10%;
    position: relative;
    width: 80%;

}
.recc:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease;
}
.casts:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease;
}
.recc{
    width: fit-content;
    position: relative;
}
h3 {
    position: relative;
    left: 13%;
}
`;