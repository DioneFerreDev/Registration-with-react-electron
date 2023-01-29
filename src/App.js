import "./style.css";
import Header from "./contents/Header";
import Table from "./contents/Table";
import Layer from "./contents/Layer";
import { useState } from "react";

function App() {

  const [showModal, setShowModal] = useState(false);

  function playShowModal(e){       
    if(e.target.id !== "wrap-modal") return

    setShowModal(!showModal)    
  }


  return (
    <div className="container">
      <Layer modal={showModal} playShowModal={playShowModal} />
      <Header  modal={showModal} playShowModal={setShowModal} />
      <Table />
    </div>
  );
}

export default App;
