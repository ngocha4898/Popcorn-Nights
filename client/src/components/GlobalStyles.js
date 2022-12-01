import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
body{
    max-width: fit-content;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    width: 100%;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
}
p{
    color: black;
}
h3{
    color: white;
}
`;
