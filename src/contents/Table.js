import React, { useEffect, useState } from "react";


export default prop => {

    
    return (
        <table className="table">
            <tbody>
                <tr className="table-header">
                    <td>Name</td>
                    <td>Type</td>
                    <td>Description</td>
                    <td>Quantity</td>
                    <td>#</td>
                    <td>#</td>
                </tr>

                {
                    prop.propContents.map((item,index) => 
                        <tr key={index} className="body-row">
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td><button onClick={() => prop.propModalEdit(item)} className="btn-classic btn-edit">Edit</button></td>
                        <td><button onClick={() => prop.propDelete(item)} className="btn-classic btn-delete">Delete</button></td>
                    </tr>  
                    )
                } 
            </tbody>
        </table>
    );
}