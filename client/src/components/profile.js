import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect,React} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [favmovie,setFavMovie] = useState (null);
    // const navigate = useNavigate()
    useEffect (() => {
    fetch(`/get-fav-movie/${user?.sub}`)
        .then(res => res.json())    
        .then((data) => {setFavMovie(data.data);})    
        .catch((error) => {console.log(error)}) 
    },[user?.sub]);


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <>
        {/* return user info */}
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <h5> @{user.nickname}</h5>
                </div>
        {/* ----------------------------------------------------- */}
                <div>
                    {
                        !favmovie
                        ? <></>
                        : favmovie?.map (movie=>{
                            return(
                                <p>{movie.original_title}</p>
                            )
                        })
                        
                    } 
                </div>
            </>
        )
        
    );
};

export default Profile;