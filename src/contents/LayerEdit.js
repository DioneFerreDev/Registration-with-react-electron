import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");



export default props => {


    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { }, [])
    useEffect(() => { }, [show]);
    useEffect(() => { }, [name]);
    useEffect(() => { }, [type]);
    useEffect(() => { }, [quantity]);
    useEffect(() => { }, [description]);
    useEffect(() => { }, [message]);



    async function editContent(e) {
        e.preventDefault();
        let data = { name, type, quantity, description }
        if(data.name === "") data.name = props.edit.name
        if(data.type === "") data.type = props.edit.type
        if(data.quantity === "") data.quantity = props.edit.quantity
        if(data.description === "") data.description = props.edit.description

        try {
            const res = await ipcRenderer.invoke("edit-content", { id: props.edit.$loki, name: data.name, type: data.type, quantity: data.quantity, description: data.description })
            props.propUpload();
            if(!res.error) props.propModal();
        } catch (error) { console.log(error) }
    }

    return (
        <div id="wrap-modal-edit" className={props.modal ? "overlay show-modal" : "overlay hide-modal"} onClick={e => props.playShowModalEdit(e)}>
            <form>
                <div className="pannel-alert">Edit</div>
                <div className={show ? "pannel-alert show" : "pannel-alert hide"}><h3>{show ? message : "Dione"}</h3></div>
                <input onChange={e => setName(e.target.value)} defaultValue={props.edit.name} type="text" placeholder="Name of new content" required />
                <input onChange={e => setType(e.target.value)} defaultValue={props.edit.type} type="text" placeholder="Type of new content" required />
                <input onChange={e => setQuantity(e.target.value)} defaultValue={props.edit.quantity} type="Number" step="1" placeholder="Quantiny of new content" required />
                <textarea onChange={e => setDescription(e.target.value)} defaultValue={props.edit.description} placeholder="Short description of new content" required />
                <button onClick={e => editContent(e)} >Edit</button>
            </form>
        </div>
    );
}