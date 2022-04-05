import React, { useState } from 'react';
import ShoppingItemsService from '../../services/firebaseService';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import './ItemModal.scss';

export const Modal = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div className="modal-bg">
            <div className="modal-box">
                <div className="form-header">
                    <h3>Shopping List</h3>
                    <IconButton edge="end" aria-label="comments">
                        <LastPageIcon onClick={() => {
                            props.closeModal()
                        }} />
                    </IconButton>
                </div>
                <div className="form-body">
                    <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <h3>{`${props.modalTitle} an Item`}</h3>
                        {props.modalTitle === "Add" && <p>Add your new item below</p> }
                        {props.modalTitle === "Edit" && <p>Edit your item below</p> }
                        <input type="text" placeholder="Item Name" value={title}></input>
                        <input type="textarea" placeholder="Description" value={description}></input>
                        <select>
                            <option selected disabled>How Many?</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <div className="form-buttons">
                            <button className="cancel" onClick={() => props.closeModal()}>Cancel</button>
                            {props.modalTitle === "Add" && <button type="submit">Add Task</button> }
                            {props.modalTitle === "Edit" && <button type="submit">Save Item</button> }
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )

}