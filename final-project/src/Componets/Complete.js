import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./complete.css"

function Complete(props) {
    
    return <>
        <Container fluid className="complete-div">
            <Row> 
            <h1 className="h1-register">{props.msg} Complete!</h1>
            
            </Row>
            <Row>
            <h6>Thank you for participating :) Continue to enjoy using our site</h6>
            </Row>
            
        </Container>
    </>
}

export default Complete;