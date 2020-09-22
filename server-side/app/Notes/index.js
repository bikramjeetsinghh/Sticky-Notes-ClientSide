const express = require('express');
const router = express.Router();
const { Notes } = require('../models');

router.post('/addStickyNotes', async (req, res) => {
  const notesInstance = new Notes(req.body);

  notesInstance.save().then((resp) => {
    res.json(resp);
  });
});

router.get('/getStickyNotes', async (req, res) => {
  await Notes.find({isDeleted: false})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/deleteStickyNote', async (req, res) => {
  const {id} = req.query;
  await Notes.findByIdAndUpdate({_id: id},{isDeleted: true}).then(resp => {
  res.send("200");
  })
});

router.post('/updateStickyNote', async (req, res) => {
  const {id, description} = req.body;
  await Notes.findByIdAndUpdate({_id: id},{description}).then(resp => {
  res.send("200");
  })
});

module.exports = router;
