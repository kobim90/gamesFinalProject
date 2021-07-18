import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button";
import {useState} from "react"
import "./deleteModal.css"

function DeleteModal(props) {

  return (
    <Modal show={props.show} onHide={() => props.handleClose(false)} size="sm" centered className="delete-modal">
      <Modal.Body className="delete-modal-body">Are you sure you want to <strong className="delete">DELETE</strong> this game from your library?</Modal.Body>
      <Modal.Footer className="delete-modal-footer">
        <Button variant="secondary" onClick={() => props.handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={() => props.removeGame(false)}>
          Save Changes
        </Button>
      </Modal.Footer >
    </Modal>
  );
}

export default DeleteModal;
