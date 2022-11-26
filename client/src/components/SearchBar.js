import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SearchBar = () => {
    const [input,setInput] = useState (null);
    const [search,setSearch] = useState (null);
    const navigate = useNavigate()
    useEffect (() => {
    fetch(`/search?text=${input}`)
        .then(res => res.json())    
        .then((data) => {setSearch(data.data);})    
        .catch((error) => {console.log(error)})    
},[input]);
    return(
        <Wrapper>
        <input type="text" onChange={(e)=> console.log(setInput(e.target.value))}/>
        <div class="autocom-box">
            {!(search&&input)
                ? <></>
                :search?.results?.map(Element=>{
                    return(
                    // change p > link
                    <p onClick={()=> navigate(`/Movie/${Element.id}`)}>
                        {Element.original_title}
                    </p>
                    )
                })
            }
        </div>
        </Wrapper>
        )
}

export default SearchBar;
const Wrapper = styled.div`
position: relative;
display: inline-block;
margin-bottom:10%;
input{
    width: 100%;
}
img{
    width: 150px;
}


`