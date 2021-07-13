import Container from "react-bootstrap/Container"

function Footer() {
    return (
        <Container
        fluid
        className="footer d-flex justify-content-center align-items-center"
      >
        <p className="copyR">
          Copyright &copy;2021 All right reserved | This template is made with
          <span className="heart"> &hearts;</span> by <span className="author">Kobi Manashirov</span>
        </p>
      </Container>
    )
}

export default Footer;