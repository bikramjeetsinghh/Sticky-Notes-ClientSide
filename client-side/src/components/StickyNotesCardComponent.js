import React, { useState } from "react";
import Draggable from "react-draggable";
import { Card, FormControl, Button } from "react-bootstrap";
import moment from 'moment';

import { StickyNotesService } from "../services/stickyNotesService";
const dateTimeFormat = 'DD MMM YYYY (ddd)'

const StickyNotesCardComponent = ({
  stickyNotesCardData,
  onDeleteStickyNote,
}) => {
  const [editingNoteIndex, setEditingNoteIndex] = useState("");
  const [description, setDescription] = useState("");

  const onDescriptionFocus = (stickyNoteIndex) => {
    setEditingNoteIndex(stickyNoteIndex);
  };

  const saveStickyNote = (stickyNote) => {
    const { _id } = stickyNote;
    StickyNotesService.UpdateStickyNote(_id, description).then((resp) => {});
  };

  const deleteStickyNote = (id) => {
    onDeleteStickyNote(id.toString());
  };

  return (
    <div className="container" style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
      {stickyNotesCardData &&
        stickyNotesCardData.length &&
        stickyNotesCardData.map((stickyNote, i) => {
          return (
            <div key={stickyNote.id} style={{marginLeft:'15px', marginRight:'15px', marginTop: '15px'}}>
              <Draggable grid={[25, 25]}>
                <Card
                  style={{ width: "18rem", height: "21rem" }}
                  className="mb-2"
                >
                  <Card.Header
                    style={{
                      backgroundColor: stickyNote.titleColor,
                      color: "white",
                    }}
                  >
                    <div className="row">
                      <div className="col-2">
                        <i className="fas fa-paperclip"></i>
                      </div>
                      <div className="col-8">{stickyNote.title}</div>
                      <div className="col-2" style={{ cursor: "pointer" }}>
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => deleteStickyNote(stickyNote._id)}
                        ></i>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body
                    style={{ backgroundColor: stickyNote.descriptionColor }}
                  >
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      placeholder="Enter your note here..."
                      rows="8"
                      defaultValue={stickyNote.description}
                      onFocusCapture={() => onDescriptionFocus(i)}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="row">
                      <div className="col-11">
                        <span style={{fontSize: 10, fontWeight:'bold', textAlign:'end'}}>
                          Created on: {moment(new Date(stickyNote.dateTime)).format(dateTimeFormat)}
                        </span>
                        <Button
                            className="mt-2 mr-1"
                            style={{
                              backgroundColor: stickyNote.titleColor,
                              color: "white",
                              alignSelf: "end",
                              border: "none",
                              marginLeft:'1.4rem'
                            }}
                            size="sm"
                            onClick={() => saveStickyNote(stickyNote)}
                          >
                            Save
                          </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Draggable>
            </div>
          );
        })}
      {!stickyNotesCardData ||
        (!stickyNotesCardData.length && <h3>No Sticky Notes Found</h3>)}
    </div>
  );
};

export default StickyNotesCardComponent;
