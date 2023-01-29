import React, { useEffect, useState } from "react";

export default props => {
        


    return (
        <div id="wrap-modal" className={props.modal ? "overlay show-modal" : "overlay hide-modal"} onClick={e => props.playShowModal(e)}>
            <form>
                <input type="text" placeholder="Name of new content" required/>
                <input type="text" placeholder="Type of new content" required/>
                <input type="Number" step="1" placeholder="Quantiny of new content" required/>
                <textarea placeholder="Short description of new content" required/>
                                
                <button>Save</button>
            </form>
        </div>
    );
}