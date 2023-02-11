import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");



export default props => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {  }, [name]);
    useEffect(() => {  }, [type]);
    useEffect(() => {  }, [quantity]);
    useEffect(() => {  }, [description]);
    useEffect(() => {  }, [show]);
    useEffect(() => {  }, [message]);


    async function saveContent(e) {
        e.preventDefault();
        if(name === "") return
        if(type === "") return
        if(quantity === "") return
        if(description === "") return

        try {
            const res = await ipcRenderer.invoke("save-content", { name, type, quantity, description });
            setShow(true);
            setMessage(res.msg);
            setName("")
            setType("");
            setQuantity("");
            setDescription("")     
            props.propUpload();       
        } catch (error) { console.log(error) }
    }

    return (
        <div id="wrap-modal" className={props.modal ? "overlay show-modal" : "overlay hide-modal"} onClick={e => props.playShowModal(e)}>
            <form>
                <div className={show?"pannel-alert show":"pannel-alert hide"}><h3>{show?message:"Dione"}</h3></div>
                <input onKeyUp={e => setName(e.target.value)} defaultValue={show?"":name} type="text" placeholder="Name of new content" required />
                <input onKeyUp={e => setType(e.target.value)} defaultValue={show?"":type} type="text" placeholder="Type of new content" required />
                <input onChange={e => setQuantity(e.target.value)} defaultValue={show?"":quantity} type="Number" step="1" placeholder="Quantiny of new content" required />
                <textarea onKeyUp={e => setDescription(e.target.value)} defaultValue={show?"":description} placeholder="Short description of new content" required />
                <button onClick={e => saveContent(e)} >Save</button>
            </form>
        </div>
    );
}