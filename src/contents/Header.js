import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");




export default (props) => {


    const [options, setOptions] = useState([]);

    useEffect(() => { getAllContents() }, [])
    useEffect(() => { }, [options])

    async function getAllContents() {
        try {
            const res = await ipcRenderer.invoke("get-contents");
            let data = [];
            res.forEach(op => {
                const type = op.type;
                const isIserted = data.filter(insert => insert === type);
                if (isIserted.length === 0) {
                    data = [...data, type];
                }
            })
            setOptions(data);
        } catch (error) { console.log(error) }
    }
    async function searchingName(name) {
        if (name === "" || name === null) { props.propGetData(name); return; }

        try {
            const res = await ipcRenderer.invoke("get-content-by-name", { name });
            props.propSearch(res.itens);
        } catch (error) { console.log(error) }
    }
    async function searchByOption(type) {
        if (type === "All") { props.propGetData(); return; }

        try {
            const res = await ipcRenderer.invoke("search-contents-by-option", { type });
            props.propSearch(res.itens)
        } catch (error) { console.log(error) }
    }

    return (
        <div className="header">
            <div className="wrap-header">
                <label>Create new content</label>
                <button onClick={() => props.playShowModal(!props.modal)}>New content</button>
            </div>
            <div className="wrap-header">
                <label>nome da opção</label>
                <input onChange={e => searchingName(e.target.value)} type="text" placeholder="type here..." />
            </div>
            <div className="wrap-header">
                <label>nome da opção</label>
                <select onChange={e => searchByOption(e.target.value)}>
                    {options.map((op, index) =>
                        <option key={index} >{op}</option>
                    )}
                    <option>All</option>
                </select>
            </div>
        </div>
    );
}