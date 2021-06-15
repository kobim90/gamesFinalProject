import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChartLine,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import GCard from "./card";
import MyNavbar from "./navbar"
import SearchBar from "./search"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "./home.css";

function Home() {
  return (
    <Container fluid>
      <Container className="main">
        <SearchBar />
        <Row className="justify-content-center carousel-row">
          <Carousel variant="dark" className="main-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i1.wp.com/www.gamerfuzion.com/wp-content/uploads/2015/04/Star-Wars-Battlefront-PS4-Cover.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mobygames.com%2Fimages%2Fcovers%2Fl%2F3907-doom-dos-front-cover.jpg&f=1&nofb=1"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pcgamesarchive.com%2Fwp-content%2Fuploads%2F2020%2F04%2FThe-Witcher-3.jpg&f=1&nofb=1"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>

        <h5>
          <FontAwesomeIcon icon={faStar} /> Recommended For You
        </h5>

        <hr></hr>
        <Row className="recommended-row justify-content-center">
          <Carousel fade variant="dark" className="recommended-carousel">
            <Carousel.Item>
              <Row className="align-items-center inner-carousel-row">
              <Col>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
              </Col>
              <Col>
                <GCard />
              </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="align-items-center inner-carousel-row">
              <Col>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
              </Col>
              <Col>
                <GCard />
              </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="align-items-center inner-carousel-row">
              <Col>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <GCard />
                  </Col>
                  <Col>
                    <GCard />
                  </Col>
                </Row>
              </Col>
              <Col >
                <GCard />
              </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className="table-sort container justify-content-center">
          <ListGroup variant="flush" className="table-sort-items">
            <ListGroup.Item>
              <Row className="table-row">
                <Col>
                  <FontAwesomeIcon icon={faChartLine} />
                  <h4 style={{ display: "inline" }}> Discover Games</h4>
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <h4 style={{ display: "inline" }}> Most Popular</h4>
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faArrowDown} />
                  <h4 style={{ display: "inline" }}> New</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>Nmae</h4>
                </Col>
                <Col>
                  <h4>Rating</h4>
                </Col>
                <Col>
                  <h4>Date</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>Nmae</h4>
                </Col>
                <Col>
                  <h4>Rating</h4>
                </Col>
                <Col>
                  <h4>Date</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>Nmae</h4>
                </Col>
                <Col>
                  <h4>Rating</h4>
                </Col>
                <Col>
                  <h4>Date</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>Nmae</h4>
                </Col>
                <Col>
                  <h4>Rating</h4>
                </Col>
                <Col>
                  <h4>Date</h4>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
