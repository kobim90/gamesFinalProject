import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getReviewsData } from "../DAL/api";
import Avatar from "./User/userReviewAvatar";
import ReadMoreReact from 'read-more-react';


function Reviews(props) {
  const [info, setInfo] = useState([]);

  async function getData() {
    const review = await getReviewsData(props.gameId);
    setInfo(review);
    if (props.getConclusion) {
      props.getConclusion(review[0] ? review[0].conclusion : "")
    }    
  }
  useEffect(() => {
    getData();
  }, [props.gameId]);

  return (
    <>
      {
          info.map( (review,index) => (
              <div>
            <Row className="justify-content-around">
            <Col lg="3"><Avatar details={review} /></Col>
            <Col lg="8">
                <h4>{review.title}</h4><h6><span>Rating <strong>{review.score}/10</strong></span></h6>
                <div><h6 style={{display: "inline"}}>Tags: </h6>{review.tags ? review.tags.map(tag => ` #${tag} `) : ""}</div>
                <div><h6>Review:</h6></div>
                <ReadMoreReact text={review.body} readMoreText={<u><b>Read more</b></u>}/>
                <br></br>
                <h6>Conclusion:</h6>
                <p>{review.conclusion}</p>
            </Col>
          </Row>
          <hr></hr>
          </div>
          ) )
      }
    </>
  );
}

export default Reviews;
