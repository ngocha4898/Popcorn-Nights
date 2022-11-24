import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const [state,setState] = useState (null);
    const navigate = useNavigate()
    useEffect (() => {
    fetch("/")
        .then(res => res.json())    
        .then((data) => {console.log(data);})    
        .catch((error) => {console.log(error)})    
},[]);

    return <h1> Hello </h1>
}

export default Homepage;