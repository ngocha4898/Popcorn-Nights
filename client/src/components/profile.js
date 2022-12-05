import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect,React} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
                
            </>
        )
        
    );
};

export default Profile;