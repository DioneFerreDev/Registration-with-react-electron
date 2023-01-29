import React from "react";

export default  (props) => {
    return(
        <div className="header">
            <div className="wrap-header">
                <label>Create new content</label>
                <button onClick={() => props.playShowModal(!props.modal)}>New content</button>   
            </div> 
            <div className="wrap-header">
                <label>nome da opção</label>
                <select>
                    <option>1 opção</option>    
                    <option>2 opção</option> 
                </select>    
            </div>      
            <div className="wrap-header">
                <label>nome da opção</label>
                <select>
                    <option>1 opção</option>    
                    <option>2 opção</option> 
                </select>    
            </div>       
        </div>
    );
}