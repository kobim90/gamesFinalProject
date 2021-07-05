import { useState, useEffect } from "react";
import { getGenresApi } from "../../DAL/api";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function GenreCheckbox(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      const genres = await getGenresApi();
      setGenres(genres);
    })();
  }, []);

  return (
    <Form.Row className="justify-content-start">
      <strong>Favorite Genres</strong>

      <Form.Row className="justify-content-start genre-row">
        {genres.map((genre, index) => (
          <Col lg="4" md="6" sm="6">
            <div className="mb-3">
              <Form.Check type="checkbox" id="check-api-checkbox">
                <Form.Check.Input
                  name={genre.genreName}
                  type="checkbox"
                  isValid
                  key={index}
                  onChange={props.validateInput}
                  value={genre.genreID}
                />
                <Form.Check.Label>{genre.genreName}</Form.Check.Label>
              </Form.Check>
            </div>
          </Col>
        ))}
      </Form.Row>
    </Form.Row>
  );
}

export default GenreCheckbox;
