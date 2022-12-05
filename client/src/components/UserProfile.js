import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect,React} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [favmovie,setFavMovie] = useState (null);
    const [bookmark,setBookmark] = useState (null);
    const [watched,setWatched] = useState (null);
    const navigate = useNavigate()
    //fetch favourite movie list
    useEffect (() => {
    fetch(`/get-fav-movie/${user?.sub}`)
        .then(res => res.json())    
        .then((data) => {setFavMovie(data.data);})    
        .catch((error) => {console.log(error)}) 
    },[user?.sub]);
    //-------------------------------------------------------//

    //fetch bookmark movie list
    useEffect (() => {
        fetch(`/get-bookmark-movie/${user?.sub}`)
            .then(res => res.json())    
            .then((data) => {setBookmark(data.data);})    
            .catch((error) => {console.log(error)}) 
        },[user?.sub]);
    //-------------------------------------------------------//

    //fetch watched movie list
    useEffect (() => {
        fetch(`/get-watched-movie/${user?.sub}`)
            .then(res => res.json())    
            .then((data) => {setWatched(data.data);})    
            .catch((error) => {console.log(error)}) 
        },[user?.sub]);
    //-------------------------------------------------------//

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
        <Wrapper>

        {/* return user info */}
                <div className="user-box">
                    <div className="inline-block">
                    <img className="ava" src={user.picture} alt={user.name} />
                    </div>
                    <div className="inline-block user-name">
                        <h2>{user.name}</h2>
                        <h5> @{user.nickname}</h5>
                    </div>
                </div>
        {/* ----------------------------------------------------- */}
        <div className="user-list">
        {/* return favourite movie list */}
                <div className="max-width">
                    {
                        !favmovie
                        ? <></>
                        : 
                        <>
                        <h3> Your Favourite Movie </h3>
                        {favmovie?.map (movie=>{
                            return(
                                <>
                                <img className="pointer" onClick={()=> navigate(`/Movie/${movie.id}`)} src={"https://image.tmdb.org/t/p/original"+ movie.poster_path}/>
                                </>
                            )
                        })}
                        </>
                        
                    } 
                </div>
        {/* ----------------------------------------------------- */}

        {/* return bookmark movie list */}
                <div className="max-width">
                    {
                        !bookmark
                        ? <></>
                        : 
                        <>
                        <h3> Upcoming from your watchlist </h3>
                        {bookmark?.map (movie=>{
                            return(
                                <>
                                <img className="pointer" onClick={()=> navigate(`/Movie/${movie.id}`)} src={"https://image.tmdb.org/t/p/original"+ movie.poster_path}/>
                                </>
                            )
                        })}
                        </>
                    }
                </div>
        {/* ----------------------------------------------------- */}

        {/* return bookmark movie list */}
                <div className="max-width">
                    {
                        !watched
                        ? <></>
                        : 
                        <>
                        <h3> Movies you have watched </h3>
                        {watched?.map (movie=>{
                            return(
                                <>
                                <img className="pointer" onClick={()=> navigate(`/Movie/${movie.id}`)} src={"https://image.tmdb.org/t/p/original"+ movie.poster_path}/>
                                </>
                            )
                        })}
                        </>
                    }
                </div>
        {/* ----------------------------------------------------- */}
        </div>
        </Wrapper>
        )
        
    );
};

export default UserProfile;

const Wrapper = styled.div`
color: black;
height: 50%;
h3{
    color:white;
}
.ava{
    border-radius: 250px;
    width: 120px;
    position: relative;
    top: 30px;
}
img {
    border-radius: 15px;
}
.inline-block{
    display: inline-block;
    left: 20%;
    position: relative;
}

.pointer:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease;
}
.user-box{
    width: 66%;
    height: 200px;
    background-color:rgba(255,255,255,.8);
    border-radius:.5em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    position: relative;
    left: 16.7%;
}
.user-name{
    position: relative;
    left: 40%;
    top: 2%;
}
.user-list{
    position: relative;
    left: 17%;
    max-width: 90%;
}
.max-width{
    max-width: 90%;
    margin-right: 0px;
}
.pointer{
    cursor: pointer;
    width:20%;
    padding-right: 5px;
    display: inline-block;
    position: relative;
}
`