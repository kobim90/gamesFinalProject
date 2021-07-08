import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
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
  }
  useEffect(() => {
    getData();
  }, [props.gameId]);

  console.log(info);
  return (
    <>
      {
          info.map( (review,index) => (
              <div>
            <Row className="justify-content-around">
            <Col lg="3"><Avatar details={review} /></Col>
            <Col lg="8">
                <h4>{review.title}</h4><span>Rating <strong>{review.score}/10</strong></span>
                <div><h7>Review:</h7></div>
                <ReadMoreReact text={review.body} readMoreText={<u><b>Read more</b></u>}/>
                <br></br>
                <h7>Conclusion:</h7>
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
