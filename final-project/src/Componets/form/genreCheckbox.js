import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function GenreCheckbox(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      const genres = await props.data();
      setGenres(genres);
    })();
  }, []);

  return (
    <Form.Row className="justify-content-start">
      <Form.Row style={{marginRight: "15px", marginLeft: "4px"}}>
      <strong>{props.name}</strong>
      </Form.Row>

      <Form.Row className="justify-content-start genre-row"  style={{marginLeft: "3px"}}>
        {genres.map((genre, index) => (
          <Col lg="6" md="6" sm="6">
            <div className="mb-3">
              <Form.Check type="checkbox" id={`${genre.Name}-checkbox${index}`} key={`num${index}`}>
                <Form.Check.Input
                  name={genre.Name}
                  type="checkbox"
                  isValid
                  key={index}
                  onChange={props.validateInput}
                  value={parseInt(genre.id)}
                  defaultChecked={props.checked ? props.checked.find( check => check.genreID === genre.id) : false}
                />
                <Form.Check.Label>{genre.Name}</Form.Check.Label>
              </Form.Check>
            </div>
          </Col>
        ))}
      </Form.Row>
    </Form.Row>
  );
}
// = {props.checked.find(userGenre => userGenre.genreID === genre.genreID) ? "checked" : false}
export default GenreCheckbox;
