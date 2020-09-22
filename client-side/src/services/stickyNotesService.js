import axios from "axios";
import { Urls } from "../constants/urls";
import setting from "../setting/index";

const endPoint = setting.load().apiUrl;

const AddStickyNotes = (stickyNote) => {
  const url = `${endPoint}${Urls.AddStickyNotes}`;
  return axios
    .post(url, stickyNote)
    .then((resp) => {
      alert("Saved!");
      return resp.data;
    })
    .catch((s) => {
      alert("Error!");
    });
};

const GetStickyNotes = (stickyNote) => {
  const url = `${endPoint}${Urls.GetStickyNotes}`;
  return axios
    .get(url)
    .then((resp) => {
      return resp;
    })
    .catch((s) => {
      alert("Error!");
    });
};

const DeleteStickyNote = (id) => {
  const url = `${endPoint}${Urls.DeleteStickyNote}`;
  return axios
    .get(url, { params: { id } })
    .then((resp) => {
      alert("Deleted !");
    })
    .catch((s) => {
      alert("Error!");
    });
};

const UpdateStickyNote = (id, description) => {
  const url = `${endPoint}${Urls.UpdateStickyNote}`;
  return axios
    .post(url, { id, description })
    .then((resp) => {
      
    })
    .catch((s) => {
      alert("Error!");
    });
};

export const StickyNotesService = {
  AddStickyNotes,
  GetStickyNotes,
  DeleteStickyNote,
  UpdateStickyNote,
};
