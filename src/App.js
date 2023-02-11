import "./style.css";
import Header from "./contents/Header";
import Table from "./contents/Table";
import Layer from "./contents/Layer";
import LayerEdit from "./contents/LayerEdit";
import { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");

function App() {

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [contents, setContents] = useState([]);
  const [upload, setUpload] = useState(false);
  const [editItem, setEditItem] = useState({});

  useEffect(() => { getData() }, []);
  useEffect(() => { }, [contents]);
  useEffect(() => { if (upload) getData() }, [upload]);
  useEffect(() => {  }, [editItem])
  useEffect(() => { }, [showModalEdit])

  async function getData() {
    try {
      const data = await ipcRenderer.invoke("get-contents");
      setContents(data)
      setUpload(false)
    } catch (error) { console.log(error) }
  }
  function setNamaData(data) {
    setContents(data);
    setUpload(false);
  }
  function playShowModal(e) {
    if (e.target.id !== "wrap-modal") return

    setShowModal(!showModal)
  }
  function playShowModalEdit(e) {
    if (e.target.id !== "wrap-modal-edit") return

    setShowModalEdit(!showModalEdit)
  }
  async function deleteItem(item) {
    if (!window.confirm(`Deseja Realmente deletar o item ${item.name} ?!`)) return
    try {
      const res = await ipcRenderer.invoke("delete-item", item);
      if (res.error) { alert("algo deu errado ao deletar o item") }
      setUpload(true);
    } catch (error) { console.log(error) }
  }
  function appearModalEdit(item) { setEditItem(item); setShowModalEdit(true) }
  function desappearModalEdit() { setEditItem({}); setShowModalEdit(false) }
  function uploadTable() { setUpload(true) }


  return (
    <div className="container">
      <Layer propUpload={uploadTable} modal={showModal} playShowModal={playShowModal} />
      <LayerEdit propModal={desappearModalEdit} propUpload={uploadTable} edit={editItem} modal={showModalEdit} playShowModalEdit={playShowModalEdit} />
      <Header propGetData={getData} propSearch={setContents} modal={showModal} playShowModal={setShowModal} />
      <Table propDelete={deleteItem} propModalEdit={appearModalEdit} propContents={contents} />
    </div>
  );
}

export default App;
