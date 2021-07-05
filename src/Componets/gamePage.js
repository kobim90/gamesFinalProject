// import { useEffect, useState } from "react";
// import Container from "react-bootstrap/esm/Container";
// import {useParams} from "react-router-dom"
// import { getAllGameDetailsApi } from "../DAL/api";

// function GamePage(props) {
//     let { gameId } = useParams();
//     const [game, setGame] = useState({})

//     useEffect(() => {
//         async function getData() {
//             const game = getAllGameDetailsApi(gameId);
//             setGame(game)
//         }
//     })
//     return (
//         <Container>
//         </Container>
//     )
// }

// export default GamePage;