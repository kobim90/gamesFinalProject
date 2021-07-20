import React ,{ useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import SearchCard from "../searchCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import DeleteModal from "./deleteModal";
import Profile from "./profileAvatar";
import { getUserProfileData, deleteGameFavorite } from "../../DAL/api";
import userApi from "../../DAL/userApi";

import {
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./profileStyle.css";

function EditProfile() {
  const [editShow, setEditShow] = useState(false);
  const User = React.useContext(userApi)
  const [data, setData] = useState({
    user: [],
    genres: [],
    reviews: [],
    games: [],
  });
  const [show, setShow] = useState(false);
  const [deleteVal, setDeleteVal] = useState(false)

  const showEdit = (val) => setEditShow(val)

  const showDelete = () => setShow(false);

  const deleteWhat = (e) => {
    setDeleteVal(parseInt(e.target.name))
    setShow(true) 
  }

  const removeGame = async () => {
    showDelete()
    const test = await deleteGameFavorite(deleteVal)
    if (test) {      
      let games = [...User.user]
      const index = games.findIndex(game => game === deleteVal)
      games.splice(index, 1)
      console.log("here");
      User.setUser(games)
      
    }
  }

  useEffect(() => {
    (async function getData() {
      const data = await getUserProfileData();
      setData(data);
    })();
  }, [User.user, editShow]);

  return (
    <>
   
      <Row className="justify-content-around edit-row">
        <Col lg="4"> <Profile data={data} showEdit={showEdit} editShow={editShow}/></Col>
        {
          data.games.length ?
          <>
              <Col className="user-gameReviews" lg="8">
          <DeleteModal show={show} handleClose={showDelete} removeGame={removeGame}/>
          <ListGroup variant="flush" className="edit-listgroup">
            {data.games.map((game) => (
              <>
                <ListGroup.Item className="shakethis">
                  <Row className="justify-content-center">
                    <Col
                      lg="1" md="1" sm="1" xs="1" 
                      className="d-flex align-items-center justify-content-end"
                    >
                      <button className="delete" name={game.gameID} onClick={deleteWhat}>
                        <FontAwesomeIcon name={game.gameID} icon={faTrashAlt} />
                      </button>
                    </Col>
                    <Col lg="10" md="9" xs="9">
                      <SearchCard game={game} />
                    </Col>
                    <Col
                      lg="1" md="1" sm="1" xs="1" 
                      className="d-flex align-items-center justify-content-center"
                    >
                      {
                        data.reviews.find((review) => review.gameID === game.gameID) ? 
                        <>
                      <Row>
                        <NavLink
                          to={`/user/editReview/${
                            data.reviews.find(
                              (review) => review.gameID === game.gameID
                            ).reviewID
                          }`}
                        >
                          <button className="edit">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </NavLink>
                      </Row> </>
                      : ""
                      }  
                    </Col>
                  </Row>
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
        </Col>
          </>
          : ""
        }
        
      </Row>
    </>
  );
}

export default EditProfile;
