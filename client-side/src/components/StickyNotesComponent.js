import React, { useState, useEffect } from "react";
import { Button, Jumbotron } from "react-bootstrap";


import AddStickyNotesModal from "./AddStickyNotesModal";
import StickyNotesCardComponent from "./StickyNotesCardComponent";
import { StickyNotesService } from "../services/stickyNotesService";
const randomColor = require("randomcolor");
const mongo = require("mongoose");

const StickyNotesComponent = () => {
  const [isAddStickyNoteModalOpen, setIsAddStickyNoteModalOpen] = useState(
    false
  );
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
    StickyNotesService.GetStickyNotes().then(({ data }) => {
      setStickyNotes(data);
    });
  }, []);

  const showAddStickyNoteModal = () => {
    setIsAddStickyNoteModalOpen(true);
  };

  const onCloseStickyNoteModal = () => {
    setIsAddStickyNoteModalOpen(false);
  };

  const onAddingStickyNote = (title) => {
    const titleColor = randomColor({ luminosity: "dark", hue: "random" });
    const descriptionColor = randomColor({
      luminosity: "light",
      hue: titleColor,
    });
    const stickyNoteModel = {
      id: mongo.Types.ObjectId().toHexString(),
      title,
      description: "",
      titleColor,
      descriptionColor,
    };

    StickyNotesService.AddStickyNotes(stickyNoteModel).then((resp) => {
      const updatedStickyNotes = [...stickyNotes, resp];
      setStickyNotes(updatedStickyNotes);
    });
  };

  const onDeleteStickyNote = (id) => {
    StickyNotesService.DeleteStickyNote(id).then((resp) => {
      const filteredNotes = stickyNotes.filter((x) => x._id !== id);
      setStickyNotes(filteredNotes);
    });
  };

  return (
    <div
      className="container-fluid"
      style={{ width: "1366x", backgroundColor: "#E9ECEF" }}
    >
      <Jumbotron>
        <h1>Drag & Droppable Sticky Notes</h1>
        <p>
          This is a simple Drag & Droppable Sticky Notes, developed by
          Bikramjeet singh.
        </p>
        <p>
          Note: Sticky Note will be saved automatically , when you will click outside of the sticky note after writing it.
        </p>
        <p>
          <Button variant="primary" onClick={() => showAddStickyNoteModal()}>
            Add Sticky Note
          </Button>
        </p>
      </Jumbotron>
      <StickyNotesCardComponent
        stickyNotesCardData={stickyNotes}
        onDeleteStickyNote={(id) => onDeleteStickyNote(id)}
      ></StickyNotesCardComponent>
      <>
        <AddStickyNotesModal
          showModal={isAddStickyNoteModalOpen}
          onSubmit={(title) => onAddingStickyNote(title)}
          onHideModal={() => onCloseStickyNoteModal()}
        ></AddStickyNotesModal>
      </>
    </div>
  );
};
export default StickyNotesComponent;
