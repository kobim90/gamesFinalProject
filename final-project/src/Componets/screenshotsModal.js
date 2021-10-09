import Modal from "react-bootstrap/esm/Modal"

function PicModal(props) {
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
              <Modal.Body>
                <img
                  src={props.screenshot}
                  className="screenshot"
                  alt="pew pew"
                  onClick={props.handleClose}
                ></img>
              </Modal.Body>
            </Modal>
            </>
    )
}

export default PicModal