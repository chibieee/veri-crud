import React, { useState, useEffect } from 'react';
import ShoppingItemsService from '../../services/firebaseService';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './ItemModal.scss';

export const Modal = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("How Many?");
    
    const [statusMsg, setStatusMsg] = useState({ error: false, msg: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title === "" || description === "" || amount === "How Many?") {
            setStatusMsg({ error: true, msg: "Please fill out all fields" });
            return
        }
        const newItem = {
            title,
            description,
            amount,
            completed: false,
        }

        try {
            await ShoppingItemsService.addItem(newItem);
            setStatusMsg({ error: false, msg: "New Item added to Shopping List" });
            setTimeout(() => {
                props.closeModal()
            }, 1000);
        } catch(err) {
            setStatusMsg({ error: true, msg: err.message });

        }
        setTitle("");
        setDescription("");
        setAmount("How Many?");
    }

    const handleEdit = async () => {
        try {
            const item = await ShoppingItemsService.getItem(props.modalId);
            setTitle(item.data().title);
            setDescription(item.data().description);
            setAmount(item.data().amount);
        } catch(err) {
            setStatusMsg({ error: true, msg: err.message });
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedItem = {
            title,
            description,
            amount,
            completed: false,
        }
        try {
            await ShoppingItemsService.updateItem(props.modalId, updatedItem);
            setStatusMsg({ error: false, msg: "The Item has been updated" });
            setTimeout(() => {
                props.closeModal()
            }, 1000);
        } catch(err) {
            setStatusMsg({ error: true, msg: err.message });
        }
    } 

    useEffect(() => {
        if(props.modalTitle === "Edit") {
            handleEdit();
        } 
    }, [props.modalTitle]);

    return (
        <div className="modal-bg">
            <div className={`modal-box ${props.isDeleting ? 'delete' : ''}`}>
                <Stack sx={{ width: '100%' }} spacing={2} className="status-messages">
                    {statusMsg?.error && 
                        <Alert severity="error">{statusMsg.msg}</Alert>
                    }
                    {!statusMsg?.error && statusMsg?.msg !== "" &&
                        
                        <Alert severity="success">{statusMsg.msg}</Alert>
                    }
                </Stack>
                {!props.isDeleting &&
                <>
                    <div className="form-header">
                        <h3>Shopping List</h3>
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => {
                                props.closeModal()
                            }} 
                        >
                            <LastPageIcon />
                        </IconButton>
                    </div>
                    <div className="form-body">
                        <form onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                            <h3>{`${props.modalTitle} an Item`}</h3>
                            {props.modalTitle === "Add" && <p>Add your new item below</p> }
                            {props.modalTitle === "Edit" && <p>Edit your item below</p> }
                            <input type="text"
                                placeholder="Item Name"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            ></input>
                            <input
                                type="textarea"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></input>
                            <select
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            >
                                <option value="How Many?" disabled hidden>How Many?</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <div className="form-buttons">
                                <button
                                    className="cancel"
                                    onClick={() => {
                                        props.closeModal()
                                        setStatusMsg({ error: true, msg: "" });
                                    }}
                                >
                                    Cancel
                                </button>
                                {props.modalTitle === "Add" && <button type="submit" onClick={(e) => handleSubmit(e)}>Add Task</button> }
                                {props.modalTitle === "Edit" && <button type="submit" onClick={(e) => handleEditSubmit(e)}>Save Item</button> }
                            </div>
                        </form>
                    </div>
                </>
                }
                {props.isDeleting &&
                    <div className="delete-form">
                        <h3>Delete Item?</h3>
                        <p>Are you sure you want to delete this item? This can not be undone.</p>
                        <div className="form-buttons">
                            <button
                                className="cancel"
                                onClick={() => {
                                    props.closeModal()
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    props.handleDelete(props.modalId)
                                }}
                            >
                                Delete
                            </button> 
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}