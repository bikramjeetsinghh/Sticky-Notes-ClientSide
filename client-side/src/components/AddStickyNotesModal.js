import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddStickyNotesModal = ({ showModal, onHideModal, onSubmit }) => {

  const [title, setTitle] = useState('');

  const onCloseModal = () => {
    onHideModal();
  };

  const addStickyNote = () => {
    onSubmit(title);
    onHideModal();
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onCloseModal()}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Sticky Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="stickyNoteTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Sticky Note Title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" onClick={() => addStickyNote()}>Add</Button>
        <Button variant="secondary" onClick={() => onCloseModal()}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default AddStickyNotesModal;
